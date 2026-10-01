"use client";

import { useSyncExternalStore } from "react";

import { CampaignHomolog } from "@/src/configurations/Campaign/CampaignHomolog";
import { CampaignAccess } from "@/src/global/types/global";

// Relógio da campanha: re-renderiza a cada CLOCK_TICK_MS, assim troca de fase
// (ex: card da home) e expiração do token acontecem com a tela aberta.
const CLOCK_TICK_MS = 15 * 1000;

// Lê o token de homologação do localStorage + relógio. useSyncExternalStore
// (e não useState + useEffect) evita erro de hidratação: no servidor/build o
// snapshot é undefined (ready: false) e só no cliente o valor real aparece.
export default function useCampaignAccessHook(): CampaignAccess {
  const storedAccess = useSyncExternalStore(subscribeStorage, readHomologAccess, readServerAccess);
  const clockTick = useSyncExternalStore(subscribeClock, readClockTick, readServerClockTick);
  const now = clockTick * CLOCK_TICK_MS;
  const homologGrantedAt = getValidHomologGrantedAt(storedAccess, now);

  return {
    ready: storedAccess !== undefined,
    homolog: homologGrantedAt !== null,
    homologGrantedAt,
    now,
  };
}

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return function () {
    window.removeEventListener("storage", callback);
  };
}

// Snapshot como string crua (primitivo estável) — o parse fica fora do store.
function readHomologAccess(): string | null {
  try {
    return window.localStorage.getItem(CampaignHomolog.storageKey);
  } catch {
    return null;
  }
}

function readServerAccess(): undefined {
  return undefined;
}

function subscribeClock(callback: () => void) {
  const intervalId = window.setInterval(callback, CLOCK_TICK_MS);
  return function () {
    window.clearInterval(intervalId);
  };
}

// Número do "tick" atual — estável entre chamadas dentro do mesmo intervalo.
function readClockTick(): number {
  return Math.floor(Date.now() / CLOCK_TICK_MS);
}

function readServerClockTick(): number {
  return 0;
}

// Token válido (correto e dentro do ttl) → quando foi concedido; senão null.
function getValidHomologGrantedAt(storedAccess: string | null | undefined, now: number): number | null {
  if (!storedAccess) return null;

  try {
    const homologAccess = JSON.parse(storedAccess);
    if (homologAccess?.token !== CampaignHomolog.token) return null;
    if (typeof homologAccess.expiresAt !== "number" || now >= homologAccess.expiresAt) return null;
    return typeof homologAccess.grantedAt === "number"
      ? homologAccess.grantedAt
      : homologAccess.expiresAt - CampaignHomolog.ttlMs;
  } catch {
    return null;
  }
}

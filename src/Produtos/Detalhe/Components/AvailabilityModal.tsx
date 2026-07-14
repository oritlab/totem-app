"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AvailabilityModalProps } from "../types";

// Configurável: tempo até o redirecionamento automático, caso o cliente não toque no botão.
const REDIRECT_DELAY_MS = 15000;
const CATALOG_HREF = "/produtos";

export default function AvailabilityModal(props: AvailabilityModalProps) {
  const { open } = props;
  const router = useRouter();

  useEffect(
    function () {
      if (!open) return;

      const timeoutId = setTimeout(function () {
        router.push(CATALOG_HREF);
      }, REDIRECT_DELAY_MS);

      return function () {
        clearTimeout(timeoutId);
      };
    },
    [open, router]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop é inerte de propósito (produto realmente indisponível) — sem onClick de dismiss, ao contrário do MenuDrawer. */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex w-full max-w-90 flex-col items-center gap-6 rounded-lg bg-white p-8 text-center">
        <span className="text-sm font-medium tracking-wide text-black">PRODUTO INDISPONÍVEL NO MOMENTO</span>

        <button
          className="w-full cursor-pointer rounded-sm bg-black px-6 py-3 text-xs tracking-widest text-white"
          onClick={() => router.push(CATALOG_HREF)}
        >
          VOLTAR PARA O CATÁLOGO
        </button>
      </div>
    </div>
  );
}

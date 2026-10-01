"use client";

import useCampaignHomologHook from "./Hooks/useCampaignHomologHook";

export default function Main() {
  useCampaignHomologHook();

  return (
    <main className="flex h-dvh w-full items-center justify-center bg-[#111111]">
      <span className="text-sm tracking-widest text-white">REDIRECIONANDO...</span>
    </main>
  );
}

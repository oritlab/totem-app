import * as React from "react";

import { cn } from "@/src/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 cursor-text rounded-[4px] border border-zinc-300 bg-white px-3 py-2 text-base text-black shadow-none outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4">
      <Image
        src="/logo.svg"
        alt="Orit"
        width={100}
        height={100}
        priority
        className="h-14 w-auto"
      />
      <button aria-label="Menu" className="flex cursor-pointer flex-col gap-1.5">
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
      </button>
    </header>
  );
}

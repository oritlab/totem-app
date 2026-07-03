export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <span className="font-serif text-2xl tracking-widest text-white">Orit</span>
      <button aria-label="Menu" className="flex cursor-pointer flex-col gap-1.5">
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
      </button>
    </header>
  );
}

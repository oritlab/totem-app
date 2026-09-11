export function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.toLowerCase().replace(/(^|[\s.\-/])([a-zà-ú])/g, (_, boundary, letter) => boundary + letter.toUpperCase());
}

// O título do produto já vem do backend com a capitalização certa (nomes de
// modelo/marca embutidos incluídos, ex: "Relógio Rolex Oyster Perpetual",
// "Pingente H Stern Design em ouro amarelo") — só a marca isolada vem em
// CAIXA ALTA. Por isso aqui não mexemos no resto do texto, só garantimos a
// primeira letra maiúscula como fallback.
export function capitalizeSentence(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// "H.STERN" é o nome oficial da marca, mas exibimos sem o ponto
export function formatBrandName(name: string): string {
  if (!name) return name;
  const normalized = name.replace(/[.\s]/g, "").toLowerCase();
  if (normalized === "hstern") return "H Stern";
  return capitalizeFirst(name);
}

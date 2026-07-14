export function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.toLowerCase().replace(/(^|[\s.\-/])([a-zà-ú])/g, (_, boundary, letter) => boundary + letter.toUpperCase());
}

// "H.STERN" é o nome oficial da marca, mas exibimos sem o ponto
export function formatBrandName(name: string): string {
  if (!name) return name;
  const normalized = name.replace(/[.\s]/g, "").toLowerCase();
  if (normalized === "hstern") return "H Stern";
  return capitalizeFirst(name);
}

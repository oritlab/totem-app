export function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.toLowerCase().replace(/(^|[\s.\-/])([a-zà-ú])/g, (_, boundary, letter) => boundary + letter.toUpperCase());
}

// Diferente de capitalizeFirst (que capitaliza cada palavra — certo pra marca),
// isso deixa só a primeira letra da frase maiúscula, igual o site usa nos
// títulos de produto (ex: "Anel solitário com diamante em ouro branco").
export function capitalizeSentence(text: string): string {
  if (!text) return text;
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

// "H.STERN" é o nome oficial da marca, mas exibimos sem o ponto
export function formatBrandName(name: string): string {
  if (!name) return name;
  const normalized = name.replace(/[.\s]/g, "").toLowerCase();
  if (normalized === "hstern") return "H Stern";
  return capitalizeFirst(name);
}

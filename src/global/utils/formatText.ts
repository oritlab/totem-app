export function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.toLowerCase().replace(/(^|[\s.\-/])([a-zà-ú])/g, (_, boundary, letter) => boundary + letter.toUpperCase());
}

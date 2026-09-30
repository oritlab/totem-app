import { StrikethroughProps } from "../types/global";

// Números/moeda ficam mais altos que o x-height que a maioria das fontes usa
// pra posicionar o line-through nativo do CSS — nessa fonte (Outfit), o traço
// nativo sai visivelmente abaixo do centro em preços. Desenhar o traço à mão,
// centralizado no meio da caixa, resolve pra qualquer conteúdo.
export default function Strikethrough(props: StrikethroughProps) {
  const { children, className = "" } = props;

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <span aria-hidden className="absolute inset-x-0 top-[52%] h-px -translate-y-1/2 bg-current" />
    </span>
  );
}

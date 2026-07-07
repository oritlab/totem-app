import { GridColumns, ProductGridProps } from "../types";
import ProductCard from "./ProductCard";

// Tailwind precisa da classe completa e literal no código-fonte pra
// detectar em build — não dá pra montar "grid-cols-" + columns em runtime.
const COLUMNS_CLASS: Record<GridColumns, string> = {
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function ProductGrid(props: ProductGridProps) {
  const { products, columns } = props;

  return (
    <div className={`grid gap-x-6 gap-y-10 px-6 py-8 ${COLUMNS_CLASS[columns]}`}>
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  );
}

import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/src/Produtos/Listagem/categories";
import Main from "@/src/Produtos/Listagem/Main";

type CategoriaPageProps = {
  params: Promise<{ categoria: string }>;
};

export default async function CategoriaPage(props: CategoriaPageProps) {
  const params = await props.params;
  const category = getCategoryBySlug(params.categoria);

  if (!category) notFound();

  return <Main key={category.slug} category={category} />;
}

import Main from "@/src/Produtos/Detalhe/Main";

type ProdutoPageProps = {
  params: Promise<{ sku: string }>;
};

export default async function ProdutoPage(props: ProdutoPageProps) {
  const params = await props.params;

  return <Main sku={params.sku} />;
}

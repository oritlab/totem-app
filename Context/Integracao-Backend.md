# Mapa de integração Frontend ↔ Backend

> Objetivo deste documento: listar **tudo** que hoje é dado mock/estático no `totem-app` e **tudo** que falta existir no backend pra virar dado real — sem deixar nada de fora. Serve como checklist de execução quando a integração começar de verdade. Escrito em 2026-07-06, com o front 100% mockado e o backend sem nenhum endpoint de leitura ainda (só sync).

---

## 1. Estado atual (resumo)

**Importante sobre responsabilidades**: existem hoje (ou vão existir) **três sistemas separados**, mantidos por pessoas diferentes:

1. **`totem-app`** (este repositório, frontend) — nosso.
2. **`totem-catalog-api`** — nosso também, mas seu escopo é só sincronizar a Wake Commerce e (no futuro) calcular o sinal `disponivel` cruzando Wake + Reserva + Milenium. **Não é** a API que o frontend vai consumir para listar produtos.
3. **API de catálogo/leitura** (a que o `totem-app` vai efetivamente chamar para listar categorias, produtos, filtros etc.) — está sendo construída por **outro desenvolvedor backend, em outro repositório**, consumindo o banco do time de BI. Esse repositório é externo ao que temos mapeado aqui.

Ou seja: este documento serve não só como checklist interna do frontend, mas como **especificação a ser alinhada/entregue para esse outro dev backend** — é o "o que o frontend precisa" que vira o contrato da API dele.

| Camada | Estado |
|---|---|
| `totem-app` (frontend, nosso) | 100% mock. Nenhum `fetch`/`axios` real é feito em nenhuma tela. |
| `totem-catalog-api` (nosso, escopo restrito) | Só sincroniza Wake → nossas tabelas `Product`/`Category` (staging interno). Vai futuramente escrever `disponivel` no banco da BI. **Não expõe e não deve expor** a API de listagem que o totem consome. |
| API de catálogo (**outro dev, outro repo**) | Ainda em construção do lado deles. É essa API que os endpoints da seção 3 abaixo descrevem — como uma lista de requisitos, não como um plano de implementação nosso. |
| Banco do BI (schema `produtos`/`categorias`/`marcas`/`atributos`...) | Schema conhecido via ERD. É a fonte de dados da API de catálogo (item acima), não algo que o `totem-app` acessa diretamente. |
| Reserva API / Milenium API | Zero documentação, zero acesso. Bloqueiam apenas o campo `disponivel` (calculado pelo `totem-catalog-api`), não bloqueiam listagem/preço/imagem. |

**Consequência prática**: a integração do frontend depende de alinhar contrato (rotas, parâmetros, formato de resposta) com o dev que está construindo a API de catálogo — não é trabalho que fazemos sozinhos dentro deste repositório.

---

## 2. Inventário do frontend — o que é mock e onde trocar

### 2.1 Categorias e banners — `src/Produtos/categories.ts`

- `CATEGORIES: Category[]` é um array **hardcoded** com 10 categorias (slug, nome, banner). Isso precisa virar dado vindo do backend (schema do BI tem `categorias` com id/nome — mas **não tem campo de banner/imagem/subtítulo de vitrine**, isso é conteúdo editorial nosso, não da BI).
  - **Decisão a tomar**: o banner (imagem, título, subtítulo, variante, alinhamento) provavelmente **continua sendo config local do totem** (não faz sentido a BI gerenciar copy de vitrine de touchscreen). Só o *vínculo* categoria→produtos precisa vir do backend. Ou seja, `CATEGORIES` pode continuar existindo como está, mas o `slug` precisa corresponder a uma categoria real do backend (hoje os slugs são inventados: `relogios`, `marcas-iconicas`, etc. — precisam ser conferidos/mapeados contra as categorias reais que a BI vai popular).
- `getCategoryBySlug(slug)` — hoje é um `.find()` síncrono em array local. Se a lista de categorias passar a vir da API, isso muda de duas formas possíveis:
  - (a) continuar buscando no array local `CATEGORIES` (só pra banner/copy) e separadamente perguntar ao backend "essa categoria existe e tem produtos?" — ou
  - (b) buscar tudo do backend e manter só um mapa local `slug → banner extra`.
  - Isso é chamado dentro de `app/produtos/[categoria]/page.tsx`, que hoje é síncrono; se passar a bater API, a função (e a page, que já é `async`) precisa realmente `await` a chamada real em vez de `.find()` local.
- `filterProductsByCategory(products, categorySlug)` — hoje filtra um array já carregado **no cliente**. Isso deixa de existir como função de filtro local: o filtro por categoria passa a ser um **parâmetro de query na chamada à API** (o backend retorna só os produtos da categoria, não filtramos no browser). Essa função pode ser deletada quando a Main.tsx passar a receber os produtos já filtrados do backend.
- Caso especial `"novidades"` (hoje = "mostra tudo, não filtra") — precisa de decisão de produto: "novidades" vai ser uma categoria real na BI (com produtos marcados como novidade) ou continua sendo sinônimo de "sem filtro, mostra tudo"? Isso afeta o contrato do endpoint.

### 2.2 Produtos — `src/Produtos/Listagem/mocks.ts`

- `mockProducts: Product[]` — 12 produtos reais (puxados direto do banco do `totem-catalog-api` numa consulta manual, não da BI), cada um com `categories: string[]` marcado à mão pra exercitar o filtro. **Isso inteiro é descartável** no dia da integração — vira uma chamada à API de listagem de produtos.
- Note que **3 categorias do mock não têm produto correspondente de verdade** (`novidades` só mostra tudo por regra especial, `pingentes` e `pulseiras` ficam vazias) — isso é uma limitação conhecida do mock, não um bug a corrigir no mock; some naturalmente quando os dados forem reais.
- O tipo `Product` (`src/Produtos/types.ts`) tem hoje: `sku, name, brand, imageUrl, price, listPrice?, categories: string[]`. **Falta o campo mais importante do projeto todo**: `available` (disponibilidade, o próprio motivo de existir do backend original). Isso precisa ser adicionado ao tipo E a UI (`ProductCard.tsx`, `ProductGrid.tsx`) precisa decidir o que fazer com produto indisponível — hoje não existe nenhum tratamento visual pra isso (esconder da grid? mostrar com selo "indisponível"? Isso nunca foi desenhado no Figma até agora — **perguntar ao design**).

### 2.3 Ordenação — `src/Produtos/Listagem/sort.ts` + `types.ts` (`SortOption`)

- `sortProducts()` ordena um array **já totalmente carregado no cliente** (`nome`, `menor-preco`, `maior-preco`, `novidades`). Isso só funciona porque o mock inteiro (12 itens) cabe na memória do browser. Com catálogo real (o Wake sync já trouxe **19.546 produtos** — ordem de grandeza real do catálogo), carregar tudo pra ordenar no cliente não é viável.
  - A ordenação precisa virar **parâmetro de query pro backend** (ex.: `?sort=nome-asc`, `?sort=preco-asc`, `?sort=preco-desc`, `?sort=novidades`) e o `ORDER BY` roda no banco.
  - `sort.ts` inteiro morre nesse dia; o componente `FilterBar.tsx` continua igual (só troca o "para onde" o `onSortChange` manda o valor).

### 2.4 Paginação / "Ver mais" — `Components/LoadMore.tsx` + `Main.tsx`

- Hoje `shown`/`INITIAL_COUNT` é um `.slice(0, shown)` sobre o array mock inteiro já carregado; "Ver mais" só aumenta o `shown` — não busca nada novo.
- Com API real isso precisa virar paginação de verdade: cada "Ver mais" dispara uma nova chamada (`?page=2` ou `?cursor=...&limit=...`), concatenando no estado local. O contrato precisa decidir: paginação por página/offset ou por cursor (o backend já usa cursor — `produtoVarianteIdDe` — no sync com a Wake; não necessariamente precisa ser o mesmo padrão pra API de leitura, mas vale considerar).
- O contador `"1–{shown} de {total} produtos"` (`LoadMore.tsx`) precisa do `total` **vindo do backend** (contagem real da categoria com os filtros aplicados), não do `.length` do array local.

### 2.5 Filtros ("Filtrar por") — `Components/FilterBar.tsx`

- **Maior lacuna do projeto.** Hoje é 100% visual — o ícone de filtro e o chip "Limpar filtro" não têm nenhuma lógica, nenhum estado, nenhum clique funcional. O contrato de filtro nunca foi definido, nem no frontend nem no backend.
- O ERD da BI tem exatamente a modelagem que normalmente sustenta filtro de e-commerce: `atributos`, `atributos_valores`, `produtos_atributos_valores`, `categorias_atributos` (atributos disponíveis variam por categoria — ex.: "material" faz sentido em "anéis", não necessariamente em "relógios"). Isso sugere o contrato final:
  - Um endpoint tipo `GET /categorias/:id/filtros` retornando os atributos+valores disponíveis **dentro daquela categoria, com aquele filtro já aplicado** (contagem por valor, se quiser réplicar padrão de e-commerce).
  - A listagem de produtos (`GET /categorias/:id/produtos`) precisa aceitar filtro por atributo/valor como query param (ex.: `?atributo[material]=ouro`).
- Nada disso existe hoje em nenhum lado. É o item que precisa de mais decisão de produto antes de codar (quais atributos aparecem, como a UI mostra múltipla seleção, etc.) — o Figma usado até agora só mostrou o botão fechado, nunca o painel de filtro aberto.

### 2.6 Colunas (3/4) — `Components/FilterBar.tsx` / `ProductGrid.tsx`

- Isso é **preferência de exibição pura**, não tem nenhuma relação com backend. Não precisa de contrato de API — só documentando aqui pra não ser confundido com algo pendente.

### 2.7 Header / menu de navegação — `src/shared/Components/Header.tsx`

- O menu hambúrguer lista `CATEGORIES` do arquivo local (`categories.ts`). Segue a mesma dependência do item 2.1: se a lista de categorias passar a vir do backend, o menu precisa either (a) continuar usando a lista local de banner/copy (que por natureza é curada, 10 categorias fixas) ou (b) se popular dinamicamente. Dado que são só 10 categorias fixas e cada uma tem banner/copy manual, **provavelmente o menu continua vindo do array local** — só o conteúdo de produtos dentro de cada categoria é que vem do backend.

### 2.8 Home (`src/Home/Main.tsx`, `Components/Tile.tsx`)

- Os 10 tiles com `href` já apontam pra `/produtos/{slug}` correspondentes às categorias de `categories.ts`. Não depende de nenhuma API — são links estáticos. Nenhuma ação necessária aqui além de manter os slugs sincronizados com os de `categories.ts` se algum slug mudar.
- O tile "SALE ATÉ 50% OFF" e os dois `PromoBanner` não têm rota — ficam sem link até existir uma categoria/coleção "promoção" real (decisão de produto, não técnica).

### 2.9 Página de produto sem categoria — `app/produtos/page.tsx`

- Renderiza `<Main />` sem `category`, cai no `DEFAULT_BANNER` ("Catálogo") definido dentro de `Main.tsx`. Vitrine "todos os produtos" — no backend real isso é uma chamada de listagem **sem filtro de categoria** (`GET /produtos` geral, paginado/ordenado igual às demais).

### 2.10 Página de detalhe do produto — **não existe**

- Não há rota `/produto/[sku]`, nem componente, nem tipo, nem menção em nenhum arquivo atual além do `Product.sku` já existir no tipo (o que ajuda: o SKU já está disponível em cada card pra servir de link no futuro). Precisa: nova rota dinâmica, novo endpoint de backend (`GET /produtos/:sku`), e todo o design (nunca foi mostrado um Figma dessa tela até agora).

### 2.11 Scaffolds já existentes mas não usados

- `src/services/api.js` — instância `axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })`, pronta pra usar, mas **nenhum lugar do código a importa hoje**.
- `src/configurations/ApiConfig.js` — mesma ideia, com um `Router: {}` vazio (provavelmente pensado pra centralizar paths dos endpoints — hoje vazio).
- `src/configurations/PaginationConfig.js` — `PaginationDefault` com `pageNumber/pageSize/total/status/...`, no padrão do backoffice de referência (`private-sale-api`/admin) — dá uma pista do contrato de paginação que os outros projetos do time já usam (`pageNumber`+`pageSize` em vez de cursor), útil como ponto de partida pra não inventar um contrato novo sem necessidade.
- **Nenhum `.env.local` existe ainda** — `NEXT_PUBLIC_API_URL` não está definido em lugar nenhum. Esse é literalmente o primeiro passo técnico do dia da integração.

---

## 3. O que precisa existir na API de catálogo (do outro dev backend)

Esta seção é a lista de **requisitos a alinhar com quem está construindo essa API** — não é trabalho nosso a codar. Serve como pauta de conversa/handoff.

### 3.1 Endpoints que o frontend vai precisar consumir

Hoje **nenhum desses existe** (nem do nosso lado nem, até onde sabemos, do lado do outro dev — confirmar status com ele). Lista derivada diretamente do inventário da seção 2:

| Endpoint (sugestão) | Uso no frontend |
|---|---|
| `GET /categorias` | Se decidirmos que a lista de categorias vem do backend (ver 2.1) |
| `GET /categorias/:id/produtos?sort=&page=&filtro[...]=` | Listagem com ordenação/paginação/filtro server-side |
| `GET /categorias/:id/filtros` | Atributos/valores disponíveis pra montar o painel de filtro |
| `GET /produtos?sort=&page=` | Vitrine "todos os produtos" (`/produtos` sem categoria) |
| `GET /produtos/:sku` | Página de detalhe (futura) |

Esses endpoints leem do **schema do BI** (que tem `disponivel`, `precoDe/precoPor`, imagens, atributos — tudo que falta pra virar dado real). Pontos a validar com o outro dev:
- Formato exato de resposta (nomes de campo, se preço vem em centavos ou decimal, formato de imagens/atributos).
- Contrato de paginação: por página/offset (`pageNumber`/`pageSize`, padrão já usado em outros projetos do time — ver `PaginationConfig.js`) ou por cursor.
- Contrato de ordenação e de filtro (sintaxe de query string).
- Se o campo `disponivel` (calculado pelo nosso `totem-catalog-api`, ver 3.2) já estará populado/confiável quando essa API for consumida, ou se por ora deve ser ignorado/tratado como sempre disponível.

### 3.2 Cálculo de `disponivel` (responsabilidade do `totem-catalog-api`, nosso)

- Hoje o sync Wake só escreve nas nossas tabelas de staging (`Product.available`). **Nunca foi implementada a escrita real na coluna `produtos.disponivel` do banco da BI** — essa era a Workstream 1 do plano anterior e não chegou a ser codada (só o hardening do sync Wake em si: `SyncFailure`, fix do `camposAdicionais`, etc.).
- Falta: um job (cron, provavelmente reaproveitando a mesma cadência do polling incremental) que: lê disponibilidade combinando Wake (já temos) + Reserva API (não temos) + Milenium API (não temos) e faz `UPDATE produtos SET disponivel = ? WHERE sku = ?` no banco da BI.
- **Bloqueado** por: acesso ao banco da BI (credenciais) e por documentação/acesso a Reserva e Milenium (zero informação até agora).
- Isso é trabalho nosso (`totem-catalog-api`), mas é **transparente para o frontend** — o `totem-app` só consome o campo `disponivel` já calculado, através da API de catálogo do outro dev (item 3.1). Não é algo que o frontend chama diretamente.

### 3.3 Banco da BI

- Schema conhecido (ERD): `produtos`, `produtos_imagens`, `produtos_categorias`, `categorias`, `marcas`, `marcas_categorias`, `atributos`, `atributos_valores`, `produtos_atributos_valores`, `categorias_atributos`.
- Verificar se as credenciais já foram entregues (o prazo combinado era "segunda", e hoje é segunda 06/07) — isso desbloqueia tanto a API de catálogo (3.1, do outro dev) quanto o job de disponibilidade (3.2, nosso).

---

## 4. Passo a passo sugerido (ordem de execução)

Passos marcados **[outro dev]** não são nossos — dependem do repositório da API de catálogo. Ficam aqui pra rastrear a dependência, não como tarefa nossa.

1. **[coordenação]** Confirmar com o dev backend o status da API de catálogo e alinhar o contrato dos endpoints da seção 3.1 (rotas, formato de resposta, paginação, ordenação, filtro) — esse alinhamento é o que evita retrabalho dos dois lados.
2. **[outro dev]** Acesso ao banco da BI confirmado + API de catálogo implementada (ao menos listagem por categoria, o caminho crítico do frontend).
3. **No frontend**: criar `.env.local` com `NEXT_PUBLIC_API_URL` apontando pra API de catálogo (não pro `totem-catalog-api`), validar que `src/services/api.js` está com a baseURL certa.
4. **No frontend**: trocar `mocks.ts` por uma chamada real em `Main.tsx` (via Server Component fetch, já que a page já é `async`) — primeiro só listagem, sem filtro nem ordenação, pra validar o caminho de ponta a ponta contra a API real.
5. **No frontend**: trocar `sort.ts` (client-side) por query param real (`?sort=`), remover o slice manual de paginação e ligar `LoadMore` a uma nova página de resultados.
6. **Decidir e implementar o contrato de filtro** (item 2.5) — o mais aberto de todos, precisa de alinhamento de produto (e com o outro dev) antes de código.
7. **Adicionar `available` ao tipo `Product`** e decidir/implementar o tratamento visual de produto indisponível.
8. **Confirmar `images.remotePatterns`** (`next.config.ts`) cobre o(s) domínio(s) reais de onde as imagens da BI vêm (pode não ser o mesmo CDN da Wake usado nos mocks).
9. **Revisar slugs de categoria**: confirmar que os 10 slugs inventados em `categories.ts` batem com as categorias reais que a BI vai ter (ou mapear manualmente slug→id) — alinhar com o outro dev quais ids/slugs a API de catálogo expõe.
10. **Construir a página de detalhe do produto** (`/produto/[sku]`) — hoje não existe em nenhum lado (rota, componente, endpoint, design).
11. **[nosso, `totem-catalog-api`]** Implementar o job de disponibilidade (item 3.2) — depende ainda de Reserva/Milenium, pode ficar pra depois das etapas acima, já que não bloqueia a listagem em si (só o campo `available`), e é transparente pro frontend.

## 5. Pontos de atenção

- `getCategoryBySlug` numa Server Component (`app/produtos/[categoria]/page.tsx`) hoje é síncrono; ao virar chamada de API, o `notFound()` continua funcionando igual (só passa a depender de um `await` real em vez de `.find()`), mas o cenário de erro de rede/timeout da API precisa de tratamento (hoje inexistente) — considerar `error.tsx`/`loading.tsx` do App Router, que nunca foram necessários até agora porque tudo é síncrono e instantâneo.
- O padrão `key={category.slug}` em `Main` (que reseta paginação/colunas/ordenação ao trocar de categoria) continua válido com dado assíncrono — não precisa mudar.
- Com dado real (19 mil+ produtos em vez de 12), qualquer lógica que hoje "carrega tudo e filtra/ordena no cliente" (filtro por categoria, ordenação, paginação) É a lista de coisas que **tem que** virar server-side — não é opcional/otimização, é o que evita travar o totem carregando o catálogo inteiro no browser.
- Reserva/Milenium não bloqueiam listagem, preço, imagem ou navegação — só o campo `available`. Não usar isso como desculpa pra atrasar o resto da integração.

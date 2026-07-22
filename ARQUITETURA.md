# Arquitetura — React e Next.js

Regras obrigatórias em todo código gerado ou refatorado. Sem exceções.

**Aplique as regras na ordem em que aparecem neste documento** — elas seguem a sequência de execução: primeiro o contexto (global, stack, fundação de código), depois estrutura, dados, lógica, apresentação e estilização. Execute de cima para baixo.

---

## Passo 0 — Verificar `global/` antes de tudo

Ao aplicar as regras em qualquer página, **antes de qualquer coisa**, inspecionar `global/`:

1. **Consumir** — se já existe componente, tipo ou função em `global/` que serve, usar em vez de recriar
2. **Promover** — se encontrar na página uma função de formatação genérica ou componente claramente reutilizável, mover para `global/`
3. **Cautela** — promover só com certeza. Genérico e reutilizável em mais de um lugar sobe; específico de contexto fica local. Na dúvida, manter local e perguntar. Duplicação consciente é melhor que abstração errada.

**Vai para `global/utils/`:** formatação de data, valores, máscaras, truncamento — funções puras, sem state, sem API, sem JSX.
**Fica local:** lógica de negócio, validação específica, qualquer função que muda conforme o contexto da página.

---

## Passo 1 — Identificar o stack

Identificar antes de gerar qualquer código. Nunca assumir.

| Contexto | Extensões |
|---|---|
| React/Next + JavaScript | `.jsx`, `.js` |
| React/Next + TypeScript | `.tsx`, `.ts` |

Nunca misturar extensões. Sem TypeScript confirmado, não criar arquivos de types.

| Estilização | Como usar |
|---|---|
| Tailwind | classes utilitárias |
| Styled Components | `styled`, nunca inline |
| CSS Modules | importar `.module.css` |
| CSS puro | importar `.css` |

Sem identificar a solução de estilo, perguntar antes de gerar.

---

## Passo 2 — Fundação de código (vale para todo código escrito)

Estas regras se aplicam a qualquer arquivo, em qualquer etapa.

### 2.1 Funções — declaração e export
Sempre `function`. Nunca `const` com arrow para declarar funções ou componentes. Arrow permitida apenas em callbacks inline (`.map()`, `.filter()`, eventos JSX). A função principal do arquivo é exportada direto na declaração.

```js
// ✅
export default function useProductsHook() { ... }
function handleSubmit() { ... }

// ❌
const handleSubmit = () => { ... }
function useProductsHook() { ... }
export default useProductsHook;
```

### 2.2 Nomenclatura

| Item | Regra | Exemplo |
|---|---|---|
| Pasta da página | PascalCase | `ProductList/` |
| Arquivo de API | NomeAPI.js | `ProductsAPI.js` |
| Hook | use + Nome + Hook | `useProductsHook.js` |
| Componente | PascalCase | `ProductCard.jsx` |
| Arquivo raiz | sempre `Main.jsx` | `Main.jsx` |
| Função de evento | prefixo `handle` | `handleSubmit`, `handleModal` |
| Função de API | método HTTP maiúsculo | `GETProducts`, `POSTCreate`, `DELETEItem` |
| Parâmetro de laço | singular descritivo | `product`, `user` — nunca `r`, `i`, `x`, `item` |

### 2.3 Funções relacionadas — unificar com parâmetro de ação
```js
// ✅
function handleModal(action, product) {
  if (action === "open") setModal({ open: true, ...product });
  if (action === "close") setModal({ open: false, id: null });
}

// ❌
function openModal(product) { ... }
function closeModal() { ... }
```

### 2.4 Tamanho de funções — limite de 92 linhas
Funções grandes são quebradas em auxiliares abaixo no mesmo arquivo. Se as auxiliares crescerem (30~40+ linhas), ganham arquivo próprio em `Hooks/functions/` com nome idêntico à função exportada. Auxiliares são usadas dentro do hook, nunca expostas a componentes.

### 2.5 Early return — sem aninhamento
Retornar cedo quando uma condição impede o caminho principal. Nunca `else` após bloco que termina com `return`.
```js
// ✅
function handleSubmit(data) {
  if (!data) return;
  if (!data.name) return;
  if (requestStatus.loading) return;
  POSTCreateProduct(data, setRequestStatus);
}
```

### 2.6 `console.log` — proibido
Erros são tratados via `requestStatus.error` e exibidos em modal.

---

## Passo 3 — Estrutura de pastas

```
src/
├── global/                    # Compartilhado — "a bancada": pega e usa
│   ├── components/            # Componentes usados em mais de uma página (ex: menu flutuante, ModalError)
│   ├── types/                 # Tipagens centralizadas (ver Passo 4)
│   └── utils/                 # Funções puras de formatação (formatPrice, formatDate, maskCPF...)
├── configurations/            # Infraestrutura sensível — "ferramentas de precisão"
│   ├── ApiConfig.js           # Hosts e rotas
│   └── PaginationConfig.js    # Estado padrão de paginação
├── services/
│   └── api.js                 # Instância centralizada do axios
└── PageName/                  # Cada página é autossuficiente
    ├── API/                   # Chamadas à API
    ├── Hooks/
    │   ├── useNomeHook.js
    │   └── functions/         # Auxiliares dos hooks (quando necessário)
    ├── Components/            # Componentes exclusivos da página
    └── Main.jsx               # Orquestrador
```

`global/` guarda o reutilizável entre páginas. `configurations/` e `services/` são infraestrutura e ficam fora do `global/`.

**Fluxo de dados:**
```
global/ ⇄ [ API/ ──► Hooks/ ──► Main.jsx ──► Components/ ]
```

---

## Passo 4 — Types (só com TypeScript)

Todas as tipagens em `global/types/`: um arquivo por página + `global.tsx` para tipos compartilhados.

```
global/types/
├── global.tsx      # tipos usados por várias páginas (RequestStatus, Pagination...)
├── home.tsx        # tipos da home + re-exporta o que usa de global
├── product.tsx
└── users.tsx
```

O arquivo da página importa de `global.tsx` e **re-exporta** junto com os próprios tipos. Ao trabalhar numa página, todos os tipos vêm de um único arquivo — nunca importar direto de `global.tsx`.

```ts
// global/types/global.tsx
export type RequestStatus = { loading: boolean; error: string | null };
export type Pagination = { pageNumber: number; pageSize: number; total: number | null };
```

```ts
// global/types/home.tsx
import { RequestStatus, Pagination } from "./global";
export type { RequestStatus, Pagination };          // re-exporta o que a home usa

export type Product = { id: number; name: string; price: number };
export type ModalInfoProduct = { open: boolean; id: number | null; name: string };
```

```ts
// Home/Hooks/useHomeHook.ts — tudo de um ponto só
import { Product, RequestStatus, ModalInfoProduct } from "@/global/types/home";
```

---

## Passo 5 — Camada de dados (API, configurações, ambiente)

### 5.1 Arquivos de API — um por página
Um arquivo `NomeAPI.js` agrupa todas as chamadas da página. Nunca um arquivo por função.

### 5.2 ApiConfig e PaginationConfig
Nenhuma URL avulsa ou paginação do zero. Tudo parte de `configurations/`.
```js
// ApiConfig.js
export const ApiConfig = {
  Host: { production: process.env.NEXT_PUBLIC_API_URL },
  Router: {
    Products: "/products",
    ProductDetails: function (id) { return "/products/" + id + "/details"; },
  },
};
```
```js
// PaginationConfig.js
export const PaginationDefault = { pageNumber: 1, pageSize: 7, total: null, loading: false };

// ✅ — campos extras via spread
const [pagination, setPagination] = useState({ ...PaginationDefault, category: null });
```

### 5.3 Axios — instância centralizada
`API/` nunca importa axios direto — sempre a instância de `services/api.js`.
```js
// services/api.js
import axios from "axios";
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // ou import.meta.env.VITE_API_URL (Vite)
  headers: { "Content-Type": "application/json" },
});
```

### 5.4 Variáveis de ambiente
`.env` na raiz. Next.js → `NEXT_PUBLIC_` / Vite → `VITE_`. URL da API sempre `NEXT_PUBLIC_API_URL` em Next.js.

---

## Passo 6 — Camada de lógica (Hooks e State)

### 6.1 States — objeto único + nomenclatura por tipo
States relacionados são um objeto único. Nunca separados.

| Tipo | Convenção | Exemplo |
|---|---|---|
| Lista | plural | `products` |
| Item único | singular | `product` |
| Requisição | sempre `requestStatus` | `requestStatus` |
| Modal | `modal` + Nome | `modalInfoProduct` |
| Filtro | `filterState` | `filterState` |
| Paginação | sempre `pagination` | `pagination` |
| Seleção | `selected` + Nome | `selectedProduct` |

```js
// ✅
const [requestStatus, setRequestStatus] = useState({ loading: false, error: null });

// ❌
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### 6.2 Separação de concerns — um hook por responsabilidade
Múltiplas responsabilidades = múltiplos hooks. `Main.jsx` consome todos. Nunca um hook monolítico.

| Responsabilidade | Hook |
|---|---|
| Listagem + paginação | `useNomeListHook` |
| Filtros | `useFilterNomeHook` |
| Modal | `useModalNomeHook` |
| Formulário | `useFormNomeHook` |

### 6.3 Anatomia do hook — ordem + return
Ordem interna: **states → funções de API → useEffect → handlers → return**.
O `return` expõe apenas o que o componente consome. Nunca setters (`setProducts`) nem auxiliares internas.
```js
export default function useProductsHook() {
  const [products, setProducts] = useState([]);
  const [requestStatus, setRequestStatus] = useState({ loading: false, error: null });

  useEffect(function () {
    GETProducts(setProducts, setRequestStatus);
  }, []);

  function handleFilter(action) {
    if (action === "apply") GETProducts(setProducts, setRequestStatus, filterState);
  }

  return { products, requestStatus, handleFilter };  // só o necessário
}
```

### 6.4 `useEffect` — apenas GET inicial
Usado só para a chamada inicial ao montar. Interações do usuário via funções diretas, nunca `useEffect` observando state.
```js
// ✅
useEffect(function () { GETProducts(setProducts, setRequestStatus); }, []);
// ❌
useEffect(function () { GETProducts(...); }, [filterState]);
```
**Next.js — dois cenários:**
- *Frontend separado (API externa via axios):* GET via `useEffect` com `[]` — padrão desta arquitetura
- *Backend acoplado (App Router):* fetch no servidor via Server Components, hook cliente recebe dados via props. `"use client"` só onde há estado real no cliente

### 6.5 Modal — hook próprio + objeto único
Estado como objeto único com `open` + dados. `handleModal(action, data)` abre, fecha e limpa.
```js
export default function useModalInfoProductHook() {
  const [modalInfoProduct, setModalInfoProduct] = useState({ open: false, id: null, name: "" });

  function handleModal(action, product) {
    if (action === "open") setModalInfoProduct({ open: true, ...product });
    if (action === "close") setModalInfoProduct({ open: false, id: null, name: "" });
  }

  return { modalInfoProduct, handleModal };
}
```

### 6.6 Ciclo de requisição — requestStatus + feedback + erro
**Na API/:** setar loading, tratar erro contextual, erro 500 com mensagem padrão de suporte.
```js
async function GETProducts(setProducts, setRequestStatus) {
  setRequestStatus({ loading: true, error: null });
  api.get(ApiConfig.Router.Products)
    .then(function (response) {
      setProducts(response.data);
      setRequestStatus({ loading: false, error: null });
    })
    .catch(function (error) {
      const status = error.response?.status;
      const message = status === 500
        ? "Ocorreu um erro interno. Por favor, entre em contato com o suporte."
        : error.response?.data?.message || "Ocorreu um erro inesperado.";
      setRequestStatus({ loading: false, error: message });
    });
}
```
**No componente — feedback obrigatório:** loading de listagem → `Skeleton`; loading de ação → botão desabilitado; erro → modal; três estados de listagem sempre cobertos (`loading`, `vazio`, `com dados`).
```tsx
{requestStatus.loading && <Skeleton className="h-12 w-full" />}
{!requestStatus.loading && products.length === 0 && <p>Nenhum item encontrado.</p>}
{!requestStatus.loading && products.length > 0 && <ul>{products.map(...)}</ul>}
{requestStatus.error && <ModalError message={requestStatus.error} onClose={() => handleModalError("close")} />}
```

### 6.7 Formulários — `react-hook-form` + Shadcn Form
Lógica no hook (registro, validação, submit). JSX usa `Form`, `FormField`, `FormItem`, `FormLabel`, `FormMessage` do Shadcn.
```js
export default function useCreateProductHook() {
  const form = useForm({ defaultValues: { name: "", price: 0 } });
  function handleSubmit(data) { POSTCreateProduct(data, setRequestStatus); }
  return { form, handleSubmit: form.handleSubmit(handleSubmit), requestStatus };
}
```

---

## Passo 7 — Camada de apresentação (Main e Components)

### 7.1 Componentes — apenas renderização
Aplica-se a **todos** — `Main.jsx` e `Components/`.
**Permitido:** consumo do hook (só no `Main.jsx`), recebimento de props via `props`, JSX, condicionais de renderização, importar formatação pura de `global/utils/`.
**Proibido:** declarar funções ou variáveis de lógica, `useState`/`useEffect`/qualquer hook React, tipagens locais, importar auxiliares de lógica.
```tsx
// ✅ — Main.jsx
export default function Main() {
  const { products, requestStatus, handleModal } = useProductsHook();
  return <ProductCard products={products} requestStatus={requestStatus} handleModal={handleModal} />;
}

// ✅ — componente filho
export default function ProductCard(props) {
  const { products, handleModal } = props;
  return (
    <ul>
      {products.map(function (product) {
        return <li key={product.id}>
          <span>{formatPrice(product.price)}</span>
          <Button onClick={() => handleModal("open", product)}>Ver</Button>
        </li>;
      })}
    </ul>
  );
}

// ❌
export default function ProductCard(props) {
  const [isOpen, setIsOpen] = useState(false);   // proibido
  function handleClick() { ... }                  // proibido
  const isAvailable = props.stock > 0;            // proibido
}
```

### 7.2 Props — objeto inteiro, mesmo nome, sem aliases
- Passar objeto de estado inteiro + handler, nunca propriedade por propriedade
- Mesmo nome em todas as camadas — do hook ao componente filho
- Nunca aliases genéricos (`data`, `handler`, `config`)
- Desestruturar via `props` no filho
- Acessar valores via `objeto.propriedade`, sem desestruturar objetos de estado (exceto no `Main.jsx` ao consumir o hook)
```tsx
// ✅
<ProductCard productsState={productsState} handleModal={handleModal} />
export default function ProductCard(props) {
  const { productsState, handleModal } = props;
}
// ❌
<ProductCard data={productsState} onAction={handleModal} />
```

### 7.3 Prop `key` — ID único, nunca índice
```tsx
// ✅
products.map(function (product) { return <ProductCard key={product.id} product={product} />; });
// ❌
products.map(function (product, index) { return <ProductCard key={index} product={product} />; });
```
Índice só em listas estáticas que nunca mudam de ordem.

### 7.4 Hierarquia de elementos — Shadcn → HTML semântico → div
1. **Shadcn** — sempre verificar primeiro
2. **HTML semântico** — quando Shadcn não cobre
3. **`div`** — só agrupamento estrutural

| Shadcn | Uso | | Tag | Uso |
|---|---|---|---|---|
| `Button` | botões | | `<section>` | bloco temático |
| `Input` | campos | | `<article>` | conteúdo autossuficiente |
| `Dialog` | modais | | `<header>`/`<footer>` | cabeçalho/rodapé |
| `Table` | tabelas | | `<main>` | conteúdo principal |
| `Card` | containers | | `<nav>` | navegação |
| `Skeleton` | loading | | `<aside>` | complementar/sidebar |
| `Form` | formulários | | `<ul>`/`<li>` | listas |
| `Select`/`Sheet`/`Badge`/`Tabs`/`Toast` | conforme caso | | `<div>` | último recurso |

`section` quando há tema e faria sentido ter título. `div` quando é só layout.

---

## Passo 8 — Estilização

- **Fonte:** Outfit (pesos 100–900). Em **Next.js**, carregar via `next/font/google` (otimiza, hospeda local, evita layout shift) e registrar no Tailwind como fonte `sans`. Em **Vite/React puro**, usar `<link>` com preconnect no `index.html`.

```tsx
// Next.js — app/layout.tsx
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
// <html className={outfit.variable}>
```
```css
/* Tailwind v4 — no CSS */
@theme { --font-sans: var(--font-outfit), sans-serif; }
```
```js
// Tailwind v3 — tailwind.config.js
theme: { extend: { fontFamily: { sans: ["var(--font-outfit)", "sans-serif"] } } }
```
Registrada como `sans`, o Outfit vira a fonte padrão do projeto sem precisar de classe.

- **Bordas:** sempre `border-radius: 4px`
- **Cursor contextual:** `pointer` (clicáveis), `text` (inputs), `not-allowed` (desabilitado), `grab` (arrastar)
- **Espaçamento:** ordem de preferência → `gap` > `height` fixo centralizado > `padding` lateral > `padding` vertical > `margin` lateral > `margin` vertical (último recurso)
- **Inputs:** sempre remover `outline` e `box-shadow` padrão do navegador
- **Responsividade:** mobile-first obrigatório — base para 375px, breakpoints (`sm:640` `md:768` `lg:1024` `xl:1280`) para cima

```tsx
// ✅ mobile-first
<section className="flex flex-col gap-4 md:flex-row md:gap-8">
```

---

## Responsabilidades por Camada

| Camada | Faz | Nunca faz |
|---|---|---|
| `global/` | Componentes, types e utils compartilhados | Lógica de negócio específica |
| `configurations/` | Hosts, rotas, paginação | Lógica, state |
| `services/` | Instância axios | Chamadas de negócio |
| `API/` | Chamadas axios | URLs avulsas, state |
| `Hooks/` | State, lógica, expor via return | Chamar API sem passar setters |
| `Components/` | Renderizar props | Lógica, state, funções |
| `Main.jsx` | Consumir hooks, distribuir props | useEffect, lógica |

---

## Checklist final (validar após cada página)

**Contexto**
- [ ] Verificou `global/` — consumiu o que existe, promoveu o genérico (com cautela)
- [ ] Stack identificado (arquivos e estilização)

**Estrutura**
- [ ] Pastas `API/` `Hooks/` `Components/` `Main.jsx` criadas
- [ ] Um arquivo de API por página
- [ ] Hooks separados por responsabilidade
- [ ] Types em `global/types/` — arquivo por página re-exportando de `global.tsx`

**Fundação de código**
- [ ] Funções com `function`; `export default function` direto
- [ ] API com método HTTP maiúsculo; laços com parâmetro descritivo
- [ ] Funções relacionadas unificadas com parâmetro de ação
- [ ] Nenhuma função acima de 92 linhas; early return; sem `console.log`

**Lógica**
- [ ] States em objeto único, nomeados por tipo
- [ ] Hook na ordem: states → API → useEffect → handlers → return
- [ ] `return` sem setters nem auxiliares internas
- [ ] `useEffect` só para GET inicial com `[]`
- [ ] `requestStatus` com feedback visual e erro em modal (500 = mensagem de suporte)
- [ ] Três estados de listagem cobertos
- [ ] Modal com hook próprio; formulários com `react-hook-form` + Shadcn Form

**Dados/Infra**
- [ ] Rotas via `ApiConfig.Router`; axios via instância central
- [ ] `.env` com prefixo correto; paginação via `PaginationDefault`

**Apresentação**
- [ ] Componentes sem funções, variáveis, hooks React ou tipagens locais
- [ ] Props com mesmo nome da origem, objeto inteiro, desestruturadas via `props`
- [ ] `key` com ID único, nunca índice
- [ ] Imports na ordem: libs → Shadcn → configurations → global → hooks → components

**UI/Estilo**
- [ ] Hierarquia Shadcn → semântico → `div`
- [ ] Mobile-first; `border-radius: 4px`; cursor contextual; inputs sem outline
- [ ] Espaçamento via `gap`/`height`, margin vertical só em último caso
- [ ] Fonte Outfit configurada (next/font em Next.js, registrada como `sans` no Tailwind)

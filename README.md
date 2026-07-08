# Totem Orit

<div align="center">
  <img src="./public/orit-simbolo.svg" alt="Logo ORIT" width="200"/>
</div>

<div align="center">

  ![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

</div>

## 📖 Explicação

Aplicação web para o totem de autoatendimento da Orit, pensado para rodar em tela vertical de kiosk. Permite que o cliente navegue pelo catálogo de joias e relógios diretamente na loja, sem depender de um vendedor, incluindo:

- **Home** - Vitrine principal com vídeo de destaque e atalhos por categoria (Sale, Relógios, Novidades, Vintage, Diamantes, Marcas Icônicas, Anéis, Brincos, Colares, Pingentes, Pulseiras) e banners promocionais
- **Listagem de produtos** - Catálogo por categoria (`/produtos/[categoria]`) com filtros (marca, faixa de preço, entre outros conforme o atributo existir no produto), ordenação (nome, menor/maior preço, novidades), alternância de colunas (3/4) e paginação incremental ("carregar mais")
- **Detalhe do produto** - Página de produto (`/info-product/[sku]`) com carrossel de imagens, informações de preço/parcelamento e accordion de detalhes (medidas, garantia, política de troca)
- **Menu flutuante** - Drawer de navegação acessível a partir do header em qualquer página

## 📅 Rotinas diárias

- **Exibição contínua em loja** - o app roda em modo kiosk, sem interação de operador
- **Atualização de catálogo** - conforme a integração com o backend de produtos evoluir, os itens exibidos refletem o estoque sincronizado
- **Ajuste de banners e categorias** - atualização de arte/texto de banners promocionais e de categoria (`src/Produtos/Listagem/categories.ts`) conforme o time de design entrega novo material

## 🔗 Projetos que dependem dele

- Nenhum

## 🔌 Projetos que ele depende

- **totem-catalog-api** - API de catálogo de produtos (integração ainda não concluída; os dados de listagem/detalhe hoje vêm de mock, ver `src/Produtos/Listagem/mocks.ts`)

## 🛠️ Tecnologias utilizadas

<div align="center">

### Core
![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### UI & Estilo
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Comunicação & Dados
![Axios](https://img.shields.io/badge/Axios-1.18.1-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

**Principais dependências:**

- **Next.js** `16.2.10` - Framework React com SSR e App Router (Turbopack)
- **React** `19.2.4` - Biblioteca JavaScript para interfaces
- **TypeScript** `5` - Superset JavaScript com tipagem estática
- **Tailwind CSS** `4` - Framework CSS utility-first
- **Axios** `1.18.1` - Cliente HTTP para requisições à API (integração com a totem-catalog-api ainda em andamento)

**DevDependencies:**

- **ESLint** `9` - Linting e qualidade de código (`eslint-config-next`)
- **@tailwindcss/postcss** - Processamento CSS

## 🗄️ Onde o banco está hospedado e o nome

- Não aplicável neste repositório - os dados de catálogo são gerenciados pela **totem-catalog-api**; o frontend não acessa banco de dados diretamente

## 🌐 Link do domínio

- A definir - projeto ainda não hospedado

## 📦 Link do repositório

```
https://github.com/oritlab/totem-app
```

## ☁️ Já está na AWS? E quais serviços usa?

**Status**: Ainda não hospedado

## 🔍 Algo monitora ele?

- A definir - sem monitoramento configurado até o momento

---

## ⚙️ Setup e Instalação

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) versão 20 ou superior (LTS recomendada)
- NPM
- Variáveis de ambiente configuradas (ver seção abaixo)

### 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/oritlab/totem-app.git
cd totem-app

# Instale as dependências
npm install
```

### 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```bash
NEXT_PUBLIC_API_URL=          # host da API consumida pelo app
NEXT_PUBLIC_TOTEM_CDN_HOST=   # host do CDN de imagens dos banners/categorias
```

### ▶️ Executar o projeto

```bash
# Iniciar em modo desenvolvimento
npm run dev

# Acesse: http://localhost:3000
```

### 🏗️ Build e Produção

```bash
# Build da aplicação
npm run build

# Iniciar servidor de produção
npm start

# A aplicação estará disponível na porta 3000
```

---

## 🚀 Deploy

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# O output estará na pasta .next/
```

@AGENTS.md
@AGENTS.md
# Mapa de integração com o backend

Antes de iniciar qualquer tarefa neste projeto, leia `Context/Integracao-Backend.md` — é o mapa vivo de tudo que ainda é mock no frontend e do que precisa existir na API de catálogo (construída por outro dev, em outro repositório) para a integração real acontecer.

Sempre que uma tarefa tocar em algo mapeado nesse documento (mock que virou dado real, endpoint definido/implementado do lado do outro dev, decisão de contrato de filtro/ordenação/paginação, rota nova, campo novo no tipo `Product`, etc.), atualize o documento ao final da tarefa. Ao atualizar:

- Mantenha a estrutura de seções já existente (1. Estado atual, 2. Inventário do frontend, 3. API de catálogo, 4. Passo a passo, 5. Pontos de atenção) — não recrie do zero.
- Releia a seção afetada antes de editar para não duplicar um passo/item que já está documentado com outras palavras.
- Se um item deixou de ser válido (mock substituído, endpoint já implementado, decisão já tomada), edite/remova o trecho em vez de só adicionar um novo ao lado.

# Arquitetura obrigatória de código

Antes de gerar ou refatorar qualquer código neste projeto, leia `Context/Arquitetura-React-Next.md` por completo — é o conjunto de regras obrigatório (estrutura de pastas, nomenclatura, hooks, componentes, state, UI) para todo ajuste aplicado a partir de agora. Sem exceções, mesmo em mudanças pequenas.

Se uma regra da arquitetura conflitar com uma decisão já tomada e documentada no projeto (ex: fontes escolhidas após comparação com Figma, layout orientado a `landscape:`/`portrait:` em vez de mobile-first, ausência de Shadcn/UI, estilo de desestruturação de props já usado em todo o código), pare e avise o usuário explicitamente sobre o conflito antes de aplicar a mudança — não decida sozinho qual das duas regras vale.

## Processo de aplicação — nunca pular etapas

1. **Uma pasta/página por vez.** Nunca aplicar a arquitetura no projeto inteiro de uma só tarefa. Siga a tabela em `Context/Checklist-Arquitetura.md`, de cima para baixo, uma linha por vez.
2. Ao concluir os ajustes de uma linha, pare e peça confirmação explícita do usuário antes de marcar a linha como `ok` na tabela e seguir para a próxima.
3. Depois de qualquer alteração na estrutura de arquivos/pastas do projeto (nova página, nova feature, arquivo movido/renomeado), releia `Context/Checklist-Arquitetura.md` e adicione/ajuste linhas para refletir o estado real — a tabela não pode ficar desatualizada.
4. O prompt-gatilho para retomar essa revisão é: "Revise o projeto veja se está de acordo com a arquitetura mencionada abaixo" seguido do conteúdo de `Context/Arquitetura-React-Next.md` — ao recebê-lo (ou ao ser instruído a continuar a revisão), consulte `Context/Checklist-Arquitetura.md` para saber exatamente em qual linha retomar.

## Conflitos já resolvidos (não perguntar de novo)

- **Regras visuais da arquitetura (fonte Google Sans Flex, `border-radius: 4px` universal) vs. design já aprovado no Figma**: decidido em 2026-07-06 que o visual aprovado no Figma prevalece. Não trocar a fonte (Geist/Geist Mono/Outfit) nem adicionar `border-radius` onde o Figma define cantos retos. Essas duas regras da seção 23 da arquitetura ficam efetivamente não aplicadas neste projeto — não reabrir essa pergunta por arquivo.
- **Componentes de UI reutilizáveis (ex: `Header`, `MenuDrawer`) NÃO são duplicados por página, mesmo com a regra 21 dizendo que tipos/lógica de página não são compartilhados entre páginas.** A regra 21 fala de dado/tipo/lógica de negócio de página (aí sim, cada página tem sua própria cópia — ex: `categories.ts`/`types.ts` de produtos, que permanecem duplicados por página). Um componente visual reutilizável (logo, drawer, menu) é outra categoria — fica um único arquivo, consumido por quantas páginas precisarem.
- **Onde mora o Header/menu (atualizado em 2026-07-07, após merge com `origin/development`)**: `origin/development` já tinha sua própria implementação (via PRs `feat/homePage`/`feat/arquitetura`) — `Header.tsx`, `MenuDrawer.tsx` e `useMenuHook.ts` em `src/Home/`, mais madura (assets reais, vídeo no Hero) que a nossa versão local (`src/shared/`). Decidimos **manter a delas** como canônica, só adicionando suporte a `theme` (`"light"`/`"dark"`, com `public/logo-dark.svg`) no `Header.tsx`, que a Listagem precisa pro banner "split" sobre fundo claro. `src/shared/` foi removida. A Listagem (`Produtos/Listagem/Components/HeroBanner.tsx` e `Main.tsx`) agora importa `Header`/`MenuDrawer`/`useMenuHook` direto de `src/Home/` — cross-import deliberado entre páginas, aceito porque é componente de UI, não dado de página.
- Os demais conflitos citados acima (mobile-first vs. `landscape:`/`portrait:`, ausência de Shadcn/UI, estilo de desestruturação de props) ainda não têm decisão padrão — continuam exigindo aviso caso apareçam concretamente em algum arquivo.

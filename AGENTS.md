<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mapa de integração com o backend

Antes de iniciar qualquer tarefa neste projeto, leia `Context/Integracao-Backend.md` — é o mapa vivo de tudo que ainda é mock no frontend e do que precisa existir na API de catálogo (construída por outro dev, em outro repositório) para a integração real acontecer.

Sempre que uma tarefa tocar em algo mapeado nesse documento (mock que virou dado real, endpoint definido/implementado do lado do outro dev, decisão de contrato de filtro/ordenação/paginação, rota nova, campo novo no tipo `Product`, etc.), atualize o documento ao final da tarefa. Ao atualizar:

- Mantenha a estrutura de seções já existente (1. Estado atual, 2. Inventário do frontend, 3. API de catálogo, 4. Passo a passo, 5. Pontos de atenção) — não recrie do zero.
- Releia a seção afetada antes de editar para não duplicar um passo/item que já está documentado com outras palavras.
- Se um item deixou de ser válido (mock substituído, endpoint já implementado, decisão já tomada), edite/remova o trecho em vez de só adicionar um novo ao lado.

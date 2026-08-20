# Transpetro Estudos

Aplicativo de estudos para o concurso da **Transpetro** (Petrobras Transporte S.A.) — Edital nº 03 - TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO - 2026.3, Fundação Cesgranrio, cargo Profissional Transpetro de Nível Técnico, ênfase **Administração e Controle**.

Curso guiado, banco de questões, simulados, revisão espaçada e um Professor com IA — construído como PWA local-first (Next.js + IndexedDB via Dexie), com sincronização opcional via Supabase.

## Status do projeto: Fase 1 — motor pronto, conteúdo pendente

Este projeto nasceu da extração do **motor genérico** de um app-irmão (ENSITEC, feito para outro concurso), reaproveitando toda a arquitetura — schema de dados, navegação "Meu Curso", players de aula, motor de revisão espaçada, arquitetura do Professor IA, PWA — sem nenhum conteúdo pedagógico daquele projeto.

- ✅ Motor completo, funcionando (`npm run build`/`typecheck`/`test` passam)
- ✅ Dados reais do edital confirmados em [`config/concurso.ts`](./config/concurso.ts) (estrutura da prova, cronograma oficial, ênfase)
- ✅ Matriz completa do conteúdo programático (39 códigos) em [`MATRIZ_EDITAL_TRANSPETRO.md`](./MATRIZ_EDITAL_TRANSPETRO.md)
- ✅ Pesquisa preparatória de videoaulas em [`pesquisa/`](./pesquisa/) (curadoria inicial, não revisada linha a linha)
- ⏳ **Aulas, banco de questões e cronograma real ainda não existem** — `src/content/` está com placeholders vazios, aguardando a Fase 2

Ver [`docs/CONTINUIDADE_TRANSPETRO.md`](./docs/CONTINUIDADE_TRANSPETRO.md) e [`MAPA_DE_EXTRACAO.md`](./MAPA_DE_EXTRACAO.md) para o histórico completo da extração e o que falta.

## A prova (resumo)

- Prova objetiva única, 4h, **60 questões**: 40 de Conhecimentos Específicos (Administração e Controle) + 20 de Conhecimentos Gerais (10 Português + 10 Matemática)
- Elimina quem tirar < 50% em Específicas, < 50% em Gerais, ou zero em Português/Matemática isoladamente
- **Sem etapa de redação**
- Prova em 29/11/2026

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha com suas próprias credenciais (Supabase/OpenAI), opcional
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O núcleo do app funciona sem nenhuma chave de API configurada — o Professor com IA é uma integração opcional.

Outros comandos úteis:

```bash
npm run typecheck   # tsc --noEmit
npm run build        # build de produção (Next.js)
npm run test          # suíte de testes (vitest)
npm run lint            # eslint
```

## Stack

Next.js (App Router) · TypeScript · Zod · Dexie (IndexedDB) · Zustand · Supabase (sync opcional) · OpenAI (Professor, opcional) · Tailwind CSS · Vitest

## Estrutura

```
config/concurso.ts      dados oficiais do edital — única fonte de verdade para datas/pontuação
src/lib/                 motor: pedagogia, revisão espaçada, cronograma, Professor IA, banco local
src/content/             conteúdo do curso (aulas, questões, currículo) — placeholders, popular na Fase 2
src/app/                 rotas (App Router)
src/components/          componentes de UI
pesquisa/                pesquisa preparatória para a Fase 2 (videoaulas, mapeamento de reaproveitamento)
```

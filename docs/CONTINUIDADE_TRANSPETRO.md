# Continuidade — TRANSPETRO (Fase 1: extração do motor)

Este documento registra o estado do projeto ao final da Fase 1 (extração do motor genérico do ENSITEC), para orientar a Fase 2 (construção do conteúdo real da Transpetro).

## 1. O que foi extraído do ENSITEC e o que foi deixado de fora

Ver [`MAPA_DE_EXTRACAO.md`](../MAPA_DE_EXTRACAO.md) para a tabela completa. Resumo:

**Extraído (motor genérico):** app shell, autenticação, navegação "Meu Curso", componentes de UI, esquema de dados (Zod), banco local (Dexie), store (Zustand), pedagogia (domínio/revisão espaçada), progresso/desempenho, arquitetura do Professor IA (tool calling, system prompt, rotas de servidor), cronograma/calendário, players de slide/vídeo, motor de simulados, cliente Supabase, PWA.

**Não extraído (conteúdo específico de Araçás):** cronograma real de 34 missões, currículo/módulos/tópicos reais, todas as aulas, banco de questões (420+), propostas de redação, legislação, curadoria de videoaulas, documentação de continuidade do projeto de origem, qualquer chave/segredo real.

## 2. Dados do edital da Transpetro — CONFIRMADOS contra o PDF oficial

Durante a sessão, uma pesquisa paralela recebeu diretamente do usuário o PDF oficial do edital ("EDITAL E ANEXOS CONCURSO TRANSPETRO.pdf") e produziu `MATRIZ_EDITAL_TRANSPETRO.md` (raiz do projeto), conferido item a item contra o Anexo IV. Isso **corrigiu um erro** da pesquisa web inicial desta sessão (que havia estimado 70 questões, 20+50 — número errado, obtido só de fontes jornalísticas).

**Estrutura real da prova (confirmada, ver `config/concurso.ts`):**
- Edital nº 03 - TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO - 2026.3, de 11/08/2026 (alterações do DOU de 19/08/2026)
- Banca: Fundação Cesgranrio. Cargo: Profissional Transpetro de Nível Técnico, Ênfase 1 "Administração e Controle"
- Prova objetiva única, 4h, **60 questões** (não 70): **40 de Conhecimentos Específicos** (Fase 1) + **20 de Conhecimentos Gerais** (Fase 2: 10 Português + 10 Matemática), 5 alternativas (A-E), 1 ponto cada
- Regra de eliminação (item 7.1.4.3): < 50% em Específicas, OU < 50% em Gerais, OU zero em Português OU zero em Matemática isoladamente
- **Não há etapa de redação** neste processo seletivo (confirmado — prova é só objetiva)
- Cronograma oficial completo (inscrições, isenção, gabarito, resultado) em `config/concurso.ts`
- Vagas na ênfase: 75 (5 imediatas). Salário básico R$ 3.776,64. Regime CLT, experimência de 90 dias.

**Conteúdo programático (Anexo IV) — matriz completa com 39 códigos** (PT-01 a PT-08, MAT-01 a MAT-10, AC-01 a AC-21) está em `MATRIZ_EDITAL_TRANSPETRO.md`, incluindo os subtemas oficiais de cada código, análise de sobreposição com o conteúdo pedagógico do ENSITEC (o que é reaproveitável direto/adaptável/nenhum) e a legislação aplicável (Lei 13.303/2016 — regime de estatais — e Lei 14.133/2021, ambas citadas no edital para licitações/contratos).

**Ainda pendente (não crítico, ajustar na Fase 2 se necessário):** meta pedagógica de pontuação (`OBJECTIVE_TARGET_POINTS`), distribuição fina de tempo de estudo por tópico dentro de cada disciplina.

## 3. Material de pesquisa adicional para a Fase 2 (`pesquisa/`)

A mesma sessão paralela também produziu, por conta própria e além do escopo original desta missão (Fase 1 = só motor, sem conteúdo), pesquisa preparatória para a Fase 2:

- `pesquisa/referencia/MATRIZ_EDITAL_TRANSPETRO.md` — cópia da matriz (também na raiz do projeto)
- `pesquisa/aulas_youtube/` — curadoria de 115 videoaulas do YouTube cobrindo 37/39 códigos com 3/3 vídeos cada (URLs reais verificadas, nenhuma inventada; 2 códigos com gap documentado: AC-14, AC-17)
- `pesquisa/reaproveitamento_ensitec/` — mapeamento de quais dos 39 códigos têm base direta/adaptável/nenhuma no conteúdo já escrito do ENSITEC
- `pesquisa/RELATORIO_PESQUISA_TRANSPETRO.md` — relatório consolidado das duas pesquisas acima, com recomendação de prioridade de produção de conteúdo

**Importante:** este material é uma pesquisa cuidadosa e bem-sourced (nada foi inventado, gaps foram documentados honestamente), mas **não foi revisado linha a linha por mim** nesta sessão principal — é insumo bruto para a Fase 2, não conteúdo validado/pronto para uso direto. Antes de usá-lo para popular `src/content/`, um humano (ou a sessão da Fase 2) deve revisar a qualidade e atualidade dos vídeos e a precisão do mapeamento de reaproveitamento.

## 4. Configuração central do concurso

`config/concurso.ts` centraliza todos os dados do concurso (datas, blueprint da prova, alocação de tempo de estudo, metadados institucionais). O motor lê exclusivamente desse arquivo — nenhum valor está mais hard-coded em `src/lib/`. Alias TypeScript `@config/*` aponta para `./config/*` (ver `tsconfig.json` e `vitest.config.ts`).

## 5. Placeholders de conteúdo (Fase 2 vai popular)

Todos em `src/content/`, hoje vazios/mínimos e válidos pelo schema:
- `coursePlan.ts` → `COURSE_PLAN_V2.days = []`
- `curriculum.ts` → `SUBJECTS` com 3 disciplinas (específicas 40pts / português 10pts / matemática 10pts, pesos já corrigidos), `MODULES`/`TOPICS` vazios
- `lessons/index.ts` → `ALL_LESSONS = []`
- `questions/index.ts` → `ALL_QUESTIONS = []`
- `essays/prompts.ts` → `ESSAY_PROMPTS = []` (não será populado — confirmado que não há redação)
- `legal/codex.ts` → `CODEX_LEGAL_REVIEW = []`
- `videos/index.ts` → `VIDEO_LESSONS = []` (ver `pesquisa/aulas_youtube/` para candidatos já levantados)
- `finalReview.ts` → todos os arrays vazios, exceto 1 item placeholder no checklist de véspera

## 6. Testes desabilitados (dependem de conteúdo real)

Três suítes de teste testam o motor contra uma aula/questão de conteúdo real que não existe na Fase 1 (`federalismo-separacao-poderes` e afins, herdados do fixture do ENSITEC). Foram marcadas `describe.skip` com comentário explicando o motivo, em vez de apagadas — a lógica que cobrem não mudou:
- `src/lib/course/__tests__/service.test.ts` (serviço "Meu Curso" completo)
- `src/lib/pedagogy/__tests__/service.test.ts` (maioria dos testes; "recomputeMastery isolado" continua ativo)
- `src/lib/professor/__tests__/toolExecutors.test.ts` (testes que dependem de questão/tópico real; os 2 primeiros describes, que testam só a forma das ferramentas, continuam ativos)

`src/lib/schedule/__tests__/plan.test.ts` e `reschedule.test.ts` foram reescritos/ajustados para não depender de `TOTAL_MISSIONS` real (hoje 0, pendente) — passam `referenceTotalMissions` explícito. `dates.test.ts` foi corrigido para o calendário real de 2026 (28/11 sábado, 29/11 domingo — dia da prova).

**Ação recomendada na Fase 2:** ao criar a primeira aula/questão real, reativar essas suítes (remover `.skip`) e ajustar `TEST_LESSON_SLUG`/`TEST_QUESTION_ID` para apontar a ela.

## 7. Validações executadas — TODAS PASSANDO

- `npm install`: ✅ concluído (ver nota abaixo sobre o ambiente local)
- `npm run typecheck` (`tsc --noEmit`): ✅ exit 0, zero erros
- `npm run build` (`next build`): ✅ exit 0, 37 rotas compiladas com sucesso
- `npm run test` (`vitest run`): ✅ exit 0 — 47 testes passando, 42 pulados (suítes da seção 6), 0 falhando
- `npm run dev`: ✅ sobe limpo ("Ready" em ~1s), rota testada (`/meu-curso`) responde HTTP 200

**Nota sobre o ambiente:** `npm install` foi extremamente instável neste ambiente Windows local — múltiplas tentativas corromperam `node_modules` (erros `TAR_ENTRY_ERROR`, prováveis interferência de antivírus em tempo real) e processos `npm install` órfãos de tentativas anteriores ficaram rodando em paralelo, competindo pela mesma pasta. Foi necessário identificar e encerrar manualmente esses processos (`Get-Process -Name node`) antes de uma instalação limpa funcionar. Depois da instalação "limpa", ainda restaram 2 pacotes corrompidos isoladamente (`lucide-react`, `openai`, depois `css-tree`) — corrigidos com reinstalação pontual (`npm install <pacote> --no-save`) em vez de reinstalar tudo de novo. Se o usuário rodar `npm install` no seu próprio ambiente e algo parecido acontecer, o mesmo diagnóstico (checar `node_modules/.bin/tsc` existe, checar arquivos `.d.ts` dos pacotes com erro de tipo) deve resolver.

## 8. Nomenclatura e generalizações feitas

- Nome do produto: ENSITEC → "Transpetro Estudos" (título, manifest PWA, textos de marca)
- Banco Dexie: `ensitec-db` → `transpetro-estudos-db`; classe `EnsitecDB` → `TranspetroDB`
- Store: `useEnsitecStore` → `useTranspetroStore`
- Campo de schema `howSeleconMightAsk` → `howBoardMightAsk` (nome de banca não deve estar embutido no nome de campo do motor)
- `SyllabusItem.subjectId`: era `z.enum([...disciplinas de Araçás])`, virou `z.string()` genérico
- `SubjectSlug`: `"portugues" | "matematica" | "especificas" | "redacao"` (o motor mantém "redacao" como valor possível para compatibilidade com o padrão de filtro da UI, mesmo não sendo usado — não há redação neste edital)
- `src/lib/schedule/missionContent.ts`: rotação de disciplina secundária ajustada de Português/Lógica/Informática (Araçás) para Português/Matemática (as duas disciplinas de Conhecimentos Gerais da Transpetro)
- System prompt do Professor: identidade fixa de Araçás substituída por leitura de `config/concurso.ts` (`CONCURSO_INFO`, `EXAM_DATE`, `EXAM_SHIFT`, `LAST_STUDY_DATE`)

## 9. Pendências conhecidas (não bloqueantes)

- Ícones do PWA (`public/icons/*.png`) ainda têm a arte visual do ENSITEC — trocar quando houver identidade visual da Transpetro.
- Alguns comentários de código referenciam arquivos de documentação que não existem neste projeto (`docs/MEMORIA_PEDAGOGICA.md`, `docs/PROFESSOR.md`, `docs/REGRAS_PEDAGOGICAS_MEU_CURSO.md`, `docs/AUDITORIA_PRE_MEU_CURSO.md`) — só comentários, não quebram build.
- `AGENTS.md`/`CLAUDE.md` na raiz são gerados automaticamente pelo `next dev` (Next.js 16) — inofensivos, não precisam de ação.
- `OBJECTIVE_TARGET_POINTS` em `config/concurso.ts` está zerado — é uma meta pedagógica (não um dado do edital), a definir na Fase 2.

## 10. Próxima ação recomendada: Fase 2

Construir o conteúdo real da Transpetro, no mesmo espírito do "Prompt 2" original do ENSITEC, mas adaptado a este edital:
1. Revisar `MATRIZ_EDITAL_TRANSPETRO.md` e o material em `pesquisa/` (seção 3 acima) como ponto de partida — já há uma matriz de 39 códigos confirmada e uma curadoria inicial de videoaulas.
2. Definir o cronograma real (`src/content/coursePlan.ts`) e o currículo (`src/content/curriculum.ts`, `MODULES`/`TOPICS`) a partir do Anexo IV.
3. Popular aulas, questões e flashcards (sem redação, confirmado que não existe nesta etapa).
4. Reativar as suítes de teste desabilitadas (seção 6) contra o primeiro conteúdo real criado.
5. Só então considerar deploy/publicação (fora do escopo desta missão).

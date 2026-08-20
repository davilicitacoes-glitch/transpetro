# Continuidade — TRANSPETRO (Fase 1: extração do motor)

Este documento registra o estado do projeto ao final da Fase 1 (extração do motor genérico do ENSITEC), para orientar a Fase 2 (construção do conteúdo real da Transpetro).

## 1. O que foi extraído do ENSITEC e o que foi deixado de fora

Ver [`MAPA_DE_EXTRACAO.md`](../MAPA_DE_EXTRACAO.md) para a tabela completa. Resumo:

**Extraído (motor genérico):** app shell, autenticação, navegação "Meu Curso", componentes de UI, esquema de dados (Zod), banco local (Dexie), store (Zustand), pedagogia (domínio/revisão espaçada), progresso/desempenho, arquitetura do Professor IA (tool calling, system prompt, rotas de servidor), cronograma/calendário, players de slide/vídeo, motor de simulados, cliente Supabase, PWA.

**Não extraído (conteúdo específico de Araçás):** cronograma real de 34 missões, currículo/módulos/tópicos reais, todas as aulas, banco de questões (420+), propostas de redação, legislação, curadoria de videoaulas, documentação de continuidade do projeto de origem, qualquer chave/segredo real.

## 2. Dados do edital da Transpetro — confirmados e pendentes

**Confirmado** (pesquisa web em 2026-08-19, ver fontes em `config/concurso.ts`):
- Edital nº 3/2026, Quadro de Terra, nível médio, banca Fundação Cesgranrio
- Cargo: Profissional Transpetro de Nível Médio – Júnior, ênfase "Administração e Controle"
- Inscrições: 12/08/2026 a 14/09/2026
- Prova objetiva: 29/11/2026, duração 4h
- 70 questões: 20 de Conhecimentos Gerais (Português + Matemática) + 50 de Conhecimentos Específicos
- Vagas na ênfase Administração e Controle: 75 (5 imediatas + 70 cadastro de reserva)
- Salário básico: R$ 3.776,64 (remuneração mínima garantida R$ 6.539,54)

**PENDENTE de confirmação** (não localizado com certeza na pesquisa; marcado explicitamente em `config/concurso.ts`, sem valores inventados):
- Divisão exata de questões entre Português e Matemática dentro das 20 de Gerais (usei estimativa 10/10, claramente marcada)
- Pontos por questão e pontuação mínima de aprovação
- Turno da prova (manhã/tarde)
- Se há etapa de redação (a rubrica de Araçás NÃO foi copiada; campos ficam vazios/nulos)
- Conteúdo programático detalhado da ênfase Administração e Controle
- Data de início do plano pedagógico (depende de quando o aluno começar a usar o app)

**Ação recomendada antes da Fase 2:** ler o PDF oficial do Edital nº 3/2026 (Fundação Cesgranrio) linha a linha para confirmar os itens acima, em vez de confiar apenas nos blogs de cursinho consultados nesta pesquisa.

## 3. Configuração central do concurso

`config/concurso.ts` centraliza todos os dados do concurso (datas, blueprint da prova, rubrica de redação, alocação de tempo de estudo, metadados institucionais). O motor lê exclusivamente desse arquivo — nenhum valor está mais hard-coded em `src/lib/`. Alias TypeScript `@config/*` aponta para `./config/*` (ver `tsconfig.json`).

## 4. Placeholders de conteúdo (Fase 2 vai popular)

Todos em `src/content/`, hoje vazios/mínimos e válidos pelo schema:
- `coursePlan.ts` → `COURSE_PLAN_V2.days = []`
- `curriculum.ts` → `SUBJECTS` com 3 disciplinas genéricas (português/matemática/específicas), `MODULES`/`TOPICS` vazios
- `lessons/index.ts` → `ALL_LESSONS = []`
- `questions/index.ts` → `ALL_QUESTIONS = []`
- `essays/prompts.ts` → `ESSAY_PROMPTS = []`
- `legal/codex.ts` → `CODEX_LEGAL_REVIEW = []`
- `videos/index.ts` → `VIDEO_LESSONS = []`
- `finalReview.ts` → todos os arrays vazios, exceto 1 item placeholder no checklist de véspera

## 5. Testes desabilitados (dependem de conteúdo real)

Três suítes de teste testam o motor contra uma aula/questão de conteúdo real que não existe na Fase 1 (`federalismo-separacao-poderes` e afins, herdados do fixture do ENSITEC). Foram marcadas `describe.skip` com comentário explicando o motivo, em vez de apagadas — a lógica que cobrem não mudou:
- `src/lib/course/__tests__/service.test.ts` (serviço "Meu Curso" completo)
- `src/lib/pedagogy/__tests__/service.test.ts` (maioria dos testes; "recomputeMastery isolado" continua ativo)
- `src/lib/professor/__tests__/toolExecutors.test.ts` (testes que dependem de questão/tópico real; os 2 primeiros describes, que testam só a forma das ferramentas, continuam ativos)

`src/lib/schedule/__tests__/plan.test.ts` e `dates.test.ts` foram reescritos/ajustados para não depender de `TOTAL_MISSIONS` real (hoje 0, pendente) nem das datas antigas de Araçás — passam um `referenceTotalMissions` explícito e usam `LAST_STUDY_DATE` da config atual.

**Ação recomendada na Fase 2:** ao criar a primeira aula/questão real, reativar essas suítes (remover `.skip`) e ajustar `TEST_LESSON_SLUG`/`TEST_QUESTION_ID` para apontar a ela.

## 6. Validações executadas

- `npm install`: executado (ver observações abaixo sobre lentidão)
- `npm run typecheck` / `npm run build` / `npm run dev`: **pendente de confirmação nesta sessão** — o `npm install` ficou anormalmente lento/instável no ambiente Windows local (contagem de pacotes em `node_modules` oscilando, possivelmente por antivírus ou I/O), e a verificação final não foi concluída a tempo. **Rodar manualmente antes de considerar a Fase 1 encerrada:**

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Se o `typecheck`/`build` acusar erros, é provável que sejam de dois tipos: (a) algum import remanescente para um arquivo de conteúdo não copiado — resolver criando outro placeholder vazio no mesmo padrão dos já existentes; (b) algum teste que eu não tenha identificado que ainda referencia dado de conteúdo real — aplicar o mesmo padrão `describe.skip` usado nos três arquivos listados na seção 5.

## 7. Nomenclatura e generalizações feitas

- Nome do produto: ENSITEC → "Transpetro Estudos" (título, manifest PWA, textos de marca)
- Banco Dexie: `ensitec-db` → `transpetro-estudos-db`; classe `EnsitecDB` → `TranspetroDB`
- Store: `useEnsitecStore` → `useTranspetroStore`
- Campo de schema `howSeleconMightAsk` → `howBoardMightAsk` (nome de banca não deve estar embutido no nome de campo do motor)
- `SyllabusItem.subjectId`: era `z.enum([...disciplinas de Araçás])`, virou `z.string()` genérico
- System prompt do Professor: identidade fixa de Araçás substituída por leitura de `config/concurso.ts` (`CONCURSO_INFO`, `EXAM_DATE`, `EXAM_SHIFT`, `LAST_STUDY_DATE`)

## 8. Pendências conhecidas (não bloqueantes para a Fase 1, mas registradas)

- Ícones do PWA (`public/icons/*.png`) ainda têm a arte visual do ENSITEC (não foi possível verificar/trocar pixel a pixel nesta sessão) — trocar quando houver identidade visual da Transpetro.
- Alguns comentários de código referenciam arquivos de documentação que não existem neste projeto (`docs/MEMORIA_PEDAGOGICA.md`, `docs/PROFESSOR.md`, `docs/REGRAS_PEDAGOGICAS_MEU_CURSO.md`, `docs/AUDITORIA_PRE_MEU_CURSO.md`) — são só comentários (não quebram build), mas podem ser recriados ou removidos numa limpeza futura.
- Nenhum commit foi feito ainda neste projeto — fazer o primeiro commit somente depois de confirmar `typecheck`/`build` limpos (seção 6).

## 9. Próxima ação recomendada: Fase 2

Construir o conteúdo real da Transpetro, no mesmo espírito do "Prompt 2" original do ENSITEC, mas adaptado a este edital:
1. Ler o PDF oficial do Edital nº 3/2026 linha a linha e confirmar todos os campos pendentes de `config/concurso.ts`.
2. Definir o cronograma real (`src/content/coursePlan.ts`) e o currículo (`src/content/curriculum.ts`) a partir do conteúdo programático oficial da ênfase Administração e Controle.
3. Popular aulas, questões, flashcards e (se aplicável) redação.
4. Reativar as suítes de teste desabilitadas (seção 5) contra o primeiro conteúdo real criado.
5. Só então considerar deploy/publicação (fora do escopo desta missão).

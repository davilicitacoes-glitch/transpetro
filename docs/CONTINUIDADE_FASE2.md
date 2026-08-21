# Continuidade — Fase 2 (conteúdo real)

Registra o progresso da Fase 2 (construção do conteúdo real da Transpetro) desde o fim da Fase 1. Ver [`CONTINUIDADE_TRANSPETRO.md`](./CONTINUIDADE_TRANSPETRO.md) para o estado da Fase 1.

## 1. O que existe hoje

### Currículo completo (estrutura)
`src/content/curriculum.ts` tem os 39 tópicos reais do Anexo IV (PT-01..08, MAT-01..10, AC-01..21), organizados em 6 módulos (4 grupos de Específicas + Português + Matemática), com os pesos corretos da prova confirmada (40/10/10 questões). Isso é 100% da estrutura — falta o conteúdo didático (aulas) de 37 dos 39 tópicos.

### Aulas escritas (conteúdo genuíno, não placeholder)
Só **2 de 39** têm aula completa escrita (`src/content/lessons/especificas/ac-01-recursos-humanos.ts`, `.../portugues/pt-01-compreensao-textos.ts`): texto didático completo, pontos de memorização, exemplos resolvidos, erros comuns, flashcards, mini-quiz. **Os outros 37 códigos ainda não têm aula** — é o maior gargalo de conteúdo restante.

### Cronograma (Meu Curso)
`src/content/coursePlan.ts` tem só o **Dia 1** (AC-01 + PT-01, 7 etapas), validado ponta a ponta no navegador: abertura → aula → checagem → aula → checagem → revisão → fechamento, com progresso e respostas gravados corretamente. `TOTAL_MISSIONS = 1` em `config/concurso.ts` (deve subir junto com `coursePlan.ts`).

### Banco de questões — **311 questões, incluindo 307 REAIS**
Este é o maior salto da sessão. Um acervo de questões reais de provas anteriores (Transpetro 2006/2011/2012/2018, e concursos correlatos de mesma banca/grupo — Petrobras, BR Distribuidora, Liquigas, ANP, BB, Banese, AGERIO) foi extraído em `entregas/acervo_questoes_reais/` (PDFs originais + hashes SHA256 para auditoria + JSONL estruturado), cobrindo os 39 códigos:

- **307 questões `validada`** → integradas em `src/content/questions/index.ts` (`REAL_QUESTIONS`), prontas para uso normal.
- **44 questões `sob_conferencia`** → em `PENDING_REVIEW_QUESTIONS` (mesmo arquivo), **fora do fluxo do aluno** até um humano ler o `comentario` de cada uma e confirmar (legislação desatualizada, gabarito com inconsistência aparente, ou mapeamento de código de baixa confiança).
- **4 questões `ANULADA`** pela banca original → excluídas por completo (o schema exige exatamente 1 alternativa correta).
- **4 questões inéditas** escritas nesta sessão para o miniquiz das 2 aulas existentes.

Mudança de schema necessária: `QuestionOptionSchema.key` e os campos `selectedKey`/`correctKey` foram ampliados de 4 para 5 alternativas (`A`-`E`) — formato real da Cesgranrio. Propagado por todo o motor (10 arquivos).

**Distribuição por código**: ver `entregas/acervo_questoes_reais/dados/questoes_por_codigo/*.jsonl` — cobertura desigual (ex.: AC-01 tem 30, AC-17 tem só 1) porque reflete a disponibilidade real de provas anteriores, não foi normalizada artificialmente.

### Videoaulas — 112 vídeos reais do YouTube
`src/content/videos/index.ts` foi populado a partir de `pesquisa/aulas_youtube/videoaulas_por_codigo.csv` (pesquisa já feita na Fase 1, nunca conectada ao motor até agora). URLs reais e verificadas, cobrindo 37/39 códigos com pelo menos 1 vídeo (a mesma pesquisa documentou 2 gaps: AC-14, AC-17). Já aparecem automaticamente em qualquer aula/dia cujo `syllabusCodes` bata com o vídeo (o motor `getVideosForSyllabusCodes` já existia, só faltava dado).

### Calendário baixável (.ics) e reagendamento
Adicionado `src/lib/calendar/exportIcs.ts` + botão "Baixar (.ics)" em `/meu-curso/calendario` — gera um arquivo iCalendar (RFC 5545) importável em Google Calendar/Outlook/Apple Calendar com um evento por dia do plano (na data recalculada real, não fixa) + o dia da prova.

Sobre "quando o aluno perde um dia, a aula é reagendada": o motor **já não perde conteúdo obrigatório** quando um dia é perdido — `getCurrentDayNumber()` sempre aponta para o primeiro dia não concluído, independente da data do calendário; o dia perdido fica marcado como "atrasado" na UI (não desaparece, não é pulado) e o aluno o cumpre depois, na ordem certa. O que **não existe ainda** é o recálculo automático das *datas* de dias futuros a partir do atraso real (a calendário hoje é sempre a distribuição "ideal" original a partir da data de início escolhida) — se isso for importante, é um item de Fase 2 a mais.

## 2. Bugs de Fase 1 corrigidos durante a Fase 2

Encontrados testando o app de verdade no navegador (nenhum destes apareceu no `typecheck`/`build`, só em uso real):
- `/meu-curso/calendario` tinha o texto hard-coded "13/09 não é dia de aula" (data do concurso antigo, Araçás) — corrigido para usar `EXAM_DATE` dinamicamente.
- `src/lib/schedule/plan.ts` tinha uma mensagem de erro com data hard-coded "19/09/2026" (não batia com nenhuma data real do projeto, resquício do ENSITEC) — corrigido para usar `LAST_STUDY_DATE` dinamicamente.
- `/videoaulas` tinha "cobrindo os 75 itens do edital" (número de Araçás) — corrigido para "39 códigos".
- `src/lib/db/seed.ts` tinha lógica morta referenciando o código `"CE-22a"` (nunca existe nos nossos códigos PT/MAT/AC) — removida.

**Lição**: o `typecheck`/`build`/`test` não pegam strings de UI hard-coded incorretas — só o uso real no navegador pega. Vale sempre testar visualmente depois de mudanças de conteúdo/config, não só confiar nos comandos automatizados.

## 3. O que falta (lacunas reais, sem inventar números)

1. **37 de 39 aulas** ainda não escritas — é o item de maior volume de trabalho restante.
2. **Módulos/tópicos com conteúdo detalhado**: `MODULES`/`TOPICS` em `curriculum.ts` têm nome e código, mas nenhum texto de introdução de módulo.
3. **Cronograma**: só o Dia 1 existe. Precisa ser expandido para cobrir os 39 códigos (ver seção de priorização em `pesquisa/RELATORIO_PESQUISA_TRANSPETRO.md` para uma sugestão de ordem: grupo 1 = mais rápido de resolver, grupo 3 = mais trabalho do zero).
4. **44 questões `sob_conferencia`** aguardando revisão humana (ver `PENDING_REVIEW_QUESTIONS`).
5. **Simulados**: o motor de simulados (`src/lib/mock/generator.ts`) já deveria funcionar com o pool de 311 questões, mas não foi testado manualmente nesta sessão — vale conferir.
6. **Recalcular datas do calendário após atraso real** (ver seção 1, "Calendário baixável").
7. **Redação**: confirmado que não há etapa de redação no processo seletivo — nenhuma ação necessária aqui.

## 4. Validação final desta sessão

`npm run typecheck` (0 erros) · `npm run build` (37 rotas) · `npm run test` (47 passando, 42 pulados) · `npm run dev` testado manualmente no navegador: onboarding → diagnóstico (puxa questões reais) → Meu Curso → Dia 1 completo (7/7 etapas, 2 questões, 2 acertos) → banco de questões (311, filtro por origem funcionando, resposta com explicação real) → calendário com exportação .ics.

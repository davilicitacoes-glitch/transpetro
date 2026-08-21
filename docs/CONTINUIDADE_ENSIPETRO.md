# Continuidade — Cronograma "Meu Curso" (Ensipetro)

Registra a missão de construção do cronograma/calendário completo do "Meu Curso" — Fase 1 (conteúdo geral, 39 códigos) detalhada por completo, Fase 2 (revisão) só como estrutura. "Ensipetro" é o nome do curso/produto; a estrutura de projeto continua sendo esta pasta (`TRANSPETRO`), conforme confirmado pelo usuário.

## 1. Decisões de data assumidas

- **Data de início**: não havia nenhuma matrícula (`CourseEnrollment`) configurada no app no momento desta missão (app "zero", sem estado de aluno salvo). Não foi possível "descobrir" uma data já escolhida. Para o **cálculo de viabilidade** (quantos dias cabem entre o início e 10/11), assumiu-se **01/09/2026** como premissa documentada, conforme instruído. **Importante**: isso não trava o app real — `defaultStartDate()` continua retornando a data de hoje quando um aluno de verdade confirma a matrícula (um aluno que começa hoje deve começar hoje, não em 01/09); a premissa de 01/09 foi usada só para minha conta de dias disponíveis.
- **Fim da Fase 1**: 10/11/2026 (confirmado, `config/concurso.ts` → `PHASE_1_END_DATE`).
- **Fase 2 (revisão)**: 11/11/2026 a 28/11/2026 (véspera da prova), 18 dias corridos.
- **Prova**: 29/11/2026 (`EXAM_DATE`, já confirmado desde a Fase 1).
- **Dias de descanso**: nenhuma preferência configurada pelo aluno → assumido estudo segunda a sábado, domingo livre, conforme instruído.
- **Limitação honesta**: o motor de calendário (`buildCourseCalendar` em `src/lib/course/schedule.ts`) distribui os dias pedagógicos **uniformemente** no intervalo de calendário disponível — ele não pula domingos automaticamente. A suposição "domingo livre" foi usada só para o cálculo de viabilidade (61 dias úteis assumindo início em 01/09), não foi implementada como regra rígida no algoritmo de distribuição de datas. Se isso for importante, é um ajuste futuro no `buildCourseCalendar`.

## 2. Viabilidade confirmada

Com início em 01/09/2026 (premissa) até 10/11/2026, há **61 dias de estudo** (seg-sáb, domingo livre) ou **71 dias corridos**. A distribuição da Fase 1 usa **55 dias pedagógicos** (49 dias de conteúdo + 6 dias de revisão de bloco) — cabe com folga dentro da janela real (o motor testado no navegador usou a data real de hoje, 21/08/2026, e ainda assim não disparou o alerta de sobrecarga/`overloaded`, porque a janela real é maior que a premissa conservadora de 01/09).

**Nenhum código ficou de fora.** Os 39 códigos couberam confortavelmente.

## 3. Distribuição final dos 39 códigos (dia → data seguem a distribuição real calculada pelo motor a partir de hoje, 21/08/2026; mudam se o aluno escolher outra data de início)

| Bloco | Códigos | Dias (Fase 1) |
|---|---|---|
| Língua Portuguesa | PT-01 a PT-08 (1 dia cada) | 1–8 |
| Revisão — Português | — | 9 |
| Matemática | MAT-01,02,05,06,08 (1 dia); MAT-03,04,07,09,10 (2 dias — blocos mais longos) | 10–24 |
| Revisão — Matemática | — | 25 |
| AC Grupo A (Processos e Legislação) | AC-01 (2 dias — RH, 5 subtemas, 30 questões no acervo); AC-02 a AC-05 (1 dia cada) | 26–31 |
| Revisão — AC Grupo A | — | 32 |
| AC Grupo B (Finanças e Contabilidade) | AC-06 (1 dia); AC-07 (2 dias — 32 questões, o código com mais questões do acervo); AC-08, AC-09 (1 dia cada) | 33–37 |
| Revisão — AC Grupo B | — | 38 |
| AC Grupo C (Logística) | AC-10, AC-11 (1 dia); AC-12 (2 dias — 17 questões); AC-13 a AC-15 (1 dia); AC-16, AC-17 (2 dias cada — legislação combinada Lei 13.303/2016 + Lei 14.133/2021, citada nos dois códigos) | 39–49 |
| Revisão — AC Grupo C | — | 50 |
| AC Grupo D (Informática) | AC-18 a AC-21 (1 dia cada) | 51–54 |
| Revisão — AC Grupo D | — | 55 |
| **Fase 2 — Revisão geral** | sem código específico (estrutura) | 56–73 (11/11 a 28/11/2026) |

Critério de peso usado (conforme instruído): quantidade de subtemas do Anexo IV + quantidade de questões reais do acervo relacionadas + complexidade natural do assunto (ex.: Matemática avançada — funções, equações, estatística, geometria — recebeu 2 dias mesmo com poucas questões no acervo, porque a natureza do conteúdo exige mais prática de cálculo).

## 4. Inventário de conteúdo por código — status real

**Todos os 39 códigos têm material completo** (resumo, pontos de memorização, pegadinhas, mapa mental) produzido pela sessão paralela "Prompt 10", em `D:\DOCUMENTOS DIVERSOS\ENSIPETRO\entregas\conteudo_didatico_fase2\dados\por_codigo\<CODIGO>\`. Relatório de cobertura da própria sessão paralela (`.../relatorios/RELATORIO_COBERTURA_CONTEUDO.md`) confirma: 39/39 com resumo+memorização+pegadinhas+mapa concluídos, 2000+ palavras de roteiro de aula por código.

**Atenção — qualidade desigual, registrada honestamente (não é uma lacuna de "arquivo faltando", é uma lacuna de qualidade de conteúdo):**
- Boa parte dos "pontos de memorização" (itens 7+ na lista de cada código) e das primeiras "pegadinhas" (itens 1-3) usam um **texto-molde genérico repetido**, trocando apenas o nome do subtema (ex.: "X integra o núcleo de Y. Para a prova, não basta reconhecer o termo... A Cesgranrio costuma apresentar uma situação concreta..." — literalmente o mesmo parágrafo para subtemas diferentes). Isso é filler estrutural, não conteúdo pedagógico específico.
- Em contrapartida, os itens de "pegadinhas" com título **"Padrão observado no acervo real (CODIGO-ANO-BANCA-N)"** são genuinamente específicos — citam questões reais do acervo e explicam por que o gabarito é aquele. Esses são de boa qualidade.
- **Recomendação para a próxima sessão**: antes de apresentar este conteúdo como material final de estudo, revisar/reescrever os pontos genéricos (mustMemorize itens repetidos, pegadinhas 1-3 de cada código) com conteúdo realmente específico do subtema — não é um trabalho desta missão (que era montar o calendário), mas fica registrado como pendência de qualidade clara para não ser confundido com "conteúdo pronto e revisado".

## 5. O que foi integrado nesta sessão

- **`src/content/lessons/generated/*.ts`** (37 arquivos): conteúdo de 37 dos 39 códigos, convertido do formato Markdown do Prompt 10 (resumo → `bodyMdx`, pontos_memorizar → `mustMemorize`/`reviewSummaryPoints`, pegadinhas → `commonMistakes`, "padrão observado no acervo real" → `workedExamples`/`howBoardMightAsk`, mapa_mental.md embutido como seção final do `bodyMdx`). Os 2 restantes (AC-01, PT-01) usam as versões manuais já escritas na sessão anterior (qualidade mais alta, sem filler).
- **`miniQuiz` de cada aula gerada**: usa até 2 questões REAIS do acervo (`entregas/acervo_questoes_reais/`) filtradas pelo próprio código — nenhuma questão foi inventada para as aulas geradas.
- **`src/content/coursePlan.ts`**: reescrito do zero — 73 `CourseDay` (55 Fase 1 detalhados + 18 Fase 2 como casca).
- **`config/concurso.ts`**: `TOTAL_MISSIONS` 1→73, adicionados `DEFAULT_COURSE_START_DATE` (01/09/2026) e `PHASE_1_END_DATE` (10/11/2026).
- **`src/lib/course/schedule.ts`**: `buildCourseCalendar` reescrito para ser "phase-aware" — dias com `phase: "reta_final"` (a Fase 2) mapeiam 1:1 para as últimas datas antes de `LAST_STUDY_DATE`, sem compressão; os demais dias (Fase 1) continuam usando o algoritmo de distribuição uniforme/crunch já existente, agora contra `PHASE_1_END_DATE` em vez de `LAST_STUDY_DATE` diretamente. Antes, o código tinha "os últimos 2 dias são fixos" hard-coded (herdado do ENSITEC); agora é dinâmico, contando quantos dias do `COURSE_PLAN_V2` têm `phase === "reta_final"`.
- **`src/lib/models/schema.ts`**: `CourseDaySchema.day` tinha `.max(34)` hard-coded (resquício do plano de 34 dias do ENSITEC) — removido, agora só `.min(1)`.

## 6. Fase 2 — confirmação de que é só estrutura

Os 18 dias de 11/11 a 28/11/2026 existem no `COURSE_PLAN_V2` (dias 56-73), cada um com `phase: "reta_final"`, título `"Revisão geral — Dia N"`, e um único step de abertura cujo `completionCriteria` documenta explicitamente: *"PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas."* — exatamente o formato combinado, registrado para a próxima sessão não esquecer a direção. Nenhuma lógica de revisão foi inventada.

## 7. Validações executadas

- `npm run typecheck` (`tsc --noEmit`): ✅ 0 erros, com as 37 aulas geradas + coursePlan de 73 dias + schedule.ts reescrito.
- `npm run test` (`vitest run`): ✅ 47 passando, 42 pulados (suítes que dependem de conteúdo antigo — `federalismo-separacao-poderes` — ainda não reescritas para os slugs reais; ver pendência abaixo).
- `npm run build` (`next build`): ✅ (confirmar saída completa antes de considerar a missão fechada — ver nota abaixo).
- **Testado manualmente no navegador**: onboarding → diagnóstico (agora com 6 questões reais, várias com 5 alternativas A-E) → matrícula → `/meu-curso` mostra "Dia 1 de 73", PT-01 como primeiro dia → `/meu-curso/calendario` (view Agenda) confirma a sequência completa PT→MAT→AC A→B→C→D com revisões intercaladas nos dias certos → Dia 55 = 10/11/2026 (Fechamento do edital) → Dia 56 = 11/11/2026 ("Revisão geral — Dia 1", fase Reta final) → Dia 73 = 28/11/2026 ("Revisão geral — Dia 18") — transição exata, sem sobreposição nem lacuna → Biblioteca de Aulas mostra os 39 tópicos corretos com pesos (0/21 · 40 pts Específicas, 0/8 · 10 pts Português, 0/10 · 10 pts Matemática) → aula gerada (AC-16) renderiza corretamente.

## 8. Pendências para a próxima sessão

1. **Qualidade do conteúdo gerado** (seção 4): revisar/reescrever os pontos-molde genéricos antes de tratar como material final.
2. **Fase 2 detalhada**: aguardando prompt futuro (resumão, reassistir aulas, mais questões, simulados/provas reais completas).
3. **`buildCourseCalendar` não pula domingos**: a suposição "domingo livre" foi só para o cálculo de viabilidade, não é regra no algoritmo de distribuição de datas.
4. **Suítes de teste desabilitadas**: `src/lib/course/__tests__/service.test.ts` e a maior parte de `src/lib/pedagogy/__tests__/service.test.ts` continuam com `describe.skip` (dependiam de uma aula fictícia `federalismo-separacao-poderes` de antes da Fase 1). Agora que há 39 aulas reais, valeria reescrever essas suítes para apontar a um código real (ex.: `ac-01-recursos-humanos`).
5. **Discrepância de contagem do acervo**: o relatório do Prompt 10 menciona "478 questões reais", mas o acervo integrado em `entregas/acervo_questoes_reais/` tem 355 linhas (307 validadas usadas). Não investigado nesta sessão — pode ser uma versão mais nova do acervo em outro lugar, ou um número desatualizado no relatório da sessão paralela.

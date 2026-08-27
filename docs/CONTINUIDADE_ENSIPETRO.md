# Continuidade — Motores Adaptativos (2026-08-27)

Registra a missão "Motores Adaptativos": repetição espaçada real ligada ao erro (Motor 1), simulado cronometrado com diagnóstico de banca (Motor 2), previsão de nota e priorização automática (Motor 3). Confirmado com o usuário: "Ensipetro" é o nome do curso/produto; o código de verdade continua sendo esta pasta (`TRANSPETRO`) — a pasta irmã `D:\DOCUMENTOS DIVERSOS\ENSIPETRO` é só um workspace de docs/entregas de missões paralelas de conteúdo, sem código de app nenhum.

## 0. Auditoria pré-missão (seção 1 da missão)

A fundação de dados pedagógicos **já existia e já tinha dado real fluindo** — não era esqueleto, não foi preciso simular nada:

- `attempts` (tentativa de questão: resposta dada, resposta certa, tempo gasto, confiança declarada, data) — gravado por `recordAttempt` (`src/lib/pedagogy/service.ts`), único caminho de escrita, usado por miniquiz, banco de questões, revisão de véspera e simulado.
- `errorEntries` (dificuldade/erro por tópico, com evidências rastreáveis) — `openOrUpdateDifficulty`.
- `reviewSchedules` + `reviewAttempts` (revisão programada) — `scheduleReview`/`recordReviewResult`, com um algoritmo de intervalos crescentes JÁ implementado (`src/lib/pedagogy/reviewRules.ts`): 1, 3, 7, 14, 30 dias (`REVIEW_SCHEDULE_DAYS` em `src/lib/schedule/priority.ts`), reseta no erro, mantém na dúvida, avança no domínio — muito próximo do SM-2 pedido na missão, só com números ligeiramente diferentes do exemplo da missão (1-2/4-5/~10/~20), mantidos como já estavam por já serem uma escolha deliberada e testada.
- `masterySnapshots` (estado de domínio, recalculado a cada tentativa) — `recomputeMastery`, com regras de "não confundir 1 acerto com domínio real" já implementadas (`src/lib/pedagogy/masteryRules.ts`).
- Calendário (Prompt 11): `src/content/coursePlan.ts` + `src/lib/course/schedule.ts` — cada `CourseDay` referencia `syllabusCodes`; conteúdo por código (Prompt 10): `src/content/lessons/**` + `src/content/questions/**`, cada aula/questão com `topicSlug`. Confirmado: **39 tópicos, 39 códigos, relação 1:1** (nenhum tópico com mais de um código) — usado como premissa em todo o Motor 3.

**Achado mais importante da auditoria**: a fórmula de priorização (`computePriority`/`computeWeaknessFactor`/`computeReviewUrgency`, em `src/lib/schedule/priority.ts`) **já existia, com testes próprios, mas nunca era chamada por nenhum serviço ou tela** — órfã desde uma missão anterior. Boa parte do Motor 3 foi ligar essa fórmula a dado real pela primeira vez, não inventar uma nova.

## 1. Motor 1 — Repetição espaçada real (gap-fill, não duplicação)

O que já existia (ver auditoria acima) cobria "errou → dificuldade → revisão agendada com intervalo crescente". Faltava exatamente o que a missão pedia a mais:

- **Sinal fraco em acerto**: `recordAttempt` agora também agenda revisão (razão `"baixa_confianca"` ou `"esquecimento"`, valores que já existiam no enum `ReviewReasonSchema` mas nunca eram usados) quando o aluno ACERTA mas com confiança declarada ≤ 2 (escala 1-5) OU tempo de resposta ≥ 1.75× a própria média histórica no tópico. Nunca dispara no primeiro contato com um tópico (não há "média" pra comparar ainda) — implementado em `scheduleWeakSignalReview` (`src/lib/pedagogy/service.ts`).
- **Material concreto na revisão**: `ReviewSchedule.recommendedActivityRefs` sempre existiu no schema mas era sempre `[]`. Agora é preenchido (`buildRecommendedActivityRefs`) com `"lesson:<topicSlug>"` (sempre) e `"question:<id>"` (quando a revisão nasceu de uma questão específica). A tela `/meu-curso/revisoes` resolve essas refs em um link real "Abrir aula, resumo e pegadinhas deste código" e mostra o nome do tópico em vez do ID técnico.

**Limitação conhecida**: `"question:<id>"` ainda não vira link clicável — o app não tem uma tela de questão avulsa fora de uma listagem/simulado. Fica só como indicador ("inclui a questão que você errou"). Próxima sessão: criar uma rota `/questoes/[id]` reaproveitando `QuestionCard`.

## 2. Motor 2 — Simulado cronometrado com diagnóstico de banca

- **Simulados menores**: `generateSubjectMockExam` (`src/lib/mock/generator.ts`), além do `generateFullMockExam` já existente — simulado só de uma disciplina, tamanho customizável.
- **Não repete questão de simulados recentes**: `pickAvoidingRepeats` exclui as questões dos últimos 2 simulados concluídos do aluno (`getRecentMockExamAttempts`, novo em `service.ts`); se o banco não tiver questões novas suficientes, completa com repetição e AVISA — nunca falha silenciosamente nem falsifica o tamanho da prova.
- **Cronômetro real**: contagem regressiva total, visível, que finaliza o simulado sozinha ao chegar a zero (como na prova real) — 4h pra prova completa, **confirmado no `MATRIZ_EDITAL_TRANSPETRO.md`** ("duração de 4 horas"), não é suposição. Simulados parciais usam fração proporcional ao nº de questões (suposição documentada no código — o edital só define a duração da prova inteira). Tempo por questão: medido pelo relógio real entre uma resposta e a anterior (não é "tempo de leitura isolado" se o aluno pular questões e voltar depois, mas é medição real do relógio, nunca estimada) — mostrado como "respondida em Xs" logo abaixo de cada questão.
- **Diagnóstico pós-simulado** (`src/lib/mock/diagnostics.ts`, novo):
  - Regra REAL de eliminação (edital, item 7.1.4.3) com as 4 condições separadas: <50% em Específicas, <50% na soma de Geral (Português+Matemática), zero em Português isolado, zero em Matemática isolado. Só se aplica a simulados que cobrem o blueprint oficial inteiro (`canCheckEliminationRules`) — um simulado parcial não permite simular a regra de corte real. `OBJECTIVE_MIN_PASSING_POINTS` (30 pts) continua existindo só como resumo rápido de "mínimo eliminatório", como já estava documentado como simplificação.
  - Tempo médio por disciplina.
  - Acerto por tipo de questão (direta / exceção-pegadinha / cálculo-aplicação) — **classificação HEURÍSTICA por regex sobre o próprio enunciado** (`classifyQuestionType`), nunca um dado oficial da banca (a Cesgranrio não publica essa classificação) — rotulado como tal na UI.
  - Comparação com o simulado concluído anterior do mesmo aluno, por disciplina (melhorando/piorando/estável) — estado honesto "sem simulado anterior" quando não há base.
- Corrigido de quebra: um comentário em `generator.ts` dizia "Específicas valem 2 pts" — errado, o edital confirma 1 ponto por questão em qualquer disciplina (60 questões = 60 pontos). Só o comentário estava errado, o cálculo real (`scoreMockExam`) já usava 1 ponto corretamente.

**Limitação conhecida**: a classificação de tipo de questão é só uma heurística de texto — não valida contra o padrão real de cada banca, e pode classificar errado enunciados atípicos. A "estimativa incidência" usada no Motor 3 (abaixo) também é heurística (ver seção 3).

## 3. Motor 3 — Previsão de nota e priorização automática

Novo serviço `src/lib/pedagogy/scoreEstimate.ts`, ligando a fórmula já existente (`computePriority`) a dado real pela primeira vez. **Só leitura** — não grava nada, não duplica `masterySnapshots`/`reviewSchedules`.

### Fórmula (documentada aqui e no cabeçalho do arquivo)

Por código do edital (= tópico, relação 1:1 confirmada):

1. **Peso em pontos do código** = peso da disciplina (`SubjectDef.examWeightPoints`, confirmado pela estrutura oficial) ÷ nº de códigos daquela disciplina. *Suposição documentada*: o edital não publica peso por código, só por disciplina — divisão igual entre os códigos é a estimativa mais neutra possível.
2. **Acurácia ponderada** = 70% acurácia recente (últimas 10 tentativas, já calculada em `masterySnapshots.recentAccuracyRate`) + 30% acurácia geral — dá mais peso ao desempenho recente (reflete esquecimento/evolução) sem descartar o histórico.
3. **"Tem dado suficiente"** = ≥ 3 tentativas no tópico (mesmo piso de `MIN_ATTEMPTS_FOR_SIGNAL` usado no domínio) — abaixo disso, o código entra no relatório mas NÃO entra na nota estimada.
4. **Nota estimada** = extrapolação HONESTA: soma (acurácia ponderada × peso em pontos) só dos códigos com dado suficiente, dividido pelos pontos cobertos por esses códigos = "acurácia conhecida"; a nota mostrada é "acurácia conhecida" × 60 pontos totais — sempre acompanhada de "baseado em X dos 60 pontos já com dado real". Com ZERO tentativas em qualquer tópico, não mostra nenhum número — mostra o estado "ainda coletando dados".
5. **Priorização** = `computePriority` (já existente): peso normalizado × lacuna de cobertura × fraqueza do aluno × urgência de revisão × incidência estimada.
   - Lacuna de cobertura = `1 − tentativas/5` (piso de tentativas pra "domínio", `MIN_ATTEMPTS_FOR_MASTERY`) — captura "nunca estudado" (=1) separadamente da fraqueza.
   - Fraqueza do aluno = `computeWeaknessFactor` já existente, alimentada com a acurácia REAL quando há dado suficiente, e **0.5 neutro quando não há** (bug corrigido durante os testes: usar 0 de acurácia pra tópico nunca tentado inflava a prioridade de TUDO que nunca foi estudado, afogando quem de fato foi tentado e errado bastante — coverage já captura "nunca estudado", não precisa duplicar em weakness).
   - Urgência de revisão = `computeReviewUrgency` se há uma revisão pendente pro tópico; piso (0.1) se não há nenhuma.
   - Incidência estimada = tamanho do banco de questões reais daquele código, normalizado pelo código com mais questões. *Suposição documentada*: proxy razoável, não é estatística oficial de incidência (a banca não publica isso).

### Onde aparece

- Painel "Meu Curso" (Hoje): cartão "Nota estimada e prioridade de hoje" com a extrapolação + link direto pro código de maior impacto — ou o estado honesto "ainda coletando dados".
- Professor (tool calling): `obter_estimativa_e_priorizacao`, nova ferramenta (`risk: "auto"`, só leitura) — responde "no que devo focar hoje?"/"qual minha nota estimada?" com estes dados reais.

**Limitação conhecida**: o peso por código (divisão igual dentro da disciplina) é uma aproximação — se o edital publicar peso oficial por código no futuro, `examWeightPoints` em `scoreEstimate.ts` é o único lugar a ajustar.

## 4. Coerência entre os motores (seção 5 da missão)

Confirmado, sem nenhum passo manual: um erro num simulado (Motor 2) → `finishMockExamAttempt` chama `recordAttempt` pra cada questão (já existia) → `recordAttempt` abre/atualiza dificuldade e agenda revisão (Motor 1, já existia + gap-fill desta missão) → `masterySnapshots` é recalculado na mesma chamada → `computeScoreEstimate` (Motor 3) lê `masterySnapshots`/`reviewSchedules` ao vivo, então a nota estimada e a priorização mudam automaticamente na próxima vez que a tela/ferramenta for consultada. Testado via `src/lib/pedagogy/__tests__/scoreEstimate.test.ts` (muda a estimativa entre "tudo certo" e "tudo errado" no mesmo tópico).

## 5. Suposições assumidas nesta missão

1. Duração da prova completa: 4h — **confirmada** no edital (`MATRIZ_EDITAL_TRANSPETRO.md`), não é suposição.
2. Duração de simulados parciais: fração proporcional ao nº de questões — suposição, o edital só define a duração da prova inteira.
3. Peso em pontos por código do edital: divisão igual entre os códigos de cada disciplina — suposição, o edital só publica peso por disciplina.
4. Incidência estimada por código: tamanho do banco de questões reais daquele código — suposição/proxy, não é estatística oficial da banca.
5. Classificação de tipo de questão (direta/exceção/cálculo): heurística por regex no enunciado — nunca um dado oficial.
6. Blend de acurácia recente/geral (70/30): escolha documentada, não uma constante do edital.

## 6. Validações executadas

- `tsc --noEmit`: ✅ 0 erros, em cada um dos 4 commits desta missão.
- `npm run build`: ✅ 38 rotas, em cada um dos 4 commits.
- `npm test`: ✅ 92 testes passando, 15 suítes (42 pulados, suítes pré-existentes já marcadas `describe.skip` por dependerem de uma aula placeholder antiga — não mudou nesta missão, ver pendência já registrada na seção "Continuidade — Cronograma" abaixo). Testes novos desta missão: `scoreEstimate.test.ts` (6), `weakSignalReview.test.ts` (5), `diagnostics.test.ts` (16), `generator.test.ts` (6), `recommendedActivityRefs.test.ts` (1), mais 2 novos em `toolExecutors.test.ts` — todos exercitando os motores de ponta a ponta com conteúdo/questões REAIS (não fixtures inventadas), incluindo os casos exigidos pela missão: revisão agendada a partir de um erro real, diagnóstico completo depois de um simulado, nota estimada e priorização mudando de forma coerente após novas tentativas.
- **Não foi possível validar interativamente no navegador** (login real via Supabase necessário pra ter uma matrícula/progresso de teste) — a validação ficou nos testes automatizados acima, que cobrem exatamente os fluxos pedidos na seção 7 da missão (agendamento de revisão, diagnóstico do simulado, nota estimada mudando). Próxima sessão com acesso ao navegador logado: confirmar visualmente o cartão "Nota estimada" em `/meu-curso` e o relatório de diagnóstico em `/simulados` depois de um simulado real.
- **Nenhum deploy foi feito** (instrução explícita da missão, seção 6) — os 4 commits desta missão ficaram só locais, sem `git push`.

## 7. Próxima ação recomendada

1. Validar interativamente no navegador (login real) os 3 pontos da seção 7 da missão que só foram cobertos por teste automatizado até aqui.
2. Criar uma rota `/questoes/[id]` (reaproveitando `QuestionCard`) pra que `"question:<id>"` em `recommendedActivityRefs` vire link clicável de verdade.
3. Se/quando o usuário decidir fazer deploy desta missão, rodar a sequência já estabelecida (commit → push → conferir deploy no Vercel).
4. Considerar reescrever as suítes `describe.skip` (`service.test.ts`, `toolExecutors.test.ts`) contra um tópico real (ex.: `pt-01-compreensao-textos`, já usado nos testes novos desta missão) — pendência antiga, não desta missão, mas cada vez mais fácil de resolver agora que há mais exemplos recentes de teste com conteúdo real no próprio arquivo.

---

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

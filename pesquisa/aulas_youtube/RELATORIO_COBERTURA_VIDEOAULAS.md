# Relatório de Cobertura de Videoaulas — Transpetro 2026 (Cesgranrio, Nível Técnico, Ênfase Administração e Controle)

Consolidação dos três lotes de pesquisa (PT+MAT, AC-01 a AC-09, AC-10 a AC-21), executados por três agentes de pesquisa independentes com busca real no YouTube (WebSearch + inspeção direta de páginas/oEmbed). Nenhum vídeo foi inventado — cada linha do CSV consolidado (`videoaulas_por_codigo.csv`) foi verificada individualmente (título, canal e URL reais); duração e data de publicação nem sempre puderam ser confirmadas pelas ferramentas disponíveis e, quando isso ocorreu, foram registradas como "não verificada"/"não identificada" em vez de inventadas.

**Arquivo de dados:** [`videoaulas_por_codigo.csv`](./videoaulas_por_codigo.csv) — 115 linhas (vídeos), 1 por vídeo, todos os 12 campos exigidos.

## 1. Totais gerais

- **39 de 39 códigos pesquisados.**
- **38 de 39 códigos atingiram a meta de 3/3 vídeos** (AC-17 completado em rodada adicional de pesquisa em 2026-08-20).
- **1 código permanece em 2/3** (gap documentado, com esgotamento de pesquisa comprovado em duas rodadas de busca): **AC-14** (Manuseio de Materiais — falta vídeo específico sobre tecnologias de automação no manuseio).
- **0 códigos com 0 vídeo.**
- **Total de vídeos catalogados: 116** (piso esperado: 39 × 3 = 117; ficou 1 abaixo por causa do gap remanescente em AC-14).
- **Horas de conteúdo:** 35 dos 116 vídeos (lote AC-10 a AC-21, mais 2 do lote AC-01 a AC-09) tiveram duração confirmada diretamente na página do YouTube — soma ≈ **48,7 horas** só nesses. Os demais 81 vídeos (lotes PT+MAT e a maior parte de AC-01 a AC-09) não tiveram duração exposta pelas ferramentas de verificação disponíveis (oEmbed do YouTube não retorna esse campo) e foram registrados como "não verificada"/"não identificada" — **o total real de horas do acervo é maior que 48,7h, mas não pode ser somado com precisão sem inflar dados não confirmados.**

## 2. Distribuição por `fonte_prioridade`

| Fonte | Vídeos | % |
|---|---|---|
| estrategia_concursos | 7 | 6,0% |
| adriane_fauth | 0 | 0% |
| outro_canal_concursos | 60 | 51,7% |
| fora_do_universo_concursos (último recurso) | 49 | 42,2% |

**Nota sobre Estratégia Concursos:** confirmado que o canal tem curso "Transpetro Profissional de Nível Médio" e diversas aulas de legislação/logística no YouTube, mas grande parte do conteúdo de teoria estruturada está no curso pago — por isso apareceu como fonte principal em poucos códigos (AC-03, AC-09, AC-10 ×2, AC-11, AC-16), mas foi verificado ativamente em todos os 39 códigos.

**Nota sobre Adriane Fauth:** verificado ativamente nos três lotes — o canal da professora é focado em **Direito Constitucional e Português**, sem conteúdo de Matemática, Administração, Finanças, Logística ou Informática. Por isso não aparece em nenhuma linha do CSV. Isso não é falha de pesquisa: os três agentes confirmaram essa limitação de escopo do canal antes de descartá-lo.

## 3. Distribuição por `edital_especifico`

| Tipo | Vídeos | % |
|---|---|---|
| SIM (produzido para o edital Transpetro 2026) | 1 | 0,9% |
| NAO (dentro da grade, mas de outro edital/concurso) | 58 | 50,0% |
| GERAL (canais de concursos genéricos, sem edital-alvo específico, ou último recurso) | 57 | 49,1% |

Apenas 1 vídeo foi encontrado como especificamente produzido para o edital Transpetro 2026 (AC-10, sprint de questões Cesgranrio da Estratégia Concursos). Isso é esperado: o edital é recente (agosto/2026) e a prova só ocorre em 29/11/2026, então a maior parte do material de cursinho ainda não foi produzida especificamente para ele — o canal CPWS (Concursos Petrobras e Transpetro) supre boa parte dessa lacuna com conteúdo "dentro da grade" (NAO) de cursos anteriores de Petrobras/Transpetro.

## 4. Tabela por código

| Código | Vídeos | Fontes | Atingiu 3/3? |
|---|---|---|---|
| PT-01 | 3 | outro_canal_concursos (3) | SIM |
| PT-02 | 3 | outro_canal_concursos (3) | SIM |
| PT-03 | 3 | outro_canal_concursos (3) | SIM |
| PT-04 | 3 | outro_canal_concursos (3) | SIM |
| PT-05 | 3 | outro_canal_concursos (3) | SIM |
| PT-06 | 3 | outro_canal_concursos (3) | SIM |
| PT-07 | 3 | outro_canal_concursos (3) | SIM |
| PT-08 | 3 | fora_do_universo_concursos (2) + outro_canal_concursos (1) | SIM |
| MAT-01 | 3 | fora_do_universo_concursos (3) | SIM |
| MAT-02 | 3 | fora_do_universo_concursos (2) + outro_canal_concursos (1) | SIM |
| MAT-03 | 3 | fora_do_universo_concursos (2) + outro_canal_concursos (1) | SIM |
| MAT-04 | 3 | outro_canal_concursos (3) | SIM |
| MAT-05 | 3 | fora_do_universo_concursos (3) | SIM |
| MAT-06 | 3 | fora_do_universo_concursos (2) + outro_canal_concursos (1) | SIM |
| MAT-07 | 3 | fora_do_universo_concursos (2) + outro_canal_concursos (1) | SIM |
| MAT-08 | 3 | fora_do_universo_concursos (3) | SIM |
| MAT-09 | 3 | fora_do_universo_concursos (3) | SIM |
| MAT-10 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-01 | 3 | outro_canal_concursos (3) | SIM |
| AC-02 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-03 | 3 | estrategia_concursos (1) + outro_canal_concursos (2) | SIM |
| AC-04 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-05 | 3 | outro_canal_concursos (3) | SIM |
| AC-06 | 3 | outro_canal_concursos (3) | SIM |
| AC-07 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-08 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-09 | 3 | estrategia_concursos (1) + fora_do_universo_concursos (2) | SIM |
| AC-10 | 3 | estrategia_concursos (2) + outro_canal_concursos (1) | SIM |
| AC-11 | 3 | outro_canal_concursos (2) + estrategia_concursos (1) | SIM |
| AC-12 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-13 | 3 | fora_do_universo_concursos (3) | SIM |
| **AC-14** | **2** | fora_do_universo_concursos (2) | **NÃO — 2/3** |
| AC-15 | 3 | fora_do_universo_concursos (2) + outro_canal_concursos (1) | SIM |
| AC-16 | 3 | outro_canal_concursos (2) + estrategia_concursos (1) | SIM |
| AC-17 | 3 | estrategia_concursos (1) + outro_canal_concursos (2) | SIM |
| AC-18 | 3 | outro_canal_concursos (3) | SIM |
| AC-19 | 3 | outro_canal_concursos (3) | SIM |
| AC-20 | 3 | outro_canal_concursos (3) | SIM |
| AC-21 | 3 | outro_canal_concursos (3) | SIM |

## 5. Código que não atingiu 3/3 — esgotamento de pesquisa documentado

### AC-14 — Manuseio de Materiais (2/3)
Encontrados: "Equipamentos de Movimentação" (SAC Logística) e "Movimentação e Armazenagem — Aula 01" (EaD IFPI). **Duas rodadas de busca**, a segunda dedicada especificamente a este gap (2026-08-20): "SAC Logística automação armazém", "automação armazém WMS robótica logística aula completa", "CPWS manuseio de materiais", "robótica logística armazém automação AS/RS aula concurso", "site:youtube.com AGV OR veículos guiados armazém aula OR empilhadeira automática tecnologia movimentação", "SAC Logística youtube tecnologias movimentação de materiais aula", "indústria 4.0 logística tecnologias automação armazém aula completa youtube", "Logística 4.0 aula completa youtube tecnologias emergentes armazém automação" — todas retornaram apenas artigos/blogs corporativos (TOTVS, Tegma, Mecalux, Cobli, ARV Systems), vídeos institucionais de fabricante de equipamento (não aulas didáticas) ou um webinar em espanhol fora de escopo. Estratégia Concursos, Adriane Fauth e ao menos 2 outros canais de concursos (CPWS, Gran Cursos) foram checados diretamente e não têm aula dedicada a esse subtema. **Conclusão: gap real, esgotamento comprovado — não é falta de esforço de busca.**

### AC-17 — Gestão de Contratos (COMPLETADO, 3/3 em 2026-08-20)
Encontrados originalmente: curso Herbert Almeida (Estratégia Concursos, Lei 14.133/2021, com capítulo de contratos) e aula CPWS sobre Lei 13.303/2016 (procedimento licitatório que precede a formalização contratual) — ambos reaproveitados de AC-16 em papéis diferentes. Rodada adicional de busca ("gestão e fiscalização de contratos Lei 14.133 aula Estratégia Concursos OR Gran Cursos youtube") localizou e confirmou via oEmbed: **"Minicurso de GESTÃO DE CONTRATOS para CONCURSOS - Lei 14.133/21 - AULA 01 - Professor Franco"** (canal JUS POLIS), específico sobre gestão de contratos (não licitação em geral), distinto dos dois vídeos já usados. Código atualizado para 3/3.

## 6. Fontes/canais identificados por grupo

- **PT/MAT:** Estratégia Concursos e Adriane Fauth checados e descartados (aulas de teoria estruturada em curso pago / canal fora de escopo); usados canais consolidados de concursos (Qconcursos, Gran Cursos Online, Nova Concursos, Focus Concursos, Prof. Álvaro Ferreira, Décio Terror, entre outros) e, em vários temas de Matemática pura, canais de ensino geral de matemática como último recurso (documentado).
- **AC-01 a AC-09:** Estratégia Concursos usado em AC-03/AC-09; Rodrigo Rennó, AlfaCon, Felippe Loureiro, Qconcursos, Carranza Cursos usados como outro_canal_concursos; 4 códigos técnicos (AC-02, AC-04, AC-07, AC-08) precisaram de canais fora do universo de concursos após esgotamento comprovado.
- **AC-10 a AC-21:** CPWS - Concursos Petrobras e Transpetro (canal especializado no próprio edital/banca) foi a principal descoberta nova, usado em 7 vídeos de Logística e Licitações; Estratégia Concursos usado em 5 vídeos; canais de Informática para concursos (Prof. Alan Souza, Professor Alê, AlfaCon, Prof. Marcelo Narciso) cobriram AC-18 a AC-21 integralmente dentro do universo de concursos; SAC Logística e afins usados como último recurso em AC-12/13/14/15.

## 7. Atenção à legislação (AC-16)

Confirmado: os 3 vídeos de AC-16 tratam de legislação **vigente** — Lei 13.303/2016 (CPWS, 2 vídeos) e Lei 14.133/2021 (Estratégia Concursos/Herbert Almeida, 1 vídeo). **Nenhum vídeo do conjunto se baseia na Lei 8.666/1993 (revogada).**

## 8. Auditoria dos vídeos com papel `complementar_questoes` (2026-08-20)

Todos os 23 vídeos registrados com `papel=complementar_questoes` no catálogo foram reverificados individualmente via oEmbed do YouTube (título e canal reais confirmados, nenhum link quebrado ou inventado). Além da existência, foi checado se o título de fato indica resolução de questões/exercícios (e não apenas teoria), já que o YouTube não expõe a descrição completa do vídeo pelas ferramentas de verificação disponíveis (só o título/canal via oEmbed).

**Resultado (1ª passada, por título/oEmbed):**
- **20 de 23 confirmados com alta confiança** — o título menciona explicitamente "questões", "exercícios" ou expressão equivalente (ex.: "13 questões", "Questões Comentadas", "Exercícios resolvidos", "6 QUESTÕES CONCURSO", "500 Questões", "Sprint de Questões").
- **1 caso corrigido — AC-15:** o vídeo "Logística de Transportes - Aula: Cargas Perigosas (Aula 1)" (CPWS) estava rotulado como `complementar_questoes`, mas o título indica claramente uma aula expositiva/teórica estruturada ("Aula 1" de um curso), sem qualquer menção a questões. Reclassificado para `complementar_revisao` (o papel `complementar_aprofundamento` já estava ocupado por outro vídeo no mesmo código).
- **2 casos de confiança baixa**, sinalizados para confirmação manual: AC-03 (Qconcursos) e MAT-09 (Prof. Sérgio Mendes).

**Confirmação manual (2ª passada, 2026-08-20)** — os 2 vídeos de confiança baixa foram abertos diretamente no navegador (página completa do YouTube inspecionada, incluindo descrição expandida e, quando disponível, transcrição):

- **MAT-09 — CONFIRMADO, papel mantido.** A descrição completa do vídeo diz literalmente: *"Curso Preparatório Online e Gratuito de MATEMÁTICA BÁSICA e GEOMETRIA PLANA com exercícios resolvidos para o Ensino Fundamental, Médio e Superior, ENEM, Vestibulares e Concursos Públicos."* Confirma resolução de exercícios — `complementar_questoes` está correto.
- **AC-03 — CORRIGIDO.** A descrição completa do vídeo (Qconcursos) foi inspecionada por inteiro e **não contém nenhuma menção a questões, exercícios ou resolução de itens** — é apenas o boilerplate padrão do canal (redes sociais, grupos de WhatsApp/Telegram) mais o contexto de que o vídeo é a aula nº X de um curso estruturado "Concurso BNDES" (132 lições), transmitida ao vivo em 18/09/2024, duração real 37min29s (também confirmada — o CSV tinha "não identificada"). Sem transcrição disponível para este vídeo (replay de live sem legendas automáticas). Como não há evidência de resolução de questões, o papel foi **reclassificado de `complementar_questoes` para `complementar_aprofundamento`** (papel ainda não ocupado neste código) e a duração/data foram corrigidas no CSV.

**Resultado final da auditoria:** dos 23 vídeos originalmente rotulados `complementar_questoes`, **21 permanecem confirmados** (20 da 1ª passada + MAT-09 confirmado na 2ª), **2 foram corrigidos para outro papel** (AC-15 → `complementar_revisao`, AC-03 → `complementar_aprofundamento`). Nenhum vídeo foi removido do catálogo nem inventado — apenas papéis, duração e data foram corrigidos onde a verificação encontrou divergência real.

## 9. Auditoria dos vídeos com papel `complementar_aprofundamento` e `complementar_revisao` (2026-08-20)

Complementando a auditoria da seção 8, os **57 vídeos restantes do catálogo** (34 com papel `complementar_aprofundamento` e 23 com papel `complementar_revisao`, incluindo os já reclassificados na seção 8) foram reverificados individualmente via oEmbed do YouTube — título e canal reais confirmados para 100% dos vídeos.

**Resultado:**
- **57 de 57 vídeos existem e têm título/canal confirmados** — nenhum link quebrado, nenhum vídeo inventado.
- **1 pequena correção de grafia**: o vídeo de AC-12 ("Gestão de ESTOQUE usando CURVA ABC") está registrado sob o canal "Ser Logístico" no YouTube, não "Ser Logística" como constava no CSV — corrigido.
- **Nenhum caso de categoria claramente errada** (como o de AC-15 na seção 8, onde uma aula teórica longa estava rotulada como resolução de questões) foi encontrado neste lote. Os títulos dos vídeos `complementar_aprofundamento` batem consistentemente com a função de aprofundar um subtema específico (ex.: "Auditoria Interna ISO 9001", "Desconto Comercial Simples", "Unitização de Cargas"), e os títulos dos `complementar_revisao` são majoritariamente compatíveis com revisão/reforço (vários contêm literalmente "revisão", "dica", "em 5 minutos", "em 10 min", "conceitos básicos").
- **Observação de nomenclatura (não é erro de dado):** alguns vídeos rotulados `complementar_revisao` são na verdade aulas longas e completas de um curso estruturado (ex.: AC-11 "Concurso ANTT: Legislação Aplicada..." 2h16min, AC-16 "Téc. de Suprimento de Bens e Serviços: Lei 13.303/2016 (Aula 1)" 2h53min, AC-08 "46 - Demonstração do Fluxo de Caixa" de uma série numerada) — o papel foi atribuído pela função que o vídeo cumpre no conjunto de 3 (cobrir um ângulo/subtema que os outros dois não cobrem), não pela duração ou por conter literalmente a palavra "revisão" no título. Isso é uma convenção de rotulagem do catálogo (mesma usada desde a pesquisa original), não uma inconsistência factual — todos os vídeos foram confirmados como reais e aderentes ao código correspondente.

**Conclusão geral da auditoria completa (seções 8+9):** dos 116 vídeos do catálogo, **113 foram auditados individualmente com sucesso, título e canal 100% confirmados** (23 complementar_questoes + 34 complementar_aprofundamento + 23 complementar_revisao + 33 já verificados na pesquisa original como principal ou nos lotes de complementação). Nenhum vídeo inventado foi encontrado em nenhuma etapa da pesquisa. 2 papéis foram corrigidos (AC-15, AC-03) e 1 nome de canal foi corrigido (AC-12).

## 10. Verificação de duração — vídeos com menos de 5 minutos (2026-08-20)

A pedido, foi feita uma varredura específica por vídeos muito curtos (potencialmente curtos demais para funcionar como "aula"). Como a maioria dos vídeos tem duração registrada como "não verificada"/"não identificada" (o oEmbed do YouTube não expõe esse campo), a varredura priorizou os candidatos mais prováveis a partir do título/nota_aderencia (menções a "minutos", "rápida", "curta", "dica", "objetiva") e confirmou a duração real abrindo cada vídeo diretamente no navegador.

**Candidatos verificados e duração real confirmada:**
| Vídeo | Código | Duração real |
|---|---|---|
| "Dica nº83" — AlfaCon | AC-05 | **0:58 (58 segundos)** |
| "CLASSE DE PALAVRAS... em 5 minutos" — Prof. Álvaro Ferreira | PT-04 | 5:22 |
| "Revisão de Tipos e Gêneros Textuais" — OS PEDAGÓGICOS | PT-01 | 50:33 |
| "ORTOGRAFIA - Palavras que MAIS CAEM" — Prof. Álvaro Ferreira | PT-02 | 1:27:51 |

**Resultado:** **1 vídeo tinha menos de 5 minutos** — o "Dica nº83" do AlfaCon (AC-05), com apenas 58 segundos. Por ser curto demais para funcionar como uma aula real (é um "lembrete" pontual, não uma explicação desenvolvida), **foi substituído** por "Indicadores de Gestão - Eficiência, Eficácia e Efetividade" (Prof. Rodrigo Rennó, 14min26s), que cobre um recorte conceitual específico de "indicadores de desempenho" com profundidade adequada. Os demais 3 candidatos verificados (PT-01, PT-02, PT-04) têm duração substancial (todos acima de 5 minutos, incluindo o PT-04 que promete "5 minutos" no título mas na prática tem 5min22s).

**Limite da verificação:** esta varredura não abriu individualmente todos os ~80 vídeos com duração "não verificada"/"não identificada" do catálogo (isso exigiria abrir cada um manualmente no navegador, um a um). Ela focou nos candidatos sinalizados por título/nota como potencialmente curtos. Não há indício, pelos títulos e contexto (a maioria são "aulas", "cursos", "sprints", vídeos de 30min+ típicos de canais de concursos), de que outros vídeos do catálogo sejam extremamente curtos como o caso encontrado — mas isso não é uma confirmação absoluta de que nenhum outro vídeo abaixo de 5 minutos exista no restante do catálogo não verificado.

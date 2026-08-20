# Relatório de Cobertura de Videoaulas — Transpetro 2026 (Cesgranrio, Nível Técnico, Ênfase Administração e Controle)

Consolidação dos três lotes de pesquisa (PT+MAT, AC-01 a AC-09, AC-10 a AC-21), executados por três agentes de pesquisa independentes com busca real no YouTube (WebSearch + inspeção direta de páginas/oEmbed). Nenhum vídeo foi inventado — cada linha do CSV consolidado (`videoaulas_por_codigo.csv`) foi verificada individualmente (título, canal e URL reais); duração e data de publicação nem sempre puderam ser confirmadas pelas ferramentas disponíveis e, quando isso ocorreu, foram registradas como "não verificada"/"não identificada" em vez de inventadas.

**Arquivo de dados:** [`videoaulas_por_codigo.csv`](./videoaulas_por_codigo.csv) — 115 linhas (vídeos), 1 por vídeo, todos os 12 campos exigidos.

## 1. Totais gerais

- **39 de 39 códigos pesquisados.**
- **37 de 39 códigos atingiram a meta de 3/3 vídeos.**
- **2 códigos ficaram em 2/3** (gaps documentados abaixo, com esgotamento de pesquisa comprovado): **AC-14** (Manuseio de Materiais) e **AC-17** (Gestão de Contratos).
- **0 códigos com 0 vídeo.**
- **Total de vídeos catalogados: 115** (piso esperado: 39 × 3 = 117; ficou 2 abaixo por causa dos 2 gaps documentados).
- **Horas de conteúdo:** apenas 35 dos 115 vídeos (os do lote AC-10 a AC-21, mais 2 do lote AC-01 a AC-09) tiveram duração confirmada diretamente na página do YouTube — soma ≈ **48,7 horas** só nesses. Os demais 80 vídeos (lotes PT+MAT e a maior parte de AC-01 a AC-09) não tiveram duração exposta pelas ferramentas de verificação disponíveis (oEmbed do YouTube não retorna esse campo) e foram registrados como "não verificada"/"não identificada" — **o total real de horas do acervo é maior que 48,7h, mas não pode ser somado com precisão sem inflar dados não confirmados.**

## 2. Distribuição por `fonte_prioridade`

| Fonte | Vídeos | % |
|---|---|---|
| estrategia_concursos | 7 | 6,1% |
| adriane_fauth | 0 | 0% |
| outro_canal_concursos | 59 | 51,3% |
| fora_do_universo_concursos (último recurso) | 49 | 42,6% |

**Nota sobre Estratégia Concursos:** confirmado que o canal tem curso "Transpetro Profissional de Nível Médio" e diversas aulas de legislação/logística no YouTube, mas grande parte do conteúdo de teoria estruturada está no curso pago — por isso apareceu como fonte principal em poucos códigos (AC-03, AC-09, AC-10 ×2, AC-11, AC-16), mas foi verificado ativamente em todos os 39 códigos.

**Nota sobre Adriane Fauth:** verificado ativamente nos três lotes — o canal da professora é focado em **Direito Constitucional e Português**, sem conteúdo de Matemática, Administração, Finanças, Logística ou Informática. Por isso não aparece em nenhuma linha do CSV. Isso não é falha de pesquisa: os três agentes confirmaram essa limitação de escopo do canal antes de descartá-lo.

## 3. Distribuição por `edital_especifico`

| Tipo | Vídeos | % |
|---|---|---|
| SIM (produzido para o edital Transpetro 2026) | 1 | 0,9% |
| NAO (dentro da grade, mas de outro edital/concurso) | 57 | 49,6% |
| GERAL (canais de concursos genéricos, sem edital-alvo específico, ou último recurso) | 57 | 49,6% |

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
| **AC-17** | **2** | estrategia_concursos (1) + outro_canal_concursos (1) | **NÃO — 2/3** |
| AC-18 | 3 | outro_canal_concursos (3) | SIM |
| AC-19 | 3 | outro_canal_concursos (3) | SIM |
| AC-20 | 3 | outro_canal_concursos (3) | SIM |
| AC-21 | 3 | outro_canal_concursos (3) | SIM |

## 5. Códigos que não atingiram 3/3 — esgotamento de pesquisa documentado

### AC-14 — Manuseio de Materiais (2/3)
Encontrados: "Equipamentos de Movimentação" (SAC Logística) e "Movimentação e Armazenagem — Aula 01" (EaD IFPI). Buscas testadas para o 3º vídeo: "SAC Logística automação armazém", "automação armazém WMS robótica logística aula completa", "CPWS manuseio de materiais" — só retornaram artigos/blogs, sem aula em vídeo verificável sobre tecnologias de automação no manuseio. Estratégia Concursos, Adriane Fauth e ao menos 2 outros canais de concursos (CPWS, Gran Cursos) foram checados diretamente e não têm aula dedicada a esse subtema. Sugestão para pesquisa futura: termos "AS/RS armazém aula" ou "robótica logística concurso".

### AC-17 — Gestão de Contratos (2/3)
Encontrados: curso Herbert Almeida (Estratégia Concursos, Lei 14.133/2021, com capítulo de contratos) e aula CPWS sobre Lei 13.303/2016 (procedimento licitatório que precede a formalização contratual) — ambos reaproveitados de AC-16 em papéis diferentes. Buscas testadas para um 3º vídeo dedicado a fiscalização/aditivos/contratos digitais: "gestão de contratos ciclo de vida fiscalização aditivos CPWS/Estratégia/Gran", "fiscal de contrato gestor de contrato Lei 14133 aula", "questões fiscalização de contratos Cesgranrio" — retornaram majoritariamente artigos/PDFs ou um vídeo cujo link não pôde ser confirmado como acessível. Estratégia Concursos, Adriane Fauth e outros 2+ canais de concursos foram checados diretamente. Sugestão para pesquisa futura: playlist de Direito Administrativo/Contratos do Estratégia Concursos ou Gran Cursos, com recorte mais específico de gestão/fiscalização contratual.

## 6. Fontes/canais identificados por grupo

- **PT/MAT:** Estratégia Concursos e Adriane Fauth checados e descartados (aulas de teoria estruturada em curso pago / canal fora de escopo); usados canais consolidados de concursos (Qconcursos, Gran Cursos Online, Nova Concursos, Focus Concursos, Prof. Álvaro Ferreira, Décio Terror, entre outros) e, em vários temas de Matemática pura, canais de ensino geral de matemática como último recurso (documentado).
- **AC-01 a AC-09:** Estratégia Concursos usado em AC-03/AC-09; Rodrigo Rennó, AlfaCon, Felippe Loureiro, Qconcursos, Carranza Cursos usados como outro_canal_concursos; 4 códigos técnicos (AC-02, AC-04, AC-07, AC-08) precisaram de canais fora do universo de concursos após esgotamento comprovado.
- **AC-10 a AC-21:** CPWS - Concursos Petrobras e Transpetro (canal especializado no próprio edital/banca) foi a principal descoberta nova, usado em 7 vídeos de Logística e Licitações; Estratégia Concursos usado em 5 vídeos; canais de Informática para concursos (Prof. Alan Souza, Professor Alê, AlfaCon, Prof. Marcelo Narciso) cobriram AC-18 a AC-21 integralmente dentro do universo de concursos; SAC Logística e afins usados como último recurso em AC-12/13/14/15.

## 7. Atenção à legislação (AC-16)

Confirmado: os 3 vídeos de AC-16 tratam de legislação **vigente** — Lei 13.303/2016 (CPWS, 2 vídeos) e Lei 14.133/2021 (Estratégia Concursos/Herbert Almeida, 1 vídeo). **Nenhum vídeo do conjunto se baseia na Lei 8.666/1993 (revogada).**

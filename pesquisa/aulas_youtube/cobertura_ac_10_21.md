# Cobertura de videoaulas — AC-10 a AC-21 (Transpetro 2026, Cesgranrio)

Status: CONCLUÍDO (com 2 códigos em 2/3, gaps documentados abaixo). Última atualização: 2026-08-20.

Metodologia: buscas reais no YouTube via WebSearch e navegação/inspeção direta de páginas do YouTube (metadados de canal, data de publicação e duração extraídos diretamente do HTML/meta tags da página do vídeo ou da listagem de busca/playlist). Nenhum vídeo foi incluído sem confirmação real de título, canal e URL. Quando a data exata não pôde ser confirmada (apenas a data relativa exibida pelo YouTube, ex. "há 1 ano"), isso foi registrado explicitamente no campo `data_publicacao` em vez de inventar uma data.

## Fontes identificadas

- **Estratégia Concursos** (canal oficial): confirmado curso "Transpetro: planejamento de estudos" e diversas aulas de legislação (Herbert Almeida — Lei 14.133/2021; Nick Simonek — regulação de transporte ANTT) e uma aula ao vivo "Hora da Verdade Petrobras" sobre logística/suprimentos/estoques/almoxarifados. Usado como fonte prioritária (estrategia_concursos) em 5 vídeos.
- **Adriane Fauth**: pesquisa confirmou que o canal da professora é focado em Direito Constitucional e Português para concursos. Não foram localizadas aulas dela sobre Logística, Cadeia de Suprimentos, Compras/Licitações ou Informática. Portanto ela não aparece em nenhuma linha do CSV para este grupo de códigos (Logística + Informática).
- **CPWS - Concursos Petrobras e Transpetro** (youtube.com/@cpwsconcursos): canal especializado e consolidado em concursos de Petrobras/Transpetro (banca Cesgranrio), com playlist "Técnico em Logística" (16 vídeos) contendo aulas longas sobre Fundamentos de Logística, Modais/Logística Internacional e Aduaneira, Cargas Perigosas, e Lei 13.303/2016. Usado como fonte prioritária (outro_canal_concursos) em 7 vídeos.
- **Prof. Alan Souza, Professor Alê, AlfaCon, Prof. Marcelo Narciso**: canais consolidados e especializados em Informática para concursos públicos (não específicos de Transpetro, mas de universo de concursos, conforme regra do "GERAL"). Usados para os 4 códigos de Informática (AC-18 a AC-21).
- **SAC Logística, Ser Logística, Canal de Logística, Joselias Silva, EaD IFPI**: canais generalistas de logística/educação, fora do universo de concursos. Usados apenas em AC-12, AC-13, AC-14 e AC-15 (Logística operacional), após esgotamento de busca nas fontes prioritárias — ver detalhamento abaixo.

## Tabela por código

| Código | Vídeos confirmados | Fontes | Atingiu 3/3? |
|---|---|---|---|
| AC-10 | 3 | Estratégia Concursos (2) + CPWS (1) | SIM |
| AC-11 | 3 | CPWS (2) + Estratégia Concursos (1) | SIM |
| AC-12 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-13 | 3 | fora_do_universo_concursos (3) | SIM |
| AC-14 | 2 | fora_do_universo_concursos (2) | NÃO — 2/3 |
| AC-15 | 3 | fora_do_universo_concursos (2) + CPWS (1) | SIM |
| AC-16 | 3 | CPWS (2) + Estratégia Concursos (1) | SIM |
| AC-17 | 2 | Estratégia Concursos (1) + CPWS (1) | NÃO — 2/3 |
| AC-18 | 3 | outro_canal_concursos (3) | SIM |
| AC-19 | 3 | outro_canal_concursos (3) | SIM |
| AC-20 | 3 | outro_canal_concursos (3) | SIM |
| AC-21 | 3 | outro_canal_concursos (3) | SIM |

**Total: 10 de 12 códigos com 3/3. 2 códigos (AC-14, AC-17) com 2/3, gaps documentados abaixo.**

## Notas por código

### AC-10 — Logística e Gestão da Cadeia de Suprimentos (3/3)
Estratégia Concursos (aula ao vivo "Hora da Verdade Petrobras") como principal; CPWS (Fundamentos de Logística Aula 1) como aprofundamento; Estratégia Concursos (Sprint de Questões Cesgranrio Transpetro — Monitoramento Logístico) como questões, específico do edital 2026.

### AC-11 — Modalidades de transporte (3/3)
Dupla de aulas CPWS sobre Modais e Convenções internacionais (Logística Internacional e Aduaneira) como principal e aprofundamento; aula da Estratégia Concursos sobre regulação/legislação de transporte terrestre (foco ANTT) como revisão do arcabouço normativo citado no código.

### AC-12 — Gestão de Estoques (3/3, fora do universo de concursos)
Esgotamento de pesquisa: buscas com os termos "gestão de estoques Estratégia/Gran/AlfaCon", "CPWS gestão de estoques/armazenagem", "curva ABC concurso" não retornaram aula completa e específica dos canais prioritários sobre classificação/métodos de estoque (apenas cursos pagos ou trechos). CPWS tem curso "Suprimento de Bens e Serviços" que toca em estoques via legislação, mas não uma aula dedicada a métodos/curva ABC/ponto de pedido. Usados 3 vídeos de canais especializados em logística (SAC Logística, Ser Logística, canal pessoal) com conteúdo tecnicamente correto e diretamente aderente ao código.

### AC-13 — Armazenagem (3/3, fora do universo de concursos)
Mesma situação de esgotamento: não localizada aula específica de tipos de armazém/layout nos canais de concursos pesquisados (Estratégia Concursos, CPWS, Adriane Fauth). Usados 3 vídeos de canais de logística generalistas (SAC Logística x2, Canal de Logística).

### AC-14 — Manuseio de Materiais (2/3 — INCOMPLETO)
Encontrados 2 vídeos aderentes: "Equipamentos de Movimentação" (SAC Logística, princípios/equipamentos) e "Movimentação e Armazenagem — Aula 01" (EaD IFPI, princípios de movimentação eficiente). Não foi localizado um terceiro vídeo especificamente sobre "tecnologias de automação" no manuseio/movimentação de materiais (buscas: "SAC Logística automação armazém", "automação armazém WMS robótica logística aula completa", "CPWS manuseio de materiais") — os resultados retornaram apenas artigos/blogs, sem aula em vídeo dedicada e verificável ao tema de automação. Recomenda-se busca adicional futura com termos como "AS/RS armazém aula" ou "robótica logística concurso" caso se queira completar o terceiro vídeo.

### AC-15 — Embalagem (3/3)
Vídeo principal sobre embalagem na logística (Canal de Logística); complementar sobre unitização de cargas (SAC Logística), subtema explícito do código; complementar CPWS sobre cargas perigosas, cobrindo "segurança no transporte". Esgotamento documentado: 3+ variações de busca não localizaram aula específica e completa sobre embalagem nos canais prioritários de concursos.

### AC-16 — Gestão de Compras (3/3) — atenção à legislação vigente
Principal: CPWS sobre Lei 13.303/2016 (procedimento de licitação), regime aplicável a estatais como a Transpetro. Aprofundamento: curso completo do Prof. Herbert Almeida (Estratégia Concursos) sobre a Lei 14.133/2021 (Nova Lei Geral de Licitações). Revisão: CPWS revisitando a Lei 13.303/2016 sob a ótica de suprimento de bens e serviços. **Nenhum vídeo do conjunto trata da Lei 8.666/1993 (revogada)** — todos os três cobrem legislação vigente, conforme exigido.

### AC-17 — Gestão de Contratos (2/3 — INCOMPLETO)
Encontrados 2 vídeos aderentes, ambos reaproveitados de AC-16 em papéis diferentes (o curso Herbert Almeida e a aula CPWS sobre Lei 13.303/2016 cobrem também contratos/procedimento que antecede a formalização contratual). Não foi localizado um terceiro vídeo específico e verificável sobre "gestão de contratos" com foco em fiscalização/aditivos/contratos digitais nos canais prioritários — as buscas ("gestão de contratos ciclo de vida fiscalização aditivos CPWS/Estratégia/Gran", "fiscal de contrato gestor de contrato Lei 14133 aula", "questões fiscalização de contratos Cesgranrio") retornaram majoritariamente artigos e PDFs, ou vídeos cujo ID não carregou/parece indisponível (ex.: um vídeo "Gestão e Fiscalização de Contratos da Lei nº 14.133/2021" não pôde ser confirmado como acessível). Recomenda-se pesquisa adicional futura diretamente no canal do YouTube da Estratégia Concursos (playlist de Direito Administrativo/Contratos) ou Gran Cursos para completar o terceiro vídeo com um recorte mais específico de gestão/fiscalização contratual.

### AC-18 — Fundamentos de computação (3/3)
Série "Informática para Concursos 2026" do Prof. Alan Souza, publicada em fevereiro de 2026 (atual): Aula 1 (Windows 11, fundamentos) como principal, Aula 8 (utilitários/acessórios do Windows 11) como aprofundamento; questões de sistemas operacionais (Prof. Marcelo Narciso) como treino.

### AC-19 — Aplicativos comerciais (3/3)
Aula 2026 do Prof. Alan Souza sobre MS Word 365 (versão atual, equivalente ao "Office 2024" do edital) como principal; aula longa do AlfaCon cobrindo Word e Excel como aprofundamento (cobre planilhas); aula do AlfaCon sobre PowerPoint como revisão (material multimídia).

### AC-20 — Internet e intranet (3/3)
Série do Professor Alê "Internet x Intranet x Extranet" (aulas 03.01 e 03.02) como principal e aprofundamento; bateria de questões do Prof. Alan Souza especificamente sobre navegadores como treino de questões.

### AC-21 — Segurança da informação e LGPD (3/3)
Aula extensa do AlfaCon sobre segurança da informação como principal; aula recente (nov/2025) e dedicada à Lei 13.709/2018 (LGPD) pelo canal JUS POLIS como aprofundamento; revisão curta sobre os princípios/pilares da segurança da informação (Romilton Júnior).

## Resumo final

- **10 de 12 códigos atingiram 3/3 vídeos**: AC-10, AC-11, AC-12, AC-13, AC-15, AC-16, AC-18, AC-19, AC-20, AC-21.
- **2 códigos ficaram em 2/3**: AC-14 (Manuseio de Materiais — faltou vídeo específico sobre tecnologias de automação) e AC-17 (Gestão de Contratos — faltou vídeo específico e verificável sobre fiscalização/aditivos, distinto dos já usados em AC-16).
- Nenhum vídeo foi inventado; todos os registros do CSV foram confirmados por título, canal e URL reais, via busca e inspeção direta das páginas do YouTube.

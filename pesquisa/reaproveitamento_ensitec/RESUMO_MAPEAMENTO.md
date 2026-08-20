# Resumo do mapeamento ENSITEC → Transpetro (Profissional Nível Técnico, Administração e Controle)

Fonte inspecionada (somente leitura): `D:\DOCUMENTOS DIVERSOS\ENSITEC\src\content\` — principalmente `lessons/` (aulas por matéria), `questions/`, `videos/`, `essays/`, `legal/`, e `curriculum.ts` (estrutura de matérias/trilhas).

Estrutura do ENSITEC: conteúdo organizado por **matéria** (`subjectSlug`: `especificas`, `portugues`, `logica`, `informatica`, `redacao`) e, dentro de cada matéria, por **trilha/tópico** (`curriculum.ts`), com arquivos de aula-base, arquivos "-trio" (aplicação + revisão por questões) e arquivos "-codex" (aprofundamento). Não existe matéria de Matemática isolada — conteúdo matemático fica disperso em `logica.ts`/`logica-*.ts` (Raciocínio Lógico-Numérico).

## Contagem por grau_de_aderência (linhas do CSV)

- DIRETO: 18
- ADAPTAVEL: 16
- REFERENCIA_APENAS: 6
- NENHUM: 17

(Total 57 linhas para 39 códigos — vários códigos têm mais de um recurso.)

## Grupos/temas sem NENHUMA base de reaproveitamento no ENSITEC

- **Matemática avançada**: MAT-03 (funções polinomiais/exponenciais/logarítmicas/trigonométricas), MAT-04 (equações 2º grau, exponenciais, logarítmicas, sistemas lineares), MAT-06 (probabilidade), MAT-07 (estatística básica — só há médias, não dispersão/distribuição), MAT-08 (matemática financeira: juros simples/compostos), MAT-09 (geometria plana), MAT-10 (geometria espacial). Confirmado por busca textual: nenhum arquivo de aula contém "logarit", "função exponencial/logarítmica/trigonométrica", "equação do 2", "sistema linear", "probabilidade" (como conteúdo), "juros simples/compostos" ou geometria.
- **Administração e Controle — blocos operacionais/corporativos inteiros**: AC-01 (RH), AC-03 (Administração Patrimonial), AC-04 (Gestão da Manutenção), AC-05 (Gestão de Indicadores/ESG), AC-07 (Registros contábeis empresariais), AC-08 (Fluxo de caixa empresarial), AC-09 (Balanço/DRE societário), AC-10 a AC-15 (Logística, Transporte, Estoques, Armazenagem, Manuseio, Embalagem). O ENSITEC é um app de administração pública municipal/controle interno-externo (TCU/CF-88), não trata de gestão empresarial, logística ou cadeia de suprimentos — motivo esperado e confirmado.

Isso é coerente com a expectativa do edital Araçás (concurso municipal) versus Transpetro (estatal federal de logística/transporte): as áreas técnicas de logística/cadeia de suprimentos/administração patrimonial/RH simplesmente não fazem parte do escopo do ENSITEC.

## Status confirmado da legislação de licitações no ENSITEC

- O ENSITEC usa **exclusivamente a Lei nº 14.133/2021** (Lei Geral de Licitações e Contratos Administrativos, vigente, regime GERAL da administração pública) — confirmado no texto de `especificas-licitacoes-financas.ts` (linha 11: "Licitações e a Lei nº 14.133/2021"; referências a arts. 5º, 6º, 17, 28 e 117) e nos arquivos "-trio" e nos vídeos curados (`videos/lote2.ts`).
- **Não há qualquer menção à Lei nº 8.666/1993** (revogada) como base — bom, não há risco de conteúdo legado desatualizado nesse sentido.
- **Não há nenhuma menção à Lei nº 13.303/2016** (Lei das Estatais) em todo o projeto — busca textual confirmou ausência total. Essa é a lei que efetivamente rege licitações e contratos da Petrobras Transporte S.A. (Transpetro), com regras próprias (arts. 28-91) diferentes da Lei 14.133/2021.
- Por isso, todo o conteúdo de licitações/contratos (AC-16 e AC-17) foi classificado no máximo como **ADAPTAVEL** (nunca DIRETO), conforme a regra de avaliação: serve como base conceitual de princípios e fases de licitação, mas exige desenvolvimento de conteúdo específico sobre a Lei 13.303/2016.

## Outros pontos relevantes de aderência

- **Português (PT-01 a PT-08)**: aderência muito alta, quase todos DIRETO. Única exceção parcial é PT-05 (concordância nominal/verbal), que não tem aula dedicada — aparece apenas embutida em exercícios de coesão/reescrita e em um vídeo curado externo (ADAPTAVEL/REFERENCIA_APENAS).
- **Informática (AC-18 a AC-21)**: aderência alta. Windows 11 já é tratado explicitamente (DIRETO). Office é tratado nas versões 2010/2013/365 (não "2024" nomeado no edital) — núcleo funcional é o mesmo, mas marcado ADAPTAVEL pela diferença de nomenclatura/versão. Segurança da informação é forte e atual (DIRETO), mas **LGPD (Lei nº 13.709/2018) não tem nenhuma aula dedicada** — só uma frase solta em um tema de redação (REFERENCIA_APENAS); precisa ser criada do zero.
- **Matemática básica (MAT-01, MAT-02, MAT-05)**: existe conteúdo relevante (conjuntos, aritmética/MMC/MDC, porcentagem, proporcionalidade, regra de três, análise combinatória/contagem), mas está classificado como "Raciocínio Lógico-Numérico", não como matéria de Matemática isolada — por isso ADAPTAVEL (exige reclassificação/reorganização de trilha), nunca DIRETO.
- **AC-06 (matemática financeira: descontos/juros/porcentagem)**: só a parte de porcentagem e descontos sucessivos está coberta; falta juros simples/compostos propriamente ditos — ADAPTAVEL.
- **AC-02 (Sistema de Gestão Integrado)**: só há conceito próximo de auditoria governamental/controle interno municipal (TCU), que é conceitualmente distinto de sistema de gestão da qualidade corporativo (ISO) — REFERENCIA_APENAS.

## Observação metodológica

O mapeamento foi feito por leitura direta de conteúdo (não só nomes de arquivo): abertura dos `title:` de cada lição, leitura de trechos de texto e, principalmente, das seções `legalReferences` de cada aula para confirmar exatamente qual lei/norma é citada (essencial para os casos de licitações e LRF). Nenhum arquivo foi criado, movido, copiado ou editado dentro de `ENSITEC` — toda a produção ficou restrita a `TRANSPETRO\pesquisa\reaproveitamento_ensitec\`.

import type { LessonContent } from "@/content/lessonTypes";

export const AC_03_ADMINISTRACAO_PATRIMONIAL: LessonContent = {
  slug: "ac-03-administracao-patrimonial",
  topicSlug: "ac-03-administracao-patrimonial",
  subjectSlug: "especificas",
  moduleSlug: "especificas-processos-legislacao",
  title: `Função Administração Patrimonial`,
  learningObjective: `Dominar o controle de bens patrimoniais (tombamento, inventário, depreciação, baixa) e a base de Gestão Documental/Arquivologia (as três idades dos arquivos, arquivos setoriais x centrais, descarte) — o acervo real disponível para este código mistura os dois temas, então a preparação deve cobrir ambos.`,
  syllabusCodes: ["AC-03"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-03 — Administração Patrimonial

## 1. Patrimônio, bem e ativo — distinção de base

- **Bem**: qualquer coisa com valor econômico que pode satisfazer uma necessidade (um móvel, um veículo, um imóvel).
- **Ativo**: um bem ou direito controlado pela entidade, do qual se espera benefício econômico futuro — é o bem visto pela ótica contábil.
- **Patrimônio**: o conjunto de bens, direitos e obrigações de uma entidade em determinado momento.

Na prática de administração patrimonial, o foco é controlar os **bens móveis e imóveis** da instituição ao longo de todo o seu ciclo de vida: aquisição, uso, manutenção e baixa.

## 2. Tombamento e identificação patrimonial

O **tombamento** é o ato de registrar formalmente um bem no patrimônio da instituição, atribuindo-lhe um **número de identificação único** (plaqueta patrimonial) e um responsável. O tombamento **identifica e responsabiliza** o bem, mas **não substitui** o controle contínuo de sua **localização física** e **estado de conservação** — tombar um bem uma vez não dispensa a instituição de continuar sabendo onde ele está e em que condição, ao longo do tempo.

## 3. Inventário físico e conciliação contábil

O **inventário físico** é a contagem/conferência real dos bens existentes no local. Seu valor só é pleno quando **conciliado** com o cadastro patrimonial e com os registros contábeis — divergências entre o que existe fisicamente e o que consta no sistema (bens "fantasmas" no cadastro, ou bens reais sem registro) indicam falhas de controle que precisam ser corrigidas, não apenas relatadas.

## 4. Depreciação, vida útil e valor residual

- **Valor depreciável** = custo de aquisição do bem **menos** o valor residual estimado.
- **Depreciação**: alocação sistemática do valor depreciável **ao longo da vida útil** do bem — reconhece contabilmente o desgaste/consumo do ativo período a período.
- **Vida útil** e **valor residual** são **estimativas revisáveis**, não características fixas e eternas do bem — podem (e devem) ser reavaliadas se as condições de uso mudarem.

## 5. Movimentação, guarda e baixa patrimonial

A **baixa** de um bem (retirada definitiva do patrimônio ativo) exige, formalmente: um **motivo** documentado (obsolescência, dano irreparável, perda, alienação), **autorização** da instância competente, **atualização cadastral** (remover/marcar o bem como baixado no sistema) e o correspondente **tratamento contábil** (baixa do valor residual, registro de perda/ganho). Pular qualquer uma dessas etapas gera inconsistência entre o controle físico e o contábil.

## 6. Gestão do ciclo de vida dos ativos

Uma gestão patrimonial madura olha o **ciclo de vida completo** do ativo — não só a aquisição, mas custo total de propriedade, risco (segurança, obsolescência) e desempenho durante todo o tempo de uso, até a baixa. Essa visão de ciclo de vida é a mesma lógica usada em gestão de manutenção (ver AC-04) e em gestão de estoques (AC-12): decisões de curto prazo (comprar mais barato) podem sair caras no ciclo de vida completo (manutenção cara, baixa produtividade).

## 7. Gestão Documental / Arquivologia — as três idades dos arquivos

O acervo real de questões associadas a este código também cobre conceitos de **Arquivologia**, tratados como próximos ao controle patrimonial/documental institucional. O conceito mais cobrado é o das **três idades dos arquivos**, que classificam os documentos pela frequência de uso:

- **Corrente**: documentos em uso **frequente**, consultados no dia a dia da atividade que os originou.
- **Intermediária**: documentos que já não são de uso corrente, mas ainda podem ser **necessários** por razões legais/administrativas — aguardam prazo de guarda antes da destinação final.
- **Permanente**: documentos que, ao final do prazo de guarda, têm **valor histórico/probatório** e devem ser preservados definitivamente.

## 8. Arquivos setoriais x centrais

Quanto à **abrangência de atuação**, os arquivos podem ser:

- **Setoriais**: ficam junto aos **órgãos operacionais** (descentralizados) — mais próximos de onde o documento é produzido e usado no dia a dia.
- **Centrais/gerais**: concentram a guarda de documentos de toda a instituição, geralmente na fase intermediária/permanente, de forma centralizada.

## 9. Descarte e cópias

- **Descarte**: procedimento arquivístico de **eliminação (destruição)** de documentos sem valor para guarda permanente, realizado **após avaliação** formal — não é uma decisão informal, exige processo de análise documental prévio.
- **Cópias**: reproduções de documentos obtidas a partir de **originais** — na terminologia arquivística, esse é o termo técnico específico para esse tipo de reprodução.

## Síntese

O AC-03 mistura administração patrimonial "clássica" (tombamento, depreciação, baixa) com Gestão Documental/Arquivologia (idades dos arquivos, setoriais x centrais, descarte). A pegadinha mais comum no bloco de arquivologia é confundir os nomes das três idades ou trocar "setorial" por "central".

## Mapa mental

\`\`\`mermaid
mindmap
  root((Administração Patrimonial — AC-03))
    Patrimonio, bem, ativo
      Bem: valor economico
      Ativo: controlado, beneficio futuro
    Tombamento
      Identifica e responsabiliza
      Nao substitui controle de localizacao
    Inventario
      Fisico conciliado com cadastro e contabilidade
    Depreciacao
      Valor depreciavel = custo - valor residual
      Vida util e valor residual sao estimativas revisaveis
    Baixa
      Motivo, autorizacao, cadastro, contabil
    Arquivologia
      Tres idades: corrente, intermediaria, permanente
      Setorial (descentralizado) x Central
      Descarte: eliminacao apos avaliacao
      Copia: reproducao do original
\`\`\``,
  mustMemorize: [
    `Tombamento identifica e responsabiliza o bem, mas NÃO substitui controle de localização e estado de conservação.`,
    `Inventário físico deve ser conciliado com cadastro patrimonial e contabilidade.`,
    `Valor depreciável = custo de aquisição MENOS valor residual. Depreciação aloca esse valor ao longo da vida útil.`,
    `Vida útil e valor residual são ESTIMATIVAS REVISÁVEIS, não características eternas do bem.`,
    `Baixa exige motivo, autorização, atualização cadastral e tratamento contábil — as quatro etapas juntas.`,
    `As três idades dos arquivos são: CORRENTE (uso frequente), INTERMEDIÁRIA (aguarda prazo) e PERMANENTE (valor histórico).`,
    `Arquivos SETORIAIS ficam junto aos órgãos operacionais (descentralizados); arquivos CENTRAIS concentram a guarda institucional.`,
    `Descarte = eliminação de documentos sem valor de guarda permanente, sempre APÓS avaliação formal.`,
  ],
  workedExamples: [
    `As três idades dos arquivos são corrente, intermediária e permanente — não "clássica/antiga/moderna", "funcional/orgânica/histórica" ou "ativa/inativa/morta", que são nomenclaturas incorretas ou de outras classificações.`,
    `Arquivos setoriais são os que funcionam junto aos órgãos operacionais (descentralizados), em oposição aos arquivos centrais/gerais, que concentram a guarda de forma centralizada.`,
    `O "descarte" é o procedimento arquivístico de eliminação (destruição) de documentos sem valor para guarda permanente, sempre realizado após avaliação — nunca uma decisão informal ou automática.`,
    `Reproduções de documentos obtidas a partir de originais são denominadas "cópias" na terminologia arquivística — termo técnico específico, não sinônimo genérico de "duplicata" ou "via".`,
  ],
  commonMistakes: [
    `Achar que tombar um bem "resolve" o controle patrimonial de uma vez por todas — o tombamento identifica e responsabiliza, mas a localização e o estado do bem precisam de controle CONTÍNUO.`,
    `Tratar vida útil e valor residual como valores fixos e definitivos — são estimativas que podem e devem ser revisadas conforme as condições reais de uso do bem mudam.`,
    `Pular alguma das quatro etapas da baixa patrimonial (motivo, autorização, cadastro, contábil) — a ausência de qualquer uma gera inconsistência entre controle físico e contábil.`,
    `Trocar as três idades dos arquivos por nomenclaturas inventadas ou de outras áreas ("ativa/inativa/morta", "funcional/orgânica/histórica") — os termos técnicos corretos são corrente, intermediária e permanente.`,
    `Confundir arquivo setorial (descentralizado, junto ao órgão operacional) com arquivo central (concentra a guarda institucional).`,
    `Padrão observado no acervo real (AC-03-2013-CESGRANRIO-21): identificar corrente/intermediária/permanente como as três idades dos arquivos, descartando nomenclaturas inventadas.`,
    `Padrão observado no acervo real (AC-03-2013-CESGRANRIO-22): reconhecer arquivos setoriais como os que ficam junto aos órgãos operacionais, em oposição a centrais/gerais.`,
    `Padrão observado no acervo real (AC-03-2013-CESGRANRIO-23): identificar descarte como eliminação de documentos sem valor de guarda permanente, sempre após avaliação.`,
    `Padrão observado no acervo real (AC-03-2013-CESGRANRIO-24): reconhecer "cópias" como o termo técnico para reproduções obtidas a partir de originais.`,
  ],
  howBoardMightAsk: [
    `Pede a nomenclatura correta das três idades dos arquivos, com distratores de classificações inventadas ou de outras áreas.`,
    `Pede para diferenciar arquivo setorial de central a partir da descrição de onde o arquivo fica.`,
    `Descreve uma situação de baixa de bem e pede qual etapa (motivo, autorização, cadastro, contábil) está faltando.`,
    `Pergunta o que é depreciação/valor depreciável a partir de valores de custo e valor residual dados no enunciado.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Tombamento identifica/responsabiliza, mas não substitui controle contínuo de localização/estado.`,
    `Inventário físico deve ser conciliado com cadastro e contabilidade.`,
    `Valor depreciável = custo − valor residual. Vida útil e valor residual são estimativas revisáveis.`,
    `Baixa = motivo + autorização + atualização cadastral + tratamento contábil.`,
    `Três idades: corrente, intermediária, permanente.`,
    `Setorial = descentralizado, junto ao órgão operacional. Central = concentra a guarda institucional.`,
  ],
  flashcards: [
    { front: "O tombamento substitui o controle de localização do bem?", back: "Não — o tombamento identifica e responsabiliza o bem, mas a localização e o estado de conservação exigem controle contínuo." },
    { front: "Fórmula do valor depreciável?", back: "Valor depreciável = custo de aquisição − valor residual estimado." },
    { front: "Quais são as três idades dos arquivos?", back: "Corrente (uso frequente), Intermediária (aguarda prazo de guarda) e Permanente (valor histórico/probatório)." },
    { front: "Diferença entre arquivo setorial e central?", back: "Setorial fica junto ao órgão operacional (descentralizado). Central concentra a guarda institucional." },
  ],
  miniQuiz: [
    {
      statement: `Em toda instituição, seja pública ou privada, para que os arquivos possam desempenhar suas funções, é necessário que os documentos estejam organizados e obedecendo às três idades dos arquivos, que são:`,
      options: [
        { key: "A", text: `clássica, antiga e moderna`, isCorrect: false, explanation: `Essa não é a classificação arquivística das idades dos arquivos — é uma nomenclatura inventada que não corresponde à teoria de Gestão Documental.` },
        { key: "B", text: `infantil, juvenil e adulta`, isCorrect: false, explanation: `Termos usados para faixas etárias de pessoas, sem qualquer correspondência com a classificação técnica de arquivos.` },
        { key: "C", text: `funcional, orgânica e histórica`, isCorrect: false, explanation: `Essa não é a nomenclatura padrão das três idades dos arquivos — mistura termos de outras classificações documentais.` },
        { key: "D", text: `corrente, intermediária e permanente`, isCorrect: true, explanation: `Correto: as três idades dos arquivos são corrente (uso frequente), intermediária (aguarda prazo de guarda) e permanente (valor histórico/probatório definitivo).` },
        { key: "E", text: `ativa, inativa e morta`, isCorrect: false, explanation: `"Morta" não é um termo técnico da Arquivologia para classificar a idade de um arquivo — a nomenclatura correta é permanente, não "morta".` },
      ],
    },
    {
      statement: `Para cada fase do arquivo, existem formas de tratamento, organização e conservação específicas. Nesse sentido, conforme a abrangência de atuação, os arquivos que ficam junto aos órgãos operacionais são conhecidos como`,
      options: [
        { key: "A", text: `gerais`, isCorrect: false, explanation: `Arquivos gerais tendem a ser sinônimo de centrais — concentram a guarda institucional, o oposto de ficarem junto aos órgãos operacionais.` },
        { key: "B", text: `setoriais`, isCorrect: true, explanation: `Correto: arquivos setoriais são os que funcionam junto aos órgãos operacionais (descentralizados), em oposição aos arquivos centrais/gerais.` },
        { key: "C", text: `centrais`, isCorrect: false, explanation: `Arquivos centrais concentram a guarda de documentos de forma centralizada — é o oposto do conceito descrito (junto aos órgãos operacionais).` },
        { key: "D", text: `inativos`, isCorrect: false, explanation: `"Inativo" descreve o status de uso do documento, não a abrangência de atuação (centralizado x descentralizado) do arquivo.` },
        { key: "E", text: `processuais`, isCorrect: false, explanation: `"Processuais" não é um termo da classificação por abrangência de atuação dos arquivos — não corresponde à pergunta feita.` },
      ],
    },
  ],
};

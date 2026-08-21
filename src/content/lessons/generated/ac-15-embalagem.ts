import type { LessonContent } from "@/content/lessonTypes";

export const AC_15_EMBALAGEM: LessonContent = {
  slug: "ac-15-embalagem",
  topicSlug: "ac-15-embalagem",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Embalagem`,
  learningObjective: `Dominar os níveis de embalagem (primária/secundária/terciária), os tipos de contêiner marítimo e seu uso conforme a carga, a definição legal de embalagens de produtos perigosos (Resolução ANTT 420/2004) e os critérios técnicos de segurança no transporte — a Cesgranrio gosta de descrever uma carga específica e pedir o contêiner ou tipo de embalagem tecnicamente correto para ela.`,
  syllabusCodes: ["AC-15"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-15 — Embalagem

## 1. Funções da embalagem

Toda embalagem cumpre, em graus variados, quatro funções:

- **Contenção**: manter o produto junto, sem vazar ou se espalhar.
- **Proteção**: resistir a choques, umidade, luz, contaminação — proteger o produto do ambiente e do manuseio.
- **Informação**: comunicar dados obrigatórios (composição, validade, instruções, símbolos de risco) e comerciais (marca).
- **Conveniência**: facilitar o manuseio, abertura, uso e descarte pelo usuário final.

Uma embalagem bem projetada equilibra essas funções com custo, cubagem (volume ocupado) e impacto ambiental — otimizar só uma função (ex.: proteção excessiva) pode piorar as outras (custo, sustentabilidade).

## 2. Os três níveis de embalagem: primária, secundária e terciária

- **Embalagem primária**: está em **contato direto** com o produto (a garrafa, o pote, o saco individual).
- **Embalagem secundária**: **agrupa** embalagens primárias (a caixa que contém 12 garrafas) — facilita o manuseio no varejo e a exposição.
- **Embalagem terciária**: destinada a **transporte e armazenagem** (o palete, a caixa de papelão para distribuição em massa) — não é vista pelo consumidor final, existe para logística.

**Regra prática**: pergunte "quem manuseia essa embalagem?" — se é o consumidor final tocando o produto, é primária; se é o varejo expondo um conjunto, é secundária; se é o centro de distribuição movimentando um lote, é terciária.

## 3. Unitização de cargas: paletização e contêineres

**Unitização** é reunir vários volumes menores em **uma única unidade de carga**, facilitando o manuseio, reduzindo avarias e acelerando operações de carga/descarga. As duas formas mais comuns são o **palete** (base padronizada sobre a qual se empilham caixas, movida por empilhadeira/paleteira) e o **contêiner** (unidade padronizada para transporte, principalmente marítimo).

### Tipos de contêiner marítimo e seu uso

O transporte marítimo responde por mais de 90% do volume das importações/exportações brasileiras, majoritariamente em cargas unitizadas por contêiner. Escolher o contêiner certo depende do tipo de carga:

- **Dry van** (20' ou 40'): contêiner fechado padrão, para carga geral seca, sem necessidade especial de temperatura ou dimensões diferenciadas.
- **Reefer**: contêiner refrigerado, para cargas perecíveis que exigem controle de temperatura.
- **Isotank**: tanque isolado térmico, para transporte de líquidos a granel (químicos, alimentícios líquidos).
- **Flatrack**: plataforma **sem laterais nem teto**, indicada para cargas de **grandes dimensões e peso elevado** que não cabem nos contêineres fechados padrão (Dry van) ou refrigerados (Reefer) — como máquinas e equipamentos fora de gabarito.

**Pegadinha clássica**: descrever uma carga grande e pesada e oferecer Dry van/Reefer/Isotank como distratores — a resposta técnica correta para esse perfil de carga é o Flatrack, justamente por não ter as restrições estruturais de um contêiner fechado.

## 4. Embalagens de produtos perigosos (Resolução ANTT 420/2004)

O **Regulamento do Transporte Terrestre de Produtos Perigosos** (Resolução ANTT 420/2004) define nomenclaturas técnicas específicas para embalagens de produtos perigosos — a banca gosta de cobrar essas definições literalmente:

- **Bombonas**: embalagens de **plástico ou metal**, de **seção retangular ou poligonal** — usadas para líquidos e sólidos perigosos em volumes intermediários.
- **Embalagem composta**: formada por uma **embalagem externa** e um **recipiente interno** que, montados, formam uma **unidade integrada** de enchimento, armazenagem, transporte e esvaziamento — os dois componentes só funcionam corretamente como conjunto.

Essas definições são específicas e literais da norma — não são sinônimos entre si nem com termos genéricos como "caixa" ou "tanque".

## 5. Segurança no transporte de cargas perigosas

Cargas perigosas exigem:

- **Classificação** correta (conforme a natureza do risco: inflamável, corrosivo, tóxico etc.).
- **Compatibilidade** entre produtos transportados juntos (evitar reações entre substâncias incompatíveis).
- **Rotulagem** com símbolos de risco padronizados, visíveis e conforme a classe do produto.
- **Procedimentos próprios** de manuseio, carregamento e emergência.

Um critério técnico recorrente é a classificação de **líquidos inflamáveis por ponto de fulgor** (a menor temperatura em que o líquido libera vapor suficiente para formar mistura inflamável com o ar) — esse ponto define as exigências específicas de embalagem e segurança no transporte daquele produto.

## 6. Estabilidade da carga: centro de gravidade, amarração e distribuição de peso

Para cargas unitizadas ou paletizadas, a estabilidade durante o transporte depende de:

- **Centro de gravidade**: quanto mais baixo e centralizado, mais estável a carga durante movimentos do veículo/navio.
- **Amarração**: fixação física da carga para impedir deslocamento.
- **Distribuição de peso**: peso mal distribuído desestabiliza o veículo/contêiner mesmo com boa amarração pontual.

## 7. Sustentabilidade e ciclo de vida da embalagem

Avaliar uma embalagem sob a ótica de sustentabilidade exige olhar o **ciclo de vida completo**: matéria-prima, produção, uso, e descarte/reciclagem — não apenas se o material é "reciclável" isoladamente. Critérios relevantes: **reutilização** (a embalagem pode ser usada de novo?), **reciclabilidade** (o material pode virar matéria-prima nova?) e **proteção efetiva** (uma embalagem "verde" que não protege o produto gera mais desperdício por avaria, anulando o ganho ambiental).

## Síntese

O AC-15 mistura conceitos gerais (primária/secundária/terciária, unitização) com nomenclatura técnica e legal específica (Resolução ANTT 420/2004, tipos de contêiner). A pegadinha mais comum é a banca descrever uma carga concreta (grande/pesada, perigosa, líquida) e pedir o tipo de embalagem ou contêiner tecnicamente adequado.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Embalagem — AC-15))
    Funcoes
      Contencao, protecao, informacao, conveniencia
    Niveis
      Primaria: toca o produto
      Secundaria: agrupa primarias
      Terciaria: transporte/armazenagem
    Unitizacao
      Palete
      Conteineres
        Dry van: carga geral seca
        Reefer: refrigerado
        Isotank: liquido a granel
        Flatrack: grande/pesado, sem laterais
    Produtos perigosos ANTT 420/2004
      Bombonas: plastico/metal, secao retangular/poligonal
      Composta: embalagem externa + recipiente interno
      Ponto de fulgor: classifica liquidos inflamaveis
    Estabilidade
      Centro de gravidade, amarracao, distribuicao de peso
    Sustentabilidade
      Ciclo de vida, reutilizacao, reciclabilidade, protecao efetiva
\`\`\``,
  mustMemorize: [
    `Embalagem primária toca o produto; secundária agrupa primárias; terciária serve ao transporte e armazenagem.`,
    `Unitização reúne volumes numa unidade de carga (palete ou contêiner).`,
    `Flatrack (sem laterais/teto) é o contêiner indicado para cargas de grandes dimensões e peso elevado — não Dry van, Reefer ou Isotank.`,
    `Dry van = carga geral seca; Reefer = refrigerado; Isotank = líquido a granel; Flatrack = fora de gabarito/pesado.`,
    `Resolução ANTT 420/2004: "bombonas" = embalagens de plástico ou metal, seção retangular ou poligonal.`,
    `Embalagem "composta" = embalagem externa + recipiente interno, formando unidade integrada de enchimento/transporte/esvaziamento.`,
    `Ponto de fulgor classifica líquidos inflamáveis e define exigências de embalagem/segurança no transporte.`,
  ],
  workedExamples: [
    `O contêiner Flatrack (plataforma sem laterais nem teto) é o mais indicado para cargas de grandes dimensões e peso elevado, que não cabem nos contêineres fechados padrão (Dry van) ou refrigerados (Reefer).`,
    `A Resolução ANTT 420/2004 (Regulamento do Transporte Terrestre de Produtos Perigosos) define "bombonas" como embalagens de plástico ou metal, de seção retangular ou poligonal.`,
    `A embalagem "composta" é formada por uma embalagem externa e um recipiente interno que, montados, formam uma unidade integrada de enchimento/armazenagem/transporte/esvaziamento, conforme a Resolução ANTT 420/2004.`,
    `A classificação de líquidos inflamáveis por ponto de fulgor é um critério técnico usado na definição das exigências de embalagem e segurança no transporte de produtos perigosos.`,
  ],
  commonMistakes: [
    `Confundir embalagem secundária (agrupa primárias, ainda ligada ao varejo) com terciária (voltada só a transporte/armazenagem, não vista pelo consumidor).`,
    `Escolher Dry van ou Reefer para carga de grandes dimensões/peso elevado — o contêiner tecnicamente adequado é o Flatrack, sem restrições estruturais de laterais/teto.`,
    `Confundir "bombonas" (plástico/metal, seção retangular ou poligonal) com outros termos genéricos como "caixas" ou "tanque" — a Resolução ANTT 420/2004 usa nomenclatura técnica específica.`,
    `Achar que embalagem composta é só uma embalagem "reforçada" — na verdade é definida pela combinação específica de embalagem externa + recipiente interno como unidade integrada.`,
    `Padrão observado no acervo real (AC-15-2018-CESGRANRIO-46): identificar Flatrack como o contêiner correto para cargas de grandes dimensões e peso elevado, descartando Dry van/Reefer/Isotank.`,
    `Padrão observado no acervo real (AC-15-2018-CESGRANRIO-51): reconhecer "bombonas" como a nomenclatura da Resolução ANTT 420/2004 para embalagens de plástico/metal de seção retangular/poligonal.`,
    `Padrão observado no acervo real (AC-15-2018-CESGRANRIO-52): identificar a embalagem composta pela combinação embalagem externa + recipiente interno como unidade integrada.`,
    `Padrão observado no acervo real (AC-15-2018-CESGRANRIO-54): reconhecer o ponto de fulgor como o critério técnico de classificação de líquidos inflamáveis para fins de segurança no transporte.`,
  ],
  howBoardMightAsk: [
    `Descreve uma carga específica (dimensão, peso, temperatura, estado físico) e pede o tipo de contêiner tecnicamente adequado.`,
    `Cobra a definição literal de um termo da Resolução ANTT 420/2004 (bombonas, embalagem composta) com distratores de termos genéricos parecidos.`,
    `Pede para diferenciar embalagem primária/secundária/terciária a partir de uma descrição de manuseio.`,
    `Pede o critério técnico usado para classificar produtos perigosos (ponto de fulgor) para fins de embalagem e transporte.`,
  ],
  legalReferences: [
    { title: "Resolução ANTT 420/2004", note: "Regulamento do Transporte Terrestre de Produtos Perigosos — define bombonas, embalagem composta e demais nomenclaturas técnicas." },
  ],
  reviewSummaryPoints: [
    `Primária toca o produto; secundária agrupa; terciária serve ao transporte/armazenagem.`,
    `Flatrack = carga grande/pesada sem restrição de laterais/teto.`,
    `Dry van = geral seca; Reefer = refrigerado; Isotank = líquido a granel.`,
    `Bombonas = plástico/metal, seção retangular/poligonal (ANTT 420/2004).`,
    `Embalagem composta = externa + recipiente interno, unidade integrada.`,
    `Ponto de fulgor classifica líquidos inflamáveis.`,
  ],
  flashcards: [
    { front: "Diferença entre embalagem secundária e terciária?", back: "Secundária agrupa embalagens primárias (visível no varejo). Terciária serve só ao transporte/armazenagem (não vista pelo consumidor)." },
    { front: "Qual contêiner é indicado para carga de grandes dimensões e peso elevado?", back: "Flatrack — plataforma sem laterais nem teto, sem as restrições estruturais de Dry van/Reefer/Isotank." },
    { front: "O que são 'bombonas' pela Resolução ANTT 420/2004?", back: "Embalagens de plástico ou metal, de seção retangular ou poligonal." },
    { front: "O que define a embalagem 'composta'?", back: "Uma embalagem externa + um recipiente interno, que juntos formam uma unidade integrada de enchimento/transporte/esvaziamento." },
  ],
  miniQuiz: [
    {
      statement: `O transporte marítimo de mercadorias corresponde no Brasil, a mais de 90% em volume, e de 83%, em valor monetário das importações e exportações. A maior parte desse transporte é assegurado por cargas unitizadas em contêineres, que podem ser de diferentes tipos.

O contêiner mais indicado para o transporte de cargas de grandes dimensões e de peso elevado é o`,
      options: [
        { key: "A", text: `Dry van 20'`, isCorrect: false, explanation: `Dry van é o contêiner fechado padrão para carga geral seca — suas dimensões e estrutura fixas não comportam cargas fora de gabarito ou de peso elevado.` },
        { key: "B", text: `Dry van 40'`, isCorrect: false, explanation: `Mesmo com maior comprimento que o de 20', o Dry van continua sendo um contêiner fechado padrão, sem a abertura estrutural necessária para cargas grandes/pesadas fora de gabarito.` },
        { key: "C", text: `Reefer`, isCorrect: false, explanation: `Reefer é o contêiner refrigerado, destinado a cargas perecíveis que exigem controle de temperatura — não é a característica relevante para carga de grandes dimensões/peso.` },
        { key: "D", text: `Isotank`, isCorrect: false, explanation: `Isotank é um tanque isolado para transporte de líquidos a granel — não se aplica a cargas sólidas de grandes dimensões e peso elevado.` },
        { key: "E", text: `Flatrack`, isCorrect: true, explanation: `Correto: o Flatrack (plataforma sem laterais nem teto) é o mais indicado para cargas de grandes dimensões e peso elevado, que não cabem nos contêineres fechados padrão (Dry van) ou refrigerados (Reefer).` },
      ],
    },
    {
      statement: `Nos termos da Resolução ANTT 420/2004, embalagens de plástico ou metal, com seção retangular ou poligonal, são denominadas`,
      options: [
        { key: "A", text: `caixas`, isCorrect: false, explanation: `"Caixas" é um termo genérico — a norma usa nomenclatura técnica específica ("bombonas") para essa combinação de material e formato.` },
        { key: "B", text: `carcaça`, isCorrect: false, explanation: `"Carcaça" não é a nomenclatura usada pela Resolução ANTT 420/2004 para essa combinação de material e seção.` },
        { key: "C", text: `bombonas`, isCorrect: true, explanation: `Correto: a Resolução ANTT 420/2004 define "bombonas" como embalagens de plástico ou metal, de seção retangular ou poligonal.` },
        { key: "D", text: `cofre`, isCorrect: false, explanation: `"Cofre" não corresponde à definição técnica de embalagem de plástico/metal com seção retangular/poligonal da norma.` },
        { key: "E", text: `tanque`, isCorrect: false, explanation: `Tanque é usado para líquidos a granel em grande volume — não é o termo da norma para embalagens de plástico/metal de seção retangular/poligonal.` },
      ],
    },
  ],
};

import type { LessonContent } from "@/content/lessonTypes";

export const AC_05_GESTAO_INDICADORES: LessonContent = {
  slug: "ac-05-gestao-indicadores",
  topicSlug: "ac-05-gestao-indicadores",
  subjectSlug: "especificas",
  moduleSlug: "especificas-processos-legislacao",
  title: `Gestão de Indicadores`,
  learningObjective: `Diferenciar eficiência, eficácia e efetividade, entender a estrutura completa de um KPI, distinguir ambiente externo (fora do controle da empresa) de decisões internas, aplicar a matriz importância x urgência (Eisenhower) para priorização, e reconhecer os limites de metas mal desenhadas — a Cesgranrio gosta de dar um cenário de priorização ou classificação de variáveis (interna x externa) e pedir a decisão tecnicamente correta.`,
  syllabusCodes: ["AC-05"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-05 — Gestão de Indicadores

## 1. Dado, métrica, indicador e meta — a cadeia de valor da informação

- **Dado**: registro bruto, sem interpretação (ex.: "150 atendimentos hoje").
- **Métrica**: dado organizado de forma quantificável (ex.: "número de atendimentos por dia").
- **Indicador**: métrica associada a um **significado gerencial**, usada para acompanhar desempenho em relação a um objetivo (ex.: "tempo médio de atendimento").
- **Meta**: o **valor-alvo** que o indicador deve atingir num prazo definido (ex.: "reduzir o tempo médio de atendimento para 5 minutos até dezembro").

## 2. Eficiência, eficácia e efetividade — a distinção mais cobrada

- **Eficiência**: relação entre **recursos usados e produtos gerados** — fazer mais com menos, ou o mesmo com menos recursos ("fazer certo as coisas").
- **Eficácia**: compara o **resultado obtido com a meta estabelecida** — atingir o objetivo, independente do quanto se gastou para chegar lá ("fazer as coisas certas").
- **Efetividade**: observa o **impacto real** gerado na sociedade/no público-alvo, além do simples cumprimento da meta — é possível ser eficaz (bater a meta) sem ser efetivo (gerar o impacto desejado de fato).

**Regra de decoreba**: eficiência = recursos x produto; eficácia = resultado x meta; efetividade = impacto real na ponta.

## 3. Estrutura completa de um KPI

Um **KPI** (Key Performance Indicator) bem construído precisa ter, no mínimo: **definição** clara do que mede, **fórmula** de cálculo, **unidade** de medida, **fonte** dos dados, **responsável** pela apuração, **frequência** de medição e **meta** associada. Um número sem essa estrutura completa não é um KPI confiável — é só um dado solto, sujeito a interpretação ambígua.

## 4. Indicadores atrasados x antecedentes (lagging x leading)

- **Indicador atrasado (lagging)**: mostra o **resultado** já ocorrido (ex.: faturamento do mês passado) — útil para avaliar o que já aconteceu, mas tarde para agir sobre ele.
- **Indicador antecedente (leading)**: sinaliza **condições que conduzem** ao resultado futuro (ex.: número de propostas em andamento) — permite agir **antes** que o resultado final se concretize.

Um bom painel de gestão combina os dois tipos: atrasados para confirmar desempenho, antecedentes para antecipar tendências.

## 5. Metas mal desenhadas: risco de comportamento disfuncional

Uma **meta sem contexto** (isolada, sem olhar o sistema completo) pode induzir **comportamento disfuncional** e **otimização local** — as pessoas otimizam exatamente o que é medido, mesmo que isso prejudique o resultado global (ex.: meta de "reduzir custo de manutenção" pode levar a adiar manutenções necessárias, aumentando falhas depois). Por isso, metas devem ser acompanhadas de indicadores complementares que evitem esse efeito colateral.

## 6. ESG e indicadores de sustentabilidade

**ESG** (Environmental, Social, Governance) reúne três dimensões — **ambiental**, **social** e de **governança** — e nenhuma métrica isolada representa todo o desempenho ESG de uma organização; é preciso olhar as três dimensões em conjunto. O **alinhamento estratégico** a estruturas ESG/ODS (Objetivos de Desenvolvimento Sustentável) implica **incorporar riscos socioambientais na gestão estratégica** dos negócios, não tratá-los como um item isolado de relações públicas.

## 7. Análise do ambiente: externo x interno

Ao analisar o ambiente para decisões estratégicas, é essencial diferenciar:

- **Ambiente externo**: variáveis **fora do controle** da empresa — por exemplo, **alterações na taxa de juros e inflação** (variáveis macroeconômicas). A empresa não controla a taxa Selic, mas precisa se adaptar a ela.
- **Ambiente interno**: decisões e controles que a empresa **de fato controla** — contratação de pesquisa de mercado, desenvolvimento de sistema ERP, dimensionamento de equipe, monitoramento de fornecedores.

**Pegadinha clássica**: listar itens de controle interno (pesquisa de mercado, ERP, equipe de vendas) como distratores de uma pergunta sobre ambiente externo — a resposta correta é sempre a variável macroeconômica que a empresa não controla.

## 8. Matriz importância x urgência (matriz de Eisenhower)

Ferramenta de priorização de ações que classifica cada item em dois eixos: **importância** (impacto estratégico) e **urgência** (prazo apertado). A prioridade número um é sempre a ação com **maior importância E maior urgência simultaneamente** — não basta ser só importante (pode esperar) nem só urgente (pode ser trivial); a combinação dos dois é que define o topo da fila.

## 9. Boas práticas de análise de dados para decisão

Decisões bem fundamentadas exigem olhar **tendência** (não um número isolado), **comparação** (contra meta, período anterior ou benchmark), **causa** (por que o número está assim) e **qualidade do dado** (fonte confiável, sem viés). O uso de **gráficos de dispersão** para explorar a relação entre variáveis quantitativas é um exemplo de boa prática analítica — permite visualizar correlações antes de tirar conclusões precipitadas de um único indicador.

## Síntese

O AC-05 combina a estrutura técnica de indicadores (dado/métrica/indicador/meta, KPI completo, atrasado x antecedente) com ferramentas de priorização e decisão (matriz de Eisenhower, ambiente externo x interno, ESG). A pegadinha mais recorrente é confundir controle interno com variável de ambiente externo, ou tratar um número isolado como suficiente para decisão.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Gestão de Indicadores — AC-05))
    Cadeia de valor
      Dado -> Metrica -> Indicador -> Meta
    Eficiencia x Eficacia x Efetividade
      Eficiencia: recursos x produto
      Eficacia: resultado x meta
      Efetividade: impacto real
    KPI completo
      Definicao, formula, unidade, fonte, responsavel, frequencia, meta
    Atrasado x Antecedente
      Lagging: mostra resultado
      Leading: sinaliza tendencia
    Metas mal desenhadas
      Risco de otimizacao local
    ESG
      Ambiental, Social, Governanca
    Ambiente
      Externo: fora do controle (juros, inflacao)
      Interno: controle da empresa (ERP, equipe)
    Priorizacao
      Matriz Eisenhower: importancia x urgencia
\`\`\``,
  mustMemorize: [
    `Eficiência = recursos x produtos. Eficácia = resultado x meta. Efetividade = impacto real gerado.`,
    `KPI completo precisa de: definição, fórmula, unidade, fonte, responsável, frequência e meta.`,
    `Indicador atrasado (lagging) mostra resultado já ocorrido; antecedente (leading) sinaliza tendência futura.`,
    `Meta sem contexto pode induzir comportamento disfuncional (otimização local que prejudica o todo).`,
    `ESG = Ambiental + Social + Governança. Nenhuma métrica isolada representa o desempenho ESG completo.`,
    `Ambiente EXTERNO = variáveis fora do controle da empresa (juros, inflação). Ambiente INTERNO = controles próprios (ERP, equipe, fornecedores).`,
    `Matriz de Eisenhower: prioridade nº1 = maior importância E maior urgência simultaneamente.`,
  ],
  workedExamples: [
    `Na matriz importância x urgência (matriz de Eisenhower), a ação de maior importância E maior urgência ("cumprir o prazo de um contrato grande") deve ser a prioridade número um — não basta ser só importante ou só urgente isoladamente.`,
    `Alterações na taxa de juros e inflação são variáveis macroeconômicas do ambiente EXTERNO (fora do controle da empresa) — diferente de contratação de pesquisa de mercado, ERP, dimensionamento de equipe ou monitoramento de fornecedores, que são controles internos.`,
    `O alinhamento estratégico a estruturas ESG/ODS implica incorporar riscos socioambientais na gestão estratégica dos negócios, não tratá-los isoladamente.`,
    `O uso de gráficos de dispersão para explorar a relação entre variáveis quantitativas é uma boa prática de análise de dados para decisão estratégica.`,
  ],
  commonMistakes: [
    `Confundir eficiência (recursos x produto) com eficácia (resultado x meta) — são medidas de coisas diferentes; uma empresa pode ser eficaz (bateu a meta) sem ser eficiente (gastou recursos demais para isso).`,
    `Tratar um número isolado como KPI completo — sem fórmula, fonte, responsável e frequência definidos, não há como confiar ou auditar o indicador.`,
    `Confundir indicador antecedente (sinaliza tendência futura) com atrasado (mostra resultado já ocorrido) — são complementares, não substitutos um do outro.`,
    `Achar que uma meta isolada, sem indicadores complementares, é sempre segura — metas mal desenhadas induzem otimização local que prejudica o resultado global.`,
    `Classificar variáveis de controle interno (ERP, equipe, pesquisa de mercado) como ambiente externo — o ambiente externo é especificamente o que a empresa NÃO controla (juros, inflação, câmbio).`,
    `Na matriz de Eisenhower, escolher uma ação só importante ou só urgente como prioridade máxima — a prioridade nº1 exige as duas dimensões simultaneamente altas.`,
    `Padrão observado no acervo real (AC-05-2013-CESGRANRIO-49): identificar a ação de maior importância E urgência simultânea como prioridade número um na matriz de Eisenhower.`,
    `Padrão observado no acervo real (AC-05-2013-CESGRANRIO-50): reconhecer taxa de juros/inflação como variáveis de ambiente externo, descartando itens de controle interno como distratores.`,
    `Padrão observado no acervo real (AC-05-2025-CESGRANRIO-75): identificar o alinhamento ESG/ODS como incorporação de riscos socioambientais à gestão estratégica.`,
    `Padrão observado no acervo real (AC-05-2025-CESGRANRIO-26): reconhecer gráficos de dispersão como boa prática de análise de dados para decisão.`,
  ],
  howBoardMightAsk: [
    `Dá uma lista de ações com importância/urgência classificadas e pede a prioridade número um pela matriz de Eisenhower.`,
    `Dá uma lista de itens e pede para identificar qual pertence ao ambiente externo (fora de controle) versus interno.`,
    `Pede para diferenciar eficiência, eficácia e efetividade a partir de uma situação concreta.`,
    `Descreve os componentes de um KPI e pede o que está faltando para torná-lo completo/confiável.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Eficiência = recursos/produto. Eficácia = resultado/meta. Efetividade = impacto real.`,
    `KPI completo: definição, fórmula, unidade, fonte, responsável, frequência, meta.`,
    `Lagging = resultado passado. Leading = sinaliza tendência futura.`,
    `Meta isolada pode gerar otimização local disfuncional.`,
    `Ambiente externo = fora de controle (juros, inflação). Interno = controle da empresa.`,
    `Eisenhower: prioridade nº1 = importância E urgência altas juntas.`,
  ],
  flashcards: [
    { front: "Diferença entre eficiência, eficácia e efetividade?", back: "Eficiência: recursos x produto. Eficácia: resultado x meta. Efetividade: impacto real gerado." },
    { front: "O que um KPI precisa ter para ser confiável?", back: "Definição, fórmula, unidade, fonte, responsável, frequência e meta — não só um número isolado." },
    { front: "Diferença entre indicador atrasado e antecedente?", back: "Atrasado (lagging) mostra resultado já ocorrido. Antecedente (leading) sinaliza condições que levam a um resultado futuro." },
    { front: "Na matriz de Eisenhower, qual ação é prioridade número um?", back: "A que tem maior importância E maior urgência simultaneamente — não basta ter só uma das duas." },
  ],
  miniQuiz: [
    {
      statement: `A direção de uma empresa de serviços de vigilância, considerando uma série de ações a serem executadas no próximo mês, preparou uma matriz que distribui as ações por importância e urgência de forma a identificar prioridades: "Renovar o seguro da frota de automóveis" (importância grande, urgência pouca), "Cumprir o prazo de um contrato grande" (importância grande, urgência muita), "Reformar a recepção do escritório" (importância pequena, urgência pouca), "Trocar a cor dos uniformes" (importância pequena, urgência pouca), "Aprimorar o treinamento dos supervisores" (importância pequena, urgência muita).

A partir da matriz apresentada, qual ação deve ser a prioridade número um?`,
      options: [
        { key: "A", text: `Aprimorar o treinamento dos supervisores.`, isCorrect: false, explanation: `Tem urgência muita, mas importância PEQUENA — a matriz de Eisenhower exige as duas dimensões altas para ser a prioridade máxima.` },
        { key: "B", text: `Cumprir o prazo de um contrato grande.`, isCorrect: true, explanation: `Correto: é a única ação com importância GRANDE e urgência MUITA simultaneamente — combinação que define a prioridade número um na matriz de Eisenhower.` },
        { key: "C", text: `Reformar a recepção do escritório.`, isCorrect: false, explanation: `Importância pequena e urgência pouca — a ação de menor prioridade entre as listadas, não a de maior.` },
        { key: "D", text: `Renovar o seguro da frota de automóveis.`, isCorrect: false, explanation: `Tem importância grande, mas urgência POUCA — pode ser planejada com antecedência, não é a prioridade imediata.` },
        { key: "E", text: `Trocar a cor dos uniformes.`, isCorrect: false, explanation: `Importância pequena e urgência pouca — não há justificativa para tratá-la como prioridade máxima.` },
      ],
    },
    {
      statement: `Uma empresa de serviços de limpeza está realizando um planejamento estratégico e encontra-se na fase de análise do ambiente externo.

Qual dimensão deve ser considerada na análise do ambiente externo?`,
      options: [
        { key: "A", text: `Alteração na taxa de juros e inflação`, isCorrect: true, explanation: `Correto: taxa de juros e inflação são variáveis macroeconômicas do ambiente EXTERNO — a empresa não as controla, mas precisa se adaptar a elas no planejamento estratégico.` },
        { key: "B", text: `Contratação de pesquisa de mercado`, isCorrect: false, explanation: `É uma decisão que a própria empresa toma e controla — pertence ao ambiente INTERNO, não externo.` },
        { key: "C", text: `Desenvolvimento de sistema ERP`, isCorrect: false, explanation: `É um investimento/decisão interna da empresa — não é uma variável do ambiente externo.` },
        { key: "D", text: `Dimensionamento da equipe de vendas`, isCorrect: false, explanation: `É uma decisão de gestão interna de recursos humanos — controlada pela própria empresa, não pelo ambiente externo.` },
        { key: "E", text: `Monitoramento do desempenho de fornecedores`, isCorrect: false, explanation: `Embora envolva terceiros, o monitoramento em si é uma atividade de controle INTERNO da empresa — não uma variável macroeconômica do ambiente externo.` },
      ],
    },
  ],
};

import type { LessonContent } from "@/content/lessonTypes";

export const AC_16_GESTAO_COMPRAS: LessonContent = {
  slug: "ac-16-gestao-compras",
  topicSlug: "ac-16-gestao-compras",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Gestão de Compras (Lei 13.303/2016 e Lei 14.133/2021)`,
  learningObjective: `Dominar o ciclo de compras (planejamento → especificação → seleção de fornecedor → negociação) e o arcabouço legal que rege as compras da Transpetro como estatal: a Lei 13.303/2016 (Lei das Estatais, regime específico de licitações e contratos de empresas públicas e sociedades de economia mista) combinada com a Lei 14.133/2021 (Nova Lei de Licitações, aplicável subsidiariamente).`,
  syllabusCodes: ["AC-16"],
  estimatedMinutes: 45,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-16 — Gestão de Compras

Este código é um dos mais cobrados do edital e combina duas coisas que a Cesgranrio adora testar juntas: **classificação de compras** (o que se compra, e por quê) e **legislação de licitações de estatal** (como se compra, formalmente). Domine as duas camadas separadamente antes de tentar misturá-las.

## 1. Classificação da função compras: consumo, produção e investimento

A área de compras não trata todo material do mesmo jeito. Existem três categorias, e a banca gosta de trocar uma pela outra:

- **Compras para consumo**: materiais que são gastos no dia a dia da operação, sem integrar o produto final e sem virar ativo permanente (material de escritório, combustível, materiais de limpeza). É "custeio".
- **Compras para produção**: materiais que **integram** o produto ou serviço final — matéria-prima, insumos que fazem parte do que a empresa entrega.
- **Compras para investimento**: aquisição de **bens de capital / ativo permanente** — máquinas, equipamentos, veículos, imóveis. Não são consumidos no processo; viram patrimônio da empresa (ligação direta com AC-03, Administração Patrimonial).

**Armadilha clássica**: a banca descreve a compra de uma máquina ou equipamento e oferece uma alternativa dizendo que isso é "material que integra o produto final" (definição de compra para produção) — errado, porque a máquina não vira parte do produto, ela produz o produto. A pergunta certa para diferenciar: "esse item vira parte do que a empresa vende/entrega, é consumido na operação, ou vira patrimônio duradouro da empresa?"

## 2. Documentos do ciclo de compras: Ordem de Compra x Ordem de Serviço

Dois documentos formalizam pedidos diferentes, e a banca testa a troca entre eles:

- **Ordem de Compra (OC)**: formaliza a aquisição de um **bem** (produto físico) de um fornecedor.
- **Ordem de Serviço (OS)**: formaliza a contratação de um **serviço** prestado por terceiro (manutenção, consultoria, mão de obra).

Regra rápida: se o que está sendo contratado é uma **atividade** realizada por alguém (mesmo que envolva peças), é OS. Se é a **aquisição de um item** pronto, é OC.

## 3. Planejamento de compras e negociação com fornecedores

Planejar compras não é só "pedir quando falta". Envolve: identificar a necessidade real, especificar corretamente o item (evitando especificação genérica demais, que atrai propostas ruins, ou específica demais, que restringe competição sem justificativa), definir quantidade e prazo, e orçar.

Na **negociação com fornecedores**, o erro mais comum de quem só pensa em "preço mais baixo" é ignorar o **custo total de aquisição** — que inclui prazo de entrega, qualidade, custo de manutenção pós-compra e confiabilidade logística. Uma compra mais cara, mas de um fornecedor confiável com entrega no prazo, pode custar menos no total do que a mais barata com atraso recorrente.

**Sistema Just-in-Time (JIT)**: ao contrário da compra tradicional (foco no menor preço, muitos fornecedores concorrendo), o JIT prioriza **parcerias de longo prazo com poucos fornecedores confiáveis**, avaliando prazo de entrega e qualidade em pé de igualdade com o preço — o objetivo é reduzir estoque e ter entregas just-in-time (na hora certa), o que só funciona com fornecedores parceiros, não com concorrência pontual a cada compra.

## 4. Lei 13.303/2016 — Lei das Estatais (arts. 28 a 91)

É a lei que rege licitações e contratos de **empresas públicas e sociedades de economia mista** (a Transpetro se enquadra aqui, como subsidiária da Petrobras). Pontos centrais para a prova:
- Estabelece um regime **próprio** de licitação para estatais — não é simplesmente a lei geral (14.133/2021) aplicada sem adaptação.
- Prevê modalidades e procedimentos específicos, buscando equilibrar **eficiência empresarial** (a estatal compete no mercado) com os **princípios da Administração Pública** (impessoalidade, moralidade, publicidade).
- Cobre o regime de contratação de obras, serviços, compras, alienações e locações da estatal.

## 5. Lei 14.133/2021 — Nova Lei de Licitações: modalidades e fases

Aplica-se subsidiariamente e traz as modalidades: **pregão, concorrência, concurso, leilão e diálogo competitivo**.

O processo licitatório segue, em regra, esta sequência: **fase preparatória → divulgação do edital → apresentação de propostas/lances → julgamento → habilitação → fase recursal → homologação**. Atenção: a lei admite a **inversão de fases** (julgamento antes da habilitação) como regra geral no pregão — não decore a ordem acima como absoluta e imutável; leia sempre se a questão está descrevendo a sequência padrão ou uma inversão admitida.

## 6. Contratação direta: dispensa x inexigibilidade

Duas exceções à obrigatoriedade de licitar, frequentemente confundidas:

- **Inexigibilidade**: a licitação é **inviável** porque não existe competição possível (ex.: fornecedor exclusivo de um produto/serviço específico). Não é uma escolha da Administração — é uma impossibilidade fática.
- **Dispensa**: a competição **seria possível**, mas a lei autoriza dispensar a licitação em hipóteses específicas previstas em lei (valor baixo, situação emergencial, etc.). Aqui a Administração tem uma permissão legal para não licitar, mesmo podendo.

**Armadilha**: tratar as duas como sinônimos de "não precisou licitar". A diferença crucial é *por quê* não se licitou — inviabilidade real (inexigibilidade) ou permissão legal específica apesar de ser viável (dispensa).

## 7. Governança e gestão de riscos no ciclo de contratação

Boas práticas de compras em estatais exigem **segregação de funções** (quem especifica não deve ser o mesmo que aprova ou paga), rastreabilidade de decisões e gestão de riscos ao longo de todo o ciclo — do planejamento até a fiscalização do contrato (ligação direta com AC-17, Gestão de Contratos).

## Síntese

AC-16 combina classificação de compras (consumo/produção/investimento), documentos (OC x OS), boas práticas de negociação (custo total, JIT) e o arcabouço legal duplo da Transpetro (Lei 13.303/2016 para o regime próprio de estatal + Lei 14.133/2021 para modalidades e fases do processo licitatório, aplicada subsidiariamente). Dispensa e inexigibilidade são a dupla mais cobrada dentro da parte legal — nunca as trate como sinônimos.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Gestão de Compras — AC-16))
    Classificação
      Consumo
      Produção
      Investimento
    Documentos
      Ordem de Compra
      Ordem de Serviço
    Negociação
      Custo total de aquisição
      Just-in-Time
    Lei 13.303/2016
      Regime próprio de estatal
      Arts. 28 a 91
    Lei 14.133/2021
      Pregão, concorrência, concurso, leilão, diálogo competitivo
      Fases do processo
    Contratação direta
      Dispensa
      Inexigibilidade
    Governança
      Segregação de funções
      Gestão de riscos
\`\`\``,
  mustMemorize: [
    `Compra para consumo: gasta na operação, não integra o produto. Compra para produção: integra o produto final. Compra para investimento: vira ativo permanente (bem de capital).`,
    `Ordem de Compra (OC) = aquisição de um bem. Ordem de Serviço (OS) = contratação de um serviço/atividade.`,
    `Menor preço não é sempre menor custo total: qualidade, prazo, manutenção e logística também entram na conta.`,
    `JIT prioriza poucos fornecedores parceiros de longo prazo, avaliando prazo e qualidade junto com o preço — não é sobre concorrência pontual pelo menor preço.`,
    `Lei 13.303/2016 (arts. 28-91) = regime próprio de licitação das estatais (Transpetro incluída).`,
    `Lei 14.133/2021 = modalidades (pregão, concorrência, concurso, leilão, diálogo competitivo) e fases do processo licitatório, aplicada subsidiariamente.`,
    `Fases do processo: preparatória → divulgação → propostas/lances → julgamento → habilitação → recurso → homologação (inversão julgamento/habilitação é admitida, ex.: pregão).`,
    `Inexigibilidade: licitação é INVIÁVEL (sem competição possível). Dispensa: competição seria possível, mas a lei autoriza não licitar em hipótese específica.`,
    `Governança em compras exige segregação de funções: quem especifica não deve ser quem aprova/paga.`,
  ],
  workedExamples: [
    `'Compras para investimento' são aquelas que adquirem bens de capital/ativo permanente (máquinas, equipamentos), diferentemente das compras para consumo/produção (matéria-prima, material de consumo). A alternativa que cita a Lei 8.666/1993 (já revogada) é incorreta não só por citar lei revogada, mas por confundir 'compras para investimento' com 'compras do setor público' — são conceitos diferentes: um é sobre O QUE se compra, outro sobre QUEM compra.`,
    `A contratação de um serviço (manutenção prestada por terceiros) é formalizada por uma Ordem de Serviço (OS), documento próprio para serviços — não confundir com Ordem de Compra (OC, para bens) nem com Ordem de Produção/Montagem (uso interno de manufatura).`,
    `No sistema Just-in-Time, a seleção de fornecedores prioriza parcerias de longo prazo com poucos fornecedores confiáveis, avaliando prazo de entrega e qualidade em pé de igualdade com o preço — ao contrário da compra tradicional baseada apenas em custo mínimo.`,
  ],
  commonMistakes: [
    `Achar que "compra para produção" significa qualquer compra feita por uma indústria — na verdade é especificamente o material que INTEGRA o produto final (matéria-prima), não máquinas ou material de escritório.`,
    `Confundir Ordem de Compra com Ordem de Serviço — o critério não é "tem peça envolvida", é "o que está sendo formalizado: um bem ou uma atividade prestada".`,
    `Tratar dispensa e inexigibilidade como sinônimos — a diferença central é SE a competição era ou não viável, não apenas "não precisou licitar".`,
    `Decorar a sequência de fases da Lei 14.133 como absoluta e imutável, ignorando que a inversão julgamento/habilitação é expressamente admitida (regra do pregão).`,
    `Padrão observado no acervo real (AC-16-2012-CESGRANRIO-39): 'Compras para investimento' são aquelas que adquirem bens de capital/ativo permanente (máquinas, equipamentos), diferentemente das compras para consumo/produção (matéria-prima, material de consumo) — alternativa E. A alternativa C é uma pegadinha que cita a Lei 8.666/1993 (já revogada e substituída pela Lei 14.133/2021 e, para estatais, pela Lei 13.303/2016), mas é INCORRETA mesmo no contexto original da questão, pois confunde 'compras para investimento' com 'compras do setor público'.`,
    `Padrão observado no acervo real (AC-16-2013-CESGRANRIO-47): A contratação de um serviço (manutenção prestada por terceiros) é formalizada por uma Ordem de Serviço (OS), documento próprio para serviços, distinto da Ordem de Compra (para aquisição de bens).`,
    `Padrão observado no acervo real (AC-16-2012-CESGRANRIO-29b): No sistema Just-in-Time, a seleção de fornecedores prioriza parcerias de longo prazo com poucos fornecedores confiáveis, avaliando prazo de entrega e qualidade em pé de igualdade com o preço.`,
  ],
  howBoardMightAsk: [
    `Descreve a compra de um item concreto (máquina, matéria-prima, material de escritório) e pede para classificar como consumo, produção ou investimento — testando se você identifica se o item integra o produto, é consumido na operação, ou vira patrimônio.`,
    `Apresenta uma situação de contratação de serviço x aquisição de bem e pede o documento correto (OC x OS).`,
    `Testa a diferença entre dispensa e inexigibilidade a partir de uma situação concreta (fornecedor exclusivo = inexigibilidade; valor baixo/emergência = dispensa).`,
    `Cobra as modalidades da Lei 14.133/2021 (pregão, concorrência, concurso, leilão, diálogo competitivo) e/ou a sequência de fases do processo licitatório.`,
  ],
  legalReferences: [
    { title: "Lei nº 13.303/2016 (Lei das Estatais) — arts. 28 a 91", note: "Regime de licitações e contratos de empresas públicas e sociedades de economia mista." },
    { title: "Lei nº 14.133/2021 (Nova Lei de Licitações)", note: "Modalidades e fases do processo licitatório, aplicada subsidiariamente às estatais." },
  ],
  reviewSummaryPoints: [
    `Consumo (não integra, é gasto operacional) x Produção (integra o produto) x Investimento (vira ativo permanente).`,
    `Ordem de Compra = bem. Ordem de Serviço = serviço/atividade.`,
    `Custo total de aquisição > menor preço isolado.`,
    `JIT = poucos fornecedores parceiros, prazo e qualidade tão importantes quanto preço.`,
    `Lei 13.303/2016 = regime próprio das estatais. Lei 14.133/2021 = modalidades e fases, subsidiária.`,
    `Fases: preparatória → divulgação → propostas → julgamento → habilitação → recurso → homologação (inversão admitida).`,
    `Inexigibilidade = inviabilidade real de competição. Dispensa = competição viável, mas lei autoriza não licitar.`,
    `Segregação de funções: quem especifica ≠ quem aprova/paga.`,
  ],
  flashcards: [
    { front: "Diferença entre compra para consumo, produção e investimento?", back: "Consumo: gasto operacional, não integra o produto. Produção: integra o produto final. Investimento: vira ativo permanente (bem de capital)." },
    { front: "Ordem de Compra x Ordem de Serviço?", back: "OC formaliza aquisição de um BEM. OS formaliza contratação de um SERVIÇO/atividade prestada por terceiro." },
    { front: "Diferença entre dispensa e inexigibilidade de licitação?", back: "Inexigibilidade: licitação é inviável (sem competição possível). Dispensa: competição seria possível, mas a lei autoriza não licitar em hipótese específica." },
    { front: "Qual lei rege o regime próprio de licitações das estatais como a Transpetro?", back: "Lei nº 13.303/2016 (Lei das Estatais), artigos 28 a 91." },
  ],
  miniQuiz: [
    {
      statement: `A função compras é um subsistema do Departamento de Administração de Materiais, a qual tem por finalidade suprir as necessidades de materiais ou serviços da empresa, no momento certo e com as quantidades desejadas.

Enquadram-se como compras para investimento`,
      options: [
        { key: "A", text: `aqueles materiais que integram o produto final, e, portanto, nesse caso, as matéria-primas e outros materiais que fazem parte do produto.`, isCorrect: false, explanation: `Isso descreve compras para PRODUÇÃO, não investimento — o material integra o produto final, diferente de um bem de capital que produz o item mas não vira parte dele.` },
        { key: "B", text: `aqueles materiais que, sendo consumidos normal e rotineiramente, não integram o produto, sendo apenas material de consumo ou de custeio.`, isCorrect: false, explanation: `Isso descreve compras para CONSUMO, não investimento.` },
        { key: "C", text: `todas as compras que forem processadas na administração pública através da Lei nº 8.666/1993.`, isCorrect: false, explanation: `Além de citar uma lei revogada, confunde o critério de classificação (o que se compra) com o regime jurídico (quem compra) — são perguntas diferentes.` },
        { key: "D", text: `as compras que demandem a participação de um administrador com especialidade em comércio exterior.`, isCorrect: false, explanation: `Não existe essa exigência como critério definidor de "compra para investimento" — é um distrator sem relação com a classificação real.` },
        { key: "E", text: `as compras de bens e equipamentos que compõem o ativo da empresa.`, isCorrect: true, explanation: `Correto: compras para investimento adquirem bens de capital/ativo permanente (máquinas, equipamentos) — não são consumidos na operação nem integram o produto, viram patrimônio duradouro da empresa.` },
      ],
    },
    {
      statement: `Um técnico administrativo abriu um pedido para a realização de manutenção de equipamentos de informática junto à empresa terceirizada responsável.

Nesse caso, o técnico deve utilizar uma`,
      options: [
        { key: "A", text: `ordem de compra (OC)`, isCorrect: false, explanation: `OC formaliza a aquisição de um BEM, não a contratação de um serviço.` },
        { key: "B", text: `ordem de montagem (OM)`, isCorrect: false, explanation: `Ordem de montagem é documento de uso interno de manufatura, não de contratação de serviço externo.` },
        { key: "C", text: `ordem de produção (OP)`, isCorrect: false, explanation: `Ordem de produção coordena a fabricação interna, não a contratação de terceiros.` },
        { key: "D", text: `ordem de serviço (OS)`, isCorrect: true, explanation: `Correto: a contratação de um serviço (manutenção prestada por terceiros) é formalizada por uma Ordem de Serviço — documento próprio para atividades/serviços, distinto da Ordem de Compra (para bens).` },
        { key: "E", text: `requisição de materiais (RM)`, isCorrect: false, explanation: `RM é usada para requisitar materiais já em estoque interno, não para contratar um serviço externo.` },
      ],
    },
  ],
};

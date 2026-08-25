import type { LessonContent } from "@/content/lessonTypes";

export const AC_11_MODALIDADES_TRANSPORTE: LessonContent = {
  slug: "ac-11-modalidades-transporte",
  topicSlug: "ac-11-modalidades-transporte",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Modalidades de transporte`,
  learningObjective: `Diferenciar as características de cada modal (rodoviário, ferroviário, aquaviário, dutoviário, aéreo), entender as vantagens/desvantagens do modal marítimo x rodoviário, e distinguir com precisão intermodalidade (múltiplos contratos) de multimodalidade (contrato único, OTM) — a Cesgranrio gosta de dar a definição literal de um conceito e pedir seu nome técnico exato, com distratores de termos parecidos.`,
  syllabusCodes: ["AC-11"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-11 — Modalidades de Transporte

## 1. Características de cada modal

- **Rodoviário**: oferece **capilaridade** — chega a praticamente qualquer destino (porta a porta), com maior flexibilidade de rota e variedade de destinos, mas custo por unidade de carga geralmente mais alto e capacidade menor por veículo.
- **Ferroviário**: favorece **grandes volumes** a médio/longo curso, com custo por unidade mais baixo que o rodoviário para grandes distâncias, mas menor flexibilidade de destino (depende de malha ferroviária existente).
- **Aquaviário** (marítimo/hidroviário): favorece **grandes volumes**, com o **menor custo por unidade de carga transportada** entre os modais principais (economia de escala) — mas é mais **lento** e menos flexível em destinos e no transporte porta a porta.
- **Aéreo**: favorece **velocidade** — o mais rápido para longas distâncias, mas o mais caro por unidade de carga; usado para cargas de alto valor agregado ou urgência.
- **Dutoviário**: opera **fluxos contínuos específicos** — transporta fluidos e granéis (petróleo, gás, minério em polpa) de forma contínua entre dois pontos fixos, sem flexibilidade de destino.

## 2. Modal marítimo x rodoviário — a comparação mais cobrada

A vantagem central do modal **marítimo** sobre o **rodoviário** é o **menor custo por unidade de carga transportada**, graças à economia de escala de transportar grandes volumes de uma vez. Em contrapartida, o marítimo é **mais lento** e **menos flexível** — não tem a mesma variedade de destinos nem a possibilidade de transporte porta a porta que o rodoviário oferece.

**Pegadinha clássica**: atribuir ao marítimo vantagens que na verdade são do rodoviário (maior rapidez, maior variedade de destinos, transporte porta a porta, lotes menores) — a única vantagem real do marítimo sobre o rodoviário, entre essas opções, é o custo por carga.

## 3. Modal dutoviário — características específicas

O modal dutoviário tem um perfil muito específico:

- É **dominado pela indústria petrolífera** (principal usuária de dutos para transporte de óleo e derivados).
- Está sujeito a **riscos ambientais e de terceiros** (vazamentos, danos à tubulação por terceiros).
- **Não** transporta grande variedade de produtos — é limitado a **fluidos e granéis** que podem fluir pela tubulação, não cargas sólidas diversas.
- **Não** é indicado para pequenos lotes — exige **grandes volumes contínuos** para ser economicamente viável, dado o alto investimento fixo na infraestrutura de dutos.

## 4. Escolha do modal: critérios múltiplos

A escolha do modal de transporte considera simultaneamente: **custo**, **tempo** de trânsito, **capacidade** de carga, **frequência** de saídas, **confiabilidade** do prazo, **segurança** (avarias, roubo) e a **natureza do produto** (perecível, perigoso, de alto valor). Não existe "o melhor modal" universal — a escolha ideal depende do equilíbrio entre esses critérios para cada carga específica.

## 5. Intermodalidade x Multimodalidade — a distinção mais cobrada do código

- **Intermodalidade**: combina dois ou mais modais, mas com **contratos e documentos próprios por trecho** — cada perna da viagem tem seu próprio contrato de transporte e sua própria responsabilidade.
- **Multimodalidade**: uma unidade de carga é transportada em todo o percurso usando **duas ou mais modalidades**, mas sob um **único contrato**, desde a origem até o destino, sob a responsabilidade de um **único Operador de Transporte Multimodal (OTM)** — o cliente contrata uma vez só e o OTM assume a responsabilidade pelo trajeto inteiro, independente de quantos modais forem usados.

**Regra de decoreba**: multimodal = **um** contrato, **um** responsável (OTM); intermodal = **vários** contratos, um por trecho/modal.

**Exemplo prático**: barco corresponde ao modal **hidroviário**, e avião ao modal **aéreo** — a combinação de ambos caracteriza a integração hidroviário-aérea, que pode ser feita de forma intermodal (contratos separados) ou multimodal (um contrato único, um OTM).

## 6. Transbordo, interfaces e regulação

O **transbordo** (troca de veículo/modal no meio do percurso) e as **interfaces** entre modais podem gerar **custo adicional**, **tempo** extra e **risco** de avaria — cada transferência física da carga é um ponto de vulnerabilidade operacional. A **regulação** de transporte define autorizações, documentos exigidos, requisitos de segurança e responsabilidades, variando conforme o modal e o tipo de carga (ex.: produtos perigosos têm regulação específica, como a Resolução ANTT 420/2004 vista no AC-15).

## Síntese

O AC-11 exige conhecer as características e trade-offs de cada modal (especialmente marítimo x rodoviário), o perfil muito específico do dutoviário, e a distinção precisa entre intermodalidade (contratos por trecho) e multimodalidade (contrato único, um OTM responsável pelo trajeto inteiro).

## Mapa mental

\`\`\`mermaid
mindmap
  root((Modalidades de Transporte — AC-11))
    Caracteristicas por modal
      Rodoviario: capilaridade, porta a porta
      Ferroviario: grandes volumes, media/longa distancia
      Aquaviario: menor custo/unidade, mais lento
      Aereo: velocidade, custo alto
      Dutoviario: fluxo continuo, fluidos/granéis
    Maritimo x Rodoviario
      Maritimo: menor custo por carga
      Rodoviario: rapidez, destinos, porta a porta
    Dutoviario especifico
      Dominado por industria petrolifera
      Riscos ambientais
      NAO diverso, NAO pequenos lotes
    Intermodal x Multimodal
      Intermodal: contratos por trecho
      Multimodal: um contrato, um OTM responsavel
    Transbordo
      Custo, tempo, risco adicional
\`\`\``,
  mustMemorize: [
    `Rodoviário = capilaridade/porta a porta. Ferroviário e aquaviário = grandes volumes. Aéreo = velocidade. Dutoviário = fluxo contínuo específico.`,
    `Vantagem do marítimo sobre o rodoviário = MENOR CUSTO por unidade de carga — não rapidez, não variedade de destinos, não porta a porta.`,
    `Dutoviário é dominado pela indústria petrolífera, NÃO transporta produtos diversos, NÃO serve a pequenos lotes.`,
    `Multimodal = UM contrato, UM Operador de Transporte Multimodal (OTM) responsável pelo trajeto inteiro.`,
    `Intermodal = VÁRIOS contratos/documentos, um por trecho/modal.`,
    `Transbordo/interfaces geram custo, tempo e risco adicionais.`,
  ],
  workedExamples: [
    `O transporte multimodal é caracterizado pelo uso de duas ou mais modalidades sob um ÚNICO contrato e um único Operador de Transporte Multimodal (OTM), diferindo do intermodal, que usa múltiplos contratos/documentos.`,
    `O modal marítimo tem menor custo por unidade de carga transportada (economia de escala), embora seja mais lento e menos flexível em destinos e porta a porta que o modal rodoviário.`,
    `O modal dutoviário é dominado pela indústria petrolífera e está sujeito a riscos ambientais e de terceiros; não transporta grande variedade de produtos (limitado a fluidos/granéis) nem é indicado para pequenos lotes (exige grandes volumes contínuos para viabilidade).`,
    `Barco corresponde ao modal hidroviário, e avião ao modal aéreo; a combinação de ambos caracteriza a integração hidroviário-aérea.`,
  ],
  commonMistakes: [
    `Trocar as vantagens de marítimo e rodoviário — a vantagem real do marítimo é custo; rapidez, variedade de destinos e porta a porta são vantagens do rodoviário.`,
    `Achar que o dutoviário transporta grande variedade de produtos — é limitado a fluidos e granéis que podem fluir pela tubulação.`,
    `Achar que o dutoviário serve bem a pequenos lotes — ao contrário, exige grandes volumes contínuos para ser economicamente viável.`,
    `Confundir multimodal (um contrato, um OTM responsável) com intermodal (contratos separados por trecho) — são conceitos técnicos distintos, não sinônimos.`,
    `Achar que existe "o melhor modal" universal — a escolha depende do equilíbrio entre custo, tempo, capacidade, frequência, confiabilidade, segurança e natureza do produto.`,
    `Padrão observado no acervo real (AC-11-2012-CESGRANRIO-40): identificar corretamente o transporte multimodal pela combinação de contrato único + OTM único, descartando "intermodal" como distrator.`,
    `Padrão observado no acervo real (AC-11-2012-CESGRANRIO-38): reconhecer o menor custo por carga como a vantagem real do marítimo sobre o rodoviário, descartando rapidez/destinos/porta a porta como distratores.`,
    `Padrão observado no acervo real (AC-11-2012-CESGRANRIO-40b): identificar corretamente as características do dutoviário (dominado pela petrolífera, riscos ambientais) e as incorretas (variedade de produtos, pequenos lotes).`,
    `Padrão observado no acervo real (AC-11-2011-CESGRANRIO-57): associar corretamente barco a hidroviário e avião a aéreo na integração intermodal.`,
  ],
  howBoardMightAsk: [
    `Descreve a definição literal de intermodal ou multimodal e pede o nome técnico correto, com o outro termo como distrator.`,
    `Pede a vantagem real do modal marítimo sobre o rodoviário, com distratores que invertem as características de cada modal.`,
    `Dá afirmações (I, II, III, IV) sobre o modal dutoviário e pede quais são corretas.`,
    `Associa modais de transporte (barco, avião, caminhão, trem) aos nomes técnicos corretos (hidroviário, aéreo, rodoviário, ferroviário).`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Rodoviário = capilaridade. Ferroviário/aquaviário = volume. Aéreo = velocidade. Dutoviário = fluxo contínuo.`,
    `Marítimo x rodoviário: marítimo vence em custo; rodoviário vence em rapidez/destinos/porta a porta.`,
    `Dutoviário: petrolífera, fluidos/granéis, grandes volumes contínuos — não diverso, não pequenos lotes.`,
    `Multimodal = um contrato, um OTM. Intermodal = vários contratos por trecho.`,
  ],
  flashcards: [
    { front: "Qual a vantagem real do modal marítimo sobre o rodoviário?", back: "Menor custo por unidade de carga transportada — não rapidez, variedade de destinos ou porta a porta (essas são vantagens do rodoviário)." },
    { front: "Diferença entre intermodalidade e multimodalidade?", back: "Intermodal: contratos separados por trecho/modal. Multimodal: um único contrato, sob responsabilidade de um único OTM." },
    { front: "Que tipo de carga o modal dutoviário transporta?", back: "Fluidos e granéis (ex.: petróleo, gás) — não transporta grande variedade de produtos nem serve a pequenos lotes." },
    { front: "Qual modal favorece velocidade e qual favorece capilaridade?", back: "Aéreo favorece velocidade. Rodoviário favorece capilaridade (porta a porta)." },
  ],
  miniQuiz: [
    {
      statement: `Uma unidade de carga é transportada em todo o percurso, utilizando duas ou mais modalidades de transporte abrangidas por um único contrato, desde a origem até o destino, e o transporte é executado sob a responsabilidade de um único Operador de Transporte Multimodal – OTM.

Tal conceito de transporte é o`,
      options: [
        { key: "A", text: `de percurso único`, isCorrect: false, explanation: `"Percurso único" não é a nomenclatura técnica usada para essa combinação de contrato único e múltiplos modais — o termo correto é multimodal.` },
        { key: "B", text: `intermodal`, isCorrect: false, explanation: `O intermodal usa CONTRATOS/documentos separados por trecho — o cenário descrito, com contrato único e um OTM responsável, é multimodal.` },
        { key: "C", text: `multimodal`, isCorrect: true, explanation: `Correto: o transporte multimodal é caracterizado pelo uso de duas ou mais modalidades sob um único contrato e um único Operador de Transporte Multimodal (OTM).` },
        { key: "D", text: `segmentado`, isCorrect: false, explanation: `"Segmentado" não é um termo técnico da classificação de transporte multimodal/intermodal — não corresponde à definição dada.` },
        { key: "E", text: `unimodal`, isCorrect: false, explanation: `Unimodal é o transporte que usa apenas UM modal — o cenário descrito usa DUAS OU MAIS modalidades, então não é unimodal.` },
      ],
    },
    {
      statement: `Uma das vantagens do modal marítimo em relação ao modal rodoviário é a(o)`,
      options: [
        { key: "A", text: `maior rapidez`, isCorrect: false, explanation: `O modal marítimo é mais LENTO que o rodoviário, não mais rápido — essa não é uma vantagem do marítimo.` },
        { key: "B", text: `maior variedade de destinos`, isCorrect: false, explanation: `O rodoviário tem maior variedade de destinos e flexibilidade de rota — o marítimo depende de portos, com menos flexibilidade.` },
        { key: "C", text: `possibilidade de transporte de lotes menores`, isCorrect: false, explanation: `O marítimo é mais eficiente para grandes volumes; o rodoviário é mais adequado a lotes menores e flexíveis.` },
        { key: "D", text: `menor custo por carga transportada`, isCorrect: true, explanation: `Correto: o modal marítimo tem menor custo por unidade de carga transportada, graças à economia de escala de grandes volumes, embora seja mais lento e menos flexível que o rodoviário.` },
        { key: "E", text: `possibilidade de transporte porta a porta`, isCorrect: false, explanation: `O transporte porta a porta é uma vantagem característica do modal RODOVIÁRIO, não do marítimo, que depende de portos como pontos fixos.` },
      ],
    },
  ],
};

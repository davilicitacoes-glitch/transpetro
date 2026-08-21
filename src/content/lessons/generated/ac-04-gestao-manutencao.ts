import type { LessonContent } from "@/content/lessonTypes";

export const AC_04_GESTAO_MANUTENCAO: LessonContent = {
  slug: "ac-04-gestao-manutencao",
  topicSlug: "ac-04-gestao-manutencao",
  subjectSlug: "especificas",
  moduleSlug: "especificas-processos-legislacao",
  title: `Gestão da manutenção`,
  learningObjective: `Diferenciar manutenção corretiva (planejada e não planejada), preventiva (por tempo/uso) e preditiva (por condição), entender os indicadores MTBF/MTTR/disponibilidade, e o papel do PCM (Planejamento e Controle da Manutenção) — a Cesgranrio gosta de descrever um cenário de falha ou rotina de verificação predial e pedir o tipo de manutenção ou o sistema correto envolvido.`,
  syllabusCodes: ["AC-04"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-04 — Gestão da Manutenção

## 1. Os três tipos de manutenção — a distinção central do código

- **Manutenção corretiva**: ocorre **após a falha** já ter acontecido — o equipamento quebrou e precisa ser reparado. Pode ser:
  - **Não planejada**: a falha ocorre de forma **inesperada** (quebra súbita), gerando **altos custos** e possíveis **perdas de produção** — é o cenário mais caro e disruptivo.
  - **Planejada**: a correção é decidida e programada conscientemente (ex.: "vamos deixar rodar até quebrar, e já temos o plano de reposição pronto"), sem ser uma falha totalmente surpreendente.
- **Manutenção preventiva**: executada segundo uma **programação definida** por critérios de **calendário** (tempo) ou de **uso** (km rodados, horas de funcionamento) — a peça é trocada ou revisada **antes** de apresentar defeito, com base num intervalo pré-definido, não no estado real do componente.
- **Manutenção preditiva**: é, na prática, uma **variação/evolução da manutenção preventiva** — mas em vez de seguir um intervalo fixo de tempo/uso, a intervenção (troca ou verificação) é feita com base em **monitoramento de condição** do equipamento (vibração, temperatura, análise de óleo), antes que o defeito efetivamente ocorra. A vantagem é intervir só quando os dados reais indicam necessidade, evitando tanto a falha inesperada quanto a troca prematura de peças ainda boas.

**Pegadinha clássica**: achar que a preditiva "corrige defeitos assim que surgem" (isso é função da corretiva) ou que a preventiva é "inviável para pequenas empresas" (não é uma regra geral — depende de criticidade e risco, não de porte da empresa).

## 2. Preventiva excessiva também tem custo

Uma política de manutenção não deve ser puramente "quanto mais preventiva, melhor": **preventiva em excesso** também gera **custo** (peças trocadas antes do necessário) e **indisponibilidade** (equipamento parado para manutenção com mais frequência que o necessário). A política ideal considera a **criticidade** do ativo e o **risco** envolvido em cada tipo de falha — não existe "a manutenção ideal" universal, aplicável a todos os equipamentos da mesma forma.

## 3. Confiabilidade, disponibilidade e mantenabilidade

- **Confiabilidade**: probabilidade de o equipamento funcionar sem falhas por um determinado período. Medida na prática pelo **MTBF** (Mean Time Between Failures — tempo médio entre falhas): **quanto maior o MTBF, maior a confiabilidade** do equipamento.
- **Mantenabilidade**: facilidade/rapidez com que o equipamento pode ser reparado após uma falha. Medida pelo **MTTR** (Mean Time To Repair — tempo médio para reparo): **quanto menor o MTTR, melhor** — significa reparos mais rápidos.
- **Disponibilidade**: a proporção do tempo em que o equipamento está **efetivamente em operação** em relação ao tempo total em que deveria estar disponível. Relaciona-se diretamente com MTBF e MTTR: quanto maior o MTBF e menor o MTTR, maior a disponibilidade resultante.

## 4. PCM — Planejamento e Controle da Manutenção

O **PCM** é a função que transforma **necessidades de manutenção** em **planos concretos**: aloca recursos (mão de obra, peças, ferramentas), define **programação** (quando cada intervenção ocorre), emite **ordens de serviço** e faz o **controle da execução** (comparando planejado x realizado). É a estrutura organizacional que dá disciplina e rastreabilidade a todo o processo de manutenção — sem PCM, a manutenção vira reativa e desorganizada.

## 5. Ordem de serviço, prioridades e backlog

- **Ordem de serviço (OS)**: documento formal que registra a solicitação, execução e conclusão de um serviço de manutenção — é o instrumento operacional do PCM.
- **Prioridades**: nem toda demanda de manutenção tem a mesma urgência — critérios de criticidade e risco definem o que é atendido primeiro.
- **Backlog**: o acúmulo de ordens de serviço ainda **não executadas** — um backlog crescente sinaliza capacidade de manutenção insuficiente frente à demanda.

## 6. Rotina de verificação predial — sistemas e o que cada um cobre

Quando a manutenção é aplicada a edificações, a programação de verificação cobre sistemas distintos, cada um com seu foco específico:

- **Estrutura** (elementos portantes do edifício): verificação de possíveis **fissuras**, indicativas de problemas estruturais mais sérios.
- **Esquadrias**: portas, janelas, esquadrias metálicas/de alumínio.
- **Sistema hidráulico**: caixas d'água, tubulações, vazamentos.
- **Sistema elétrico**: fiação, luminárias, quadros.
- **Revestimentos e pintura**: acabamentos superficiais.

**Pegadinha clássica**: trocar o sistema associado a uma verificação — fissura é sinal de problema **estrutural**, não de esquadria ou revestimento; luminária é do sistema **elétrico**, não da estrutura.

## Síntese

O AC-04 exige, acima de tudo, saber diferenciar corretiva/preventiva/preditiva com precisão (inclusive as subdivisões de corretiva planejada x não planejada), entender os indicadores MTBF/MTTR/disponibilidade, e reconhecer o papel organizacional do PCM. No bloco predial, a pegadinha é associar corretamente cada sintoma (fissura, luminária, vazamento) ao sistema certo.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Gestão da Manutenção — AC-04))
    Tipos de manutencao
      Corretiva: apos a falha
        Nao planejada: surpresa, cara
        Planejada: decidida conscientemente
      Preventiva: por tempo/uso, intervalo fixo
      Preditiva: por condicao, monitoramento real
    Indicadores
      MTBF: tempo medio entre falhas, maior = confiavel
      MTTR: tempo medio de reparo, menor = melhor
      Disponibilidade: tempo em operacao / tempo total
    PCM
      Planos, recursos, programacao, OS, controle
      Backlog: OS acumuladas nao executadas
    Verificacao predial
      Estrutura: fissuras
      Eletrico: luminarias
      Hidraulico: caixa dagua
\`\`\``,
  mustMemorize: [
    `Corretiva ocorre após falha (planejada ou não); preventiva segue intervalo de tempo/uso; preditiva acompanha condição real do equipamento.`,
    `Preditiva é uma EVOLUÇÃO da preventiva — monitora condição em vez de seguir intervalo fixo.`,
    `Preventiva EXCESSIVA também gera custo e indisponibilidade — a política deve considerar criticidade e risco, não ser máxima sempre.`,
    `MTBF (tempo médio entre falhas): quanto MAIOR, maior a confiabilidade. MTTR (tempo médio de reparo): quanto MENOR, melhor a mantenabilidade.`,
    `Disponibilidade = tempo em operação ÷ tempo total requerido — relacionada a MTBF (maior) e MTTR (menor).`,
    `PCM transforma necessidades em planos, recursos, programação, ordens de serviço e controle de execução.`,
    `Fissura = problema ESTRUTURAL; luminária = sistema ELÉTRICO; caixa d'água = sistema HIDRÁULICO.`,
  ],
  workedExamples: [
    `A manutenção preditiva é uma variação/evolução da preventiva, na qual a intervenção é feita com base em monitoramento de condição, antes que o defeito efetivamente ocorra — diferente de corretiva (que age após a falha) e de preventiva clássica (que segue intervalo fixo, não condição real).`,
    `A verificação da estrutura predial (elementos portantes do edifício) inclui a checagem de possíveis fissuras — diferente da verificação de esquadrias, sistema elétrico, revestimentos ou sistema hidráulico.`,
    `A manutenção corretiva NÃO planejada ocorre após a falha/quebra inesperada, implicando altos custos e possíveis perdas de produção — diferente da corretiva planejada, da preditiva e da preventiva.`,
    `A manutenção preventiva é executada segundo programação definida por critérios de calendário ou de uso (km rodados, horas de funcionamento), buscando evitar falhas antes que ocorram — sem depender de monitoramento de condição real, que é característica da preditiva.`,
  ],
  commonMistakes: [
    `Achar que a manutenção corretiva é "a mais barata e garantida" — na verdade, a corretiva NÃO PLANEJADA costuma ser a mais cara, por gerar falha inesperada e perda de produção.`,
    `Achar que a preditiva "corrige defeitos assim que surgem" — essa é a função da corretiva; a preditiva atua ANTES do defeito, com base em monitoramento de condição.`,
    `Achar que a manutenção preventiva é "inviável para pequenas empresas" como regra geral — a viabilidade depende de criticidade e risco do ativo, não do porte da empresa.`,
    `Achar que "quanto mais preventiva, melhor" — preventiva em excesso também gera custo e indisponibilidade desnecessários.`,
    `Confundir MTBF (tempo ENTRE falhas, quanto maior melhor) com MTTR (tempo PARA reparo, quanto menor melhor) — são indicadores opostos em termos de "bom = maior ou menor".`,
    `Trocar o sistema predial associado a um sintoma — fissura é estrutural, não de esquadria/revestimento; luminária é elétrico, não estrutural.`,
    `Padrão observado no acervo real (AC-04-2012-CESGRANRIO-21): identificar corretamente que a preditiva é uma evolução da preventiva baseada em monitoramento de condição, descartando alternativas que invertem os conceitos de corretiva/preventiva/preditiva.`,
    `Padrão observado no acervo real (AC-04-2011-CESGRANRIO-46): associar fissuras à verificação da estrutura predial, não a outros sistemas (esquadrias, elétrico, hidráulico, revestimentos).`,
    `Padrão observado no acervo real (AC-04-2011-CESGRANRIO-47): identificar a corretiva não planejada como a que ocorre após falha inesperada, com altos custos e perda de produção.`,
    `Padrão observado no acervo real (AC-04-2018-CESGRANRIO-22): reconhecer que a manutenção preventiva segue programação por calendário ou uso, buscando evitar falhas antes que ocorram.`,
  ],
  howBoardMightAsk: [
    `Descreve um cenário de manutenção (falha súbita, troca programada, monitoramento de vibração/temperatura) e pede o tipo correto (corretiva/preventiva/preditiva).`,
    `Pede para comparar MTBF e MTTR e indicar qual direção (maior/menor) é desejável para cada um.`,
    `Descreve um sintoma predial (fissura, luminária queimada, vazamento) e pede o sistema correspondente.`,
    `Pede a função do PCM na transformação de necessidades de manutenção em planos e ordens de serviço.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Corretiva = após falha. Preventiva = intervalo fixo. Preditiva = monitoramento de condição.`,
    `Preditiva é evolução da preventiva, não da corretiva.`,
    `Preventiva excessiva também tem custo — considerar criticidade/risco.`,
    `MTBF maior = mais confiável. MTTR menor = melhor mantenabilidade.`,
    `Disponibilidade = tempo em operação / tempo total.`,
    `Fissura = estrutura. Luminária = elétrico. Caixa d'água = hidráulico.`,
  ],
  flashcards: [
    { front: "Diferença entre manutenção preventiva e preditiva?", back: "Preventiva segue intervalo fixo de tempo/uso. Preditiva monitora a condição real do equipamento e intervém com base nesses dados." },
    { front: "MTBF maior é bom ou ruim? E MTTR menor?", back: "MTBF maior = mais confiável (bom). MTTR menor = reparo mais rápido, melhor mantenabilidade (bom)." },
    { front: "O que é o PCM?", back: "Planejamento e Controle da Manutenção — transforma necessidades em planos, recursos, programação, ordens de serviço e controle de execução." },
    { front: "Uma fissura na estrutura predial indica problema em qual sistema?", back: "Sistema estrutural (elementos portantes do edifício) — não confundir com esquadrias, elétrico ou hidráulico." },
  ],
  miniQuiz: [
    {
      statement: `Em relação ao processo de manutenção aplicado a máquinas, equipamentos, sistemas, processos e outros elementos passíveis de tal prática e aos diferentes tipos de manutenção que podem ser utilizados, constata-se que a manutenção`,
      options: [
        { key: "A", text: `corretiva é o procedimento mais barato e garantido no que se refere à conservação de equipamentos.`, isCorrect: false, explanation: `A corretiva não planejada costuma ser a mais CARA, por envolver falha inesperada e perda de produção — não é o procedimento mais barato nem garantido.` },
        { key: "B", text: `preditiva é uma variação da manutenção preventiva, onde os componentes são trocados ou verificados antes que apresentem defeito.`, isCorrect: true, explanation: `Correto: a preditiva é de fato uma variação/evolução da preventiva, na qual a intervenção é feita com base em monitoramento de condição, antes que o defeito efetivamente ocorra.` },
        { key: "C", text: `preditiva é o procedimento que deve ser utilizado para corrigir os defeitos assim que esses surgirem para evitar danos maiores ao equipamento.`, isCorrect: false, explanation: `Corrigir defeitos assim que surgem é função da manutenção CORRETIVA, não da preditiva, que atua antes do defeito ocorrer.` },
        { key: "D", text: `preventiva torna-se inviável economicamente para as empresas de pequeno porte, porque, neste tipo de manutenção, a substituição de peças ocorre antes que elas apresentem defeitos.`, isCorrect: false, explanation: `A viabilidade da manutenção preventiva depende de critérios de criticidade e risco do ativo, não do porte da empresa — não é uma regra geral de inviabilidade.` },
        { key: "E", text: `ideal, para todas as empresas, seria a manutenção preventiva acontecer raramente, sendo correto ter um processo de manutenção corretiva disponível para os momentos de emergência.`, isCorrect: false, explanation: `Não existe uma regra universal de que a preventiva deva ser rara — a frequência ideal depende da criticidade e do risco de cada ativo, não de uma preferência geral pela corretiva.` },
      ],
    },
    {
      statement: `O processo de manutenção exige uma série de verificações que servirão de orientação para o estabelecimento de uma programação para a verificação da estrutura, da cobertura, das paredes, das esquadrias, do sistema hidráulico, do sistema elétrico, dos pisos, dos revestimentos e da pintura.

A verificação da estrutura predial prevê`,
      options: [
        { key: "A", text: `reparo nas portas`, isCorrect: false, explanation: `Reparo em portas é verificação de ESQUADRIAS, não da estrutura predial (elementos portantes).` },
        { key: "B", text: `verificação de possíveis fissuras`, isCorrect: true, explanation: `Correto: a verificação da estrutura predial (elementos portantes do edifício) inclui a checagem de possíveis fissuras, indicativas de problemas estruturais.` },
        { key: "C", text: `inspeção de luminárias`, isCorrect: false, explanation: `Inspeção de luminárias pertence ao sistema ELÉTRICO, não à verificação estrutural.` },
        { key: "D", text: `inspeção dos revestimentos`, isCorrect: false, explanation: `Revestimentos são um sistema de acabamento superficial, distinto da verificação dos elementos portantes (estrutura).` },
        { key: "E", text: `inspeção nos sistemas de caixa d'água`, isCorrect: false, explanation: `Caixa d'água pertence ao sistema HIDRÁULICO, não à verificação da estrutura predial.` },
      ],
    },
  ],
};

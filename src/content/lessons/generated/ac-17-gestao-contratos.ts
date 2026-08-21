import type { LessonContent } from "@/content/lessonTypes";

export const AC_17_GESTAO_CONTRATOS: LessonContent = {
  slug: "ac-17-gestao-contratos",
  topicSlug: "ac-17-gestao-contratos",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Gestão de Contratos`,
  learningObjective: `Dominar o ciclo de vida do contrato administrativo (formalização → execução → fiscalização → alterações → encerramento), os papéis de gestor e fiscal, e como a Lei 14.133/2021 trata reajuste, repactuação, revisão e aditivos — continuação natural de AC-16, já que a licitação (AC-16) termina exatamente onde o contrato (AC-17) começa.`,
  syllabusCodes: ["AC-17"],
  estimatedMinutes: 45,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-17 — Gestão de Contratos

Se AC-16 é "como se compra", AC-17 é "como se administra o que foi comprado depois de assinado o contrato". A banca gosta de testar tanto os PAPÉIS (quem faz o quê) quanto os CONCEITOS FINANCEIROS que soam parecidos mas são tecnicamente diferentes (reajuste x repactuação x revisão).

## 1. Planejamento e formação do contrato

O contrato nasce do processo licitatório (AC-16) e formaliza obrigações recíprocas: o que será entregue, prazo, valor, penalidades, e as condições de execução. Um contrato mal formalizado — cláusulas vagas, ausência de critérios de aceite claros — é a origem da maioria dos problemas de execução e fiscalização que aparecem depois. O planejamento contratual inclui prever desde o início: como será medido o serviço, quem fiscaliza, e o que acontece em caso de descumprimento.

## 2. Papéis do gestor e do fiscal do contrato

Dois papéis frequentemente confundidos:

- **Gestor do contrato**: tem visão ampla e estratégica — coordena o contrato como um todo, toma decisões sobre alterações, prorrogações, e é o elo entre a área técnica e a administrativa/jurídica.
- **Fiscal do contrato**: acompanha a execução **no dia a dia**, de perto — verifica se o que foi entregue/executado corresponde ao contratado, registra ocorrências (atrasos, não conformidades) e produz a documentação que sustenta a medição e o pagamento.

**Regra prática**: o fiscal está mais perto da operação; o gestor tem a visão de conjunto e responde pelas decisões formais. Um erro típico de prova é atribuir ao fiscal uma decisão que é do gestor (ex.: aplicar penalidade) ou vice-versa.

## 3. Execução, medição, pagamento e recebimento

O pagamento **depende de execução comprovada** — não se paga por confiança, se paga contra evidência (medição, relatório, aceite formal). Dois momentos de recebimento do objeto:

- **Recebimento provisório**: confirma que o objeto foi entregue, mas ainda sujeito a verificação mais aprofundada.
- **Recebimento definitivo**: confirma que o objeto atende integralmente ao contratado, após a verificação.

**Armadilha importante**: nenhum dos dois recebimentos, provisório ou definitivo, **elimina automaticamente** a responsabilidade do contratado por vícios ocultos ou problemas que só aparecem depois (ex.: um defeito de fabricação descoberto meses depois do recebimento definitivo ainda pode gerar responsabilização).

## 4. Matriz de riscos e controles

Uma matriz de riscos contratual lista os eventos que podem dar errado durante a execução (atraso do fornecedor, mudança de escopo, problema de qualidade), quem é o responsável por cada risco (contratante ou contratada) e qual a resposta prevista. Isso orienta decisões durante a execução em vez de improvisar quando o problema já aconteceu.

## 5. Alterações contratuais: reajuste, repactuação e revisão

Os três termos soam parecidos mas têm gatilhos técnicos diferentes — é a distinção mais cobrada deste código:

- **Reajuste**: recompõe o valor do contrato pela **inflação**, aplicando um **índice previamente definido** (ex.: IPCA, INCC), de forma automática após o período mínimo (normalmente 1 ano). Não exige demonstração individualizada de custos — é uma fórmula.
- **Repactuação**: usada principalmente em contratos de **serviços contínuos com mão de obra** (ex.: terceirização). Exige a **demonstração analítica** da variação de custos (ex.: dissídio da categoria), não é automática por índice — precisa provar o quanto os custos realmente subiram.
- **Revisão**: trata do **reequilíbrio econômico-financeiro** do contrato diante de um evento **imprevisível** ou de força maior que rompe a equação inicial (ex.: mudança tributária relevante, evento extraordinário). É a mais excepcional das três.

**Como diferenciar em prova**: pergunte "isso é inflação genérica (reajuste), custo de mão de obra específico que precisa ser provado (repactuação), ou eu preciso invocar um evento extraordinário e imprevisível (revisão)?".

## 6. Aditivos contratuais

Um termo aditivo formaliza alterações no contrato (prazo, valor, escopo) dentro de **limites legais** (percentuais máximos de acréscimo/supressão). Ponto central de prova: **aditivo não é ferramenta para corrigir falha de planejamento** — se o objeto foi mal especificado desde o início, isso é um problema de gestão anterior, não algo que se resolve "só fazendo um aditivo". A lei limita os percentuais justamente para evitar que aditivos sucessivos desvirtuem a licitação original.

## 7. Contratos digitais e integração com sistemas

Sistemas eletrônicos de gestão contratual precisam preservar: **autoria** (quem fez o quê), **integridade** (o documento não foi alterado sem registro), **trilha de auditoria** (histórico completo de alterações) e **controle de prazos** (alertas de vencimento, renovação, reajuste). Isso conecta diretamente com AC-02 (Sistema de Gestão Integrado) e com a exigência de rastreabilidade que atravessa todo o ciclo de compras e contratos.

## Síntese

AC-17 continua exatamente onde AC-16 termina: da licitação para a execução. Os pontos mais cobrados são a diferença entre gestor e fiscal, a tríade reajuste/repactuação/revisão (cada uma com gatilho técnico diferente), e o fato de que recebimento (provisório ou definitivo) não apaga responsabilidade por vícios futuros.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Gestão de Contratos — AC-17))
    Papéis
      Gestor: visão ampla, decisões
      Fiscal: acompanhamento diário, evidências
    Execução
      Medição contra evidência
      Recebimento provisório
      Recebimento definitivo
    Alterações financeiras
      Reajuste: índice, inflação
      Repactuação: custo de mão de obra provado
      Revisão: evento imprevisível
    Aditivos
      Limites legais
      Nunca corrige falha de planejamento
    Matriz de riscos
      Evento, responsável, resposta
    Sistemas digitais
      Autoria, integridade, auditoria, prazos
\`\`\``,
  mustMemorize: [
    `Gestor: visão ampla, decisões formais sobre o contrato. Fiscal: acompanhamento diário da execução, registra evidências.`,
    `Pagamento depende de execução COMPROVADA (medição/aceite), nunca de confiança.`,
    `Recebimento provisório e definitivo NÃO eliminam automaticamente a responsabilidade do contratado por vícios ocultos futuros.`,
    `Reajuste = índice de inflação, automático. Repactuação = custo de mão de obra, precisa ser PROVADO. Revisão = evento imprevisível/força maior.`,
    `Aditivo tem limites legais e NUNCA serve para corrigir falha de planejamento anterior.`,
    `Matriz de riscos define: evento, responsável, resposta prevista — antecipa problemas em vez de improvisar.`,
    `Sistemas digitais de contrato devem garantir autoria, integridade, trilha de auditoria e controle de prazos.`,
  ],
  workedExamples: [
    `A resistência das áreas envolvidas em participar do processo de fiscalização caracteriza um problema de 'aceitação' do sistema de controle — quando os responsáveis por fiscalizar não veem valor no processo de registro, o controle falha não por falta de metodologia, mas por falta de adesão das pessoas envolvidas.`,
    `Um contrato de serviço contínuo com mão de obra terceirizada, ao completar 12 meses, tem seu valor atualizado com base no dissídio coletivo da categoria, comprovado por planilha de custos — isso é repactuação, não reajuste, porque exige demonstração analítica de custo específico, não aplicação automática de índice.`,
  ],
  commonMistakes: [
    `Tratar reajuste, repactuação e revisão como sinônimos de "aumentar o valor do contrato" — cada um tem um gatilho técnico diferente (índice automático x custo comprovado x evento imprevisível).`,
    `Atribuir ao fiscal uma decisão que é do gestor (ex.: aplicar sanção, decidir por aditivo) — o fiscal acompanha e registra; decisões formais são do gestor.`,
    `Achar que o recebimento definitivo do objeto "encerra" toda e qualquer responsabilidade do contratado — vícios ocultos podem gerar responsabilização mesmo depois.`,
    `Pensar que um aditivo pode "consertar" um objeto mal especificado desde o início — os limites legais de aditivo existem justamente para não permitir isso.`,
    `Padrão observado no acervo real (AC-17-2013-CESGRANRIO-48): a resistência das áreas envolvidas em participar do processo de fiscalização caracteriza um problema de 'aceitação' do sistema de controle, não de economia, objetividade, precisão ou rapidez.`,
  ],
  howBoardMightAsk: [
    `Descreve uma situação de reajuste de valor contratual e pede para identificar se é reajuste, repactuação ou revisão — testando o gatilho técnico correto de cada um.`,
    `Apresenta uma falha no processo de fiscalização (resistência das equipes, falta de registro) e pede para identificar a que fator do controle isso se relaciona (aceitação, economia, objetividade, precisão, rapidez).`,
    `Testa a diferença entre as responsabilidades do gestor e do fiscal a partir de uma situação concreta de execução contratual.`,
  ],
  legalReferences: [
    { title: "Lei nº 14.133/2021 — Capítulo sobre execução e alterações contratuais", note: "Reajuste, repactuação, revisão, aditivos e seus limites." },
  ],
  reviewSummaryPoints: [
    `Gestor decide e coordena; fiscal acompanha e registra evidências no dia a dia.`,
    `Pagamento só contra execução comprovada.`,
    `Recebimento (provisório/definitivo) não elimina responsabilidade futura por vícios ocultos.`,
    `Reajuste = índice/inflação automática. Repactuação = custo de mão de obra provado. Revisão = evento imprevisível.`,
    `Aditivo tem limite legal; não serve para corrigir planejamento malfeito.`,
    `Sistemas digitais de contrato: autoria, integridade, auditoria, prazos.`,
  ],
  flashcards: [
    { front: "Diferença entre gestor e fiscal de contrato?", back: "Gestor: visão ampla, decisões formais (aditivo, sanção). Fiscal: acompanhamento diário da execução, registra evidências." },
    { front: "Reajuste x repactuação x revisão — qual o gatilho de cada um?", back: "Reajuste: índice de inflação, automático. Repactuação: custo de mão de obra, precisa ser provado. Revisão: evento imprevisível/força maior." },
    { front: "O recebimento definitivo do objeto elimina a responsabilidade do contratado?", back: "Não — vícios ocultos descobertos depois ainda podem gerar responsabilização, mesmo após recebimento definitivo." },
  ],
  miniQuiz: [
    {
      statement: `Um sistema de fiscalização de contratos de serviços não vem atendendo plenamente ao seu papel de controlar a execução dos acordos no nível de serviço. Isto se deve ao fato de que as áreas atendidas pela empresa contratada, que deveriam fiscalizar a execução dos critérios contratuais, não percebem o preenchimento dos documentos de controle como um processo importante do seu trabalho e tornam-se resistentes à tal participação.

O problema no controle do serviço está relacionado a`,
      options: [
        { key: "A", text: `aceitação`, isCorrect: true, explanation: `Correto: a resistência das áreas envolvidas em participar do processo de fiscalização caracteriza um problema de ACEITAÇÃO do sistema de controle — as pessoas não aderem ao processo, mesmo que ele exista formalmente.` },
        { key: "B", text: `economia`, isCorrect: false, explanation: `O problema descrito não é de custo/economia do sistema de controle, é de adesão das pessoas ao processo.` },
        { key: "C", text: `objetividade`, isCorrect: false, explanation: `Objetividade se refere a critérios claros de medição, não à resistência das pessoas em preencher os documentos.` },
        { key: "D", text: `precisão`, isCorrect: false, explanation: `Precisão se refere à exatidão das medições, não à disposição das áreas em participar do processo.` },
        { key: "E", text: `rapidez`, isCorrect: false, explanation: `Rapidez se refere ao tempo de resposta do controle, não à resistência à participação no processo.` },
      ],
    },
  ],
};

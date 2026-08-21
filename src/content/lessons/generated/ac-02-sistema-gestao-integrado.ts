import type { LessonContent } from "@/content/lessonTypes";

export const AC_02_SISTEMA_GESTAO_INTEGRADO: LessonContent = {
  slug: "ac-02-sistema-gestao-integrado",
  topicSlug: "ac-02-sistema-gestao-integrado",
  subjectSlug: "especificas",
  moduleSlug: "especificas-processos-legislacao",
  title: `Sistema de Gestão Integrado`,
  learningObjective: `Dominar a lógica de um Sistema de Gestão Integrado (qualidade, ambiente, saúde e segurança sob uma única estrutura), a diferença entre correção e ação corretiva, o ciclo PDCA, o papel da auditoria interna, e as ferramentas de controle estatístico de qualidade (amostragem, cartas de controle, Kaizen) — tema em que a Cesgranrio gosta de descrever uma ferramenta pelo seu propósito e pedir o nome técnico correto.`,
  syllabusCodes: ["AC-02"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-02 — Sistema de Gestão Integrado

## 1. O que é um Sistema de Gestão Integrado (SGI)

Um **SGI** integra, sob uma única estrutura de processos, requisitos que antes eram tratados por sistemas paralelos e desconectados — tipicamente **qualidade** (ISO 9001), **meio ambiente** (ISO 14001) e **saúde e segurança ocupacional** (ISO 45001). A lógica da integração é evitar duplicidade de documentação, auditorias separadas e políticas conflitantes entre essas três áreas, tratando-as como dimensões de um mesmo sistema de gestão da organização.

## 2. Elementos comuns às normas de gestão (estrutura de alto nível)

As normas ISO de sistema de gestão modernas compartilham uma estrutura comum, o que facilita a integração:

- **Contexto da organização**: entender fatores internos/externos e **partes interessadas** relevantes.
- **Liderança**: comprometimento da alta direção, política e papéis definidos.
- **Planejamento**: tratamento de **riscos e oportunidades**.
- **Apoio**: recursos, competência, comunicação, informação documentada.
- **Operação**: controle dos processos operacionais.
- **Avaliação de desempenho**: monitoramento, auditoria interna, análise crítica.
- **Melhoria**: tratamento de não conformidades e melhoria contínua.

## 3. Auditoria interna: evidência objetiva, não inspeção punitiva

A **auditoria** é um processo sistemático de buscar **evidência objetiva** e compará-la com um **critério de auditoria** (norma, procedimento, requisito legal) para determinar em que medida ele é atendido. Um erro comum é tratar auditoria como sinônimo de "fiscalização para punir" — na verdade, seu propósito é **verificar conformidade e identificar oportunidades de melhoria**, com base em evidências (registros, entrevistas, observação), não em opiniões ou suposições.

## 4. Correção x ação corretiva — a distinção mais cobrada do código

Ao identificar uma **não conformidade** (descumprimento de um requisito), duas ações diferentes podem ser tomadas, e a banca adora cobrar a diferença entre elas:

- **Correção**: ação para **eliminar a não conformidade já detectada** — resolve o sintoma imediato (ex.: descartar o lote de produto fora da especificação).
- **Ação corretiva**: ação para **eliminar a causa** da não conformidade, de forma a **evitar sua recorrência** — ataca a raiz do problema (ex.: recalibrar o equipamento que produziu o lote fora da especificação).

**Regra de ouro**: correção resolve o problema que já aconteceu; ação corretiva impede que ele aconteça de novo.

## 5. Ciclo PDCA: a lógica da melhoria contínua

O **PDCA** (Plan-Do-Check-Act / Planejar-Executar-Verificar-Agir) é o ciclo básico de gestão de processos e melhoria contínua:

- **P (Planejar)**: definir objetivos e processos necessários para entregar resultados.
- **D (Executar/Fazer)**: implementar o que foi planejado.
- **C (Verificar/Checar)**: monitorar e medir os resultados em relação ao planejado.
- **A (Agir)**: tomar ações para melhorar continuamente o desempenho — pode significar padronizar o que deu certo ou corrigir o que não funcionou.

O PDCA se repete em ciclos sucessivos, cada volta consolidando o que funcionou e ajustando o que não funcionou — é a espinha dorsal da lógica de melhoria contínua em qualquer sistema de gestão (ISO 9001, 14001, 45001).

## 6. Gestão de riscos e oportunidades (lógica atual das normas ISO)

Nas versões atuais das normas de sistema de gestão, a **prevenção** deixou de ser um capítulo isolado e passou a ser **incorporada ao planejamento e aos controles** desde o início, por meio do conceito de **risco** — o efeito da incerteza sobre os objetivos. Importante: a lógica atual trata risco e **oportunidade** como duas faces do mesmo processo de planejamento — não é só sobre evitar o que pode dar errado, mas também aproveitar o que pode dar certo.

## 7. Ferramentas de controle estatístico da qualidade

Além da estrutura de gestão, o código cobre ferramentas técnicas usadas no controle da qualidade em processos produtivos:

- **Amostragem estatística**: técnica de **controle estatístico de qualidade** (inspeção por amostragem) — em vez de inspecionar 100% da produção, inspeciona-se uma amostra representativa e infere-se sobre o lote inteiro. É a ferramenta especificamente estatística entre as opções de inspeção de qualidade (diferente de inspeção simples, instrução ou treinamento, que não são técnicas estatísticas).
- **Cartas de controle** (controle estatístico de processo): ferramenta gráfica que monitora a **estabilidade de um processo produtivo ao longo do tempo**, sinalizando quando uma variação relevante (**causa especial**, diferente da variação normal/aleatória do processo) afeta a qualidade — seu propósito central é **indicar quando o processo mudou** de forma a comprometer a qualidade, não diagnosticar a causa em si, nem desenvolver normas, nem tratar de clima organizacional.
  - **Cartas de variáveis**: monitoram grandezas mensuráveis em escala contínua (peso, comprimento, temperatura).
  - **Cartas de atributos**: monitoram características discretas (conforme/não conforme, número de defeitos por unidade).
- **Kaizen**: filosofia japonesa de **melhoria contínua e gradual** dos processos — se contrapõe à **reengenharia**, que promove mudanças **radicais e abruptas**. Kaizen é sobre pequenos ajustes constantes; reengenharia é sobre reconstruir do zero.

## Síntese

O AC-02 combina a lógica estrutural de um SGI (contexto, riscos, PDCA, auditoria) com a distinção fina entre correção e ação corretiva, e com ferramentas técnicas de controle estatístico (amostragem, cartas de controle, Kaizen x reengenharia). A pegadinha mais recorrente é a banca descrever o propósito de uma ferramenta e oferecer nomes de ferramentas vizinhas como distratores.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Sistema de Gestão Integrado — AC-02))
    SGI
      Integra qualidade, ambiente, SST
      Evita sistemas paralelos
    Auditoria
      Evidencia objetiva x criterio
      Nao e inspecao punitiva
    Correcao x Acao Corretiva
      Correcao: elimina o sintoma
      Acao corretiva: elimina a causa
    PDCA
      Planejar, Executar, Verificar, Agir
    Riscos e oportunidades
      Prevencao incorporada ao planejamento
    Ferramentas estatisticas
      Amostragem: inspecao por amostra
      Cartas de controle: sinaliza mudanca no processo
      Kaizen: melhoria gradual x Reengenharia: radical
\`\`\``,
  mustMemorize: [
    `SGI integra requisitos e processos comuns (qualidade, ambiente, SST), evitando sistemas paralelos desconectados.`,
    `Auditoria busca evidência objetiva e compara com um critério; não é inspeção punitiva.`,
    `Correção elimina a não conformidade JÁ DETECTADA; ação corretiva elimina a CAUSA para evitar recorrência.`,
    `PDCA = Planejar, Executar (fazer), Verificar (checar), Agir — ciclo repetido de melhoria contínua.`,
    `Na lógica atual das normas ISO, prevenção é incorporada ao planejamento via gestão de riscos E oportunidades.`,
    `Amostragem estatística = ferramenta de controle estatístico de QUALIDADE (inspeção por amostra).`,
    `Cartas de controle = ferramenta de controle estatístico de PROCESSO; sinalizam quando o processo mudou de forma a afetar a qualidade.`,
    `Kaizen = melhoria contínua e gradual. Reengenharia = mudança radical e abrupta.`,
  ],
  workedExamples: [
    `Amostragem estatística é a ferramenta de controle estatístico de qualidade (inspeção por amostragem) — diferente de inspeção simples, instrução ou treinamento, que não são técnicas estatísticas.`,
    `As cartas de controle (controle estatístico de processo) servem para monitorar a estabilidade de um processo produtivo e sinalizar quando uma variação relevante (causa especial) afeta a qualidade — seu propósito central é indicar a MUDANÇA, não diagnosticar a causa nem desenvolver normas.`,
    `Kaizen é a filosofia japonesa de melhoria contínua e gradual dos processos, em contraposição a mudanças radicais (reengenharia).`,
    `Cartas de controle de variáveis monitoram grandezas mensuráveis em escala contínua (ex.: peso, comprimento), enquanto cartas de atributos monitoram características discretas (conforme/não conforme, número de defeitos).`,
  ],
  commonMistakes: [
    `Confundir correção (elimina o sintoma já ocorrido) com ação corretiva (elimina a causa, evita recorrência) — são conceitos e ações distintas, não sinônimos.`,
    `Tratar auditoria interna como fiscalização punitiva — na verdade é um processo de busca de evidência objetiva comparada a um critério, com foco em melhoria.`,
    `Achar que PDCA é linear e "termina" — na verdade é um CICLO que se repete continuamente, consolidando acertos e corrigindo desvios a cada volta.`,
    `Confundir amostragem estatística (ferramenta de controle de QUALIDADE) com cartas de controle (ferramenta de controle de PROCESSO) — propósitos diferentes.`,
    `Achar que cartas de controle servem para "determinar causas" de um problema — seu propósito é apenas SINALIZAR que o processo mudou; encontrar a causa é uma etapa posterior e distinta.`,
    `Confundir Kaizen (melhoria gradual e contínua) com reengenharia (mudança radical e abrupta) — são abordagens opostas de mudança organizacional.`,
    `Padrão observado no acervo real (AC-02-2012-CESGRANRIO-21): identificar amostragem estatística como a ferramenta de controle estatístico de qualidade entre opções não estatísticas (inspeção, instrução, treinamento, testagem).`,
    `Padrão observado no acervo real (AC-02-2012-CESGRANRIO-22): reconhecer que o propósito das cartas de controle é indicar quando o processo mudou de forma a afetar a qualidade, não outras funções (clima, saúde, normas, causas).`,
    `Padrão observado no acervo real (AC-02-2012-CESGRANRIO-23): identificar Kaizen como melhoria contínua/gradual, em contraposição à reengenharia (mudança radical).`,
    `Padrão observado no acervo real (AC-02-2012-CESGRANRIO-24): diferenciar cartas de controle de variáveis (grandezas contínuas) de cartas de atributos (características discretas).`,
  ],
  howBoardMightAsk: [
    `Pede para diferenciar correção de ação corretiva a partir de uma situação de não conformidade descrita.`,
    `Descreve o propósito de uma ferramenta de controle de qualidade/processo e pede seu nome técnico, com nomes de ferramentas vizinhas como distratores.`,
    `Pede a sequência ou significado das etapas do PDCA.`,
    `Contrasta Kaizen com reengenharia a partir da descrição do tipo de mudança (gradual x radical).`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `SGI integra qualidade, ambiente e SST sob uma única estrutura.`,
    `Auditoria = evidência objetiva x critério, não punição.`,
    `Correção = elimina o sintoma. Ação corretiva = elimina a causa.`,
    `PDCA = Planejar, Executar, Verificar, Agir — ciclo contínuo.`,
    `Amostragem = controle de qualidade. Cartas de controle = controle de processo (sinaliza mudança).`,
    `Kaizen = gradual. Reengenharia = radical.`,
  ],
  flashcards: [
    { front: "Diferença entre correção e ação corretiva?", back: "Correção elimina a não conformidade já detectada (o sintoma). Ação corretiva elimina a causa, para evitar que se repita." },
    { front: "O que significa cada letra do PDCA?", back: "Plan (Planejar), Do (Executar), Check (Verificar), Act (Agir) — ciclo repetido de melhoria contínua." },
    { front: "Qual o propósito principal das cartas de controle?", back: "Sinalizar quando um processo mudou de forma a afetar a qualidade (detectar causa especial de variação)." },
    { front: "Diferença entre Kaizen e reengenharia?", back: "Kaizen: melhoria contínua e gradual. Reengenharia: mudança radical e abrupta." },
  ],
  miniQuiz: [
    {
      statement: `Qual dos elementos corresponde a um conceito estatístico de controle de qualidade?`,
      options: [
        { key: "A", text: `Amostragem`, isCorrect: true, explanation: `Correto: amostragem estatística é a ferramenta de controle estatístico de qualidade (inspeção por amostragem) — diferente das demais opções, que são ações de gestão de qualidade não estritamente estatísticas.` },
        { key: "B", text: `Inspeção`, isCorrect: false, explanation: `Inspeção é um termo genérico de verificação de conformidade — não é, por si só, uma técnica estatística como a amostragem.` },
        { key: "C", text: `Instrução`, isCorrect: false, explanation: `Instrução refere-se a orientações/procedimentos de trabalho — não é uma ferramenta estatística de controle de qualidade.` },
        { key: "D", text: `Treinamento`, isCorrect: false, explanation: `Treinamento é uma ação de capacitação de pessoas — não é uma técnica estatística de controle de qualidade.` },
        { key: "E", text: `Testagem`, isCorrect: false, explanation: `Testagem é um termo genérico de verificação — não corresponde especificamente a uma ferramenta estatística como a amostragem.` },
      ],
    },
    {
      statement: `O principal propósito das cartas de controle consiste em`,
      options: [
        { key: "A", text: `indicar quando um processo mudou de maneira a afetar a qualidade.`, isCorrect: true, explanation: `Correto: as cartas de controle (controle estatístico de processo) monitoram a estabilidade de um processo produtivo e sinalizam quando uma variação relevante (causa especial) afeta a qualidade.` },
        { key: "B", text: `indicar mudanças no clima organizacional.`, isCorrect: false, explanation: `Clima organizacional é medido por pesquisas de clima/engajamento, não por cartas de controle, que são uma ferramenta estatística de processo produtivo.` },
        { key: "C", text: `indicar como o processo produtivo afeta a saúde dos trabalhadores.`, isCorrect: false, explanation: `Esse é o escopo de gestão de saúde e segurança ocupacional (SST), não o propósito das cartas de controle, que monitoram variação estatística de processo.` },
        { key: "D", text: `desenvolver normas para a qualidade.`, isCorrect: false, explanation: `Desenvolver normas é atividade de normatização/padronização — as cartas de controle monitoram um processo já existente, não criam normas.` },
        { key: "E", text: `determinar as causas de um problema.`, isCorrect: false, explanation: `As cartas de controle SINALIZAM que houve uma mudança relevante no processo — encontrar a causa raiz é uma etapa posterior e distinta (ex.: usando diagrama de Ishikawa), não o propósito da carta em si.` },
      ],
    },
  ],
};

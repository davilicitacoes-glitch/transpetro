import type { LessonContent } from "@/content/lessonTypes";

export const AC_21_SEGURANCA_INFORMACAO_LGPD: LessonContent = {
  slug: "ac-21-seguranca-informacao-lgpd",
  topicSlug: "ac-21-seguranca-informacao-lgpd",
  subjectSlug: "especificas",
  moduleSlug: "especificas-informatica",
  title: `Segurança da informação e LGPD`,
  learningObjective: `Dominar a tríade CID (confidencialidade/integridade/disponibilidade), os conceitos de ameaça/vulnerabilidade/risco, vetores de infecção por malware (anexos de desconhecidos), firewall e VPN, e a estrutura da LGPD (dado pessoal x sensível, controlador x operador x encarregado, bases legais) — a Cesgranrio gosta de dar um cenário de segurança e pedir o mecanismo de proteção correto, e de testar a definição literal de conceitos da LGPD.`,
  syllabusCodes: ["AC-21"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-21 — Segurança da Informação e LGPD

## 1. A tríade CID (Confidencialidade, Integridade, Disponibilidade)

- **Confidencialidade**: **limita o acesso** à informação apenas a quem é autorizado.
- **Integridade**: evita **alteração indevida** da informação — garante que o dado não foi modificado sem autorização.
- **Disponibilidade**: mantém o **acesso disponível** quando necessário — de nada adianta um dado confidencial e íntegro se ele não pode ser acessado quando preciso.
- **Autenticidade** (frequentemente somada à tríade): garante que a informação/usuário é realmente quem afirma ser.

## 2. Ameaça, vulnerabilidade, risco e controle

- **Ameaça**: um agente/evento que **pode explorar** uma vulnerabilidade e produzir impacto.
- **Vulnerabilidade**: uma **fraqueza** que pode ser explorada.
- **Risco**: considera a **combinação** de ameaça, vulnerabilidade e impacto **no contexto** específico — não é apenas "algo ruim pode acontecer", é a probabilidade e o impacto combinados de uma ameaça explorar uma vulnerabilidade real.
- **Controle**: medida implementada para reduzir risco (técnico, administrativo ou físico).

## 3. Vetores de ataque: engenharia social e anexos de e-mail

A **abertura de anexos de e-mails enviados por desconhecidos** é um dos **vetores clássicos** de infecção por malware/pragas eletrônicas (phishing, ransomware) — continua sendo o método de entrada mais comum, mesmo com toda a evolução de outras técnicas de ataque.

**Phishing** usa **engenharia social** — manipulação psicológica, não uma falha técnica — para obter uma ação do usuário (clicar em link, baixar anexo) ou informação sensível (senha, dados bancários) diretamente da vítima.

**Pegadinha clássica**: numa lista com abertura de anexos de desconhecidos, uso de antivírus, restrição de acesso, bloqueio P2P e uso de proxy — apenas o primeiro é um vetor de ATAQUE; os demais são medidas de PROTEÇÃO.

## 4. Firewall — o que ele faz

O **firewall** é o programa/dispositivo que **controla o tráfego de rede** para **impedir invasões e acessos não autorizados** — filtra pacotes de entrada/saída conforme regras definidas. É um conceito atemporal, presente inclusive nas versões atuais do Windows (Windows Defender Firewall) e nas políticas de segurança corporativas.

## 5. VPN — conexão segura remota

A **VPN** (Virtual Private Network) estabelece uma **conexão segura e criptografada** entre o computador remoto de um funcionário e a **intranet** da empresa, através da internet pública — **simula o acesso local** à rede corporativa, permitindo que o funcionário use recursos internos da empresa como se estivesse fisicamente no escritório, mesmo estando remoto.

## 6. Senhas, MFA, backup e atualização

- **MFA** (Multi-Factor Authentication/autenticação multifator): exige mais de um fator de verificação (senha + código, senha + biometria) — **reduz o dano** de uma senha comprometida, pois o atacante precisaria também do segundo fator para invadir.
- **Backup** e **atualização de software** são controles básicos e contínuos: backup protege contra perda de dados; atualização corrige vulnerabilidades já conhecidas antes que sejam exploradas.

## 7. LGPD: dado pessoal x dado sensível

A **LGPD** (Lei nº 13.709/2018) protege dados de **pessoa natural identificada ou identificável** — o dado pessoal é qualquer informação relacionada a uma pessoa física que possa identificá-la, direta ou indiretamente.

**Dado anonimizado**: pode **sair do regime da LGPD** se a **reversão** (voltar a identificar a pessoa a partir do dado anonimizado) **não for razoável** — se for tecnicamente fácil reverter a anonimização, o dado continua protegido.

**Dado sensível** é uma categoria especial, com proteção reforçada, que inclui: **origem racial ou étnica**, **convicção religiosa**, **opinião política**, **filiação a sindicato ou organização religiosa/política/filosófica**, dado referente à **saúde** ou à **vida sexual**, **dado genético** ou **biométrico** quando vinculado a uma pessoa natural.

## 8. Agentes de tratamento: controlador, operador e encarregado

- **Controlador**: **decide sobre o tratamento** dos dados pessoais — define finalidades e meios.
- **Operador**: **trata os dados em nome do controlador**, seguindo suas instruções — não decide sozinho a finalidade do tratamento.
- **Encarregado** (DPO — Data Protection Officer): atua como **canal de comunicação** entre controlador, titulares dos dados e a Autoridade Nacional de Proteção de Dados (ANPD), previsto na própria lei.

**Regra de decoreba**: controlador decide; operador executa por conta do controlador; encarregado é o canal de comunicação/conformidade.

## 9. Bases legais para tratamento de dados

O **consentimento** é **uma das bases legais** para tratamento de dados pessoais previstas na LGPD, mas **não é a única** — existem outras bases (cumprimento de obrigação legal, execução de contrato, exercício regular de direitos, proteção da vida, entre outras). O tratamento de dados, independentemente da base legal usada, deve seguir princípios como **finalidade** (propósito específico e informado), **adequação**, **necessidade** (uso mínimo necessário), **transparência**, **segurança** e **responsabilização** (accountability).

**Pegadinha clássica**: achar que toda coleta de dado pessoal exige consentimento explícito — a lei prevê múltiplas bases legais alternativas ao consentimento.

## Síntese

O AC-21 combina fundamentos técnicos de segurança (CID, ameaça/vulnerabilidade/risco, firewall, VPN, MFA) com a estrutura legal da LGPD (dado pessoal x sensível, controlador x operador x encarregado, bases legais além do consentimento). A pegadinha mais recorrente mistura vetores de ataque com medidas de proteção, ou trata consentimento como a única base legal válida.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Segurança da Informação e LGPD — AC-21))
    Triade CID
      Confidencialidade: limita acesso
      Integridade: evita alteracao indevida
      Disponibilidade: mantem acesso quando necessario
    Ameaca, vulnerabilidade, risco
      Risco combina os tres no contexto
    Vetores de ataque
      Anexos de desconhecidos: vetor classico
      Phishing: engenharia social
    Protecoes
      Firewall: controla trafego de rede
      VPN: conexao segura remota
      MFA: reduz dano de senha comprometida
    LGPD
      Dado pessoal: pessoa identificavel
      Dado sensivel: raca, religiao, saude, biometria
      Anonimizado: fora do regime se reversao nao razoavel
    Agentes
      Controlador: decide
      Operador: executa por conta do controlador
      Encarregado: canal de comunicacao
    Bases legais
      Consentimento e uma das varias bases
\`\`\``,
  mustMemorize: [
    `Confidencialidade limita acesso; integridade evita alteração indevida; disponibilidade mantém acesso quando necessário.`,
    `Risco = combinação de ameaça + vulnerabilidade + impacto NO CONTEXTO — não é só "algo ruim pode acontecer".`,
    `Abertura de anexos de desconhecidos é VETOR DE ATAQUE; antivírus, restrição de acesso, bloqueio P2P e proxy são MEDIDAS DE PROTEÇÃO.`,
    `Firewall controla tráfego de rede para impedir invasões. VPN estabelece conexão segura/criptografada simulando acesso local à intranet.`,
    `MFA reduz o dano de uma senha comprometida (exige segundo fator).`,
    `LGPD protege dados de pessoa natural IDENTIFICADA ou IDENTIFICÁVEL. Dado anonimizado sai do regime SE a reversão não for razoável.`,
    `Dado sensível: origem racial/étnica, religião, opinião política, saúde, vida sexual, dado genético/biométrico.`,
    `Controlador DECIDE; operador EXECUTA em nome do controlador; encarregado é o CANAL de comunicação (DPO).`,
    `Consentimento é UMA das bases legais da LGPD, não a única.`,
  ],
  workedExamples: [
    `A abertura de anexos de e-mails de remetentes desconhecidos é um dos vetores clássicos de infecção por malware/pragas eletrônicas (phishing, ransomware), diferentemente das demais alternativas, que são medidas de proteção (antivírus, restrição de acesso, bloqueio P2P, proxy).`,
    `O firewall é o programa/dispositivo que controla o tráfego de rede para impedir invasões e acessos não autorizados; conceito atemporal, ainda presente no Windows atual (Windows Defender Firewall) e nas políticas de segurança corporativas.`,
    `A VPN (Virtual Private Network) estabelece uma conexão segura e criptografada entre o computador remoto do funcionário e a intranet da empresa através da internet, simulando o acesso local à rede corporativa.`,
    `Dado sensível inclui origem racial/étnica, convicção religiosa, opinião política, dado referente à saúde ou vida sexual, dado genético ou biométrico vinculado à pessoa — categoria com proteção reforçada na LGPD.`,
  ],
  commonMistakes: [
    `Confundir vetor de ataque (abertura de anexo de desconhecido) com medida de proteção (antivírus, restrição de acesso) — são categorias opostas.`,
    `Achar que risco é só "a ameaça existe" — risco combina ameaça, vulnerabilidade E impacto, avaliados no contexto específico.`,
    `Confundir firewall (controla tráfego de rede) com antivírus (remove código malicioso já presente) — atuam em frentes diferentes.`,
    `Achar que VPN só criptografa dados, sem simular acesso à rede interna — a VPN também dá acesso aos recursos da intranet como se o usuário estivesse fisicamente lá.`,
    `Achar que a LGPD protege qualquer dado, inclusive anonimizado sem possibilidade de reversão — dados anonimizados de forma irreversível SAEM do regime da lei.`,
    `Confundir controlador (decide) com operador (executa por conta do controlador) — são papéis com responsabilidades distintas na LGPD.`,
    `Achar que consentimento é a ÚNICA base legal para tratamento de dados pessoais — a LGPD prevê múltiplas bases legais alternativas.`,
    `Padrão observado no acervo real (AC-21-2012-CESGRANRIO-58): identificar a abertura de anexos de desconhecidos como vetor de ataque, entre distratores que são medidas de proteção.`,
    `Padrão observado no acervo real (AC-21-2012-CESGRANRIO-59): reconhecer o firewall como o programa que controla tráfego de rede para impedir invasões, descartando administrador/decodificador/host/script como distratores.`,
    `Padrão observado no acervo real (AC-21-2018-CESGRANRIO-58): identificar a VPN como a solução que estabelece conexão segura e criptografada simulando acesso local à intranet corporativa.`,
  ],
  howBoardMightAsk: [
    `Lista atividades/ferramentas e pede qual é vetor de ataque, entre distratores que são medidas de proteção.`,
    `Descreve o propósito de uma ferramenta de segurança (controlar tráfego, criptografar acesso remoto) e pede seu nome, com termos genéricos como distratores.`,
    `Pede a definição de dado pessoal, dado sensível, ou o papel de controlador/operador/encarregado na LGPD.`,
    `Testa se consentimento é a única base legal de tratamento de dados pessoais.`,
  ],
  legalReferences: [
    { title: "Lei nº 13.709/2018 (LGPD)", note: "Lei Geral de Proteção de Dados Pessoais — dado pessoal, dado sensível, agentes de tratamento, bases legais e princípios." },
  ],
  reviewSummaryPoints: [
    `CID: confidencialidade limita, integridade evita alteração, disponibilidade mantém acesso.`,
    `Risco = ameaça + vulnerabilidade + impacto no contexto.`,
    `Anexo de desconhecido = vetor de ataque. Antivírus/firewall/proxy = proteção.`,
    `Firewall controla tráfego de rede. VPN simula acesso local à intranet via conexão criptografada.`,
    `LGPD: pessoa identificável; dado sensível tem lista específica; controlador decide, operador executa, encarregado é o canal.`,
    `Consentimento é uma base legal entre várias, não a única.`,
  ],
  flashcards: [
    { front: "O que garante cada pilar da tríade CID?", back: "Confidencialidade: limita acesso. Integridade: evita alteração indevida. Disponibilidade: mantém acesso quando necessário." },
    { front: "O que faz uma VPN?", back: "Estabelece conexão segura e criptografada entre um computador remoto e a intranet da empresa, simulando acesso local à rede corporativa." },
    { front: "Diferença entre controlador e operador na LGPD?", back: "Controlador decide sobre o tratamento (finalidades e meios). Operador trata os dados em nome do controlador, seguindo suas instruções." },
    { front: "Consentimento é a única base legal da LGPD para tratamento de dados?", back: "Não — é uma das várias bases legais previstas (também há cumprimento de obrigação legal, execução de contrato, entre outras)." },
  ],
  miniQuiz: [
    {
      statement: `As informações em mídia digital de empresas que, entre outras atividades, possuem acesso à internet em suas intranets, são alvos constantes de ataques por meio de pragas eletrônicas.

Dentre as atividades que podem ser agentes facilitadores desses ataques, inclui-se a(o)`,
      options: [
        { key: "A", text: `abertura de anexos de e-mails enviados por desconhecidos`, isCorrect: true, explanation: `Correto: a abertura de anexos de e-mails de remetentes desconhecidos é um dos vetores clássicos de infecção por malware/pragas eletrônicas — diferentemente das demais alternativas, que são medidas de proteção.` },
        { key: "B", text: `execução programada de softwares de antivírus`, isCorrect: false, explanation: `A execução programada de antivírus é uma MEDIDA DE PROTEÇÃO contra pragas eletrônicas, não um facilitador de ataque.` },
        { key: "C", text: `limitação de acesso a sites fornecedores de downloads`, isCorrect: false, explanation: `Limitar o acesso a sites de download é uma medida de PREVENÇÃO contra infecção, não um facilitador de ataque.` },
        { key: "D", text: `bloqueio de programas P2P(peer-to-peer)`, isCorrect: false, explanation: `Bloquear programas P2P é uma medida de PROTEÇÃO, já que esses programas são um vetor conhecido de propagação de malware — bloqueá-los reduz o risco, não o aumenta.` },
        { key: "E", text: `uso de proxy servers`, isCorrect: false, explanation: `O uso de servidores proxy é frequentemente uma medida de CONTROLE/filtragem de tráfego, associada a proteção, não a facilitação de ataques.` },
      ],
    },
    {
      statement: `Sistemas operacionais, como o Windows, trazem, em suas versões atuais, um programa no qual um dos objetivos é ajudar a impedir a invasão por hackers ou softwares mal-intencionados aos computadores dos usuários, podendo pôr em risco as informações neles contidas.

Esse tipo de programa consta, normalmente, nas políticas de proteção e segurança das empresas e é conhecido como`,
      options: [
        { key: "A", text: `administrador`, isCorrect: false, explanation: `"Administrador" é um tipo de conta/perfil de usuário com privilégios elevados — não é um programa de proteção contra invasões.` },
        { key: "B", text: `decodificador`, isCorrect: false, explanation: `"Decodificador" não é um termo técnico de segurança para essa função de controle de tráfego e prevenção de invasões.` },
        { key: "C", text: `firewall`, isCorrect: true, explanation: `Correto: o firewall é o programa/dispositivo que controla o tráfego de rede para impedir invasões e acessos não autorizados, presente nas versões atuais do Windows (Windows Defender Firewall).` },
        { key: "D", text: `host`, isCorrect: false, explanation: `"Host" é o termo genérico para um computador/dispositivo conectado a uma rede — não é um programa de proteção contra invasões.` },
        { key: "E", text: `script`, isCorrect: false, explanation: `"Script" é um conjunto de instruções automatizadas — não é, por si só, um programa de proteção contra invasões de hackers.` },
      ],
    },
  ],
};

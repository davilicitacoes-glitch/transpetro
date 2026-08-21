import type { LessonContent } from "@/content/lessonTypes";

export const AC_18_FUNDAMENTOS_COMPUTACAO: LessonContent = {
  slug: "ac-18-fundamentos-computacao",
  topicSlug: "ac-18-fundamentos-computacao",
  subjectSlug: "especificas",
  moduleSlug: "especificas-informatica",
  title: `Fundamentos de computação (Windows 11)`,
  learningObjective: `Diferenciar CPU/RAM/armazenamento, entender o papel do sistema operacional na gestão de recursos, dominar arquivos/pastas/atalhos/Lixeira, e reconhecer as funcionalidades nativas de segurança do Windows 11 (Secure Boot, Windows Defender Firewall, BitLocker, UAC) e conceitos correlatos (firewall, antimalware) — a Cesgranrio gosta de descrever um cenário de segurança concreto e pedir a configuração/ferramenta tecnicamente correta.`,
  syllabusCodes: ["AC-18"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-18 — Fundamentos de Computação e Windows 11

## 1. Hardware básico: CPU, RAM e armazenamento

- **CPU** (unidade central de processamento): **executa instruções** — é o "cérebro" que processa os cálculos e comandos.
- **RAM**: memória **volátil** — perde todo o conteúdo quando a energia é desligada; usada para dados e programas em uso ativo, por ser muito mais rápida que o armazenamento permanente.
- **Armazenamento** (HD/SSD): **preserva dados sem energia** — é onde ficam os arquivos entre uma sessão e outra do computador.

**Consequência prática**: se o computador desliga inesperadamente, o que estava só na RAM (um documento não salvo) se perde; o que já foi salvo no armazenamento permanece.

## 2. Núcleos, threads e clock — desempenho não é uma variável só

- **Núcleos (cores)**: unidades físicas de execução dentro do processador — mais núcleos permitem processar mais tarefas verdadeiramente em paralelo.
- **Threads**: fluxos lógicos de execução — um núcleo pode gerenciar múltiplas threads (ex.: com Hyper-Threading), simulando paralelismo adicional.
- **Clock** (frequência): velocidade de execução de cada núcleo, medida em GHz.

**Pegadinha clássica**: achar que o clock **sozinho** determina o desempenho — na prática, número de núcleos, arquitetura, cache e a natureza da tarefa (paralelizável ou não) também importam tanto quanto ou mais que o clock isolado.

## 3. O papel do sistema operacional

O **sistema operacional** é o software que **gerencia todos os recursos** do computador: hardware (CPU, memória, periféricos), processos em execução, memória alocada a cada programa, sistema de arquivos, contas de usuário e a interface com o usuário. Ele é a camada intermediária entre o hardware físico e os programas/aplicativos que o usuário utiliza.

## 4. Arquivos, extensões, caminhos e atalhos

- Um **arquivo**, do ponto de vista técnico dos sistemas operacionais, é uma **coleção nomeada de informações relacionadas, gravada em memória secundária** (disco) — essa é a definição formal usada em teoria de sistemas operacionais.
- **Extensão** (.docx, .pdf, .exe): ajuda a identificar o **formato** do arquivo, mas **não garante** que o conteúdo seja seguro — um arquivo malicioso pode ter extensão de aparência inofensiva (ex.: disfarçado como .pdf.exe).
- **Caminho** (path): localiza um arquivo dentro da hierarquia de pastas (ex.: C:\\Usuarios\\Nome\\Documentos\\arquivo.docx).
- **Atalho**: um ponteiro que **aponta para** o arquivo/programa original — **não é o próprio arquivo**. Apagar um atalho não apaga o item original; mover ou renomear o item original pode quebrar o atalho.

## 5. Lixeira e exclusão de arquivos

- **Excluir para a Lixeira** (Delete simples): o arquivo vai para a Lixeira e pode ser **restaurado** posteriormente.
- **Shift+Delete**: tende a **ignorar a Lixeira**, excluindo o arquivo de forma mais direta (embora ainda recuperável por ferramentas forenses especializadas em alguns casos, não pelo fluxo normal do usuário).

## 6. Backup x sincronização

- **Backup**: uma **cópia recuperável** dos dados, guardada separadamente, pensada especificamente para restauração em caso de perda.
- **Sincronização** (ex.: OneDrive, Google Drive espelhando pastas): mantém cópias **atualizadas** entre dispositivos, mas **não substitui um backup por si só** — se um arquivo é corrompido ou apagado por engano, a sincronização pode propagar esse mesmo erro para todas as cópias sincronizadas, ao contrário de um backup versionado que preserva um ponto anterior no tempo.

## 7. Segurança no Windows 11 — funcionalidades nativas

O Windows 11 traz recursos nativos de segurança que devem ser **habilitados**, não desabilitados, em ambientes que exigem proteção (como uma agência bancária processando operações diárias):

- **Secure Boot (Inicialização Segura)**: verifica a integridade do processo de boot, impedindo que malware seja carregado antes do sistema operacional.
- **Windows Defender Firewall**: filtra o tráfego de rede de entrada/saída conforme regras.
- **BitLocker**: criptografa o disco — **desabilitá-lo** reduz a proteção dos dados armazenados, não deve ser feito num cenário que exige segurança.
- **UAC (Controle de Conta de Usuário)**: solicita confirmação para ações que exigem privilégios elevados — **desabilitá-lo** (junto com ativar o Modo Desenvolvedor) reduz a segurança, permitindo mudanças no sistema sem aviso.

**Regra de prova**: num cenário que pede "aumentar a segurança sem comprometer o desempenho", a resposta certa **habilita** Secure Boot e Windows Defender Firewall — não desabilita BitLocker/UAC, nem depende de soluções de terceiros ou de configurações extremas (modo de segurança para todos os usuários, desativar atualizações automáticas).

## 8. Firewall x Antimalware x ameaças

- **Firewall**: solução de hardware e/ou software que **filtra o tráfego de rede** segundo regras predefinidas — atua na **borda**, decidindo o que entra/sai da rede/máquina.
- **Antimalware**: foca em detectar e remover **código malicioso já presente** no sistema (vírus, trojans, ransomware) — atua **depois** que algo já pode ter chegado.
- **Phishing**: técnica de engenharia social para enganar o usuário e obter dados sensíveis — é uma **ameaça**, não uma solução de proteção.
- **SQL injection**: técnica de ataque que explora falhas de validação de entrada em aplicações que usam banco de dados — também é uma **ameaça**, não uma ferramenta de defesa.

**Regra de decoreba**: firewall filtra tráfego de **rede**; antimalware combate código malicioso **já instalado**; phishing e SQL injection são **ataques**, nunca soluções.

## Síntese

O AC-18 combina fundamentos de hardware (CPU/RAM/armazenamento, núcleos/threads/clock) com conceitos de sistema operacional (arquivos, atalhos, Lixeira, backup) e segurança prática do Windows 11 (Secure Boot, Firewall, BitLocker, UAC, firewall x antimalware). A pegadinha mais recorrente é a banca oferecer alternativas que **desabilitam** proteções nativas como se fossem boas práticas de segurança.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Fundamentos de Computação — AC-18))
    Hardware
      CPU: executa instrucoes
      RAM: volatil
      Armazenamento: preserva sem energia
      Nucleos, threads, clock
    Sistema Operacional
      Gerencia hardware, processos, memoria, arquivos
    Arquivos
      Extensao: nao garante seguranca
      Caminho: localizacao hierarquica
      Atalho: aponta, nao e o arquivo
      Lixeira x Shift+Delete
    Backup x Sincronizacao
      Backup: copia recuperavel
      Sincronizacao: nao substitui backup
    Seguranca Windows 11
      Secure Boot, Defender Firewall: habilitar
      BitLocker, UAC: nao desabilitar
    Firewall x Antimalware
      Firewall: filtra trafego de rede
      Antimalware: remove codigo ja presente
      Phishing/SQL injection: ameacas, nao solucoes
\`\`\``,
  mustMemorize: [
    `CPU executa instruções; RAM é memória volátil; armazenamento preserva dados sem energia.`,
    `Clock sozinho NÃO determina desempenho — núcleos, threads e arquitetura também importam.`,
    `Arquivo (definição técnica) = coleção nomeada de informações relacionadas, gravada em memória secundária.`,
    `Extensão indica formato, mas NÃO garante conteúdo seguro. Atalho aponta para o item — não é o arquivo original.`,
    `Backup = cópia recuperável dedicada; sincronização NÃO substitui backup (propaga erros/exclusões entre cópias).`,
    `Em cenário de segurança, HABILITAR Secure Boot e Windows Defender Firewall; NUNCA desabilitar BitLocker ou UAC.`,
    `Firewall filtra tráfego de REDE; antimalware remove código malicioso JÁ PRESENTE; phishing e SQL injection são ameaças, não soluções.`,
  ],
  workedExamples: [
    `A inicialização segura (Secure Boot) e o Windows Defender Firewall são funcionalidades nativas do Windows 11 que aumentam a segurança sem comprometer o desempenho — diferente de desabilitar BitLocker/UAC ou usar soluções inadequadas ao cenário.`,
    `O firewall é uma solução de hardware e/ou software que filtra o tráfego de rede segundo regras predefinidas, distinguindo-se de antimalware (foco em código malicioso já presente) e de ameaças como phishing e SQL injection.`,
    `Do ponto de vista técnico dos sistemas operacionais, um arquivo é definido como uma coleção nomeada de informações relacionadas, gravada em memória secundária (disco).`,
    `Ativar o Modo Desenvolvedor e desabilitar o UAC, ou desabilitar o BitLocker, são configurações que REDUZEM a segurança — nunca a resposta correta num cenário que pede reforço de proteção.`,
  ],
  commonMistakes: [
    `Achar que clock alto sozinho garante melhor desempenho — número de núcleos, threads e arquitetura também são decisivos.`,
    `Confundir atalho com o arquivo original — apagar o atalho não apaga o arquivo; mover o arquivo original pode quebrar o atalho.`,
    `Achar que a extensão do arquivo garante que o conteúdo é seguro — um malware pode se disfarçar com extensão de aparência inofensiva.`,
    `Tratar sincronização (OneDrive, Google Drive) como equivalente a backup — sincronização propaga exclusões/corrupções entre as cópias; backup preserva um ponto anterior no tempo.`,
    `Escolher alternativas que desabilitam BitLocker, UAC ou ativam Modo Desenvolvedor como "boas práticas de segurança" — são exatamente o oposto: reduzem a proteção do sistema.`,
    `Confundir firewall (filtra tráfego de rede) com antimalware (remove código já presente) — atuam em momentos e frentes diferentes.`,
    `Tratar phishing ou SQL injection como soluções de segurança — são ameaças/ataques, nunca ferramentas de proteção.`,
    `Padrão observado no acervo real (AC-18-2025-CESGRANRIO-28): identificar Secure Boot + Windows Defender Firewall como a configuração que aumenta segurança sem comprometer desempenho, descartando alternativas que desabilitam BitLocker/UAC.`,
    `Padrão observado no acervo real (AC-18-2021-CESGRANRIO-41): reconhecer o firewall como a solução que filtra tráfego de rede por regras, diferenciando-o de antimalware, phishing e SQL injection.`,
    `Padrão observado no acervo real (AC-18-2021-CESGRANRIO-42): aplicar a definição técnica de arquivo (coleção nomeada de informações, gravada em memória secundária).`,
  ],
  howBoardMightAsk: [
    `Descreve um cenário que exige reforço de segurança sem perder desempenho e pede a configuração correta do Windows 11, com distratores que desabilitam proteções nativas.`,
    `Pede para diferenciar firewall, antimalware e ameaças (phishing, SQL injection) a partir da descrição do que cada um faz.`,
    `Pede a definição técnica formal de arquivo, extensão, caminho ou atalho.`,
    `Pergunta se sincronização substitui backup, ou pede para diferenciar excluir para a Lixeira de Shift+Delete.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `CPU executa; RAM é volátil; armazenamento preserva sem energia.`,
    `Clock não determina desempenho sozinho.`,
    `Extensão não garante segurança; atalho não é o arquivo.`,
    `Backup ≠ sincronização.`,
    `Habilitar Secure Boot/Firewall; nunca desabilitar BitLocker/UAC.`,
    `Firewall filtra rede; antimalware remove código já presente; phishing/SQL injection são ameaças.`,
  ],
  flashcards: [
    { front: "Diferença entre RAM e armazenamento?", back: "RAM é memória volátil (perde dados sem energia). Armazenamento (HD/SSD) preserva os dados mesmo desligado." },
    { front: "A extensão de um arquivo garante que o conteúdo é seguro?", back: "Não — a extensão só indica o formato esperado; malware pode se disfarçar com extensão de aparência inofensiva." },
    { front: "Sincronização (OneDrive/Google Drive) substitui backup?", back: "Não — sincronização propaga exclusões/corrupções entre as cópias; backup preserva um ponto anterior recuperável." },
    { front: "Diferença entre firewall e antimalware?", back: "Firewall filtra tráfego de rede por regras. Antimalware detecta/remove código malicioso já presente no sistema." },
  ],
  miniQuiz: [
    {
      statement: `Um técnico bancário precisa garantir a segurança e a eficiência no uso de computadores com o sistema operacional Windows 11 em uma agência bancária. Durante a instalação e a configuração do sistema operacional, ele é solicitado a habilitar funcionalidades que aumentem a segurança, sem comprometer o desempenho da máquina, considerando-se que ela realiza grande número de operações bancárias diárias.

Para atingir esse objetivo, na instalação do Windows 11 nesses computadores, o técnico deve configurá-lo de forma a`,
      options: [
        { key: "A", text: `ativar o Hyper-V e desabilitar o Bit-Locker.`, isCorrect: false, explanation: `Desabilitar o BitLocker REDUZ a segurança dos dados armazenados no disco — é o oposto do objetivo pedido no cenário.` },
        { key: "B", text: `ativar o Modo Desenvolvedor e desabilitar o Controle de Conta de Usuário (UAC).`, isCorrect: false, explanation: `Desabilitar o UAC remove a confirmação de ações privilegiadas, reduzindo a segurança — não aumenta proteção.` },
        { key: "C", text: `habilitar a inicialização segura (Secure Boot) e o Windows Defender Firewall.`, isCorrect: true, explanation: `Correto: Secure Boot e Windows Defender Firewall são funcionalidades nativas do Windows 11 que aumentam a segurança sem comprometer o desempenho, ao contrário das demais alternativas, que desabilitam mecanismos de proteção ou trazem soluções inadequadas ao cenário.` },
        { key: "D", text: `desativar as atualizações automáticas e utilizar uma solução antivírus de terceiros.`, isCorrect: false, explanation: `Desativar atualizações automáticas deixa o sistema vulnerável a falhas já corrigidas pelo fabricante — reduz, não aumenta, a segurança.` },
        { key: "E", text: `iniciar diretamente no modo de segurança para todos os usuários.`, isCorrect: false, explanation: `O modo de segurança é um ambiente de diagnóstico com recursos limitados — não é uma configuração viável para operação diária de uma agência bancária.` },
      ],
    },
    {
      statement: `Existem soluções de hardware e software que buscam minimizar as chances de um ataque a sistemas computacionais ser bem-sucedido. Dentre tais soluções de segurança, há uma que monitora o tráfego de entrada e saída de rede, funcionando como um filtro de pacotes, permitindo ou não a sua liberação a partir de um conjunto de regras específicas.

Essa solução é o`,
      options: [
        { key: "A", text: `Antimalware`, isCorrect: false, explanation: `O antimalware foca em detectar e remover código malicioso já presente no sistema — não atua como filtro de pacotes de rede.` },
        { key: "B", text: `Dispositivo USB`, isCorrect: false, explanation: `Um dispositivo USB é um periférico de armazenamento/conexão — não tem relação com filtragem de tráfego de rede.` },
        { key: "C", text: `Firewall`, isCorrect: true, explanation: `Correto: o firewall é a solução de hardware e/ou software que filtra o tráfego de rede segundo regras predefinidas, distinguindo-se de antimalware (foco em código já presente) e de ameaças como phishing e SQL injection.` },
        { key: "D", text: `Phishing`, isCorrect: false, explanation: `Phishing é uma técnica de ataque (engenharia social para roubo de dados) — é uma ameaça, não uma solução de segurança.` },
        { key: "E", text: `SQL injection`, isCorrect: false, explanation: `SQL injection é uma técnica de ataque que explora falhas de validação em aplicações com banco de dados — é uma ameaça, não uma ferramenta de proteção.` },
      ],
    },
  ],
};

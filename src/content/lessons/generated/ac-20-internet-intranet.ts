import type { LessonContent } from "@/content/lessonTypes";

export const AC_20_INTERNET_INTRANET: LessonContent = {
  slug: "ac-20-internet-intranet",
  topicSlug: "ac-20-internet-intranet",
  subjectSlug: "especificas",
  moduleSlug: "especificas-informatica",
  title: `Internet e intranet`,
  learningObjective: `Diferenciar internet, web e intranet, dominar DNS/URL/HTTP/HTTPS, entender plugins/extensões de navegador, quem define o limite de tamanho de anexos de e-mail, e reconhecer os principais navegadores — a Cesgranrio gosta de dar um cenário concreto de uso do navegador/e-mail e pedir o termo técnico ou o responsável correto por uma restrição.`,
  syllabusCodes: ["AC-20"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-20 — Internet e Intranet

## 1. Internet, web e intranet — a distinção base

- **Internet**: a **rede global** de computadores interconectados.
- **Web (World Wide Web)**: um **serviço de hipertexto** que opera **sobre** a internet — não é sinônimo de internet, é um dos serviços que rodam nela (junto com e-mail, FTP, etc.).
- **Intranet**: usa as **mesmas tecnologias** da internet (protocolos, navegador), mas em um **ambiente restrito** — acessível apenas dentro da organização, não publicamente.

## 2. URL, domínio e DNS

Uma **URL** completa contém: **esquema** (http/https), **host** (domínio ou IP), possivelmente **porta**, **caminho** (path), **consulta** (query string, após o sinal de interrogação) e **fragmento** (após o caractere #).

O **DNS** (Domain Name System) **traduz nomes de domínio em endereços de rede** (IP) — é o que permite digitar "google.com" em vez de decorar um número IP.

## 3. HTTP x HTTPS

**HTTPS** é o protocolo **HTTP protegido por TLS** (criptografia em trânsito). Importante: o **cadeado do navegador** (indicando HTTPS) garante que a conexão está **criptografada**, mas **não garante a legitimidade do conteúdo** ou da identidade do site — um site malicioso também pode ter HTTPS e cadeado, só significa que ninguém está "espiando" a conexão, não que o site é confiável.

## 4. Plugins/extensões de navegador

**Plugins** (também chamados de **extensões/complementos**) são **ferramentas externas** que os navegadores gerenciam para executar **serviços adicionais** além das funções nativas do navegador (ex.: bloqueadores de anúncio, gerenciadores de senha, tradutores). São gerenciados pelo próprio navegador como um sistema de complementos instaláveis.

## 5. Cookies, cache e sessões

- **Cookie**: guarda **dados associados ao site** visitado (preferências, login), enviado de volta ao servidor em requisições futuras.
- **Cache**: armazena **recursos** (imagens, scripts, páginas) localmente para **acelerar o carregamento** em visitas futuras.
- **Sessão**: mantém o **estado de interação** do usuário durante o período em que está usando o site (ex.: itens no carrinho de compras).

## 6. Modo privado/anônimo — o que ele realmente faz

O **modo privado** (navegação anônima/InPrivate) **reduz rastros LOCAIS** (não salva histórico, cookies e cache permanentemente no computador usado) — mas **não torna o usuário anônimo** para a **rede** (o provedor de internet vê o tráfego), para o **site** visitado (que pode identificar por outros meios), nem para o **provedor** de internet. É proteção de privacidade local, não anonimato de rede.

## 7. Favoritos x Download

- **Favorito** (bookmark): salva uma **referência** (o endereço/link) — não faz cópia do conteúdo.
- **Download**: cria uma **cópia local** do arquivo, que deve estar sujeita a **verificação de segurança** antes de ser aberta (antimalware), já que arquivos baixados são um vetor comum de infecção.

## 8. Preenchimento de formulários e uso de e-mail via navegador

Dados de compra online (endereço, cartão) são preenchidos em **formulários HTML** exibidos pelo navegador — o navegador não "sabe" o conteúdo, apenas renderiza e envia o que o usuário digita nos campos do formulário definido pelo site.

**Tamanho máximo de anexos de e-mail**: é definido pelo **provedor de e-mail** (serviço de webmail/servidor) utilizado pelo **remetente** — não pela conexão de internet, pela estrutura do arquivo, pelo sistema operacional, nem pelo receptor da mensagem. Cada provedor (Gmail, Outlook, etc.) impõe seu próprio limite de tamanho total de anexo.

## 9. Principais navegadores

É importante reconhecer os principais navegadores de internet (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) e não confundi-los com outras categorias de software: leitor de PDF, editor de publicações, cliente de e-mail dedicado (Outlook desktop) e gerenciador de arquivos são categorias **distintas** de navegador, mesmo que às vezes integradas ou usadas em conjunto.

## Síntese

O AC-20 exige distinguir internet/web/intranet, entender a estrutura de URL e o papel do DNS, saber o que HTTPS realmente garante (e o que não garante), reconhecer plugins/cookies/cache/sessão, entender os limites reais do modo privado, e saber que o limite de anexo de e-mail é definido pelo provedor do remetente.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Internet e Intranet — AC-20))
    Internet x Web x Intranet
      Internet: rede global
      Web: servico de hipertexto sobre a internet
      Intranet: mesma tecnologia, ambiente restrito
    URL e DNS
      Esquema, host, porta, caminho, consulta, fragmento
      DNS traduz nome em IP
    HTTP x HTTPS
      Cadeado garante criptografia, NAO legitimidade
    Plugins
      Extensoes/complementos gerenciados pelo navegador
    Cookie x Cache x Sessao
      Cookie: dados do site
      Cache: recursos p/ velocidade
      Sessao: estado de interacao
    Modo privado
      Reduz rastros locais, NAO anonimato de rede
    E-mail
      Limite de anexo definido pelo PROVEDOR do remetente
\`\`\``,
  mustMemorize: [
    `Internet = rede global. Web = serviço de hipertexto SOBRE a internet. Intranet = mesma tecnologia, ambiente RESTRITO.`,
    `DNS traduz nomes de domínio em endereços IP.`,
    `HTTPS = HTTP + TLS. O cadeado garante criptografia, NÃO garante legitimidade do conteúdo/site.`,
    `Plugins/extensões são ferramentas externas gerenciadas pelo navegador para serviços adicionais.`,
    `Modo privado reduz rastros LOCAIS, mas NÃO torna o usuário anônimo para rede, site ou provedor.`,
    `Tamanho máximo de anexo de e-mail é definido pelo PROVEDOR DE E-MAIL do REMETENTE — não pela conexão, arquivo, SO ou receptor.`,
    `Favorito salva referência (link); download cria cópia local sujeita a verificação de segurança.`,
  ],
  workedExamples: [
    `Plugins (também chamados de extensões/complementos) são ferramentas externas que os navegadores gerenciam para executar serviços adicionais.`,
    `O tamanho máximo de anexos permitido em uma mensagem de e-mail é definido pelo provedor de e-mail (serviço de webmail/servidor de e-mail) utilizado pelo remetente — não pela conexão de internet, estrutura do arquivo, sistema operacional ou receptor.`,
    `Dados de compra online são preenchidos em formulários HTML exibidos pelo navegador.`,
    `Mozilla Firefox é um navegador de internet — diferente de um leitor de PDF, editor de publicações, cliente de e-mail dedicado ou gerenciador de arquivos.`,
  ],
  commonMistakes: [
    `Tratar internet e web como sinônimos — web é um SERVIÇO (hipertexto) que roda sobre a internet, que é a rede global.`,
    `Achar que o cadeado (HTTPS) garante que o site é confiável/legítimo — garante apenas que a conexão está criptografada, não a legitimidade do conteúdo.`,
    `Achar que o modo privado torna o usuário anônimo na rede — ele só reduz rastros LOCAIS; o provedor de internet e o site continuam vendo o tráfego.`,
    `Atribuir o limite de tamanho de anexo de e-mail à conexão de internet, ao sistema operacional ou ao receptor — o limite é definido pelo PROVEDOR DE E-MAIL do remetente.`,
    `Confundir favorito (só salva referência/link) com download (cria cópia local do conteúdo) — são ações com efeitos bem diferentes.`,
    `Padrão observado no acervo real (AC-20-2012-CESGRANRIO-51): identificar plugins/extensões como as ferramentas externas gerenciadas pelo navegador para serviços adicionais.`,
    `Padrão observado no acervo real (AC-20-2012-CESGRANRIO-53): reconhecer o provedor de e-mail do remetente como o responsável pelo limite de tamanho de anexo.`,
    `Padrão observado no acervo real (AC-20-2012-CESGRANRIO-60): reconhecer que dados de compra online são preenchidos em formulários HTML exibidos pelo navegador.`,
    `Padrão observado no acervo real (AC-20-2013-CESGRANRIO-19): identificar Mozilla Firefox como navegador de internet, distinguindo-o de outras categorias de software (leitor de PDF, editor, cliente de e-mail, gerenciador de arquivos).`,
  ],
  howBoardMightAsk: [
    `Pede o nome técnico das ferramentas externas gerenciadas pelo navegador (plugins/extensões).`,
    `Pergunta quem define o limite de tamanho de um anexo de e-mail, com distratores de conexão/SO/receptor.`,
    `Pede para identificar qual item de uma lista é um navegador de internet, entre distratores de outras categorias de software.`,
    `Testa se o cadeado HTTPS garante legitimidade de conteúdo, ou se o modo privado garante anonimato de rede.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Internet = rede. Web = serviço sobre a rede. Intranet = tecnologia igual, ambiente restrito.`,
    `DNS traduz nome em IP.`,
    `HTTPS cadeado = criptografia, não legitimidade.`,
    `Plugins = ferramentas externas gerenciadas pelo navegador.`,
    `Modo privado = reduz rastro local, não anonimato de rede.`,
    `Limite de anexo de e-mail = provedor do remetente.`,
  ],
  flashcards: [
    { front: "Diferença entre internet e web?", back: "Internet é a rede global. Web é o serviço de hipertexto que roda sobre essa rede — não são sinônimos." },
    { front: "O cadeado do HTTPS garante que o site é confiável?", back: "Não — garante apenas que a conexão está criptografada, não a legitimidade do conteúdo ou identidade do site." },
    { front: "O modo privado torna o usuário anônimo na internet?", back: "Não — reduz apenas os rastros locais (histórico, cookies); o provedor de internet e o site continuam vendo o tráfego." },
    { front: "Quem define o limite de tamanho de um anexo de e-mail?", back: "O provedor de e-mail (serviço de webmail/servidor) utilizado pelo remetente." },
  ],
  miniQuiz: [
    {
      statement: `Os softwares navegadores de internet podem utilizar ferramentas externas para executar vários tipos de serviços.

Essas ferramentas são gerenciadas pelos navegadores como complementos, também denominados`,
      options: [
        { key: "A", text: `browsers`, isCorrect: false, explanation: `"Browser" é o próprio navegador, não a ferramenta externa gerenciada por ele — não corresponde ao conceito descrito.` },
        { key: "B", text: `plugins`, isCorrect: true, explanation: `Correto: plugins (também chamados de extensões/complementos) são ferramentas externas que os navegadores gerenciam para executar serviços adicionais.` },
        { key: "C", text: `servers`, isCorrect: false, explanation: `"Server" (servidor) é a máquina/software que responde a requisições — não é o termo para complementos gerenciados pelo navegador.` },
        { key: "D", text: `spammers`, isCorrect: false, explanation: `"Spammer" se refere a quem envia mensagens indesejadas em massa — não tem relação com complementos de navegador.` },
        { key: "E", text: `webmotors`, isCorrect: false, explanation: `"Webmotors" é o nome de um site/marca comercial, não um termo técnico de complementos de navegador.` },
      ],
    },
    {
      statement: `Um usuário pode enviar um arquivo anexado a uma mensagem de e-mail desde que esse arquivo, entre outras restrições, não ultrapasse o tamanho limite estipulado pela(o)`,
      options: [
        { key: "A", text: `conexão da internet`, isCorrect: false, explanation: `A velocidade/qualidade da conexão pode afetar o TEMPO de envio, mas não é ela que define o limite de TAMANHO do anexo.` },
        { key: "B", text: `estrutura do arquivo`, isCorrect: false, explanation: `A estrutura/formato do arquivo não define limites de tamanho de anexo de e-mail — esse limite é uma política do serviço de e-mail.` },
        { key: "C", text: `receptor da mensagem`, isCorrect: false, explanation: `O limite de tamanho de anexo é definido pelo provedor do REMETENTE (quem envia), não pelo provedor ou preferência do receptor.` },
        { key: "D", text: `sistema operacional do usuário`, isCorrect: false, explanation: `O sistema operacional não impõe o limite de tamanho de anexos de e-mail — essa é uma política do serviço/provedor de e-mail utilizado.` },
        { key: "E", text: `provedor de e-mail utilizado pelo usuário`, isCorrect: true, explanation: `Correto: o tamanho máximo de anexos permitido em uma mensagem de e-mail é definido pelo provedor de e-mail (serviço de webmail/servidor de e-mail) utilizado pelo remetente.` },
      ],
    },
  ],
};

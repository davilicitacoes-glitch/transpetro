# Motor de Jogos — arquitetura (2026-08-28)

## Camada visual (2026-08-28, adicionada depois da entrega inicial)

Missão que trocou SÓ a apresentação do jogo já existente — a lógica de conteúdo, tarefa → resposta
→ explicação → registro no motor de dados, descrita no resto deste documento, **não mudou em
nada**. Confirmado por: a suíte de testes inteira (`gameEngine.test.ts` incluído) continua
passando sem alteração, e um playthrough completo de "RH e Processos" depois da mudança visual deu
o mesmo resultado (3/4 acertos, nas mesmas cenas) de antes.

### Abordagem técnica

**SVG desenhado por código + animação CSS (`@keyframes`)** — sem biblioteca de animação (nenhuma
dependência nova instalada) e sem Canvas. Ficou em duas peças:

- `src/components/games/OfficeAvatar.tsx` — o personagem: um `<svg>` com cabeça/tronco/braços/
  pernas como `<g>`/`<rect>`/`<circle>` separados, cada parte com seu próprio `transform-origin`.
  O estado (`AvatarAction`) decide quais classes CSS ficam ativas em cada parte.
- `src/components/games/OfficeScene.tsx` — o cenário: `<div>`s posicionados em `%` sobre um fundo
  simples (parede + piso), com o personagem envolto num wrapper cuja propriedade `left` tem
  `transition` (`.office-scene-avatar-wrapper` em `globals.css`) — é isso que faz o personagem se
  mover fisicamente entre os pontos, não uma troca de imagem estática.
- Keyframes em `src/app/globals.css` (seção "Personagem 2D do motor de jogos"), reaproveitando as
  variáveis de cor já existentes do design system (`--brand`, `--navy`, `--accent` etc.) — o
  personagem já nasce com a identidade visual do app, sem paleta nova.

Todas as animações usam só `transform`/`opacity` (rotate, scaleY, translate) — nunca propriedades
caras de repintar (`box-shadow` animado, `filter`, `width`/`height` em loop) — é isso que garante
performance leve em celular, sem precisar de nenhuma técnica extra de otimização.

### Origem dos assets visuais

**Nenhum asset baixado** — o personagem e o cenário são 100% gerados via código (SVG + CSS), não
um pacote importado. A missão permitia as duas abordagens ("use assets... **ou** elementos
gerados/desenhados via código (SVG)") — optei por código por três motivos: (1) elimina qualquer
risco de licença por completo, nunca é preciso verificar; (2) fica trivial reaproveitar a paleta de
cor exata do app (variáveis CSS) em vez de reeditar cores de um asset importado; (3) não introduz
nenhuma dependência de build nova. O estilo (formas geométricas simples, proporções "casuais",
cores chapadas sem gradiente/sombra pesada) segue a mesma linguagem visual dos pacotes de
personagem flat-design gratuitos citados na missão (ex.: Kenney.nl) — usados aqui como referência
de estilo, não como arquivo importado.

### Estados de animação implementados (5, como pedido)

| Estado (`AvatarAction`) | O que anima | Quando aparece |
|---|---|---|
| `idle` | Respiração leve (tronco) + balanço leve (cabeça) | Parado sem tarefa ativa (chegada, cena de colega, decisão antes de responder) |
| `walking` | Pernas/braços em ciclo alternado + leve bob vertical, enquanto a posição horizontal transiciona | Sempre que `scene.local` muda entre cenas |
| `sitting` | Pernas dobradas (pose), sem loop — usado como base visual de `typing` | Implícito dentro de `typing` |
| `typing` | Sentado + pequeno movimento alternado dos braços/mãos, em loop sutil | Tarefa tipo `email`, antes de responder |
| `reacting-positive` | Um braço acena (rotação até quase acima da cabeça, 1 execução) | Resposta CORRETA revelada |
| `reacting-negative` | Um braço sobe até coçar a cabeça (1 execução) | Resposta INCORRETA revelada |

A escolha de qual estado mostrar (`computeArrivedAction`, em `[episodeId]/page.tsx`) é uma função
pura só de apresentação — lê `scene`/`selected`/`revealed` (que já existiam) mas não escreve nada
neles nem afeta `recordGameAttempt`.

### Cenário

`OfficeScene` desenha 4 pontos fixos, nas mesmas posições ao longo de uma "sala" horizontal —
porta (corredor), mesa + computador + cadeira (mesa), mesa redonda (sala de reunião), armário
(arquivo) — reaproveitando o mesmo `OfficeLocation` que já orientava a legenda de texto ("Mesa /
computador" etc.) antes desta missão. `arquivo` aparece no cenário mesmo sem nenhuma tarefa hoje
usando esse local, pra já ficar pronto pra quando um dia de trabalho futuro usar.

### Validações executadas

- `tsc --noEmit` limpo, `npm run build` limpo (55 rotas, incluindo as 3 do jogo).
- Suíte completa: **118 testes passando**, nenhum teste mudou — confirma que a lógica de conteúdo
  do Prompt 16/"Um Dia no Escritório" original não foi tocada.
- Testado no navegador, "RH e Processos" do início ao fim: cena 1 (chegada) → personagem parado
  perto da porta, `idle`; avançar → personagem anda visivelmente até a mesa (classe `walking` ativa
  durante a transição, depois some) → chega e já mostra `avatar-typing-arm-r` ativa (digitando);
  respondi ERRADO de propósito → classe `avatar-scratch-arm` ativa no braço esquerdo, ao mesmo
  tempo que a explicação de erro universal apareceu normalmente ("Errou", alternativa certa,
  alternativa errada) — confirmando que a camada visual não atrasa nem substitui a explicação real.
  Completei o dia (3/4 igual a antes da mudança visual) e a tela de resultado também mostra o
  personagem (parado no corredor, saindo).
- **Teste em tela de celular** (375×812, preset mobile): cenário e personagem renderizam dentro
  dos limites do card (`overflow-hidden`), sem corte nem desproporção — confirmado medindo o
  `getBoundingClientRect()` do SVG contra o container (nem a borda direita nem a inferior
  ultrapassam o cenário).

---


Primeiro de 7 jogos temáticos planejados para o ENSIPETRO. Este documento registra o motor
genérico por trás de **"Um Dia no Escritório"** e como ele foi pensado para os próximos dois jogos
("Simulador de Gestor", "Detetive de Documentos") reaproveitarem sem reescrever do zero.

## Regra de ouro (vale para todo jogo que usar este motor)

Toda situação, pergunta ou tarefa precisa apontar pra um código real da matriz do edital E pra uma
fonte real já validada. Na prática, isso virou uma restrição de design bem concreta: **toda
`GameTask` referencia uma `questionId` de uma `Question` já existente em `ALL_QUESTIONS`** — nunca
um enunciado/alternativa escrito à mão pro jogo. O texto narrativo (e-mail, fala de colega,
situação de decisão) é só ambientação; o conteúdo testado (pergunta, alternativas, correção,
explicação) é sempre a `Question` de origem, com `question.source` (banca/órgão/ano, ou
"inedita" pra questões de miniquiz) e `question.topicSlug` como rastro de fonte. Um teste
automatizado (`src/lib/games/__tests__/gameEngine.test.ts`) garante isso pra todo episódio
cadastrado — se alguém adicionar uma `GameTask` com `questionId` inexistente, o teste quebra.

## Camadas

```
src/lib/games/           ← motor genérico, reaproveitável por qualquer jogo
  types.ts                  tipos (GameEpisode, GameScene, GameTask — union kind, extensível)
  catalog.ts                ALL_GAME_EPISODES (junta o catálogo de todos os jogos), busca por código
  recordGameAttempt.ts      único caminho de escrita de tentativas de jogo (chama recordAttempt)

src/content/games/       ← conteúdo de cada jogo, um arquivo por jogo
  officeDay.ts               OFFICE_DAY_EPISODES — episódios de "Um Dia no Escritório"

src/app/(main)/laboratorio/jogos/   ← UI, dentro do Laboratório (não do Meu Curso)
  page.tsx                          hub "Jogos" (lista os jogos existentes)
  um-dia-no-escritorio/page.tsx     lista os "dias de trabalho" deste jogo
  um-dia-no-escritorio/[episodeId]/page.tsx   a sessão jogável
```

### Por que essa divisão

- **`src/lib/games/` nunca importa nada específico de "escritório"** — não conhece "e-mail",
  "colega" nem "decisão" como conceitos de negócio, só como `kind` de uma union genérica. Um jogo
  futuro pode adicionar um novo `kind` de tarefa sem tocar no motor.
- **`GameEpisode`** é o conceito genérico de "unidade jogável associada a um grupo de códigos" — no
  "Um Dia no Escritório" isso se chama "dia de trabalho", mas o campo real é só `id`/`title`/
  `scenes`. Um jogo futuro pode chamar seu episódio de "rodada" ou "caso" sem mudar o tipo.
- **`OfficeLocation`** (mesa/sala de reunião/corredor/arquivo) é o único tipo genuinamente
  amarrado ao cenário visual de escritório — documentado como tal em `types.ts`. Os próximos 2
  jogos ("Simulador de Gestor", "Detetive de Documentos") foram anunciados como jogos de ambiente
  de trabalho também, então provavelmente reaproveitam o MESMO enum de local e o mesmo avatar/
  cenário visual (ainda não implementado — hoje o jogo é só texto/cards, sem avatar gráfico
  desenhado; "avatar simples" ficou nas legendas de local, não numa arte de personagem).
- **`recordGameAttempt`** é a única forma de gravar uma tentativa de jogo — uma fina camada sobre
  `recordAttempt` (o único caminho de escrita de tentativas do app inteiro, ver
  `src/lib/pedagogy/service.ts`). Isso é o que garante a exigência da missão: um erro no jogo entra
  na MESMA fundação de dados dos Motores 1-3 (Caderno de Erros, revisão espaçada, nota estimada) —
  nunca uma cópia paralela. `activityId` segue o padrão `jogo:<gameId>:<episodeId>:<sceneId>`, então
  dá pra auditar de onde veio qualquer tentativa sem precisar de campo novo no schema de `Attempt`.

## Explicação de erro universal

A tela de tarefa (`SceneView`, dentro de `[episodeId]/page.tsx`) usa o componente `<QuestionCard>`
— **o mesmo componente compartilhado** usado por `/questoes`, `/simulados`, `meu-curso/dia/[day]` e
o miniquiz de aula (ver missão "Recursos Extras", seção 1) — não uma versão reescrita à parte. A
ambientação (cabeçalho de e-mail, balão de fala do colega, situação da decisão) é renderizada ANTES
do `<QuestionCard>`, nunca substituindo o painel de explicação que ele já mostra. A única adição
específica do jogo é uma linha de reação do colega ("Isso mesmo, era isso!" / "Hmm, acho que não é
bem assim...") na tarefa tipo `colega` — puramente decorativa, não duplica nem reescreve a
explicação real, que continua vindo 100% do `QuestionCard`/`buildAnswerExplanation`.

## Como os próximos 2 jogos reaproveitam isso

1. **Cenário/avatar**: criar um novo arquivo em `src/content/games/<novoJogo>.ts` com seus próprios
   `GameEpisode[]`, usando o mesmo `OfficeLocation` se o jogo se passar no mesmo escritório (ambos
   os próximos 2 foram anunciados como jogos de ambiente de trabalho).
2. **Cena → tarefa → resposta → explicação → registro**: reaproveitar `GameScene`/`GameTask` tal
   qual — se o novo jogo precisar de um tipo de tarefa que não existe ainda (ex.: "analisar um
   documento" pro Detetive de Documentos), adicionar um novo membro à union `GameTaskKind` em
   `types.ts` e um novo `case` em `SceneView` — sem tocar nos tipos/kinds já existentes.
3. **Episódio associado a grupo de códigos**: adicionar os novos `GameEpisode[]` em
   `ALL_GAME_EPISODES` (`catalog.ts`) — o hub de Jogos e o gatilho de sugestão no fim da aula do
   Meu Curso já os pegam automaticamente, sem mudar nenhuma tela existente.
4. **Registro no motor de dados**: chamar `recordGameAttempt` — já funciona pra qualquer jogo, não
   precisa de mudança.

## O que NÃO foi generalizado (de propósito)

- A UI de `SceneView` (cabeçalho de e-mail, balão de fala, painel de decisão) está hoje dentro da
  página de "Um Dia no Escritório", não em `src/lib/games/`. Um jogo com uma UI de tarefa muito
  diferente (ex.: "arrastar documentos pra pastas certas" no Detetive de Documentos) provavelmente
  precisa da própria função de renderização — mover isso pro motor genérico antes de ter um segundo
  caso de uso real seria abstração prematura.
- Não existe hoje um avatar gráfico desenhado (SVG/sprite) — "o personagem" é representado só por
  texto e pelo chip de local (`OfficeLocation`). Se os próximos jogos precisarem de um avatar
  visual de verdade, esse componente entra como peça nova reaproveitável, não existe ainda.

## Primeira entrega: o que foi implementado

2 "dias de trabalho" completos, 4 códigos, todos com material rico já validado (Prompt 10 + banco
de questões real):

| Dia de trabalho | Códigos | Fonte das tarefas |
|---|---|---|
| RH e Processos (`rh-e-processos`) | AC-01, AC-02 | `AC-01-2012-CESGRANRIO-22` (e-mail), `q-ac-01-recursos-humanos-2` (colega, questão inédita de aula), `AC-02-2018-CESGRANRIO-21` (e-mail), `AC-02-2012-CESGRANRIO-21` (decisão) |
| Compras e Estoques (`compras-e-estoques`) | AC-16, AC-12 | `AC-16-2012-CESGRANRIO-39` (e-mail), `AC-16-2011-CESGRANRIO-21` (colega), `AC-12-2012-CESGRANRIO-31` (e-mail), `AC-12-2012-CESGRANRIO-34` (decisão) |

Cada dia tem os 3 formatos de tarefa exigidos (e-mail, colega, decisão) — confirmado por teste
automatizado (`gameEngine.test.ts`).

## Próximos dias de trabalho sugeridos (pra quando o usuário pedir expansão)

Escolhidos por já terem aula + banco de questões reais suficiente (>=3 questões por código, pra
sustentar pelo menos 1 tarefa de cada formato sem repetir questão):

- **Finanças e Contabilidade**: AC-06 (Matemática Financeira) + AC-08 (Fluxo de Caixa) — ambos no
  mesmo módulo curricular, bom volume de questões reais.
- **Patrimônio e Manutenção**: AC-03 (Administração Patrimonial) + AC-04 (Gestão da Manutenção) —
  mesmo módulo, tema de "zelar pelos bens da empresa" narrativamente coeso.
- **Segurança da Informação**: AC-20 (Internet e Intranet) + AC-21 (Segurança da Informação e
  LGPD) — bom encaixe pra uma cena de "e-mail suspeito"/decisão de segurança.

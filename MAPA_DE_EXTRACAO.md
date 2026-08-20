# Mapa de Extração: ENSITEC → TRANSPETRO (Fase 1)

Este documento registra a separação entre **motor genérico** (extraído para este projeto) e **conteúdo pedagógico específico de Araçás/ENSITEC** (NÃO extraído), conforme a auditoria feita antes de copiar qualquer arquivo.

## Motor extraído

| Área | Origem no ENSITEC | Destino no TRANSPETRO | Observação |
|---|---|---|---|
| App shell / layouts | `src/app/layout.tsx`, `src/app/(main)/layout.tsx` | idem | Textos de marca generalizados |
| Autenticação | `src/app/login`, `cadastro`, `onboarding`, `recuperar-senha`, `redefinir-senha`, `diagnostico` | idem | Sem alteração de lógica |
| Navegação "Meu Curso" | `src/app/(main)/meu-curso/**` | idem | Textos de dias/edital generalizados |
| Componentes de UI | `src/components/**` | idem | Nav, players, question card, app shell |
| Esquema de dados | `src/lib/models/schema.ts` | idem | Zod completo; campos com nomes específicos de banca generalizados (`howSeleconMightAsk` → `howBoardMightAsk`); `SyllabusItem.subjectId` de enum fixo → `z.string()` |
| Banco local (Dexie) | `src/lib/db/**` | idem | Nome do banco `ensitec-db` → `transpetro-estudos-db`; classe renomeada |
| Store (Zustand) | `src/lib/store/**` | idem | Store renomeado |
| Pedagogia (domínio, revisão espaçada) | `src/lib/pedagogy/**` | idem | Sem alteração de lógica |
| Progresso / desempenho | `src/lib/progress/**`, `src/lib/performance/**` | idem | Sem alteração de lógica |
| Professor IA | `src/lib/professor/**`, `src/app/api/professor/**` | idem | System prompt generalizado para ler de `config/concurso.ts`; SEM chave de API |
| Cronograma / calendário | `src/lib/schedule/**`, `src/lib/course/**` | idem | Lógica de datas/missões preservada |
| Slides / vídeo | `src/lib/slides/**`, `src/components/video/**` | idem | Mecanismo preservado |
| Simulados (motor) | `src/lib/mock/**` | idem | Gerador preservado |
| Supabase (sincronização) | `src/lib/supabase/**` | idem | Cliente sem credenciais |
| PWA | `public/manifest.webmanifest`, `public/sw.js`, `public/icons/**` | idem | Nome/descrição do manifest generalizados |
| Config raiz | `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `middleware.ts` | idem | Sem alteração |

## Conteúdo NÃO extraído (específico de Araçás)

| Item no ENSITEC | Motivo | O que ficou no lugar |
|---|---|---|
| `src/content/coursePlan.ts` (34 missões reais) | Cronograma específico do concurso de Araçás | Placeholder `days: []`, válido pelo schema |
| `src/content/curriculum.ts` (módulos/tópicos reais) | Currículo do edital de Araçás | Placeholder com `SUBJECTS` genéricos (portugues/matematica/especificas) e `MODULES`/`TOPICS` vazios |
| `src/content/lessons/**` (aulas completas) | Conteúdo didático de Araçás | `ALL_LESSONS: []` |
| `src/content/questions/**` (420+ questões Selecon) | Banco de questões de Araçás | `ALL_QUESTIONS: []` |
| `src/content/essays/**` (propostas de redação) | Redações específicas de Araçás | `ESSAY_PROMPTS: []` |
| `src/content/legal/**` (leis/decretos de Araçás) | Legislação específica | `CODEX_LEGAL_REVIEW: []` |
| `src/content/videos/**` (curadoria de videoaulas) | Curadoria específica de Araçás | `VIDEO_LESSONS: []` |
| `src/content/finalReview.ts` (revisão de véspera real) | Conteúdo específico | Placeholders vazios |
| `src/lib/exam/constants.ts` (datas/blueprint de Araçás) | Dados do edital de Araçás | Substituído por `config/concurso.ts` com dados reais da Transpetro |
| `docs/CONTINUIDADE_ENSITEC.md`, `docs/MATRIZ_EDITAL.md`, `PROMPT_MESTRE_ENSITEC_CLAUDE.md` | Documentação específica do projeto de origem | Não copiados |
| `.env.local`, `CHAVE API.txt`, qualquer segredo | Credenciais reais | Não copiados; `.env.example` sem valores |

## Configuração central do concurso

Criado `config/concurso.ts` com os dados do Edital nº 03 - TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO - 2026.3 (Fundação Cesgranrio, Profissional Transpetro de Nível Técnico, ênfase Administração e Controle). **Atualizado e confirmado contra o PDF oficial do edital** (fornecido pelo usuário em sessão paralela — ver `MATRIZ_EDITAL_TRANSPETRO.md` na raiz e `docs/CONTINUIDADE_TRANSPETRO.md` seção 2 para o histórico completo da correção): estrutura real é **60 questões** (40 Específicas + 10 Português + 10 Matemática), não as 70 estimadas na pesquisa web inicial. Confirmado também que **não há etapa de redação**. Nenhum valor foi inventado — o que ainda não é dado do edital (meta pedagógica de pontuação, distribuição fina de tempo por tópico) permanece explicitamente marcado como pendente para a Fase 2.

## Material de pesquisa adicional (`pesquisa/`, fora do escopo original desta missão)

Uma sessão paralela, além do pedido original de extração de motor, também gerou pesquisa preparatória para a Fase 2: curadoria de 115 videoaulas do YouTube e mapeamento de reaproveitamento do conteúdo do ENSITEC contra os 39 códigos do edital (`pesquisa/aulas_youtube/`, `pesquisa/reaproveitamento_ensitec/`, `pesquisa/RELATORIO_PESQUISA_TRANSPETRO.md`). É pesquisa cuidadosa e sourced (nenhum dado inventado), mas não foi revisada linha a linha nesta sessão — tratar como insumo bruto para a Fase 2, não como conteúdo já validado.

## Verificação pós-cópia

Foi feita varredura por: `Araçás`, `Selecon`, `13/09/2026`, `12/09/2026`, `Técnico Municipal de Controle Interno`, `ENSITEC` (como nome de produto) em todo `src/` e `config/`. Ocorrências encontradas foram removidas ou generalizadas (ver commits). Comentários que mencionavam o projeto de origem apenas como referência histórica de arquitetura foram reescritos para não citar o nome do concurso anterior.

## Validação final

`npm install`, `npm run typecheck`, `npm run build` (37 rotas), `npm run test` (47 testes passando, 42 pulados — dependem de conteúdo real da Fase 2) e `npm run dev` (sobe limpo, rota testada responde 200) — todos executados com sucesso ao final da sessão. Ver `docs/CONTINUIDADE_TRANSPETRO.md` seção 7 para detalhes e observações sobre instabilidade do `npm install` neste ambiente Windows específico.

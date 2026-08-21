# Prompt de integração — Acervo de Questões Reais Transpetro 2026

Use este prompt (ou entregue-o à sessão responsável) quando for integrar este acervo ao banco de questões do app da Transpetro, herdado do motor do ENSITEC.

---

## Onde está o acervo

Tudo está em `D:\DOCUMENTOS DIVERSOS\TRANSPETRO\entregas\acervo_questoes_reais\`:

```
entregas/acervo_questoes_reais/
  schemas/
    questao-real.schema.json       ← schema JSON Schema completo de cada questão
  dados/
    questoes_por_codigo/
      PT-01.jsonl ... PT-08.jsonl
      MAT-01.jsonl ... MAT-10.jsonl
      AC-01.jsonl ... AC-21.jsonl
    indice_geral.jsonl              ← concatenação de todos os arquivos acima, uma questão por linha
  fontes/
    concursos_mapeados.md           ← lista de todos os concursos/provas usados como fonte
    hashes/registro_hashes.md       ← SHA256 + URL + data de acesso de cada PDF original
    pdfs_originais/                 ← os PDFs de prova e gabarito baixados, para auditoria futura
  relatorios/
    RELATORIO_COBERTURA_QUESTOES.md
    RELATORIO_AUDITORIA.md
  PROMPT_INTEGRACAO_PARA_CLAUDE.md  ← este arquivo
```

## Como o acervo está estruturado

Cada linha de cada `.jsonl` é um objeto JSON completo representando UMA questão, validando contra `schemas/questao-real.schema.json`. Campos-chave:

- `codigo`: um dos 39 códigos da matriz Transpetro (PT-01..08, MAT-01..10, AC-01..21).
- `origin.sourceTier`: `"transpetro_anterior"` (prioridade 1 — concurso anterior da própria Transpetro/grupo Petrobras), `"cesgranrio_outro_concurso"` (prioridade 2 — mesma banca, outro órgão), ou `"outra_banca"` (prioridade 3 — só usada quando as duas primeiras não bateram a meta).
- `gabarito`: a alternativa correta, ou `"ANULADA"` se a banca anulou a questão originalmente (essas devem ser tratadas como conteúdo de referência, nunca usadas em avaliação real).
- `statusRevisao`: `"validada"` ou `"sob_conferencia"`. **Questões `sob_conferencia` têm algum problema sinalizado no campo `comentario`** — legislação/versão de software desatualizada, gabarito com inconsistência aparente, mapeamento de código de baixa confiança, ou dependência de imagem que foi substituída por descrição textual. **NUNCA promova uma questão `sob_conferencia` para uso normal (treino, prova, avaliação) sem antes um humano ler o `comentario` e confirmar.**
- `mappingConfidence`: `"alta"`, `"média"` ou `"baixa"` — o quanto se tem certeza de que a questão cobre de fato o `codigo` atribuído. Questões `baixa` geralmente testam um subtema que não está explicitamente na matriz oficial (ex.: regência verbal, colocação pronominal) e foram mapeadas ao código mais próximo por proximidade temática — revise antes de usar como representativas do código.
- `adaptado`: se `true`, o enunciado foi adaptado do original (tipicamente porque dependia de uma imagem/figura não reprodutível em texto, substituída por descrição fiel) — ver `descricaoAdaptacao` para o que mudou exatamente.

## Regras obrigatórias de importação

1. **Não duplique.** Antes de importar, verifique se a questão (por `id`, ou por similaridade de enunciado) já existe no banco de questões do app. Os `id`s seguem o padrão `{codigo}-{ano}-{BANCA}-{numero_questao_original}` e são estáveis — use-os como chave de deduplicação.
2. **Não modifique os arquivos de origem.** Trate tudo dentro de `entregas/acervo_questoes_reais/` como somente leitura a partir do momento da importação — se precisar corrigir algo, corrija no banco de dados do app, não neste diretório (a menos que esteja explicitamente fazendo uma nova rodada de curadoria deste acervo, e não uma importação).
3. **Trate `statusRevisao: "sob_conferencia"` como excluído do uso normal até confirmação humana.** Ou seja: ao importar para o banco de questões ativo do app, essas questões devem entrar em um estado "rascunho"/"pendente de revisão" — nunca aparecer diretamente para um aluno estudando ou em uma prova simulada — até que uma pessoa leia o `comentario`, decida se a questão está utilizável (às vezes sim, com uma ressalva simples; às vezes não, e deve ser descartada), e mude o status manualmente.
4. **Preserve a rastreabilidade.** Ao importar, mantenha os campos de `origin` (banca, órgão, cargo, ano, número da questão original, URL) vinculados à questão no banco do app — não os descarte. Isso é o que permite auditoria futura e resposta a qualquer questionamento sobre a fonte de uma questão.
5. **Questões `gabarito: "ANULADA"`** não devem ser usadas em nenhum contexto de avaliação (não têm resposta oficial); podem ser mantidas como material de estudo de conteúdo, claramente marcadas como tal.
6. **Questões `adaptado: true`** dependem de descrições textuais no lugar de imagens originais — ao integrar na interface do app, considere se vale a pena recriar a imagem/figura original (ex.: capturas de tela de software, gráficos, tabelas) para melhorar a experiência do aluno, em vez de depender só da descrição textual.

## Como isso se conecta ao motor herdado do ENSITEC

O motor de exercícios/questões do ENSITEC (ver projeto em `D:\DOCUMENTOS DIVERSOS\ENSITEC`, especificamente `src/content/` para o formato de conteúdo pedagógico e o schema de questões usado lá) trabalha com um formato próprio de questão dentro do código da aplicação — este acervo NÃO segue esse formato diretamente, é um formato intermediário e agnóstico de aplicação, pensado para ser importado.

Ao adaptar este acervo para o schema de questões do motor herdado do ENSITEC, mapeie:
- `enunciado` → campo de enunciado/prompt do motor.
- `alternativas` (array de `{letra, texto}`) → formato de opções do motor (confirme se o motor usa array de strings, array de objetos, ou outro formato, e ajuste).
- `gabarito` → campo de resposta correta do motor.
- `comentario` → campo de explicação/feedback do motor, se existir.
- `codigo` → vincule ao tópico/trilha correspondente da estrutura de currículo da Transpetro (a ser definida por quem estiver construindo a trilha pedagógica; consulte `TRANSPETRO/MATRIZ_EDITAL_TRANSPETRO.md` para os nomes/temas de cada código).

Este acervo é insumo — a modelagem final de como as questões aparecem no app (banco de questões, simulados, exercícios por trilha) é decisão de quem estiver implementando a integração, não deste processo de extração.

## Estado do acervo no momento da entrega

Ver `relatorios/RELATORIO_COBERTURA_QUESTOES.md` para a contagem exata por código, e `relatorios/RELATORIO_AUDITORIA.md` para a lista completa de fontes e questões sob conferência. Resumo: nem todos os 39 códigos necessariamente atingiram a meta de 10 questões validadas cada — qualquer lacuna está documentada com o esgotamento de pesquisa realizado, não escondida atrás de uma média geral.

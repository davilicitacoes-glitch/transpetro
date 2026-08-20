# Cobertura de videoaulas — Português e Matemática (Transpetro / Cesgranrio 2026)

Pesquisa realizada via WebSearch/WebFetch (YouTube), com verificação individual de cada vídeo selecionado através do endpoint oficial `youtube.com/oembed` (confirma existência pública, título exato e canal). Duração e data de publicação **não puderam ser confirmadas** pela verificação automática (a página de vídeo do YouTube é renderizada via JavaScript e não expõe esses campos ao WebFetch/oembed) — por isso constam como "não verificada" no CSV, em vez de serem inventadas.

## Resultado geral

Todos os 18 códigos atingiram **3/3 vídeos** (1 principal + 2 complementares com papéis distintos).

| Código | Tema | Vídeos | Status |
|---|---|---|---|
| PT-01 | Compreensão de textos de gêneros variados | 3 | ✅ 3/3 |
| PT-02 | Ortografia oficial | 3 | ✅ 3/3 |
| PT-03 | Mecanismos de coesão textual | 3 | ✅ 3/3 |
| PT-04 | Emprego das classes de palavras | 3 | ✅ 3/3 |
| PT-05 | Concordância nominal e verbal | 3 | ✅ 3/3 |
| PT-06 | Emprego do sinal indicativo de crase | 3 | ✅ 3/3 |
| PT-07 | Sinais de pontuação | 3 | ✅ 3/3 |
| PT-08 | Significação das palavras | 3 | ✅ 3/3 |
| MAT-01 | Conjuntos numéricos | 3 | ✅ 3/3 |
| MAT-02 | Razão, proporção, regra de três, porcentagem | 3 | ✅ 3/3 |
| MAT-03 | Funções (polinomiais, exponenciais, log., trig.) | 3 | ✅ 3/3 |
| MAT-04 | Equações (1º/2º grau, exp., log., sistemas) | 3 | ✅ 3/3 |
| MAT-05 | Análise combinatória | 3 | ✅ 3/3 |
| MAT-06 | Probabilidade em espaços equiprováveis | 3 | ✅ 3/3 |
| MAT-07 | Estatística básica | 3 | ✅ 3/3 |
| MAT-08 | Matemática financeira (juros simples/compostos) | 3 | ✅ 3/3 |
| MAT-09 | Geometria plana (triângulo retângulo) | 3 | ✅ 3/3 |
| MAT-10 | Geometria espacial (áreas e volumes) | 3 | ✅ 3/3 |

**Total: 54 vídeos, 18/18 códigos completos.**

## Nota sobre as fontes prioritárias declaradas no escopo

- **Estratégia Concursos**: o canal foi checado diretamente na busca inicial. Foram encontrados vários vídeos institucionais sobre o concurso Transpetro (planejamento de estudos, análise de edital, lives de lançamento), mas **nenhuma videoaula de conteúdo programático gratuita e específica** para os 18 temas de Português/Matemática deste levantamento apareceu nos resultados — o material de teoria do Estratégia para Transpetro está no curso pago (cursos por assinatura, R$ 84,90/mês+), não em aulas avulsas no YouTube. Por isso nenhum vídeo do Estratégia Concursos entrou no CSV final.
- **Adriane Fauth**: o canal foi checado diretamente. Confirmou-se que o canal da professora é especializado em **Direito Constitucional**, não em Língua Portuguesa nem Matemática — portanto não é uma fonte aplicável a nenhum dos 18 códigos deste escopo (PT e MAT). Nenhum vídeo dela foi incluído.
- Como resultado, todas as três videoaulas de cada código vieram de (a) **outros canais consolidados de concursos** (Qconcursos, Gran Cursos Online, Nova Concursos, Focus Concursos, Prof. Álvaro Ferreira, Professor Mazziotti, Rota de Estudo, Matérias para Concursos, Fazendo a Base, Português sem Enrolação, Felippe Loureiro, Professor em Casa, Contate a Matemática, Exatas Com Vagner Lopes) ou (b) canais de ensino de matemática/português de propósito geral (marcados como `fora_do_universo_concursos` no CSV), usados como último recurso quando a cobertura por canais de concursos específicos era insuficiente para preencher os 3 papéis exigidos sem repetição, principalmente nos temas de Matemática mais "puros" (conjuntos numéricos, funções, combinatória, probabilidade, estatística, geometria), onde canais de matemática geral (Matemática em Exercícios/Prof. Gui, Dicasdemat Sandro Curiós, Gis com Giz etc.) têm aulas mais didáticas e completas do que o conteúdo disperso encontrado em canais de concursos.
- Termos de busca usados por tema (mínimo de 2–3 variações por código, todas restritas a `youtube.com` como domínio): nome do tema + "aula concurso YouTube"; nome do tema + nomes de bancas/editais (Cesgranrio, Cebraspe, VUNESP, IBFC, CNU, Correios, Caixa, Banco do Brasil); nome do tema + "questões comentadas"; nome do tema + "revisão".

## Limitações da verificação automática

- A confirmação de existência/título/canal foi feita via `https://www.youtube.com/oembed?url=...&format=json`, que retorna dados oficiais do YouTube apenas para vídeos públicos existentes (uma URL inválida ou vídeo privado/removido teria retornado erro — nenhum erro ocorreu nas 54 verificações).
- Duração exata e data de publicação não são retornadas pelo endpoint oembed nem pela renderização estática da página (SPA em JavaScript), por isso ficaram marcadas como "não verificada" em vez de estimadas — para obter esses dados com precisão seria necessário acesso à API oficial do YouTube Data API (fora do escopo desta pesquisa via busca web).
- A classificação de `fonte_prioridade` entre `outro_canal_concursos` e `fora_do_universo_concursos` foi feita com base no nome do canal e no título do vídeo (presença explícita de termos como "concurso", "CNU", nome de banca, etc.); alguns canais de matemática geral (ex.: Matemática em Exercícios/Prof. Gui, Dicasdemat Sandro Curiós) são amplamente usados por concurseiros mas não se anunciam exclusivamente como canal de concursos, por isso foram marcados como `fora_do_universo_concursos` por precaução, mesmo sendo fontes de altíssima qualidade técnica para os temas de Matemática pura.

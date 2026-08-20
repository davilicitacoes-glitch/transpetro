# Relatório de Pesquisa — Transpetro 2026 (Cesgranrio, Nível Técnico, Ênfase Administração e Controle)

Consolida as duas missões de pesquisa: (1) acervo de videoaulas do YouTube por código da matriz do edital, e (2) mapeamento do que o conteúdo pedagógico do ENSITEC pode reaproveitar. Matriz de referência: [`referencia/MATRIZ_EDITAL_TRANSPETRO.md`](./referencia/MATRIZ_EDITAL_TRANSPETRO.md) (39 códigos: PT-01 a PT-08, MAT-01 a MAT-10, AC-01 a AC-21).

## 1. Missão 1 — Cobertura de videoaulas

Relatório completo e tabela por código: [`aulas_youtube/RELATORIO_COBERTURA_VIDEOAULAS.md`](./aulas_youtube/RELATORIO_COBERTURA_VIDEOAULAS.md). Dados: [`aulas_youtube/videoaulas_por_codigo.csv`](./aulas_youtube/videoaulas_por_codigo.csv) (115 vídeos).

- **Meta:** 39/39 códigos com 3/3 vídeos (117 vídeos).
- **Resultado:** **37/39 códigos com 3/3** (111 vídeos) + **2/39 códigos com 2/3** (AC-14 Manuseio de Materiais, AC-17 Gestão de Contratos — 4 vídeos), **0 códigos com 0 vídeo**. Total: **115 vídeos**, todos verificados individualmente (título/canal/URL reais), nenhum inventado. Os 2 gaps têm esgotamento de pesquisa documentado no relatório da Missão 1 (múltiplas variações de busca, verificação direta de Estratégia Concursos e Adriane Fauth, checagem de 2+ outros canais de concursos).
- **Horas de conteúdo:** ≈48,7 horas confirmadas entre os 35 vídeos com duração verificável na página do YouTube; os demais 80 vídeos não expuseram duração pelas ferramentas de verificação disponíveis (registrados como "não verificada", nunca inventados) — o total real é maior, mas não pôde ser somado com precisão.
- **Distribuição por fonte:** estrategia_concursos 7 (6,1%), adriane_fauth 0 (canal confirmadamente fora de escopo — foco em Direito Constitucional/Português), outro_canal_concursos 59 (51,3%), fora_do_universo_concursos (último recurso) 49 (42,6%).
- **Distribuição por especificidade ao edital:** SIM (produzido para Transpetro 2026) 1, NAO (dentro da grade, outro edital/concurso — destaque para o canal CPWS, especializado em Petrobras/Transpetro) 57, GERAL (canal de concursos genérico ou último recurso) 57. Isso é esperado: o edital é de agosto/2026 e a prova só ocorre em 29/11/2026, então cursinhos ainda não produziram muito material específico — o acervo compensa isso com conteúdo "dentro da grade" de outros editais de estatais e com o canal CPWS, dedicado justamente a Petrobras/Transpetro.
- **Legislação (AC-16):** confirmado que os 3 vídeos tratam de legislação vigente (Lei 13.303/2016 e Lei 14.133/2021); nenhum baseado na revogada Lei 8.666/1993.

## 2. Missão 2 — Mapeamento de reaproveitamento do ENSITEC

Relatório completo: [`reaproveitamento_ensitec/RESUMO_MAPEAMENTO.md`](./reaproveitamento_ensitec/RESUMO_MAPEAMENTO.md). Dados: [`reaproveitamento_ensitec/mapa_reaproveitamento.csv`](./reaproveitamento_ensitec/mapa_reaproveitamento.csv) (57 linhas para os 39 códigos).

Contagem por grau de aderência:

| Grau | Linhas | Significado |
|---|---|---|
| DIRETO | 18 | Reaproveitável quase sem alteração |
| ADAPTAVEL | 16 | Mesmo conceito, precisa reescrever contexto |
| REFERENCIA_APENAS | 6 | Só serve de inspiração de qualidade/formato |
| NENHUM | 17 | Sem base de reaproveitamento — criar do zero |

**Grupos/temas sem nenhuma base de reaproveitamento no ENSITEC** (confirmado por leitura de conteúdo, não só nome de arquivo):
- Matemática avançada: MAT-03 (funções), MAT-04 (equações 2º grau/exponenciais/logarítmicas/sistemas lineares), MAT-06 (probabilidade), MAT-07 (estatística — só há médias, sem dispersão), MAT-08 (juros simples/compostos), MAT-09 (geometria plana), MAT-10 (geometria espacial).
- Administração e Controle corporativo/operacional: AC-01 (RH), AC-03 (Administração Patrimonial), AC-04 (Gestão da Manutenção), AC-05 (Indicadores/ESG), AC-07 (registros contábeis empresariais), AC-08 (fluxo de caixa empresarial), AC-09 (Balanço/DRE societário), AC-10 a AC-15 (toda a Logística e Cadeia de Suprimentos).

Isso é coerente com a natureza dos dois projetos: o ENSITEC é voltado a um concurso de administração pública municipal (controle interno/externo, orçamento público), enquanto a Transpetro exige conhecimento de gestão corporativa, logística e finanças empresariais.

**Atenção especial — legislação de licitações (AC-16/AC-17):** o ENSITEC usa exclusivamente a Lei nº 14.133/2021 (vigente, regime geral), sem qualquer resquício da revogada Lei 8.666/1993 — isso é positivo. Porém **não há nenhuma menção à Lei nº 13.303/2016** (Lei das Estatais, arts. 28-91), que é a norma que efetivamente rege as licitações e contratos da Transpetro. Por isso AC-16 e AC-17 foram limitados a **ADAPTAVEL** (nunca DIRETO) — servem de base conceitual, mas exigem desenvolvimento de conteúdo específico sobre o regime de estatais.

**Outros achados relevantes:**
- Português (PT-01 a PT-08): aderência muito alta, quase tudo DIRETO — única exceção parcial é PT-05 (concordância nominal/verbal), sem aula dedicada.
- Informática (AC-18 a AC-21): Windows 11 e segurança da informação DIRETO e atuais; Office está em versões 2010/2013/365 (não "2024" nomeado no edital) — ADAPTAVEL; **LGPD não tem nenhuma aula dedicada**, só uma frase solta em tema de redação — precisa ser criada do zero.
- Matemática básica (MAT-01, MAT-02, MAT-05): existe bom conteúdo (conjuntos, porcentagem, regra de três, combinatória), mas está classificado dentro da trilha "Raciocínio Lógico-Numérico", não como matéria de Matemática — ADAPTAVEL por exigir reclassificação.
- AC-06 (matemática financeira): só porcentagem/descontos cobertos; falta juros simples/compostos — ADAPTAVEL.
- AC-02 (Sistema de Gestão Integrado): só há auditoria governamental municipal (TCU), conceito distinto de sistema de gestão da qualidade corporativo (ISO) — REFERENCIA_APENAS.

## 3. Recomendação de prioridade para a próxima etapa (produção de conteúdo real)

### Grupo 1 — Mais rápidos de resolver (vídeo bom + base ENSITEC direta/adaptável)
PT-01 a PT-04, PT-06 a PT-08 (DIRETO no ENSITEC + 3/3 vídeos); AC-18, AC-20, AC-21 (Informática DIRETO + 3/3 vídeos, exceto LGPD que precisa de aula nova dentro de AC-21); MAT-01, MAT-02, MAT-05 (base ADAPTAVEL forte + 3/3 vídeos — só precisa reclassificar/reescrever contexto, não criar do zero).

### Grupo 2 — Esforço médio (vídeo bom, mas ENSITEC só ADAPTAVEL/REFERENCIA ou com lacuna pontual)
PT-05 (falta aula dedicada de concordância, mas tem 3/3 vídeos para apoiar a criação); AC-16/AC-17 (vídeos bons e atuais, principalmente sobre Lei 13.303/2016 via canal CPWS, mas ENSITEC só dá base conceitual — precisa desenvolver o regime de estatais do zero); AC-06 (falta juros simples/compostos no ENSITEC, mas há 3/3 vídeos de apoio); AC-19 (Office desatualizado no ENSITEC, mas 3/3 vídeos 2026 disponíveis); AC-02 (só referência distante no ENSITEC, mas 3/3 vídeos técnicos disponíveis).

### Grupo 3 — Mais trabalho do zero (sem base no ENSITEC; vídeo disponível mas exige criação integral de material próprio)
MAT-03, MAT-04, MAT-06 a MAT-10 (matemática avançada sem nenhuma base no ENSITEC, apesar de 3/3 vídeos cada); AC-01, AC-03 a AC-05, AC-07 a AC-15 (RH, Patrimônio, Manutenção, Indicadores, Finanças/Contabilidade empresarial e toda a Logística — sem base no ENSITEC). Dentro deste grupo, **AC-14 e AC-17 merecem atenção redobrada** por terem também cobertura de vídeo incompleta (2/3) — são os dois pontos de maior risco combinado (sem base de conteúdo E sem acervo de vídeo completo) e devem ser tratados com prioridade alta na etapa de produção, incluindo nova rodada de pesquisa de vídeo se possível.

## 4. Limites e observações finais

- Nenhum vídeo, canal, URL, lei ou conteúdo foi inventado; nenhuma alteração foi feita dentro de `ENSITEC` ou fora de `TRANSPETRO/pesquisa/`.
- Nenhum vídeo foi baixado ou hospedado — apenas URLs públicas do YouTube foram referenciadas.
- Durações e datas de publicação de parte do acervo (principalmente lotes PT/MAT e AC-01 a AC-09) não puderam ser confirmadas pelas ferramentas de verificação disponíveis (oEmbed do YouTube não expõe esses campos) — foram registradas como "não verificada"/"não identificada" em vez de inventadas; uma verificação manual futura (abrindo cada vídeo) pode preencher essas lacunas.
- Este relatório e o mapeamento são insumo para uma etapa futura de produção de conteúdo — nenhuma aula, slide ou material da Transpetro foi criado nesta missão.

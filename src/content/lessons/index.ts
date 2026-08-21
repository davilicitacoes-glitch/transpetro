import type { LessonContent } from "@/content/lessonTypes";
import { AC01_RECURSOS_HUMANOS } from "@/content/lessons/especificas/ac-01-recursos-humanos";
import { PT01_COMPREENSAO_TEXTOS } from "@/content/lessons/portugues/pt-01-compreensao-textos";
import { AC_02_SISTEMA_GESTAO_INTEGRADO } from "@/content/lessons/generated/ac-02-sistema-gestao-integrado";
import { AC_03_ADMINISTRACAO_PATRIMONIAL } from "@/content/lessons/generated/ac-03-administracao-patrimonial";
import { AC_04_GESTAO_MANUTENCAO } from "@/content/lessons/generated/ac-04-gestao-manutencao";
import { AC_05_GESTAO_INDICADORES } from "@/content/lessons/generated/ac-05-gestao-indicadores";
import { AC_06_MATEMATICA_FINANCEIRA } from "@/content/lessons/generated/ac-06-matematica-financeira";
import { AC_07_REGISTROS_CONTABEIS } from "@/content/lessons/generated/ac-07-registros-contabeis";
import { AC_08_FLUXO_CAIXA } from "@/content/lessons/generated/ac-08-fluxo-caixa";
import { AC_09_BALANCO_DRE } from "@/content/lessons/generated/ac-09-balanco-dre";
import { AC_10_LOGISTICA_CADEIA_SUPRIMENTOS } from "@/content/lessons/generated/ac-10-logistica-cadeia-suprimentos";
import { AC_11_MODALIDADES_TRANSPORTE } from "@/content/lessons/generated/ac-11-modalidades-transporte";
import { AC_12_GESTAO_ESTOQUES } from "@/content/lessons/generated/ac-12-gestao-estoques";
import { AC_13_ARMAZENAGEM } from "@/content/lessons/generated/ac-13-armazenagem";
import { AC_14_MANUSEIO_MATERIAIS } from "@/content/lessons/generated/ac-14-manuseio-materiais";
import { AC_15_EMBALAGEM } from "@/content/lessons/generated/ac-15-embalagem";
import { AC_16_GESTAO_COMPRAS } from "@/content/lessons/generated/ac-16-gestao-compras";
import { AC_17_GESTAO_CONTRATOS } from "@/content/lessons/generated/ac-17-gestao-contratos";
import { AC_18_FUNDAMENTOS_COMPUTACAO } from "@/content/lessons/generated/ac-18-fundamentos-computacao";
import { AC_19_APLICATIVOS_COMERCIAIS } from "@/content/lessons/generated/ac-19-aplicativos-comerciais";
import { AC_20_INTERNET_INTRANET } from "@/content/lessons/generated/ac-20-internet-intranet";
import { AC_21_SEGURANCA_INFORMACAO_LGPD } from "@/content/lessons/generated/ac-21-seguranca-informacao-lgpd";
import { MAT_01_CONJUNTOS_NUMERICOS } from "@/content/lessons/generated/mat-01-conjuntos-numericos";
import { MAT_02_RAZAO_PROPORCAO } from "@/content/lessons/generated/mat-02-razao-proporcao";
import { MAT_03_FUNCOES } from "@/content/lessons/generated/mat-03-funcoes";
import { MAT_04_EQUACOES } from "@/content/lessons/generated/mat-04-equacoes";
import { MAT_05_ANALISE_COMBINATORIA } from "@/content/lessons/generated/mat-05-analise-combinatoria";
import { MAT_06_PROBABILIDADE } from "@/content/lessons/generated/mat-06-probabilidade";
import { MAT_07_ESTATISTICA } from "@/content/lessons/generated/mat-07-estatistica";
import { MAT_08_MATEMATICA_FINANCEIRA } from "@/content/lessons/generated/mat-08-matematica-financeira";
import { MAT_09_GEOMETRIA_PLANA } from "@/content/lessons/generated/mat-09-geometria-plana";
import { MAT_10_GEOMETRIA_ESPACIAL } from "@/content/lessons/generated/mat-10-geometria-espacial";
import { PT_02_ORTOGRAFIA_OFICIAL } from "@/content/lessons/generated/pt-02-ortografia-oficial";
import { PT_03_COESAO_TEXTUAL } from "@/content/lessons/generated/pt-03-coesao-textual";
import { PT_04_CLASSES_PALAVRAS } from "@/content/lessons/generated/pt-04-classes-palavras";
import { PT_05_CONCORDANCIA } from "@/content/lessons/generated/pt-05-concordancia";
import { PT_06_CRASE } from "@/content/lessons/generated/pt-06-crase";
import { PT_07_PONTUACAO } from "@/content/lessons/generated/pt-07-pontuacao";
import { PT_08_SIGNIFICACAO_PALAVRAS } from "@/content/lessons/generated/pt-08-significacao-palavras";

/**
 * Fase 2 — cobertura completa dos 39 códigos do Anexo IV.
 *
 * AC-01 e PT-01 (`especificas/`, `portugues/`) foram escritas manualmente nesta sessão, com
 * conteúdo genuíno e revisado. As outras 37 (`generated/`) foram importadas do material produzido
 * pela sessão paralela "Prompt 10" (`D:\DOCUMENTOS DIVERSOS\ENSIPETRO\entregas\conteudo_didatico_fase2\`),
 * que gerou resumo, pontos de memorização, pegadinhas e mapa mental por código. **Qualidade
 * desigual, registrada honestamente**: parte das "pegadinhas" e "pontos de memorização" daquele
 * material é texto-modelo genérico (repete o mesmo parágrafo trocando só o nome do subtema), ao
 * lado de trechos genuinamente específicos ancorados em questões reais do acervo — ver
 * `docs/CONTINUIDADE_ENSIPETRO.md` para o registro código a código do que precisa de revisão
 * humana antes de ser tratado como conteúdo final de qualidade. O `miniQuiz` de cada aula gerada
 * usa questões REAIS do acervo (`entregas/acervo_questoes_reais/`), não inventadas.
 */
export const ALL_LESSONS: LessonContent[] = [
  AC01_RECURSOS_HUMANOS,
  PT01_COMPREENSAO_TEXTOS,
  AC_02_SISTEMA_GESTAO_INTEGRADO,
  AC_03_ADMINISTRACAO_PATRIMONIAL,
  AC_04_GESTAO_MANUTENCAO,
  AC_05_GESTAO_INDICADORES,
  AC_06_MATEMATICA_FINANCEIRA,
  AC_07_REGISTROS_CONTABEIS,
  AC_08_FLUXO_CAIXA,
  AC_09_BALANCO_DRE,
  AC_10_LOGISTICA_CADEIA_SUPRIMENTOS,
  AC_11_MODALIDADES_TRANSPORTE,
  AC_12_GESTAO_ESTOQUES,
  AC_13_ARMAZENAGEM,
  AC_14_MANUSEIO_MATERIAIS,
  AC_15_EMBALAGEM,
  AC_16_GESTAO_COMPRAS,
  AC_17_GESTAO_CONTRATOS,
  AC_18_FUNDAMENTOS_COMPUTACAO,
  AC_19_APLICATIVOS_COMERCIAIS,
  AC_20_INTERNET_INTRANET,
  AC_21_SEGURANCA_INFORMACAO_LGPD,
  MAT_01_CONJUNTOS_NUMERICOS,
  MAT_02_RAZAO_PROPORCAO,
  MAT_03_FUNCOES,
  MAT_04_EQUACOES,
  MAT_05_ANALISE_COMBINATORIA,
  MAT_06_PROBABILIDADE,
  MAT_07_ESTATISTICA,
  MAT_08_MATEMATICA_FINANCEIRA,
  MAT_09_GEOMETRIA_PLANA,
  MAT_10_GEOMETRIA_ESPACIAL,
  PT_02_ORTOGRAFIA_OFICIAL,
  PT_03_COESAO_TEXTUAL,
  PT_04_CLASSES_PALAVRAS,
  PT_05_CONCORDANCIA,
  PT_06_CRASE,
  PT_07_PONTUACAO,
  PT_08_SIGNIFICACAO_PALAVRAS,
];

export const LESSON_COUNT_BY_SUBJECT = ALL_LESSONS.reduce<Record<string, number>>((acc, lesson) => {
  acc[lesson.subjectSlug] = (acc[lesson.subjectSlug] ?? 0) + 1;
  return acc;
}, {});

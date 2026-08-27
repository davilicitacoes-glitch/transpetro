import { describe, it, expect } from "vitest";
import { buildCoursePdf } from "@/lib/calendar/exportPdf";
import type { CourseDayOverviewEntry } from "@/lib/course/service";

function entry(overrides: Partial<CourseDayOverviewEntry> = {}): CourseDayOverviewEntry {
  return {
    day: 1,
    title: "Compreensão de textos (PT-01) + Logística e Gestão da Cadeia de Suprimentos (AC-10)",
    phase: "fundamentos",
    subjects: ["portugues", "especificas"],
    syllabusCodes: ["PT-01", "AC-10"],
    scheduledDate: "2026-09-01",
    status: "nao_iniciado",
    totalSteps: 8,
    completedSteps: 0,
    estimatedMinutesTotal: 96,
    ...overrides,
  };
}

describe("buildCoursePdf", () => {
  it("produces a structurally valid PDF byte stream", () => {
    const entries = Array.from({ length: 48 }, (_, i) => entry({ day: i + 1, scheduledDate: `2026-09-${String((i % 28) + 1).padStart(2, "0")}` }));
    const bytes = buildCoursePdf(entries, "29/11/2026");
    const text = String.fromCharCode(...bytes);
    expect(text.startsWith("%PDF-1.4")).toBe(true);
    expect(text.trim().endsWith("%%EOF")).toBe(true);
    expect(text).toContain("/Type /Catalog");
    expect(text).toContain("/Type /Pages");
    const pageCount = (text.match(/\/Type \/Page(?!s)/g) ?? []).length;
    expect(pageCount).toBeGreaterThan(1); // 48 dias não cabem em 1 página
    const objCount = (text.match(/ 0 obj/g) ?? []).length;
    const endobjCount = (text.match(/endobj/g) ?? []).length;
    expect(objCount).toBe(endobjCount);
  });

  it("does not throw on accented characters, em dashes and long titles", () => {
    const entries = [
      entry({
        title: "Emprego do sinal indicativo de crase (PT-06) — revisão intercalada com questões extras de concordância nominal e verbal, além de um resumo bem longo pra forçar quebra de linha múltipla no PDF",
        subjects: ["portugues"],
        syllabusCodes: ["PT-06"],
      }),
    ];
    expect(() => buildCoursePdf(entries, "29/11/2026")).not.toThrow();
  });

  it("keeps xref offsets consistent (one offset line per object)", () => {
    const entries = [entry()];
    const bytes = buildCoursePdf(entries, "29/11/2026");
    const text = String.fromCharCode(...bytes);
    const objCount = (text.match(/^\d+ 0 obj$/gm) ?? []).length;
    const xrefMatch = text.match(/xref\n0 (\d+)\n/);
    expect(xrefMatch).not.toBeNull();
    expect(Number(xrefMatch![1])).toBe(objCount + 1); // +1 pelo objeto livre 0
  });

  /** Regressão do bug real encontrado em produção: o cálculo do número de cada objeto (Page dict e
   * seu Contents) estava errado (off-by-one), o que ISOLADAMENTE não quebrava as checagens acima
   * (contagem de objetos/endobj batia, xref batia) — só quebrava de verdade um leitor de PDF
   * seguindo as referências /Contents/Kids, porque elas apontavam pro objeto errado (e uma delas
   * pisava por cima do objeto da fonte Helvetica-Bold). Este teste resolve as referências de
   * verdade, como um leitor de PDF faria. */
  it("resolves every object reference correctly (catalog → pages → kids → contents, and both fonts intact)", () => {
    const entries = Array.from({ length: 30 }, (_, i) => entry({ day: i + 1, scheduledDate: `2026-09-${String((i % 28) + 1).padStart(2, "0")}` }));
    const bytes = buildCoursePdf(entries, "29/11/2026");
    const text = String.fromCharCode(...bytes);

    const objects = new Map<number, string>();
    const objRe = /(\d+) 0 obj\n([\s\S]*?)\nendobj\n/g;
    let m: RegExpExecArray | null;
    while ((m = objRe.exec(text))) objects.set(Number(m[1]), m[2]);

    // objeto 1: catálogo aponta pro objeto 2 como /Pages
    const catalog = objects.get(1)!;
    expect(catalog).toContain("/Type /Catalog");
    expect(catalog).toContain("/Pages 2 0 R");

    // objeto 2: Pages — resolve os Kids de verdade
    const pagesDict = objects.get(2)!;
    expect(pagesDict).toContain("/Type /Pages");
    const kidsMatch = pagesDict.match(/\/Kids \[([^\]]*)\]/);
    expect(kidsMatch).not.toBeNull();
    const kids = [...kidsMatch![1].matchAll(/(\d+) 0 R/g)].map((k) => Number(k[1]));
    const countMatch = pagesDict.match(/\/Count (\d+)/);
    expect(kids.length).toBe(Number(countMatch![1]));
    expect(kids.length).toBeGreaterThan(1); // 30 dias não cabem em 1 página

    // objetos 3/4: as duas fontes, intactas (não pisadas por nenhum Page dict)
    expect(objects.get(3)).toContain("/BaseFont /Helvetica");
    expect(objects.get(3)).not.toContain("Helvetica-Bold");
    expect(objects.get(4)).toContain("/BaseFont /Helvetica-Bold");

    // cada Kid tem que ser um Page de verdade, cujo /Contents resolve pra um stream de verdade
    const usedContentObjNums = new Set<number>();
    for (const kidNum of kids) {
      const pageDict = objects.get(kidNum);
      expect(pageDict, `Kid ${kidNum} não existe como objeto`).toBeDefined();
      expect(pageDict).toContain("/Type /Page");
      expect(pageDict).not.toContain("/Type /Pages");
      const contentsMatch = pageDict!.match(/\/Contents (\d+) 0 R/);
      expect(contentsMatch, `Page ${kidNum} sem /Contents`).not.toBeNull();
      const contentObjNum = Number(contentsMatch![1]);
      expect(contentObjNum, "Contents não pode apontar pro próprio Page, pra Pages, ou pra uma fonte").not.toBe(kidNum);
      expect([1, 2, 3, 4]).not.toContain(contentObjNum);
      expect(usedContentObjNums.has(contentObjNum), "dois Pages não podem compartilhar o mesmo objeto Contents").toBe(false);
      usedContentObjNums.add(contentObjNum);

      const streamObj = objects.get(contentObjNum);
      expect(streamObj, `objeto Contents ${contentObjNum} referenciado por Page ${kidNum} não existe`).toBeDefined();
      expect(streamObj).toMatch(/^<< \/Length \d+ >>\nstream\n/);
      expect(streamObj).toContain("endstream");
      expect(streamObj).toContain("BT"); // tem pelo menos um bloco de texto real
    }
  });
});

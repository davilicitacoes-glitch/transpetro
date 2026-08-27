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
});

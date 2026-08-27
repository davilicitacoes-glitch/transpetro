import { describe, it, expect } from "vitest";
import { computeStudyStreak } from "@/lib/course/streak";
import type { CourseDayOverviewEntry } from "@/lib/course/service";

function entry(completedAt: string | undefined): CourseDayOverviewEntry {
  return {
    day: 1,
    title: "t",
    phase: "fundamentos",
    subjects: [],
    syllabusCodes: [],
    scheduledDate: "2026-09-01",
    status: completedAt ? "concluido" : "nao_iniciado",
    totalSteps: 1,
    completedSteps: completedAt ? 1 : 0,
    estimatedMinutesTotal: 10,
    completedAt,
  };
}

describe("computeStudyStreak", () => {
  it("counts consecutive completed days ending today", () => {
    const entries = [
      entry("2026-09-05T10:00:00.000Z"),
      entry("2026-09-06T10:00:00.000Z"),
      entry("2026-09-07T10:00:00.000Z"),
    ];
    expect(computeStudyStreak(entries, "2026-09-07")).toBe(3);
  });

  it("does not zero out if today has no completion yet but yesterday does", () => {
    const entries = [entry("2026-09-05T10:00:00.000Z"), entry("2026-09-06T10:00:00.000Z")];
    expect(computeStudyStreak(entries, "2026-09-07")).toBe(2);
  });

  it("breaks on a gap day", () => {
    const entries = [entry("2026-09-01T10:00:00.000Z"), entry("2026-09-05T10:00:00.000Z"), entry("2026-09-06T10:00:00.000Z")];
    expect(computeStudyStreak(entries, "2026-09-06")).toBe(2);
  });

  it("returns 0 with no completions", () => {
    expect(computeStudyStreak([entry(undefined)], "2026-09-07")).toBe(0);
  });

  it("counts today's completion too", () => {
    const entries = [entry("2026-09-06T10:00:00.000Z"), entry("2026-09-07T08:00:00.000Z")];
    expect(computeStudyStreak(entries, "2026-09-07")).toBe(2);
  });
});

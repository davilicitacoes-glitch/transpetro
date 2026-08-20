import { describe, expect, it } from "vitest";
import { addDays, daysBetween, formatDateBR, isWeekend, studyDaysRemaining, todayInExamTimezone } from "@/lib/schedule/dates";
import { LAST_STUDY_DATE } from "@config/concurso";

describe("dates", () => {
  it("addDays soma dias corretamente através de virada de mês", () => {
    expect(addDays("2026-08-31", 1)).toBe("2026-09-01");
  });

  it("daysBetween inclusive conta ambas as pontas", () => {
    expect(daysBetween("2026-09-01", "2026-09-01", true)).toBe(1);
    expect(daysBetween("2026-09-01", "2026-09-02", true)).toBe(2);
  });

  it("daysBetween exclusive não conta a data final", () => {
    expect(daysBetween("2026-09-01", "2026-09-02", false)).toBe(1);
  });

  it("formatDateBR converte ISO para DD/MM/AAAA", () => {
    expect(formatDateBR("2026-11-29")).toBe("29/11/2026");
  });

  it("nunca deve gerar uma data de estudo após o último dia de estudo configurado (véspera da prova)", () => {
    expect(LAST_STUDY_DATE).toBe("2026-11-28");
  });

  it("studyDaysRemaining é zero quando a referência é depois do último dia de estudo", () => {
    const afterExam = new Date("2026-12-01T12:00:00Z");
    expect(studyDaysRemaining(afterExam)).toBe(0);
  });

  it("studyDaysRemaining conta corretamente a partir de uma data conhecida", () => {
    // 2026-11-26 -> 2026-11-28 inclusive = 3 dias
    const reference = new Date("2026-11-26T15:00:00Z"); // meio-dia em America/Sao_Paulo (UTC-3)
    expect(studyDaysRemaining(reference)).toBe(3);
  });

  it("todayInExamTimezone respeita o fuso America/Sao_Paulo (UTC-3) mesmo perto da virada do dia em UTC", () => {
    // 02:30 UTC = 23:30 do dia anterior em America/Sao_Paulo (UTC-3)
    const almostMidnightUtc = new Date("2026-09-10T02:30:00Z");
    expect(todayInExamTimezone(almostMidnightUtc)).toBe("2026-09-09");
  });

  it("isWeekend identifica sábado e domingo", () => {
    // Calendário real de 2026: 28/11 = sábado (véspera), 29/11 = domingo (dia da prova,
    // comum para concursos como o da Cesgranrio), 30/11 = segunda-feira.
    expect(isWeekend("2026-11-27")).toBe(false); // sexta-feira
    expect(isWeekend("2026-11-28")).toBe(true); // sábado (véspera)
    expect(isWeekend("2026-11-29")).toBe(true); // domingo (dia da prova)
    expect(isWeekend("2026-11-30")).toBe(false); // segunda-feira
  });
});

"use client";

import { create } from "zustand";
import { getDB } from "@/lib/db/dexie";
import { seedDatabase } from "@/lib/db/seed";
import { buildStudyPlan, type StudyPlan } from "@/lib/schedule/plan";
import { todayInExamTimezone } from "@/lib/schedule/dates";
import type { LearnerProfile } from "@/lib/models/schema";

export interface TranspetroState {
  ready: boolean;
  profile: LearnerProfile | null;
  studyPlan: StudyPlan | null;
  init: () => Promise<void>;
  completeOnboarding: (input: {
    weekdayHours: number;
    weekendHours: number;
    perceivedLevel: LearnerProfile["perceivedLevel"];
  }) => Promise<void>;
  refreshPlan: () => void;
}

function nowIso(): string {
  return new Date().toISOString();
}

export const useTranspetroStore = create<TranspetroState>((set, get) => ({
  ready: false,
  profile: null,
  studyPlan: null,

  init: async () => {
    if (typeof window === "undefined") return;
    // Nunca deixa a tela travada em "Carregando..." para sempre: se o IndexedDB falhar ou
    // demorar demais para abrir (bug real observado no Safari/iOS — Storage Access API mais
    // restritiva, sobretudo em PWA instalado ou pouco espaço livre), o app ainda precisa liberar
    // a tela (indo para o onboarding) em vez de ficar preso numa Promise que nunca resolve.
    const TIMEOUT_MS = 6000;
    try {
      await Promise.race([
        (async () => {
          await seedDatabase();
          const db = getDB();
          const profiles = await db.learnerProfiles.toArray();
          const profile = profiles[0] ?? null;
          set({ ready: true, profile });
          if (profile) {
            get().refreshPlan();
          }
        })(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout ao abrir o banco local")), TIMEOUT_MS)),
      ]);
    } catch (err) {
      console.error("[init] falha ao inicializar o banco local — seguindo sem progresso salvo:", err);
      set({ ready: true, profile: null });
    }
  },

  completeOnboarding: async ({ weekdayHours, weekendHours, perceivedLevel }) => {
    const db = getDB();
    const now = nowIso();
    const profile: LearnerProfile = {
      id: "learner-profile-default",
      weekdayHours,
      weekendHours,
      perceivedLevel,
      focusBlockMinutes: 50,
      breakMinutes: 10,
      onboardingCompletedAt: now,
      createdAt: now,
      updatedAt: now,
    };
    await db.learnerProfiles.put(profile);
    set({ profile });
    get().refreshPlan();
  },

  refreshPlan: () => {
    const startDate = todayInExamTimezone();
    const plan = buildStudyPlan(startDate);
    set({ studyPlan: plan });
  },
}));

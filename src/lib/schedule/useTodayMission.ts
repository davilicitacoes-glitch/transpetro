"use client";

import { useCallback, useEffect, useState } from "react";
import { getDB } from "@/lib/db/dexie";
import { useTranspetroStore } from "@/lib/store/useTranspetroStore";
import { todayInExamTimezone } from "@/lib/schedule/dates";
import { buildMissionTasks, type MissionTask } from "@/lib/schedule/missionContent";
import type { StudyPlanDay } from "@/lib/schedule/plan";
import type { StudyTask } from "@/lib/models/schema";

export interface TodayMissionState {
  today: string;
  day: StudyPlanDay | null;
  tasks: MissionTask[];
  completedKinds: Set<string>;
  toggleTask: (kind: string) => Promise<void>;
  missionComplete: boolean;
  loading: boolean;
}

const REQUIRED_KINDS_FOR_COMPLETION = ["aula_principal", "aula_secundaria", "questoes", "revisao"];

export function useTodayMission(): TodayMissionState {
  const studyPlan = useTranspetroStore((s) => s.studyPlan);
  const [completedKinds, setCompletedKinds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const today = todayInExamTimezone();
  const day = studyPlan?.days.find((d) => d.date === today) ?? null;
  const tasks = day ? buildMissionTasks(day) : [];

  const storageKey = `transpetro-tasks-${today}`;

  useEffect(() => {
    setLoading(true);
    (async () => {
      const db = getDB();
      const records = await db.studyTasks.where("date").equals(today).toArray();
      const done = new Set(records.filter((r) => r.completed).map((r) => r.kind));
      setCompletedKinds(done);
      setLoading(false);
    })();
  }, [today, storageKey]);

  const toggleTask = useCallback(
    async (kind: string) => {
      const db = getDB();
      const id = `task-${today}-${kind}`;
      const willComplete = !completedKinds.has(kind);
      const now = new Date().toISOString();
      const task = tasks.find((t) => t.kind === kind);

      const record: StudyTask = {
        id,
        studyPlanId: "current",
        date: today,
        missionIndex: day?.missionIndex ?? null,
        kind: kind as StudyTask["kind"],
        title: task?.title ?? kind,
        estimatedMinutes: task?.estimatedMinutes ?? 0,
        completed: willComplete,
        completedAt: willComplete ? now : undefined,
        createdAt: now,
        updatedAt: now,
      };
      await db.studyTasks.put(record);

      setCompletedKinds((prev) => {
        const next = new Set(prev);
        if (willComplete) next.add(kind);
        else next.delete(kind);
        return next;
      });
    },
    [completedKinds, day?.missionIndex, tasks, today],
  );

  const missionComplete = REQUIRED_KINDS_FOR_COMPLETION.every((k) => completedKinds.has(k));

  return { today, day, tasks, completedKinds, toggleTask, missionComplete, loading };
}

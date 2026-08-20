import { getDB } from "@/lib/db/dexie";

/**
 * Camada de repositório: isola as telas do mecanismo de armazenamento real.
 * Hoje só existe o adaptador local (Dexie/IndexedDB). Um adaptador Supabase pode
 * implementar a mesma interface `Repository<T>` no futuro sem tocar nas telas.
 */
export interface Repository<T extends { id: string }> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  upsert(item: T): Promise<void>;
  bulkUpsert(items: T[]): Promise<void>;
  remove(id: string): Promise<void>;
}

function createLocalRepository<T extends { id: string }>(tableName: string): Repository<T> {
  return {
    async getAll() {
      const db = getDB();
      // @ts-expect-error — acesso dinâmico por nome de tabela, tipado nos repositórios concretos abaixo.
      return db[tableName].toArray();
    },
    async getById(id: string) {
      const db = getDB();
      // @ts-expect-error
      return db[tableName].get(id);
    },
    async upsert(item: T) {
      const db = getDB();
      // @ts-expect-error
      await db[tableName].put(item);
    },
    async bulkUpsert(items: T[]) {
      const db = getDB();
      // @ts-expect-error
      await db[tableName].bulkPut(items);
    },
    async remove(id: string) {
      const db = getDB();
      // @ts-expect-error
      await db[tableName].delete(id);
    },
  };
}

export const repositories = {
  officialSources: () => createLocalRepository("officialSources"),
  exams: () => createLocalRepository("exams"),
  examBlueprints: () => createLocalRepository("examBlueprints"),
  syllabusItems: () => createLocalRepository("syllabusItems"),
  subjects: () => createLocalRepository("subjects"),
  modules: () => createLocalRepository("modules"),
  topics: () => createLocalRepository("topics"),
  lessons: () => createLocalRepository("lessons"),
  studyPlans: () => createLocalRepository("studyPlans"),
  studyTasks: () => createLocalRepository("studyTasks"),
  focusSessions: () => createLocalRepository("focusSessions"),
  questions: () => createLocalRepository("questions"),
  attempts: () => createLocalRepository("attempts"),
  mockExams: () => createLocalRepository("mockExams"),
  mockExamAttempts: () => createLocalRepository("mockExamAttempts"),
  essayPrompts: () => createLocalRepository("essayPrompts"),
  essaySubmissions: () => createLocalRepository("essaySubmissions"),
  flashcards: () => createLocalRepository("flashcards"),
  reviewSchedules: () => createLocalRepository("reviewSchedules"),
  reviewAttempts: () => createLocalRepository("reviewAttempts"),
  errorEntries: () => createLocalRepository("errorEntries"),
  notes: () => createLocalRepository("notes"),
  bookmarks: () => createLocalRepository("bookmarks"),
  mediaAssets: () => createLocalRepository("mediaAssets"),
  notebookPackages: () => createLocalRepository("notebookPackages"),
  learnerProfiles: () => createLocalRepository("learnerProfiles"),
  masterySnapshots: () => createLocalRepository("masterySnapshots"),
  integrationSettings: () => createLocalRepository("integrationSettings"),
};

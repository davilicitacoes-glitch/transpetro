"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Moon, Sun, Trash2, Upload } from "lucide-react";
import { getDB } from "@/lib/db/dexie";
import { PageHeader } from "@/components/ui/PageHeader";
import { deleteAllConversations, isHistoryEnabled, setHistoryEnabled } from "@/lib/professor/history";

export default function ConfiguracoesPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [historyEnabled, setHistoryEnabledState] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistoryEnabledState(isHistoryEnabled());
  }, []);

  function toggleHistory() {
    const next = !historyEnabled;
    setHistoryEnabled(next);
    setHistoryEnabledState(next);
  }

  async function clearHistory() {
    await deleteAllConversations();
    setMessage("Histórico de conversas com o Professor apagado.");
  }

  async function exportBackup() {
    const db = getDB();
    const data = {
      exportedAt: new Date().toISOString(),
      version: 1,
      learnerProfiles: await db.learnerProfiles.toArray(),
      notes: await db.notes.toArray(),
      attempts: await db.attempts.toArray(),
      errorEntries: await db.errorEntries.toArray(),
      reviewSchedules: await db.reviewSchedules.toArray(),
      essaySubmissions: await db.essaySubmissions.toArray(),
      studyTasks: await db.studyTasks.toArray(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transpetro-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Backup exportado. Nenhuma chave ou segredo é incluído no arquivo.");
  }

  async function importBackup(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const db = getDB();
      if (data.learnerProfiles) await db.learnerProfiles.bulkPut(data.learnerProfiles);
      if (data.notes) await db.notes.bulkPut(data.notes);
      if (data.attempts) await db.attempts.bulkPut(data.attempts);
      if (data.errorEntries) await db.errorEntries.bulkPut(data.errorEntries);
      if (data.reviewSchedules) await db.reviewSchedules.bulkPut(data.reviewSchedules);
      if (data.essaySubmissions) await db.essaySubmissions.bulkPut(data.essaySubmissions);
      if (data.studyTasks) await db.studyTasks.bulkPut(data.studyTasks);
      setMessage("Backup restaurado. Recarregue a página para ver os dados.");
    } catch {
      setMessage("Não foi possível ler esse arquivo. Verifique se é um backup do Transpetro Estudos.");
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    window.localStorage.setItem("transpetro-theme", next);
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <PageHeader eyebrow="Configurações" title="Preferências e seus dados" />

      {message && (
        <div className="card p-3 mb-5 text-[13px] text-foreground-muted border-l-4 border-l-brand">{message}</div>
      )}

      <section className="card p-5 mb-4">
        <h2 className="font-semibold text-[14px] mb-1">Cronograma</h2>
        <p className="text-xs text-foreground-muted">
          O cronograma do Meu Curso é calculado a partir da sua data de início e espalhado
          automaticamente sobre os dias úteis disponíveis até a prova — não há configuração manual de
          horas por dia. Veja as datas de cada dia em{" "}
          <Link href="/meu-curso/calendario" className="text-brand font-medium hover:underline">
            Calendário
          </Link>
          .
        </p>
      </section>

      <section className="card p-5 mb-4">
        <h2 className="font-semibold text-[14px] mb-1">Backup dos seus dados</h2>
        <p className="text-xs text-foreground-muted mb-3">
          Seus dados ficam apenas neste navegador (IndexedDB). Exporte um backup antes de limpar o cache ou trocar de
          computador. Nenhuma chave de API é incluída no arquivo.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportBackup}
            className="flex items-center gap-2 rounded-lg bg-brand text-brand-foreground px-3 py-2 text-xs font-medium hover:opacity-90"
          >
            <Download size={14} aria-hidden />
            Exportar backup
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
          >
            <Upload size={14} aria-hidden />
            Restaurar backup
          </button>
          <input ref={fileRef} type="file" accept="application/json" onChange={importBackup} className="hidden" />
        </div>
      </section>

      <section className="card p-5 mb-4">
        <h2 className="font-semibold text-[14px] mb-1">Aparência</h2>
        <p className="text-xs text-foreground-muted mb-3">Alterna entre tema claro e escuro.</p>
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
        >
          <Sun size={14} className="dark:hidden" aria-hidden />
          <Moon size={14} className="hidden dark:inline" aria-hidden />
          Alternar tema
        </button>
      </section>

      <section className="card p-5 mb-4">
        <h2 className="font-semibold text-[14px] mb-1">Histórico do Professor</h2>
        <p className="text-xs text-foreground-muted mb-3">
          O Professor guarda um resumo das últimas conversas para reconhecer o que já foi discutido. Fica só neste
          navegador, nunca inclui áudio gravado.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleHistory}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
          >
            {historyEnabled ? "Desligar histórico" : "Ligar histórico"}
          </button>
          <button
            type="button"
            onClick={clearHistory}
            className="flex items-center gap-2 rounded-lg border border-danger/40 text-danger px-3 py-2 text-xs font-medium hover:bg-danger-soft"
          >
            <Trash2 size={14} aria-hidden />
            Apagar todo o histórico
          </button>
        </div>
      </section>

      <section className="card p-5 mb-4">
        <h2 className="font-semibold text-[14px] mb-1">Integrações opcionais</h2>
        <p className="text-xs text-foreground-muted">
          O núcleo do Transpetro Estudos funciona <strong className="text-foreground">sem nenhuma chave de API</strong>. Integrações
          de IA, vídeo e nuvem são opcionais e, quando não configuradas, o sistema usa alternativas gratuitas do
          navegador — nunca deixa uma tela vazia.
        </p>
      </section>

      <section className="card p-5">
        <h2 className="font-semibold text-[14px] mb-1">Sobre o Transpetro Estudos</h2>
        <p className="text-xs text-foreground-muted">
          Aplicativo desenvolvido exclusivamente por David Sena Nascimento, a fim de estudar para o concurso da
          Transpetro. Todos os direitos reservados a David Sena.
        </p>
      </section>
    </main>
  );
}

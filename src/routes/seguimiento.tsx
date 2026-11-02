import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Clock, Plus, UploadCloud, FileText, X } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/seguimiento")({
  head: () => ({
    meta: [
      { title: "Bitácora y Seguimiento · DI UTFSM" },
      { name: "description", content: "Progreso, bitácora semanal e informes de tu práctica." },
      { property: "og:title", content: "Bitácora y Seguimiento · DI UTFSM" },
      { property: "og:description", content: "Progreso, bitácora semanal e informes de tu práctica." },
    ],
  }),
  component: TrackingPage,
});

const HOURS_PER_WEEK = 45;

function Dropzone({ k, title, desc }: { k: "informe" | "evaluacion"; title: string; desc: string }) {
  const { docs, setDoc } = useStore();
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const file = docs[k];
  const take = (f?: File) => { if (f) { setDoc(k, f.name); toast.success(`${title}: entregado`); } };
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${file ? "bg-success/15 text-success" : "bg-warning/20 text-accent-foreground"}`}>{file ? "Entregado" : "Pendiente"}</span>
      </div>
      {file ? (
        <div className="flex items-center justify-between rounded-lg bg-secondary p-3 text-sm">
          <span className="flex items-center gap-2 truncate"><FileText className="h-4 w-4 text-primary" />{file}</span>
          <button onClick={() => setDoc(k, null)} aria-label="Quitar"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <div
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files[0]); }}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${drag ? "border-primary bg-secondary" : "hover:border-primary"}`}
        >
          <UploadCloud className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-2 text-sm font-medium">Arrastra tu PDF o haz clic</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
          <input ref={ref} type="file" accept=".pdf,.doc,.docx" hidden onChange={(e) => take(e.target.files?.[0])} />
        </div>
      )}
    </div>
  );
}

function LogbookPage() {
  const { logs, addLog } = useStore();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return toast.error("Completa título y descripción");
    addLog({ id: crypto.randomUUID(), week: logs.length + 1, date: new Date().toISOString().slice(0, 10), title, description: desc });
    setTitle(""); setDesc("");
    toast.success("Entrada agregada a la bitácora");
  };
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Bitácora semanal</h2>
      <ol className="relative space-y-4 border-l-2 border-gold/60 pl-6">
        {[...logs].reverse().map((l) => (
          <li key={l.id} className="relative rounded-xl border bg-card p-4 fade-in">
            <span className="absolute -left-[33px] top-4 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-gold">{l.week}</span>
            <p className="text-xs text-muted-foreground">Semana {l.week} · {l.date}</p>
            <h3 className="font-semibold">{l.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{l.description}</p>
          </li>
        ))}
      </ol>
      <form onSubmit={submit} className="space-y-3 rounded-xl border bg-card p-5">
        <h3 className="font-semibold">Agregar Entrada a Bitácora</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título (ej: Integración con API de pagos)" className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Tareas realizadas y aprendizajes…" className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" />Agregar entrada</button>
      </form>
    </section>
  );
}

function TrackingPage() {
  const { logs, enrollments } = useStore();
  const active = enrollments.find((e) => e.status.includes("En Curso")) ?? enrollments[0];
  const week = Math.min(logs.length, 8);
  const hours = Math.min(logs.length * HOURS_PER_WEEK, 360);
  const pct = (hours / 360) * 100;
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
        <p className="text-sm opacity-75">{active ? `${active.company} · ${active.tipo}` : "Sin práctica activa"}</p>
        <h1 className="mt-1 text-2xl font-bold">Semana {week} de 8 — {hours} / 360 hrs completadas</h1>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-primary-foreground/20">
          <div className="h-full rounded-full bg-gold transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 flex items-center gap-1 text-sm opacity-80"><Clock className="h-4 w-4" />{Math.round(pct)}% de avance · cada entrada semanal suma {HOURS_PER_WEEK} hrs</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <LogbookPage />
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-primary">Requisitos académicos DI</h2>
          <Dropzone k="informe" title="Entrega de Informe Final" desc="Formato DI, máx. 20 páginas" />
          <Dropzone k="evaluacion" title="Evaluación de Supervisor" desc="Formulario firmado por el supervisor" />
        </section>
      </div>
    </div>
  );
}

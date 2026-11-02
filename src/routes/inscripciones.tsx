import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, CalendarDays, Building2, User } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Modalidad } from "@/lib/data";

export const Route = createFileRoute("/inscripciones")({
  head: () => ({
    meta: [
      { title: "Mis Inscripciones · DI UTFSM" },
      { name: "description", content: "Inscribe y revisa tus prácticas industriales IWI-300." },
      { property: "og:title", content: "Mis Inscripciones · DI UTFSM" },
      { property: "og:description", content: "Inscribe y revisa tus prácticas industriales IWI-300." },
    ],
  }),
  component: EnrollmentsPage,
});

const empty = { company: "", rut: "", supervisor: "", supervisorEmail: "", start: "", end: "", modalidad: "Presencial" as Modalidad };
const rutOk = (r: string) => /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/.test(r.trim());

function EnrollmentPage({ onDone }: { onDone: () => void }) {
  const { addEnrollment } = useStore();
  const [f, setF] = useState(empty);
  const [err, setErr] = useState<Partial<Record<keyof typeof empty, string>>>({});
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof typeof empty, string>> = {};
    if (!f.company.trim()) er.company = "Ingresa el nombre de la empresa";
    if (!rutOk(f.rut)) er.rut = "RUT inválido (ej: 76.645.030-K)";
    if (!f.supervisor.trim()) er.supervisor = "Ingresa el nombre del supervisor";
    if (!/^\S+@\S+\.\S+$/.test(f.supervisorEmail)) er.supervisorEmail = "Correo inválido";
    if (!f.start) er.start = "Fecha requerida";
    if (!f.end) er.end = "Fecha requerida";
    else if (f.start && f.end <= f.start) er.end = "Debe ser posterior al inicio";
    setErr(er);
    if (Object.keys(er).length) { toast.error("Revisa los campos marcados"); return; }
    addEnrollment({ ...f, id: crypto.randomUUID(), tipo: "Práctica Industrial (IWI-300 / 360 horas)", status: "Inscrita - En Revisión DI" });
    toast.success("Práctica inscrita", { description: "Estado: Inscrita - En Revisión DI" });
    setF(empty);
    onDone();
  };

  const field = (k: keyof typeof empty, label: string, type = "text", ph = "") => (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      <input type={type} value={f[k]} onChange={set(k)} placeholder={ph} className={`mt-1 w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring ${err[k] ? "border-destructive" : ""}`} />
      {err[k] && <span className="text-xs text-destructive">{err[k]}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2 fade-in">
      <h2 className="text-lg font-semibold text-primary sm:col-span-2">Formalizar práctica aprobada</h2>
      {field("company", "Nombre de la empresa", "text", "VOLVO CHILE SPA")}
      {field("rut", "RUT empresa", "text", "77.112.340-5")}
      {field("supervisor", "Nombre supervisor/a", "text", "Felipe Muñoz")}
      {field("supervisorEmail", "Correo supervisor/a", "email", "fmunoz@empresa.cl")}
      <label className="block text-sm sm:col-span-2">
        <span className="font-medium">Tipo de práctica</span>
        <select disabled className="mt-1 w-full rounded-lg border bg-muted px-3 py-2"><option>Práctica Industrial (IWI-300 / 360 horas)</option></select>
      </label>
      {field("start", "Fecha de inicio", "date")}
      {field("end", "Fecha de término", "date")}
      <label className="block text-sm">
        <span className="font-medium">Modalidad</span>
        <select value={f.modalidad} onChange={set("modalidad")} className="mt-1 w-full rounded-lg border bg-background px-3 py-2">
          <option>Presencial</option><option>Híbrido</option><option>Remoto</option>
        </select>
      </label>
      <div className="flex items-end justify-end gap-2">
        <button type="button" onClick={onDone} className="rounded-lg border px-4 py-2 text-sm">Cancelar</button>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Inscribir práctica</button>
      </div>
    </form>
  );
}

function EnrollmentsPage() {
  const { enrollments } = useStore();
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-primary">Mis Inscripciones</h1>
          <p className="text-muted-foreground">Prácticas registradas ante el Departamento de Informática.</p>
        </div>
        {!show && <button onClick={() => setShow(true)} className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 font-semibold text-primary"><Plus className="h-4 w-4" />Inscribir práctica</button>}
      </div>
      {show && <EnrollmentPage onDone={() => setShow(false)} />}
      <div className="space-y-3">
        {enrollments.map((e) => (
          <div key={e.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-5">
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-semibold"><Building2 className="h-4 w-4 text-primary" />{e.company} <span className="text-xs font-normal text-muted-foreground">RUT {e.rut}</span></p>
              <p className="text-sm text-muted-foreground">{e.tipo} · {e.modalidad}</p>
              <p className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-4 w-4" />{e.supervisor} ({e.supervisorEmail})</span>
                <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />{e.start} → {e.end}</span>
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${e.status.startsWith("Inscrita") ? "bg-warning/20 text-accent-foreground" : "bg-success/15 text-success"}`}>{e.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Mail, GraduationCap, Hash, Code2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { offers } from "@/lib/data";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi Perfil · DI UTFSM" },
      { name: "description", content: "Perfil académico del estudiante en el portal de prácticas." },
      { property: "og:title", content: "Mi Perfil · DI UTFSM" },
      { property: "og:description", content: "Perfil académico del estudiante en el portal de prácticas." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { applied, enrollments, logs } = useStore();
  const stats = [
    { n: applied.length, l: "Postulaciones" },
    { n: enrollments.length, l: "Inscripciones" },
    { n: logs.length, l: "Entradas bitácora" },
  ];
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-5 rounded-2xl border bg-card p-6">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-2xl font-bold text-gold">VT</span>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-primary">Verónica Torres</h1>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><GraduationCap className="h-4 w-4" />Ingeniería Civil Informática · Campus San Joaquín</p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><Hash className="h-4 w-4" />ROL 202073041-2 · 9° semestre</p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" />veronica.torres@usm.cl</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => <div key={s.l} className="rounded-xl border bg-card p-4 text-center"><p className="font-display text-3xl font-bold text-primary">{s.n}</p><p className="text-xs text-muted-foreground">{s.l}</p></div>)}
      </div>
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-3 flex items-center gap-2 font-semibold"><Code2 className="h-4 w-4" />Habilidades</h2>
        <div className="flex flex-wrap gap-2">{["React", "TypeScript", "Python", "Django", "PostgreSQL", "Docker", "Git", "Inglés B2"].map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{t}</span>)}</div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-3 font-semibold">Mis postulaciones</h2>
        {applied.length === 0 ? <p className="text-sm text-muted-foreground">Aún no postulas a ninguna oferta.</p> : (
          <ul className="space-y-1 text-sm">{applied.map((id) => { const o = offers.find((x) => x.id === id); return o && <li key={id}>• {o.title} — <span className="text-muted-foreground">{o.company}</span></li>; })}</ul>
        )}
      </div>
    </div>
  );
}

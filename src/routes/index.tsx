import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Banknote, Sparkles, Building2 } from "lucide-react";
import { offers, clp, type Modalidad, type Rol } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ofertas de Práctica · DI UTFSM" },
      { name: "description", content: "Ofertas de práctica para estudiantes de Informática UTFSM." },
      { property: "og:title", content: "Ofertas de Práctica · DI UTFSM" },
      { property: "og:description", content: "Ofertas de práctica para estudiantes de Informática UTFSM." },
    ],
  }),
  component: OffersPage,
});

const modalidades: Modalidad[] = ["Remoto", "Híbrido", "Presencial"];
const roles: Rol[] = ["Desarrollo Frontend", "Backend", "Data Science"];

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1 text-sm transition ${on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>
      {children}
    </button>
  );
}

function OffersPage() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<Modalidad | null>(null);
  const [rol, setRol] = useState<Rol | null>(null);
  const [min, setMin] = useState(400000);

  const list = useMemo(
    () =>
      offers
        .filter((o) => (o.title + o.company + o.location).toLowerCase().includes(q.toLowerCase()))
        .filter((o) => !mod || o.modalidad === mod)
        .filter((o) => !rol || o.rol === rol)
        .filter((o) => o.stipend >= min)
        .sort((a, b) => b.match - a.match),
    [q, mod, rol, min],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6 rounded-xl border bg-card p-5 lg:sticky lg:top-32 lg:self-start">
        <div>
          <h3 className="mb-2 text-sm font-semibold">Modalidad</h3>
          <div className="flex flex-wrap gap-2">
            {modalidades.map((m) => <Chip key={m} on={mod === m} onClick={() => setMod(mod === m ? null : m)}>{m}</Chip>)}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold">Rol</h3>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => <Chip key={r} on={rol === r} onClick={() => setRol(rol === r ? null : r)}>{r}</Chip>)}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold">Remuneración mínima</h3>
          <input type="range" min={400000} max={800000} step={50000} value={min} onChange={(e) => setMin(+e.target.value)} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground"><span>{clp(min)}</span><span>{clp(800000)}</span></div>
        </div>
        <button onClick={() => { setQ(""); setMod(null); setRol(null); setMin(400000); }} className="text-sm font-medium text-primary underline">Limpiar filtros</button>
      </aside>

      <section>
        <h1 className="text-3xl font-bold text-primary">Ofertas de Práctica</h1>
        <p className="mt-1 text-muted-foreground">Oportunidades validadas por el Departamento de Informática.</p>
        <div className="relative mt-5">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por cargo, empresa o ciudad…" className="w-full rounded-xl border bg-card py-2.5 pl-9 pr-3 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{list.length} ofertas encontradas</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {list.map((o) => (
            <Link key={o.id} to="/ofertas/$id" params={{ id: o.id }} className="group rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold leading-snug group-hover:text-primary">{o.title}</h2>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  <Sparkles className="h-3 w-3" /> Match: {o.match}%
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Building2 className="h-4 w-4" />{o.company}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{o.location} · {o.modalidad}</p>
                <p className="flex items-center gap-2 font-medium text-foreground"><Banknote className="h-4 w-4" />{clp(o.stipend)} / mes</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="rounded bg-secondary px-2 py-0.5 text-secondary-foreground">{o.rol}</span>
                <span className="text-muted-foreground">{o.posted}</span>
              </div>
            </Link>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No hay ofertas con esos filtros.</p>}
        </div>
      </section>
    </div>
  );
}

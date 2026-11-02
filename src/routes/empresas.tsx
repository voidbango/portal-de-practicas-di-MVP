import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin, Users, Search } from "lucide-react";
import { companies, offers } from "@/lib/data";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Empresas en convenio · DI UTFSM" },
      { name: "description", content: "Directorio de empresas colaboradoras del DI UTFSM." },
      { property: "og:title", content: "Empresas en convenio · DI UTFSM" },
      { property: "og:description", content: "Directorio de empresas colaboradoras del DI UTFSM." },
    ],
  }),
  component: CompaniesPage,
});

function CompaniesPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const filteredCompanies = companies.filter((company) =>
    company.name.toLocaleLowerCase("es").includes(normalizedQuery),
  );
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">Empresas en convenio</h1>
      <p className="mt-1 text-muted-foreground">Evaluadas por estudiantes sansanos que realizaron su práctica.</p>
      <div className="relative mt-5">
        <Search aria-hidden="true" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          aria-label="Buscar empresa"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre de empresa…"
          className="w-full rounded-xl border bg-card py-2.5 pl-9 pr-3 outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {filteredCompanies.length} {filteredCompanies.length === 1 ? "empresa encontrada" : "empresas encontradas"}
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((c) => {
          const active = offers.filter((o) => o.company === c.name);
          return (
            <div key={c.name} className="rounded-xl border bg-card p-5 transition hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-gold">{c.name.slice(0, 2).toUpperCase()}</span>
                <div>
                  <h2 className="font-semibold">{c.name}</h2>
                  <p className="text-xs text-muted-foreground">{c.sector} · RUT {c.rut}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-4 w-4 ${i <= Math.round(c.rating) ? "fill-gold text-gold" : "text-border"}`} />)}
                <span className="ml-1 text-sm font-semibold">{c.rating.toFixed(1)}</span>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{c.city}</p>
                <p className="flex items-center gap-2"><Users className="h-4 w-4" />{c.practicantesUSM} practicantes USM históricos</p>
              </div>
              <div className="mt-4 border-t pt-3">
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">{active.length} prácticas activas</p>
                {active.map((o) => <Link key={o.id} to="/ofertas/$id" params={{ id: o.id }} className="block truncate text-sm text-primary hover:underline">{o.title}</Link>)}
              </div>
            </div>
          );
        })}
        {filteredCompanies.length === 0 && (
          <p className="text-muted-foreground">No hay empresas que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
}

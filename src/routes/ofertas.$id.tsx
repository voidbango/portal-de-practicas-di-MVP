import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Mail, Phone, User, MapPin, Banknote, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { offers, clp } from "@/lib/data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/ofertas/$id")({
  loader: ({ params }) => {
    const offer = offers.find((o) => o.id === params.id);
    if (!offer) throw notFound();
    return offer;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Oferta"} · DI UTFSM` },
      { name: "description", content: loaderData?.description.slice(0, 150) ?? "Detalle de oferta" },
      { property: "og:title", content: loaderData?.title ?? "Oferta" },
      { property: "og:description", content: loaderData?.description.slice(0, 150) ?? "Detalle de oferta" },
    ],
  }),
  component: OfferDetailPage,
});

function OfferDetailPage() {
  const o = Route.useLoaderData();
  const { applied, apply } = useStore();
  const [open, setOpen] = useState(false);
  const done = applied.includes(o.id);

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-primary"><ArrowLeft className="h-4 w-4" />Volver a ofertas</Link>
      <div className="rounded-2xl border bg-card p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-medium text-muted-foreground">{o.company}</p>
            <h1 className="text-3xl font-bold text-primary">{o.title}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{o.location} · {o.modalidad}</span>
              <span className="flex items-center gap-1 font-medium text-foreground"><Banknote className="h-4 w-4" />{clp(o.stipend)} / mes</span>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground"><Sparkles className="h-4 w-4" />Afinidad: {o.match}%</span>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_260px]">
          <div className="space-y-6">
            <section><h2 className="mb-2 text-lg font-semibold">Descripción</h2><p className="leading-relaxed text-muted-foreground">{o.description}</p></section>
            <section>
              <h2 className="mb-2 text-lg font-semibold">Requisitos</h2>
              <ul className="space-y-2">{o.requirements.map((r) => <li key={r} className="flex gap-2 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{r}</li>)}</ul>
            </section>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl bg-secondary p-4 text-sm">
              <h3 className="mb-2 font-semibold">Supervisor/a</h3>
              <p className="flex items-center gap-2"><User className="h-4 w-4" />{o.supervisor.name}</p>
              <a href={`mailto:${o.supervisor.email}`} className="mt-1 flex items-center gap-2 break-all text-primary"><Mail className="h-4 w-4 shrink-0" />{o.supervisor.email}</a>
              <p className="mt-1 flex items-center gap-2"><Phone className="h-4 w-4" />{o.supervisor.phone}</p>
            </div>
            <button disabled={done} onClick={() => setOpen(true)} className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:bg-success">
              {done ? "✓ Postulación enviada" : "Postular a Práctica"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl fade-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-primary">Confirmar postulación</h3>
            <p className="mt-2 text-sm text-muted-foreground">Se enviará tu CV y certificado de alumno regular a <b>{o.company}</b> para "{o.title}".</p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-lg border px-4 py-2 text-sm">Cancelar</button>
              <button onClick={() => { apply(o.id); setOpen(false); toast.success("¡Postulación enviada!", { description: `${o.company} revisará tus antecedentes.` }); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

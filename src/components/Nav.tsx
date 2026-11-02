import { Link } from "@tanstack/react-router";
import { GraduationCap, Briefcase, Building2, ClipboardList, BookOpen, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Ofertas", icon: Briefcase },
  { to: "/empresas", label: "Empresas", icon: Building2 },
  { to: "/inscripciones", label: "Mis Inscripciones", icon: ClipboardList },
  { to: "/seguimiento", label: "Bitácora y Seguimiento", icon: BookOpen },
  { to: "/perfil", label: "Mi Perfil", icon: User },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-30 bg-primary text-primary-foreground shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-primary">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            DI Prácticas <span className="text-gold">· UTFSM</span>
          </span>
        </Link>
        <Link to="/perfil" className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-sm ring-1 ring-gold/40 transition hover:bg-primary-foreground/20">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-xs font-bold text-primary">VT</span>
          Verónica Torres <span className="hidden opacity-70 sm:inline">(Ingeniería Civil Informática)</span>
        </Link>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4">
        {tabs.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 py-2.5 text-sm opacity-75 transition hover:opacity-100"
            activeProps={{ className: "!border-gold !opacity-100 font-semibold" }}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

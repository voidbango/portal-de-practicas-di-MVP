import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { seedEnrollments, seedLogs, type Enrollment, type LogEntry } from "./data";

type Docs = { informe: string | null; evaluacion: string | null };

interface Store {
  enrollments: Enrollment[];
  addEnrollment: (e: Enrollment) => void;
  logs: LogEntry[];
  addLog: (l: LogEntry) => void;
  applied: string[];
  apply: (id: string) => void;
  docs: Docs;
  setDoc: (k: keyof Docs, name: string | null) => void;
}

const Ctx = createContext<Store | null>(null);

function usePersisted<T>(key: string, init: T) {
  const [v, setV] = useState<T>(init);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setV(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready) localStorage.setItem(key, JSON.stringify(v));
  }, [key, v, ready]);
  return [v, setV] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [enrollments, setE] = usePersisted("di_enrollments", seedEnrollments);
  const [logs, setL] = usePersisted("di_logs", seedLogs);
  const [applied, setA] = usePersisted<string[]>("di_applied", []);
  const [docs, setD] = usePersisted<Docs>("di_docs", { informe: null, evaluacion: null });
  return (
    <Ctx.Provider
      value={{
        enrollments,
        addEnrollment: (e) => setE((p) => [e, ...p]),
        logs,
        addLog: (l) => setL((p) => [...p, l]),
        applied,
        apply: (id) => setA((p) => (p.includes(id) ? p : [...p, id])),
        docs,
        setDoc: (k, name) => setD((p) => ({ ...p, [k]: name })),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("StoreProvider missing");
  return c;
}

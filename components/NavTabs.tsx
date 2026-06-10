"use client";

export type TabId = "visaoGeral" | "uf" | "colaboradores";

const TABS = [
  {
    id: "visaoGeral" as TabId,
    label: "Visão Geral",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "uf" as TabId,
    label: "UF / Cidade",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "colaboradores" as TabId,
    label: "Colaboradores",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function NavTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  return (
    <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1.5 overflow-x-auto">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            active === t.id
              ? "bg-[#003087] text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}

"use client";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: FilterOption[];
}

export default function FilterBar({ filters }: { filters: FilterConfig[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm px-5 py-3.5 flex items-center gap-5 flex-wrap">
      <div className="flex items-center gap-1.5 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider">Filtros</span>
      </div>
      <div className="w-px h-5 bg-slate-200" />
      <div className="flex items-center gap-4 flex-wrap">
        {filters.map((f) => (
          <div key={f.id} className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
              {f.label}
            </span>
            <select
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-700 focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/10 cursor-pointer min-w-[160px] transition-colors"
            >
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

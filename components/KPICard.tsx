"use client";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "blue" | "orange" | "green" | "purple";
  icon: React.ReactNode;
}

const accentStyles = {
  blue:   { border: "border-t-4 border-[#003087]", icon: "bg-blue-50 text-[#003087]" },
  orange: { border: "border-t-4 border-[#F47920]", icon: "bg-orange-50 text-[#F47920]" },
  green:  { border: "border-t-4 border-emerald-500", icon: "bg-emerald-50 text-emerald-600" },
  purple: { border: "border-t-4 border-violet-500", icon: "bg-violet-50 text-violet-600" },
};

export default function KPICard({ title, value, subtitle, accent = "blue", icon }: KPICardProps) {
  const s = accentStyles[accent];
  return (
    <div className={`bg-white rounded-xl shadow-sm ${s.border} p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.icon}`}>{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 leading-none">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1.5">{subtitle}</p>}
      </div>
    </div>
  );
}

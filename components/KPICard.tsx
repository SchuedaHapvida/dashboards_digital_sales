"use client";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: "blue" | "orange" | "green" | "purple";
  icon: React.ReactNode;
}

const accentMap = {
  blue: "border-t-4 border-[#003087]",
  orange: "border-t-4 border-[#F47920]",
  green: "border-t-4 border-green-500",
  purple: "border-t-4 border-purple-500",
};

const iconBgMap = {
  blue: "bg-blue-50 text-[#003087]",
  orange: "bg-orange-50 text-[#F47920]",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
};

export default function KPICard({
  title,
  value,
  subtitle,
  accent = "blue",
  icon,
}: KPICardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm ${accentMap[accent]} p-5 flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
          {title}
        </span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBgMap[accent]}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

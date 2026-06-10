"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Canal { canal_label: string; vendas: number; receita: number; ticket: number }

const CORES = ["#003087", "#F47920", "#1B4DB0", "#FF9A45", "#0EA5E9"];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Canal;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 mb-2">{label}</p>
      <p className="text-[#003087]">Vendas: <b>{d.vendas.toLocaleString("pt-BR")}</b></p>
      <p className="text-emerald-600">
        Receita: <b>R$ {d.receita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</b>
      </p>
      <p className="text-violet-600">
        Ticket Médio: <b>R$ {d.ticket.toFixed(2).replace(".", ",")}</b>
      </p>
    </div>
  );
}

export default function CanalChart({ data }: { data: Canal[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Vendas Digitais por Canal
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <YAxis type="category" dataKey="canal_label" width={90} tick={{ fontSize: 11, fill: "#475569" }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="vendas" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={CORES[i % CORES.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Totais por canal */}
      <div className="mt-3 space-y-1.5">
        {data.map((d, i) => {
          const pct = ((d.vendas / data.reduce((s, x) => s + x.vendas, 0)) * 100).toFixed(1);
          return (
            <div key={d.canal_label} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: CORES[i % CORES.length] }} />
                <span className="text-slate-600">{d.canal_label}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500">
                <span>{pct}%</span>
                <span className="font-semibold text-slate-700 w-12 text-right">{d.vendas.toLocaleString("pt-BR")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface UF { UF: string; vendas: number; receita: number }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as UF;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      <p className="text-[#003087]">Vendas: <b>{d.vendas.toLocaleString("pt-BR")}</b></p>
      <p className="text-emerald-600">
        Receita: <b>R$ {(d.receita / 1000).toFixed(1).replace(".", ",")}k</b>
      </p>
    </div>
  );
}

export default function UFChart({ data }: { data: UF[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Top Estados — Vendas Digitais
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 50, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} />
          <YAxis type="category" dataKey="UF" width={28} tick={{ fontSize: 11, fill: "#475569", fontWeight: 600 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="vendas" radius={[0, 4, 4, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={i === 0 ? "#003087" : i === 1 ? "#1B4DB0" : `hsl(${215 + i * 8}, 60%, ${45 + i * 3}%)`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

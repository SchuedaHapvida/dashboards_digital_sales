"use client";

import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";

interface Ponto { data: string; leads: number; vendas: number }

const fmt = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v);
const fmtLabel = (d: string) => {
  const [, mm, dd] = d.split("-");
  return `${dd}/${mm}`;
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const [, mm, dd] = label.split("-");
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 mb-2">{`${dd}/${mm}/2026`}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value.toLocaleString("pt-BR")}
        </p>
      ))}
    </div>
  );
}

export default function SerieTemporalChart({ data }: { data: Ponto[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="mb-4">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Leads × Vendas Digitais por Dia
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Correlação temporal entre volume de leads (WhatsApp) e novos contratos digitais
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey="data"
            tickFormatter={fmtLabel}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            interval={2}
          />
          <YAxis
            yAxisId="leads"
            orientation="left"
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            label={{ value: "Leads", angle: -90, position: "insideLeft", fontSize: 11, fill: "#94A3B8", dy: 20 }}
          />
          <YAxis
            yAxisId="vendas"
            orientation="right"
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            label={{ value: "Vendas", angle: 90, position: "insideRight", fontSize: 11, fill: "#94A3B8", dy: -20 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar yAxisId="leads" dataKey="leads" name="Leads (WhatsApp)" fill="#003087" opacity={0.75} radius={[2,2,0,0]} />
          <Line yAxisId="vendas" type="monotone" dataKey="vendas" name="Vendas Digitais" stroke="#F47920" strokeWidth={2.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

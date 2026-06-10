"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Hora { label: string; leads: number }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700">{label}</p>
      <p className="text-[#003087]">Leads: <b>{payload[0].value.toLocaleString("pt-BR")}</b></p>
    </div>
  );
}

export default function VolumeHorario({ data }: { data: Hora[] }) {
  const peak = data.reduce((a, b) => (b.leads > a.leads ? b : a));
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Volume de Leads por Hora
          </h2>
          <p className="text-xs text-slate-400 mt-1">Distribuição dos contatos recebidos ao longo do dia</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Pico</p>
          <p className="text-lg font-bold text-[#003087]">{peak.label}</p>
          <p className="text-xs text-slate-500">{peak.leads.toLocaleString("pt-BR")} leads</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#003087" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#003087" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#94A3B8" }} interval={1} />
          <YAxis tickFormatter={(v) => (v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v))} tick={{ fontSize: 10, fill: "#94A3B8" }} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="leads" stroke="#003087" strokeWidth={2} fill="url(#colorLeads)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

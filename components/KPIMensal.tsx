"use client";

interface MesData {
  mes: string;
  leads: number;
  vendas: number;
  receita: number;
  ticketMedio: number;
}

function fmt(n: number) { return n.toLocaleString("pt-BR"); }
function fmtR(n: number) {
  return n >= 1_000_000
    ? `R$ ${(n / 1_000_000).toFixed(2).replace(".", ",")}M`
    : `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function KPIMensal({ data }: { data: MesData[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Comparativo Mensal
        </h2>
      </div>
      <div className="grid grid-cols-2 divide-x divide-slate-100">
        {data.map((m) => (
          <div key={m.mes} className="p-5">
            <p className="text-sm font-bold text-[#003087] mb-4">{m.mes}</p>
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Leads" value={fmt(m.leads)} color="text-[#003087]" />
              <Stat label="Vendas Digitais" value={fmt(m.vendas)} color="text-[#F47920]" />
              <Stat label="Receita" value={fmtR(m.receita)} color="text-emerald-600" />
              <Stat label="Ticket Médio" value={`R$ ${m.ticketMedio.toFixed(2).replace(".", ",")}`} color="text-violet-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className={`text-xl font-bold leading-none ${color}`}>{value}</p>
    </div>
  );
}

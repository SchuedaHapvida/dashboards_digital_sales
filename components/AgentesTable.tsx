"use client";

interface Agente {
  nome: string;
  chats: number;
  vendas: number;
  conversao: number;
  gestao: string;
  supervisorDireto: string;
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function AgentesTable({ data }: { data: Agente[] }) {
  const maxChats = data[0]?.chats ?? 1;
  const sorted = [...data].sort((a, b) => b.vendas - a.vendas);
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Ranking de Agentes — WhatsApp (Gupshup)
        </h2>
        <span className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Agentes não identificados na base de promotores
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-4 py-2.5 text-left w-6">#</th>
              <th className="px-4 py-2.5 text-left">Agente</th>
              <th className="px-4 py-2.5 text-center">Volume</th>
              <th className="px-4 py-2.5 text-right">Chats</th>
              <th className="px-4 py-2.5 text-right">Vendas</th>
              <th className="px-4 py-2.5 text-right">Conv.%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sorted.map((a, i) => {
              const pct = (a.chats / maxChats) * 100;
              const convColor =
                a.conversao >= 10
                  ? "text-emerald-600 font-bold"
                  : a.conversao >= 6
                  ? "text-[#F47920] font-semibold"
                  : "text-slate-400";
              return (
                <tr key={a.nome} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-slate-400 text-xs">
                    {i < 3 ? MEDAL[i] : i + 1}
                  </td>
                  <td className="px-4 py-2.5">
                    <div>
                      <p className="font-medium text-slate-700 text-xs leading-tight">
                        {a.nome}
                      </p>
                      <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5">
                        <div
                          className="h-1 rounded-full bg-[#F47920]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-center text-xs text-slate-400">
                    {pct.toFixed(0)}%
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-600">
                    {a.chats.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#003087]">
                    {a.vendas}
                  </td>
                  <td className={`px-4 py-2.5 text-right ${convColor}`}>
                    {a.conversao.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

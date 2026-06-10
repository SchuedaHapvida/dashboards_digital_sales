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

function fmtN(n: number) {
  return n.toLocaleString("pt-BR");
}

export default function AgentesTable({ data }: { data: Agente[] }) {
  const sorted = [...data].sort((a, b) => b.vendas - a.vendas);
  const totalChats = sorted.reduce((s, a) => s + a.chats, 0);
  const totalVendas = sorted.reduce((s, a) => s + a.vendas, 0);
  const avgConv = totalChats > 0 ? (totalVendas / totalChats) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Detalhamento por Agente — WhatsApp (Gupshup)
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
            <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="px-4 py-3 text-left w-6">#</th>
              <th className="px-4 py-3 text-left">Agente</th>
              <th className="px-4 py-3 text-right">Chats</th>
              <th className="px-4 py-3 text-right">Vendas</th>
              <th className="px-4 py-3 text-right">Conv.%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sorted.map((a, i) => {
              const convColor =
                a.conversao >= 10
                  ? "text-emerald-600 font-bold"
                  : a.conversao >= 6
                  ? "text-[#F47920] font-semibold"
                  : "text-slate-400";
              return (
                <tr key={a.nome} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-400 font-medium">
                    {i < 3 ? MEDAL[i] : i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-700 text-sm">{a.nome}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-semibold text-slate-900 text-xs">{fmtN(a.chats)}</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {totalChats > 0 ? ((a.chats / totalChats) * 100).toFixed(1) : "0"}% do total
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-semibold text-[#003087]">{fmtN(a.vendas)}</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {totalVendas > 0 ? ((a.vendas / totalVendas) * 100).toFixed(1) : "0"}% do total
                      </span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-right text-xs ${convColor}`}>
                    {a.conversao.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 border-t-2 border-slate-200 text-xs font-bold text-slate-600">
              <td className="px-4 py-3 text-slate-400">&Sigma;</td>
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-right text-slate-500">{fmtN(totalChats)}</td>
              <td className="px-4 py-3 text-right text-[#003087]">{fmtN(totalVendas)}</td>
              <td className="px-4 py-3 text-right text-slate-500">{avgConv.toFixed(1)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

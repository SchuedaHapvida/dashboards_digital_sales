"use client";

interface Vendedor { NM_VENDEDOR_PLANO: string; vendas: number; receita: number; ticket: number }

function fmtR(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function VendedoresTable({ data }: { data: Vendedor[] }) {
  const maxVendas = data[0]?.vendas ?? 1;
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Top Vendedores — Base Digital
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-4 py-2.5 text-left w-6">#</th>
              <th className="px-4 py-2.5 text-left">Vendedor</th>
              <th className="px-4 py-2.5 text-center">Volume</th>
              <th className="px-4 py-2.5 text-right">Vendas</th>
              <th className="px-4 py-2.5 text-right">Receita</th>
              <th className="px-4 py-2.5 text-right">Ticket</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((v, i) => {
              const pct = (v.vendas / maxVendas) * 100;
              return (
                <tr key={v.NM_VENDEDOR_PLANO} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-slate-400 text-xs">
                    {i < 3 ? MEDAL[i] : i + 1}
                  </td>
                  <td className="px-4 py-2.5">
                    <div>
                      <p className="font-medium text-slate-700 text-xs leading-tight">
                        {v.NM_VENDEDOR_PLANO}
                      </p>
                      <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5">
                        <div
                          className="h-1 rounded-full bg-[#003087]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className="text-xs text-slate-400">{pct.toFixed(0)}%</span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#003087]">
                    {v.vendas}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-emerald-600 text-xs">
                    {fmtR(v.receita)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-500 text-xs">
                    {fmtR(v.ticket)}
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

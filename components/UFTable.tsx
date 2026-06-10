"use client";

interface UF {
  UF: string;
  vendas: number;
  receita: number;
  leads?: number | null;
}

function fmtR(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(2).replace(".", ",")}M`;
  return `R$ ${(n / 1000).toFixed(1).replace(".", ",")}k`;
}

function fmtN(n: number) {
  return n.toLocaleString("pt-BR");
}


export default function UFTable({ data }: { data: UF[] }) {
  const totalVendas = data.reduce((s, d) => s + d.vendas, 0);
  const totalReceita = data.reduce((s, d) => s + d.receita, 0);
  const totalLeads = data.every((d) => d.leads != null)
    ? data.reduce((s, d) => s + (d.leads ?? 0), 0)
    : null;
  const hasLeads = totalLeads !== null;

  return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Detalhamento por Estado
          </h2>
          {!hasLeads && (
            <span className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Leads por UF não disponíveis — Taxa de Conversão não calculável
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="px-4 py-3 text-left w-6">#</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-right">Total Leads</th>
                <th className="px-4 py-3 text-right">Vendas QTD</th>
                <th className="px-4 py-3 text-right">Taxa Conv.</th>
                <th className="px-4 py-3 text-right">Receita Total</th>
                <th className="px-4 py-3 text-right">Ticket Médio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.map((d, i) => {
                const ticket = d.receita / d.vendas;
                const conv =
                  d.leads != null && d.leads > 0
                    ? ((d.vendas / d.leads) * 100).toFixed(1) + "%"
                    : null;
                return (
                  <tr key={d.UF} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-sm flex-shrink-0 bg-[#003087] opacity-80"
                          style={{ opacity: Math.max(0.2, 1 - i * 0.07) }}
                        />
                        <span className="font-bold text-slate-700 text-sm">{d.UF}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {d.leads != null ? (
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="font-semibold text-slate-900 text-xs">{fmtN(d.leads)}</span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {totalLeads ? ((d.leads / totalLeads) * 100).toFixed(1) + "% do total" : "—"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#003087]">
                      {fmtN(d.vendas)}
                    </td>
                    <td className="px-4 py-3 text-right text-xs">
                      {conv ? (
                        <span className={`font-semibold ${parseFloat(conv) >= 25 ? "text-emerald-600" : parseFloat(conv) >= 15 ? "text-[#F47920]" : "text-slate-500"}`}>
                          {conv}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="font-semibold text-emerald-600 text-xs">{fmtR(d.receita)}</span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {((d.receita / totalReceita) * 100).toFixed(1)}% do total
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900 text-xs">
                      R$ {ticket.toFixed(2).replace(".", ",")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-200 text-xs font-bold text-slate-600">
                <td className="px-4 py-3 text-slate-400">&Sigma;</td>
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right text-slate-500">
                  {hasLeads ? fmtN(totalLeads!) : <span className="font-normal text-slate-300">—</span>}
                </td>
                <td className="px-4 py-3 text-right text-[#003087]">{fmtN(totalVendas)}</td>
                <td className="px-4 py-3 text-right text-slate-400">—</td>
                <td className="px-4 py-3 text-right text-emerald-600">{fmtR(totalReceita)}</td>
                <td className="px-4 py-3 text-right text-slate-500">
                  R$ {(totalReceita / totalVendas).toFixed(2).replace(".", ",")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
  );
}

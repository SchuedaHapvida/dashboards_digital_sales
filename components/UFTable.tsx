"use client";

interface UF {
  UF: string;
  vendas: number;
  receita: number;
}

function fmtR(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(2).replace(".", ",")}M`;
  return `R$ ${(n / 1000).toFixed(1).replace(".", ",")}k`;
}

export default function UFTable({ data }: { data: UF[] }) {
  const totalVendas = data.reduce((s, d) => s + d.vendas, 0);
  const totalReceita = data.reduce((s, d) => s + d.receita, 0);
  const maxVendas = data[0]?.vendas ?? 1;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Detalhamento por Estado
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-4 py-2.5 text-left w-6">#</th>
              <th className="px-4 py-2.5 text-left">Estado</th>
              <th className="px-4 py-2.5 text-right">Vendas</th>
              <th className="px-4 py-2.5 text-right">% Total</th>
              <th className="px-4 py-2.5 text-right">Receita</th>
              <th className="px-4 py-2.5 text-right">Ticket Médio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((d, i) => {
              const pct = (d.vendas / totalVendas) * 100;
              const barPct = (d.vendas / maxVendas) * 100;
              const ticket = d.receita / d.vendas;
              return (
                <tr key={d.UF} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 text-xs text-slate-400 font-medium">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-700 w-8">{d.UF}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 min-w-[80px]">
                        <div
                          className="h-1.5 rounded-full bg-[#003087]"
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#003087]">
                    {d.vendas.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="bg-blue-50 text-[#003087] text-xs font-semibold px-2 py-0.5 rounded-full">
                      {pct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-emerald-600 text-xs">
                    {fmtR(d.receita)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-500 text-xs">
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
              <td className="px-4 py-3 text-right text-[#003087]">
                {totalVendas.toLocaleString("pt-BR")}
              </td>
              <td className="px-4 py-3 text-right">100%</td>
              <td className="px-4 py-3 text-right text-emerald-600">
                {fmtR(totalReceita)}
              </td>
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

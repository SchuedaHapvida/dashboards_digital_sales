"use client";

interface Vendedor {
  NM_VENDEDOR_PLANO: string;
  vendas: number;
  receita: number;
  ticket: number;
  gestao: string;
  supervisorDireto: string;
}

function fmtR(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(2).replace(".", ",")}M`;
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function fmtN(n: number) {
  return n.toLocaleString("pt-BR");
}

const MEDAL = ["🥇", "🥈", "🥉"];

function GestaoTag({ gestao }: { gestao: string }) {
  if (gestao === "Não identificado") {
    return (
      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
        N/I
      </span>
    );
  }
  const cls =
    gestao === "Fabio"
      ? "bg-[#003087]/10 text-[#003087]"
      : gestao === "Josy"
      ? "bg-[#F47920]/10 text-[#F47920]"
      : "bg-slate-200/60 text-slate-600";
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${cls}`}>
      {gestao}
    </span>
  );
}

interface Props {
  data: Vendedor[];
  gestaoFilter?: string;
  supervisorFilter?: string;
  showHierarchy?: boolean;
}

export default function VendedoresTable({
  data,
  gestaoFilter = "todos",
  supervisorFilter = "todos",
  showHierarchy = false,
}: Props) {
  const filtered = data.filter((v) => {
    if (gestaoFilter !== "todos" && v.gestao !== gestaoFilter) return false;
    if (supervisorFilter !== "todos" && v.supervisorDireto !== supervisorFilter) return false;
    return true;
  });

  const totalVendas = filtered.reduce((s, v) => s + v.vendas, 0);
  const totalReceita = filtered.reduce((s, v) => s + v.receita, 0);
  const totalTicket = totalVendas > 0 ? totalReceita / totalVendas : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Detalhamento por Vendedor — Base Digital
        </h2>
        {filtered.length !== data.length && (
          <span className="text-xs text-[#003087] bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold">
            {filtered.length} de {data.length}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="px-5 py-10 text-center text-slate-400 text-sm">
          Nenhum vendedor encontrado para o filtro selecionado.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="px-4 py-3 text-left w-6">#</th>
                <th className="px-4 py-3 text-left">Vendedor</th>
                {showHierarchy && <th className="px-4 py-3 text-left">Gestão</th>}
                {showHierarchy && <th className="px-4 py-3 text-left">Supervisor</th>}
                <th className="px-4 py-3 text-right">Vendas QTD</th>
                <th className="px-4 py-3 text-right">Receita Total</th>
                <th className="px-4 py-3 text-right">Ticket Médio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((v, i) => (
                <tr key={v.NM_VENDEDOR_PLANO} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-400 font-medium">
                    {i < 3 ? MEDAL[i] : i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-700 text-sm">{v.NM_VENDEDOR_PLANO}</span>
                  </td>
                  {showHierarchy && (
                    <td className="px-4 py-3">
                      <GestaoTag gestao={v.gestao} />
                    </td>
                  )}
                  {showHierarchy && (
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                      {v.supervisorDireto === "Não identificado" ? (
                        <span className="text-slate-300">—</span>
                      ) : (
                        v.supervisorDireto
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-semibold text-[#003087]">{fmtN(v.vendas)}</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {totalVendas > 0 ? ((v.vendas / totalVendas) * 100).toFixed(1) : "0"}% do total
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="font-semibold text-emerald-600 text-xs">{fmtR(v.receita)}</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {totalReceita > 0 ? ((v.receita / totalReceita) * 100).toFixed(1) : "0"}% do total
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-900 text-xs">
                    {fmtR(v.ticket)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-200 text-xs font-bold text-slate-600">
                <td className="px-4 py-3 text-slate-400">&Sigma;</td>
                <td className="px-4 py-3">Total</td>
                {showHierarchy && <td />}
                {showHierarchy && <td />}
                <td className="px-4 py-3 text-right text-[#003087]">{fmtN(totalVendas)}</td>
                <td className="px-4 py-3 text-right text-emerald-600">{fmtR(totalReceita)}</td>
                <td className="px-4 py-3 text-right text-slate-500">{fmtR(totalTicket)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

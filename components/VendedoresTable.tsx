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
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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
      : "bg-[#F47920]/10 text-[#F47920]";
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

  const maxVendas = filtered[0]?.vendas ?? data[0]?.vendas ?? 1;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Top Vendedores — Base Digital
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
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-2.5 text-left w-6">#</th>
                <th className="px-4 py-2.5 text-left">Vendedor</th>
                {showHierarchy && (
                  <th className="px-4 py-2.5 text-left">Gestão</th>
                )}
                {showHierarchy && (
                  <th className="px-4 py-2.5 text-left">Supervisor</th>
                )}
                <th className="px-4 py-2.5 text-center">Vol.</th>
                <th className="px-4 py-2.5 text-right">Vendas</th>
                <th className="px-4 py-2.5 text-right">Receita</th>
                <th className="px-4 py-2.5 text-right">Ticket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((v, i) => {
                const pct = (v.vendas / maxVendas) * 100;
                return (
                  <tr
                    key={v.NM_VENDEDOR_PLANO}
                    className="hover:bg-slate-50 transition-colors"
                  >
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
                    {showHierarchy && (
                      <td className="px-4 py-2.5">
                        <GestaoTag gestao={v.gestao} />
                      </td>
                    )}
                    {showHierarchy && (
                      <td className="px-4 py-2.5 text-xs text-slate-500 whitespace-nowrap">
                        {v.supervisorDireto === "Não identificado" ? (
                          <span className="text-slate-300">—</span>
                        ) : (
                          v.supervisorDireto
                        )}
                      </td>
                    )}
                    <td className="px-4 py-2.5 text-center">
                      <span className="text-xs text-slate-400">
                        {pct.toFixed(0)}%
                      </span>
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
      )}
    </div>
  );
}

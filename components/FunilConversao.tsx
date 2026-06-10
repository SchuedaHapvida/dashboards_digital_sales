"use client";

import { funilConversao } from "@/lib/data";

export default function FunilConversao() {
  const max = funilConversao[0].valor;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-5">
        Funil de Conversão
      </h2>
      <div className="flex flex-col gap-3">
        {funilConversao.map((item, i) => {
          const pct = (item.valor / max) * 100;
          const convPct = ((item.valor / max) * 100).toFixed(1);
          return (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">{item.etapa}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{convPct}%</span>
                  <span className="font-bold text-slate-800">
                    {item.valor.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden">
                <div
                  className="h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: item.cor }}
                >
                  {pct > 15 && (
                    <span className="text-white text-xs font-semibold">
                      {item.valor.toLocaleString("pt-BR")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 pt-4 border-t border-slate-100 flex gap-6">
        <div className="text-center">
          <p className="text-xs text-slate-400">Conv. Geral</p>
          <p className="text-lg font-bold text-green-600">2,87%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400">Conv. Tagueados</p>
          <p className="text-lg font-bold text-[#F47920]">11,8%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400">Tagueados</p>
          <p className="text-lg font-bold text-[#003087]">24,4%</p>
        </div>
      </div>
    </div>
  );
}

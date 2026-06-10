"use client";

import { useState, useMemo } from "react";
import data from "@/lib/dashboard_data.json";
import promotoresData from "@/lib/promotores.json";

import Header from "./Header";
import NavTabs, { TabId } from "./NavTabs";
import FilterBar from "./FilterBar";
import KPICard from "./KPICard";
import KPIMensal from "./KPIMensal";
import SerieTemporalChart from "./SerieTemporalChart";
import CanalChart from "./CanalChart";
import UFChart from "./UFChart";
import UFTable from "./UFTable";
import VolumeHorario from "./VolumeHorario";
import VendedoresTable from "./VendedoresTable";


// ─── icons ───────────────────────────────────────────────────────────────────

function IconChat() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
function IconCart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconMoney() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconTicket() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}
function IconTeam() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function fmtM(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(2).replace(".", ",")}M`;
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// ─── main component ───────────────────────────────────────────────────────────

export default function DashboardClient() {
  const { kpi, kpiMes, serieTemporal, canal, uf, vendedores, agentesGup, volumeHorario } = data;

  // ── tab
  const [activeTab, setActiveTab] = useState<TabId>("visaoGeral");

  // ── visão geral filters
  const [periodo, setPeriodo] = useState<"total" | "maio" | "junho">("total");
  const [canalFiltro, setCanalFiltro] = useState("todos");

  // ── colaboradores filters
  const [gestaoFiltro, setGestaoFiltro] = useState("todos");
  const [supervisorFiltro, setSupervisorFiltro] = useState("todos");

  function handleGestaoChange(g: string) {
    setGestaoFiltro(g);
    setSupervisorFiltro("todos");
  }

  // ── série temporal filtered by período
  const serieFiltered = useMemo(() => {
    if (periodo === "maio") return serieTemporal.filter((d) => d.data.startsWith("2026-05"));
    if (periodo === "junho") return serieTemporal.filter((d) => d.data.startsWith("2026-06"));
    return serieTemporal;
  }, [periodo]);

  // ── kpiMes filtered by período
  const kpiMesFiltered = useMemo(() => {
    if (periodo === "maio") return kpiMes.filter((m) => m.mes.includes("Maio"));
    if (periodo === "junho") return kpiMes.filter((m) => m.mes.includes("Jun"));
    return kpiMes;
  }, [periodo]);

  // ── aggregate KPIs from filtered período
  const kpiFiltered = useMemo(() => {
    if (periodo === "total") return kpi;
    const items = kpiMesFiltered;
    if (items.length === 0) return kpi;
    const totalLeads = items.reduce((s, m) => s + m.leads, 0);
    const totalVendas = items.reduce((s, m) => s + m.vendas, 0);
    const receitaTotal = items.reduce((s, m) => s + m.receita, 0);
    const ticketMedio = receitaTotal / totalVendas;
    return { totalLeads, totalVendas, receitaTotal, ticketMedio };
  }, [periodo, kpiMesFiltered]);

  // ── supervisor dropdown options (cascades from gestão)
  const supervisorOptions = useMemo(() => {
    const hierarquia = promotoresData.supervisoresPorGestao as Record<string, string[]>;
    let sups: string[];
    if (gestaoFiltro === "todos") {
      sups = [
        ...(hierarquia["Fabio"] ?? []),
        ...(hierarquia["Josy"] ?? []),
      ].sort();
    } else {
      sups = [...(hierarquia[gestaoFiltro] ?? [])];
    }
    return [
      { value: "todos", label: "Todos os Supervisores" },
      ...sups.map((s) => ({ value: s, label: s })),
    ];
  }, [gestaoFiltro]);

  // ── colaboradores summary KPIs (from filtered vendedores)
  const colabKPIs = useMemo(() => {
    const filtered = (vendedores as any[]).filter((v) => {
      if (gestaoFiltro !== "todos" && v.gestao !== gestaoFiltro) return false;
      if (supervisorFiltro !== "todos" && v.supervisorDireto !== supervisorFiltro) return false;
      return true;
    });
    const totalVendas = filtered.reduce((s: number, v: any) => s + v.vendas, 0);
    const receitaTotal = filtered.reduce((s: number, v: any) => s + v.receita, 0);
    const ticketMedio = totalVendas > 0 ? receitaTotal / totalVendas : 0;
    return { count: filtered.length, totalVendas, receitaTotal, ticketMedio };
  }, [gestaoFiltro, supervisorFiltro]);

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <Header />

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-4">

        {/* ── navigation tabs */}
        <NavTabs active={activeTab} onChange={setActiveTab} />

        {/* ══════════════════════════════════════════════════════════
            TAB: VISÃO GERAL
        ══════════════════════════════════════════════════════════ */}
        {activeTab === "visaoGeral" && (
          <div className="space-y-5">
            <FilterBar
              filters={[
                {
                  id: "periodo",
                  label: "Período",
                  value: periodo,
                  onChange: (v) => setPeriodo(v as "total" | "maio" | "junho"),
                  options: [
                    { value: "total", label: "Total (Mai – Jun)" },
                    { value: "maio", label: "Maio 2026" },
                    { value: "junho", label: "Junho 2026" },
                  ],
                },
                {
                  id: "canal",
                  label: "Canal",
                  value: canalFiltro,
                  onChange: setCanalFiltro,
                  options: [
                    { value: "todos", label: "Todos os Canais" },
                    { value: "Individual", label: "Individual" },
                    { value: "PIM", label: "PIM" },
                    { value: "Administradora", label: "Administradora" },
                    { value: "Middle I", label: "Middle I" },
                  ],
                },
              ]}
            />

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Total de Leads"
                value={kpiFiltered.totalLeads.toLocaleString("pt-BR")}
                subtitle="Canal WhatsApp (Gupshup)"
                accent="blue"
                icon={<IconChat />}
              />
              <KPICard
                title="Vendas Digitais"
                value={kpiFiltered.totalVendas.toLocaleString("pt-BR")}
                subtitle="Novos contratos · Base Digital"
                accent="orange"
                icon={<IconCart />}
              />
              <KPICard
                title="Receita Gerada"
                value={fmtM(kpiFiltered.receitaTotal)}
                subtitle="Soma das mensalidades contratadas"
                accent="green"
                icon={<IconMoney />}
              />
              <KPICard
                title="Ticket Médio"
                value={`R$ ${kpiFiltered.ticketMedio.toFixed(2).replace(".", ",")}`}
                subtitle="Mensalidade média por contrato"
                accent="purple"
                icon={<IconTicket />}
              />
            </div>

            {/* Comparativo Mensal */}
            <KPIMensal data={kpiMesFiltered as any} />

            {/* Série Temporal + Canal */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="xl:col-span-2">
                <SerieTemporalChart data={serieFiltered as any} />
              </div>
              <CanalChart data={canal as any} />
            </div>

            {/* Volume Horário */}
            <VolumeHorario data={volumeHorario as any} />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB: UF / CIDADE
        ══════════════════════════════════════════════════════════ */}
        {activeTab === "uf" && (
          <div className="space-y-5">
            <FilterBar
              filters={[
                {
                  id: "periodo",
                  label: "Período",
                  value: periodo,
                  onChange: (v) => setPeriodo(v as "total" | "maio" | "junho"),
                  options: [
                    { value: "total", label: "Total (Mai – Jun)" },
                    { value: "maio", label: "Maio 2026" },
                    { value: "junho", label: "Junho 2026" },
                  ],
                },
                {
                  id: "canal",
                  label: "Canal",
                  value: canalFiltro,
                  onChange: setCanalFiltro,
                  options: [
                    { value: "todos", label: "Todos os Canais" },
                    { value: "Individual", label: "Individual" },
                    { value: "PIM", label: "PIM" },
                    { value: "Administradora", label: "Administradora" },
                    { value: "Middle I", label: "Middle I" },
                  ],
                },
                {
                  id: "gestao",
                  label: "Gestão",
                  value: gestaoFiltro,
                  onChange: handleGestaoChange,
                  options: [
                    { value: "todos", label: "Todas as Gestões" },
                    { value: "Fabio", label: "Fabio" },
                    { value: "Josy", label: "Josy" },
                    { value: "Administrativo", label: "Administrativo" },
                  ],
                },
                {
                  id: "supervisor",
                  label: "Supervisor",
                  value: supervisorFiltro,
                  onChange: setSupervisorFiltro,
                  options: supervisorOptions,
                },
              ]}
            />
            <UFTable data={uf as any} />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB: COLABORADORES
        ══════════════════════════════════════════════════════════ */}
        {activeTab === "colaboradores" && (
          <div className="space-y-5">
            <FilterBar
              filters={[
                {
                  id: "gestao",
                  label: "Gestão",
                  value: gestaoFiltro,
                  onChange: handleGestaoChange,
                  options: [
                    { value: "todos", label: "Todas as Gestões" },
                    { value: "Fabio", label: "Fabio" },
                    { value: "Josy", label: "Josy" },
                    { value: "Administrativo", label: "Administrativo" },
                  ],
                },
                {
                  id: "supervisor",
                  label: "Supervisor",
                  value: supervisorFiltro,
                  onChange: setSupervisorFiltro,
                  options: supervisorOptions,
                },
              ]}
            />

            {/* Team summary KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Vendedores"
                value={String(colabKPIs.count)}
                subtitle={
                  gestaoFiltro === "todos"
                    ? "Top performers · Base Digital"
                    : `Gestão ${gestaoFiltro}${supervisorFiltro !== "todos" ? ` · ${supervisorFiltro}` : ""}`
                }
                accent="blue"
                icon={<IconTeam />}
              />
              <KPICard
                title="Vendas (Top)"
                value={colabKPIs.totalVendas.toLocaleString("pt-BR")}
                subtitle="Total dos filtrados"
                accent="orange"
                icon={<IconCart />}
              />
              <KPICard
                title="Receita (Top)"
                value={fmtM(colabKPIs.receitaTotal)}
                subtitle="Soma dos filtrados"
                accent="green"
                icon={<IconMoney />}
              />
              <KPICard
                title="Ticket Médio"
                value={
                  colabKPIs.totalVendas > 0
                    ? `R$ ${colabKPIs.ticketMedio.toFixed(2).replace(".", ",")}`
                    : "—"
                }
                subtitle="Média dos filtrados"
                accent="purple"
                icon={<IconTicket />}
              />
            </div>

            <VendedoresTable
              data={vendedores as any}
              gestaoFilter={gestaoFiltro}
              supervisorFilter={supervisorFiltro}
              showHierarchy
            />
          </div>
        )}

        {/* footer */}
        <footer className="text-center text-xs text-slate-400 pb-4">
          Hapvida NotreDame Intermédica · Digital Sales · Dados: 01/05/2026 – 09/06/2026 · Gerado em Jun/2026
        </footer>
      </main>
    </div>
  );
}

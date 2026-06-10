import data from "@/lib/dashboard_data.json";
import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import KPIMensal from "@/components/KPIMensal";
import SerieTemporalChart from "@/components/SerieTemporalChart";
import CanalChart from "@/components/CanalChart";
import UFChart from "@/components/UFChart";
import VolumeHorario from "@/components/VolumeHorario";
import VendedoresTable from "@/components/VendedoresTable";
import AgentesTable from "@/components/AgentesTable";

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

function fmtM(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(2).replace(".", ",")}M`;
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function Page() {
  const { kpi, kpiMes, serieTemporal, canal, uf, vendedores, agentesGup, volumeHorario } = data;

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <Header />

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

        {/* KPIs Globais */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total de Leads"
            value={kpi.totalLeads.toLocaleString("pt-BR")}
            subtitle="Canal WhatsApp (Gupshup) · 01/05–09/06"
            accent="blue"
            icon={<IconChat />}
          />
          <KPICard
            title="Vendas Digitais"
            value={kpi.totalVendas.toLocaleString("pt-BR")}
            subtitle="Novos contratos · Base Digital"
            accent="orange"
            icon={<IconCart />}
          />
          <KPICard
            title="Receita Gerada"
            value={fmtM(kpi.receitaTotal)}
            subtitle="Soma das mensalidades contratadas"
            accent="green"
            icon={<IconMoney />}
          />
          <KPICard
            title="Ticket Médio"
            value={`R$ ${kpi.ticketMedio.toFixed(2).replace(".", ",")}`}
            subtitle="Mensalidade média por contrato"
            accent="purple"
            icon={<IconTicket />}
          />
        </div>

        {/* Comparativo Mensal */}
        <KPIMensal data={kpiMes as any} />

        {/* Série Temporal + Canal */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <SerieTemporalChart data={serieTemporal as any} />
          </div>
          <CanalChart data={canal as any} />
        </div>

        {/* Volume Horário */}
        <VolumeHorario data={volumeHorario as any} />

        {/* UF + Vendedores */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <UFChart data={uf as any} />
          <VendedoresTable data={vendedores as any} />
        </div>

        {/* Agentes Gupshup */}
        <AgentesTable data={agentesGup as any} />

        {/* Rodapé */}
        <footer className="text-center text-xs text-slate-400 pb-4">
          Hapvida NotreDame Intermédica · Digital Sales · Dados: 01/05/2026 – 09/06/2026 · Gerado em Jun/2026
        </footer>
      </main>
    </div>
  );
}

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # development server (localhost:3000)
npm run build    # production build (also validates TypeScript)
npm run lint     # ESLint
```

Always run `npm run build` after changes — it catches TypeScript errors and validates all pages.

## Architecture

**Next.js 14 App Router**, single route (`/`). All state lives client-side:

```
app/
  layout.tsx          # root layout, metadata
  page.tsx            # server component — just renders <DashboardClient />
  globals.css         # Tailwind directives + .hapvida-gradient utility

components/
  DashboardClient.tsx # "use client" — owns ALL tab + filter state, renders tab content inline
  NavTabs.tsx         # tab switcher (Visão Geral / UF-Cidade / Colaboradores)
  FilterBar.tsx       # generic filter row; accepts FilterConfig[] array
  Header.tsx          # top bar with Hapvida branding
  KPICard.tsx         # single metric card (accent: blue|orange|green|purple)
  KPIMensal.tsx       # side-by-side monthly comparison (Maio vs Junho)
  SerieTemporalChart.tsx  # recharts dual-axis: bar=leads, line=vendas
  CanalChart.tsx      # horizontal bar + table by sales channel
  UFChart.tsx         # horizontal bar chart by UF (used in Visão Geral only)
  UFTable.tsx         # full metrics table per UF (leads, vendas, conv%, receita, ticket, MKT share)
  VolumeHorario.tsx   # area chart: lead volume by hour
  VendedoresTable.tsx # top sellers; accepts gestaoFilter + supervisorFilter props + showHierarchy flag
  AgentesTable.tsx    # WhatsApp Gupshup agent ranking

lib/
  dashboard_data.json # primary data — all charts read from here
  promotores.json     # promoter hierarchy: 2 gestores → 14 supervisors → 293 promoters
  data.ts             # legacy static data (funnel, tags) — not used by main dashboard
```

## Data model (`dashboard_data.json`)

Key sections and their shapes:

| Key | Description |
|---|---|
| `kpi` | Global totals: totalLeads, totalVendas, receitaTotal, ticketMedio |
| `kpiMes[]` | Monthly breakdown: mes, leads, vendas, receita, ticketMedio |
| `serieTemporal[]` | Daily: data (YYYY-MM-DD), leads, vendas |
| `canal[]` | By channel: canal_label, vendas, receita, ticket |
| `uf[]` | By state: UF, vendas, receita, leads (populated from DDD extraction) |
| `vendedores[]` | Top sellers: NM_VENDEDOR_PLANO, vendas, receita, ticket, gestao, supervisorDireto |
| `agentesGup[]` | Gupshup agents: nome, chats, vendas, conversao, gestao, supervisorDireto |

**Period:** 01/05/2026 – 09/06/2026 (Hapvida NotreDame Intermédica · Digital Sales)

## Data sources & treatment rules

**Raw files (in uploads, not committed):**
- `Leads_Gup_Unificado.xlsx` — 48,868 Gupshup sessions (main WhatsApp export)
- `Leads_Gup__23_maio.csv` — 2,656 additional sessions from 23/May (missing from unified)
- `Base_Promotores_2.xlsx` — 334 rows, sheet `ATUAIS`; columns used: NOME COMPLETO, NOME GUP, GESTÃO, SUPERVISOR DIRETO, AREA, UNIDADE
- `10.06_BASE_DIGITAL.xlsx` — Base Digital vendas source

**Lead deduplication rule:** 1 lead per (phone_number, calendar_month).  
Same number in May + June = 2 leads. Same number twice in May = 1 lead.  
Applied to combined Unificado + CSV → **44,216 deduplicated leads** (51,524 raw).

**Leads per UF:** extracted from `Customer Mobile` column using Brazilian DDD → UF mapping.  
Format: `55` + DDD (2 digits) + number. Strip `55`, take first 2 digits.

**Promoter hierarchy:** `Base_Promotores_2.xlsx` GESTÃO column maps to `"Fabio"` (156 people, 9 supervisors) or `"Josy"` (137 people, 5 supervisors). Rows with GESTÃO in `{ADMINISTRATIVO, TREINAMENTO, DESCARTAR, VERIFICAR, ACTIONLINE, LOGIN TESTE, BENVE}` are excluded. Vendedores matched by `NOME COMPLETO` (uppercase exact match). Agentes Gupshup have no match in the promoter base → `gestao: "Não identificado"`.

## Filter state (DashboardClient.tsx)

| State var | Scope | Affects |
|---|---|---|
| `periodo` (total/maio/junho) | Visão Geral + UF tab | serieTemporal slice, kpiMes display, KPI cards |
| `canalFiltro` | Visão Geral + UF tab | CanalChart highlight |
| `gestaoFiltro` | Colaboradores tab | VendedoresTable filter, supervisor dropdown options, KPI summary |
| `supervisorFiltro` | Colaboradores tab | VendedoresTable filter, KPI summary |

`handleGestaoChange` resets `supervisorFiltro` to `"todos"` when gestão changes (cascade).

## Styling

Tailwind + custom colors in `tailwind.config.ts`:
- Primary blue: `#003087` (Hapvida brand)
- Secondary orange: `#F47920`
- `.hapvida-gradient` utility defined in `globals.css`

Charts use Recharts. No external icon library — all icons are inline SVGs.

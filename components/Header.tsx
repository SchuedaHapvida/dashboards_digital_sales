"use client";

import NavTabs, { TabId } from "./NavTabs";

interface Props {
  active: TabId;
  onTabChange: (t: TabId) => void;
}

export default function Header({ active, onTabChange }: Props) {
  return (
    <header className="hapvida-gradient shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col leading-none">
            <span className="text-white font-extrabold text-2xl tracking-tight">hapvida</span>
            <span className="text-[#F47920] font-light text-xs tracking-widest uppercase">
              Notre Dame Intermédica
            </span>
          </div>
        </div>

        {/* Tabs — center */}
        <div className="flex-1 flex justify-center">
          <NavTabs active={active} onChange={onTabChange} variant="header" />
        </div>

        {/* Dashboard label — right */}
        <div className="shrink-0 text-right">
          <p className="text-white font-semibold text-base leading-tight">Digital Sales Dashboard</p>
          <p className="text-blue-200 text-xs">Canal WhatsApp (Gupshup) × Base Digital</p>
        </div>
      </div>
    </header>
  );
}

"use client";

export default function Header() {
  return (
    <header className="hapvida-gradient shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="text-white font-extrabold text-2xl tracking-tight">
              hapvida
            </span>
            <span className="text-[#F47920] font-light text-xs tracking-widest uppercase">
              Notre Dame Intermédica
            </span>
          </div>
          <div className="w-px h-10 bg-white/20 mx-2" />
          <div>
            <p className="text-white font-semibold text-base">Digital Sales Dashboard</p>
            <p className="text-blue-200 text-xs">Canal WhatsApp (Gupshup) × Base Digital</p>
          </div>
        </div>

        {/* Período */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 border border-white/20">
          <div className="w-2 h-2 bg-[#F47920] rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">01/05/2026 – 09/06/2026</span>
        </div>
      </div>
    </header>
  );
}

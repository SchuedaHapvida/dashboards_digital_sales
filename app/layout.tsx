import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Sales Dashboard | Hapvida NotreDame Intermédica",
  description: "Painel executivo de vendas digitais — Leads Gupshup × Base Digital",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

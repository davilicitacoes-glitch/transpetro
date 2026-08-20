import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppInit } from "@/components/app/AppInit";
import { AuthProvider } from "@/lib/supabase/AuthProvider";
import { SyncStatusIndicator } from "@/components/app/SyncStatusIndicator";
import { UpdatePrompt } from "@/components/app/UpdatePrompt";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Transpetro Estudos — Preparação intensiva Nível Médio",
  description: "Curso, cronograma, questões e simulados para o concurso Transpetro (Edital nº 3/2026), nível médio — Administração e Controle.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Transpetro Estudos",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <AppInit />
          <UpdatePrompt />
          {children}
          <SyncStatusIndicator />
        </AuthProvider>
      </body>
    </html>
  );
}

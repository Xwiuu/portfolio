import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configuração das Fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- METADADOS DO SITE & ÍCONES ---
// Isto é o que aparece no Google, na aba do navegador e quando partilhas o link
export const metadata: Metadata = {
  title: "William Reis | The Alchemist",
  description: "Portfólio de William Reis - Web Architecture, Automations & Cybersecurity",
  icons: {
    // Aponta para o ficheiro icon.png (ou .svg) que colocaste na pasta src/app/
    icon: [
      { url: '/icon.png' },
    ],
    // Ícone otimizado para quando guardam o teu site no ecrã inicial do iPhone
    apple: [
      { url: '/icon.png' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Mudei o lang para "pt-BR" para ajudar no SEO, já que o site é em português
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
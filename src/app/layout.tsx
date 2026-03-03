import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // <--- IMPORTAÇÃO DO SCRIPT DO NEXT
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
export const metadata: Metadata = {
  title: "William Reis | The Alchemist",
  description: "Portfólio de William Reis - Web Architecture, Automations & Cybersecurity",
  icons: {
    icon: [
      { url: '/icon.png' },
    ],
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
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {children}

        {/* --- MICROSOFT CLARITY SCRIPT --- */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vpshgod7g2");
          `}
        </Script>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Civic AI - 自治体向けAIソリューション",
    template: "%s | Civic AI",
  },
  description:
    "シビックAI総合研究所が提供する自治体向けAI 20サービス。住民サービスの向上と行政業務の効率化を実現します。",
  keywords: [
    "自治体AI",
    "行政DX",
    "デジタル変革",
    "AIソリューション",
    "公共サービス",
  ],
  authors: [{ name: "シビックAI総合研究所" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Civic AI",
    title: "Civic AI - 自治体向けAIソリューション",
    description:
      "自治体向けAI 20サービスで行政サービスのデジタル変革を支援します。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${lexend.variable} ${sourceSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-link">
          メインコンテンツにスキップ
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

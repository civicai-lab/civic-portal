import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

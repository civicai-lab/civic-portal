import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "シビックAI総合研究所へのお問い合わせ。サービスの導入相談、デモリクエスト、見積もり依頼などお気軽にご連絡ください。",
  openGraph: {
    title: "お問い合わせ | Civic AI",
    description:
      "自治体向けAIソリューションの導入相談・デモリクエスト・見積もり依頼",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

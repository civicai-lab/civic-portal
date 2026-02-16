import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サービス一覧",
  description:
    "シビックAI総合研究所が提供する自治体向けAI 20サービス。SaaS型10サービスとシンクタンク型10サービスで、住民サービス向上と行政DXを実現します。",
  openGraph: {
    title: "サービス一覧 | Civic AI",
    description:
      "自治体向けAI 20サービス。住民問合せAI、防災AIガイド、議事録要約、パブコメ分析など。",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

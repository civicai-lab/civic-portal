import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "導入事例",
  description: "Civic AIサービスの自治体導入事例をご紹介します",
};

const cases = [
  {
    title: "中野区立図書館 — AI司書 SHIORI 導入",
    description: "AI司書により図書館利用者の本探し体験を革新。問い合わせ対応時間を40%削減し、利用者満足度が向上。",
    image: "/images/news/nakano-central-info-ai-2026.webp",
    category: "図書館",
    service: "AI司書 SHIORI",
  },
  {
    title: "小田原市立図書館 — 蔵書検索AI連携",
    description: "OPAC連携による蔵書検索の利便性向上。来館者からの質問にAIがリアルタイムで対応。",
    image: "/images/news/odawara-library.webp",
    category: "図書館",
    service: "AI司書 SHIORI",
  },
  {
    title: "自治体DX推進 — 庁内ナレッジ検索AI",
    description: "庁内の過去文書・規程・マニュアルをAIで横断検索。新人職員の業務習得期間を大幅短縮。",
    image: "/images/cases/backend-code.webp",
    category: "庁内業務",
    service: "庁内ナレッジ検索AI",
  },
  {
    title: "住民問い合わせAI — 24時間対応チャットボット",
    description: "住民からのよくある質問に24時間自動対応。窓口の混雑緩和と住民の利便性向上を同時に実現。",
    image: "/images/service-conversation.webp",
    category: "住民サービス",
    service: "住民問い合わせAI",
  },
];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/95 via-primary/90 to-accent-foreground py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            導入事例
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80">
            全国の自治体でのAI活用事例をご紹介します
          </p>
        </div>
      </section>

      {/* 事例一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {cases.map((caseItem) => (
              <Card
                key={caseItem.title}
                className="group cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 flex gap-2">
                    <Badge>{caseItem.category}</Badge>
                    <Badge variant="outline">{caseItem.service}</Badge>
                  </div>
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {caseItem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="mb-4 text-muted-foreground">
              さらに多くの導入事例については、お気軽にお問い合わせください
            </p>
            <Button variant="cta" size="lg" asChild>
              <Link href="/contact">
                お問い合わせ
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

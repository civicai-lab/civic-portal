import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "導入事例",
  description: "Civic AIサービスの自治体導入事例をご紹介します",
  openGraph: {
    title: "導入事例 | Civic AI",
    description: "全国の自治体でのAI活用事例をご紹介。図書館AI、住民対応AI、庁内ナレッジ検索AIなどの導入実績。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "導入事例 | Civic AI",
    description: "全国の自治体でのAI活用事例をご紹介します",
  },
};

const cases = [
  {
    title: "中野区立図書館 — AI司書 SHIORI 導入",
    description: "AI司書により図書館利用者の本探し体験を革新。問い合わせ対応時間を40%削減し、利用者満足度が向上。",
    image: "/images/news/nakano-central-info-ai-2026.webp",
    category: "図書館",
    service: "AI司書 SHIORI",
    results: ["問い合わせ対応時間 40%削減", "利用者満足度 92%達成"],
  },
  {
    title: "小田原市立図書館 — 蔵書検索AI連携",
    description: "OPAC連携による蔵書検索の利便性向上。来館者からの質問にAIがリアルタイムで対応。",
    image: "/images/news/odawara-library.webp",
    category: "図書館",
    service: "AI司書 SHIORI",
    results: ["検索精度 35%向上", "来館者質問対応 即時化"],
  },
  {
    title: "自治体DX推進 — 庁内ナレッジ検索AI",
    description: "庁内の過去文書・規程・マニュアルをAIで横断検索。新人職員の業務習得期間を大幅短縮。",
    image: "/images/cases/backend-code.webp",
    category: "庁内業務",
    service: "庁内ナレッジ検索AI",
    results: ["業務習得期間 50%短縮", "文書検索時間 70%削減"],
  },
  {
    title: "住民問い合わせAI — 24時間対応チャットボット",
    description: "住民からのよくある質問に24時間自動対応。窓口の混雑緩和と住民の利便性向上を同時に実現。",
    image: "/images/service-conversation.webp",
    category: "住民サービス",
    service: "住民問い合わせAI",
    results: ["窓口混雑 30%緩和", "24時間対応を実現"],
  },
];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-accent-foreground py-20 text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "導入事例" }]} />
          </div>
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              導入事例
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
              全国の自治体でのAI活用事例をご紹介します
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 事例一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {cases.map((caseItem, i) => (
              <AnimatedSection key={caseItem.title} animation="fade-up" delay={i * 100}>
                <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
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
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge>{caseItem.category}</Badge>
                      <Badge variant="outline">{caseItem.service}</Badge>
                    </div>
                    <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {caseItem.description}
                    </p>
                    {/* 成果セクション */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {caseItem.results.map((result) => (
                        <span
                          key={result}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                        >
                          <TrendingUp className="size-3" />
                          {result}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
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
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { shimmerBlur } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "ニュース",
  description: "シビックAI総合研究所からの最新ニュース・お知らせ",
  openGraph: {
    title: "ニュース | Civic AI",
    description: "シビックAI総合研究所からの最新ニュース・プレスリリース・イベント情報",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "ニュース | Civic AI",
    description: "シビックAI総合研究所からの最新ニュース・お知らせ",
  },
};

const newsItems = [
  {
    date: "2026-02-01",
    category: "プレスリリース",
    title: "中野区立図書館にAI司書 SHIORI を本格導入",
    description: "中野区立中央図書館へのAI司書の本格導入が開始されました。",
    image: "/images/news/nakano-central-info-ai-2026.webp",
  },
  {
    date: "2026-01-15",
    category: "イベント",
    title: "SHIP セミナー 2026 に登壇",
    description: "品川産業支援交流施設にてAIと自治体DXについて講演しました。",
    image: "/images/news/ship-seminar-2026.webp",
  },
  {
    date: "2025-11-20",
    category: "メディア",
    title: "図書館総合展 2025 に出展",
    description: "パシフィコ横浜で開催された図書館総合展にブースを出展しました。",
    image: "/images/news/toshocon-2025.webp",
  },
  {
    date: "2025-10-01",
    category: "プレスリリース",
    title: "小田原市立図書館との実証実験を開始",
    description: "小田原市立図書館でのAI司書実証実験がスタートしました。",
    image: "/images/news/odawara-library.webp",
  },
];

const categoryStyles: Record<string, string> = {
  "プレスリリース": "bg-primary/10 text-primary dark:bg-primary/20",
  "イベント": "bg-warning/10 text-warning-foreground dark:bg-warning/20",
  "メディア": "bg-success/10 text-success dark:bg-success/20",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border py-20 text-primary-foreground">
        <Image
          src="/images/hero/hero-tech.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent-foreground/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "ニュース" }]} />
          </div>
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              ニュース
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              最新のお知らせ・プレスリリース
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ニュース一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {newsItems.map((item, i) => (
              <AnimatedSection key={item.title} animation="fade-up" delay={i * 100}>
                <Card className="group cursor-pointer overflow-hidden transition-[box-shadow,transform] duration-300 hover:shadow-lg hover:scale-[1.01]">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-64">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={shimmerBlur}
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="mb-2 flex items-center gap-3">
                          <time
                            dateTime={item.date}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
                          >
                            <Calendar className="size-3.5 text-muted-foreground" />
                            {formatDate(item.date)}
                          </time>
                          <Badge
                            className={categoryStyles[item.category] ?? ""}
                          >
                            {item.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg transition-colors duration-200 group-hover:text-primary">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

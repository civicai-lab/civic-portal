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
  {
    date: "2026-02-15",
    category: "プレスリリース",
    title: "横浜市と福祉制度マッチングAIの実証実験を開始",
    description: "横浜市福祉局との連携により、AIによる福祉制度マッチングの実証実験を開始しました。",
    image: "/images/services/welfare-navigator-hero.webp",
  },
  {
    date: "2026-02-10",
    category: "メディア",
    title: "日経クロステック「自治体AI最前線」特集に掲載",
    description: "日経クロステックの特集記事にて、当社のAI司書SHIORIが紹介されました。",
    image: "/images/hero/hero-tech.webp",
  },
  {
    date: "2025-12-15",
    category: "イベント",
    title: "GovTech Summit 2025 に出展",
    description: "東京ビッグサイトで開催されたGovTech Summitにブースを出展しました。",
    image: "/images/sections/hero-cases.webp",
  },
  {
    date: "2025-11-01",
    category: "プレスリリース",
    title: "AIリスキリング研修プログラムを自治体職員向けに提供開始",
    description: "自治体職員のAIリテラシー向上を支援する研修プログラムの提供を開始しました。",
    image: "/images/services/ai-reskilling-hero.webp",
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
  const sortedNews = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sortedNews[0];
  const rest = sortedNews.slice(1);

  // JSON-LD構造化データ（NewsArticle ItemList）
  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": sortedNews.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": item.title,
        "description": item.description,
        "datePublished": item.date,
        "publisher": {
          "@type": "Organization",
          "name": "シビックAI総合研究所"
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
      />

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

      {/* Featured ニュース */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <Card className="group overflow-hidden transition-[box-shadow,transform] duration-300 hover:shadow-xl hover:-translate-y-0.5">
              <div className="flex flex-col md:flex-row">
                <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-auto md:w-1/2">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={shimmerBlur}
                    priority
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-3">
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        最新
                      </Badge>
                      <time
                        dateTime={featured.date}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
                      >
                        <Calendar className="size-3.5 text-muted-foreground" />
                        {formatDate(featured.date)}
                      </time>
                      <Badge
                        className={categoryStyles[featured.category] ?? ""}
                      >
                        {featured.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl md:text-2xl">
                      {featured.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {featured.description}
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* ニュース一覧 */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {rest.map((item, i) => (
              <AnimatedSection key={item.title} animation="fade-up" delay={i * 100}>
                <Card className="group overflow-hidden transition-[box-shadow,transform] duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-64">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover"
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
                        <CardTitle className="text-lg">
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

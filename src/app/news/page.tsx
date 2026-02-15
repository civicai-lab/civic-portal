import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "ニュース",
  description: "シビックAI総合研究所からの最新ニュース・お知らせ",
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

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Hero */}
      <section className="border-b border-border bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            ニュース
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            最新のお知らせ・プレスリリース
          </p>
        </div>
      </section>

      {/* ニュース一覧 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {newsItems.map((item) => (
              <Card
                key={item.title}
                className="group cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 256px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="mb-1 flex items-center gap-2">
                        <time className="text-sm text-muted-foreground">
                          {item.date}
                        </time>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

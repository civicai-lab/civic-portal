import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "採用情報",
  description: "シビックAI総合研究所の採用情報・募集職種",
};

const positions = [
  {
    title: "AIエンジニア",
    type: "正社員",
    location: "東京（リモート可）",
    description: "自治体向けAIサービスの設計・開発を担当。LLM、RAG、NLPの知見を活かせるポジションです。",
  },
  {
    title: "フロントエンドエンジニア",
    type: "正社員",
    location: "東京（リモート可）",
    description: "Next.js/Reactを使ったプロダクトUI開発。アクセシビリティとUXに注力しています。",
  },
  {
    title: "カスタマーサクセス",
    type: "正社員",
    location: "東京",
    description: "導入自治体へのオンボーディング・伴走支援。行政知識を活かしたサポート業務。",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-muted">
      <section className="relative overflow-hidden py-20 text-white">
        <Image
          src="/images/team/team-meeting.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/85 to-indigo-900/80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            採用情報
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            AIで行政を変える仲間を募集しています
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            募集職種
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {positions.map((pos) => (
              <Card key={pos.title}>
                <CardHeader>
                  <div className="mb-2 flex gap-2">
                    <Badge>{pos.type}</Badge>
                    <Badge variant="outline">{pos.location}</Badge>
                  </div>
                  <CardTitle className="text-lg">{pos.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {pos.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">
              ご興味をお持ちの方はお気軽にお問い合わせください
            </p>
            <Button variant="cta" size="lg" asChild>
              <Link href="/contact">
                応募する
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  ArrowRight,
  Heart,
  Rocket,
  Clock,
  Code,
  Palette,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "採用情報",
  description: "シビックAI総合研究所の採用情報・募集職種",
  openGraph: {
    title: "採用情報 | Civic AI",
    description:
      "AIで行政を変える仲間を募集。AIエンジニア、フロントエンド、カスタマーサクセス。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "採用情報 | Civic AI",
    description: "シビックAI総合研究所の採用情報・募集職種",
  },
};

const whyReasons = [
  {
    icon: Heart,
    title: "社会的インパクト",
    description:
      "自治体のDXを推進し、住民の暮らしを直接改善する。あなたの仕事が社会を変える実感を得られます。全国50以上の自治体に導入され、数百万人の住民生活に貢献しています。",
    gradient: "from-rose-500/20 to-pink-500/10",
  },
  {
    icon: Rocket,
    title: "技術的チャレンジ",
    description:
      "LLM、RAG、マルチモーダルAIなど最先端技術に取り組める環境。自治体特有の課題を技術で解決するやりがいがあります。社内勉強会や論文読み会も活発に行われています。",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: Clock,
    title: "柔軟な働き方",
    description:
      "フルリモート勤務可能、フレックスタイム制を採用。ワークライフバランスを大切にしながら、高い生産性を実現できる環境を整えています。副業・兼業も歓迎しています。",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
];

const positions = [
  {
    icon: Code,
    title: "AIエンジニア",
    type: "正社員",
    location: "東京（リモート可）",
    description:
      "自治体向けAIサービスの設計・開発を担当。LLM、RAG、NLPの知見を活かせるポジションです。",
  },
  {
    icon: Palette,
    title: "フロントエンドエンジニア",
    type: "正社員",
    location: "東京（リモート可）",
    description:
      "Next.js/Reactを使ったプロダクトUI開発。アクセシビリティとUXに注力しています。",
  },
  {
    icon: Users,
    title: "カスタマーサクセス",
    type: "正社員",
    location: "東京",
    description:
      "導入自治体へのオンボーディング・伴走支援。行政知識を活かしたサポート業務。",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <Image
          src="/images/team/team-meeting.webp"
          alt="シビックAI総合研究所のチームミーティング風景"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent-foreground/85" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { label: "ホーム", href: "/" },
                  { label: "採用情報" },
                ]}
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              採用情報
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              AIで行政を変える仲間を募集しています
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* なぜCivic AIで働くか */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                なぜCivic AIで働くか
              </h2>
              <p className="mt-4 text-muted-foreground">
                私たちと一緒に、テクノロジーで社会を変えましょう
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {whyReasons.map((reason, index) => (
              <AnimatedSection
                key={reason.title}
                animation="fade-up"
                delay={index * 100}
              >
                <Card className="h-full border-0 shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <CardHeader>
                    <div
                      className={`mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${reason.gradient}`}
                    >
                      <reason.icon className="size-6 text-foreground" />
                    </div>
                    <CardTitle className="text-lg">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{reason.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 募集職種 */}
      <section className="bg-card py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              募集職種
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {positions.map((pos, index) => (
              <AnimatedSection
                key={pos.title}
                animation="fade-up"
                delay={index * 100}
              >
                <Card className="group h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                        <pos.icon className="size-5 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        <Badge>{pos.type}</Badge>
                        <Badge variant="outline">{pos.location}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{pos.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {pos.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="mt-16 text-center">
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
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

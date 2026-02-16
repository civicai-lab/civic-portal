import type { Metadata } from "next";
import Image from "next/image";
import { shimmerBlur } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CountUp } from "@/components/ui/count-up";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "会社概要",
  description: "シビックAI総合研究所の会社情報・ミッション・チーム紹介",
  openGraph: {
    title: "会社概要 | Civic AI",
    description: "シビックAI総合研究所の会社情報・ミッション・チーム紹介",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: "会社概要 | Civic AI",
    description: "シビックAI総合研究所の会社情報・ミッション・チーム紹介",
  },
};

const stats: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: 50, suffix: "+", label: "導入自治体" },
  { value: 20, suffix: "種", label: "AIサービス" },
  { value: 99.9, suffix: "%", label: "テスト通過率", decimals: 1 },
  { value: 98, suffix: "%", label: "顧客満足度" },
  { value: 24, suffix: "h", label: "サポート対応" },
];

const teamMembers = [
  {
    name: "田中 誠一",
    role: "CEO / Founder",
    initial: "田中",
    gradient: "from-primary/30 via-primary/20 to-blue-500/10",
    description: "元総務省職員。行政DXの最前線でキャリアを積み、AIの社会実装に挑む。",
  },
  {
    name: "鈴木 健太",
    role: "CTO",
    initial: "鈴木",
    gradient: "from-thinktank/30 via-thinktank/20 to-primary/10",
    description: "大手IT企業出身。LLM・RAG基盤の設計を専門とし、自治体向けAI開発を牽引。",
  },
  {
    name: "佐藤 美咲",
    role: "COO",
    initial: "佐藤",
    gradient: "from-warning/30 via-warning/20 to-primary/10",
    description: "コンサルティングファーム出身。自治体との共創プロジェクトを多数推進。",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-accent-foreground py-20 text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "会社概要" }]} />
          </div>
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              会社概要
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              テクノロジーの力で、行政サービスをもっと身近に
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ミッション & ビジョン */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimatedSection animation="slide-left">
              <div>
                <h2 className="text-2xl font-bold text-foreground">ミッション</h2>
                <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
                  シビックAI総合研究所は、「AIで行政をもっと身近に」をミッションに、
                  自治体向けのAIソリューションを開発・提供しています。
                  20種類のサービスを通じて、住民サービスの向上と行政業務の効率化を
                  同時に実現することを目指しています。
                </p>
                <h2 className="mt-10 text-2xl font-bold text-foreground">
                  ビジョン
                </h2>
                <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
                  すべての自治体がAIの恩恵を受けられる社会を実現し、
                  住民一人ひとりに最適化された公共サービスを届けること。
                  テクノロジーと人の力を掛け合わせ、地方創生の新しい形を創ります。
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-right">
              <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/team/office-modern.webp"
                  alt="シビックAI総合研究所のオフィス風景"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={shimmerBlur}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 実績数値 */}
      <section className="border-y border-border bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground">
              実績
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} animation="fade-up" delay={i * 100}>
                <div className="text-center">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                    className="text-4xl font-bold text-primary md:text-5xl"
                  />
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* チームメンバー */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="mb-12 text-center text-2xl font-bold text-foreground">
              チーム
            </h2>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.name} animation="fade-up" delay={i * 150}>
                <div className="group cursor-pointer rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className={`relative mx-auto mb-4 flex size-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${member.gradient} ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30`}>
                    <span className="text-xl font-bold text-primary/70">
                      {member.initial}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 会社情報テーブル */}
      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              会社情報
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="mx-auto max-w-2xl space-y-4">
              {[
                ["社名", "シビックAI総合研究所"],
                ["設立", "2024年"],
                ["代表", "代表取締役"],
                ["所在地", "東京都千代田区"],
                ["事業内容", "自治体向けAIソリューションの開発・提供"],
                ["従業員数", "約20名"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex border-b border-border py-3"
                >
                  <span className="w-32 shrink-0 font-medium text-foreground">
                    {label}
                  </span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

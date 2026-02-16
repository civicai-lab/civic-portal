import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CountUp } from "@/components/ui/count-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPriorityServices, services, getServiceThumbnail } from "@/data/services";
import { shimmerBlur } from "@/lib/utils";
import {
  ArrowRight,
  Building2,
  TestTube2,
  Layers,
  CheckCircle,
  Lightbulb,
  BrainCircuit,
  Quote,
  MessageSquare,
  FileCheck,
  Rocket,
} from "lucide-react";

export default function HomePage() {
  const priorityServices = getPriorityServices();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 text-white md:py-32">
        <Image
          src="/images/hero/hero_bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary/80" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-6 text-sm">
            Civic AI Product Suite
          </Badge>
          <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            自治体のDXを、
            <br className="hidden sm:block" />
            AIで加速する
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
            20のAIサービスで行政の課題を解決。
            <br className="hidden sm:block" />
            住民サービスの向上と業務効率化を同時に実現します。
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild className="w-full bg-white text-primary shadow-sm hover:bg-white/90 sm:w-auto">
              <Link href="/services">
                サービス一覧を見る
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="cta"
              asChild
              className="w-full animate-[pulse-subtle_2s_ease-in-out_infinite] shadow-lg transition-shadow hover:shadow-xl sm:w-auto"
            >
              <Link href="/contact">無料相談</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: Building2, end: 50, suffix: "+", label: "導入自治体数" },
              { icon: TestTube2, end: 3200, suffix: "+", label: "テスト数" },
              { icon: Layers, end: 20, suffix: "", label: "サービス数" },
              { icon: CheckCircle, end: 999, suffix: "", label: "テスト通過率", display: "99.9%" },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} animation="fade-up" delay={index * 100} className="text-center">
                <stat.icon className="mx-auto mb-3 size-8 text-primary" />
                {stat.display ? (
                  <div className="text-3xl font-bold text-foreground md:text-4xl min-h-[2.5rem]">
                    {stat.display}
                  </div>
                ) : (
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    className="text-3xl font-bold text-foreground md:text-4xl min-h-[2.5rem]"
                  />
                )}
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Services Highlight */}
      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              注力サービス
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              導入実績が豊富な、最優先サービスをご紹介します
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {priorityServices.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card className="h-full cursor-pointer transition-[box-shadow,transform] duration-300 hover:shadow-xl hover:-translate-y-0.5">
                  <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={getServiceThumbnail(service.slug)}
                      alt={service.displayName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={shimmerBlur}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 3}
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        variant={
                          service.category === "saas" ? "default" : "secondary"
                        }
                      >
                        {service.category === "saas"
                          ? "SaaS"
                          : "シンクタンク"}
                      </Badge>
                      <Badge variant="outline">{service.subcategory}</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary">
                      {service.displayName}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                      詳しく見る
                      <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                全{services.length}サービスを見る
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Explanation */}
      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              2つのサービスカテゴリ
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              自治体のニーズに合わせた2種類のサービス形態を提供しています
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* SaaS */}
            <AnimatedSection animation="slide-left">
            <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-card">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary text-white">
                  <BrainCircuit className="size-7" />
                </div>
                <CardTitle className="text-2xl">SaaS型サービス</CardTitle>
                <CardDescription className="text-base">
                  すぐに導入できるAIプロダクト
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  図書館AI司書、住民問い合わせAI、庁内ナレッジ検索など、パッケージ化されたAIサービスを月額制で提供。POCから始めて段階的に導入できます。
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    対話案内・業務削減・教育ガバナンス
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    POCから始めてリスクを最小化
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    月額制で予算管理が容易
                  </li>
                </ul>
                <Button className="mt-6" variant="outline" asChild>
                  <Link href="/services?category=saas">
                    SaaS型サービスを見る
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            </AnimatedSection>

            {/* Think Tank */}
            <AnimatedSection animation="slide-right" delay={200}>
            <Card className="relative overflow-hidden border-thinktank/20 bg-gradient-to-br from-thinktank/5 to-card">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-thinktank text-thinktank-foreground">
                  <Lightbulb className="size-7" />
                </div>
                <CardTitle className="text-2xl">
                  シンクタンク型サービス
                </CardTitle>
                <CardDescription className="text-base">
                  専門家による調査・分析・コンサルティング
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  ガイドライン策定、RFP作成支援、AI倫理監査、データ分析など、専門知識を活かしたコンサルティングサービスを提供。一回限りのスポット利用も可能です。
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-thinktank" />
                    策定支援・データ分析・専門実証
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-thinktank" />
                    スポット利用から年間契約まで柔軟に
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-thinktank" />
                    専門家チームが伴走支援
                  </li>
                </ul>
                <Button className="mt-6" variant="outline" asChild>
                  <Link href="/services?category=thinktank">
                    シンクタンク型サービスを見る
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust Section - パートナー & 資格 */}
      <section className="border-t bg-card py-16 md:py-20" aria-label="信頼のパートナー">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              パートナー・認定
            </h2>
            <p className="mt-3 text-muted-foreground">
              信頼できるパートナーとともに、安心のサービスを提供しています
            </p>
          </div>
          {/* パートナーロゴ */}
          <AnimatedSection animation="fade-in">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { src: "/images/partners/jinomi_logo.webp", alt: "JINOMI" },
                { src: "/images/partners/maruzen_logo.webp", alt: "丸善" },
                { src: "/images/partners/yopaz_logo.webp", alt: "Yopaz" },
                { src: "/images/partners/quickiterate_logo.webp", alt: "QuickIterate" },
                { src: "/images/partners/shinagawaship_logo.webp", alt: "品川シップ" },
              ].map((partner) => (
                <div
                  key={partner.alt}
                  className="rounded-lg p-3 transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-muted/30"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={40}
                    loading="lazy"
                    className="h-10 w-auto object-contain opacity-85 transition-opacity duration-300 grayscale hover:opacity-100 hover:grayscale-0 dark:brightness-0 dark:invert dark:opacity-60 dark:hover:opacity-90"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
          {/* 資格バッジ */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { src: "/images/credentials/ipa_security_action.webp", alt: "IPA SECURITY ACTION" },
              { src: "/images/credentials/sdgs_wheel.webp", alt: "SDGs" },
              { src: "/images/credentials/microsoft.webp", alt: "Microsoft Partner" },
            ].map((badge) => (
              <div
                key={badge.alt}
                className="rounded-xl bg-muted/30 p-4 transition-transform duration-200 hover:scale-110"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="size-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              導入自治体の声
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              実際にご利用いただいている方々からの評価
            </p>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "AI司書の導入で、利用者からの質問対応が格段に改善しました。特に専門的なレファレンス対応で司書の負担が大幅に軽減されています。",
                name: "中野区立図書館",
                role: "図書館長",
              },
              {
                quote: "住民問い合わせAIのおかげで、24時間対応が実現。夜間や休日の問い合わせにも対応でき、住民満足度が向上しました。",
                name: "品川区役所",
                role: "DX推進課",
              },
              {
                quote: "庁内ナレッジ検索AIで、新人職員の業務習得が加速。これまで数ヶ月かかっていた引き継ぎが半分以下の期間になりました。",
                name: "千葉市役所",
                role: "総務部",
              },
            ].map((testimonial, i) => (
              <AnimatedSection key={testimonial.name} animation="fade-up" delay={i * 150}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <Quote className="mb-4 size-8 text-primary/30" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {testimonial.quote}
                    </p>
                    <div className="mt-6 border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 導入ステップ */}
      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              導入までの流れ
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              3ステップで始められます
            </p>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                icon: MessageSquare,
                title: "無料相談",
                description: "課題やご要望をヒアリング。最適なサービスをご提案します。オンラインでも対応可能です。",
              },
              {
                step: 2,
                icon: FileCheck,
                title: "POC・実証実験",
                description: "小規模な実証実験で効果を検証。データに基づいた導入判断をサポートします。",
              },
              {
                step: 3,
                icon: Rocket,
                title: "本格導入・運用",
                description: "段階的な導入と伴走支援。運用開始後も継続的なサポートを提供します。",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} animation="fade-up" delay={i * 150}>
                <div className="relative text-center">
                  {i < 2 && (
                    <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-gradient-to-r from-primary/30 to-primary/10 md:block" />
                  )}
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="size-7" />
                  </div>
                  <div className="mb-2 text-sm font-bold text-primary">
                    STEP {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection animation="fade-up" delay={500}>
            <div className="mt-12 text-center">
              <Button variant="cta" size="lg" asChild>
                <Link href="/contact">
                  まずは無料相談から
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 text-white md:py-20">
        <Image
          src="/images/hero/hero-collaboration.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/80" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              まずは無料相談から
            </h2>
          </AnimatedSection>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            自治体のDX推進に関するご相談を無料で承ります。
            <br className="hidden sm:block" />
            お気軽にお問い合わせください。
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="cta"
              asChild
              className="w-full shadow-lg hover:shadow-xl sm:w-auto"
            >
              <Link href="/contact">
                無料相談を申し込む
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="w-full bg-white text-primary shadow-sm hover:bg-white/90 sm:w-auto"
            >
              <Link href="/services">サービス一覧を見る</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

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
import {
  ArrowRight,
  Building2,
  TestTube2,
  Layers,
  CheckCircle,
  Lightbulb,
  BrainCircuit,
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
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary/80" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-6 text-sm">
            Civic AI Product Suite
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
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
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/services">
                サービス一覧を見る
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="cta"
              asChild
              className="w-full shadow-lg transition-shadow hover:shadow-xl sm:w-auto"
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
                  <div className="text-3xl font-bold text-foreground md:text-4xl">
                    {stat.display}
                  </div>
                ) : (
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    className="text-3xl font-bold text-foreground md:text-4xl"
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {priorityServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
                aria-label={service.displayName + "の詳細を見る"}
              >
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                  <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={getServiceThumbnail(service.slug)}
                      alt={service.displayName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
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
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { src: "/images/partners/jinomi_logo.webp", alt: "JINOMI" },
              { src: "/images/partners/maruzen_logo.webp", alt: "丸善" },
              { src: "/images/partners/yopaz_logo.webp", alt: "Yopaz" },
              { src: "/images/partners/quickiterate_logo.webp", alt: "QuickIterate" },
              { src: "/images/partners/shinagawaship_logo.webp", alt: "品川シップ" },
            ].map((partner) => (
              <Image
                key={partner.alt}
                src={partner.src}
                alt={partner.alt}
                width={120}
                height={40}
                loading="lazy"
                className="h-10 w-auto object-contain opacity-85 transition-opacity duration-300 grayscale hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
          {/* 資格バッジ */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Image
              src="/images/credentials/ipa_security_action.webp"
              alt="IPA SECURITY ACTION"
              width={80}
              height={80}
              loading="lazy"
              className="size-16 object-contain"
            />
            <Image
              src="/images/credentials/sdgs_wheel.webp"
              alt="SDGs"
              width={80}
              height={80}
              loading="lazy"
              className="size-16 object-contain"
            />
            <Image
              src="/images/credentials/microsoft.webp"
              alt="Microsoft Partner"
              width={80}
              height={80}
              loading="lazy"
              className="size-16 object-contain"
            />
          </div>
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
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/80" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            まずは無料相談から
          </h2>
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
              variant="outline"
              asChild
              className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <Link href="/services">サービス一覧を見る</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

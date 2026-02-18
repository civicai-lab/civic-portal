import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { shimmerBlur } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { services, getServiceBySlug, getServiceHero, getServiceThumbnail } from "@/data/services";
import type { ServiceFeature, PricingPlan, UseCase, FAQ } from "@/types/service";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Search,
  BookOpen,
  GitBranch,
  Download,
  Quote,
  Target,
  Calculator,
  ClipboardCheck,
  Monitor,
  Languages,
  MapPin,
  Route,
  ShieldAlert,
  FolderKanban,
  ShieldCheck,
  Server,
  Workflow,
  Fingerprint,
  AlertTriangle,
  FileCheck,
  Lock,
  History,
  BookMarked,
  FileText,
  Mic,
  CheckCircle as CheckCircleIcon,
  Newspaper,
  Building2,
  GraduationCap,
  ClipboardList,
  ScrollText,
  Ban,
  HelpCircle,
  MapPinned,
  Scale,
  PenTool,
  BookCheck,
  RefreshCw,
  Database,
  FileEdit,
  ListChecks,
  CheckSquare,
  Shield,
  Globe,
  SearchCheck,
  BarChart3,
  Sparkles,
  Flame,
  FileBarChart,
  TrendingUp,
  RotateCw,
  PieChart,
  Rss,
  MessageSquare,
  GitCompare,
  Layers,
  ScanEye,
  AlertOctagon,
  Map,
  Tags,
  Heart,
  Radar,
  FileQuestion,
  Award,
  Users,
  Package,
  BarChart,
  Palette,
  LayoutGrid,
} from "lucide-react";

// lucide-react アイコン名からコンポーネントへのマッピング
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  BookOpen,
  GitBranch,
  Download,
  Quote,
  Target,
  Calculator,
  ClipboardCheck,
  Monitor,
  Languages,
  MapPin,
  Route,
  ShieldAlert,
  FolderKanban,
  ShieldCheck,
  Server,
  Workflow,
  Fingerprint,
  AlertTriangle,
  FileCheck,
  Lock,
  History,
  BookMarked,
  FileText,
  Mic,
  CheckCircle: CheckCircleIcon,
  Newspaper,
  Building2,
  GraduationCap,
  ClipboardList,
  ScrollText,
  Ban,
  HelpCircle,
  MapPinned,
  Scale,
  PenTool,
  BookCheck,
  RefreshCw,
  Database,
  FileEdit,
  ListChecks,
  CheckSquare,
  Shield,
  Globe,
  SearchCheck,
  BarChart3,
  Sparkles,
  Flame,
  FileBarChart,
  TrendingUp,
  RotateCw,
  PieChart,
  Rss,
  MessageSquare,
  GitCompare,
  Layers,
  ScanEye,
  AlertOctagon,
  Map,
  Tags,
  Heart,
  Radar,
  FileQuestion,
  Award,
  Users,
  Package,
  BarChart,
  Palette,
  LayoutGrid,
};

function getIcon(name: string) {
  return iconMap[name] || Search;
}

// 静的パス生成
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// SEOメタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "サービスが見つかりません" };
  }

  return {
    title: `${service.displayName} - Civic AI Product Suite`,
    description: service.description,
    openGraph: {
      title: `${service.displayName} | ${service.tagline}`,
      description: service.description,
    },
  };
}

// Feature Card コンポーネント
function FeatureCard({ feature }: { feature: ServiceFeature }) {
  const Icon = getIcon(feature.icon);
  return (
    <Card className="h-full border-l-4 border-l-primary transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-6" />
        </div>
        <CardTitle className="text-lg">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
}

// Pricing Card コンポーネント
function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={`relative h-full transition-[box-shadow,transform] ${
        plan.recommended
          ? "md:scale-105 border-primary ring-2 ring-primary shadow-lg shadow-primary/10"
          : "hover:-translate-y-0.5 hover:shadow-lg"
      }`}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-bold shadow-md">
            おすすめ
          </Badge>
        </div>
      )}
      <CardHeader className={plan.recommended ? "pt-8" : ""}>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="mt-2">
          <span className={`text-3xl font-bold ${plan.recommended ? "text-primary" : "text-foreground"}`}>
            {plan.price}
          </span>
          {plan.period && (
            <span className="ml-2 text-sm text-muted-foreground">{plan.period}</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <CheckCircle className={`mt-0.5 size-4 shrink-0 ${plan.recommended ? "text-primary" : "text-success dark:text-success"}`} />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="mt-6 w-full"
          variant={plan.recommended ? "default" : "outline"}
          asChild
        >
          <Link href="/contact">{plan.cta}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// UseCase Card コンポーネント
function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <Badge variant="outline" className="mb-2 w-fit">
          事例 {index + 1}
        </Badge>
        <CardTitle className="text-lg">{useCase.persona}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-destructive">
            課題
          </p>
          <p className="text-sm text-muted-foreground">{useCase.problem}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
            ソリューション
          </p>
          <p className="text-sm text-muted-foreground">{useCase.solution}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-success">
            成果
          </p>
          <p className="text-sm text-muted-foreground">{useCase.result}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// FAQ Item コンポーネント
function FAQItem({ faq }: { faq: FAQ }) {
  return (
    <details className="group rounded-lg border bg-card transition-colors open:border-l-4 open:border-l-primary">
      <summary className="flex cursor-pointer items-center justify-between rounded-lg p-4 font-medium text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors">
        {faq.question}
        <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="faq-content">
        <div>
          <div className="border-t px-4 py-3">
            <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
          </div>
        </div>
      </div>
    </details>
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const categoryLabel =
    service.category === "saas" ? "SaaS" : "シンクタンク";
  const audienceLabel =
    service.audience === "public"
      ? "住民向け"
      : service.audience === "internal"
        ? "庁内向け"
        : "官民連携";

  // JSON-LD構造化データ（Service型）
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.displayName,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "シビックAI総合研究所",
      "url": "https://civic-portal-nine.vercel.app"
    },
    "serviceType": service.category === "saas" ? "SaaS" : "シンクタンク型",
    ...(service.pricing && service.pricing.length > 0 ? {
      "offers": service.pricing.map(plan => ({
        "@type": "Offer",
        "name": plan.name,
        "description": plan.features.join(", "),
        "price": plan.price,
        "priceCurrency": "JPY"
      }))
    } : {})
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-white">
        <Image
          src={getServiceHero(service.slug)}
          alt={service.displayName + " イメージ画像"}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          fetchPriority="high"
          placeholder="blur"
          blurDataURL={shimmerBlur}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent-foreground/85" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 [&_nav]:text-primary-foreground/70 [&_a]:text-primary-foreground/70 [&_a:hover]:text-white [&_span]:text-primary-foreground/90 [&_svg]:text-primary-foreground/50">
            <Breadcrumb items={[
              { label: "ホーム", href: "/" },
              { label: "サービス一覧", href: "/services" },
              { label: service.displayName }
            ]} />
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              variant={
                service.category === "saas" ? "default" : "secondary"
              }
            >
              {categoryLabel}
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              {service.subcategory}
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              {audienceLabel}
            </Badge>
            {service.priority === "S" && (
              <Badge className="bg-warning text-warning-foreground">注力サービス</Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            {service.displayName}
          </h1>
          <p className="mt-4 text-xl text-primary-foreground/80">{service.tagline}</p>
          <p className="mt-6 max-w-3xl text-lg text-primary-foreground/70">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="cta" asChild className="w-full shadow-lg transition-shadow hover:shadow-xl sm:w-auto">
              <Link href={`/services/${service.slug}/demo`}>
                デモを試す
                <Monitor className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
              <Link href="/contact">
                お問い合わせ
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* KPI */}
      <section className="border-b bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {service.kpi.map((kpi) => (
              <div
                key={kpi}
                className="text-center rounded-lg border bg-muted p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">KPI</p>
                <p className="mt-1 text-sm font-bold text-primary">
                  {kpi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                主な機能
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {service.displayName}の特長的な機能をご紹介します
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                導入事例
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                実際の導入シナリオをご紹介します
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {service.useCases.map((useCase, i) => (
                <UseCaseCard key={useCase.persona} useCase={useCase} index={i} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                料金プラン
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                ご要望に合わせたプランをお選びいただけます
              </p>
            </div>
            <div
              className={`grid gap-8 pt-4 ${
                service.pricing.length === 1
                  ? "max-w-md mx-auto"
                  : service.pricing.length === 2
                    ? "max-w-2xl mx-auto md:grid-cols-2"
                    : "lg:grid-cols-3"
              }`}
            >
              {service.pricing.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                よくある質問
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-3">
              {service.faqs.map((faq) => (
                <FAQItem key={faq.question} faq={faq} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Target Customers */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                対象のお客様
              </h2>
            </div>
            <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
              {service.targetCustomers.map((customer) => (
                <Badge
                  key={customer}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {customer}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">
            {service.displayName}の導入をご検討ですか？
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            まずは無料相談で、貴自治体に最適な導入プランをご提案します。
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="cta"
              asChild
              className="w-full animate-[pulse-subtle_2s_ease-in-out_infinite] shadow-lg transition-shadow hover:shadow-xl sm:w-auto"
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
              className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white hover:shadow-md sm:w-auto"
            >
              <Link href="/services">他のサービスを見る</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 関連サービス */}
      {(() => {
        const relatedServices = services
          .filter((s) => s.category === service.category && s.slug !== service.slug)
          .slice(0, 3);
        if (relatedServices.length === 0) return null;
        return (
          <AnimatedSection className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
                関連サービス
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                    <Card className="h-full transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="relative h-40 overflow-hidden rounded-t-xl">
                        <Image
                          src={getServiceThumbnail(s.slug)}
                          alt={s.displayName}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL={shimmerBlur}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{s.displayName}</CardTitle>
                        <CardDescription>{s.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        );
      })()}
    </div>
  );
}

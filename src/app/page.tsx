import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPriorityServices, services } from "@/data/services";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 text-sm">
            Civic AI Product Suite
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            自治体のDXを、
            <br className="hidden sm:block" />
            AIで加速する
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 md:text-xl">
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
              variant="outline"
              asChild
              className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <Link href="/contact">無料相談</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              {
                icon: Building2,
                value: "50+",
                label: "導入自治体数",
              },
              {
                icon: TestTube2,
                value: "3,200+",
                label: "テスト数",
              },
              {
                icon: Layers,
                value: "20",
                label: "サービス数",
              },
              {
                icon: CheckCircle,
                value: "99.9%",
                label: "テスト通過率",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-3 size-8 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Services Highlight */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              注力サービス
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              導入実績が豊富な、最優先サービスをご紹介します
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {priorityServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
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
                    <CardTitle className="text-xl group-hover:text-blue-600">
                      {service.displayName}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
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
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              2つのサービスカテゴリ
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              自治体のニーズに合わせた2種類のサービス形態を提供しています
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* SaaS */}
            <Card className="relative overflow-hidden border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <BrainCircuit className="size-7" />
                </div>
                <CardTitle className="text-2xl">SaaS型サービス</CardTitle>
                <CardDescription className="text-base">
                  すぐに導入できるAIプロダクト
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  図書館AI司書、住民問い合わせAI、庁内ナレッジ検索など、パッケージ化されたAIサービスを月額制で提供。POCから始めて段階的に導入できます。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-blue-600" />
                    対話案内・業務削減・教育ガバナンス
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-blue-600" />
                    POCから始めてリスクを最小化
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-blue-600" />
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

            {/* Think Tank */}
            <Card className="relative overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-emerald-600 text-white">
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
                <p className="mb-4 text-gray-600">
                  ガイドライン策定、RFP作成支援、AI倫理監査、データ分析など、専門知識を活かしたコンサルティングサービスを提供。一回限りのスポット利用も可能です。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-emerald-600" />
                    策定支援・データ分析・専門実証
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-emerald-600" />
                    スポット利用から年間契約まで柔軟に
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-emerald-600" />
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            まずは無料相談から
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            自治体のDX推進に関するご相談を無料で承ります。
            <br className="hidden sm:block" />
            お気軽にお問い合わせください。
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="w-full sm:w-auto"
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

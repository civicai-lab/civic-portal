"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, getServicesByCategory, getServiceThumbnail } from "@/data/services";
import { shimmerBlur } from "@/lib/utils";
import type { ServiceData } from "@/types/service";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ArrowRight, Search, X } from "lucide-react";

const priorityLabels: Record<string, string> = {
  all: "すべて",
  S: "最優先 (S)",
  A: "高 (A)",
  B: "中 (B)",
  C: "低 (C)",
};

const subcategoryLabels = [
  "すべて",
  "対話案内",
  "業務削減",
  "教育ガバナンス",
  "策定支援",
  "データ分析",
  "専門実証",
];

function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <Link href={`/services/${service.slug}`} className="group">
      <Card className="h-full transition-[box-shadow,transform] duration-300 hover:shadow-xl hover:-translate-y-0.5">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={getServiceThumbnail(service.slug)}
            alt={service.displayName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={shimmerBlur}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge
              variant={service.category === "saas" ? "default" : "secondary"}
            >
              {service.category === "saas" ? "SaaS" : "シンクタンク"}
            </Badge>
            <Badge variant="outline">{service.subcategory}</Badge>
            {service.priority === "S" && (
              <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">
                注力
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg group-hover:text-primary">
            {service.displayName}
          </CardTitle>
          <CardDescription>{service.tagline}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {service.description}
          </p>
          <div className="mb-3 flex flex-wrap gap-1">
            {service.targetCustomers.map((customer) => (
              <span
                key={customer}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {customer}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm font-medium text-primary">
            詳しく見る
            <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ServicesPage() {
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState("すべて");
  const [searchQuery, setSearchQuery] = useState("");

  const saasServices = getServicesByCategory("saas");
  const thinktankServices = getServicesByCategory("thinktank");

  const filteredAll = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return services.filter((s) => {
      const matchPriority = priorityFilter === "all" || s.priority === priorityFilter;
      const matchSubcategory = subcategoryFilter === "すべて" || s.subcategory === subcategoryFilter;
      const matchSearch =
        searchQuery === "" ||
        s.displayName.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery);
      return matchPriority && matchSubcategory && matchSearch;
    });
  }, [priorityFilter, subcategoryFilter, searchQuery]);

  const filteredSaas = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return saasServices.filter((s) => {
      const matchPriority = priorityFilter === "all" || s.priority === priorityFilter;
      const matchSubcategory = subcategoryFilter === "すべて" || s.subcategory === subcategoryFilter;
      const matchSearch =
        searchQuery === "" ||
        s.displayName.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery);
      return matchPriority && matchSubcategory && matchSearch;
    });
  }, [saasServices, priorityFilter, subcategoryFilter, searchQuery]);

  const filteredThinktank = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return thinktankServices.filter((s) => {
      const matchPriority = priorityFilter === "all" || s.priority === priorityFilter;
      const matchSubcategory = subcategoryFilter === "すべて" || s.subcategory === subcategoryFilter;
      const matchSearch =
        searchQuery === "" ||
        s.displayName.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery);
      return matchPriority && matchSubcategory && matchSearch;
    });
  }, [thinktankServices, priorityFilter, subcategoryFilter, searchQuery]);

  const isFilterActive =
    priorityFilter !== "all" || subcategoryFilter !== "すべて" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <section className="border-b bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "サービス一覧" }]} />
          </div>
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              サービス一覧
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              自治体のDXを支援する{services.length}
              のAIサービスをご覧いただけます
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-card py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="サービス名・説明で検索..."
                aria-label="サービスを検索"
                className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-[3px] focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="検索をクリア"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            {isFilterActive && (
              <p className="text-sm text-muted-foreground mt-2" aria-live="polite" aria-atomic="true">
                {filteredAll.length}件のサービスが見つかりました
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            {/* Priority Filter */}
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                優先度:
              </span>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {Object.entries(priorityLabels).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={priorityFilter === key ? "default" : "outline"}
                    size="sm"
                    className="min-h-[44px] text-xs sm:text-sm"
                    onClick={() => setPriorityFilter(key)}
                    aria-pressed={priorityFilter === key}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-sm font-medium text-muted-foreground">
                分野:
              </span>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {subcategoryLabels.map((label) => (
                  <Button
                    key={label}
                    variant={subcategoryFilter === label ? "default" : "outline"}
                    size="sm"
                    className="min-h-[44px] text-xs sm:text-sm"
                    onClick={() => setSubcategoryFilter(label)}
                    aria-pressed={subcategoryFilter === label}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {isFilterActive && (
              <Button
                variant="ghost"
                size="sm"
                className="min-h-[44px] shrink-0 text-xs text-muted-foreground hover:text-foreground sm:text-sm"
                onClick={() => {
                  setPriorityFilter("all");
                  setSubcategoryFilter("すべて");
                  setSearchQuery("");
                }}
              >
                <X className="mr-1 size-3" />
                フィルタをクリア
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">
                すべて ({filteredAll.length})
              </TabsTrigger>
              <TabsTrigger value="saas">
                SaaS型 ({filteredSaas.length})
              </TabsTrigger>
              <TabsTrigger value="thinktank">
                シンクタンク型 ({filteredThinktank.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredAll.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <Search className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    該当するサービスが見つかりません
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    フィルタ条件を変更してお試しください
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => { setPriorityFilter("all"); setSubcategoryFilter("すべて"); setSearchQuery(""); }}
                  >
                    フィルタをクリア
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAll.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="saas">
              {filteredSaas.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <Search className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    該当するサービスが見つかりません
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    フィルタ条件を変更してお試しください
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => { setPriorityFilter("all"); setSubcategoryFilter("すべて"); setSearchQuery(""); }}
                  >
                    フィルタをクリア
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSaas.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="thinktank">
              {filteredThinktank.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <Search className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    該当するサービスが見つかりません
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    フィルタ条件を変更してお試しください
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => { setPriorityFilter("all"); setSubcategoryFilter("すべて"); setSearchQuery(""); }}
                  >
                    フィルタをクリア
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredThinktank.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            お探しのサービスが見つかりましたか？
          </h2>
          <p className="mt-4 text-muted-foreground">
            サービスについてのご質問やカスタマイズのご要望はお気軽にお問い合わせください
          </p>
          <Button className="mt-6" size="lg" variant="cta" asChild>
            <Link href="/contact">
              お問い合わせ
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

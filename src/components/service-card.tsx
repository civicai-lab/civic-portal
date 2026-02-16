import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceCardProps {
  service: {
    slug: string;
    displayName: string;
    description: string;
    category: "saas" | "thinktank";
    priority: "S" | "A" | "B" | "C";
    audience: "public" | "internal" | "mixed";
    pricing?: string;
  };
}

const categoryLabel: Record<string, string> = {
  saas: "SaaS",
  thinktank: "シンクタンク",
};

const categoryVariant: Record<string, "default" | "secondary"> = {
  saas: "default",
  thinktank: "secondary",
};

const audienceLabel: Record<string, string> = {
  public: "住民向け",
  internal: "庁内向け",
  mixed: "住民・庁内向け",
};

const priorityColor: Record<string, string> = {
  S: "bg-primary text-primary-foreground",
  A: "bg-chart-2 text-white",
  B: "bg-chart-4 text-foreground",
  C: "bg-muted text-muted-foreground",
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group flex flex-col transition-all duration-200 hover:shadow-md hover:bg-muted/30">
      <CardHeader>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {/* カテゴリバッジ */}
          <Badge variant={categoryVariant[service.category]}>
            {categoryLabel[service.category]}
          </Badge>

          {/* 優先度バッジ */}
          <span
            className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-bold ${priorityColor[service.priority]}`}
            title={`優先度: ${service.priority}`}
            aria-label={`優先度${service.priority}`}
          >
            {service.priority}
          </span>

          {/* 対象表示 */}
          <Badge variant="outline" className="text-xs">
            {audienceLabel[service.audience]}
          </Badge>
        </div>

        <CardTitle className="text-lg leading-snug">
          {service.displayName}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="text-sm leading-relaxed">
          {service.description}
        </CardDescription>

        {/* 価格表示 */}
        {service.pricing && (
          <p className="mt-4 text-sm font-semibold text-primary">
            {service.pricing}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          詳しく見る
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}

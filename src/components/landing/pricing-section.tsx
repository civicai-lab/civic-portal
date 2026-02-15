import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PricingPlan } from "@/types/service";

interface PricingSectionProps {
  title: string;
  plans: PricingPlan[];
}

export function PricingSection({ title, plans }: PricingSectionProps) {
  return (
    <section className="bg-muted/30 py-16 md:py-24" aria-label="料金プラン">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>

        {/* プランカード */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col ${
                plan.recommended
                  ? "ring-2 ring-primary shadow-lg"
                  : ""
              }`}
            >
              {/* おすすめバッジ */}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-3 py-1">おすすめ</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-muted-foreground">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <CardDescription className="sr-only">
                  {plan.name}プランの特徴一覧
                </CardDescription>
                <ul className="space-y-3" role="list">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                >
                  <Link href="/contact">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

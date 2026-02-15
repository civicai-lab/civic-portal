import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA: {
    label: string;
    href: string;
  };
  badge?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  badge,
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent-foreground py-16 md:py-24 lg:py-32"
      aria-label="ヒーローセクション"
    >
      {/* 装飾背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* バッジ */}
          {badge && (
            <Badge
              variant="secondary"
              className="mb-6 bg-white/15 text-white/90 backdrop-blur-sm"
            >
              {badge}
            </Badge>
          )}

          {/* サブタイトル */}
          <p className="mb-4 text-sm font-medium tracking-widest text-white/70 uppercase">
            {subtitle}
          </p>

          {/* メインタイトル */}
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* 説明文 */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {description}
          </p>

          {/* CTA ボタン */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-w-[200px] bg-white text-primary hover:bg-white/90"
            >
              <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="min-w-[200px] border border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

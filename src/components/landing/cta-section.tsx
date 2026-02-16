import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section
      className="bg-primary py-16 md:py-24"
      aria-label="お問い合わせ"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mb-10 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            {description}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-w-[200px] bg-white text-primary hover:bg-white/90 dark:hover:bg-white/80"
            >
              <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
            </Button>
            {secondaryCTA && (
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="min-w-[200px] border border-white/30 text-primary-foreground hover:bg-white/10 dark:hover:bg-white/20 hover:text-primary-foreground"
              >
                <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

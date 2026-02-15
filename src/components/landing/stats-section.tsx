interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section
      className="border-y bg-muted/20 py-16 md:py-24"
      aria-label="実績数値"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">
                {stat.value}
                {stat.suffix && (
                  <span className="ml-1 text-2xl md:text-3xl">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-muted-foreground md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

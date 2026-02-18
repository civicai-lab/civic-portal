export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero スケルトン */}
      <div
        className="relative h-64 md:h-80 bg-muted/50"
        style={{
          opacity: 0,
          animation: "stagger-in 0.4s ease-out forwards",
          animationDelay: "0ms",
        }}
      >
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <div className="h-4 w-48 rounded bg-muted skeleton-shimmer mb-4" />
            <div className="h-10 w-2/3 rounded-lg bg-muted skeleton-shimmer mb-3" />
            <div className="h-5 w-1/2 rounded bg-muted skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* 概要セクション */}
        <div
          className="mb-16 space-y-4"
          style={{
            opacity: 0,
            animation: "stagger-in 0.4s ease-out forwards",
            animationDelay: "50ms",
          }}
        >
          <div className="h-8 w-48 rounded-lg bg-muted skeleton-shimmer" />
          <div className="h-5 w-full rounded bg-muted skeleton-shimmer" />
          <div className="h-5 w-4/5 rounded bg-muted skeleton-shimmer" />
        </div>

        {/* 特徴グリッド */}
        <div
          className="mb-16"
          style={{
            opacity: 0,
            animation: "stagger-in 0.4s ease-out forwards",
            animationDelay: "100ms",
          }}
        >
          <div className="h-8 w-32 rounded-lg bg-muted skeleton-shimmer mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-background p-6 space-y-4"
                style={{
                  opacity: 0,
                  animation: "stagger-in 0.4s ease-out forwards",
                  animationDelay: `${150 + i * 50}ms`,
                }}
              >
                <div className="size-12 rounded-lg bg-muted skeleton-shimmer" />
                <div className="h-5 w-3/4 rounded bg-muted skeleton-shimmer" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-muted skeleton-shimmer" />
                  <div className="h-4 w-2/3 rounded bg-muted skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 料金プランセクション */}
        <div
          className="mb-16"
          style={{
            opacity: 0,
            animation: "stagger-in 0.4s ease-out forwards",
            animationDelay: "350ms",
          }}
        >
          <div className="h-8 w-40 rounded-lg bg-muted skeleton-shimmer mb-8 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-background p-6 space-y-4"
                style={{
                  opacity: 0,
                  animation: "stagger-in 0.4s ease-out forwards",
                  animationDelay: `${400 + i * 50}ms`,
                }}
              >
                <div className="h-6 w-1/2 rounded bg-muted skeleton-shimmer" />
                <div className="h-8 w-2/3 rounded bg-muted skeleton-shimmer" />
                <div className="space-y-2 pt-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-4 w-full rounded bg-muted skeleton-shimmer" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

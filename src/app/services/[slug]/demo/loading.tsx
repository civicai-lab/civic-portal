export default function DemoLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* DemoLayout Header スケルトン */}
      <div
        className="border-b bg-card px-4 py-4"
        style={{
          opacity: 0,
          animation: "stagger-in 0.4s ease-out forwards",
          animationDelay: "0ms",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-32 rounded bg-muted skeleton-shimmer mb-2" />
          <div className="h-7 w-64 rounded-lg bg-muted skeleton-shimmer mb-1" />
          <div className="h-4 w-96 rounded bg-muted skeleton-shimmer" />
        </div>
      </div>

      {/* メインコンテンツ スケルトン */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{
            opacity: 0,
            animation: "stagger-in 0.4s ease-out forwards",
            animationDelay: "100ms",
          }}
        >
          {/* サイドバー */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="h-5 w-24 rounded bg-muted skeleton-shimmer" />
              <div className="h-4 w-full rounded bg-muted skeleton-shimmer" />
              <div className="h-4 w-3/4 rounded bg-muted skeleton-shimmer" />
            </div>
          </div>

          {/* メインエリア */}
          <div className="md:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 space-y-3"
                style={{
                  opacity: 0,
                  animation: "stagger-in 0.4s ease-out forwards",
                  animationDelay: `${200 + i * 80}ms`,
                }}
              >
                <div className="h-5 w-1/3 rounded bg-muted skeleton-shimmer" />
                <div className="h-4 w-full rounded bg-muted skeleton-shimmer" />
                <div className="h-4 w-2/3 rounded bg-muted skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

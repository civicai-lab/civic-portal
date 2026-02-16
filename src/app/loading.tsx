export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダースケルトン */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* ロゴ */}
            <div className="h-8 w-32 rounded-md bg-muted skeleton-shimmer" />
            {/* ナビゲーション */}
            <div className="hidden md:flex items-center gap-6">
              <div className="h-4 w-16 rounded bg-muted skeleton-shimmer" />
              <div className="h-4 w-20 rounded bg-muted skeleton-shimmer" />
              <div className="h-4 w-16 rounded bg-muted skeleton-shimmer" />
              <div className="h-4 w-20 rounded bg-muted skeleton-shimmer" />
            </div>
            {/* CTAボタン */}
            <div className="h-10 w-28 rounded-lg bg-muted skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Heroセクションスケルトン */}
      <div className="bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            <div className="h-10 w-3/4 rounded-lg bg-muted skeleton-shimmer" />
            <div className="h-6 w-full rounded bg-muted skeleton-shimmer" />
            <div className="h-6 w-2/3 rounded bg-muted skeleton-shimmer" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-36 rounded-lg bg-muted skeleton-shimmer" />
              <div className="h-12 w-36 rounded-lg bg-muted skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツスケルトン */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* セクション見出し */}
        <div className="text-center mb-12 space-y-3">
          <div className="h-8 w-64 mx-auto rounded-lg bg-muted skeleton-shimmer" />
          <div className="h-5 w-96 mx-auto rounded bg-muted skeleton-shimmer" />
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background p-6 space-y-4"
            >
              <div className="h-40 w-full rounded-lg bg-muted skeleton-shimmer" />
              <div className="h-5 w-3/4 rounded bg-muted skeleton-shimmer" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted skeleton-shimmer" />
                <div className="h-4 w-5/6 rounded bg-muted skeleton-shimmer" />
              </div>
              <div className="h-4 w-24 rounded bg-muted skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "会社概要",
  description: "シビックAI総合研究所の会社情報・ミッション・チーム紹介",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted">
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            会社概要
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            テクノロジーの力で、行政サービスをもっと身近に
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground">ミッション</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                シビックAI総合研究所は、「AIで行政をもっと身近に」をミッションに、
                自治体向けのAIソリューションを開発・提供しています。
                20種類のサービスを通じて、住民サービスの向上と行政業務の効率化を
                同時に実現することを目指しています。
              </p>
              <h2 className="mt-10 text-2xl font-bold text-foreground">
                ビジョン
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                すべての自治体がAIの恩恵を受けられる社会を実現し、
                住民一人ひとりに最適化された公共サービスを届けること。
                テクノロジーと人の力を掛け合わせ、地方創生の新しい形を創ります。
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="/images/team/office-modern.jpg"
                alt="シビックAI総合研究所オフィス"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            会社情報
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            {[
              ["社名", "シビックAI総合研究所"],
              ["設立", "2024年"],
              ["代表", "代表取締役"],
              ["所在地", "東京都千代田区"],
              ["事業内容", "自治体向けAIソリューションの開発・提供"],
              ["従業員数", "約20名"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex border-b border-border py-3"
              >
                <span className="w-32 shrink-0 font-medium text-foreground">
                  {label}
                </span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

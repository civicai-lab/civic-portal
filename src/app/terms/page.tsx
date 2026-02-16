import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "シビックAI総合研究所のサービス利用規約",
  openGraph: {
    title: "利用規約 | Civic AI",
    description: "シビックAI総合研究所のサービス利用規約",
    type: "website",
    locale: "ja_JP",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-card">
      {/* Hero */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            利用規約
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            最終更新日: 2026年1月1日
          </p>
        </div>
      </section>

      {/* 本文 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {[
            {
              title: "第1条（適用）",
              content:
                "本規約は、シビックAI総合研究所（以下「当社」）が提供するすべてのサービスの利用に適用されます。",
            },
            {
              title: "第2条（サービスの内容）",
              content:
                "当社は、自治体向けAIソリューションを提供します。サービスの詳細は各サービスページに記載のとおりとします。",
            },
            {
              title: "第3条（利用料金）",
              content:
                "サービスの利用料金は、各プランに定める金額とします。料金の支払いは、当社が指定する方法により行うものとします。",
            },
            {
              title: "第4条（禁止事項）",
              content:
                "利用者は、法令に違反する行為、当社のサービスの運営を妨害する行為、第三者の権利を侵害する行為を行ってはなりません。",
            },
            {
              title: "第5条（免責事項）",
              content:
                "当社は、サービスの中断、停止、変更等により生じた損害について、当社に故意または重大な過失がある場合を除き、責任を負いません。",
            },
            {
              title: "第6条（規約の変更）",
              content:
                "当社は、必要に応じて本規約を変更できるものとします。変更後の規約は、当社ウェブサイトに掲載した時点で効力を生じます。",
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                {section.title}
              </h2>
              <p className="max-w-prose leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

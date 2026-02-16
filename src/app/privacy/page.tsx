import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "シビックAI総合研究所のプライバシーポリシー",
  openGraph: {
    title: "プライバシーポリシー | Civic AI",
    description: "シビックAI総合研究所の個人情報保護方針",
    type: "website",
    locale: "ja_JP",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-card">
      {/* Hero */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            プライバシーポリシー
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
              title: "1. 個人情報の収集",
              content:
                "当社は、サービスの提供にあたり、お客様の氏名、メールアドレス、所属組織名等の個人情報を収集することがあります。収集は適法かつ公正な手段により行います。",
            },
            {
              title: "2. 利用目的",
              content:
                "収集した個人情報は、サービスの提供・運営、お問い合わせへの対応、サービスの改善、および関連情報のご案内に利用します。",
            },
            {
              title: "3. 第三者提供",
              content:
                "法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。",
            },
            {
              title: "4. 安全管理",
              content:
                "個人情報の漏洩、紛失、毀損等を防止するため、必要かつ適切な安全管理措置を講じます。",
            },
            {
              title: "5. お問い合わせ",
              content:
                "個人情報の取り扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。",
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

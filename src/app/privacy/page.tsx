import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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

const sections = [
  {
    id: "collection",
    title: "1. 個人情報の収集",
    content:
      "当社は、サービスの提供にあたり、以下の個人情報を収集することがあります。収集は適法かつ公正な手段により、利用目的を明示したうえで行います。",
    details: [
      "氏名、メールアドレス、電話番号、所属組織名",
      "お問い合わせ内容、サービス利用履歴",
      "アクセスログ、IPアドレス、Cookie情報等の技術的情報",
      "サービス改善を目的としたアンケート回答",
    ],
  },
  {
    id: "purpose",
    title: "2. 利用目的",
    content:
      "収集した個人情報は、以下の目的の範囲内で利用いたします。利用目的を変更する場合は、事前にお知らせし、必要に応じて同意を取得いたします。",
    details: [
      "サービスの提供・運営および品質向上",
      "お問い合わせ・ご相談への対応",
      "新機能やアップデートに関するご案内",
      "利用状況の統計分析（個人を特定しない形式）",
      "不正利用の防止およびセキュリティの確保",
    ],
  },
  {
    id: "third-party",
    title: "3. 第三者提供",
    content:
      "当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。",
    details: [
      "法令に基づく場合（裁判所の令状、行政機関からの法的要請等）",
      "人の生命、身体または財産の保護のため緊急に必要がある場合",
      "お客様から事前に同意をいただいている場合",
      "業務委託先に対し、必要な範囲で秘密保持契約を締結のうえ共有する場合",
    ],
  },
  {
    id: "security",
    title: "4. 安全管理措置",
    content:
      "当社は、個人情報の漏洩、紛失、毀損等を防止するため、以下の安全管理措置を講じています。",
    details: [
      "データの暗号化（通信時のTLS/SSL、保存時のAES-256）",
      "アクセス権限の厳格な管理と定期的な見直し",
      "従業員への個人情報保護に関する教育・研修の実施",
      "セキュリティインシデント発生時の対応体制の整備",
      "外部セキュリティ監査の定期的な実施",
    ],
  },
  {
    id: "retention",
    title: "5. 個人情報の保管期間",
    content:
      "当社は、利用目的の達成に必要な期間のみ個人情報を保管します。保管期間経過後または利用目的達成後は、速やかに安全な方法で削除または匿名化いたします。",
    details: [
      "契約に関する情報：契約終了後5年間",
      "お問い合わせ記録：対応完了後3年間",
      "アクセスログ：取得日から1年間",
      "その他の情報：利用目的達成後、合理的な期間内に削除",
    ],
  },
  {
    id: "rights",
    title: "6. お客様の権利",
    content:
      "お客様は、当社が保有するご自身の個人情報について、以下の権利を有しています。ご請求は、本人確認を行ったうえで対応いたします。",
    details: [
      "個人情報の開示請求",
      "内容の訂正・追加・削除の請求",
      "利用の停止・消去の請求",
      "第三者提供の停止の請求",
    ],
  },
  {
    id: "cookies",
    title: "7. Cookieの使用について",
    content:
      "当社のウェブサイトでは、利便性向上やアクセス解析のためにCookieを使用しています。Cookieの使用を望まない場合は、ブラウザの設定により無効にすることが可能です。ただし、一部のサービスが正常に利用できなくなる場合があります。",
    details: [
      "必須Cookie：サイトの基本機能に不可欠なもの",
      "分析Cookie：利用状況の把握・改善に使用するもの（Google Analytics等）",
      "機能Cookie：お客様の設定情報を保持するもの",
    ],
  },
  {
    id: "changes",
    title: "8. ポリシーの変更",
    content:
      "当社は、法令の改正やサービス内容の変更に伴い、本プライバシーポリシーを改定する場合があります。重要な変更がある場合は、当社ウェブサイトおよびメール等でお知らせいたします。",
  },
  {
    id: "contact",
    title: "9. お問い合わせ窓口",
    content:
      "個人情報の取り扱いに関するお問い合わせ、開示請求、苦情等は、お問い合わせフォームまたは下記の窓口よりご連絡ください。",
    details: [
      "窓口名称：シビックAI総合研究所 個人情報保護担当",
      "対応時間：平日 9:00〜18:00（土日祝日・年末年始を除く）",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-card">
      {/* Hero */}
      <AnimatedSection animation="fade-up">
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { label: "ホーム", href: "/" },
                  { label: "プライバシーポリシー" },
                ]}
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              プライバシーポリシー
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              最終更新日: 2026年1月1日
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* 目次 */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="border-b border-border bg-muted/50 py-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              目次
            </h2>
            <nav aria-label="ページ内目次">
              <ol className="grid gap-2 sm:grid-cols-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>
      </AnimatedSection>

      {/* 本文 */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          {sections.map((section, index) => (
            <AnimatedSection
              key={section.id}
              animation="fade-up"
              delay={index * 50}
            >
              <div id={section.id} className="scroll-mt-24">
                <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                  {section.title}
                </h2>
                <p className="max-w-prose leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
                {section.details && (
                  <ul className="mt-4 space-y-2 pl-5">
                    {section.details.map((detail) => (
                      <li
                        key={detail}
                        className="list-disc text-sm leading-relaxed text-muted-foreground"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}

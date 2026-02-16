import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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

const sections = [
  {
    id: "scope",
    title: "第1条（適用）",
    content:
      "本規約は、シビックAI総合研究所（以下「当社」）が提供するすべてのサービス（以下「本サービス」）の利用に適用されます。利用者は、本サービスを利用することにより、本規約に同意したものとみなされます。",
    details: [
      "本規約は、当社が提供するウェブサイト、API、ダッシュボード等のすべてのサービスに適用されます",
      "個別のサービスについて別途利用条件が定められている場合、当該条件が本規約に優先します",
      "利用者が法人の場合、当該法人を代表して本規約に同意する権限を有するものとします",
    ],
  },
  {
    id: "service",
    title: "第2条（サービスの内容）",
    content:
      "当社は、自治体向けAIソリューションを提供します。サービスの詳細は各サービスページに記載のとおりとします。",
    details: [
      "AI技術を活用した行政業務支援ツールの提供",
      "データ分析・可視化機能の提供",
      "導入支援、運用サポート、トレーニング等の付随サービス",
      "当社はサービスの機能追加・改善を随時行うことがあります",
    ],
  },
  {
    id: "account",
    title: "第3条（アカウント管理）",
    content:
      "利用者は、本サービスの利用にあたり、正確かつ最新の情報を登録するものとします。アカウント情報の管理は利用者の責任とします。",
    details: [
      "ログイン情報（ID・パスワード等）は第三者に開示・貸与してはなりません",
      "アカウントの不正利用が判明した場合は、直ちに当社へ報告してください",
      "利用者のアカウントにおける一切の行為は、当該利用者の行為とみなします",
    ],
  },
  {
    id: "fees",
    title: "第4条（利用料金）",
    content:
      "サービスの利用料金は、各プランに定める金額とします。料金の支払いは、当社が指定する方法により行うものとします。",
    details: [
      "利用料金は月額または年額で請求されます。支払い条件は契約書に定めます",
      "支払い遅延が発生した場合、年14.6%の遅延損害金が発生することがあります",
      "当社は、30日前の通知をもって利用料金を改定できるものとします",
      "既に支払われた利用料金は、当社に帰責事由がある場合を除き、返還しません",
    ],
  },
  {
    id: "intellectual-property",
    title: "第5条（知的財産権）",
    content:
      "本サービスに関するすべての知的財産権は当社に帰属します。利用者は、本サービスの利用許諾を受けるものであり、知的財産権の譲渡を受けるものではありません。",
    details: [
      "本サービスのソフトウェア、デザイン、ロゴ、ドキュメント等の著作権は当社に帰属します",
      "利用者が本サービスを通じて入力・登録したデータの権利は、利用者に帰属します",
      "当社は、サービス改善の目的で、匿名化された利用データを統計分析に使用できるものとします",
    ],
  },
  {
    id: "prohibited",
    title: "第6条（禁止事項）",
    content:
      "利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。",
    details: [
      "法令、公序良俗に違反する行為、または違反するおそれのある行為",
      "当社または第三者の知的財産権、プライバシー、名誉等を侵害する行為",
      "サービスの運営を妨害する行為（不正アクセス、過度な負荷をかける行為等）",
      "本サービスのリバースエンジニアリング、逆コンパイル等の解析行為",
      "第三者へのアカウントの譲渡、貸与、または共有",
      "反社会的勢力等への利益供与に関連する行為",
    ],
  },
  {
    id: "suspension",
    title: "第7条（サービスの停止・中断）",
    content:
      "当社は、以下の場合にサービスの全部または一部を停止・中断できるものとします。事前に通知するよう努めますが、緊急の場合は事後の通知となることがあります。",
    details: [
      "システムの保守・点検・アップデートを行う場合",
      "天災、停電、通信障害等の不可抗力が発生した場合",
      "セキュリティ上の緊急対応が必要な場合",
      "その他、当社がサービスの停止・中断が必要と判断した場合",
    ],
  },
  {
    id: "disclaimer",
    title: "第8条（免責事項）",
    content:
      "当社は、サービスの中断、停止、変更等により生じた損害について、当社に故意または重大な過失がある場合を除き、責任を負いません。",
    details: [
      "本サービスは「現状のまま」で提供され、特定目的への適合性を保証するものではありません",
      "AI技術の性質上、出力結果の正確性・完全性を保証するものではありません",
      "当社の損害賠償責任は、直接かつ通常の損害に限り、過去12ヶ月間の利用料金を上限とします",
      "利用者の故意または過失により当社に損害が生じた場合、利用者はその損害を賠償するものとします",
    ],
  },
  {
    id: "termination",
    title: "第9条（契約の解除）",
    content:
      "当社は、利用者が本規約に違反した場合、事前の通知なくサービスの提供を停止し、契約を解除できるものとします。利用者は、当社所定の手続きにより、いつでも契約を解除できます。",
    details: [
      "解除時、利用者のデータは30日間保持された後、完全に削除されます",
      "解除日までに発生した利用料金は、解除後も支払い義務が残ります",
      "当社が契約を解除した場合でも、利用者のデータのエクスポート期間を設けます",
    ],
  },
  {
    id: "amendments",
    title: "第10条（規約の変更）",
    content:
      "当社は、必要に応じて本規約を変更できるものとします。変更後の規約は、当社ウェブサイトに掲載した時点で効力を生じます。",
    details: [
      "重要な変更を行う場合は、変更の30日前までに通知いたします",
      "変更後もサービスを継続利用した場合、変更後の規約に同意したものとみなします",
      "変更に同意できない場合は、変更の効力発生前に契約を解除することができます",
    ],
  },
  {
    id: "governing-law",
    title: "第11条（準拠法・管轄）",
    content:
      "本規約の解釈および適用は日本法に準拠するものとします。本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-card">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <Image
          src="/images/features/feature-contract.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent-foreground/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: "ホーム", href: "/" },
                { label: "利用規約" },
              ]}
            />
          </div>
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              利用規約
            </h1>
            <p className="mt-4 text-sm text-primary-foreground/80">
              最終更新日: 2026年1月1日
            </p>
          </AnimatedSection>
        </div>
      </section>

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

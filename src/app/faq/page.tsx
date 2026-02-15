import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "Civic AIサービスに関するよくある質問と回答",
};

const faqs = [
  {
    category: "サービス全般",
    items: [
      {
        q: "どのような自治体に導入されていますか？",
        a: "区市町村を中心に全国50以上の自治体でご利用いただいています。人口規模は数万人〜数十万人まで幅広く対応しています。",
      },
      {
        q: "導入までの期間はどのくらいですか？",
        a: "SaaS型サービスの場合、POCは最短2週間で開始可能です。本格導入は通常1〜3ヶ月程度です。",
      },
      {
        q: "無料で試すことはできますか？",
        a: "ほとんどのSaaS型サービスでPOC（概念実証）プランをご用意しています。まずは無料相談からお気軽にどうぞ。",
      },
    ],
  },
  {
    category: "セキュリティ",
    items: [
      {
        q: "個人情報の取り扱いはどうなっていますか？",
        a: "ISO 27001準拠のセキュリティ体制で運用しています。個人情報は暗号化して保管し、LGWAN対応も可能です。",
      },
      {
        q: "データはどこに保存されますか？",
        a: "国内のデータセンターに保存されます。お客様のご要望に応じてオンプレミス対応も可能です。",
      },
    ],
  },
  {
    category: "料金",
    items: [
      {
        q: "料金体系を教えてください",
        a: "サービスごとに月額制のプランをご用意しています。初期費用とランニングコストの詳細は各サービスページをご覧ください。",
      },
      {
        q: "複数サービスの一括導入割引はありますか？",
        a: "3つ以上のサービスを同時にご契約いただく場合、バンドル割引をご用意しています。詳しくはお問い合わせください。",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-muted">
      <section className="border-b bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            よくある質問
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            お客様からよくいただくご質問にお答えします
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {faqs.map((section) => (
            <div key={section.category} className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-foreground">
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-lg border bg-white"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-foreground">
                      {faq.q}
                    </summary>
                    <div className="border-t px-4 py-3">
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 rounded-lg border bg-white p-8 text-center">
            <p className="mb-4 font-medium text-foreground">
              お探しの質問が見つかりませんか？
            </p>
            <Button variant="cta" asChild>
              <Link href="/contact">
                お問い合わせ
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

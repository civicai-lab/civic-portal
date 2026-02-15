import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const serviceLinks = [
  { href: "/services/shiori-library", label: "しおりライブラリ" },
  { href: "/services/municipal-faq", label: "自治体FAQチャット" },
  { href: "/services/welfare-navigator", label: "福祉ナビゲーター" },
  { href: "/services/disaster-guide", label: "防災AIガイド" },
  { href: "/services", label: "すべてのサービス" },
];

const companyLinks = [
  { href: "/about", label: "会社概要" },
  { href: "/cases", label: "導入事例" },
  { href: "/news", label: "ニュース" },
  { href: "/careers", label: "採用情報" },
];

const supportLinks = [
  { href: "/contact", label: "お問い合わせ" },
  { href: "/faq", label: "よくある質問" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ロゴ + 会社説明 */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block"
              aria-label="Civic AI ホーム"
            >
              <span className="text-xl font-bold tracking-tight text-primary">
                CIVIC AI
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              シビックAI総合研究所は、自治体向けAIソリューションを提供し、
              行政サービスのデジタル変革を支援しています。
              20種類のAIサービスで、住民と行政をつなぎます。
            </p>
          </div>

          {/* サービス一覧 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              サービス
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              会社情報
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サポート */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              サポート
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* コピーライト */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} シビックAI総合研究所. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            自治体向けAIソリューション
          </p>
        </div>
      </div>
    </footer>
  );
}

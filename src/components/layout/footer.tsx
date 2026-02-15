import Link from "next/link";
import Image from "next/image";
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

const socialLinks = [
  {
    href: "https://twitter.com/civic_ai",
    label: "X（旧Twitter）で最新情報をフォロー",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/civic-ai",
    label: "GitHubでソースコードを確認",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ロゴ + 会社説明 */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              aria-label="Civic AI ホーム"
            >
              <Image
                src="/logo/header-logo.png"
                alt="Civic AI"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              シビックAI総合研究所は、自治体向けAIソリューションを提供し、
              行政サービスのデジタル変革を支援しています。
              20種類のAIサービスで、住民と行政をつなぎます。
            </p>
            {/* ソーシャルリンク */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {social.icon}
                </a>
              ))}
            </div>
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
                    className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
                    className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
                    className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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

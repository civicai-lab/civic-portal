"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface DemoLayoutProps {
  serviceName: string;
  serviceIcon: React.ReactNode;
  subtitle?: string;
  backHref?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
}

export function DemoLayout({
  serviceName,
  serviceIcon,
  subtitle = "デモ",
  backHref = "/services",
  children,
  fullHeight = false,
}: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-muted">
      {/* デモバナー */}
      <div className="bg-warning/10 border-b border-warning/30 px-4 py-2 text-center">
        <p className="text-sm text-warning-foreground flex items-center justify-center gap-2">
          <AlertTriangle className="size-4" />
          デモ版 - 実際のデータは使用していません
        </p>
      </div>

      {/* ヘッダー */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href={backHref}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="戻る"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-primary flex items-center justify-center">
              {serviceIcon}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {serviceName}
              </h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div
        className={`max-w-4xl mx-auto px-4 py-4 ${
          fullHeight ? "flex flex-col" : ""
        }`}
        style={fullHeight ? { height: "calc(100vh - 130px)" } : undefined}
      >
        {children}
      </div>

      {/* 免責事項フッター */}
      <footer className="border-t border-border bg-card px-4 py-3">
        <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-4xl mx-auto">
          このデモはAI技術の活用例を示すものであり、実際のサービスとは異なる場合があります。
          回答内容は参考情報であり、正確性を保証するものではありません。
        </p>
      </footer>
    </div>
  );
}

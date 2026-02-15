"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/services", label: "サービス一覧" },
  { href: "/cases", label: "導入事例" },
  { href: "/about", label: "会社概要" },
  { href: "/contact", label: "お問い合わせ" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ロゴ */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Civic AI ホーム"
        >
          <span className="text-xl font-bold tracking-tight text-primary">
            CIVIC AI
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="メインナビゲーション"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA ボタン + モバイルメニュー */}
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/contact">無料相談</Link>
          </Button>

          {/* モバイルハンバーガーメニュー */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav
            className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6"
            aria-label="モバイルナビゲーション"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button asChild className="w-full">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  無料相談
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

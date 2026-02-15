import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* 404数字 */}
      <div className="relative mb-8">
        <span className="text-[120px] font-bold leading-none tracking-tighter text-primary/10 md:text-[180px]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="size-16 text-primary/40 md:size-20" />
        </div>
      </div>

      {/* テキスト */}
      <h1 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
        ページが見つかりません
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        お探しのページは移動または削除された可能性があります。
        URLをご確認いただくか、以下のリンクからお探しください。
      </p>

      {/* ナビゲーションボタン */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 size-4" />
            ホームに戻る
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/services">
            <ArrowLeft className="mr-2 size-4" />
            サービス一覧
          </Link>
        </Button>
      </div>
    </div>
  );
}

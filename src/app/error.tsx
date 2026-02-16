"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            エラーが発生しました
          </h1>
          <p className="text-muted-foreground">
            申し訳ありません。予期しないエラーが発生しました。
            <br />
            もう一度お試しいただくか、ホームページにお戻りください。
          </p>
        </div>

        {error.message && (
          <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
            {error.message}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 size-4" />
            もう一度試す
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 size-4" />
              ホームに戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

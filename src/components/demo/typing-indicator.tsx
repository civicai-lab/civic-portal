"use client";

import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0" aria-hidden="true">
        <Bot className="size-4 text-muted-foreground" />
      </div>
      <div className="bg-muted rounded-2xl px-4 py-3">
        <div className="flex gap-1" role="status" aria-label="応答を生成中">
          <span
            className="size-2 bg-muted-foreground/40 rounded-full motion-safe:animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="size-2 bg-muted-foreground/40 rounded-full motion-safe:animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="size-2 bg-muted-foreground/40 rounded-full motion-safe:animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

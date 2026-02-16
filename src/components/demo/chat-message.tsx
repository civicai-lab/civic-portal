"use client";

import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "ai";
  content: string;
  /** 吹き出し内のカスタムコンテンツ（指定時はcontentの自動レンダリングを上書き） */
  children?: React.ReactNode;
  /** 吹き出し直下に表示する追加コンテンツ（カード、信頼度等） */
  footer?: React.ReactNode;
  /** メッセージ吹き出しの上に表示するコンテンツ（カテゴリバッジ等） */
  header?: React.ReactNode;
  /** 外側のflexコンテナに追加するクラス名 */
  className?: string;
  /** **bold** マークダウン記法をパースするか（デフォルト: true） */
  parseBold?: boolean;
}

/** マークダウン風の **bold** 記法と改行をパースしてReact要素に変換する */
function renderContent(content: string) {
  return content.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return <span key={j}>{part}</span>;
      })}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export function ChatMessage({
  role,
  content,
  children,
  footer,
  header,
  className,
  parseBold = true,
}: ChatMessageProps) {
  return (
    <div
      className={`flex gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 ${
        role === "user" ? "flex-row-reverse" : "flex-row"
      }${className ? ` ${className}` : ""}`}
    >
      {/* アバター */}
      <div
        className={`size-8 rounded-full flex items-center justify-center shrink-0 ${
          role === "user" ? "bg-primary" : "bg-muted"
        }`}
        aria-hidden="true"
      >
        {role === "user" ? (
          <User className="size-4 text-primary-foreground" />
        ) : (
          <Bot className="size-4 text-muted-foreground" />
        )}
      </div>

      {/* メッセージ本文 */}
      <div
        className={`max-w-[80%] ${
          role === "user" ? "text-right" : "text-left"
        }`}
      >
        {/* ヘッダー（カテゴリバッジ等） */}
        {header}

        {/* 吹き出し */}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {children || (parseBold ? renderContent(content) : content)}
        </div>

        {/* フッター（カード、信頼度、ソース引用等） */}
        {footer}
      </div>
    </div>
  );
}

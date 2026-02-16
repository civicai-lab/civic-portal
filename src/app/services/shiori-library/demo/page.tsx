"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  BookOpen,
  HelpCircle,
  BookMarked,
  Search,
  Library,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { ConfidenceIndicator } from "@/components/demo/confidence-indicator";
import { SourceCitation } from "@/components/demo/source-citation";
import { AvatarCharacter } from "@/components/demo/avatar-character";

// --- 型定義 ---

type MessageRole = "user" | "ai";
type SidebarCategory = "おすすめ" | "蔵書検索" | "レファレンス";

interface BookData {
  id: string;
  title: string;
  author: string;
  ndc: string;
  ndcLabel: string;
  status: "available" | "lending" | "reserve";
  description: string;
}

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  books?: BookData[];
  confidence?: number;
  timestamp: Date;
}

// --- モック書籍データ ---

const MOCK_BOOKS: BookData[] = [
  { id: "1", title: "舟を編む", author: "三浦しをん", ndc: "913.6", ndcLabel: "日本文学", status: "available", description: "辞書づくりに情熱を燃やす人々の物語" },
  { id: "2", title: "コンビニ人間", author: "村田沙耶香", ndc: "913.6", ndcLabel: "日本文学", status: "available", description: "コンビニで働く36歳女性の日常を描く" },
  { id: "3", title: "ノルウェイの森", author: "村上春樹", ndc: "913.6", ndcLabel: "日本文学", status: "lending", description: "青春の喪失と再生を描く長編小説" },
  { id: "4", title: "銃・病原菌・鉄", author: "ジャレド・ダイアモンド", ndc: "209", ndcLabel: "世界史", status: "available", description: "なぜ大陸間で文明の発展に差が生まれたのか" },
  { id: "5", title: "サピエンス全史", author: "ユヴァル・ノア・ハラリ", ndc: "209", ndcLabel: "世界史", status: "reserve", description: "ホモ・サピエンス20万年の歴史を一望" },
  { id: "6", title: "図書館戦争", author: "有川浩", ndc: "913.6", ndcLabel: "日本文学", status: "available", description: "図書館の自由を守るための戦いを描く" },
  { id: "7", title: "夜は短し歩けよ乙女", author: "森見登美彦", ndc: "913.6", ndcLabel: "日本文学", status: "lending", description: "京都を舞台にしたファンタジー" },
  { id: "8", title: "プログラミング入門", author: "田中太郎", ndc: "007.64", ndcLabel: "情報科学", status: "available", description: "初心者向けプログラミングの基礎" },
  { id: "9", title: "自治体DXの教科書", author: "鈴木花子", ndc: "318", ndcLabel: "地方自治", status: "available", description: "自治体のデジタル変革のための実践ガイド" },
  { id: "10", title: "AI時代の図書館", author: "佐藤一郎", ndc: "010", ndcLabel: "図書館学", status: "reserve", description: "AIが変える図書館の未来像" },
];

// --- 在庫ステータスの表示 ---

const STATUS_MAP: Record<BookData["status"], { label: string; color: string }> = {
  available: { label: "在庫あり", color: "bg-success/15 text-success" },
  lending: { label: "貸出中", color: "bg-warning/15 text-warning-foreground" },
  reserve: { label: "取り寄せ可", color: "bg-primary/10 text-primary/90" },
};

// --- 応答ロジック ---

const KEYWORD_MAP: Record<string, string[]> = {
  歴史: ["4", "5"],
  世界史: ["4", "5"],
  文学: ["1", "2", "3", "6", "7"],
  小説: ["1", "2", "3", "6", "7"],
  プログラミング: ["8"],
  IT: ["8", "9"],
  DX: ["9"],
  自治体: ["9", "10"],
  図書館: ["6", "10"],
  AI: ["10", "9"],
  京都: ["7"],
};

const MOOD_BOOKS: Record<string, string[]> = {
  ほっこり: ["1", "2", "7"],
  元気: ["6", "7"],
  知的: ["4", "5", "10"],
  学び: ["4", "5", "8", "9"],
};

function findBooksByKeyword(text: string): BookData[] {
  for (const [keyword, ids] of Object.entries(KEYWORD_MAP)) {
    if (text.includes(keyword)) {
      return MOCK_BOOKS.filter((b) => ids.includes(b.id));
    }
  }
  return [];
}

function findBooksByMood(text: string): BookData[] {
  for (const [mood, ids] of Object.entries(MOOD_BOOKS)) {
    if (text.includes(mood)) {
      return MOCK_BOOKS.filter((b) => ids.includes(b.id));
    }
  }
  return [];
}

function getRandomBooks(count: number): BookData[] {
  const shuffled = [...MOCK_BOOKS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

interface MockResponse {
  content: string;
  books?: BookData[];
  confidence: number;
}

function generateResponse(input: string): MockResponse {
  const lower = input.toLowerCase();

  // おすすめリクエスト
  if (lower.includes("おすすめ") || lower.includes("人気") || lower.includes("ランキング")) {
    const books = getRandomBooks(3);
    return {
      content: "こちらが今おすすめの本です。ジャンルが異なる3冊を選びました。",
      books,
      confidence: 88,
    };
  }

  // ムード検出
  const moodBooks = findBooksByMood(lower);
  if (moodBooks.length > 0) {
    return {
      content: `「${input}」というリクエストにぴったりの本を見つけました。`,
      books: moodBooks.slice(0, 3),
      confidence: 82,
    };
  }

  // キーワード検索
  const keywordBooks = findBooksByKeyword(lower);
  if (keywordBooks.length > 0) {
    return {
      content: `「${input}」に関連する蔵書が${keywordBooks.length}件見つかりました。`,
      books: keywordBooks,
      confidence: 92,
    };
  }

  // デフォルト応答
  return {
    content: `「${input}」に関するご質問ですね。申し訳ありませんが、該当する蔵書が見つかりませんでした。\n\nカウンターでのレファレンスサービスもご利用いただけます。お気軽にお声がけください。`,
    confidence: 45,
  };
}

// --- よくある質問 ---

const QUICK_QUESTIONS = [
  "おすすめの本を教えて",
  "歴史の本を探しています",
  "プログラミングを学びたい",
  "ほっこりする本ありますか？",
];

// --- 初期メッセージ ---

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    role: "ai",
    content: "こんにちは！何かお探しの本はありますか？ジャンルやテーマ、気分からもお探しできますよ。",
    timestamp: new Date(Date.now() - 60000),
  },
];

// --- 参照元ソース ---

const LIBRARY_SOURCES = [
  { title: "市立図書館蔵書データベース", type: "内部文書" as const, relevance: 95 },
  { title: "NDC新訂10版分類表", type: "外部資料" as const, relevance: 85 },
  { title: "図書館利用統計レポート 2025", type: "内部文書" as const, relevance: 70 },
];

// --- BookCardコンポーネント ---

function BookCard({ book }: { book: BookData }) {
  const statusInfo = STATUS_MAP[book.status];

  return (
    <Card className="mt-2 py-3">
      <CardContent className="pb-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-foreground truncate">
                {book.title}
              </h4>
              <p className="text-xs text-muted-foreground">{book.author}</p>
            </div>
            <Badge
              variant="secondary"
              className={`text-[10px] shrink-0 ${statusInfo.color}`}
            >
              {statusInfo.label}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {book.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[10px]">
              {book.ndc} {book.ndcLabel}
            </Badge>
            <Button
              size="sm"
              variant={book.status === "lending" ? "outline" : "default"}
              className="text-xs h-7 px-3"
              disabled={book.status === "lending"}
              aria-label={`「${book.title}」を予約する`}
            >
              {book.status === "lending" ? "貸出中" : "予約する"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- メインコンポーネント ---

export default function ShioriLibraryDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SidebarCategory>("おすすめ");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(
    (text?: string) => {
      const messageText = text || input.trim();
      if (!messageText || isTyping) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      const delay = 600 + Math.random() * 600;
      setTimeout(() => {
        const response = generateResponse(messageText);

        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: response.content,
          books: response.books,
          confidence: response.confidence,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, delay);
    },
    [input, isTyping]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleCategoryClick = useCallback(
    (category: SidebarCategory) => {
      setActiveCategory(category);
      const categoryMessages: Record<SidebarCategory, string> = {
        おすすめ: "おすすめの本を教えて",
        蔵書検索: "蔵書を検索したいです",
        レファレンス: "調べ物の相談をしたいです",
      };
      handleSend(categoryMessages[category]);
    },
    [handleSend]
  );

  // サイドバーカテゴリ設定
  const SIDEBAR_CATEGORIES: { label: SidebarCategory; icon: React.ReactNode }[] = [
    { label: "おすすめ", icon: <BookMarked className="size-4" /> },
    { label: "蔵書検索", icon: <Search className="size-4" /> },
    { label: "レファレンス", icon: <Library className="size-4" /> },
  ];

  return (
    <DemoLayout
      serviceName="AI司書 SHIORI"
      serviceIcon={<BookOpen className="size-5 text-primary-foreground" />}
      subtitle="蔵書検索・おすすめデモ"
      fullHeight
    >
      <div className="flex gap-4 h-full">
        {/* 左サイドバー（md以上で表示） */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 gap-4" aria-label="SHIORIプロフィール">
          <Card className="py-4">
            <CardContent className="flex flex-col items-center gap-3">
              <AvatarCharacter
                name="SHIORI"
                size="lg"
                mood={isTyping ? "thinking" : "happy"}
                speaking={isTyping}
              />
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                こんにちは！AI司書のSHIORIです。本探しのお手伝いをします。
              </p>
            </CardContent>
          </Card>

          <Card className="py-4">
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-sm">カテゴリ</CardTitle>
            </CardHeader>
            <CardContent className="pb-0 space-y-1.5">
              {SIDEBAR_CATEGORIES.map((cat) => (
                <Button
                  key={cat.label}
                  variant={activeCategory === cat.label ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start gap-2 text-xs"
                  onClick={() => handleCategoryClick(cat.label)}
                  disabled={isTyping}
                  aria-label={`${cat.label}カテゴリを選択`}
                >
                  {cat.icon}
                  {cat.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* 蔵書統計 */}
          <Card className="py-4">
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-sm">蔵書統計</CardTitle>
            </CardHeader>
            <CardContent className="pb-0 text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between">
                <span>総蔵書数</span>
                <span className="font-medium text-foreground">152,847冊</span>
              </div>
              <div className="flex justify-between">
                <span>貸出可能</span>
                <span className="font-medium text-success">138,290冊</span>
              </div>
              <div className="flex justify-between">
                <span>本日の来館者</span>
                <span className="font-medium text-foreground">234人</span>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* メインチャットエリア */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          {/* よくある質問 */}
          <Card className="mb-3 py-3">
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-sm flex items-center gap-2">
                <HelpCircle className="size-4 text-primary" />
                よくある質問
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-0">
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1.5 px-3"
                    onClick={() => handleSend(question)}
                    disabled={isTyping}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* チャットエリア */}
          <Card className="flex-1 flex flex-col min-h-0 py-0">
            {/* メッセージリスト */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-label="チャット履歴" aria-live="polite">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* アバター */}
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user" ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="size-4 text-primary-foreground" />
                    ) : (
                      <Bot className="size-4 text-muted-foreground" />
                    )}
                  </div>

                  {/* メッセージ本文 */}
                  <div
                    className={`max-w-[80%] ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {/* 吹き出し */}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.content.split("\n").map((line, i) => (
                        <span key={i}>
                          {line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return (
                                <strong key={j}>{part.slice(2, -2)}</strong>
                              );
                            }
                            return <span key={j}>{part}</span>;
                          })}
                          {i < msg.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>

                    {/* 本カード表示 */}
                    {msg.role === "ai" && msg.books && msg.books.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {msg.books.map((book) => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    )}

                    {/* 信頼度インジケーター */}
                    {msg.role === "ai" && msg.confidence !== undefined && (
                      <ConfidenceIndicator
                        confidence={msg.confidence}
                        showEscalation={false}
                      />
                    )}

                    {/* ソース引用 */}
                    {msg.role === "ai" && msg.books && msg.books.length > 0 && (
                      <SourceCitation sources={LIBRARY_SOURCES} />
                    )}
                  </div>
                </div>
              ))}

              {/* タイピングインジケーター */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Bot className="size-4 text-muted-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1" role="status" aria-label="応答を生成中">
                      <span className="size-2 bg-muted-foreground/40 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="size-2 bg-muted-foreground/40 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="size-2 bg-muted-foreground/40 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 入力エリア */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="本のタイトル、ジャンル、気分などを入力..."
                  className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={isTyping}
                  aria-label="検索メッセージを入力"
                />
                <Button
                  size="icon"
                  className="rounded-full shrink-0"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  aria-label="メッセージを送信"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DemoLayout>
  );
}

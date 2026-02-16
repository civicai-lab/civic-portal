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
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Bot,
  User,
  BookOpen,
  Search,
  Clock,
  Shield,
  ChevronDown,
  FileText,
  Eye,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { ConfidenceIndicator } from "@/components/demo/confidence-indicator";
import { SourceCitation } from "@/components/demo/source-citation";

// --- 型定義 ---

type AccessLevel = "public" | "internal" | "confidential";
type MessageRole = "user" | "ai";

interface Document {
  title: string;
  dept: string;
  date: string;
  access: AccessLevel;
}

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  confidence?: number;
  documents?: Document[];
  sources?: { title: string; type: "法令" | "通知" | "FAQ" | "内部文書" | "外部資料"; relevance: number }[];
}

interface SearchLogEntry {
  query: string;
  timestamp: Date;
}

interface AuditLogEntry {
  user: string;
  action: string;
  target: string;
  timestamp: Date;
}

// --- モックデータ ---

const MOCK_DOCS: Document[] = [
  { title: "情報セキュリティポリシー v3.2", dept: "情報政策課", date: "2024-01", access: "public" },
  { title: "AI利活用ガイドライン", dept: "デジタル推進課", date: "2024-03", access: "public" },
  { title: "職員研修マニュアル 2024年度版", dept: "人事課", date: "2024-04", access: "internal" },
  { title: "予算編成の手引き", dept: "財政課", date: "2024-02", access: "internal" },
  { title: "個人情報保護審査会議事録", dept: "総務課", date: "2024-05", access: "confidential" },
  { title: "災害対応業務フロー", dept: "危機管理課", date: "2024-01", access: "public" },
];

const ACCESS_CONFIG: Record<AccessLevel, { label: string; icon: string; className: string }> = {
  public: { label: "公開", icon: "\uD83D\uDD13", className: "bg-success/15 text-success" },
  internal: { label: "課内限定", icon: "\uD83D\uDD12", className: "bg-warning/15 text-warning-foreground" },
  confidential: { label: "機密", icon: "\uD83D\uDD34", className: "bg-destructive/15 text-destructive" },
};

const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  { user: "田中 太郎", action: "検索", target: "セキュリティポリシー", timestamp: new Date(Date.now() - 600000) },
  { user: "佐藤 花子", action: "閲覧", target: "AI利活用ガイドライン", timestamp: new Date(Date.now() - 1200000) },
  { user: "鈴木 一郎", action: "検索", target: "研修マニュアル", timestamp: new Date(Date.now() - 1800000) },
  { user: "山田 明子", action: "閲覧", target: "予算編成の手引き", timestamp: new Date(Date.now() - 3600000) },
  { user: "高橋 健一", action: "検索", target: "災害対応フロー", timestamp: new Date(Date.now() - 7200000) },
];

// --- モックレスポンス ---

interface MockResponse {
  content: string;
  confidence: number;
  documents: Document[];
  sources: { title: string; type: "法令" | "通知" | "FAQ" | "内部文書" | "外部資料"; relevance: number }[];
}

const MOCK_RESPONSES: Record<string, MockResponse> = {
  "セキュリティポリシーの最新版は？": {
    content:
      "情報セキュリティポリシーの最新版は **v3.2** です（2024年1月更新）。\n\n主な変更点：\n- クラウドサービス利用に関するセクションを追加\n- リモートワーク時のセキュリティ要件を強化\n- インシデント対応フローを見直し\n\n情報政策課が所管しており、全職員がアクセス可能です。",
    confidence: 95,
    documents: [MOCK_DOCS[0], MOCK_DOCS[5]],
    sources: [
      { title: "情報セキュリティポリシー v3.2", type: "内部文書", relevance: 98 },
      { title: "総務省 地方公共団体情報セキュリティガイドライン", type: "外部資料", relevance: 75 },
    ],
  },
  "AI導入のガイドラインを教えて": {
    content:
      "AI利活用ガイドラインは、デジタル推進課が2024年3月に策定しました。\n\n**主な内容：**\n- AI利用の基本原則（透明性・公平性・安全性）\n- 利用可能なAIサービスの一覧と承認プロセス\n- 個人情報の取り扱いルール\n- 生成AIの利用制限事項\n\nガイドライン本文は庁内ポータルからダウンロード可能です。",
    confidence: 92,
    documents: [MOCK_DOCS[1], MOCK_DOCS[4]],
    sources: [
      { title: "AI利活用ガイドライン", type: "内部文書", relevance: 96 },
      { title: "内閣府 AI利用ガイドライン", type: "外部資料", relevance: 80 },
    ],
  },
  "研修の申請方法は？": {
    content:
      "職員研修の申請方法は以下の通りです：\n\n1. **庁内研修**: 人事課ポータルの「研修申請」から直接申込み\n2. **外部研修**: 所属長の承認後、人事課へ「外部研修受講申請書」を提出\n3. **オンライン研修**: e-ラーニングポータルから随時受講可能\n\n**申請期限**: 研修開始の2週間前まで\n**問い合わせ先**: 人事課 研修担当（内線2345）",
    confidence: 88,
    documents: [MOCK_DOCS[2]],
    sources: [
      { title: "職員研修マニュアル 2024年度版", type: "内部文書", relevance: 94 },
      { title: "研修申請フォーム利用ガイド", type: "FAQ", relevance: 70 },
    ],
  },
};

function getDefaultResponse(input: string): MockResponse {
  const confidence = 35 + Math.floor(Math.random() * 20);
  return {
    content: `ご質問「${input}」について検索しましたが、該当する文書の特定に至りませんでした。\n\nキーワードを変えて再検索いただくか、担当部署へ直接お問い合わせください。`,
    confidence,
    documents: [],
    sources: [],
  };
}

// --- よくある質問 ---

const QUICK_QUESTIONS = [
  "セキュリティポリシーの最新版は？",
  "AI導入のガイドラインを教えて",
  "研修の申請方法は？",
];

// --- 初期メッセージ ---

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    role: "ai",
    content:
      "庁内ナレッジ検索AIです。規程・マニュアル・ガイドライン等の庁内文書を横断検索できます。お探しの情報をお聞かせください。",
    timestamp: new Date(Date.now() - 300000),
  },
];

// --- 文書カードコンポーネント ---

function DocumentCard({ doc }: { doc: Document }) {
  const accessConfig = ACCESS_CONFIG[doc.access];
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
      <FileText className="size-5 text-primary mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground truncate">
            {doc.title}
          </span>
          <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${accessConfig.className}`}>
            {accessConfig.icon} {accessConfig.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>{doc.dept}</span>
          <span aria-hidden="true">|</span>
          <span>更新: {doc.date}</span>
        </div>
      </div>
    </div>
  );
}

// --- メインコンポーネント ---

export default function StaffKnowledgeDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchLogEntry[]>([
    { query: "セキュリティポリシー", timestamp: new Date(Date.now() - 600000) },
    { query: "AI導入ガイドライン", timestamp: new Date(Date.now() - 1200000) },
    { query: "研修申請", timestamp: new Date(Date.now() - 1800000) },
    { query: "予算編成", timestamp: new Date(Date.now() - 3600000) },
    { query: "災害対応", timestamp: new Date(Date.now() - 7200000) },
  ]);
  const [auditExpanded, setAuditExpanded] = useState(false);
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

      // 検索履歴に追加
      setSearchHistory((prev) => [
        { query: messageText, timestamp: new Date() },
        ...prev.slice(0, 4),
      ]);

      const delay = 600 + Math.random() * 600;
      setTimeout(() => {
        const mockResponse =
          MOCK_RESPONSES[messageText] || getDefaultResponse(messageText);

        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: mockResponse.content,
          confidence: mockResponse.confidence,
          documents: mockResponse.documents,
          sources: mockResponse.sources,
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  };

  const formatRelativeTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}分前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}時間前`;
    return `${Math.floor(hours / 24)}日前`;
  };

  return (
    <DemoLayout
      serviceName="庁内ナレッジ検索AI"
      serviceIcon={<BookOpen className="size-5 text-primary-foreground" />}
      subtitle="ナレッジ検索デモ"
      fullHeight
    >
      <div className="flex gap-4 h-full">
        {/* メインチャットエリア */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* よくある質問 */}
          <Card className="mb-3 py-3">
            <CardContent className="pt-0 pb-0">
              <div className="flex items-center gap-2 mb-2">
                <Search className="size-4 text-primary" />
                <span className="text-sm font-medium text-foreground">よくある検索</span>
              </div>
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

          {/* チャットカード */}
          <Card className="flex-1 flex flex-col min-h-0 py-0">
            {/* メッセージリスト */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-label="チャット履歴">
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
                    aria-hidden="true"
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
                              return <strong key={j}>{part.slice(2, -2)}</strong>;
                            }
                            return <span key={j}>{part}</span>;
                          })}
                          {i < msg.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>

                    {/* 添付文書カード */}
                    {msg.documents && msg.documents.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {msg.documents.map((doc, idx) => (
                          <DocumentCard key={idx} doc={doc} />
                        ))}
                      </div>
                    )}

                    {/* 信頼度 */}
                    {msg.role === "ai" && msg.confidence !== undefined && (
                      <ConfidenceIndicator confidence={msg.confidence} showEscalation={false} />
                    )}

                    {/* 根拠文書 */}
                    {msg.sources && msg.sources.length > 0 && (
                      <SourceCitation sources={msg.sources} />
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
                    <div className="flex gap-1" aria-label="検索中">
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
                  placeholder="庁内文書を検索..."
                  className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={isTyping}
                  aria-label="検索クエリ入力"
                />
                <Button
                  size="icon"
                  className="rounded-full shrink-0"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  aria-label="送信"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* サイドパネル（デスクトップのみ） */}
        <aside className="hidden lg:flex flex-col gap-3 w-72 shrink-0" aria-label="サイドパネル">
          {/* 最近の検索履歴 */}
          <Card className="py-3">
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                最近の検索
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-0">
              <ul className="space-y-2">
                {searchHistory.slice(0, 5).map((entry, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      className="w-full text-left flex items-center justify-between gap-2 text-xs p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => handleSend(entry.query)}
                      disabled={isTyping}
                    >
                      <span className="flex items-center gap-1.5 truncate text-foreground">
                        <Search className="size-3 text-muted-foreground shrink-0" />
                        {entry.query}
                      </span>
                      <span className="text-muted-foreground shrink-0">
                        {formatRelativeTime(entry.timestamp)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 監査ログ */}
          <Card className="py-3">
            <CardHeader className="pb-2 pt-0">
              <button
                type="button"
                className="flex items-center justify-between w-full cursor-pointer"
                onClick={() => setAuditExpanded(!auditExpanded)}
                aria-expanded={auditExpanded}
                aria-controls="audit-log-content"
              >
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="size-4 text-primary" />
                  監査ログ
                </CardTitle>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform duration-200 ${
                    auditExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </CardHeader>
            {auditExpanded && (
              <CardContent className="pt-0 pb-0" id="audit-log-content">
                <ul className="space-y-2">
                  {MOCK_AUDIT_LOG.map((entry, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs p-2 rounded-md bg-muted/50"
                    >
                      <Eye className="size-3 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-foreground">{entry.user}</span>
                          <span className="text-muted-foreground">が</span>
                          <Badge variant="secondary" className="text-[10px] px-1 py-0">
                            {entry.action}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-muted-foreground truncate">{entry.target}</span>
                          <span className="text-muted-foreground shrink-0 ml-1">
                            {formatTime(entry.timestamp)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Separator className="my-2" />
                <p className="text-[10px] text-muted-foreground text-center">
                  全アクセスログは管理画面で確認できます
                </p>
              </CardContent>
            )}
          </Card>
        </aside>
      </div>
    </DemoLayout>
  );
}

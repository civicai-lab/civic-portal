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
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { ConfidenceIndicator } from "@/components/demo/confidence-indicator";
import { ChatMessage } from "@/components/demo/chat-message";
import { TypingIndicator } from "@/components/demo/typing-indicator";

// --- 型定義 ---

type MessageRole = "user" | "ai";
type Category = "税務" | "福祉" | "届出" | "環境" | "施設" | "防災" | "一般";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  category?: Category;
  confidence?: number;
  timestamp: Date;
}

// --- カテゴリ検出ロジック ---

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  税務: ["税", "確定申告", "住民税", "固定資産税", "納税", "控除", "課税"],
  福祉: ["介護", "年金", "保険", "障害", "生活保護", "子育て", "児童手当", "福祉"],
  届出: ["届出", "届け出", "住民票", "戸籍", "転入", "転出", "婚姻", "出生", "引っ越し", "マイナンバー"],
  環境: ["ゴミ", "ごみ", "分別", "リサイクル", "粗大ごみ", "収集", "清掃"],
  施設: ["図書館", "公民館", "体育館", "プール", "施設", "予約"],
  防災: ["防災", "避難", "地震", "台風", "災害", "ハザードマップ"],
  一般: [],
};

function detectCategory(text: string): Category {
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === "一般") continue;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return category as Category;
      }
    }
  }
  return "一般";
}

// --- カテゴリバッジカラー ---

const CATEGORY_COLORS: Record<Category, string> = {
  税務: "bg-primary/10 text-primary/90",
  福祉: "bg-success/10 text-success dark:bg-success/20",
  届出: "bg-thinktank/10 text-thinktank dark:bg-thinktank/20",
  環境: "bg-success/10 text-success dark:bg-success/20",
  施設: "bg-warning/10 text-warning dark:bg-warning/20",
  防災: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  一般: "bg-muted text-foreground",
};

// --- モックレスポンス ---

interface MockResponse {
  content: string;
  confidence: number;
  category: Category;
}

const MOCK_RESPONSES: Record<string, MockResponse> = {
  "住民票の取り方を教えてください": {
    content:
      "住民票の取得方法は以下の3通りです：\n\n1. **窓口申請**: 市区町村役場の住民課窓口にて、本人確認書類（運転免許証・マイナンバーカード等）をお持ちの上、申請書に記入してください。手数料は1通300円です。\n\n2. **コンビニ交付**: マイナンバーカードをお持ちの場合、全国のコンビニエンスストアで取得可能です（6:30〜23:00）。手数料は200円です。\n\n3. **郵送申請**: 申請書・本人確認書類の写し・手数料分の定額小為替・返信用封筒を同封の上、住民課宛てにお送りください。",
    confidence: 95,
    category: "届出",
  },
  "ゴミの分別方法は？": {
    content:
      "ゴミの分別は以下のカテゴリに分かれます：\n\n- **燃えるゴミ**: 生ゴミ、紙くず、布類（週2回回収）\n- **燃えないゴミ**: 金属類、ガラス、陶器（月2回回収）\n- **資源ゴミ**: ペットボトル、缶、瓶、段ボール（週1回回収）\n- **粗大ゴミ**: 家具等の大型品（事前予約制、有料）\n\n分別に迷った場合は、市のゴミ分別アプリもご活用ください。",
    confidence: 90,
    category: "環境",
  },
  "児童手当の申請について知りたい": {
    content:
      "児童手当の申請に関するご案内です：\n\n**対象**: 中学校卒業まで（15歳到達後の最初の3月31日まで）のお子様を養育している方\n\n**支給額**（月額）:\n- 3歳未満: 15,000円\n- 3歳〜小学校修了: 10,000円（第3子以降15,000円）\n- 中学生: 10,000円\n\n**必要書類**: 認定請求書、健康保険証の写し、振込先口座情報、マイナンバー確認書類\n\n**申請先**: お住まいの市区町村の子育て支援課窓口",
    confidence: 92,
    category: "福祉",
  },
  "確定申告の時期はいつですか？": {
    content:
      "確定申告に関するご案内です：\n\n**申告期間**: 毎年2月16日〜3月15日（土日の場合は翌開庁日）\n\n**申告が必要な方**:\n- 自営業・フリーランスの方\n- 給与収入が2,000万円を超える方\n- 2か所以上から給与を受けている方\n- 医療費控除・ふるさと納税の還付を受けたい方\n\n**申告方法**: e-Taxによるオンライン申告、税務署窓口、郵送\n\n※ 詳細な税務相談は税務署の相談窓口をご利用ください。",
    confidence: 88,
    category: "税務",
  },
  "マイナンバーカードの受け取り方法": {
    content:
      "マイナンバーカードの受け取り方法です：\n\n1. **交付通知書が届いたら**: 必要書類を準備してください\n2. **必要書類**: 交付通知書、通知カード、本人確認書類（運転免許証等）、住基カード（お持ちの場合）\n3. **受取場所**: 市区町村役場の窓口（本人が来庁する必要があります）\n4. **暗証番号設定**: 受取時に4種類の暗証番号を設定します\n\n※ 土日受取をご希望の場合は、事前予約が必要な場合があります。",
    confidence: 93,
    category: "届出",
  },
};

function getDefaultResponse(input: string): MockResponse {
  const category = detectCategory(input);
  const confidence = 40 + Math.floor(Math.random() * 25);
  return {
    content: `ご質問ありがとうございます。「${input}」についてですが、正確な情報をお伝えするため、担当窓口へのお問い合わせをおすすめいたします。\n\nお問い合わせ内容に応じて、適切な部署をご案内いたしますので、お気軽にお申し付けください。`,
    confidence,
    category,
  };
}

// --- 初期サンプル会話 ---

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    role: "ai",
    content:
      "こんにちは！住民問い合わせAIアシスタントです。住民票の取得、ゴミの分別、各種届出など、暮らしに関するご質問にお答えします。お気軽にお聞きください。",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "init-2",
    role: "user",
    content: "住民票の取り方を教えてください",
    category: "届出",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "init-3",
    role: "ai",
    content:
      "住民票の取得方法は以下の3通りです：\n\n1. **窓口申請**: 市区町村役場の住民課窓口にて、本人確認書類（運転免許証・マイナンバーカード等）をお持ちの上、申請書に記入してください。手数料は1通300円です。\n\n2. **コンビニ交付**: マイナンバーカードをお持ちの場合、全国のコンビニエンスストアで取得可能です（6:30〜23:00）。手数料は200円です。\n\n3. **郵送申請**: 申請書・本人確認書類の写し・手数料分の定額小為替・返信用封筒を同封の上、住民課宛てにお送りください。",
    confidence: 95,
    category: "届出",
    timestamp: new Date(Date.now() - 230000),
  },
  {
    id: "init-4",
    role: "user",
    content: "ゴミの分別方法は？",
    category: "環境",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: "init-5",
    role: "ai",
    content:
      "ゴミの分別は以下のカテゴリに分かれます：\n\n- **燃えるゴミ**: 生ゴミ、紙くず、布類（週2回回収）\n- **燃えないゴミ**: 金属類、ガラス、陶器（月2回回収）\n- **資源ゴミ**: ペットボトル、缶、瓶、段ボール（週1回回収）\n- **粗大ゴミ**: 家具等の大型品（事前予約制、有料）\n\n分別に迷った場合は、市のゴミ分別アプリもご活用ください。",
    confidence: 90,
    category: "環境",
    timestamp: new Date(Date.now() - 170000),
  },
];

// --- よくある質問 ---

const QUICK_QUESTIONS = [
  "住民票の取り方を教えてください",
  "ゴミの分別方法は？",
  "児童手当の申請について知りたい",
  "確定申告の時期はいつですか？",
  "マイナンバーカードの受け取り方法",
];

// --- メインコンポーネント ---

export default function MunicipalFaqDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

      const category = detectCategory(messageText);

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageText,
        category,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      const delay = 500 + Math.random() * 500;
      setTimeout(() => {
        const mockResponse =
          MOCK_RESPONSES[messageText] || getDefaultResponse(messageText);

        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: mockResponse.content,
          confidence: mockResponse.confidence,
          category: mockResponse.category,
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

  return (
    <DemoLayout
      serviceName="住民問い合わせAI"
      serviceIcon={<MessageSquare className="size-5 text-primary-foreground" />}
      subtitle="チャットデモ"
      fullHeight
    >
        {/* よくある質問 */}
        <Card className="mb-4 py-4">
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                header={
                  msg.category ? (
                    <div
                      className={`mb-1 ${
                        msg.role === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }`}
                    >
                      <Badge
                        variant="secondary"
                        className={`text-xs px-1.5 py-0 ${
                          CATEGORY_COLORS[msg.category]
                        }`}
                      >
                        {msg.category}
                      </Badge>
                    </div>
                  ) : undefined
                }
                footer={
                  msg.role === "ai" && msg.confidence !== undefined ? (
                    <ConfidenceIndicator confidence={msg.confidence} />
                  ) : undefined
                }
              />
            ))}

            {isTyping && <TypingIndicator />}

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
                placeholder="お住まいの地域のことをお気軽にお聞きください"
                aria-label="住民問合せを入力"
                className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isTyping}
              />
              <Button
                size="icon"
                className="rounded-full shrink-0 transition-transform active:scale-90"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                aria-label="メッセージを送信"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
    </DemoLayout>
  );
}

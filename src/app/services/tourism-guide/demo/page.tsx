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
  Globe,
  HelpCircle,
  MapPin,
  Clock,
  Ticket,
  Train,
  Phone,
  Hospital,
  ShieldAlert,
  AlertTriangle,
  X,
  Landmark,
  TreePine,
  UtensilsCrossed,
  Palette,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { ConfidenceIndicator } from "@/components/demo/confidence-indicator";
import { SourceCitation } from "@/components/demo/source-citation";
import { ChatMessage } from "@/components/demo/chat-message";
import { TypingIndicator } from "@/components/demo/typing-indicator";

// --- 型定義 ---

type Language = "ja" | "en" | "zh" | "ko";
type MessageRole = "user" | "ai";
type SpotCategory = "神社仏閣" | "自然" | "グルメ" | "文化";

interface MultiLangText {
  ja: string;
  en: string;
  zh: string;
  ko: string;
}

interface SpotData {
  id: string;
  name: MultiLangText;
  desc: MultiLangText;
  hours: string;
  price: string;
  category: SpotCategory;
  access: string;
}

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  spots?: SpotData[];
  confidence?: number;
  timestamp: Date;
}

interface EmergencyData {
  title: string;
  police: string;
  fire: string;
  hospital: string;
}

// --- 言語設定 ---

const LANGUAGE_LABELS: Record<Language, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文",
  ko: "한국어",
};

const LANGUAGE_FLAGS: Record<Language, string> = {
  ja: "JP",
  en: "EN",
  zh: "CN",
  ko: "KR",
};

// --- モック観光スポット ---

const SPOTS: SpotData[] = [
  {
    id: "1",
    name: { ja: "金閣寺", en: "Kinkaku-ji", zh: "金阁寺", ko: "금각사" },
    desc: { ja: "金箔で覆われた三層の楼閣", en: "Three-story golden pavilion", zh: "金箔覆盖的三层楼阁", ko: "금박으로 덮인 3층 누각" },
    hours: "9:00-17:00",
    price: "400円",
    category: "神社仏閣",
    access: "バス「金閣寺道」下車",
  },
  {
    id: "2",
    name: { ja: "嵐山竹林", en: "Arashiyama Bamboo Grove", zh: "岚山竹林", ko: "아라시야마 대나무숲" },
    desc: { ja: "幻想的な竹林の小径", en: "Mystical bamboo pathway", zh: "梦幻般的竹林小径", ko: "환상적인 대나무 숲길" },
    hours: "24時間",
    price: "無料",
    category: "自然",
    access: "嵐電「嵐山」下車",
  },
  {
    id: "3",
    name: { ja: "錦市場", en: "Nishiki Market", zh: "锦市场", ko: "니시키 시장" },
    desc: { ja: "京の台所と呼ばれる商店街", en: "Known as Kyoto's Kitchen", zh: "被称为京都厨房的商店街", ko: "교토의 부엌이라 불리는 상점가" },
    hours: "10:00-18:00",
    price: "無料",
    category: "グルメ",
    access: "地下鉄「四条」下車",
  },
  {
    id: "4",
    name: { ja: "伏見稲荷大社", en: "Fushimi Inari Shrine", zh: "伏见稻荷大社", ko: "후시미이나리 신사" },
    desc: { ja: "千本鳥居で有名な神社", en: "Famous for thousands of torii gates", zh: "以千本鸟居闻名", ko: "수천 개의 도리이로 유명" },
    hours: "24時間",
    price: "無料",
    category: "神社仏閣",
    access: "JR「稲荷」下車",
  },
  {
    id: "5",
    name: { ja: "祇園", en: "Gion District", zh: "祇园", ko: "기온" },
    desc: { ja: "伝統的な花街", en: "Traditional geisha district", zh: "传统花街", ko: "전통적인 게이샤 거리" },
    hours: "24時間",
    price: "無料",
    category: "文化",
    access: "京阪「祇園四条」下車",
  },
  {
    id: "6",
    name: { ja: "京都タワー", en: "Kyoto Tower", zh: "京都塔", ko: "교토 타워" },
    desc: { ja: "京都のランドマーク展望塔", en: "Kyoto's landmark observation tower", zh: "京都地标性观景塔", ko: "교토의 랜드마크 전망탑" },
    hours: "9:00-21:00",
    price: "900円",
    category: "文化",
    access: "JR「京都」直結",
  },
];

// --- 緊急連絡先 ---

const EMERGENCY: Record<Language, EmergencyData> = {
  ja: { title: "緊急連絡先", police: "警察: 110", fire: "消防・救急: 119", hospital: "最寄り病院を検索" },
  en: { title: "Emergency Contacts", police: "Police: 110", fire: "Fire/Ambulance: 119", hospital: "Find nearest hospital" },
  zh: { title: "紧急联系方式", police: "警察: 110", fire: "消防/急救: 119", hospital: "搜索最近的医院" },
  ko: { title: "긴급 연락처", police: "경찰: 110", fire: "소방/구급: 119", hospital: "가까운 병원 찾기" },
};

// --- カテゴリアイコン ---

const CATEGORY_ICONS: Record<SpotCategory, React.ReactNode> = {
  神社仏閣: <Landmark className="size-3.5" />,
  自然: <TreePine className="size-3.5" />,
  グルメ: <UtensilsCrossed className="size-3.5" />,
  文化: <Palette className="size-3.5" />,
};

const CATEGORY_COLORS: Record<SpotCategory, string> = {
  神社仏閣: "bg-destructive/10 text-destructive dark:bg-destructive/20",
  自然: "bg-success/10 text-success dark:bg-success/20",
  グルメ: "bg-cta/10 text-cta dark:bg-cta/20",
  文化: "bg-chart-5/10 text-chart-5 dark:bg-chart-5/20",
};

// --- 多言語応答テキスト ---

const GREETING: MultiLangText = {
  ja: "こんにちは！京都観光AIガイドです。おすすめのスポットやグルメ情報をご案内します。何をお探しですか？",
  en: "Hello! I'm the Kyoto Tourism AI Guide. I can recommend spots, restaurants, and more. What are you looking for?",
  zh: "你好！我是京都观光AI导游。可以为您推荐景点、美食等信息。请问您想了解什么？",
  ko: "안녕하세요! 교토 관광 AI 가이드입니다. 명소나 맛집 정보를 안내해 드립니다. 무엇을 찾으시나요?",
};

const RECOMMEND_PREFIX: MultiLangText = {
  ja: "おすすめのスポットをご紹介します：",
  en: "Here are some recommended spots:",
  zh: "为您推荐以下景点：",
  ko: "추천 명소를 소개합니다:",
};

const SEARCH_RESULT: MultiLangText = {
  ja: "こちらが見つかりました：",
  en: "Here's what I found:",
  zh: "为您找到了以下内容：",
  ko: "다음을 찾았습니다:",
};

const NOT_FOUND: MultiLangText = {
  ja: "申し訳ありませんが、該当するスポットが見つかりませんでした。別のキーワードでお試しください。",
  en: "Sorry, I couldn't find any matching spots. Please try different keywords.",
  zh: "抱歉，没有找到相关景点。请尝试其他关键词。",
  ko: "죄송합니다, 해당하는 명소를 찾지 못했습니다. 다른 키워드로 시도해 주세요.",
};

// --- 検索ロジック ---

const KEYWORD_SPOT_MAP: Record<string, string[]> = {
  金閣: ["1"],
  kinkaku: ["1"],
  golden: ["1"],
  竹林: ["2"],
  嵐山: ["2"],
  bamboo: ["2"],
  arashiyama: ["2"],
  錦: ["3"],
  nishiki: ["3"],
  market: ["3"],
  市場: ["3"],
  稲荷: ["4"],
  鳥居: ["4"],
  inari: ["4"],
  torii: ["4"],
  祇園: ["5"],
  gion: ["5"],
  geisha: ["5"],
  タワー: ["6"],
  tower: ["6"],
  神社: ["1", "4"],
  temple: ["1", "4"],
  shrine: ["1", "4"],
  寺: ["1"],
  自然: ["2"],
  nature: ["2"],
  グルメ: ["3"],
  food: ["3"],
  文化: ["5", "6"],
  culture: ["5", "6"],
  おすすめ: [],
  recommend: [],
  人気: [],
  popular: [],
};

function searchSpots(query: string): SpotData[] {
  const lower = query.toLowerCase();
  const matchedIds = new Set<string>();

  for (const [keyword, ids] of Object.entries(KEYWORD_SPOT_MAP)) {
    if (lower.includes(keyword.toLowerCase())) {
      ids.forEach((id) => matchedIds.add(id));
    }
  }

  if (matchedIds.size === 0) return [];
  return SPOTS.filter((s) => matchedIds.has(s.id));
}

function isRecommendRequest(query: string): boolean {
  const lower = query.toLowerCase();
  const keywords = ["おすすめ", "recommend", "人気", "popular", "推荐", "추천"];
  return keywords.some((kw) => lower.includes(kw));
}

// --- ソース ---

const TOURISM_SOURCES = [
  { title: "京都市観光協会公式サイト", type: "外部資料" as const, relevance: 95 },
  { title: "京都府観光ガイド", type: "外部資料" as const, relevance: 85 },
  { title: "多言語観光情報DB", type: "内部文書" as const, relevance: 90 },
];

// --- よくある質問（多言語） ---

const QUICK_QUESTIONS: Record<Language, string[]> = {
  ja: ["おすすめスポットを教えて", "神社を見たい", "グルメ情報が知りたい", "嵐山に行きたい"],
  en: ["Recommend popular spots", "I want to see temples", "Food recommendations", "How to get to Arashiyama"],
  zh: ["推荐热门景点", "想看神社", "美食推荐", "岚山怎么走"],
  ko: ["인기 명소 추천", "신사를 보고 싶어요", "맛집 추천", "아라시야마 가는 법"],
};

// --- SpotCardコンポーネント ---

function SpotCard({ spot, lang }: { spot: SpotData; lang: Language }) {
  const catColor = CATEGORY_COLORS[spot.category];
  const catIcon = CATEGORY_ICONS[spot.category];

  return (
    <Card className="mt-2 py-3 hover:shadow-md transition-shadow">
      <CardContent className="pb-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-sm text-foreground">
              {spot.name[lang]}
            </h4>
            <Badge variant="secondary" className={`text-xs shrink-0 gap-1 ${catColor}`} aria-label={spot.category + "カテゴリ"}>
              {catIcon}
              {spot.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {spot.desc[lang]}
          </p>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="size-3 shrink-0" />
              <span>{spot.hours}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ticket className="size-3 shrink-0" />
              <span>{spot.price}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Train className="size-3 shrink-0" />
              <span className="truncate">{spot.access}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- 緊急パネルコンポーネント ---

function EmergencyPanel({
  lang,
  onClose,
}: {
  lang: Language;
  onClose: () => void;
}) {
  const data = EMERGENCY[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
      onClick={onClose}
    >
      <Card
        className="w-full max-w-sm border-destructive/30 py-0"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="bg-destructive/10 dark:bg-destructive/20 rounded-t-lg pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <ShieldAlert className="size-5" />
              {data.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={onClose}
              aria-label="閉じる"
            >
              <X className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <a
            href="tel:110"
            className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 hover:bg-destructive/15 dark:bg-destructive/20 dark:hover:bg-destructive/25 transition-colors"
            aria-label={data.police}
          >
            <div className="size-10 rounded-full bg-destructive flex items-center justify-center shrink-0">
              <Phone className="size-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-destructive">{data.police}</p>
              <p className="text-xs text-destructive/80">
                {lang === "ja" ? "緊急通報" : lang === "en" ? "Emergency call" : lang === "zh" ? "紧急报警" : "긴급 신고"}
              </p>
            </div>
          </a>

          <a
            href="tel:119"
            className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 hover:bg-warning/15 dark:bg-warning/20 dark:hover:bg-warning/25 transition-colors"
            aria-label={data.fire}
          >
            <div className="size-10 rounded-full bg-warning flex items-center justify-center shrink-0">
              <AlertTriangle className="size-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-warning-foreground dark:text-warning">{data.fire}</p>
              <p className="text-xs text-warning dark:text-warning">
                {lang === "ja" ? "火災・救急" : lang === "en" ? "Fire & Ambulance" : lang === "zh" ? "火灾/急救" : "화재/구급"}
              </p>
            </div>
          </a>

          <button
            type="button"
            className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors w-full text-left"
            aria-label={data.hospital}
          >
            <div className="size-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Hospital className="size-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-primary/90">{data.hospital}</p>
              <p className="text-xs text-primary">
                {lang === "ja" ? "GPS連動検索" : lang === "en" ? "GPS-based search" : lang === "zh" ? "GPS定位搜索" : "GPS 기반 검색"}
              </p>
            </div>
          </button>

          <Separator />

          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">
              {lang === "ja" ? "大使館情報" : lang === "en" ? "Embassy Information" : lang === "zh" ? "使馆信息" : "대사관 정보"}
            </p>
            <p>
              {lang === "ja"
                ? "各国大使館の連絡先は外務省HPをご参照ください"
                : lang === "en"
                ? "Please refer to MOFA website for embassy contacts"
                : lang === "zh"
                ? "各国使馆联系方式请参阅外务省官网"
                : "각국 대사관 연락처는 외무성 홈페이지를 참조하세요"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- メインコンポーネント ---

export default function TourismGuideDemoPage() {
  const [lang, setLang] = useState<Language>("ja");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 言語変更時に挨拶メッセージを更新
  useEffect(() => {
    setMessages([
      {
        id: "greeting",
        role: "ai",
        content: GREETING[lang],
        timestamp: new Date(),
      },
    ]);
  }, [lang]);

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

      const delay = 500 + Math.random() * 600;
      setTimeout(() => {
        let responseContent: string;
        let responseSpots: SpotData[] | undefined;
        let confidence: number;

        if (isRecommendRequest(messageText)) {
          // おすすめリクエスト
          const shuffled = [...SPOTS].sort(() => Math.random() - 0.5);
          responseSpots = shuffled.slice(0, 3);
          responseContent = RECOMMEND_PREFIX[lang];
          confidence = 88;
        } else {
          // キーワード検索
          const found = searchSpots(messageText);
          if (found.length > 0) {
            responseSpots = found;
            responseContent = SEARCH_RESULT[lang];
            confidence = 92;
          } else {
            responseContent = NOT_FOUND[lang];
            confidence = 40;
          }
        }

        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: responseContent,
          spots: responseSpots,
          confidence,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, delay);
    },
    [input, isTyping, lang]
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

  const currentQuestions = QUICK_QUESTIONS[lang];

  return (
    <DemoLayout
      serviceName="多言語観光AIガイド"
      serviceIcon={<Globe className="size-5 text-primary-foreground" />}
      subtitle="観光案内デモ"
      fullHeight
    >
      <div className="flex flex-col h-full gap-3">
        {/* 上部コントロール: 言語切替 + 緊急ボタン */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* 言語切替バー */}
          <div className="flex items-center gap-2" role="radiogroup" aria-label="言語選択">
            {(Object.keys(LANGUAGE_LABELS) as Language[]).map((l) => (
              <Button
                key={l}
                variant={lang === l ? "default" : "outline"}
                size="sm"
                className="text-xs h-8 px-3 gap-1.5"
                onClick={() => setLang(l)}
                role="radio"
                aria-checked={lang === l}
                aria-pressed={lang === l}
                aria-label={LANGUAGE_LABELS[l]}
              >
                <span className="font-bold">{LANGUAGE_FLAGS[l]}</span>
                <span className="hidden sm:inline">{LANGUAGE_LABELS[l]}</span>
              </Button>
            ))}
          </div>

          {/* 緊急ボタン */}
          <Button
            variant="destructive"
            size="sm"
            className="text-xs h-8 gap-1.5 motion-safe:animate-pulse hover:animate-none"
            onClick={() => setShowEmergency(true)}
            aria-label="緊急連絡先を表示"
          >
            <ShieldAlert className="size-4" />
            <span className="hidden sm:inline">
              {lang === "ja" ? "緊急" : lang === "en" ? "Emergency" : lang === "zh" ? "紧急" : "긴급"}
            </span>
            <span className="sm:hidden">SOS</span>
          </Button>
        </div>

        {/* よくある質問 */}
        <Card className="py-3 shrink-0">
          <CardHeader className="pb-2 pt-0">
            <CardTitle className="text-sm flex items-center gap-2">
              <HelpCircle className="size-4 text-primary" />
              {lang === "ja" ? "よくある質問" : lang === "en" ? "Quick Questions" : lang === "zh" ? "常见问题" : "자주 묻는 질문"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-0">
            <div className="flex flex-wrap gap-2">
              {currentQuestions.map((question) => (
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
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                parseBold={false}
                footer={
                  msg.role === "ai" ? (
                    <>
                      {msg.spots && msg.spots.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {msg.spots.map((spot) => (
                            <SpotCard key={spot.id} spot={spot} lang={lang} />
                          ))}
                        </div>
                      )}
                      {msg.confidence !== undefined && (
                        <ConfidenceIndicator
                          confidence={msg.confidence}
                          showEscalation={false}
                        />
                      )}
                      {msg.spots && msg.spots.length > 0 && (
                        <SourceCitation sources={TOURISM_SOURCES} />
                      )}
                    </>
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
                placeholder={
                  lang === "ja"
                    ? "観光スポットや知りたいことを入力..."
                    : lang === "en"
                    ? "Ask about sightseeing spots..."
                    : lang === "zh"
                    ? "输入您想了解的景点或问题..."
                    : "관광지나 궁금한 것을 입력..."
                }
                className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isTyping}
                aria-label={
                  lang === "ja" ? "メッセージを入力" : lang === "en" ? "Enter your message" : lang === "zh" ? "输入消息" : "메시지 입력"
                }
              />
              <Button
                size="icon"
                className="rounded-full shrink-0 transition-transform active:scale-90"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                aria-label={
                  lang === "ja" ? "送信" : lang === "en" ? "Send" : lang === "zh" ? "发送" : "전송"
                }
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 緊急パネル */}
      {showEmergency && (
        <EmergencyPanel lang={lang} onClose={() => setShowEmergency(false)} />
      )}
    </DemoLayout>
  );
}

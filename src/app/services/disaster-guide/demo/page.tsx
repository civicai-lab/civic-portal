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
  AlertTriangle,
  MapPin,
  Phone,
  Shield,
  Globe,
  Navigation,
  Users,
  Siren,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { ChatMessage } from "@/components/demo/chat-message";
import { TypingIndicator } from "@/components/demo/typing-indicator";
import { ChatSuggestions } from "@/components/demo/chat-suggestions";

// --- 型定義 ---

type MessageRole = "user" | "ai";
type Phase = "normal" | "emergency";
type Language = "ja" | "en" | "zh" | "ko";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  shelterInfo?: ShelterInfo;
  isOfficial?: boolean;
}

interface ShelterInfo {
  name: string;
  address: string;
  capacity: number;
  remaining: number;
  distance: string;
}

// --- 避難所データ ---

const SHELTERS: ShelterInfo[] = [
  {
    name: "中央小学校",
    address: "中央区本町1-2-3",
    capacity: 500,
    remaining: 320,
    distance: "0.3km",
  },
  {
    name: "市民体育館",
    address: "中央区栄町4-5-6",
    capacity: 800,
    remaining: 580,
    distance: "0.8km",
  },
  {
    name: "北部コミュニティセンター",
    address: "北区青葉台7-8-9",
    capacity: 300,
    remaining: 210,
    distance: "1.2km",
  },
  {
    name: "南公園防災広場",
    address: "南区緑が丘10-11",
    capacity: 1000,
    remaining: 890,
    distance: "1.5km",
  },
];

// --- 多言語対応 ---

const LANG_LABELS: Record<Language, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文",
  ko: "한국어",
};

interface LocalizedStrings {
  emergencyBanner: string;
  shelterGuide: string;
  officialNotice: string;
  normalWelcome: string;
  quizButton: string;
  emergencyContacts: string;
}

const LOCALIZED: Record<Language, LocalizedStrings> = {
  ja: {
    emergencyBanner: "震度5弱の地震が発生しました - 落ち着いて行動してください",
    shelterGuide: "最寄りの避難所をご案内します",
    officialNotice: "正確な情報は公式情報をご確認ください",
    normalWelcome:
      "防災AIガイドへようこそ。防災に関する質問や避難所情報についてお答えします。平時の防災知識を身につけましょう。",
    quizButton: "防災クイズに挑戦",
    emergencyContacts: "緊急連絡先",
  },
  en: {
    emergencyBanner:
      "An earthquake of intensity lower 5 has occurred - Please remain calm",
    shelterGuide: "We will guide you to the nearest shelter",
    officialNotice: "Please check official sources for accurate information",
    normalWelcome:
      "Welcome to the Disaster Prevention AI Guide. We can answer questions about disaster preparedness and shelter information.",
    quizButton: "Disaster Prevention Quiz",
    emergencyContacts: "Emergency Contacts",
  },
  zh: {
    emergencyBanner: "发生了震度5弱的地震 - 请保持冷静",
    shelterGuide: "我们将为您指引最近的避难所",
    officialNotice: "请确认官方信息以获取准确资讯",
    normalWelcome:
      "欢迎使用防灾AI指南。我们可以回答有关防灾准备和避难所信息的问题。",
    quizButton: "防灾知识问答",
    emergencyContacts: "紧急联系方式",
  },
  ko: {
    emergencyBanner: "진도 5약의 지진이 발생했습니다 - 침착하게 행동해 주세요",
    shelterGuide: "가장 가까운 대피소를 안내해 드립니다",
    officialNotice: "정확한 정보는 공식 정보를 확인해 주세요",
    normalWelcome:
      "방재 AI 가이드에 오신 것을 환영합니다. 방재 관련 질문과 대피소 정보에 대해 답변해 드립니다.",
    quizButton: "방재 퀴즈 도전",
    emergencyContacts: "긴급 연락처",
  },
};

// --- 防災クイズ ---

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "地震発生時、まず行うべき行動は？",
    options: [
      "すぐに外に飛び出す",
      "頭を守り、丈夫な机の下に隠れる",
      "エレベーターで避難する",
      "ガスの元栓を閉める",
    ],
    correct: 1,
    explanation:
      "地震発生時は、まず自分の身を守ることが最優先です。丈夫な机の下に隠れ、揺れが収まるのを待ちましょう。",
  },
  {
    question: "避難時に持ち出すべき必需品として不適切なものは？",
    options: [
      "飲料水・食料",
      "懐中電灯・ラジオ",
      "大量の衣服",
      "常備薬・救急セット",
    ],
    correct: 2,
    explanation:
      "避難時は必要最小限の荷物にしましょう。大量の衣服は避難の妨げになります。飲料水、食料、懐中電灯、ラジオ、常備薬が優先です。",
  },
  {
    question: "津波警報が発令された場合の正しい避難行動は？",
    options: [
      "海の様子を見に行く",
      "高台や津波避難ビルに避難する",
      "地下に避難する",
      "車で遠くへ逃げる",
    ],
    correct: 1,
    explanation:
      "津波警報時は、できるだけ高い場所へ避難してください。海の様子を見に行くことは絶対にやめましょう。",
  },
];

// --- モックレスポンス ---

interface MockResponse {
  content: string;
  shelterInfo?: ShelterInfo;
  isOfficial?: boolean;
}

const EMERGENCY_RESPONSES: Record<string, MockResponse> = {
  "避難所はどこですか": {
    content:
      "最寄りの避難所をご案内します。現在地から最も近い避難所は中央小学校（徒歩約4分）です。\n\n以下の点にご注意ください：\n- 頭上に注意しながら移動してください\n- ブロック塀や自動販売機から離れてください\n- エレベーターは使用しないでください",
    shelterInfo: SHELTERS[0],
  },
  "家族と連絡が取れません": {
    content:
      "ご家族との連絡方法をご案内します：\n\n1. **災害用伝言ダイヤル（171）**: 「171」に電話し、ガイダンスに従ってメッセージを録音・再生できます\n\n2. **災害用伝言板（web171）**: web171.jp にアクセスし、安否情報を登録・確認できます\n\n3. **各キャリアの災害用伝言板**: スマートフォンから利用可能です\n\n※ 正確な安否情報は各自治体の安否確認システムもご利用ください。",
    isOfficial: true,
  },
  "水や食料はどこで手に入りますか": {
    content:
      "物資配給に関する情報です：\n\n避難所での物資配給は各避難所の運営本部で行われます。\n\n※ 配給の詳細（時間・場所・内容）は正確な情報が変動するため、お近くの避難所スタッフまたは市の公式防災情報をご確認ください。\n\n推測に基づく情報はお伝えできませんので、ご了承ください。",
    isOfficial: true,
  },
};

const NORMAL_RESPONSES: Record<string, MockResponse> = {
  "非常持ち出し袋には何を入れればいい？": {
    content:
      "非常持ち出し袋に入れるべきアイテムをご紹介します：\n\n**必須アイテム**:\n- 飲料水（1人1日3リットル × 3日分）\n- 非常食（缶詰、乾パン、アルファ米）\n- 懐中電灯・予備電池\n- 携帯ラジオ\n- 救急セット・常備薬\n- モバイルバッテリー\n\n**あると便利なもの**:\n- ラップフィルム（食器代用）\n- ポリ袋（多用途）\n- 軍手・スリッパ\n- 現金（小銭含む）\n- 身分証明書のコピー",
  },
  "ハザードマップはどこで見れますか": {
    content:
      "ハザードマップの確認方法です：\n\n1. **市の公式サイト**: 防災情報ページからPDFでダウンロード可能\n2. **国土交通省ハザードマップポータル**: disaportal.gsi.go.jp\n3. **市役所窓口**: 防災課にて紙版を配布\n\n※ ハザードマップの詳細内容は最新版を公式サイトでご確認ください。お住まいの地域の浸水想定区域や土砂災害警戒区域を事前に確認しておくことが大切です。",
    isOfficial: true,
  },
};

function getDefaultEmergencyResponse(input: string): MockResponse {
  return {
    content: `ご質問ありがとうございます。「${input}」について、正確な情報をお伝えするため、以下の公式情報源をご確認ください：\n\n- 市の防災ポータルサイト\n- 防災行政無線の放送内容\n- NHKの災害情報\n\n推測に基づく回答は行いません。正確な情報は公式情報をご確認ください。`,
    isOfficial: true,
  };
}

function getDefaultNormalResponse(input: string): MockResponse {
  return {
    content: `「${input}」についてのご質問ですね。防災に関する具体的な情報については、お住まいの市区町村の防災課にお問い合わせいただくか、公式防災ポータルサイトをご確認ください。\n\n日頃からの備えが大切です。何か他にご質問があればお聞きください。`,
  };
}

// --- 初期メッセージ ---

function getInitialMessages(phase: Phase, lang: Language): ChatMessage[] {
  const strings = LOCALIZED[lang];
  if (phase === "emergency") {
    return [
      {
        id: "init-e1",
        role: "ai",
        content: `${strings.shelterGuide}。落ち着いて、以下の指示に従ってください。\n\n1. まず身の安全を確保してください\n2. 周囲の状況を確認してください\n3. 避難が必要な場合は、最寄りの避難所へ向かってください\n\n${strings.officialNotice}`,
        timestamp: new Date(),
        isOfficial: true,
      },
    ];
  }
  return [
    {
      id: "init-n1",
      role: "ai",
      content: strings.normalWelcome,
      timestamp: new Date(),
    },
  ];
}

// --- 避難所カード ---

function ShelterCard({ shelter }: { shelter: ShelterInfo }) {
  const occupancyRate = ((shelter.capacity - shelter.remaining) / shelter.capacity) * 100;

  return (
    <Card className="mt-2 py-3">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" />
              {shelter.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {shelter.address}
            </p>
          </div>
          <Badge variant="outline" className="text-xs shrink-0">
            <Navigation className="size-3" />
            {shelter.distance}
          </Badge>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              残り {shelter.remaining}/{shelter.capacity}人
            </span>
            <span>{Math.round(occupancyRate)}% 使用中</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                occupancyRate > 80
                  ? "bg-destructive"
                  : occupancyRate > 50
                  ? "bg-warning"
                  : "bg-success"
              }`}
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- マップマーカー ---

function MapMarker({
  x,
  y,
  label,
  active,
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -100%)" }}
    >
      <span
        className={`text-xs px-1.5 py-0.5 rounded whitespace-nowrap font-medium ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-white text-foreground shadow-sm"
        }`}
      >
        {label}
      </span>
      <MapPin
        className={`size-5 ${
          active ? "text-primary" : "text-destructive"
        }`}
        fill={active ? "currentColor" : "none"}
      />
    </div>
  );
}

// --- メインコンポーネント ---

export default function DisasterGuideDemoPage() {
  const [phase, setPhase] = useState<Phase>("emergency");
  const [lang, setLang] = useState<Language>("ja");
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getInitialMessages("emergency", "ja")
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const strings = LOCALIZED[lang];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // フェーズ切替
  const handlePhaseChange = useCallback(
    (newPhase: Phase) => {
      setPhase(newPhase);
      setMessages(getInitialMessages(newPhase, lang));
      setShowQuiz(false);
      setQuizIndex(0);
      setSelectedAnswer(null);
    },
    [lang]
  );

  // 言語切替
  const handleLangChange = useCallback(
    (newLang: Language) => {
      setLang(newLang);
      setMessages(getInitialMessages(phase, newLang));
    },
    [phase]
  );

  // メッセージ送信
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

      const responses =
        phase === "emergency" ? EMERGENCY_RESPONSES : NORMAL_RESPONSES;
      const mockResponse =
        responses[messageText] ||
        (phase === "emergency"
          ? getDefaultEmergencyResponse(messageText)
          : getDefaultNormalResponse(messageText));
      const delay = Math.min(1200 + mockResponse.content.length * 5, 3000);
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: mockResponse.content,
          timestamp: new Date(),
          shelterInfo: mockResponse.shelterInfo,
          isOfficial: mockResponse.isOfficial,
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, delay);
    },
    [input, isTyping, phase]
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

  // クイズ
  const currentQuiz = QUIZ_QUESTIONS[quizIndex];

  const handleQuizAnswer = useCallback(
    (answerIndex: number) => {
      setSelectedAnswer(answerIndex);
    },
    []
  );

  const handleNextQuiz = useCallback(() => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuiz(false);
      setQuizIndex(0);
      setSelectedAnswer(null);
    }
  }, [quizIndex]);

  return (
    <DemoLayout
      serviceName="防災AIガイド"
      serviceSlug="disaster-guide"
      serviceIcon={<Shield className="size-5 text-primary-foreground" />}
      subtitle="チャット+マップデモ"
      fullHeight
    >
      {/* 緊急情報バナー（有事モード時） */}
      {phase === "emergency" && (
        <div className="bg-destructive text-destructive-foreground px-4 py-3 text-center -mx-4 -mt-4 mb-4">
          <p className="text-sm font-bold flex items-center justify-center gap-2">
            <Siren className="size-5 motion-safe:animate-pulse" />
            {strings.emergencyBanner}
          </p>
        </div>
      )}

      {/* フェーズ切替 + 言語切替 */}
      <div className="flex items-center justify-between gap-3 mb-4 -mt-2">
        {/* 言語切替 */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <Globe className="size-4 text-muted-foreground shrink-0" />
          {(Object.keys(LANG_LABELS) as Language[]).map((l) => (
            <Button
              key={l}
              variant={lang === l ? "default" : "ghost"}
              size="xs"
              onClick={() => handleLangChange(l)}
              className="text-xs shrink-0"
              aria-pressed={lang === l}
            >
              {LANG_LABELS[l]}
            </Button>
          ))}
        </div>

        {/* フェーズ切替トグル */}
        <div className="flex items-center bg-muted rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => handlePhaseChange("normal")}
            aria-pressed={phase === "normal"}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              phase === "normal"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            平時モード
          </button>
          <button
            onClick={() => handlePhaseChange("emergency")}
            aria-pressed={phase === "emergency"}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              phase === "emergency"
                ? "bg-destructive text-destructive-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            有事モード
          </button>
        </div>
      </div>

      {/* メインコンテンツ - 2カラム */}
      <div>
        <div className="flex flex-col md:flex-row gap-4" style={{ height: "calc(100vh - 200px)" }}>
          {/* 左カラム: チャット (60%) */}
          <div className="flex-1 md:w-[60%] flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col min-h-0 py-0">
              {/* メッセージリスト */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                    footer={
                      msg.role === "ai" ? (
                        <>
                          {msg.isOfficial && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <AlertTriangle className="size-3" />
                              {strings.officialNotice}
                            </p>
                          )}
                          {msg.shelterInfo && (
                            <ShelterCard shelter={msg.shelterInfo} />
                          )}
                        </>
                      ) : undefined
                    }
                  />
                ))}

                {isTyping && <TypingIndicator />}

                {/* 空状態ガイダンス */}
                <ChatSuggestions
                  suggestions={["避難所の場所を教えて", "地震が起きたらどうする？", "非常持出袋の中身は？"]}
                  onSelect={setInput}
                  isVisible={messages.length <= 1}
                />

                <div ref={messagesEndRef} />
              </div>

              {/* クイック質問（有事モード） */}
              {phase === "emergency" && (
                <div className="border-t border-border px-4 py-2">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "避難所はどこですか",
                      "家族と連絡が取れません",
                      "水や食料はどこで手に入りますか",
                    ].map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1 px-2.5"
                        onClick={() => handleSend(q)}
                        disabled={isTyping}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* クイック質問（平時モード） */}
              {phase === "normal" && !showQuiz && (
                <div className="border-t border-border px-4 py-2">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "非常持ち出し袋には何を入れればいい？",
                      "ハザードマップはどこで見れますか",
                    ].map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1 px-2.5"
                        onClick={() => handleSend(q)}
                        disabled={isTyping}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 入力エリア */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      phase === "emergency"
                        ? "緊急時のご質問をどうぞ"
                        : "防災に関するご質問をどうぞ"
                    }
                    aria-label="防災に関する質問を入力"
                    className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled={isTyping}
                  />
                  <Button
                    size="icon"
                    className="rounded-full shrink-0 transition-transform motion-safe:active:scale-90"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    aria-label={isTyping ? "応答を生成中" : "メッセージを送信"}
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* 右カラム: マップ + 避難所リスト (40%) */}
          <div className="md:w-[40%] flex flex-col gap-4 min-h-0 overflow-y-auto">
            {/* モックマップ */}
            <Card className="py-0 overflow-hidden">
              <div className="relative bg-muted aspect-[4/3]">
                {/* グリッド線 */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute w-full border-t border-muted-foreground"
                      style={{ top: `${(i + 1) * 12.5}%` }}
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full border-l border-muted-foreground"
                      style={{ left: `${(i + 1) * 12.5}%` }}
                    />
                  ))}
                </div>

                {/* 道路風ライン */}
                <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-white/60 -translate-y-1/2" />
                <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-white/60 -translate-x-1/2" />
                <div className="absolute top-[30%] left-[20%] right-[20%] h-1 bg-white/40" />
                <div className="absolute top-[20%] bottom-[20%] left-[35%] w-1 bg-white/40" />

                {/* 現在地 */}
                <div
                  className="absolute flex flex-col items-center"
                  style={{
                    left: "50%",
                    top: "55%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="size-4 bg-primary rounded-full border-2 border-white shadow-lg motion-safe:animate-pulse" />
                  <span className="text-xs mt-0.5 font-medium text-primary/90 bg-white/80 px-1 rounded">
                    現在地
                  </span>
                </div>

                {/* 避難所マーカー */}
                <MapMarker x={40} y={25} label="中央小学校" active />
                <MapMarker x={70} y={35} label="市民体育館" />
                <MapMarker x={25} y={60} label="北部コミュニティセンター" />
                <MapMarker x={60} y={75} label="南公園防災広場" />

                {/* マップ凡例 */}
                <div className="absolute bottom-2 left-2 bg-white/90 rounded p-1.5 text-xs">
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="size-2.5 bg-primary rounded-full" />
                    <span>現在地</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-2.5 text-destructive" />
                    <span>避難所</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 避難所リスト */}
            <Card className="py-4">
              <CardHeader className="pb-2 pt-0">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  避難所一覧
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-0 space-y-3">
                {SHELTERS.map((shelter) => {
                  const occupancyRate =
                    ((shelter.capacity - shelter.remaining) /
                      shelter.capacity) *
                    100;
                  return (
                    <div key={shelter.name}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium">{shelter.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {shelter.address}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge
                            variant="outline"
                            className="text-xs mb-0.5"
                          >
                            <Navigation className="size-2.5" />
                            {shelter.distance}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            残り {shelter.remaining}人
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1.5">
                        <div
                          className={`h-full rounded-full ${
                            occupancyRate > 80
                              ? "bg-destructive"
                              : occupancyRate > 50
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                          style={{ width: `${occupancyRate}%` }}
                        />
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* 防災クイズ（平時モードのみ） */}
            {phase === "normal" && (
              <Card className="py-4">
                <CardHeader className="pb-2 pt-0">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HelpCircle className="size-4 text-primary" />
                    防災知識チェック
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-0">
                  {!showQuiz ? (
                    <Button
                      variant="cta"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setShowQuiz(true);
                        setQuizIndex(0);
                        setSelectedAnswer(null);
                      }}
                    >
                      {strings.quizButton}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-muted-foreground">
                        Q{quizIndex + 1}/{QUIZ_QUESTIONS.length}
                      </p>
                      <p className="text-sm font-medium">
                        {currentQuiz.question}
                      </p>
                      <div className="space-y-2">
                        {currentQuiz.options.map((option, idx) => {
                          const isSelected = selectedAnswer === idx;
                          const isCorrect = idx === currentQuiz.correct;
                          const showResult = selectedAnswer !== null;

                          return (
                            <button
                              key={idx}
                              onClick={() => handleQuizAnswer(idx)}
                              disabled={selectedAnswer !== null}
                              className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                                showResult && isCorrect
                                  ? "border-success bg-success/10 text-success dark:bg-success/15"
                                  : showResult && isSelected && !isCorrect
                                  ? "border-destructive bg-destructive/10 text-destructive dark:bg-destructive/15"
                                  : isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50 hover:bg-muted"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                {showResult && isCorrect && (
                                  <CheckCircle className="size-4 text-success shrink-0" />
                                )}
                                {showResult && isSelected && !isCorrect && (
                                  <AlertTriangle className="size-4 text-destructive shrink-0" />
                                )}
                                {option}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {selectedAnswer !== null && (
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">
                            {currentQuiz.explanation}
                          </p>
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={handleNextQuiz}
                          >
                            {quizIndex < QUIZ_QUESTIONS.length - 1
                              ? "次の問題"
                              : "クイズ終了"}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 緊急連絡先 */}
            <Card className="py-4">
              <CardHeader className="pb-2 pt-0">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Phone className="size-4 text-destructive" />
                  {strings.emergencyContacts}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-0">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-destructive/10 dark:bg-destructive/15 rounded-lg p-2.5">
                    <Phone className="size-4 text-destructive" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        消防・救急
                      </p>
                      <p className="text-lg font-bold text-destructive">119</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-2.5">
                    <Phone className="size-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">警察</p>
                      <p className="text-lg font-bold text-primary">110</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}

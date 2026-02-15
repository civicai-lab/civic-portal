"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  Circle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Copy,
  FileDown,
  FileType,
  Clock,
  User,
  CalendarDays,
  MapPin,
  Quote,
  RotateCcw,
  Pencil,
  ClipboardList,
} from "lucide-react";

// --- サンプルデータ ---

const SAMPLE_MINUTES = `【市議会総務委員会 議事録】
日時：2026年2月10日（火）14:00〜16:30
場所：市役所本庁舎 第1委員会室
出席者：田中委員長、佐藤委員、鈴木委員

【議題1：令和8年度予算案について】
田中委員長：それでは、令和8年度の一般会計予算案について審議を開始します。今年度の重点施策として、デジタル化推進と子育て支援の拡充を提案しています。
佐藤委員：デジタル化推進の予算として3億2千万円が計上されていますが、具体的な使途について説明をお願いします。特にAI導入に関する部分を詳しくお聞きしたい。
鈴木委員：子育て支援については、保育所の待機児童ゼロを目標にするということですが、現状の待機児童数と具体的な解消計画を教えてください。
田中委員長：デジタル化予算の内訳は、庁内システム刷新に1億5千万円、AI窓口導入に8千万円、職員研修に4千万円、セキュリティ強化に5千万円です。

【議題2：公共施設の老朽化対策について】
田中委員長：続いて、公共施設の老朽化対策について報告をお願いします。
佐藤委員：市内42の公共施設のうち、築30年以上が28施設あり、早急な対応が必要です。特に中央公民館と第二体育館は耐震基準を満たしておらず、優先的に改修すべきです。
鈴木委員：施設統合も視野に入れるべきではないでしょうか。利用率の低い施設を統合することで、維持コストを削減しつつ、集約した施設の質を向上できると考えます。
田中委員長：施設統合については、住民説明会を開催した上で進める方針とします。次回委員会までに、統合候補施設のリストを作成してください。`;

const SUMMARY_DATA = {
  meeting: {
    date: "2026年2月10日（火）14:00〜16:30",
    location: "市役所本庁舎 第1委員会室",
    participants: ["田中委員長", "佐藤委員", "鈴木委員"],
    topics: [
      "令和8年度予算案について",
      "公共施設の老朽化対策について",
    ],
  },
  topics: [
    {
      title: "令和8年度予算案について",
      keyPoints: [
        "デジタル化推進と子育て支援の拡充が今年度の重点施策",
        "デジタル化推進予算は3億2千万円（システム刷新1.5億、AI窓口8千万、研修4千万、セキュリティ5千万）",
        "保育所の待機児童ゼロを目標とする子育て支援策を推進",
        "AI窓口導入により住民対応の効率化と24時間対応を実現予定",
      ],
      decisions: [
        "デジタル化推進予算3億2千万円の内訳を確認、原案通り審議を継続",
      ],
      highlights: [
        {
          speaker: "佐藤委員",
          content:
            "デジタル化推進の予算として3億2千万円が計上されていますが、具体的な使途について説明をお願いします。特にAI導入に関する部分を詳しくお聞きしたい。",
        },
        {
          speaker: "田中委員長",
          content:
            "デジタル化予算の内訳は、庁内システム刷新に1億5千万円、AI窓口導入に8千万円、職員研修に4千万円、セキュリティ強化に5千万円です。",
        },
      ],
    },
    {
      title: "公共施設の老朽化対策について",
      keyPoints: [
        "市内42施設のうち築30年以上が28施設で早急な対応が必要",
        "中央公民館と第二体育館は耐震基準未達で優先改修対象",
        "施設統合による維持コスト削減と施設品質向上を検討",
        "住民説明会を開催した上で統合を進める方針",
      ],
      decisions: [
        "中央公民館と第二体育館の耐震改修を優先的に実施",
        "次回委員会までに施設統合候補リストを作成",
        "住民説明会の開催を条件に施設統合を推進",
      ],
      highlights: [
        {
          speaker: "鈴木委員",
          content:
            "施設統合も視野に入れるべきではないでしょうか。利用率の低い施設を統合することで、維持コストを削減しつつ、集約した施設の質を向上できると考えます。",
        },
      ],
    },
  ],
  actionItems: [
    {
      assignee: "総務課",
      content: "デジタル化推進予算の詳細計画書を作成",
      deadline: "2026年2月28日",
      status: "進行中",
    },
    {
      assignee: "施設管理課",
      content: "施設統合候補リストの作成",
      deadline: "2026年3月10日（次回委員会まで）",
      status: "未着手",
    },
    {
      assignee: "施設管理課",
      content: "中央公民館・第二体育館の耐震改修見積もり取得",
      deadline: "2026年3月31日",
      status: "未着手",
    },
    {
      assignee: "企画課",
      content: "住民説明会の開催計画策定",
      deadline: "2026年3月20日",
      status: "未着手",
    },
  ],
  publicRelease: `令和8年度予算案および公共施設老朽化対策について、総務委員会で審議が行われました。デジタル化推進に3億2千万円を計上し、AI窓口の導入や庁内システムの刷新を進めます。また、築30年以上の公共施設28施設の対応として、中央公民館と第二体育館の耐震改修を優先実施するとともに、施設統合についても住民説明会を経て検討する方針が示されました。`,
};

// --- 処理ステップの型定義 ---

type ProcessStepStatus = "pending" | "processing" | "done";

interface ProcessStep {
  label: string;
  status: ProcessStepStatus;
}

// --- ステップインジケーター ---

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "議事録入力" },
    { num: 2, label: "AI処理中" },
    { num: 3, label: "要約結果" },
  ];

  const progressPercent =
    currentStep === 1 ? 0 : currentStep === 2 ? 50 : 100;

  return (
    <div className="mx-auto mb-8 w-full max-w-xl">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.num} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  currentStep >= step.num
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {currentStep > step.num ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  currentStep >= step.num
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2 mb-5 h-0.5 flex-1 rounded bg-border" />
            )}
          </div>
        ))}
      </div>
      {/* プログレスバー */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

// --- Step 1: 議事録入力 ---

function Step1Input({
  text,
  onTextChange,
  onSubmit,
}: {
  text: string;
  onTextChange: (val: string) => void;
  onSubmit: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadSample = useCallback(() => {
    onTextChange(SAMPLE_MINUTES);
  }, [onTextChange]);

  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="size-5 text-primary" />
            議事録テキストを入力
          </CardTitle>
          <CardDescription>
            議事録のテキストを貼り付けるか、サンプルデータを読み込んでください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            rows={20}
            placeholder="ここに議事録のテキストを貼り付けてください..."
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleLoadSample}>
                <ClipboardList className="size-4" />
                サンプルを読み込む
              </Button>
              <Button variant="outline" size="sm" onClick={handleFileClick}>
                <Upload className="size-4" />
                音声ファイルアップロード
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={() => {
                  /* モック: 処理しない */
                }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {text.length.toLocaleString()} 文字
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          size="lg"
          variant="cta"
          disabled={text.trim().length === 0}
          onClick={onSubmit}
          className="min-w-[200px]"
        >
          <Sparkles className="size-4" />
          要約を生成
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

// --- Step 2: AI処理中 ---

function Step2Processing({ onComplete }: { onComplete: () => void }) {
  const [steps, setSteps] = useState<ProcessStep[]>([
    { label: "テキスト前処理完了", status: "processing" },
    { label: "発言者識別完了（3名検出）", status: "pending" },
    { label: "要点抽出中...", status: "pending" },
    { label: "アクションアイテム抽出", status: "pending" },
    { label: "要約文生成", status: "pending" },
  ]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timings = [400, 800, 1200, 1600, 2000];
    const timers: ReturnType<typeof setTimeout>[] = [];

    timings.forEach((ms, i) => {
      const timer = setTimeout(() => {
        setSteps((prev) => {
          const next = [...prev];
          // 現在のステップを完了に
          next[i] = { ...next[i], status: "done" };
          // 次のステップを処理中に
          if (i + 1 < next.length) {
            next[i + 1] = { ...next[i + 1], status: "processing" };
          }
          return next;
        });
        setProgress(((i + 1) / timings.length) * 100);
      }, ms);
      timers.push(timer);
    });

    // 完了後にStep3へ遷移
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
          <CardTitle className="text-xl">AIが議事録を分析しています</CardTitle>
          <CardDescription>
            しばらくお待ちください...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 処理ステップ */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {step.status === "done" && (
                  <CheckCircle2 className="size-5 shrink-0 text-green-600" />
                )}
                {step.status === "processing" && (
                  <Loader2 className="size-5 shrink-0 animate-spin text-primary" />
                )}
                {step.status === "pending" && (
                  <Circle className="size-5 shrink-0 text-muted-foreground/40" />
                )}
                <span
                  className={`text-sm ${
                    step.status === "done"
                      ? "font-medium text-foreground"
                      : step.status === "processing"
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* 進捗バー */}
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>処理進捗</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Step 3: 要約結果 ---

function Step3Result({ onReset }: { onReset: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const summaryText = SUMMARY_DATA.topics
      .map(
        (t) =>
          `【${t.title}】\n${t.keyPoints.map((p) => `- ${p}`).join("\n")}\n決定事項: ${t.decisions.join("、")}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const handleMockDownload = useCallback((format: string) => {
    alert(`${format}ファイルのダウンロードを開始します（デモ用モック）`);
  }, []);

  return (
    <div className="space-y-8">
      {/* メインコンテンツ: 構造化要約 + アクションアイテム */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 構造化要約 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 会議情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="size-5 text-primary" />
                会議情報
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">
                      日時
                    </div>
                    <div className="text-sm">{SUMMARY_DATA.meeting.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">
                      場所
                    </div>
                    <div className="text-sm">
                      {SUMMARY_DATA.meeting.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">
                      参加者
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SUMMARY_DATA.meeting.participants.map((p) => (
                        <Badge key={p} variant="secondary">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ClipboardList className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">
                      議題
                    </div>
                    <div className="text-sm">
                      {SUMMARY_DATA.meeting.topics.map((t, i) => (
                        <div key={i}>
                          {i + 1}. {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 議題ごとの要約 */}
          <Tabs defaultValue="topic-0">
            <TabsList className="w-full">
              {SUMMARY_DATA.topics.map((topic, i) => (
                <TabsTrigger key={i} value={`topic-${i}`} className="flex-1">
                  <span className="hidden sm:inline">議題{i + 1}: </span>
                  <span className="truncate">
                    {topic.title.length > 12
                      ? topic.title.slice(0, 12) + "..."
                      : topic.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            {SUMMARY_DATA.topics.map((topic, i) => (
              <TabsContent key={i} value={`topic-${i}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 要点 */}
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-foreground">
                        要点
                      </h4>
                      <ul className="space-y-1.5">
                        {topic.keyPoints.map((point, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 決定事項 */}
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-foreground">
                        決定事項
                      </h4>
                      <div className="space-y-2">
                        {topic.decisions.map((dec, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                            {dec}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 発言ハイライト */}
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-foreground">
                        発言ハイライト
                      </h4>
                      <div className="space-y-3">
                        {topic.highlights.map((hl, j) => (
                          <div
                            key={j}
                            className="rounded-lg border-l-4 border-primary/30 bg-muted/50 px-4 py-3"
                          >
                            <div className="mb-1 flex items-center gap-1.5">
                              <Quote className="size-3.5 text-primary" />
                              <span className="text-xs font-semibold text-primary">
                                {hl.speaker}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {hl.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* サイドバー: アクションアイテム + エクスポート + 広報原稿 */}
        <div className="space-y-6">
          {/* アクションアイテム */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="size-5 text-cta" />
                アクションアイテム
              </CardTitle>
              <CardDescription>
                {SUMMARY_DATA.actionItems.length}件のタスクが抽出されました
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SUMMARY_DATA.actionItems.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-background p-3 text-sm"
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-xs"
                      >
                        {item.assignee}
                      </Badge>
                      <Badge
                        variant={
                          item.status === "進行中" ? "default" : "outline"
                        }
                        className="shrink-0 text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="mb-1 text-foreground">{item.content}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {item.deadline}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* エクスポートオプション */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">エクスポート</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleMockDownload("Word")}
              >
                <FileType className="size-4" />
                Wordダウンロード
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleMockDownload("PDF")}
              >
                <FileDown className="size-4" />
                PDFダウンロード
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-start ${copied ? "border-green-500 text-green-600" : ""}`}
                onClick={handleCopy}
              >
                <Copy className="size-4" />
                {copied ? "コピーしました" : "クリップボードにコピー"}
              </Button>
            </CardContent>
          </Card>

          {/* 広報原稿プレビュー */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">広報原稿プレビュー</CardTitle>
              <CardDescription>
                広報誌・ウェブサイト用の簡潔なテキスト
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed text-muted-foreground">
                {SUMMARY_DATA.publicRelease}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Pencil className="size-4" />
                広報原稿を編集
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* やり直すボタン */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg" onClick={onReset}>
          <RotateCcw className="size-4" />
          やり直す
        </Button>
      </div>
    </div>
  );
}

// --- メインページ ---

export default function MinutesSummaryDemoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputText, setInputText] = useState("");

  const handleSubmit = useCallback(() => {
    setCurrentStep(2);
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setCurrentStep(3);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(1);
    setInputText("");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダーセクション */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            デモ体験
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            議事録要約AI
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            議事録テキストをAIが自動分析し、構造化された要約・アクションアイテム・広報原稿を生成します
          </p>
        </div>
      </section>

      {/* ワークフロー */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepIndicator currentStep={currentStep} />

          {currentStep === 1 && (
            <Step1Input
              text={inputText}
              onTextChange={setInputText}
              onSubmit={handleSubmit}
            />
          )}

          {currentStep === 2 && (
            <Step2Processing onComplete={handleProcessingComplete} />
          )}

          {currentStep === 3 && <Step3Result onReset={handleReset} />}
        </div>
      </section>
    </div>
  );
}

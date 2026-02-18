"use client";

import { useState, useCallback, useMemo } from "react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Shield,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

// ---- 型定義 ----

type Choice = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  text: string;
  subtext?: string;
  choices: Choice[];
  inputType?: "text" | "textarea";
  inputPlaceholder?: string;
  optional?: boolean;
};

type WelfareProgram = {
  id: string;
  name: string;
  summary: string;
  amount: string;
  office: string;
  matchLevel: "high" | "medium" | "low";
  conditions: string[];
};

// ---- データ ----

const questions: Question[] = [
  {
    id: "household",
    text: "世帯構成を教えてください",
    subtext: "該当する世帯構成をお選びください",
    choices: [
      { id: "single", label: "単身" },
      { id: "couple", label: "夫婦" },
      { id: "family", label: "子育て世帯" },
      { id: "elderly", label: "高齢者世帯" },
    ],
  },
  {
    id: "concern",
    text: "お困りごとは何ですか？",
    subtext: "最も当てはまるものをお選びください",
    choices: [
      { id: "living", label: "生活費" },
      { id: "medical", label: "医療費" },
      { id: "housing", label: "住居" },
      { id: "childcare", label: "子育て" },
      { id: "nursing", label: "介護" },
    ],
  },
  {
    id: "income",
    text: "世帯の年収帯を教えてください",
    subtext: "おおよその金額で構いません",
    choices: [
      { id: "under200", label: "200万円未満" },
      { id: "200to400", label: "200〜400万円" },
      { id: "400to600", label: "400〜600万円" },
      { id: "over600", label: "600万円以上" },
    ],
  },
  {
    id: "area",
    text: "お住まいの地域はどちらですか？",
    subtext: "市区町村名をご入力ください",
    choices: [],
    inputType: "text",
    inputPlaceholder: "例: 横浜市中区",
  },
  {
    id: "other",
    text: "その他のご事情があればお聞かせください",
    subtext: "任意回答です。お気軽にご記入ください。",
    choices: [],
    inputType: "textarea",
    inputPlaceholder:
      "例: 障害を持つ家族がいる、最近失業した、など",
    optional: true,
  },
];

const allPrograms: WelfareProgram[] = [
  {
    id: "p1",
    name: "生活保護制度",
    summary:
      "生活に困窮している方に対し、最低限度の生活を保障する制度です。生活扶助・住宅扶助・医療扶助等が含まれます。",
    amount: "月額 約12万円〜（世帯構成による）",
    office: "お住まいの地域の福祉事務所",
    matchLevel: "high",
    conditions: ["資産が基準額以下", "収入が最低生活費以下"],
  },
  {
    id: "p2",
    name: "住居確保給付金",
    summary:
      "離職・廃業等で住居を失う恐れのある方に、家賃相当額を支給する制度です。",
    amount: "月額 最大53,700円（地域による）",
    office: "自立相談支援機関",
    matchLevel: "high",
    conditions: ["離職後2年以内", "ハローワークで求職活動中"],
  },
  {
    id: "p3",
    name: "児童手当",
    summary:
      "中学校卒業までの児童を養育している方に支給される手当です。",
    amount: "月額 10,000〜15,000円/人",
    office: "市区町村の子育て支援課",
    matchLevel: "medium",
    conditions: ["中学校卒業までの児童を養育", "所得制限あり"],
  },
  {
    id: "p4",
    name: "高額療養費制度",
    summary:
      "医療費の自己負担額が上限額を超えた場合に、超過分が支給される制度です。",
    amount: "自己負担上限額を超えた分",
    office: "加入している健康保険の窓口",
    matchLevel: "medium",
    conditions: ["医療費が自己負担上限を超過"],
  },
  {
    id: "p5",
    name: "介護保険サービス",
    summary:
      "要介護認定を受けた方が、自己負担1〜3割で介護サービスを利用できる制度です。",
    amount: "サービス費用の7〜9割を保険給付",
    office: "市区町村の介護保険課",
    matchLevel: "low",
    conditions: ["65歳以上または特定疾病", "要介護認定が必要"],
  },
];

const emergencyKeywords = [
  "DV",
  "暴力",
  "虐待",
  "ネグレクト",
  "死にたい",
  "自殺",
  "殴られ",
  "怖い",
];

const matchLevelConfig = {
  high: { label: "高", className: "bg-success/15 text-success" },
  medium: { label: "中", className: "bg-primary/10 text-primary/90" },
  low: { label: "低", className: "bg-muted text-muted-foreground" },
};

// ---- コンポーネント ----

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.min((current / total) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          質問 {current}/{total}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function EmergencyBanner() {
  return (
    <div className="rounded-lg border-2 border-destructive/30 bg-destructive/10 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div>
          <p className="font-bold text-destructive">
            緊急の相談窓口のご案内
          </p>
          <p className="mt-1 text-sm text-destructive">
            つらい状況にいらっしゃるかもしれません。すぐに専門の相談員がお話を伺います。
          </p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <Phone className="size-4" />
              <span>よりそいホットライン: 0120-279-338（24時間）</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <Shield className="size-4" />
              <span>DV相談ナビ: #8008</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
              <Phone className="size-4" />
              <span>児童相談所虐待対応ダイヤル: 189</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- メインページ ----

export default function WelfareNavigatorDemo() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const question = questions[currentQ];
  const isLastQuestion = currentQ === questions.length - 1;

  // 緊急ワード検知
  const hasEmergency = useMemo(() => {
    const allText = Object.values(textInputs).join(" ");
    return emergencyKeywords.some((kw) => allText.includes(kw));
  }, [textInputs]);

  // マッチング結果を算出（デモ用: 回答に応じてフィルタリング）
  const matchedPrograms = useMemo(() => {
    if (!completed) return [];
    const programs = [...allPrograms];
    // デモ用: 回答に基づいた簡易フィルタリング
    const concern = answers["concern"];
    const household = answers["household"];
    return programs
      .map((p) => {
        let level = p.matchLevel;
        // 子育て世帯 + 児童手当 → 高
        if (household === "family" && p.id === "p3") level = "high";
        // 介護の悩み + 介護保険 → 高
        if (concern === "nursing" && p.id === "p5") level = "high";
        // 医療費の悩み + 高額療養費 → 高
        if (concern === "medical" && p.id === "p4") level = "high";
        // 住居の悩み + 住居確保給付金 → 高
        if (concern === "housing" && p.id === "p2") level = "high";
        return { ...p, matchLevel: level };
      })
      .sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.matchLevel] - order[b.matchLevel];
      });
  }, [completed, answers]);

  const handleChoiceSelect = useCallback(
    (choiceId: string) => {
      setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
      if (isLastQuestion) {
        setCompleted(true);
      } else {
        setCurrentQ((q) => q + 1);
        setFadeKey((k) => k + 1);
      }
    },
    [question, isLastQuestion]
  );

  const handleTextSubmit = useCallback(() => {
    const val = textInputs[question.id] || "";
    setAnswers((prev) => ({ ...prev, [question.id]: val }));
    if (isLastQuestion) {
      setCompleted(true);
    } else {
      setCurrentQ((q) => q + 1);
      setFadeKey((k) => k + 1);
    }
  }, [question, isLastQuestion, textInputs]);

  const handleSkip = useCallback(() => {
    if (isLastQuestion) {
      setCompleted(true);
    } else {
      setCurrentQ((q) => q + 1);
      setFadeKey((k) => k + 1);
    }
  }, [isLastQuestion]);

  const handleReset = useCallback(() => {
    setCurrentQ(0);
    setAnswers({});
    setTextInputs({});
    setCompleted(false);
    setFadeKey((k) => k + 1);
  }, []);

  return (
    <DemoLayout
      serviceName="福祉制度ナビゲーター"
      serviceSlug="welfare-navigator"
      serviceIcon={<Shield className="size-5 text-primary-foreground" />}
      subtitle="制度マッチングデモ"
    >
      {/* メインコンテンツ */}
      <div>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* 左カラム: 質問フロー */}
            <div className="w-full lg:w-2/5">
              <Card className="md:sticky md:top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <HelpCircle className="size-5 text-primary" />
                    質問フロー
                  </CardTitle>
                  {!completed && (
                    <div className="mt-2">
                      <ProgressBar
                        current={currentQ + 1}
                        total={questions.length}
                      />
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  {!completed ? (
                    <div
                      key={fadeKey}
                      className="animate-page-enter space-y-4"
                    >
                      <div>
                        <h3 className="text-lg font-bold">
                          {question.text}
                        </h3>
                        {question.subtext && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {question.subtext}
                          </p>
                        )}
                      </div>

                      {/* 選択肢ボタン */}
                      {question.choices.length > 0 && (
                        <div className="space-y-2">
                          {question.choices.map((c) => (
                            <Button
                              key={c.id}
                              variant={
                                answers[question.id] === c.id
                                  ? "default"
                                  : "outline"
                              }
                              className="w-full justify-start text-left"
                              onClick={() => handleChoiceSelect(c.id)}
                            >
                              {c.label}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* テキスト入力 */}
                      {question.inputType === "text" && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder={question.inputPlaceholder}
                            aria-label={question.inputPlaceholder}
                            value={textInputs[question.id] || ""}
                            onChange={(e) =>
                              setTextInputs((prev) => ({
                                ...prev,
                                [question.id]: e.target.value,
                              }))
                            }
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-[3px] focus:ring-primary/20"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleTextSubmit}
                              disabled={!textInputs[question.id]}
                              className="flex-1"
                            >
                              回答する
                              <ArrowRight className="ml-1 size-4" />
                            </Button>
                            {question.optional && (
                              <Button
                                variant="ghost"
                                onClick={handleSkip}
                              >
                                スキップ
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* テキストエリア */}
                      {question.inputType === "textarea" && (
                        <div className="space-y-3">
                          <textarea
                            placeholder={question.inputPlaceholder}
                            aria-label={question.inputPlaceholder}
                            value={textInputs[question.id] || ""}
                            onChange={(e) =>
                              setTextInputs((prev) => ({
                                ...prev,
                                [question.id]: e.target.value,
                              }))
                            }
                            rows={4}
                            className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-[3px] focus:ring-primary/20"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleTextSubmit}
                              className="flex-1"
                            >
                              回答する
                              <ArrowRight className="ml-1 size-4" />
                            </Button>
                            {question.optional && (
                              <Button
                                variant="ghost"
                                onClick={handleSkip}
                              >
                                スキップ
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-success">
                        <span className="bg-success/10 rounded-full p-1.5">
                          <CheckCircle2 className="size-5" />
                        </span>
                        <span className="font-semibold">
                          すべての質問に回答しました
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        右側に該当する可能性のある制度が表示されています。
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="w-full"
                      >
                        <RotateCcw className="mr-1 size-4" />
                        最初からやり直す
                      </Button>
                    </div>
                  )}

                  {/* 緊急ワード検知 */}
                  {hasEmergency && (
                    <div className="mt-4">
                      <EmergencyBanner />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 右カラム: マッチング結果 */}
            <div className="w-full lg:w-3/5">
              {!completed ? (
                <Card className="flex min-h-[300px] items-center justify-center md:min-h-[400px]">
                  <CardContent className="text-center">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                      <HelpCircle className="size-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-lg font-semibold text-muted-foreground">
                      質問にお答えいただくと、
                      <br />
                      該当する制度が表示されます
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      左側の質問フローに沿ってお答えください
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <Card className="border-success/30">
                    <CardHeader className="bg-success/5 rounded-t-xl">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <span className="bg-success/10 rounded-full p-1.5">
                            <CheckCircle2 className="size-5 text-success" />
                          </span>
                          該当する可能性のある制度
                        </CardTitle>
                        <Badge variant="outline">
                          {matchedPrograms.length}件
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* 緊急バナー（結果側にも表示） */}
                  {hasEmergency && <EmergencyBanner />}

                  {/* 制度カード */}
                  <div className="space-y-4">
                    {matchedPrograms.map((program) => {
                      const match = matchLevelConfig[program.matchLevel];
                      return (
                        <Card key={program.id} className="transition-[box-shadow,transform] duration-300 hover:shadow-lg hover:-translate-y-0.5">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-base">
                                {program.name}
                              </CardTitle>
                              <Badge className={match.className}>
                                マッチ度: {match.label}
                              </Badge>
                            </div>
                            <CardDescription className="mt-1">
                              {program.summary}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="rounded-lg bg-muted p-3 space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium text-primary">
                                  支給額目安:
                                </span>
                                <span>{program.amount}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="size-3.5 text-muted-foreground" />
                                <span className="font-medium">
                                  申請窓口:
                                </span>
                                <span>{program.office}</span>
                              </div>
                            </div>
                            <div>
                              <p className="mb-1 text-xs font-medium text-muted-foreground">
                                主な要件:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {program.conditions.map((cond) => (
                                  <Badge
                                    key={cond}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {cond}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              詳しく見る
                              <ArrowRight className="ml-1 size-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* 窓口案内 */}
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <MapPin className="size-4 text-primary" />
                        最寄りの福祉事務所
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="font-semibold">
                        {textInputs["area"]
                          ? `${textInputs["area"]} 福祉事務所`
                          : "お住まいの地域の福祉事務所"}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="size-3.5" />
                        <span>045-000-0000（代表）</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-3.5" />
                        <span>
                          受付時間: 月〜金 8:30〜17:15（祝日・年末年始除く）
                        </span>
                      </div>
                      <Button variant="cta" size="sm" className="mt-2">
                        窓口に相談する
                        <ArrowRight className="ml-1 size-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* 免責事項 */}
          <div className="mt-10 rounded-lg border bg-card p-4 text-center text-sm text-muted-foreground">
            <p>
              ※
              このデモは参考情報の提供を目的としています。実際の受給資格や支給額は個別の状況により異なります。
            </p>
            <p className="mt-1">
              正確な情報については、お住まいの市区町村の福祉窓口にてご確認ください。
            </p>
          </div>
        </div>
    </DemoLayout>
  );
}

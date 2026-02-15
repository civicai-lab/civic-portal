"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CountUp } from "@/components/ui/count-up";
import {
  Rocket,
  Users,
  Cloud,
  Target,
  Wallet,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { StepIndicator } from "@/components/demo/step-indicator";

// --- 型定義 ---

interface DiagnosisAnswers {
  population: number;
  itEnv: number;
  purposes: string[];
  budget: number;
  team: number;
}

interface RecommendedService {
  name: string;
  description: string;
  fit: number;
}

// --- 定数 ---

const STEPS = [
  { label: "自治体規模" },
  { label: "IT環境" },
  { label: "導入目的" },
  { label: "予算規模" },
  { label: "推進体制" },
];

const POPULATION_OPTIONS = [
  { label: "~5万人", value: 1 },
  { label: "5~10万人", value: 2 },
  { label: "10~30万人", value: 3 },
  { label: "30万人~", value: 4 },
];

const IT_ENV_OPTIONS = [
  { label: "紙中心", value: 1 },
  { label: "一部電子化", value: 2 },
  { label: "クラウド導入済", value: 3 },
  { label: "フルクラウド", value: 4 },
];

const PURPOSE_OPTIONS = [
  { label: "住民サービス向上", value: "resident" },
  { label: "業務効率化", value: "efficiency" },
  { label: "データ分析", value: "analytics" },
  { label: "意思決定支援", value: "decision" },
];

const BUDGET_OPTIONS = [
  { label: "~100万円", value: 1 },
  { label: "100~500万円", value: 2 },
  { label: "500~1,000万円", value: 3 },
  { label: "1,000万円~", value: 4 },
];

const TEAM_OPTIONS = [
  { label: "専任チームあり", value: 4 },
  { label: "兼任担当", value: 3 },
  { label: "外部委託中心", value: 2 },
  { label: "未定", value: 1 },
];

const SCORE_LABELS = ["自治体規模", "IT環境", "導入目的", "予算規模", "推進体制"];

// --- スコア計算 ---

function calculateScores(answers: DiagnosisAnswers): number[] {
  const popScore = answers.population * 25;
  const itScore = answers.itEnv * 25;
  const purposeScore = Math.min(answers.purposes.length * 25, 100);
  const budgetScore = answers.budget * 25;
  const teamScore = answers.team * 25;
  return [popScore, itScore, purposeScore, budgetScore, teamScore];
}

function getTotalScore(scores: number[]): number {
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function getLevel(score: number): { label: string; className: string } {
  if (score >= 80) return { label: "最適化", className: "bg-green-100 text-green-800" };
  if (score >= 60) return { label: "成熟", className: "bg-blue-100 text-blue-800" };
  if (score >= 40) return { label: "成長", className: "bg-amber-100 text-amber-800" };
  return { label: "初期", className: "bg-red-100 text-red-800" };
}

function getRecommendations(answers: DiagnosisAnswers): RecommendedService[] {
  const services: RecommendedService[] = [];

  if (answers.purposes.includes("resident")) {
    services.push({
      name: "住民問い合わせAI",
      description: "住民からのよくある質問に24時間自動応答。窓口業務の負荷を大幅に軽減します。",
      fit: 75 + answers.itEnv * 5,
    });
  }
  if (answers.purposes.includes("efficiency")) {
    services.push({
      name: "議事録要約AI",
      description: "会議音声から自動で議事録を生成。要点抽出とアクション項目の自動整理が可能です。",
      fit: 70 + answers.budget * 5,
    });
  }
  if (answers.purposes.includes("analytics")) {
    services.push({
      name: "パブコメ分析AI",
      description: "パブリックコメントを自動分類・感情分析。住民の声を効率的にレポート化します。",
      fit: 65 + answers.team * 5,
    });
  }
  if (answers.purposes.includes("decision")) {
    services.push({
      name: "AI利用ガイドライン策定支援",
      description: "他自治体のガイドラインと比較分析し、自団体に最適なガイドラインのドラフトを生成します。",
      fit: 60 + answers.population * 5,
    });
  }

  // 最低3件は返す
  if (services.length < 3) {
    const defaults: RecommendedService[] = [
      { name: "庁内ナレッジ検索AI", description: "庁内文書を横断検索。規程やマニュアルを即座に見つけられます。", fit: 70 },
      { name: "防災AIガイド", description: "災害時の問い合わせに自動応答。避難所情報や安否確認を支援します。", fit: 65 },
      { name: "施設予約コンシェルジュ", description: "公共施設の空き状況確認から予約までをAIがサポートします。", fit: 60 },
    ];
    for (const d of defaults) {
      if (services.length >= 3) break;
      if (!services.find((s) => s.name === d.name)) {
        services.push(d);
      }
    }
  }

  return services.slice(0, 3).sort((a, b) => b.fit - a.fit);
}

// --- メインコンポーネント ---

export default function AiStarterPackDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<DiagnosisAnswers>({
    population: 0,
    itEnv: 0,
    purposes: [],
    budget: 0,
    team: 0,
  });

  const handleNext = useCallback(() => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setShowResult(false);
    setAnswers({ population: 0, itEnv: 0, purposes: [], budget: 0, team: 0 });
  }, []);

  const togglePurpose = useCallback((value: string) => {
    setAnswers((prev) => ({
      ...prev,
      purposes: prev.purposes.includes(value)
        ? prev.purposes.filter((p) => p !== value)
        : [...prev.purposes, value],
    }));
  }, []);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return answers.population > 0;
      case 1: return answers.itEnv > 0;
      case 2: return answers.purposes.length > 0;
      case 3: return answers.budget > 0;
      case 4: return answers.team > 0;
      default: return false;
    }
  };

  const scores = calculateScores(answers);
  const totalScore = getTotalScore(scores);
  const level = getLevel(totalScore);
  const recommendations = getRecommendations(answers);

  // --- 結果画面 ---
  if (showResult) {
    return (
      <DemoLayout
        serviceName="AI導入スターターパック"
        serviceIcon={<Rocket className="size-5 text-primary-foreground" />}
        subtitle="AI導入診断デモ"
      >
        <div className="space-y-6">
          {/* 総合スコア */}
          <Card className="py-6">
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-2">AI導入準備度スコア</p>
              <div className="text-5xl font-bold text-primary">
                <CountUp end={totalScore} suffix="点" />
              </div>
              <Badge className={`mt-3 text-sm px-3 py-1 ${level.className}`}>
                {level.label}フェーズ
              </Badge>
            </CardContent>
          </Card>

          {/* 5項目の棒グラフ */}
          <Card className="py-6">
            <CardHeader className="pt-0">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="size-5 text-primary" />
                項目別スコア
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SCORE_LABELS.map((label, idx) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{label}</span>
                      <span className="text-sm font-medium text-foreground">{scores[idx]}%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          scores[idx] >= 75
                            ? "bg-green-500"
                            : scores[idx] >= 50
                            ? "bg-blue-500"
                            : scores[idx] >= 25
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${scores[idx]}%` }}
                        role="progressbar"
                        aria-valuenow={scores[idx]}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${label}: ${scores[idx]}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 推奨サービス */}
          <Card className="py-6">
            <CardHeader className="pt-0">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                推奨サービス
              </CardTitle>
              <CardDescription>
                診断結果に基づくおすすめのAIサービスです
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((service, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-foreground">{service.name}</h3>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              service.fit >= 85
                                ? "bg-green-100 text-green-800"
                                : service.fit >= 70
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            適合度 {service.fit}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.description}
                        </p>
                      </div>
                      <TrendingUp className="size-5 text-primary shrink-0 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* もう一度診断ボタン */}
          <div className="text-center">
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="size-4" />
              もう一度診断する
            </Button>
          </div>
        </div>
      </DemoLayout>
    );
  }

  // --- 診断フォーム ---
  return (
    <DemoLayout
      serviceName="AI導入スターターパック"
      serviceIcon={<Rocket className="size-5 text-primary-foreground" />}
      subtitle="AI導入診断デモ"
    >
      <div className="space-y-6">
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <Card className="py-6">
          <CardContent>
            {/* Step 1: 自治体規模 */}
            {currentStep === 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">自治体の人口規模は？</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {POPULATION_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, population: opt.value }))}
                      className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
                        answers.population === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      aria-pressed={answers.population === opt.value}
                    >
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: IT環境 */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Cloud className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">現在のIT環境は？</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {IT_ENV_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, itEnv: opt.value }))}
                      className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
                        answers.itEnv === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      aria-pressed={answers.itEnv === opt.value}
                    >
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: 導入目的 */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">AI導入の目的は？（複数選択可）</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PURPOSE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => togglePurpose(opt.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
                        answers.purposes.includes(opt.value)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      aria-pressed={answers.purposes.includes(opt.value)}
                    >
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
                {answers.purposes.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {answers.purposes.length}件選択中
                  </p>
                )}
              </div>
            )}

            {/* Step 4: 予算規模 */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">想定予算規模は？</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, budget: opt.value }))}
                      className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
                        answers.budget === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      aria-pressed={answers.budget === opt.value}
                    >
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: 推進体制 */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">AI推進体制は？</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TEAM_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, team: opt.value }))}
                      className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
                        answers.team === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      aria-pressed={answers.team === opt.value}
                    >
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ナビゲーションボタン */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="size-4" />
            戻る
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} / {STEPS.length}
          </span>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 4 ? "診断結果を見る" : "次へ"}
            {currentStep < 4 && <ChevronRight className="size-4" />}
          </Button>
        </div>
      </div>
    </DemoLayout>
  );
}

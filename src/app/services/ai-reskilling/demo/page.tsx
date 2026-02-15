"use client";

import { useState, useCallback } from "react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { StepIndicator } from "@/components/demo/step-indicator";
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
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Briefcase,
  Clock,
  BarChart3,
  BookOpen,
  Target,
  Calendar,
  CheckCircle2,
} from "lucide-react";

// ---- データ ----

const POSITIONS = ["管理職", "一般職", "技術職", "専門職"];
const EXPERIENCE_LEVELS = ["~3年", "3-10年", "10-20年", "20年~"];

const SKILLS = [
  { id: "data", label: "データリテラシー" },
  { id: "ai", label: "AI基礎知識" },
  { id: "programming", label: "プログラミング" },
  { id: "process", label: "業務プロセス改善" },
  { id: "pm", label: "プロジェクト管理" },
];

const RECOMMENDED_LEVELS: Record<string, Record<string, number>> = {
  管理職: { data: 4, ai: 3, programming: 2, process: 5, pm: 5 },
  一般職: { data: 3, ai: 2, programming: 1, process: 3, pm: 2 },
  技術職: { data: 4, ai: 4, programming: 5, process: 3, pm: 3 },
  専門職: { data: 5, ai: 3, programming: 3, process: 4, pm: 3 },
};

const PROGRAMS = [
  { id: "1", title: "AI基礎リテラシー研修", duration: "2日間", level: "入門", price: "5万円", desc: "AIの基本概念から自治体での活用事例まで" },
  { id: "2", title: "データ分析実践講座", duration: "3日間", level: "中級", price: "8万円", desc: "Pythonを使ったデータ分析の基礎と実践" },
  { id: "3", title: "AI活用プロジェクトマネジメント", duration: "2日間", level: "上級", price: "10万円", desc: "AI導入プロジェクトの企画・実行・評価" },
  { id: "4", title: "プロンプトエンジニアリング入門", duration: "1日間", level: "入門", price: "3万円", desc: "生成AIを効果的に活用するプロンプト設計" },
  { id: "5", title: "行政DX推進リーダー育成", duration: "5日間", level: "上級", price: "15万円", desc: "組織全体のDX推進を担うリーダーの育成" },
];

const LEVEL_COLORS: Record<string, string> = {
  入門: "bg-emerald-100 text-emerald-800",
  中級: "bg-blue-100 text-blue-800",
  上級: "bg-purple-100 text-purple-800",
};

const MILESTONES = [
  { period: "3ヶ月", title: "基礎習得フェーズ", items: ["AI基礎リテラシー研修の受講完了", "データ分析ツールの基本操作習得", "自部署の業務課題の洗い出し"] },
  { period: "6ヶ月", title: "実践フェーズ", items: ["AI活用PoC（概念実証）の実施", "データに基づく業務改善提案の作成", "中間スキルアセスメントの実施"] },
  { period: "12ヶ月", title: "展開フェーズ", items: ["AI活用プロジェクトの本格稼働", "部署内でのナレッジ共有・指導", "最終スキルアセスメントと次年度計画策定"] },
];

// ---- ステップ定義 ----

const STEPS = [
  { label: "基本情報" },
  { label: "スキル評価" },
  { label: "結果" },
];

// ---- メインコンポーネント ----

export default function AiReskillingDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  // Step 1
  const [position, setPosition] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);

  // Step 2
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({
    data: 0,
    ai: 0,
    programming: 0,
    process: 0,
    pm: 0,
  });

  const setRating = useCallback((skillId: string, rating: number) => {
    setSkillRatings((prev) => ({ ...prev, [skillId]: rating }));
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, 2));
    setFadeKey((k) => k + 1);
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    setFadeKey((k) => k + 1);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setFadeKey((k) => k + 1);
    setPosition(null);
    setExperience(null);
    setSkillRatings({ data: 0, ai: 0, programming: 0, process: 0, pm: 0 });
  }, []);

  const canNext = () => {
    if (currentStep === 0) return position !== null && experience !== null;
    if (currentStep === 1) return Object.values(skillRatings).every((v) => v > 0);
    return false;
  };

  const recommendedLevels = RECOMMENDED_LEVELS[position || "一般職"];

  // スキルギャップに基づいて推奨研修を選択
  const getRecommendedPrograms = () => {
    const gaps = SKILLS.map((skill) => ({
      id: skill.id,
      gap: recommendedLevels[skill.id] - skillRatings[skill.id],
    })).filter((g) => g.gap > 0);

    // ギャップが大きいスキル領域に対応する研修を選ぶ
    const recommended = PROGRAMS.slice(0, 3);
    return recommended;
  };

  return (
    <DemoLayout
      serviceName="AI研修・リスキリング支援"
      serviceIcon={<GraduationCap className="size-5 text-primary-foreground" />}
      subtitle="スキル診断デモ"
    >
      {/* ステップインジケーター */}
      <div className="bg-card rounded-lg py-6 px-4 mb-6 border">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </div>

      {/* コンテンツ */}
      <div key={fadeKey} className="animate-page-enter">
        {/* Step 1: 基本情報 */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">基本情報を入力</h2>

            <Card>
              <CardContent className="space-y-6">
                {/* 役職 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <Briefcase className="size-4 text-primary" />
                    役職 <span className="text-destructive">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {POSITIONS.map((pos) => (
                      <Button
                        key={pos}
                        variant={position === pos ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPosition(pos)}
                      >
                        {pos}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 経験年数 */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <Clock className="size-4 text-primary" />
                    経験年数 <span className="text-destructive">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EXPERIENCE_LEVELS.map((exp) => (
                      <Button
                        key={exp}
                        variant={experience === exp ? "default" : "outline"}
                        size="sm"
                        onClick={() => setExperience(exp)}
                      >
                        {exp}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: スキル自己評価 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">スキル自己評価</h2>
            <p className="text-sm text-muted-foreground">
              各スキルについて、現在のレベルを5段階で評価してください
            </p>

            <Card>
              <CardContent className="space-y-6">
                {SKILLS.map((skill) => (
                  <div key={skill.id}>
                    <label className="block text-sm font-semibold mb-3">
                      {skill.label}
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <label
                          key={rating}
                          className="flex items-center gap-1.5 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={skill.id}
                            value={rating}
                            checked={skillRatings[skill.id] === rating}
                            onChange={() => setRating(skill.id, rating)}
                            className="accent-primary size-4"
                          />
                          <span className="text-sm">{rating}</span>
                        </label>
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        {skillRatings[skill.id] === 0
                          ? "未選択"
                          : skillRatings[skill.id] <= 2
                            ? "初級"
                            : skillRatings[skill.id] <= 3
                              ? "中級"
                              : "上級"}
                      </span>
                    </div>
                    {skill.id !== SKILLS[SKILLS.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: 結果 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">診断結果</h2>

            {/* スキルマップ */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="size-5 text-primary" />
                  スキルマップ
                </CardTitle>
                <CardDescription>
                  自己評価 vs {position || "一般職"}の推奨レベル
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {SKILLS.map((skill) => {
                    const selfRating = skillRatings[skill.id];
                    const recommended = recommendedLevels[skill.id];
                    const gap = recommended - selfRating;
                    return (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium">{skill.label}</span>
                          <span className="text-xs text-muted-foreground">
                            自己: {selfRating} / 推奨: {recommended}
                            {gap > 0 && (
                              <Badge className="ml-2 bg-amber-100 text-amber-800 text-xs">
                                GAP: -{gap}
                              </Badge>
                            )}
                          </span>
                        </div>
                        {/* 自己評価バー */}
                        <div className="relative h-6 w-full rounded-md bg-muted overflow-hidden mb-1">
                          <div
                            className="absolute top-0 left-0 h-full bg-primary/70 rounded-md transition-all duration-700"
                            style={{ width: `${(selfRating / 5) * 100}%` }}
                          />
                          {/* 推奨レベルマーカー */}
                          <div
                            className="absolute top-0 h-full border-r-2 border-dashed border-destructive"
                            style={{ left: `${(recommended / 5) * 100}%` }}
                          />
                          <div className="absolute inset-0 flex items-center px-2">
                            <span className="text-xs text-primary-foreground font-medium z-10">
                              {selfRating}/5
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <div className="size-2 rounded-full bg-primary/70" />
                            自己評価
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-4 border-t-2 border-dashed border-destructive" />
                            推奨レベル
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 推奨研修プログラム */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5 text-primary" />
                  推奨研修プログラム
                </CardTitle>
                <CardDescription>
                  スキルギャップに基づくおすすめの研修
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getRecommendedPrograms().map((program) => (
                    <Card key={program.id} className="bg-muted/30">
                      <CardContent>
                        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                          <h4 className="font-semibold text-sm">{program.title}</h4>
                          <Badge className={LEVEL_COLORS[program.level]}>{program.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{program.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {program.duration}
                          </span>
                          <span className="font-medium text-primary">{program.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* フォローアップスケジュール */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-primary" />
                  フォローアップスケジュール
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {MILESTONES.map((milestone, i) => (
                    <div key={milestone.period} className="relative">
                      <div className="flex items-start gap-4">
                        {/* タイムラインドット */}
                        <div className="flex flex-col items-center">
                          <div className="size-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                            <Calendar className="size-5 text-primary-foreground" />
                          </div>
                          {i < MILESTONES.length - 1 && (
                            <div className="w-0.5 h-full bg-primary/20 mt-2 min-h-[60px]" />
                          )}
                        </div>
                        {/* コンテンツ */}
                        <div className="pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{milestone.period}</Badge>
                            <span className="font-semibold text-sm">{milestone.title}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {milestone.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* もう一度診断ボタン */}
            <div className="flex justify-center">
              <Button variant="outline" onClick={reset} className="gap-2">
                <RotateCcw className="size-4" />
                もう一度診断する
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ナビゲーション（結果ページ以外） */}
      {currentStep < 2 && (
        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={goBack} disabled={currentStep === 0}>
            <ArrowLeft className="size-4" />
            戻る
          </Button>
          <Button variant="default" onClick={goNext} disabled={!canNext()}>
            次へ
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </DemoLayout>
  );
}

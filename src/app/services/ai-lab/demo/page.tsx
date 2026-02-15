"use client";

import { useState, useCallback } from "react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CountUp } from "@/components/ui/count-up";
import { Progress } from "@/components/ui/progress";
import {
  Lightbulb,
  CalendarDays,
  Folder,
  ClipboardCheck,
  MapPin,
  Users,
  Star,
  Send,
  Filter,
  CheckCircle2,
} from "lucide-react";

// ---- データ ----

type EventStatus = "募集中" | "開催中" | "終了";
type EventCategory = "ハッカソン" | "セミナー" | "ワークショップ" | "デモデイ";

interface LabEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  participants: number;
  status: EventStatus;
  category: EventCategory;
}

const EVENTS: LabEvent[] = [
  { id: "1", title: "第3回 自治体AIハッカソン", date: "2024-07-15", location: "市民ホール", participants: 48, status: "終了", category: "ハッカソン" },
  { id: "2", title: "AI倫理セミナー", date: "2024-09-20", location: "オンライン", participants: 120, status: "終了", category: "セミナー" },
  { id: "3", title: "LLM活用ワークショップ", date: "2025-01-18", location: "イノベーションセンター", participants: 35, status: "募集中", category: "ワークショップ" },
  { id: "4", title: "AIスタートアップ デモデイ", date: "2025-02-28", location: "市民ホール", participants: 200, status: "募集中", category: "デモデイ" },
];

interface Project {
  id: string;
  name: string;
  team: string;
  progress: number;
  milestone: string;
  desc: string;
}

const PROJECTS: Project[] = [
  { id: "1", name: "ゴミ収集最適化AI", team: "エコテック", progress: 75, milestone: "実証実験開始", desc: "AIでゴミ収集ルートを最適化し、CO2排出を削減" },
  { id: "2", name: "道路損傷自動検出", team: "インフラAI", progress: 45, milestone: "プロトタイプ完成", desc: "ドラレコ映像からポットホールを自動検出" },
  { id: "3", name: "多言語行政窓口AI", team: "グローバルシティ", progress: 90, milestone: "本番デプロイ", desc: "10言語対応の窓口AIアシスタント" },
  { id: "4", name: "地域経済予測ダッシュボード", team: "データサイエンスラボ", progress: 30, milestone: "データ収集完了", desc: "オープンデータを活用した地域経済の可視化と予測" },
];

const STATUS_COLORS: Record<EventStatus, string> = {
  "募集中": "bg-emerald-100 text-emerald-800",
  "開催中": "bg-blue-100 text-blue-800",
  "終了": "bg-gray-100 text-gray-600",
};

const CATEGORIES: EventCategory[] = ["ハッカソン", "セミナー", "ワークショップ", "デモデイ"];

const CATEGORY_COLORS: Record<EventCategory, string> = {
  "ハッカソン": "bg-orange-100 text-orange-800",
  "セミナー": "bg-blue-100 text-blue-800",
  "ワークショップ": "bg-purple-100 text-purple-800",
  "デモデイ": "bg-emerald-100 text-emerald-800",
};

const EVALUATION_CRITERIA = [
  { id: "novelty", label: "新規性" },
  { id: "feasibility", label: "実現可能性" },
  { id: "impact", label: "社会的インパクト" },
  { id: "tech", label: "技術力" },
  { id: "presentation", label: "プレゼン力" },
];

const getGrade = (score: number): { grade: string; color: string } => {
  if (score >= 22) return { grade: "A", color: "bg-emerald-100 text-emerald-800" };
  if (score >= 17) return { grade: "B", color: "bg-blue-100 text-blue-800" };
  if (score >= 12) return { grade: "C", color: "bg-amber-100 text-amber-800" };
  return { grade: "D", color: "bg-red-100 text-red-800" };
};

// ---- メインコンポーネント ----

export default function AiLabDemoPage() {
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | "all">("all");
  const [ratings, setRatings] = useState<Record<string, number>>({
    novelty: 0,
    feasibility: 0,
    impact: 0,
    tech: 0,
    presentation: 0,
  });
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const setRating = useCallback((criterionId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [criterionId]: value }));
  }, []);

  const totalScore = Object.values(ratings).reduce((sum, v) => sum + v, 0);
  const allRated = Object.values(ratings).every((v) => v > 0);
  const gradeInfo = getGrade(totalScore);

  const filteredEvents =
    categoryFilter === "all"
      ? EVENTS
      : EVENTS.filter((e) => e.category === categoryFilter);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetEvaluation = () => {
    setRatings({ novelty: 0, feasibility: 0, impact: 0, tech: 0, presentation: 0 });
    setComment("");
    setSubmitted(false);
  };

  return (
    <DemoLayout
      serviceName="官民共創AIラボ"
      serviceIcon={<Lightbulb className="size-5 text-primary-foreground" />}
      subtitle="共創ラボデモ"
    >
      {/* タブ */}
      <Tabs defaultValue="events">
        <TabsList className="w-full flex-wrap h-auto">
          <TabsTrigger value="events" className="gap-1.5">
            <CalendarDays className="size-4" />
            <span className="hidden sm:inline">イベント一覧</span>
            <span className="sm:hidden">イベント</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-1.5">
            <Folder className="size-4" />
            プロジェクト
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="gap-1.5">
            <ClipboardCheck className="size-4" />
            審査
          </TabsTrigger>
        </TabsList>

        {/* イベントタブ */}
        <TabsContent value="events" className="mt-6">
          {/* カテゴリフィルタ */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Filter className="size-4 text-muted-foreground" />
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="xs"
              onClick={() => setCategoryFilter("all")}
            >
              すべて
            </Button>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                size="xs"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* イベントカード */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Card key={event.id}>
                <CardContent>
                  <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="size-3.5" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Badge className={CATEGORY_COLORS[event.category]}>
                        {event.category}
                      </Badge>
                      <Badge className={STATUS_COLORS[event.status]}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">参加者:</span>
                    <span className="text-sm font-medium">
                      <CountUp end={event.participants} />名
                    </span>
                  </div>
                  {event.status === "募集中" && (
                    <div className="mt-3">
                      <Button variant="cta" size="sm">
                        参加申込
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* プロジェクトタブ */}
        <TabsContent value="projects" className="mt-6">
          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <Card key={project.id}>
                <CardContent>
                  <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <Badge variant="secondary">{project.team}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{project.desc}</p>

                  {/* 進捗バー */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">進捗</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>

                  {/* 次のマイルストーン */}
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span className="text-muted-foreground">次のマイルストーン:</span>
                    <Badge variant="outline">{project.milestone}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 審査タブ */}
        <TabsContent value="evaluation" className="mt-6">
          {submitted ? (
            <Card className="text-center">
              <CardContent className="py-12">
                <CheckCircle2 className="size-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">審査を送信しました</h3>
                <p className="text-muted-foreground mb-4">
                  合計スコア: {totalScore}/25 | 判定:{" "}
                  <Badge className={gradeInfo.color}>{gradeInfo.grade}</Badge>
                </p>
                <Button variant="outline" onClick={resetEvaluation}>
                  別のプロジェクトを審査する
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>プロジェクト審査シート</CardTitle>
                <CardDescription>
                  各評価項目を5段階で評価してください
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {EVALUATION_CRITERIA.map((criterion) => (
                  <div key={criterion.id}>
                    <label className="block text-sm font-semibold mb-2">
                      {criterion.label}
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(criterion.id, value)}
                          className={`p-1 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            value <= ratings[criterion.id]
                              ? "text-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                          aria-label={`${criterion.label}: ${value}点`}
                        >
                          <Star
                            className="size-7"
                            fill={value <= ratings[criterion.id] ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {ratings[criterion.id] > 0
                          ? `${ratings[criterion.id]}/5`
                          : "未評価"}
                      </span>
                    </div>
                    {criterion.id !== EVALUATION_CRITERIA[EVALUATION_CRITERIA.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}

                <Separator />

                {/* コメント */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    コメント（任意）
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="プロジェクトへのフィードバックを入力してください..."
                    rows={4}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>

                <Separator />

                {/* 合計スコア */}
                <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                  <div>
                    <span className="text-sm text-muted-foreground">合計スコア</span>
                    <div className="text-2xl font-bold text-primary">
                      {totalScore} <span className="text-base font-normal text-muted-foreground">/ 25</span>
                    </div>
                  </div>
                  {allRated && (
                    <Badge className={`${gradeInfo.color} text-lg px-4 py-1`}>
                      判定: {gradeInfo.grade}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                  disabled={!allRated}
                  onClick={handleSubmit}
                >
                  <Send className="size-4" />
                  送信
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DemoLayout>
  );
}

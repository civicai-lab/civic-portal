"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CountUp } from "@/components/ui/count-up";
import { DemoLayout } from "@/components/demo/demo-layout";
import {
  BookOpen,
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Trash2,
  Plus,
  Check,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Calendar,
  Building2,
  Star,
  Filter,
} from "lucide-react";

// --- データ定義 ---

const ndcData = [
  { code: "0", name: "総記", pct: 3.2, status: "適正" as const },
  { code: "1", name: "哲学", pct: 4.1, status: "適正" as const },
  { code: "2", name: "歴史", pct: 8.5, status: "適正" as const },
  { code: "3", name: "社会科学", pct: 15.3, status: "不足" as const },
  { code: "4", name: "自然科学", pct: 9.8, status: "不足" as const },
  { code: "5", name: "技術", pct: 12.1, status: "過多" as const },
  { code: "6", name: "産業", pct: 5.4, status: "適正" as const },
  { code: "7", name: "芸術", pct: 11.2, status: "適正" as const },
  { code: "8", name: "言語", pct: 6.7, status: "過多" as const },
  { code: "9", name: "文学", pct: 23.7, status: "過多" as const },
];

const maxNdcPct = Math.max(...ndcData.map((d) => d.pct));

const gapData = [
  {
    ndc: "0:総記",
    stock: 3.2,
    lending: 2.8,
    gap: -0.4,
    evaluation: "適正" as const,
  },
  {
    ndc: "1:哲学",
    stock: 4.1,
    lending: 3.5,
    gap: -0.6,
    evaluation: "適正" as const,
  },
  {
    ndc: "2:歴史",
    stock: 8.5,
    lending: 7.9,
    gap: -0.6,
    evaluation: "適正" as const,
  },
  {
    ndc: "3:社会科学",
    stock: 15.3,
    lending: 22.1,
    gap: 6.8,
    evaluation: "不足" as const,
  },
  {
    ndc: "4:自然科学",
    stock: 9.8,
    lending: 14.2,
    gap: 4.4,
    evaluation: "不足" as const,
  },
  {
    ndc: "5:技術",
    stock: 12.1,
    lending: 8.3,
    gap: -3.8,
    evaluation: "過多" as const,
  },
  {
    ndc: "6:産業",
    stock: 5.4,
    lending: 4.8,
    gap: -0.6,
    evaluation: "適正" as const,
  },
  {
    ndc: "7:芸術",
    stock: 11.2,
    lending: 12.5,
    gap: 1.3,
    evaluation: "適正" as const,
  },
  {
    ndc: "8:言語",
    stock: 6.7,
    lending: 3.2,
    gap: -3.5,
    evaluation: "過多" as const,
  },
  {
    ndc: "9:文学",
    stock: 23.7,
    lending: 20.7,
    gap: -3.0,
    evaluation: "過多" as const,
  },
];

const recommendedBooks = [
  {
    title: "データで読み解く地方自治の未来",
    author: "佐藤 健太郎",
    ndc: "3:社会科学",
    reason: "社会科学分野の蔵書不足を補完。地方行政に関心の高い利用者層向け。",
    score: 95,
  },
  {
    title: "やさしい統計学入門",
    author: "田中 美咲",
    ndc: "4:自然科学",
    reason: "自然科学分野の需要増に対応。データリテラシー教育に最適。",
    score: 92,
  },
  {
    title: "気候変動と生態系",
    author: "鈴木 一郎",
    ndc: "4:自然科学",
    reason: "環境問題への関心増加に対応。新着予約率の高いテーマ。",
    score: 90,
  },
  {
    title: "現代社会福祉論 第5版",
    author: "山田 花子",
    ndc: "3:社会科学",
    reason: "福祉関連の貸出が前年比20%増。最新版への更新が必要。",
    score: 88,
  },
  {
    title: "ビジネス法務の基礎",
    author: "高橋 誠",
    ndc: "3:社会科学",
    reason: "法律分野の蔵書充実のため。起業支援コーナーとの連携。",
    score: 86,
  },
  {
    title: "宇宙の不思議 最新版",
    author: "中村 晃",
    ndc: "4:自然科学",
    reason: "子ども向け科学書。児童向け自然科学の蔵書比率改善。",
    score: 85,
  },
  {
    title: "プログラミング思考入門",
    author: "吉田 健一",
    ndc: "3:社会科学",
    reason: "GIGAスクール関連の需要急増。教育分野の充実。",
    score: 84,
  },
  {
    title: "暮らしの経済学",
    author: "小林 優子",
    ndc: "3:社会科学",
    reason: "家計・金融リテラシーのニーズ増。予約待ち状態の類似書あり。",
    score: 82,
  },
  {
    title: "医療と介護の最前線",
    author: "渡辺 真理",
    ndc: "4:自然科学",
    reason: "高齢化対応。医療・健康分野の利用者からのリクエスト多数。",
    score: 80,
  },
  {
    title: "子どもの権利と教育",
    author: "伊藤 さくら",
    ndc: "3:社会科学",
    reason: "子どもの権利条約関連。児童サービスとの連携書籍。",
    score: 78,
  },
];

const disposalCandidates = [
  {
    title: "MS-DOS活用ガイド 第3版",
    lastLent: "2019-03-15",
    turnover: 0.02,
    condition: "痛みあり",
    excluded: false,
  },
  {
    title: "平成15年度 統計白書",
    lastLent: "2020-11-08",
    turnover: 0.05,
    condition: "良好",
    excluded: false,
  },
  {
    title: "実用ワープロ検定対策",
    lastLent: "2018-06-22",
    turnover: 0.01,
    condition: "痛みあり",
    excluded: false,
  },
  {
    title: "改訂前 介護保険制度の解説",
    lastLent: "2021-01-14",
    turnover: 0.08,
    condition: "良好",
    excluded: false,
  },
  {
    title: "旧版 市民生活ハンドブック 2015",
    lastLent: "2020-04-30",
    turnover: 0.03,
    condition: "日焼けあり",
    excluded: false,
  },
];

// --- ヘルパー ---

function statusBadgeVariant(
  status: "適正" | "不足" | "過多"
): "default" | "destructive" | "secondary" {
  if (status === "不足") return "destructive";
  if (status === "過多") return "secondary";
  return "default";
}

function statusBarColor(status: "適正" | "不足" | "過多"): string {
  if (status === "不足") return "bg-destructive";
  if (status === "過多") return "bg-primary";
  return "bg-success";
}

// --- コンポーネント ---

export default function BookSelectionDemoPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [addedBooks, setAddedBooks] = useState<Set<number>>(new Set());
  const budgetTotal = 2500000;
  const budgetPerBook = 125000;
  const remainingBudget = budgetTotal - addedBooks.size * budgetPerBook;

  const handleAddBook = (index: number) => {
    setAddedBooks((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <DemoLayout
      serviceName="AI選書最適化"
      serviceIcon={<BookOpen className="size-5 text-primary-foreground" />}
      subtitle="選書ダッシュボードデモ"
    >
      {/* 初期ガイダンス */}
      <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm font-medium text-primary mb-1">このデモの使い方</p>
        <p className="text-sm text-muted-foreground">
          NDC分類ごとの蔵書分布を確認し、ギャップ分析タブでAI推薦書籍をチェックできます。
        </p>
      </div>

      {/* ダッシュボードヘッダー */}
      <div className="bg-primary text-primary-foreground rounded-lg px-4 py-6 sm:px-6 mb-6 -mx-4 sm:mx-0">
        <h2 className="text-xl font-bold sm:text-2xl font-heading">
          ○○市立図書館 選書最適化分析ダッシュボード
        </h2>
        <p className="mt-2 text-primary-foreground/80 text-sm sm:text-base">
          AI蔵書分析・選書推薦システム | 2025年度データ
        </p>
      </div>

      <div>
        {/* フィルタバー */}
        <Card className="mb-8">
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">フィルタ:</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-md border bg-background px-3 py-1.5 text-sm"
                >
                  <option value="2025">2025年度</option>
                  <option value="2024">2024年度</option>
                  <option value="2023">2023年度</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-muted-foreground" />
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="rounded-md border bg-background px-3 py-1.5 text-sm"
                >
                  <option value="all">全館</option>
                  <option value="main">中央図書館</option>
                  <option value="north">北分館</option>
                  <option value="south">南分館</option>
                  <option value="east">東分館</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                適用
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 統計サマリー */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="animate-stagger-in">
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">蔵書数</p>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                <CountUp end={152340} suffix="冊" />
              </div>
            </CardContent>
          </Card>
          <Card className="animate-stagger-in">
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">年間貸出</p>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-success">
                <CountUp end={489210} suffix="回" />
              </div>
            </CardContent>
          </Card>
          <Card className="animate-stagger-in">
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">蔵書回転率</p>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                <CountUp end={3.21} decimals={2} />
              </div>
            </CardContent>
          </Card>
          <Card className="animate-stagger-in">
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">予算消化率</p>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-chart-5">
                <CountUp end={87.5} decimals={1} suffix="%" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* タブ */}
        <Tabs defaultValue="ndc">
          <TabsList className="w-full flex-wrap h-auto">
            <TabsTrigger value="ndc" className="gap-1.5">
              <BarChart3 className="size-4" />
              <span className="hidden sm:inline">NDC分類分布</span>
              <span className="sm:hidden">NDC</span>
            </TabsTrigger>
            <TabsTrigger value="gap" className="gap-1.5">
              <TrendingUp className="size-4" />
              <span className="hidden sm:inline">ギャップ分析</span>
              <span className="sm:hidden">ギャップ</span>
            </TabsTrigger>
            <TabsTrigger value="recommend" className="gap-1.5">
              <Star className="size-4" />
              <span className="hidden sm:inline">推薦リスト</span>
              <span className="sm:hidden">推薦</span>
            </TabsTrigger>
            <TabsTrigger value="disposal" className="gap-1.5">
              <Trash2 className="size-4" />
              <span className="hidden sm:inline">除籍候補</span>
              <span className="sm:hidden">除籍</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: NDC分類分布 */}
          <TabsContent value="ndc" className="mt-6 animate-tab-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>NDC分類別 蔵書分布</CardTitle>
                <CardDescription>
                  日本十進分類法に基づく蔵書構成比率
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ndcData.map((ndc) => (
                    <div key={ndc.code}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {ndc.code}:{ndc.name}
                          </span>
                          <Badge variant={statusBadgeVariant(ndc.status)}>
                            {ndc.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {ndc.pct}%
                        </span>
                      </div>
                      <div className="h-7 w-full rounded-md bg-muted overflow-hidden">
                        <div
                          className={`h-full ${statusBarColor(ndc.status)} rounded-md transition-[width] duration-1000 ease-out flex items-center justify-end pr-2`}
                          style={{
                            width: `${(ndc.pct / maxNdcPct) * 100}%`,
                          }}
                        >
                          <span className="text-xs text-white font-medium">
                            {ndc.pct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-success" />
                    <span>適正</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-destructive" />
                    <span>不足（需要超過）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-primary" />
                    <span>過多（供給超過）</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: ギャップ分析 */}
          <TabsContent value="gap" className="mt-6 animate-tab-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>需要・供給ギャップ分析</CardTitle>
                <CardDescription>
                  蔵書比率と貸出比率の差異から最適配分を算出
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">
                          NDC分類
                        </th>
                        <th className="text-right py-3 px-2 font-medium">
                          蔵書比率
                        </th>
                        <th className="text-right py-3 px-2 font-medium">
                          貸出比率
                        </th>
                        <th className="text-right py-3 px-2 font-medium">
                          ギャップ
                        </th>
                        <th className="text-center py-3 px-2 font-medium">
                          評価
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {gapData.map((row) => {
                        const isShortage = row.evaluation === "不足";
                        const isExcess = row.evaluation === "過多";
                        return (
                          <tr
                            key={row.ndc}
                            className={`border-b transition-colors ${
                              isShortage
                                ? "bg-destructive/10 dark:bg-destructive/10"
                                : isExcess
                                  ? "bg-primary/5"
                                  : ""
                            }`}
                          >
                            <td className="py-3 px-2 font-medium">
                              {row.ndc}
                            </td>
                            <td className="py-3 px-2 text-right">
                              {row.stock}%
                            </td>
                            <td className="py-3 px-2 text-right">
                              {row.lending}%
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span
                                className={`inline-flex items-center gap-1 font-medium ${
                                  row.gap > 0
                                    ? "text-destructive"
                                    : row.gap < -2
                                      ? "text-primary"
                                      : "text-muted-foreground"
                                }`}
                              >
                                {row.gap > 0 ? (
                                  <ArrowUpRight className="size-3" />
                                ) : row.gap < -2 ? (
                                  <ArrowDownRight className="size-3" />
                                ) : (
                                  <Minus className="size-3" />
                                )}
                                {row.gap > 0 ? "+" : ""}
                                {row.gap.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <Badge
                                variant={statusBadgeVariant(row.evaluation)}
                              >
                                {row.evaluation}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent md:hidden" aria-hidden="true" />
                </div>
                <p className="mt-1 text-center text-xs text-muted-foreground sm:hidden">
                  ← 横スクロールで全体を表示 →
                </p>

                <Separator className="my-6" />

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="size-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">分析サマリー</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        社会科学（+6.8%）と自然科学（+4.4%）で需要が供給を大幅に上回っています。技術（-3.8%）、言語（-3.5%）、文学（-3.0%）は供給過多の状態です。次年度予算配分の見直しを推奨します。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: 推薦リスト */}
          <TabsContent value="recommend" className="mt-6 animate-tab-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle>AI推薦書籍リスト</CardTitle>
                    <CardDescription>
                      蔵書ギャップ・利用者需要・トレンドに基づく推薦
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-sm py-1 px-3">
                      残り{" "}
                      <span className="font-bold">
                        ¥{remainingBudget.toLocaleString()}
                      </span>
                    </Badge>
                    <Badge className="text-sm py-1 px-3">
                      {addedBooks.size}冊選択中
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedBooks.map((book, i) => (
                    <div
                      key={i}
                      className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border transition-colors ${
                        addedBooks.has(i)
                          ? "bg-primary/5 border-primary/30"
                          : "bg-card hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-medium text-sm">
                            {book.title}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {book.ndc}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {book.author}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {book.reason}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            推薦スコア
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {book.score}
                          </p>
                        </div>
                        <Button
                          variant={addedBooks.has(i) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleAddBook(i)}
                          className="gap-1 min-w-[120px]"
                        >
                          {addedBooks.has(i) ? (
                            <>
                              <Check className="size-4" />
                              追加済み
                            </>
                          ) : (
                            <>
                              <Plus className="size-4" />
                              リストに追加
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-between flex-wrap gap-4">
                <p className="text-sm text-muted-foreground">
                  予算単価目安: ¥125,000/冊（送料・装備費込み）
                </p>
                <Button variant="cta" className="gap-2" disabled={addedBooks.size === 0}>
                  <ShoppingCart className="size-4" />
                  選書リストを確定（{addedBooks.size}冊）
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tab 4: 除籍候補 */}
          <TabsContent value="disposal" className="mt-6 animate-tab-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>除籍候補リスト</CardTitle>
                <CardDescription>
                  回転率が著しく低下した資料の候補（郷土資料・参考図書は除外済み）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">
                          タイトル
                        </th>
                        <th className="text-left py-3 px-2 font-medium hidden sm:table-cell">
                          最終貸出日
                        </th>
                        <th className="text-right py-3 px-2 font-medium">
                          回転率
                        </th>
                        <th className="text-center py-3 px-2 font-medium">
                          状態
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {disposalCandidates.map((book, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3 px-2">
                            <div>
                              <span className="font-medium">{book.title}</span>
                              <p className="text-xs text-muted-foreground sm:hidden mt-0.5">
                                最終貸出: {book.lastLent}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">
                            {book.lastLent}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className="text-destructive font-medium">
                              {book.turnover.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge
                              variant={
                                book.condition === "良好"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {book.condition}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent md:hidden" aria-hidden="true" />
                </div>
                <p className="mt-1 text-center text-xs text-muted-foreground sm:hidden">
                  ← 横スクロールで全体を表示 →
                </p>

                <Separator className="my-6" />

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="gap-1">
                    <Check className="size-3" />
                    郷土資料 除外済み
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Check className="size-3" />
                    参考図書 除外済み
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Check className="size-3" />
                    寄贈資料 確認済み
                  </Badge>
                </div>

                <div className="mt-4 bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="size-5 text-warning-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">除籍判断の注意事項</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        除籍候補はAIによる自動抽出結果です。最終判断は司書による確認が必要です。特に絶版資料や希少本については、他館との相互貸借状況も考慮してください。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-3">
                <Button variant="outline">一覧をエクスポート</Button>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="size-4" />
                  除籍申請へ進む
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DemoLayout>
  );
}

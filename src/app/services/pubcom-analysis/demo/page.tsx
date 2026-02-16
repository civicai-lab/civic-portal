"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CountUp } from "@/components/ui/count-up";
import { DemoLayout } from "@/components/demo/demo-layout";
import {
  BarChart3,
  PieChart,
  FileText,
  MessageSquare,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Minus,
  ChevronRight,
  Flame,
} from "lucide-react";

// --- データ定義 ---

const categoryData = [
  { name: "交通・道路", count: 320, color: "bg-primary" },
  { name: "住環境", count: 285, color: "bg-emerald-500" },
  { name: "公園・緑地", count: 198, color: "bg-green-500" },
  { name: "防災", count: 156, color: "bg-orange-500" },
  { name: "商業", count: 145, color: "bg-purple-500" },
  { name: "その他", count: 143, color: "bg-muted-foreground" },
];

const maxCount = Math.max(...categoryData.map((d) => d.count));

const sentimentData = {
  positive: { label: "賛成", pct: 58.3, color: "#22c55e" },
  negative: { label: "反対", pct: 23.1, color: "#ef4444" },
  neutral: { label: "中立", pct: 18.6, color: "#9ca3af" },
};

const representativeOpinions = [
  {
    sentiment: "賛成",
    badge: "default" as const,
    text: "「新しい公園計画には大いに賛成です。子どもたちの遊び場が増えることで、地域コミュニティの活性化にもつながると思います。」",
    author: "40代・子育て世代",
  },
  {
    sentiment: "反対",
    badge: "destructive" as const,
    text: "「幹線道路の拡幅計画は、沿道住民の生活環境を大きく損なう恐れがあり、反対します。騒音・排ガスの影響をもっと検討すべきです。」",
    author: "60代・沿道住民",
  },
  {
    sentiment: "中立",
    badge: "secondary" as const,
    text: "「防災拠点の整備は必要ですが、場所の選定については住民投票で決めるべきではないでしょうか。透明性のあるプロセスを求めます。」",
    author: "50代・自治会役員",
  },
];

const topics = [
  {
    theme: "渋滞対策と公共交通の充実",
    count: 187,
    positive: 42,
    negative: 38,
    neutral: 20,
    opinion:
      "バイパス道路の新設よりも、既存道路の信号制御最適化とバス路線の拡充を優先すべき。",
  },
  {
    theme: "緑地保全と開発のバランス",
    count: 156,
    positive: 65,
    negative: 18,
    neutral: 17,
    opinion:
      "残された里山・緑地は市の貴重な資産。開発より保全を優先する方針を明確にしてほしい。",
  },
  {
    theme: "防災避難所の配置見直し",
    count: 134,
    positive: 71,
    negative: 12,
    neutral: 17,
    opinion:
      "高齢者・障がい者が避難しやすい場所に避難所を設置し、備蓄品も充実させるべき。",
  },
  {
    theme: "商業地域の活性化策",
    count: 98,
    positive: 55,
    negative: 25,
    neutral: 20,
    opinion:
      "駅前商店街の空き店舗対策として、若者向けのチャレンジショップ制度を導入してほしい。",
  },
  {
    theme: "子育て世代への住環境支援",
    count: 89,
    positive: 72,
    negative: 8,
    neutral: 20,
    opinion:
      "通学路の安全対策と公園整備を一体的に進め、子どもが安心して暮らせるまちにしてほしい。",
  },
];

const reportSections = [
  {
    title: "1. 概要",
    content: `本報告書は、○○市都市計画マスタープラン改定に関して実施されたパブリックコメント（意見募集期間：2026年1月6日〜2月3日）の分析結果をまとめたものです。期間中に寄せられた1,247件の意見について、AI による自動分類・感情分析・論点抽出を行いました。意見提出者の年代は40〜60代が中心で、地域別では市中心部からの意見が最も多い結果となりました。`,
  },
  {
    title: "2. 分類結果",
    content: `意見を6つのカテゴリに自動分類した結果、「交通・道路」が320件（25.7%）で最多、次いで「住環境」285件（22.9%）、「公園・緑地」198件（15.9%）となりました。感情分析では、全体の58.3%が賛成的意見であり、23.1%が反対的、18.6%が中立的意見でした。特に「公園・緑地」カテゴリでは賛成率が75%を超え、市民の強い支持が確認されました。`,
  },
  {
    title: "3. 主要論点",
    content: `分析により5つの主要論点が抽出されました。最も議論が活発なのは「渋滞対策と公共交通の充実」（187件）で、賛否が拮抗しています。「緑地保全」と「防災避難所」については概ね賛成的な意見が多い一方、「商業地域の活性化」では具体的な施策提案を伴う意見が目立ちました。「子育て支援」に関する意見は件数こそ少ないものの、賛成率72%と高い支持を得ています。`,
  },
  {
    title: "4. 提言",
    content: `分析結果を踏まえ、以下の提言を行います。(1) 交通政策については、市民意見の二極化を踏まえた丁寧な説明会の開催を推奨。(2) 緑地保全については、市民の高い支持を活かし、具体的な保全区域の指定を検討。(3) 防災計画については、要配慮者の意見を重視した避難所配置の見直し。(4) 商業活性化では、若者の参入を促すチャレンジショップ制度の導入検討。(5) 子育て環境整備として、通学路と公園の一体的整備計画の策定。`,
  },
];

// --- コンポーネント ---

export default function PubcomAnalysisDemoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  return (
    <DemoLayout
      serviceName="パブコメ分析AI"
      serviceIcon={<BarChart3 className="size-5 text-primary-foreground" />}
      subtitle="分析ダッシュボードデモ"
    >
      {/* ダッシュボードヘッダー */}
      <div className="bg-primary text-primary-foreground rounded-lg px-4 py-6 sm:px-6 mb-6 -mx-4 sm:mx-0">
        <h2 className="text-xl font-bold sm:text-2xl font-heading">
          ○○市 都市計画マスタープラン改定
          <br className="sm:hidden" />
          パブリックコメント分析結果
        </h2>
        <p className="mt-2 text-primary-foreground/80 text-sm sm:text-base">
          意見募集期間: 2026年1月6日〜2月3日 | AI自動分析レポート
        </p>
      </div>

      <div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* メインコンテンツ */}
          <div className="flex-1 min-w-0">
            {/* 統計サマリー */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-1">
                    総意見数
                  </p>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    <CountUp end={1247} suffix="件" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-1">賛成率</p>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
                    <CountUp end={58} suffix=".3%" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-1">反対率</p>
                  <div className="text-2xl sm:text-3xl font-bold text-red-500">
                    <CountUp end={23} suffix=".1%" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-1">提案数</p>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                    <CountUp end={234} suffix="件" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* タブ */}
            <Tabs defaultValue="classification">
              <TabsList className="w-full flex-wrap h-auto">
                <TabsTrigger value="classification" className="gap-1.5">
                  <BarChart3 className="size-4" />
                  <span className="hidden sm:inline">意見分類</span>
                  <span className="sm:hidden">分類</span>
                </TabsTrigger>
                <TabsTrigger value="sentiment" className="gap-1.5">
                  <PieChart className="size-4" />
                  <span className="hidden sm:inline">感情分析</span>
                  <span className="sm:hidden">感情</span>
                </TabsTrigger>
                <TabsTrigger value="topics" className="gap-1.5">
                  <MessageSquare className="size-4" />
                  <span className="hidden sm:inline">主要論点</span>
                  <span className="sm:hidden">論点</span>
                </TabsTrigger>
                <TabsTrigger value="report" className="gap-1.5">
                  <FileText className="size-4" />
                  <span>レポート</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: 意見分類 */}
              <TabsContent value="classification" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>カテゴリ別意見数</CardTitle>
                    <CardDescription>
                      1,247件の意見を6カテゴリに自動分類
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categoryData.map((cat) => (
                        <div key={cat.name}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium">
                              {cat.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {cat.count}件（
                              {((cat.count / 1247) * 100).toFixed(1)}%）
                            </span>
                          </div>
                          <div className="h-8 w-full rounded-md bg-muted overflow-hidden">
                            <div
                              className={`h-full ${cat.color} rounded-md transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                              style={{
                                width: `${(cat.count / maxCount) * 100}%`,
                              }}
                            >
                              <span className="text-xs text-white font-medium">
                                {cat.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 2: 感情分析 */}
              <TabsContent value="sentiment" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>感情分析結果</CardTitle>
                    <CardDescription>
                      各意見を賛成・反対・中立に自動分類
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                      {/* 円グラフ（CSS conic-gradient） */}
                      <div className="relative">
                        <div
                          className="size-48 rounded-full"
                          style={{
                            background: `conic-gradient(
                              ${sentimentData.positive.color} 0% ${sentimentData.positive.pct}%,
                              ${sentimentData.negative.color} ${sentimentData.positive.pct}% ${sentimentData.positive.pct + sentimentData.negative.pct}%,
                              ${sentimentData.neutral.color} ${sentimentData.positive.pct + sentimentData.negative.pct}% 100%
                            )`,
                          }}
                        />
                        <div className="absolute inset-6 rounded-full bg-card flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-2xl font-bold">1,247</p>
                            <p className="text-xs text-muted-foreground">
                              総意見数
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 凡例 */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="size-4 rounded-full bg-emerald-500" />
                          <span className="font-medium">
                            賛成 {sentimentData.positive.pct}%
                          </span>
                          <span className="text-muted-foreground text-sm">
                            （{Math.round(1247 * 0.583)}件）
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="size-4 rounded-full bg-red-500" />
                          <span className="font-medium">
                            反対 {sentimentData.negative.pct}%
                          </span>
                          <span className="text-muted-foreground text-sm">
                            （{Math.round(1247 * 0.231)}件）
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="size-4 rounded-full bg-muted-foreground" />
                          <span className="font-medium">
                            中立 {sentimentData.neutral.pct}%
                          </span>
                          <span className="text-muted-foreground text-sm">
                            （{Math.round(1247 * 0.186)}件）
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* 代表的意見 */}
                    <h3 className="font-semibold mb-4">代表的な意見</h3>
                    <div className="space-y-4">
                      {representativeOpinions.map((op, i) => (
                        <Card key={i} className="bg-muted/50">
                          <CardContent className="pt-0">
                            <div className="flex items-center gap-2 mb-2">
                              {op.sentiment === "賛成" && (
                                <ThumbsUp className="size-4 text-emerald-500" />
                              )}
                              {op.sentiment === "反対" && (
                                <ThumbsDown className="size-4 text-red-500" />
                              )}
                              {op.sentiment === "中立" && (
                                <Minus className="size-4 text-muted-foreground" />
                              )}
                              <Badge variant={op.badge}>{op.sentiment}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {op.author}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">{op.text}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 3: 主要論点 */}
              <TabsContent value="topics" className="mt-6">
                <div className="space-y-4">
                  {topics.map((topic, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {topic.theme}
                            </CardTitle>
                            <CardDescription>
                              {topic.count}件の意見
                            </CardDescription>
                          </div>
                          <Badge variant="outline">{topic.count}件</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* 賛否バー */}
                        <div className="mb-3">
                          <div className="flex text-xs mb-1 justify-between">
                            <span className="text-emerald-600">
                              賛成 {topic.positive}%
                            </span>
                            <span className="text-red-500">
                              反対 {topic.negative}%
                            </span>
                          </div>
                          <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
                            <div
                              className="h-full bg-emerald-500"
                              style={{ width: `${topic.positive}%` }}
                            />
                            <div
                              className="h-full bg-muted-foreground/60"
                              style={{ width: `${topic.neutral}%` }}
                            />
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${topic.negative}%` }}
                            />
                          </div>
                        </div>

                        {/* 代表意見 */}
                        <div className="bg-muted/50 rounded-lg p-3 mt-3">
                          <p className="text-sm text-muted-foreground flex items-start gap-2">
                            <MessageSquare className="size-4 mt-0.5 shrink-0" />
                            {topic.opinion}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 4: レポート */}
              <TabsContent value="report" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle>自動生成レポート</CardTitle>
                        <CardDescription>
                          AI分析結果に基づく報告書プレビュー
                        </CardDescription>
                      </div>
                      <Button variant="cta" className="gap-2">
                        <Download className="size-4" />
                        PDFダウンロード
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-6 bg-card space-y-8">
                      <div className="text-center border-b pb-6">
                        <h2 className="text-xl font-bold">
                          パブリックコメント分析報告書
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          ○○市 都市計画マスタープラン改定
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          2026年2月16日 | AI自動生成
                        </p>
                      </div>

                      {reportSections.map((section, i) => (
                        <div key={i}>
                          <h3 className="text-lg font-semibold mb-3 text-primary">
                            {section.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-foreground/80">
                            {section.content}
                          </p>
                          {i < reportSections.length - 1 && (
                            <Separator className="mt-6" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* サイドバー（デスクトップのみ） */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            {/* 炎上リスク検出 */}
            <Card className="border-amber-300 bg-amber-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Flame className="size-5 text-amber-600" />
                  <CardTitle className="text-amber-800 text-sm">
                    炎上リスク検出
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Badge className="bg-amber-500 text-white mb-3">注意</Badge>
                <p className="text-sm text-amber-800">
                  交通政策に関する意見が急増しています。直近7日間で前週比
                  <strong>+180%</strong>の増加。SNS上でも関連する投稿が拡散中。
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full text-amber-700 border-amber-300"
                >
                  詳細を確認
                  <ChevronRight className="size-4" />
                </Button>
              </CardContent>
            </Card>

            {/* フィルタ */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Filter className="size-5" />
                  <CardTitle className="text-sm">フィルタ</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 期間フィルタ */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    <Calendar className="size-3 inline mr-1" />
                    期間
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">全期間</option>
                    <option value="week1">第1週（1/6〜1/12）</option>
                    <option value="week2">第2週（1/13〜1/19）</option>
                    <option value="week3">第3週（1/20〜1/26）</option>
                    <option value="week4">第4週（1/27〜2/3）</option>
                  </select>
                </div>

                {/* カテゴリフィルタ */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    <BarChart3 className="size-3 inline mr-1" />
                    カテゴリ
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">すべて</option>
                    <option value="traffic">交通・道路</option>
                    <option value="living">住環境</option>
                    <option value="park">公園・緑地</option>
                    <option value="disaster">防災</option>
                    <option value="commerce">商業</option>
                  </select>
                </div>

                {/* 感情フィルタ */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    <TrendingUp className="size-3 inline mr-1" />
                    感情
                  </label>
                  <select
                    value={selectedSentiment}
                    onChange={(e) => setSelectedSentiment(e.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">すべて</option>
                    <option value="positive">賛成</option>
                    <option value="negative">反対</option>
                    <option value="neutral">中立</option>
                  </select>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  フィルタ適用
                </Button>
              </CardContent>
            </Card>

            {/* 分析サマリー */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">クイック統計</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">意見提出者数</span>
                    <span className="font-medium">892名</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">平均文字数</span>
                    <span className="font-medium">245字</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">提案含有率</span>
                    <span className="font-medium">18.8%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">分析精度</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* モバイル用 炎上リスク（lgで非表示） */}
      <div className="lg:hidden pb-4">
        <Card className="border-amber-300 bg-amber-50">
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-4 text-amber-600" />
              <Badge className="bg-amber-500 text-white">注意</Badge>
            </div>
            <p className="text-sm text-amber-800">
              交通政策に関する意見が急増（前週比+180%）
            </p>
          </CardContent>
        </Card>
      </div>
    </DemoLayout>
  );
}

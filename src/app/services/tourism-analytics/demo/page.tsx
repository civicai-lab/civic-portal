"use client";

import { useState } from "react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CountUp } from "@/components/ui/count-up";
import {
  TrendingUp,
  BarChart3,
  Languages,
  Heart,
  Clock,
  Users,
  Star,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  ThumbsUp,
  ThumbsDown,
  Minus,
} from "lucide-react";

// ---- データ ----

const PERIODS = [
  { label: "直近1週", value: "1w" },
  { label: "1ヶ月", value: "1m" },
  { label: "3ヶ月", value: "3m" },
  { label: "1年", value: "1y" },
];

const MONTHLY_DATA = [
  { month: "1月", visitors: 8200, yoy: 12 },
  { month: "2月", visitors: 7500, yoy: 8 },
  { month: "3月", visitors: 11800, yoy: 15 },
  { month: "4月", visitors: 14200, yoy: 22 },
  { month: "5月", visitors: 12800, yoy: 18 },
  { month: "6月", visitors: 9600, yoy: 5 },
  { month: "7月", visitors: 13500, yoy: 10 },
  { month: "8月", visitors: 15200, yoy: 25 },
  { month: "9月", visitors: 11900, yoy: 14 },
  { month: "10月", visitors: 10800, yoy: 9 },
  { month: "11月", visitors: 8400, yoy: -3 },
  { month: "12月", visitors: 4643, yoy: -8 },
];

const MAX_VISITORS = Math.max(...MONTHLY_DATA.map((d) => d.visitors));

const LANGUAGES = [
  { name: "日本語", percent: 60, color: "bg-primary", textColor: "text-primary" },
  { name: "英語", percent: 15, color: "bg-emerald-500", textColor: "text-emerald-700 dark:text-emerald-400" },
  { name: "中国語", percent: 12, color: "bg-red-500", textColor: "text-red-700 dark:text-red-400" },
  { name: "韓国語", percent: 8, color: "bg-purple-500", textColor: "text-purple-700 dark:text-purple-400" },
  { name: "その他", percent: 5, color: "bg-muted-foreground", textColor: "text-muted-foreground" },
];

const SENTIMENTS = {
  positive: { label: "ポジティブ", percent: 68, color: "bg-emerald-500" },
  neutral: { label: "中立", percent: 22, color: "bg-muted-foreground" },
  negative: { label: "ネガティブ", percent: 10, color: "bg-red-500" },
};

const REPRESENTATIVE_POSTS = [
  {
    text: "桜の季節に訪れましたが、城跡公園の景色が素晴らしかったです。地元のガイドさんも親切で、歴史の解説が面白かったです。",
    lang: "日本語",
    langColor: "bg-primary/10 text-primary/90",
    sentiment: "ポジティブ",
    sentimentColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    icon: <ThumbsUp className="size-4 text-success" />,
  },
  {
    text: "The temple was beautiful but the signage was hard to follow for non-Japanese speakers. Would love more multilingual maps.",
    lang: "英語",
    langColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    sentiment: "中立",
    sentimentColor: "bg-muted text-foreground",
    icon: <Minus className="size-4 text-muted-foreground" />,
  },
  {
    text: "바다가 정말 아름다웠어요! 다만 대중교통 접근성이 좀 아쉬웠습니다. 다음에는 렌터카를 빌려야 할 것 같아요.",
    lang: "韓国語",
    langColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
    sentiment: "ネガティブ",
    sentimentColor: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
    icon: <ThumbsDown className="size-4 text-destructive" />,
  },
];

// ---- メインコンポーネント ----

export default function TourismAnalyticsDemoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("1y");

  return (
    <DemoLayout
      serviceName="観光データ分析AI"
      serviceIcon={<TrendingUp className="size-5 text-primary-foreground" />}
      subtitle="観光分析デモ"
    >
      {/* フィルタバー */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-sm font-medium text-muted-foreground">期間:</span>
        {PERIODS.map((period) => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period.value)}
          >
            {period.label}
          </Button>
        ))}
      </div>

      {/* KPIカード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="size-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">総訪問者数</p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              <CountUp end={128543} />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="size-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">平均滞在時間</p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-success">
              2.3<span className="text-base font-normal text-muted-foreground">日</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Star className="size-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">満足度</p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warning">
              4.2<span className="text-base font-normal text-muted-foreground">/ 5.0</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <div className="flex items-center gap-1.5 mb-1">
              <MessageCircle className="size-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">SNS言及</p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-chart-5">
              <CountUp end={3421} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* タブ */}
      <Tabs defaultValue="trend">
        <TabsList className="w-full flex-wrap h-auto">
          <TabsTrigger value="trend" className="gap-1.5">
            <BarChart3 className="size-4" />
            トレンド
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-1.5">
            <Languages className="size-4" />
            言語分析
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="gap-1.5">
            <Heart className="size-4" />
            感情分析
          </TabsTrigger>
        </TabsList>

        {/* トレンドタブ */}
        <TabsContent value="trend" className="mt-6 animate-tab-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>月別訪問者数</CardTitle>
              <CardDescription>直近12ヶ月間のトレンド</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 棒グラフ */}
              <div className="flex items-end gap-2 h-64 px-2">
                {MONTHLY_DATA.map((d) => (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    {/* 前年比Badge */}
                    <div className="text-xs flex items-center gap-0.5 mb-1">
                      {d.yoy >= 0 ? (
                        <ArrowUpRight className="size-3 text-success" />
                      ) : (
                        <ArrowDownRight className="size-3 text-destructive" />
                      )}
                      <span className={d.yoy >= 0 ? "text-success" : "text-destructive"}>
                        {d.yoy > 0 ? "+" : ""}
                        {d.yoy}%
                      </span>
                    </div>
                    {/* 棒 */}
                    <div
                      className="w-full bg-primary/80 rounded-t-md transition-all duration-700 hover:bg-primary cursor-pointer relative group"
                      style={{ height: `${(d.visitors / MAX_VISITORS) * 100}%` }}
                    >
                      {/* ツールチップ */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {d.visitors.toLocaleString()}人
                      </div>
                    </div>
                    {/* 月ラベル */}
                    <span className="text-xs text-muted-foreground mt-1">{d.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 言語分析タブ */}
        <TabsContent value="language" className="mt-6 animate-tab-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>言語別比率</CardTitle>
              <CardDescription>SNS投稿・レビューの使用言語分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {LANGUAGES.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`size-8 rounded-full ${lang.color} flex items-center justify-center`}>
                          <span className="text-xs font-bold text-white">
                            {lang.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-sm">{lang.name}</span>
                      </div>
                      <span className={`font-bold ${lang.textColor}`}>{lang.percent}%</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full ${lang.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* サマリー */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">分析コメント</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  日本語が全体の60%を占めますが、インバウンド向け施策の効果により英語・中国語の投稿が前年比20%増加しています。韓国語投稿は特に食文化関連で増加傾向にあり、多言語案内の充実が求められます。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 感情分析タブ */}
        <TabsContent value="sentiment" className="mt-6 animate-tab-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>感情分析結果</CardTitle>
              <CardDescription>SNS投稿・レビューの感情傾向</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 比率バー */}
              <div className="mb-6">
                <div className="flex text-xs mb-2 justify-between">
                  <span className="text-success font-medium">ポジティブ {SENTIMENTS.positive.percent}%</span>
                  <span className="text-muted-foreground">中立 {SENTIMENTS.neutral.percent}%</span>
                  <span className="text-destructive font-medium">ネガティブ {SENTIMENTS.negative.percent}%</span>
                </div>
                <div className="h-6 w-full rounded-full overflow-hidden flex">
                  <div className={`h-full ${SENTIMENTS.positive.color}`} style={{ width: `${SENTIMENTS.positive.percent}%` }} />
                  <div className={`h-full ${SENTIMENTS.neutral.color}`} style={{ width: `${SENTIMENTS.neutral.percent}%` }} />
                  <div className={`h-full ${SENTIMENTS.negative.color}`} style={{ width: `${SENTIMENTS.negative.percent}%` }} />
                </div>
              </div>

              <Separator className="my-6" />

              {/* 代表的な投稿 */}
              <h4 className="font-semibold mb-4">代表的な投稿</h4>
              <div className="space-y-4">
                {REPRESENTATIVE_POSTS.map((post, i) => (
                  <Card key={i} className="bg-muted/50">
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {post.icon}
                        <Badge className={post.sentimentColor}>{post.sentiment}</Badge>
                        <Badge className={post.langColor}>{post.lang}</Badge>
                      </div>
                      <p className="text-sm leading-relaxed">{post.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DemoLayout>
  );
}

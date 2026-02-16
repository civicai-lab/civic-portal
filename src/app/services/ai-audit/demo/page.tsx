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
  ShieldCheck,
  Monitor,
  Grid3X3,
  FileBarChart,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ShieldAlert,
} from "lucide-react";

// ---- データ ----

type RiskLevel = "Low" | "Medium" | "High" | "Critical";

interface AuditSystem {
  id: string;
  name: string;
  risk: RiskLevel;
  pii: boolean;
  bias: string;
  score: number;
  impact: number;
  probability: number;
}

const SYSTEMS: AuditSystem[] = [
  { id: "1", name: "住民問い合わせAI", risk: "Low", pii: true, bias: "なし", score: 2.1, impact: 2, probability: 1 },
  { id: "2", name: "AI司書SHIORI", risk: "Low", pii: false, bias: "なし", score: 1.8, impact: 1, probability: 2 },
  { id: "3", name: "福祉制度ナビ", risk: "Medium", pii: true, bias: "要確認", score: 3.2, impact: 3, probability: 2 },
  { id: "4", name: "防災AIガイド", risk: "High", pii: true, bias: "なし", score: 4.1, impact: 4, probability: 3 },
  { id: "5", name: "議事録要約AI", risk: "Medium", pii: true, bias: "なし", score: 2.8, impact: 2, probability: 3 },
  { id: "6", name: "パブコメ分析AI", risk: "Medium", pii: false, bias: "要確認", score: 3.5, impact: 3, probability: 3 },
  { id: "7", name: "観光データ分析", risk: "Low", pii: false, bias: "なし", score: 1.5, impact: 1, probability: 1 },
  { id: "8", name: "RFP作成支援AI", risk: "Low", pii: false, bias: "なし", score: 1.2, impact: 1, probability: 1 },
];

const RISK_COLORS: Record<RiskLevel, string> = {
  Low: "bg-emerald-100 text-emerald-800",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const RISK_DOT_COLORS: Record<RiskLevel, string> = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-orange-500",
  Critical: "bg-red-500",
};

interface Improvement {
  id: string;
  title: string;
  system: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  deadline: string;
}

const IMPROVEMENTS: Improvement[] = [
  { id: "1", title: "防災AIの入力検証強化", system: "防災AIガイド", description: "緊急時の入力データに対するバリデーション強化と、異常値検出アルゴリズムの導入", priority: "High", deadline: "2026年3月末" },
  { id: "2", title: "福祉ナビのバイアステスト実施", system: "福祉制度ナビ", description: "世帯構成・年齢・障害等級に基づく制度推薦のバイアス有無を検証", priority: "High", deadline: "2026年3月末" },
  { id: "3", title: "パブコメAIの分類精度向上", system: "パブコメ分析AI", description: "感情分析モデルの再学習を行い、分類精度を現行92%から95%以上に改善", priority: "High", deadline: "2026年4月末" },
  { id: "4", title: "PII検出ルールの更新", system: "住民問い合わせAI", description: "マイナンバー・住所・電話番号等の検出パターンを最新の個人情報保護法に準拠させる", priority: "Medium", deadline: "2026年5月末" },
  { id: "5", title: "議事録AIのアクセスログ強化", system: "議事録要約AI", description: "個人名を含む議事録データへのアクセスログを詳細化し、監査証跡を整備", priority: "Medium", deadline: "2026年5月末" },
  { id: "6", title: "パブコメAIのバイアス是正", system: "パブコメ分析AI", description: "特定の政策テーマに対する感情分析の偏りを調査・是正", priority: "Medium", deadline: "2026年6月末" },
  { id: "7", title: "観光分析のデータ品質チェック追加", system: "観光データ分析", description: "入力データの欠損値・外れ値を自動検出するパイプラインを追加", priority: "Low", deadline: "2026年7月末" },
  { id: "8", title: "RFP支援AIのテンプレート検証", system: "RFP作成支援AI", description: "生成されるRFPテンプレートが最新の調達ガイドラインに準拠しているか定期検証する仕組みを導入", priority: "Low", deadline: "2026年8月末" },
];

const PRIORITY_COLORS: Record<string, string> = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-amber-100 text-amber-800",
  Low: "bg-emerald-100 text-emerald-800",
};

const IMPACT_LABELS = ["", "低", "中", "高", "致命的"];
const PROBABILITY_LABELS = ["", "低", "中", "高", "非常に高い"];

// ---- メインコンポーネント ----

export default function AiAuditDemoPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  return (
    <DemoLayout
      serviceName="AI監査・評価サービス"
      serviceIcon={<ShieldCheck className="size-5 text-primary-foreground" />}
      subtitle="AI監査デモ"
    >
      {/* KPIカード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">監査済み</p>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              <CountUp end={8} /> <span className="text-base font-normal text-muted-foreground">/ 12システム</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">平均リスクスコア</p>
            <div className="text-2xl sm:text-3xl font-bold text-warning">
              3.2 <span className="text-base font-normal text-muted-foreground">/ 5.0</span>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">PII検出</p>
            <div className="text-2xl sm:text-3xl font-bold text-destructive">
              <CountUp end={23} suffix="件" />
            </div>
          </CardContent>
        </Card>
        <Card className="animate-stagger-in">
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-1">改善提案</p>
            <div className="text-2xl sm:text-3xl font-bold text-chart-5">
              <CountUp end={47} suffix="件" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* タブ */}
      <Tabs defaultValue="systems">
        <TabsList className="w-full flex-wrap h-auto">
          <TabsTrigger value="systems" className="gap-1.5">
            <Monitor className="size-4" />
            <span className="hidden sm:inline">システム一覧</span>
            <span className="sm:hidden">一覧</span>
          </TabsTrigger>
          <TabsTrigger value="matrix" className="gap-1.5">
            <Grid3X3 className="size-4" />
            <span className="hidden sm:inline">リスクマトリクス</span>
            <span className="sm:hidden">マトリクス</span>
          </TabsTrigger>
          <TabsTrigger value="improvements" className="gap-1.5">
            <FileBarChart className="size-4" />
            <span className="hidden sm:inline">改善レポート</span>
            <span className="sm:hidden">改善</span>
          </TabsTrigger>
        </TabsList>

        {/* システム一覧タブ */}
        <TabsContent value="systems" className="mt-6 animate-tab-fade-in">
          <div className="grid gap-4 sm:grid-cols-2">
            {SYSTEMS.map((sys) => (
              <Card
                key={sys.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSystem === sys.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedSystem(selectedSystem === sys.id ? null : sys.id)}
              >
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{sys.name}</h3>
                    <Badge className={RISK_COLORS[sys.risk]}>{sys.risk}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">PII:</span>
                      {sys.pii ? (
                        <Badge variant="destructive" className="text-xs">あり</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">なし</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldAlert className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">バイアス:</span>
                      {sys.bias === "要確認" ? (
                        <Badge className="bg-amber-100 text-amber-800 text-xs">{sys.bias}</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">{sys.bias}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="size-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">リスクスコア:</span>
                      <span className="font-medium">{sys.score}/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* リスクマトリクスタブ */}
        <TabsContent value="matrix" className="mt-6 animate-tab-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>リスクマトリクス</CardTitle>
              <CardDescription>影響度 x 発生確率でシステムを配置</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[400px]">
                  {/* Y軸ラベル + グリッド */}
                  <div className="flex gap-2">
                    {/* Y軸 */}
                    <div className="flex flex-col justify-between w-16 text-xs text-muted-foreground shrink-0 py-1">
                      <span className="text-right">致命的</span>
                      <span className="text-right">高</span>
                      <span className="text-right">中</span>
                      <span className="text-right">低</span>
                    </div>

                    {/* グリッド本体 */}
                    <div className="flex-1">
                      <div className="grid grid-cols-4 grid-rows-4 gap-1">
                        {[4, 3, 2, 1].map((impact) =>
                          [1, 2, 3, 4].map((prob) => {
                            const cellSystems = SYSTEMS.filter(
                              (s) => s.impact === impact && s.probability === prob
                            );
                            const dangerLevel = impact + prob;
                            let bgColor = "bg-emerald-50";
                            if (dangerLevel >= 7) bgColor = "bg-red-50";
                            else if (dangerLevel >= 5) bgColor = "bg-amber-50";
                            else if (dangerLevel >= 4) bgColor = "bg-yellow-50";

                            let riskLabel = "低リスク";
                            if (dangerLevel >= 7) riskLabel = "高リスク";
                            else if (dangerLevel >= 5) riskLabel = "中リスク";
                            else if (dangerLevel >= 4) riskLabel = "やや低リスク";

                            return (
                              <div
                                key={`${impact}-${prob}`}
                                className={`${bgColor} border rounded-md p-2 min-h-[70px] flex flex-col gap-1`}
                                aria-label={`影響度${IMPACT_LABELS[impact]}・発生確率${PROBABILITY_LABELS[prob]}: ${riskLabel}`}
                              >
                                {cellSystems.map((sys) => (
                                  <div key={sys.id} className="flex items-center gap-1">
                                    <div className={`size-2.5 rounded-full shrink-0 ${RISK_DOT_COLORS[sys.risk]}`} />
                                    <span className="text-xs truncate">{sys.name}</span>
                                  </div>
                                ))}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* X軸ラベル */}
                      <div className="grid grid-cols-4 gap-1 mt-2">
                        {PROBABILITY_LABELS.slice(1).map((label) => (
                          <span key={label} className="text-xs text-muted-foreground text-center">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 軸ラベル */}
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <span className="ml-16">影響度（縦軸） x 発生確率（横軸）</span>
                  </div>

                  {/* 凡例 */}
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
                    {(["Low", "Medium", "High", "Critical"] as RiskLevel[]).map((level) => (
                      <div key={level} className="flex items-center gap-1.5 text-xs">
                        <div className={`size-3 rounded-full ${RISK_DOT_COLORS[level]}`} />
                        <span>{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 改善レポートタブ */}
        <TabsContent value="improvements" className="mt-6 animate-tab-fade-in">
          <div className="space-y-6">
            {(["High", "Medium", "Low"] as const).map((priority) => {
              const items = IMPROVEMENTS.filter((i) => i.priority === priority);
              if (items.length === 0) return null;
              return (
                <div key={priority}>
                  <div className="flex items-center gap-2 mb-4">
                    {priority === "High" && <XCircle className="size-5 text-red-500" />}
                    {priority === "Medium" && <AlertTriangle className="size-5 text-amber-500" />}
                    {priority === "Low" && <CheckCircle2 className="size-5 text-emerald-500" />}
                    <h3 className="font-semibold text-foreground">
                      優先度: {priority}
                    </h3>
                    <Badge className={PRIORITY_COLORS[priority]}>{items.length}件</Badge>
                  </div>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <Card key={item.id}>
                        <CardContent>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-semibold text-sm">{item.title}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                対象: {item.system}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs shrink-0 gap-1">
                              <Clock className="size-3" />
                              {item.deadline}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground/80">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </DemoLayout>
  );
}

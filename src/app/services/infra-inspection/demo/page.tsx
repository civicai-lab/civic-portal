"use client";

import { useState, useMemo } from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CountUp } from "@/components/ui/count-up";
import {
  Construction,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Calendar,
  Filter,
  ArrowUpDown,
  Building2,
  Waves,
  Route,
  Mountain,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";

// --- 型定義 ---

type FacilityType = "橋梁" | "トンネル" | "道路" | "上下水道";
type Grade = "A" | "B" | "C" | "D";

interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  age: number;
  deterioration: number;
  grade: Grade;
}

// --- モックデータ ---

const FACILITIES: Facility[] = [
  { id: "1", name: "第一大橋", type: "橋梁", age: 45, deterioration: 72, grade: "C" },
  { id: "2", name: "中央トンネル", type: "トンネル", age: 38, deterioration: 55, grade: "B" },
  { id: "3", name: "南町高架橋", type: "橋梁", age: 52, deterioration: 85, grade: "D" },
  { id: "4", name: "北部幹線道路", type: "道路", age: 25, deterioration: 35, grade: "B" },
  { id: "5", name: "東浄水場配管", type: "上下水道", age: 40, deterioration: 68, grade: "C" },
  { id: "6", name: "西部歩道橋", type: "橋梁", age: 30, deterioration: 28, grade: "A" },
  { id: "7", name: "港町トンネル", type: "トンネル", age: 20, deterioration: 15, grade: "A" },
  { id: "8", name: "市道1-234号", type: "道路", age: 35, deterioration: 48, grade: "B" },
  { id: "9", name: "山手下水管路", type: "上下水道", age: 50, deterioration: 78, grade: "D" },
  { id: "10", name: "駅前ペデストリアンデッキ", type: "橋梁", age: 15, deterioration: 12, grade: "A" },
];

const GRADE_CONFIG: Record<Grade, { label: string; className: string; bgClass: string; description: string }> = {
  A: { label: "良好", className: "bg-success/15 text-success", bgClass: "bg-success/10", description: "健全な状態" },
  B: { label: "経過観察", className: "bg-warning/15 text-warning-foreground", bgClass: "bg-warning/10", description: "軽微な劣化あり" },
  C: { label: "要注意", className: "bg-warning/15 text-warning-foreground", bgClass: "bg-warning/10", description: "早期に対策が必要" },
  D: { label: "要補修", className: "bg-destructive/15 text-destructive", bgClass: "bg-destructive/10", description: "緊急対応が必要" },
};

const TYPE_ICONS: Record<FacilityType, React.ReactNode> = {
  "橋梁": <Building2 className="size-4" />,
  "トンネル": <Mountain className="size-4" />,
  "道路": <Route className="size-4" />,
  "上下水道": <Waves className="size-4" />,
};

const DETERIORATION_COLOR = (value: number): string => {
  if (value >= 75) return "bg-destructive";
  if (value >= 50) return "bg-warning";
  if (value >= 25) return "bg-warning";
  return "bg-success";
};

type SortKey = "name" | "age" | "deterioration" | "grade";
type SortDir = "asc" | "desc";

// --- メインコンポーネント ---

export default function InfraInspectionDemoPage() {
  const [typeFilter, setTypeFilter] = useState<FacilityType | "全て">("全て");
  const [sortKey, setSortKey] = useState<SortKey>("deterioration");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filteredFacilities = useMemo(() => {
    let results = FACILITIES;

    if (typeFilter !== "全て") {
      results = results.filter((f) => f.type === typeFilter);
    }

    return [...results].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "age":
          cmp = a.age - b.age;
          break;
        case "deterioration":
          cmp = a.deterioration - b.deterioration;
          break;
        case "grade":
          cmp = a.grade.localeCompare(b.grade);
          break;
      }
      return sortDir === "desc" ? -cmp : cmp;
    });
  }, [typeFilter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  // --- KPI計算 ---
  const totalFacilities = 200;
  const inspectedCount = 156;
  const alertCount = FACILITIES.filter((f) => f.grade === "C" || f.grade === "D").length;
  const avgDeterioration = Math.round(
    FACILITIES.reduce((sum, f) => sum + f.deterioration, 0) / FACILITIES.length
  );
  const nextInspectionCount = 12;

  // --- 統計データ ---
  const typeStats = useMemo(() => {
    const types: FacilityType[] = ["橋梁", "トンネル", "道路", "上下水道"];
    return types.map((type) => {
      const items = FACILITIES.filter((f) => f.type === type);
      const avgDet = items.length > 0
        ? Math.round(items.reduce((s, f) => s + f.deterioration, 0) / items.length)
        : 0;
      return { type, count: items.length, avgDeterioration: avgDet };
    });
  }, []);

  const ageDistribution = useMemo(() => {
    const ranges = [
      { label: "~20年", min: 0, max: 20 },
      { label: "21~30年", min: 21, max: 30 },
      { label: "31~40年", min: 31, max: 40 },
      { label: "41~50年", min: 41, max: 50 },
      { label: "51年~", min: 51, max: 999 },
    ];
    return ranges.map((r) => ({
      label: r.label,
      count: FACILITIES.filter((f) => f.age >= r.min && f.age <= r.max).length,
    }));
  }, []);

  const maxAgeCount = Math.max(...ageDistribution.map((d) => d.count), 1);

  return (
    <DemoLayout
      serviceName="インフラ点検AIサポーター"
      serviceIcon={<Construction className="size-5 text-primary-foreground" />}
      subtitle="インフラ点検デモ"
    >
      <div className="space-y-6">
        {/* KPIカード */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 点検済み施設 */}
          <Card className="py-4">
            <CardContent className="pt-0 pb-0 text-center">
              <CheckCircle2 className="size-6 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">点検済み施設</p>
              <div className="text-2xl font-bold text-foreground mt-1">
                <CountUp end={inspectedCount} />
                <span className="text-sm font-normal text-muted-foreground"> / {totalFacilities}</span>
              </div>
              <Progress
                value={inspectedCount}
                max={totalFacilities}
                className="mt-2 h-1.5"
              />
            </CardContent>
          </Card>

          {/* 要注意 */}
          <Card className="py-4">
            <CardContent className="pt-0 pb-0 text-center">
              <AlertTriangle className="size-6 text-destructive mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">要注意</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-2xl font-bold text-foreground">
                  <CountUp end={alertCount} />
                </span>
                <Badge variant="destructive" className="text-xs">件</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">C・D判定施設</p>
            </CardContent>
          </Card>

          {/* 平均劣化度 */}
          <Card className="py-4">
            <CardContent className="pt-0 pb-0 text-center">
              <BarChart3 className="size-6 text-warning-foreground mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">平均劣化度</p>
              <div className="text-2xl font-bold text-foreground mt-1">
                <CountUp end={avgDeterioration} suffix="%" />
              </div>
              <Progress
                value={avgDeterioration}
                className="mt-2 h-1.5"
                indicatorClassName={DETERIORATION_COLOR(avgDeterioration)}
              />
            </CardContent>
          </Card>

          {/* 次回点検 */}
          <Card className="py-4">
            <CardContent className="pt-0 pb-0 text-center">
              <Calendar className="size-6 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">次回点検予定</p>
              <div className="text-2xl font-bold text-foreground mt-1">
                <CountUp end={nextInspectionCount} />
                <span className="text-sm font-normal text-muted-foreground"> 件</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">今月予定</p>
            </CardContent>
          </Card>
        </div>

        {/* タブ: 一覧 / 統計 */}
        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list" className="gap-1.5">
              <ArrowUpDown className="size-4" />
              一覧
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-1.5">
              <BarChart3 className="size-4" />
              統計
            </TabsTrigger>
          </TabsList>

          {/* 一覧タブ */}
          <TabsContent value="list" className="mt-3">
            <Card className="py-4">
              <CardContent className="pt-0 pb-0">
                {/* フィルタ */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Filter className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">種別:</span>
                  {(["全て", "橋梁", "トンネル", "道路", "上下水道"] as (FacilityType | "全て")[]).map((type) => (
                    <Button
                      key={type}
                      variant={typeFilter === type ? "default" : "outline"}
                      size="xs"
                      onClick={() => setTypeFilter(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>

                {/* テーブル */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm" role="table" aria-label="施設一覧">
                    <caption className="sr-only">施設点検一覧</caption>
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2" scope="col">
                          <button
                            type="button"
                            className="flex items-center gap-1 font-medium text-foreground cursor-pointer hover:text-primary"
                            onClick={() => handleSort("name")}
                          >
                            施設名
                            {sortKey === "name" && (
                              <ArrowUpDown className="size-3" />
                            )}
                          </button>
                        </th>
                        <th className="text-left py-2 px-2 font-medium text-foreground" scope="col">種別</th>
                        <th className="text-right py-2 px-2" scope="col">
                          <button
                            type="button"
                            className="flex items-center gap-1 font-medium text-foreground cursor-pointer hover:text-primary ml-auto"
                            onClick={() => handleSort("age")}
                          >
                            築年数
                            {sortKey === "age" && (
                              <ArrowUpDown className="size-3" />
                            )}
                          </button>
                        </th>
                        <th className="text-center py-2 px-2" scope="col">
                          <button
                            type="button"
                            className="flex items-center gap-1 font-medium text-foreground cursor-pointer hover:text-primary mx-auto"
                            onClick={() => handleSort("deterioration")}
                          >
                            劣化度
                            {sortKey === "deterioration" && (
                              <ArrowUpDown className="size-3" />
                            )}
                          </button>
                        </th>
                        <th className="text-center py-2 px-2" scope="col">
                          <button
                            type="button"
                            className="flex items-center gap-1 font-medium text-foreground cursor-pointer hover:text-primary mx-auto"
                            onClick={() => handleSort("grade")}
                          >
                            判定
                            {sortKey === "grade" && (
                              <ArrowUpDown className="size-3" />
                            )}
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFacilities.map((facility) => {
                        const gradeConfig = GRADE_CONFIG[facility.grade];
                        return (
                          <tr key={facility.id} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">{TYPE_ICONS[facility.type]}</span>
                                <span className="font-medium text-foreground">{facility.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <Badge variant="secondary" className="text-xs">
                                {facility.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-right text-foreground">
                              {facility.age}年
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2 justify-center">
                                <div className="w-20">
                                  <Progress
                                    value={facility.deterioration}
                                    className="h-2"
                                    indicatorClassName={DETERIORATION_COLOR(facility.deterioration)}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-8 text-right">
                                  {facility.deterioration}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${gradeConfig.className}`}
                                title={gradeConfig.description}
                              >
                                {facility.grade}: {gradeConfig.label}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-1 text-center text-xs text-muted-foreground sm:hidden">
                  ← 横スクロールで全体を表示 →
                </p>

                {filteredFacilities.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">該当する施設がありません</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 統計タブ */}
          <TabsContent value="stats" className="mt-3">
            <div className="space-y-4">
              {/* 種別ごとの劣化度分布 */}
              <Card className="py-6">
                <CardHeader className="pt-0">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="size-5 text-primary" />
                    種別ごとの平均劣化度
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {typeStats.map((stat) => (
                      <div key={stat.type}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{TYPE_ICONS[stat.type]}</span>
                            <span className="text-sm font-medium text-foreground">{stat.type}</span>
                            <span className="text-xs text-muted-foreground">({stat.count}施設)</span>
                          </div>
                          <span className="text-sm font-medium text-foreground">{stat.avgDeterioration}%</span>
                        </div>
                        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-[width] duration-700 ${DETERIORATION_COLOR(stat.avgDeterioration)}`}
                            style={{ width: `${stat.avgDeterioration}%` }}
                            role="progressbar"
                            aria-valuenow={stat.avgDeterioration}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${stat.type}の平均劣化度: ${stat.avgDeterioration}%`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 築年数別の施設数 */}
              <Card className="py-6">
                <CardHeader className="pt-0">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="size-5 text-primary" />
                    築年数別の施設数
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {ageDistribution.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-sm text-foreground w-20 shrink-0 text-right">{item.label}</span>
                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden relative">
                            <div
                              className="h-full bg-primary/70 rounded-md transition-[width] duration-700 flex items-center justify-end pr-2"
                              style={{ width: `${(item.count / maxAgeCount) * 100}%` }}
                              role="progressbar"
                              aria-valuenow={item.count}
                              aria-valuemin={0}
                              aria-valuemax={maxAgeCount}
                              aria-label={`${item.label}: ${item.count}施設`}
                            >
                              {item.count > 0 && (
                                <span className="text-xs font-medium text-primary-foreground">
                                  {item.count}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 判定分布サマリー */}
              <Card className="py-6">
                <CardHeader className="pt-0">
                  <CardTitle className="text-base">判定分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(["A", "B", "C", "D"] as Grade[]).map((grade) => {
                      const config = GRADE_CONFIG[grade];
                      const count = FACILITIES.filter((f) => f.grade === grade).length;
                      return (
                        <div
                          key={grade}
                          className={`p-4 rounded-lg text-center ${config.bgClass}`}
                        >
                          <p className="text-3xl font-bold">{count}</p>
                          <p className="text-xs mt-1 font-medium">
                            {grade}: {config.label}
                          </p>
                          <p className="text-xs mt-0.5 opacity-75">{config.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DemoLayout>
  );
}

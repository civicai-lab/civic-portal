"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building2,
  Search,
  Calendar,
  Filter,
  Clock,
  User,
  MessageSquare,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { SourceCitation } from "@/components/demo/source-citation";

// --- 型定義 ---

type MeetingType = "本会議" | "委員会" | "全て";
type FiscalYear = "2024" | "2023" | "全て";

interface Speech {
  id: string;
  speaker: string;
  role: string;
  party: string;
  date: string;
  meeting: string;
  text: string;
}

// --- モックデータ ---

const MOCK_SPEECHES: Speech[] = [
  { id: "1", speaker: "田中太郎", role: "議長", party: "無所属", date: "2024-03-15", meeting: "第1回定例会 本会議", text: "本日の議事日程は、お手元に配付のとおりであります。AI活用推進条例について審議いたします。" },
  { id: "2", speaker: "佐藤花子", role: "議員", party: "市民の会", date: "2024-03-15", meeting: "第1回定例会 本会議", text: "AI活用推進条例について質問いたします。住民のプライバシー保護について、具体的な対策をお聞かせください。" },
  { id: "3", speaker: "鈴木一郎", role: "部長", party: "執行部", date: "2024-03-15", meeting: "第1回定例会 本会議", text: "個人情報保護につきましては、AI利用ガイドラインに基づき、PII検出機能を全サービスに実装しております。" },
  { id: "4", speaker: "山田明子", role: "委員長", party: "緑の党", date: "2024-06-20", meeting: "総務委員会", text: "AI導入に関する市民アンケートの結果について報告いたします。賛成68%、反対12%、どちらでもない20%でした。" },
  { id: "5", speaker: "高橋健一", role: "議員", party: "未来創造", date: "2024-06-20", meeting: "総務委員会", text: "AIチャットボットの利用状況について質問します。月間の問い合わせ件数と住民満足度はどのようになっていますか。" },
  { id: "6", speaker: "中村美香", role: "議員", party: "市民の会", date: "2024-09-10", meeting: "第2回定例会 本会議", text: "防災AIガイドの運用実績について報告を求めます。特に災害時の応答精度について確認したい。" },
  { id: "7", speaker: "小林誠", role: "課長", party: "執行部", date: "2024-09-10", meeting: "第2回定例会 本会議", text: "防災AIガイドは運用開始から半年で、約3万件の問い合わせに対応しました。応答精度は92%を維持しています。" },
  { id: "8", speaker: "伊藤裕子", role: "議員", party: "緑の党", date: "2024-12-05", meeting: "第3回定例会 本会議", text: "来年度のAI関連予算について、前年度からの増額の理由と期待される効果を説明してください。" },
];

const ROLE_COLORS: Record<string, string> = {
  "議長": "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
  "委員長": "bg-primary/10 text-primary/90",
  "議員": "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300",
  "部長": "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  "課長": "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
};

const PARTY_COLORS: Record<string, string> = {
  "無所属": "bg-muted text-foreground",
  "市民の会": "bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300",
  "執行部": "bg-slate-100 text-slate-800 dark:bg-slate-950/50 dark:text-slate-300",
  "緑の党": "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  "未来創造": "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
};

const QUICK_SEARCHES = [
  "AI活用",
  "プライバシー",
  "防災",
  "予算",
  "住民満足度",
];

// --- ハイライトユーティリティ ---

function highlightText(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 text-foreground rounded px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// --- タイムラインドット ---

function TimelineDot({ role }: { role: string }) {
  const colorMap: Record<string, string> = {
    "議長": "bg-purple-500",
    "委員長": "bg-primary",
    "議員": "bg-green-500",
    "部長": "bg-amber-500",
    "課長": "bg-orange-500",
  };
  return (
    <div className={`size-3 rounded-full ${colorMap[role] || "bg-muted-foreground"} shrink-0 ring-4 ring-background`} />
  );
}

// --- メインコンポーネント ---

export default function AssemblyArchiveDemoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [meetingFilter, setMeetingFilter] = useState<MeetingType>("全て");
  const [yearFilter, setYearFilter] = useState<FiscalYear>("全て");

  const filteredSpeeches = useMemo(() => {
    let results = MOCK_SPEECHES;

    // キーワードフィルタ
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.text.toLowerCase().includes(q) ||
          s.speaker.toLowerCase().includes(q) ||
          s.meeting.toLowerCase().includes(q)
      );
    }

    // 会議種別フィルタ
    if (meetingFilter !== "全て") {
      results = results.filter((s) =>
        meetingFilter === "本会議" ? s.meeting.includes("本会議") : !s.meeting.includes("本会議")
      );
    }

    // 年度フィルタ
    if (yearFilter !== "全て") {
      results = results.filter((s) => s.date.startsWith(yearFilter));
    }

    return results;
  }, [searchQuery, meetingFilter, yearFilter]);

  // タイムライン用: 日付でグループ化
  const timelineGroups = useMemo(() => {
    const groups: Record<string, Speech[]> = {};
    for (const s of filteredSpeeches) {
      if (!groups[s.date]) groups[s.date] = [];
      groups[s.date].push(s);
    }
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredSpeeches]);

  const handleQuickSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <DemoLayout
      serviceName="議会アーカイブ検索AI"
      serviceIcon={<Building2 className="size-5 text-primary-foreground" />}
      subtitle="議会検索デモ"
      fullHeight
    >
      <div className="flex flex-col h-full gap-3">
        {/* 検索バー + フィルタ */}
        <Card className="py-3 shrink-0">
          <CardContent className="pt-0 pb-0">
            <div className="flex flex-col gap-3">
              {/* 検索入力 */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="議会発言を検索..."
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="議会発言検索"
                  />
                </div>
              </div>

              {/* フィルタ + クイック検索 */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="size-4 text-muted-foreground shrink-0" />

                {/* 会議種別フィルタ */}
                <div className="flex gap-1">
                  {(["全て", "本会議", "委員会"] as MeetingType[]).map((type) => (
                    <Button
                      key={type}
                      variant={meetingFilter === type ? "default" : "outline"}
                      size="xs"
                      onClick={() => setMeetingFilter(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>

                <Separator orientation="vertical" className="h-5" />

                {/* 年度フィルタ */}
                <div className="flex gap-1">
                  {(["全て", "2024", "2023"] as FiscalYear[]).map((year) => (
                    <Button
                      key={year}
                      variant={yearFilter === year ? "default" : "outline"}
                      size="xs"
                      onClick={() => setYearFilter(year)}
                    >
                      {year === "全て" ? "全年度" : `${year}年度`}
                    </Button>
                  ))}
                </div>

                <Separator orientation="vertical" className="h-5" />

                {/* クイック検索 */}
                <div className="flex flex-wrap gap-1">
                  {QUICK_SEARCHES.map((q) => (
                    <Button
                      key={q}
                      variant="ghost"
                      size="xs"
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => handleQuickSearch(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* メインコンテンツ */}
        <Tabs defaultValue="results" className="flex-1 flex flex-col min-h-0">
          <TabsList>
            <TabsTrigger value="results" className="gap-1.5">
              <MessageSquare className="size-4" />
              検索結果 ({filteredSpeeches.length})
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-1.5">
              <Clock className="size-4" />
              タイムライン
            </TabsTrigger>
          </TabsList>

          {/* 検索結果タブ */}
          <TabsContent value="results" className="flex-1 overflow-y-auto mt-3">
            {filteredSpeeches.length === 0 ? (
              <Card className="py-12">
                <CardContent className="text-center">
                  <Search className="size-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">該当する発言が見つかりませんでした</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    キーワードやフィルタ条件を変更してお試しください
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredSpeeches.map((speech) => (
                  <Card key={speech.id} className="py-4 hover:shadow-md transition-shadow">
                    <CardContent className="pt-0 pb-0">
                      {/* 発言者情報 */}
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <div className="flex items-center gap-1.5">
                          <User className="size-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{speech.speaker}</span>
                        </div>
                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${ROLE_COLORS[speech.role] || "bg-muted text-foreground"}`}>
                          {speech.role}
                        </Badge>
                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${PARTY_COLORS[speech.party] || "bg-muted text-foreground"}`}>
                          {speech.party}
                        </Badge>
                      </div>

                      {/* 会議情報 */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="size-3" />
                        <span>{speech.date}</span>
                        <span aria-hidden="true">|</span>
                        <span>{speech.meeting}</span>
                      </div>

                      {/* 発言テキスト */}
                      <div className="text-sm text-foreground leading-relaxed p-3 rounded-lg bg-muted/50">
                        {highlightText(speech.text, searchQuery)}
                      </div>

                      {/* ソース引用 */}
                      <SourceCitation
                        sources={[
                          {
                            title: `${speech.meeting}会議録 ${speech.date}`,
                            type: "内部文書",
                            relevance: 90 + Math.floor(Math.random() * 10),
                          },
                        ]}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* タイムラインタブ */}
          <TabsContent value="timeline" className="flex-1 overflow-y-auto mt-3">
            {timelineGroups.length === 0 ? (
              <Card className="py-12">
                <CardContent className="text-center">
                  <Clock className="size-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">表示する発言がありません</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {timelineGroups.map(([date, speeches]) => (
                  <div key={date}>
                    {/* 日付ヘッダー */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="size-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{date}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {speeches[0].meeting}
                      </Badge>
                    </div>

                    {/* タイムラインエントリ */}
                    <div className="relative ml-4 pl-6 border-l-2 border-border space-y-4">
                      {speeches.map((speech) => (
                        <div key={speech.id} className="relative">
                          {/* ドット */}
                          <div className="absolute -left-[31px] top-2">
                            <TimelineDot role={speech.role} />
                          </div>

                          {/* 発言カード */}
                          <div className="p-3 rounded-lg border border-border bg-card">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="font-medium text-sm text-foreground">{speech.speaker}</span>
                              <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${ROLE_COLORS[speech.role] || ""}`}>
                                {speech.role}
                              </Badge>
                              <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${PARTY_COLORS[speech.party] || ""}`}>
                                {speech.party}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">
                              {highlightText(speech.text, searchQuery)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DemoLayout>
  );
}

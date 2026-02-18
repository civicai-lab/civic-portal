"use client";

import { useState, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Search,
  Copy,
  Check,
  BookOpen,
  FileText,
  ExternalLink,
  Sparkles,
  Quote,
  X,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";
import { ConfidenceIndicator } from "@/components/demo/confidence-indicator";
import { SourceCitation } from "@/components/demo/source-citation";

// --- 型定義 ---

interface PaperData {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume: string;
  citations: number;
  db: "CiNii" | "J-STAGE" | "Google Scholar";
}

type CitationFormat = "APA" | "MLA" | "Chicago" | "BibTeX";

interface ThemeDecomposition {
  original: string;
  subThemes: string[];
}

// --- モック論文データ ---

const MOCK_PAPERS: PaperData[] = [
  { id: "1", title: "自治体におけるAIチャットボット導入の効果分析", authors: ["山田太郎", "佐藤花子"], journal: "情報処理学会論文誌", year: 2024, volume: "65(3)", citations: 12, db: "CiNii" },
  { id: "2", title: "行政サービスのデジタル化と住民満足度の関係", authors: ["田中一郎"], journal: "行政情報システム研究", year: 2023, volume: "42(1)", citations: 8, db: "J-STAGE" },
  { id: "3", title: "地方自治体のAI活用ガイドライン策定に関する考察", authors: ["鈴木美穂", "高橋健"], journal: "地方自治研究", year: 2024, volume: "39(2)", citations: 15, db: "CiNii" },
  { id: "4", title: "RAGを用いた行政文書検索システムの設計と評価", authors: ["中村大輔", "小林真"], journal: "人工知能学会誌", year: 2024, volume: "39(4)", citations: 23, db: "J-STAGE" },
  { id: "5", title: "市民参加型まちづくりにおけるAI活用の可能性", authors: ["吉田明子"], journal: "都市計画学会誌", year: 2023, volume: "58(2)", citations: 5, db: "CiNii" },
  { id: "6", title: "Transformer-based QA Systems for Municipal Services", authors: ["K. Tanaka", "Y. Suzuki"], journal: "AAAI Conference", year: 2024, volume: "38", citations: 31, db: "Google Scholar" },
  { id: "7", title: "公共図書館におけるAIレファレンスサービスの実証実験", authors: ["木村浩二", "渡辺由美"], journal: "図書館情報学研究", year: 2023, volume: "21(1)", citations: 7, db: "CiNii" },
  { id: "8", title: "自治体職員のAIリテラシー向上に関する研究", authors: ["松本健太"], journal: "行政管理研究", year: 2024, volume: "185", citations: 3, db: "J-STAGE" },
];

// --- テーマ分解ロジック ---

const THEME_DECOMPOSITIONS: Record<string, string[]> = {
  "AI 自治体": ["自治体AI導入事例", "行政DX政策", "AI倫理ガイドライン", "住民サービスAI"],
  "図書館 AI": ["AIレファレンス", "蔵書管理自動化", "利用者行動分析", "デジタルアーカイブ"],
  "行政 デジタル": ["行政DX推進", "オンライン申請", "デジタルデバイド対策", "住民満足度"],
  "まちづくり": ["市民参加型計画", "スマートシティ", "地域活性化", "防災まちづくり"],
};

function decomposeTheme(query: string): ThemeDecomposition {
  for (const [key, subThemes] of Object.entries(THEME_DECOMPOSITIONS)) {
    const keywords = key.split(" ");
    if (keywords.every((kw) => query.includes(kw))) {
      return { original: query, subThemes };
    }
  }
  // デフォルトの分解
  return {
    original: query,
    subThemes: [`${query}の現状分析`, `${query}の課題`, `${query}の先行研究`, `${query}の将来展望`],
  };
}

// --- 検索マッチロジック ---

const KEYWORD_PAPER_MAP: Record<string, string[]> = {
  AI: ["1", "3", "4", "5", "6", "7", "8"],
  自治体: ["1", "2", "3", "5", "8"],
  チャットボット: ["1", "6"],
  図書館: ["7"],
  DX: ["2", "8"],
  デジタル: ["2", "8"],
  行政: ["2", "3", "4", "8"],
  RAG: ["4", "6"],
  まちづくり: ["5"],
  ガイドライン: ["3"],
};

function searchPapers(query: string): PaperData[] {
  const matchedIds = new Set<string>();
  for (const [keyword, ids] of Object.entries(KEYWORD_PAPER_MAP)) {
    if (query.includes(keyword)) {
      ids.forEach((id) => matchedIds.add(id));
    }
  }
  if (matchedIds.size === 0) {
    // クエリに合致するものがなければ全件返す
    return MOCK_PAPERS;
  }
  return MOCK_PAPERS.filter((p) => matchedIds.has(p.id)).sort(
    (a, b) => b.citations - a.citations
  );
}

// --- 引用形式生成 ---

function formatCitation(paper: PaperData, format: CitationFormat): string {
  const authorsStr = paper.authors.join(", ");

  switch (format) {
    case "APA":
      return `${authorsStr} (${paper.year}). ${paper.title}. ${paper.journal}, ${paper.volume}.`;
    case "MLA":
      return `${authorsStr}. "${paper.title}." ${paper.journal}, vol. ${paper.volume}, ${paper.year}.`;
    case "Chicago":
      return `${authorsStr}. "${paper.title}." ${paper.journal} ${paper.volume} (${paper.year}).`;
    case "BibTeX": {
      const firstAuthorKey = paper.authors[0].replace(/\s/g, "").toLowerCase();
      return `@article{${firstAuthorKey}${paper.year},\n  author = {${authorsStr}},\n  title = {${paper.title}},\n  journal = {${paper.journal}},\n  volume = {${paper.volume}},\n  year = {${paper.year}}\n}`;
    }
  }
}

// --- 参照元DB情報 ---

const DB_SOURCES = [
  { title: "CiNii Research", type: "外部資料" as const, relevance: 95 },
  { title: "J-STAGE", type: "外部資料" as const, relevance: 90 },
  { title: "Google Scholar", type: "外部資料" as const, relevance: 85 },
];

// --- DB Badge カラー ---

const DB_COLORS: Record<PaperData["db"], string> = {
  CiNii: "bg-primary/10 text-primary/90",
  "J-STAGE": "bg-success/10 text-success dark:bg-success/20",
  "Google Scholar": "bg-chart-5/10 text-chart-5 dark:bg-chart-5/20",
};

// --- 引用モーダルコンポーネント ---

function CitationModal({
  paper,
  onClose,
}: {
  paper: PaperData;
  onClose: () => void;
}) {
  const [copiedFormat, setCopiedFormat] = useState<CitationFormat | null>(null);

  const handleCopy = useCallback(
    async (format: CitationFormat) => {
      const text = formatCitation(paper, format);
      try {
        await navigator.clipboard.writeText(text);
        setCopiedFormat(format);
        setTimeout(() => setCopiedFormat(null), 2000);
      } catch {
        // フォールバック: クリップボードAPIが使えない場合
        setCopiedFormat(null);
      }
    },
    [paper]
  );

  const FORMATS: CitationFormat[] = ["APA", "MLA", "Chicago", "BibTeX"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="引用形式選択"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg py-0"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Quote className="size-4 text-primary" />
              引用形式
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={onClose}
              aria-label="閉じる"
            >
              <X className="size-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground truncate mt-1">
            {paper.title}
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Tabs defaultValue="APA">
            <TabsList className="w-full">
              {FORMATS.map((f) => (
                <TabsTrigger key={f} value={f} className="text-xs flex-1">
                  {f}
                </TabsTrigger>
              ))}
            </TabsList>
            {FORMATS.map((format) => (
              <TabsContent key={format} value={format}>
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <pre className="text-xs text-foreground whitespace-pre-wrap break-all font-mono leading-relaxed">
                    {formatCitation(paper, format)}
                  </pre>
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1.5"
                    onClick={() => handleCopy(format)}
                    aria-label={`${format}形式の引用をコピー`}
                  >
                    {copiedFormat === format ? (
                      <>
                        <Check className="size-3.5" />
                        コピー済み
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        コピー
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// --- 論文カードコンポーネント ---

function PaperCard({
  paper,
  onCite,
}: {
  paper: PaperData;
  onCite: (paper: PaperData) => void;
}) {
  const dbColor = DB_COLORS[paper.db];

  return (
    <Card className="py-3 hover:shadow-md transition-shadow">
      <CardContent className="pb-0">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-sm text-foreground leading-snug">
            {paper.title}
          </h4>
          <p className="text-xs text-muted-foreground">
            {paper.authors.join(", ")}
          </p>
          <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
            <span>{paper.journal}</span>
            <span>({paper.year})</span>
            <span>Vol. {paper.volume}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={`text-xs ${dbColor}`}>
                {paper.db}
              </Badge>
              <Badge variant="outline" className="text-xs gap-1">
                <FileText className="size-3" />
                被引用 {paper.citations}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 px-2.5 gap-1"
                onClick={() => onCite(paper)}
                aria-label={`「${paper.title}」の引用形式を表示`}
              >
                <Quote className="size-3" />
                引用
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs h-7 px-2"
                aria-label={`「${paper.title}」を外部で開く`}
              >
                <ExternalLink className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- メインコンポーネント ---

export default function ShioriAcademicDemoPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PaperData[] | null>(null);
  const [themeDecomposition, setThemeDecomposition] = useState<ThemeDecomposition | null>(null);
  const [citationPaper, setCitationPaper] = useState<PaperData | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    (searchQuery?: string) => {
      const q = searchQuery || query.trim();
      if (!q || isSearching) return;

      setQuery(q);
      setIsSearching(true);
      setSearchResults(null);
      setThemeDecomposition(null);

      // テーマ分解をシミュレート
      setTimeout(() => {
        const decomposition = decomposeTheme(q);
        setThemeDecomposition(decomposition);

        // 検索結果をシミュレート
        setTimeout(() => {
          const results = searchPapers(q);
          setSearchResults(results);
          setIsSearching(false);
        }, 800);
      }, 500);
    },
    [query, isSearching]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  // サンプル検索テーマ
  const SAMPLE_THEMES = [
    "AI 自治体",
    "図書館 AI",
    "行政 デジタル",
    "まちづくり",
  ];

  return (
    <DemoLayout
      serviceName="SHIORI Academic"
      serviceIcon={<GraduationCap className="size-5 text-primary-foreground" />}
      subtitle="学術検索デモ"
    >
      {/* 検索バー */}
      <Card className="mb-4 py-4">
        <CardContent className="pb-0">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="研究テーマを入力してください（例: AI 自治体）"
                  className="w-full rounded-full border border-input bg-background pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={isSearching}
                  aria-label="研究テーマ検索"
                />
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={!query.trim() || isSearching}
                className="shrink-0 gap-1.5 transition-transform active:scale-90"
                aria-label="検索を実行"
              >
                <Search className="size-4" />
                検索
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground self-center">
                サンプル:
              </span>
              {SAMPLE_THEMES.map((theme) => (
                <Button
                  key={theme}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1 px-2.5"
                  onClick={() => {
                    setQuery(theme);
                    handleSearch(theme);
                  }}
                  disabled={isSearching}
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* テーマ分解パネル */}
      {themeDecomposition && (
        <Card className="mb-4 py-4">
          <CardHeader className="pb-2 pt-0">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              テーマ分解
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">
                入力テーマ「{themeDecomposition.original}」を以下のサブテーマに分解しました:
              </p>
              <div className="flex flex-wrap gap-2">
                {themeDecomposition.subThemes.map((sub, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-xs py-1 px-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => {
                      setQuery(sub);
                      handleSearch(sub);
                    }}
                    role="button"
                    aria-label={`「${sub}」で検索`}
                  >
                    {sub}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 検索中インジケーター */}
      {isSearching && (
        <Card className="mb-4 py-6">
          <CardContent className="flex flex-col items-center gap-3 pb-0">
            <div className="flex gap-1.5" role="status" aria-label="応答を生成中">
              <span className="size-2.5 bg-primary/40 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="size-2.5 bg-primary/40 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="size-2.5 bg-primary/40 rounded-full motion-safe:animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-sm text-muted-foreground">
              学術データベースを検索中...
            </p>
          </CardContent>
        </Card>
      )}

      {/* 検索結果 */}
      {searchResults && (
        <div className="space-y-4">
          {/* 結果ヘッダー */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              検索結果: {searchResults.length}件
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">被引用数順</span>
            </div>
          </div>

          {/* 信頼度 + ソース引用 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <ConfidenceIndicator
              confidence={searchResults.length > 3 ? 90 : 72}
              showEscalation={false}
            />
            <SourceCitation sources={DB_SOURCES} defaultExpanded />
          </div>

          {/* 論文カード一覧 */}
          <div className="space-y-3">
            {searchResults.map((paper, index) => (
              <div key={paper.id} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300" style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}>
                <PaperCard
                  paper={paper}
                  onCite={setCitationPaper}
                />
              </div>
            ))}
          </div>

          {/* 検索結果がない場合 */}
          {searchResults.length === 0 && (
            <Card className="py-8">
              <CardContent className="flex flex-col items-center gap-2 pb-0">
                <BookOpen className="size-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  該当する論文が見つかりませんでした
                </p>
                <p className="text-xs text-muted-foreground">
                  キーワードを変えてお試しください
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* 初期状態（検索前） */}
      {!searchResults && !isSearching && (
        <Card className="py-8">
          <CardContent className="flex flex-col items-center gap-3 pb-0">
            <GraduationCap className="size-12 text-muted-foreground/30" />
            <h2 className="text-lg font-semibold text-foreground">
              SHIORI Academic
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              研究テーマを入力すると、関連する学術論文を検索し、
              テーマ分解や引用形式の自動生成を行います。
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">CiNii</Badge>
              <Badge variant="outline" className="text-xs">J-STAGE</Badge>
              <Badge variant="outline" className="text-xs">Google Scholar</Badge>
            </div>
          </CardContent>
          <CardFooter className="justify-center pt-4">
            <p className="text-xs text-muted-foreground">
              上部のサンプルテーマから検索をお試しください
            </p>
          </CardFooter>
        </Card>
      )}

      {/* 引用モーダル */}
      {citationPaper && (
        <CitationModal
          paper={citationPaper}
          onClose={() => setCitationPaper(null)}
        />
      )}
    </DemoLayout>
  );
}

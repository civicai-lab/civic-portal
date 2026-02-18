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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  Search,
  GitCompareArrows,
  PenTool,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Copy,
  RotateCcw,
} from "lucide-react";
import { DemoLayout } from "@/components/demo/demo-layout";

// --- 型定義 ---

type SectionStatus = "あり" | "なし" | "部分的";

interface ComparisonRow {
  section: string;
  self: SectionStatus;
  cityA: SectionStatus;
  cityB: SectionStatus;
  national: SectionStatus;
}

interface AnalysisSection {
  name: string;
  status: "complete" | "partial" | "missing";
  detail: string;
}

// --- モックデータ ---

const COMPARISON: ComparisonRow[] = [
  { section: "目的", self: "あり", cityA: "あり", cityB: "あり", national: "あり" },
  { section: "適用範囲", self: "あり", cityA: "あり", cityB: "部分的", national: "あり" },
  { section: "用語定義", self: "部分的", cityA: "あり", cityB: "なし", national: "あり" },
  { section: "利用可能なAI", self: "なし", cityA: "あり", cityB: "あり", national: "あり" },
  { section: "禁止事項", self: "なし", cityA: "あり", cityB: "あり", national: "あり" },
  { section: "個人情報保護", self: "あり", cityA: "あり", cityB: "あり", national: "あり" },
  { section: "監査・評価", self: "なし", cityA: "部分的", cityB: "なし", national: "あり" },
  { section: "教育・研修", self: "部分的", cityA: "あり", cityB: "なし", national: "あり" },
];

const MOCK_ANALYSIS_RESULT: AnalysisSection[] = [
  { name: "目的", status: "complete", detail: "AI利活用の目的が明確に記載されています。" },
  { name: "適用範囲", status: "complete", detail: "対象者・対象業務の範囲が定義されています。" },
  { name: "用語定義", status: "partial", detail: "主要な用語は定義されていますが、「生成AI」「機械学習」の定義が不十分です。" },
  { name: "利用可能なAI", status: "missing", detail: "具体的に利用可能なAIサービスの一覧が記載されていません。" },
  { name: "禁止事項", status: "missing", detail: "禁止される利用方法やデータの取扱いに関する記載がありません。" },
  { name: "個人情報保護", status: "complete", detail: "個人情報保護法に準拠した取扱いルールが記載されています。" },
  { name: "監査・評価", status: "missing", detail: "AI利用の監査体制や評価基準が未設定です。" },
  { name: "教育・研修", status: "partial", detail: "基礎研修の記載はありますが、継続的な研修計画が不十分です。" },
];

const SAMPLE_GUIDELINE_TEXT = `第1条（目的）
本ガイドラインは、当自治体におけるAI（人工知能）の利活用に関する基本的な方針を定め、行政サービスの向上と業務効率化を図ることを目的とする。

第2条（適用範囲）
本ガイドラインは、当自治体の全ての部署及び職員に適用する。外部委託先がAIを利用する場合も準用する。

第3条（用語定義）
「AI」とは、人間の知的行動をコンピュータにより再現する技術の総称をいう。

第4条（個人情報保護）
AIの利用にあたっては、個人情報の保護に関する法律及び当自治体の個人情報保護条例を遵守しなければならない。

第5条（研修）
所属長は、職員に対してAIリテラシーに関する基礎研修の機会を設けるものとする。`;

const TEMPLATE_OPTIONS = [
  { id: "basic", label: "基本テンプレート", description: "最低限必要な項目を網羅した簡潔なガイドライン" },
  { id: "detailed", label: "詳細テンプレート", description: "全セクションを網羅した包括的なガイドライン" },
  { id: "simple", label: "簡易テンプレート", description: "すぐに導入できる最小構成のガイドライン" },
];

const DRAFT_TEMPLATES: Record<string, string> = {
  basic: `# AI利活用ガイドライン（基本版）

## 第1章 総則

### 第1条（目的）
本ガイドラインは、○○市におけるAI（人工知能）の利活用に関する基本方針を定め、
行政サービスの質的向上及び業務効率化を推進することを目的とする。

### 第2条（適用範囲）
本ガイドラインは、○○市の全部署及び全職員に適用する。
業務委託先がAIを利用する場合にも準用する。

### 第3条（定義）
(1) 「AI」とは、機械学習、深層学習、自然言語処理等の技術を用いて、
    人間の知的行動を模倣・支援するシステムをいう。
(2) 「生成AI」とは、テキスト、画像、音声等のコンテンツを自動生成するAIをいう。

## 第2章 利用原則

### 第4条（基本原則）
AI利活用にあたっては、以下の原則を遵守する。
(1) 透明性：AIの利用状況を住民に説明できるようにする
(2) 公平性：特定の属性による差別的取扱いを行わない
(3) 安全性：情報セキュリティを確保する
(4) 責任性：最終的な判断は人間が行う

### 第5条（利用可能なAIサービス）
業務利用が認められるAIサービスは、情報政策課が別途定める
「承認済みAIサービスリスト」に記載されたものとする。

## 第3章 禁止事項

### 第6条（禁止事項）
以下の行為を禁止する。
(1) 個人情報をAIに入力すること（匿名化処理を行った場合を除く）
(2) 機密情報をAIに入力すること
(3) AIの出力を無検証のまま公式文書として使用すること
(4) 承認されていないAIサービスを業務に使用すること

## 第4章 監査・評価

### 第7条（監査）
情報政策課は、年1回以上、AI利用状況の監査を実施する。

### 第8条（評価・見直し）
本ガイドラインは、技術動向及び利用状況を踏まえ、年1回以上見直しを行う。`,

  detailed: `# AI利活用ガイドライン（詳細版）

## 第1章 総則

### 第1条（目的）
本ガイドラインは、○○市における人工知能（AI）技術の利活用に関する
包括的な方針を定め、以下の目標の達成を図ることを目的とする。
(1) 住民サービスの質的向上
(2) 行政業務の効率化・高度化
(3) データに基づく政策立案の推進
(4) 職員のデジタルリテラシー向上

### 第2条（適用範囲）
1. 本ガイドラインは、○○市の全部署、全職員（非常勤を含む）に適用する。
2. 指定管理者及び業務委託先がAIを利用する場合にも準用する。
3. 住民向けAIサービスの提供に関しても本ガイドラインに従う。

### 第3条（定義）
本ガイドラインにおける用語の定義は以下のとおりとする。
(1) 「AI」機械学習、深層学習、自然言語処理、画像認識等を用いたシステム
(2) 「生成AI」テキスト、画像、音声、動画等を自動生成するAI
(3) 「AIリスクアセスメント」AI導入に伴うリスク評価のプロセス
(4) 「PII」個人を識別できる情報（Personally Identifiable Information）

## 第2章 利用原則と倫理

### 第4条（基本原則）
(1) 透明性 (2) 公平性 (3) 安全性 (4) 責任性 (5) プライバシー保護

### 第5条（倫理基準）
AIの利用にあたっては、人権の尊重、差別の禁止、
住民の尊厳の保持を最優先とする。

[... 以下、詳細な条文が続きます ...]`,

  simple: `# AI利用ルール（簡易版）

## 基本ルール

1. **使っていいAI**: 情報政策課が承認したサービスのみ
2. **入力してはいけない情報**: 個人情報、機密情報
3. **必ず確認**: AIの出力は必ず人間がチェックしてから使用
4. **報告義務**: 問題が発生したら情報政策課へ即時報告

## 利用手順

1. 承認済みAIサービスリストを確認
2. 入力データに個人情報が含まれないことを確認
3. AIの出力結果を確認・修正
4. 必要に応じて上長の承認を得る

## 困ったときは

情報政策課 AI推進担当（内線1234）`,
};

// --- 比較テーブルのステータス表示 ---

function StatusCell({ status }: { status: SectionStatus }) {
  const config: Record<SectionStatus, { className: string; label: string }> = {
    "あり": { className: "bg-success/15 text-success", label: "あり" },
    "なし": { className: "bg-destructive/15 text-destructive", label: "なし" },
    "部分的": { className: "bg-warning/15 text-warning-foreground", label: "部分的" },
  };
  const c = config[status];
  return (
    <Badge variant="secondary" className={`text-xs ${c.className}`}>
      {c.label}
    </Badge>
  );
}

function AnalysisStatusIcon({ status }: { status: AnalysisSection["status"] }) {
  switch (status) {
    case "complete":
      return <CheckCircle2 className="size-5 text-success" aria-label="完了" />;
    case "partial":
      return <AlertTriangle className="size-5 text-warning-foreground" aria-label="不十分" />;
    case "missing":
      return <XCircle className="size-5 text-destructive" aria-label="欠落" />;
  }
}

function AnalysisStatusBadge({ status }: { status: AnalysisSection["status"] }) {
  const config: Record<AnalysisSection["status"], { className: string; label: string }> = {
    complete: { className: "bg-success/15 text-success", label: "記載あり" },
    partial: { className: "bg-warning/15 text-warning-foreground", label: "不十分" },
    missing: { className: "bg-destructive/15 text-destructive", label: "欠落" },
  };
  const c = config[status];
  return (
    <Badge variant="secondary" className={`text-xs ${c.className}`}>
      {c.label}
    </Badge>
  );
}

// --- メインコンポーネント ---

export default function GuidelineServiceDemoPage() {
  const [analysisInput, setAnalysisInput] = useState(SAMPLE_GUIDELINE_TEXT);
  const [analysisResult, setAnalysisResult] = useState<AnalysisSection[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!analysisInput.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setAnalysisResult(MOCK_ANALYSIS_RESULT);
      setIsAnalyzing(false);
    }, 1200);
  }, [analysisInput]);

  const handleGenerateDraft = useCallback(() => {
    if (!selectedTemplate) return;
    setIsGenerating(true);
    setDraftGenerated(false);
    setTimeout(() => {
      setDraftGenerated(true);
      setIsGenerating(false);
    }, 1500);
  }, [selectedTemplate]);

  const handleCopyDraft = useCallback(() => {
    if (selectedTemplate && DRAFT_TEMPLATES[selectedTemplate]) {
      navigator.clipboard.writeText(DRAFT_TEMPLATES[selectedTemplate]);
    }
  }, [selectedTemplate]);

  const completeSections = MOCK_ANALYSIS_RESULT.filter((s) => s.status === "complete").length;
  const partialSections = MOCK_ANALYSIS_RESULT.filter((s) => s.status === "partial").length;
  const missingSections = MOCK_ANALYSIS_RESULT.filter((s) => s.status === "missing").length;

  return (
    <DemoLayout
      serviceName="AI利用ガイドライン策定支援"
      serviceIcon={<FileText className="size-5 text-primary-foreground" />}
      subtitle="ガイドライン策定デモ"
    >
      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="analysis" className="flex-1 gap-1.5">
            <Search className="size-4" />
            分析
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex-1 gap-1.5">
            <GitCompareArrows className="size-4" />
            比較
          </TabsTrigger>
          <TabsTrigger value="draft" className="flex-1 gap-1.5">
            <PenTool className="size-4" />
            ドラフト
          </TabsTrigger>
        </TabsList>

        {/* --- 分析タブ --- */}
        <TabsContent value="analysis" className="animate-tab-fade-in">
          <div className="space-y-4">
            <Card className="py-6">
              <CardHeader className="pt-0">
                <CardTitle className="text-base flex items-center gap-2">
                  <Search className="size-5 text-primary" />
                  ガイドライン構造分析
                </CardTitle>
                <CardDescription>
                  既存のガイドライン文書を貼り付けて、構造を分析します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={analysisInput}
                  onChange={(e) => setAnalysisInput(e.target.value)}
                  placeholder="ガイドライン文書のテキストを貼り付けてください..."
                  className="w-full h-48 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  aria-label="ガイドライン文書入力"
                />
                <div className="flex justify-end mt-3">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !analysisInput.trim()}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        分析中...
                      </>
                    ) : (
                      <>
                        <Search className="size-4" />
                        分析する
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 分析結果 */}
            {analysisResult && (
              <Card className="py-6">
                <CardHeader className="pt-0">
                  <CardTitle className="text-base">分析結果</CardTitle>
                  <CardDescription>
                    <span className="inline-flex items-center gap-4 flex-wrap">
                      <span className="text-success">記載あり: {completeSections}件</span>
                      <span className="text-warning-foreground">不十分: {partialSections}件</span>
                      <span className="text-destructive">欠落: {missingSections}件</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.map((section) => (
                      <div
                        key={section.name}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border"
                      >
                        <AnalysisStatusIcon status={section.status} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{section.name}</span>
                            <AnalysisStatusBadge status={section.status} />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{section.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* --- 比較タブ --- */}
        <TabsContent value="compare" className="animate-tab-fade-in">
          <Card className="py-6">
            <CardHeader className="pt-0">
              <CardTitle className="text-base flex items-center gap-2">
                <GitCompareArrows className="size-5 text-primary" />
                他自治体ガイドラインとの比較
              </CardTitle>
              <CardDescription>
                自団体のガイドラインを他自治体・国のガイドラインと比較します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm" role="table" aria-label="ガイドライン比較表">
                  <caption className="sr-only">ガイドライン比較表</caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-foreground" scope="col">セクション</th>
                      <th className="text-center py-3 px-2 font-medium text-foreground" scope="col">自団体</th>
                      <th className="text-center py-3 px-2 font-medium text-foreground" scope="col">A市</th>
                      <th className="text-center py-3 px-2 font-medium text-foreground" scope="col">B市</th>
                      <th className="text-center py-3 px-2 font-medium text-foreground" scope="col">国ガイドライン</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.section} className="border-b border-border last:border-b-0">
                        <td className="py-3 px-2 font-medium text-foreground">{row.section}</td>
                        <td className="py-3 px-2 text-center"><StatusCell status={row.self} /></td>
                        <td className="py-3 px-2 text-center"><StatusCell status={row.cityA} /></td>
                        <td className="py-3 px-2 text-center"><StatusCell status={row.cityB} /></td>
                        <td className="py-3 px-2 text-center"><StatusCell status={row.national} /></td>
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

              <Separator className="my-4" />

              {/* サマリー */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-success/10 text-center">
                  <p className="text-2xl font-bold text-success">
                    {COMPARISON.filter((r) => r.self === "あり").length}
                  </p>
                  <p className="text-xs text-success mt-1">記載あり</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10 text-center">
                  <p className="text-2xl font-bold text-warning-foreground">
                    {COMPARISON.filter((r) => r.self === "部分的").length}
                  </p>
                  <p className="text-xs text-warning-foreground mt-1">部分的</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10 text-center">
                  <p className="text-2xl font-bold text-destructive">
                    {COMPARISON.filter((r) => r.self === "なし").length}
                  </p>
                  <p className="text-xs text-destructive mt-1">未記載</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ドラフトタブ --- */}
        <TabsContent value="draft" className="animate-tab-fade-in">
          <div className="space-y-4">
            <Card className="py-6">
              <CardHeader className="pt-0">
                <CardTitle className="text-base flex items-center gap-2">
                  <PenTool className="size-5 text-primary" />
                  ドラフト生成
                </CardTitle>
                <CardDescription>
                  テンプレートを選択して、ガイドラインのドラフトを生成します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {TEMPLATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedTemplate(opt.id);
                        setDraftGenerated(false);
                      }}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-[border-color,background-color] cursor-pointer ${
                        selectedTemplate === opt.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      aria-pressed={selectedTemplate === opt.id}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleGenerateDraft}
                    disabled={!selectedTemplate || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <PenTool className="size-4" />
                        ドラフト生成
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 生成結果 */}
            {draftGenerated && selectedTemplate && (
              <Card className="py-6">
                <CardHeader className="pt-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">生成結果</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopyDraft}>
                        <Copy className="size-4" />
                        コピー
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDraftGenerated(false);
                          setSelectedTemplate(null);
                        }}
                      >
                        <RotateCcw className="size-4" />
                        リセット
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 max-h-[500px] overflow-y-auto">
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                      {DRAFT_TEMPLATES[selectedTemplate]}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DemoLayout>
  );
}

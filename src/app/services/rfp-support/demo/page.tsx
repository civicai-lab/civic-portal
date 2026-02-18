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
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  FileText,
  CheckSquare,
  HelpCircle,
  Download,
} from "lucide-react";

// ---- データ ----

const SERVICE_TYPES = ["AI開発", "システム構築", "コンサルティング", "保守運用"];
const CONTRACT_PERIODS = ["1年", "2年", "3年", "5年"];

const CHECKLIST = [
  { id: "f1", cat: "機能要件", text: "AIモデルの推論精度要件（目標値）を記載", checked: false },
  { id: "f2", cat: "機能要件", text: "対応言語・多言語要件を記載", checked: false },
  { id: "f3", cat: "機能要件", text: "API仕様・インターフェース要件を記載", checked: false },
  { id: "f4", cat: "機能要件", text: "データ入出力フォーマットを記載", checked: false },
  { id: "f5", cat: "機能要件", text: "ユーザー管理・認証要件を記載", checked: false },
  { id: "n1", cat: "非機能要件", text: "レスポンスタイム（目標: 3秒以内）", checked: false },
  { id: "n2", cat: "非機能要件", text: "可用性（目標: 99.5%以上）", checked: false },
  { id: "n3", cat: "非機能要件", text: "同時接続ユーザー数", checked: false },
  { id: "n4", cat: "非機能要件", text: "データバックアップ方針", checked: false },
  { id: "n5", cat: "非機能要件", text: "障害復旧時間（RTO/RPO）", checked: false },
  { id: "s1", cat: "セキュリティ", text: "ISMAP認定またはISO27001取得", checked: false },
  { id: "s2", cat: "セキュリティ", text: "個人情報保護法対応", checked: false },
  { id: "s3", cat: "セキュリティ", text: "データ暗号化（通信・保存）", checked: false },
  { id: "o1", cat: "運用保守", text: "SLA定義（応答時間・解決時間）", checked: false },
  { id: "o2", cat: "運用保守", text: "研修・教育プログラム", checked: false },
];

const CATEGORIES = ["機能要件", "非機能要件", "セキュリティ", "運用保守"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "機能要件": "bg-primary/10 text-primary/90",
  "非機能要件": "bg-chart-5/10 text-chart-5 dark:bg-chart-5/20",
  "セキュリティ": "bg-destructive/10 text-destructive dark:bg-destructive/20",
  "運用保守": "bg-success/10 text-success dark:bg-success/20",
};

const RFP_SECTIONS = [
  {
    title: "1. 概要",
    content: "本調達は、○○市におけるAI活用基盤の構築を目的とし、住民サービスの高度化および業務効率化を実現するためのシステム開発・導入を行うものである。",
  },
  {
    title: "2. 目的",
    content: "行政事務の効率化とデータ駆動型の政策立案を推進し、市民満足度の向上と職員の業務負荷軽減を同時に達成する。導入後3年以内に対象業務の処理時間30%削減を目標とする。",
  },
  {
    title: "3. 機能要件",
    content: "自然言語処理によるFAQ自動応答機能、文書要約機能、多言語対応（日・英・中・韓）、ユーザー認証・権限管理機能、API連携インターフェース、ダッシュボード機能を実装すること。",
  },
  {
    title: "4. 非機能要件",
    content: "レスポンスタイム3秒以内、可用性99.5%以上、同時接続100ユーザー対応、日次バックアップ、RTO: 4時間 / RPO: 1時間を満たすこと。",
  },
  {
    title: "5. セキュリティ要件",
    content: "ISMAP認定またはISO27001取得済みのクラウド環境を使用すること。個人情報保護法に準拠したデータ管理体制を構築し、通信および保存データの暗号化を実施すること。",
  },
  {
    title: "6. 評価基準",
    content: "技術力（30%）、実績（20%）、価格（25%）、運用保守体制（15%）、提案内容（10%）の配点で総合評価を行う。",
  },
  {
    title: "7. スケジュール",
    content: "提案書提出: 2026年4月末、ベンダー選定: 2026年5月、要件定義: 2026年6-7月、開発: 2026年8-12月、テスト: 2027年1-2月、本番稼働: 2027年4月。",
  },
];

const VENDOR_QUESTIONS = [
  { no: 1, category: "会社概要", question: "AI関連プロジェクトの実績件数と代表的な事例を記載してください" },
  { no: 2, category: "会社概要", question: "情報セキュリティに関する認証取得状況を記載してください" },
  { no: 3, category: "技術", question: "使用するAIモデルの種類とバージョン、カスタマイズ方針を記載してください" },
  { no: 4, category: "技術", question: "学習データの管理方法とモデル再学習のプロセスを説明してください" },
  { no: 5, category: "技術", question: "他システムとのAPI連携実績と技術的なアプローチを記載してください" },
  { no: 6, category: "運用体制", question: "保守運用チームの体制（人数・資格）を記載してください" },
  { no: 7, category: "運用体制", question: "障害発生時のエスカレーションフローを記載してください" },
  { no: 8, category: "運用体制", question: "SLAの具体的な内容（応答時間・解決時間・ペナルティ）を提示してください" },
  { no: 9, category: "コスト", question: "初期導入費用・月額運用費用・ライセンス費用の内訳を提示してください" },
  { no: 10, category: "コスト", question: "追加開発・カスタマイズが発生した場合の費用算定基準を記載してください" },
];

// ---- ステップ定義 ----

const STEPS = [
  { label: "調達概要" },
  { label: "要件チェック" },
  { label: "RFPドラフト" },
  { label: "質問票" },
];

// ---- メインコンポーネント ----

export default function RfpSupportDemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  // Step 1
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [budget, setBudget] = useState("");
  const [contractPeriod, setContractPeriod] = useState<string | null>(null);

  // Step 2
  const [checklist, setChecklist] = useState(CHECKLIST.map((item) => ({ ...item })));

  const toggleCheck = useCallback((id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }, []);

  const checkedCount = checklist.filter((item) => item.checked).length;

  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, 3));
    setFadeKey((k) => k + 1);
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
    setFadeKey((k) => k + 1);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setFadeKey((k) => k + 1);
    setServiceType(null);
    setBudget("");
    setContractPeriod(null);
    setChecklist(CHECKLIST.map((item) => ({ ...item })));
  }, []);

  const canNext = () => {
    if (currentStep === 0) return serviceType !== null && contractPeriod !== null;
    return true;
  };

  return (
    <DemoLayout
      serviceName="RFP作成支援AI"
      serviceSlug="rfp-support"
      serviceIcon={<ClipboardList className="size-5 text-primary-foreground" />}
      subtitle="RFP作成デモ"
    >
      {/* 初期ガイダンス */}
      <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm font-medium text-primary mb-1">このデモの使い方</p>
        <p className="text-sm text-muted-foreground">
          ステップに沿って必要事項を入力し、チェックリストでRFPの完成度を確認できます。
        </p>
      </div>

      {/* ステップインジケーター */}
      <div className="bg-card rounded-lg py-6 px-4 mb-6 border">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </div>

      {/* コンテンツ */}
      <div key={fadeKey} className="animate-page-enter">
        {/* Step 1: 調達概要 */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">調達概要を入力</h2>

            <Card>
              <CardContent className="space-y-6">
                {/* サービス種別 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    サービス種別 <span className="text-destructive">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_TYPES.map((type) => (
                      <Button
                        key={type}
                        variant={serviceType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setServiceType(type)}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 予算 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">予算規模</label>
                  <input
                    type="text"
                    placeholder="例: 500万円"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full max-w-xs rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-[3px] focus:ring-primary/20"
                  />
                </div>

                <Separator />

                {/* 契約期間 */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    契約期間 <span className="text-destructive">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CONTRACT_PERIODS.map((period) => (
                      <Button
                        key={period}
                        variant={contractPeriod === period ? "default" : "outline"}
                        size="sm"
                        onClick={() => setContractPeriod(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: 要件チェックリスト */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-bold text-foreground">要件チェックリスト</h2>
              <Badge variant="outline" className="text-sm">
                <CheckSquare className="size-3.5 mr-1" />
                {checkedCount} / {checklist.length} 完了
              </Badge>
            </div>

            {CATEGORIES.map((cat) => {
              const items = checklist.filter((item) => item.cat === cat);
              const catChecked = items.filter((i) => i.checked).length;
              return (
                <Card key={cat} className="transition-shadow duration-300 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge className={CATEGORY_COLORS[cat]}>{cat}</Badge>
                      </CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {catChecked}/{items.length}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleCheck(item.id)}
                            className="mt-0.5 size-4 rounded accent-primary shrink-0"
                          />
                          <span
                            className={`text-sm transition-colors ${
                              item.checked
                                ? "text-muted-foreground line-through"
                                : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Step 3: RFPドラフト */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-bold text-foreground">RFPドラフト</h2>
              <Badge variant="secondary" className="text-sm">
                <FileText className="size-3.5 mr-1" />
                AI生成
              </Badge>
            </div>

            <Card className="border-success/30 transition-shadow duration-300 hover:shadow-lg">
              <CardHeader className="bg-success/5 rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-success/10 rounded-full p-1.5">
                    <CheckSquare className="size-5 text-success" />
                  </span>
                  ○○市 {serviceType || "AI開発"}業務委託 提案依頼書（RFP）
                </CardTitle>
                <CardDescription>
                  予算: {budget || "未定"} | 契約期間: {contractPeriod || "未定"} | チェック完了率: {Math.round((checkedCount / checklist.length) * 100)}%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {RFP_SECTIONS.map((section, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-primary mb-2">{section.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/80">{section.content}</p>
                    {i < RFP_SECTIONS.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: ベンダー質問票 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-bold text-foreground">ベンダー質問票</h2>
              <Button variant="cta" size="sm" className="gap-1.5">
                <Download className="size-4" />
                ダウンロード
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="size-5 text-primary" />
                  提案依頼に関する質問項目
                </CardTitle>
                <CardDescription>
                  下記の各項目について、提案書内で回答をお願いいたします
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* テーブル */}
                <div className="relative">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm" role="table">
                    <caption className="sr-only">ベンダー質問票一覧</caption>
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left py-3 px-3 font-semibold w-12">No</th>
                        <th className="text-left py-3 px-3 font-semibold w-28">カテゴリ</th>
                        <th className="text-left py-3 px-3 font-semibold">質問内容</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VENDOR_QUESTIONS.map((q) => (
                        <tr key={q.no} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-3 text-muted-foreground">{q.no}</td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className="text-xs">
                              {q.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 text-foreground">{q.question}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent md:hidden" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* ナビゲーション */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={goBack} disabled={currentStep === 0}>
            <ArrowLeft className="size-4" />
            戻る
          </Button>
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
            <RotateCcw className="size-4" />
            最初からやり直す
          </Button>
        </div>
        {currentStep < 3 && (
          <Button variant="default" onClick={goNext} disabled={!canNext()}>
            次へ
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </DemoLayout>
  );
}

"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { DemoLayout } from "@/components/demo/demo-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Dumbbell,
  BookOpen,
  Baby,
  Palette,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Users,
  Accessibility,
  JapaneseYen,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";

// ---- 型定義 ----

type Purpose = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

type Facility = {
  id: string;
  name: string;
  address: string;
  price: string;
  availability: "available" | "few" | "full";
  features: string[];
};

// ---- データ ----

const purposes: Purpose[] = [
  {
    id: "meeting",
    label: "会議室",
    description: "研修・セミナー・打合せなど",
    icon: <Building2 className="size-8" />,
  },
  {
    id: "sports",
    label: "スポーツ",
    description: "体育館・プール・グラウンドなど",
    icon: <Dumbbell className="size-8" />,
  },
  {
    id: "library",
    label: "図書",
    description: "読書・学習スペースなど",
    icon: <BookOpen className="size-8" />,
  },
  {
    id: "childcare",
    label: "子育て",
    description: "子育て支援・親子教室など",
    icon: <Baby className="size-8" />,
  },
  {
    id: "culture",
    label: "文化活動",
    description: "音楽・演劇・美術など",
    icon: <Palette className="size-8" />,
  },
  {
    id: "other",
    label: "その他",
    description: "上記に当てはまらない利用",
    icon: <MoreHorizontal className="size-8" />,
  },
];

const areas = ["中央区", "北区", "南区", "東区", "西区"];

const mockFacilities: Facility[] = [
  {
    id: "f1",
    name: "中央市民センター 大会議室",
    address: "中央区本町1-2-3",
    price: "1,500円/時間",
    availability: "available",
    features: ["Wi-Fi完備", "プロジェクター", "バリアフリー"],
  },
  {
    id: "f2",
    name: "北区コミュニティホール A室",
    address: "北区北町4-5-6",
    price: "800円/時間",
    availability: "few",
    features: ["Wi-Fi完備", "ホワイトボード"],
  },
  {
    id: "f3",
    name: "みなみ文化会館 第2研修室",
    address: "南区南町7-8-9",
    price: "1,200円/時間",
    availability: "available",
    features: ["音響設備", "バリアフリー", "駐車場あり"],
  },
  {
    id: "f4",
    name: "東区総合センター 多目的室",
    address: "東区東町10-11-12",
    price: "600円/時間",
    availability: "full",
    features: ["和室対応", "給湯室あり"],
  },
];

const availabilityConfig = {
  available: { label: "空き", className: "bg-success/15 text-success" },
  few: { label: "残りわずか", className: "bg-warning/15 text-warning-foreground" },
  full: { label: "満室", className: "bg-destructive/15 text-destructive" },
};

const checklistItems = [
  "利用者証（お持ちの場合）",
  "本人確認書類（初回利用時）",
  "利用料金（現金またはカード）",
  "上履き（施設による）",
];

// ---- ステップインジケーター ----

function StepIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex size-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="size-4" /> : stepNum}
              </div>
              <span
                className={`hidden text-xs sm:block ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-6 sm:w-12 ${
                  isCompleted ? "bg-primary/40" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---- メインページ ----

export default function FacilityConciergeDemo() {
  const [step, setStep] = useState(1);
  const [fadeKey, setFadeKey] = useState(0);

  // Step 1
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  // Step 2
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [dateTime, setDateTime] = useState("");
  const [people, setPeople] = useState("");
  const [barrierFree, setBarrierFree] = useState(false);
  // Step 3
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );

  const stepLabels = ["目的選択", "条件設定", "検索結果", "予約確認"];

  const goNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, 4));
    setFadeKey((k) => k + 1);
  }, []);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
    setFadeKey((k) => k + 1);
  }, []);

  const canNext = () => {
    if (step === 1) return selectedPurpose !== null;
    if (step === 2) return selectedArea !== null;
    if (step === 3) return selectedFacility !== null;
    return false;
  };

  return (
    <DemoLayout
      serviceName="施設予約AIコンシェルジュ"
      serviceIcon={<Building2 className="size-5 text-primary-foreground" />}
      subtitle="4ステップウィザードデモ"
    >
      {/* ステップインジケーター */}
      <div className="border-b bg-card rounded-lg py-6 px-4 mb-6 -mx-4 sm:mx-0 sm:px-6">
        <StepIndicator currentStep={step} steps={stepLabels} />
      </div>

      {/* コンテンツ */}
      <div>
          <div
            key={fadeKey}
            className="animate-page-enter"
          >
            {/* Step 1: 目的選択 */}
            {step === 1 && (
              <div>
                <h2 className="mb-6 text-xl font-bold">
                  利用目的を選択してください
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {purposes.map((p) => (
                    <Card
                      key={p.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedPurpose === p.id
                          ? "ring-2 ring-primary shadow-md"
                          : ""
                      }`}
                      onClick={() => setSelectedPurpose(p.id)}
                    >
                      <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
                        <div
                          className={`rounded-xl p-3 ${
                            selectedPurpose === p.id
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {p.icon}
                        </div>
                        <div>
                          <p className="font-semibold">{p.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {p.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: 条件設定 */}
            {step === 2 && (
              <div>
                <h2 className="mb-6 text-xl font-bold">
                  条件を設定してください
                </h2>
                <Card>
                  <CardContent className="space-y-6 pt-2">
                    {/* エリア選択 */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <MapPin className="size-4 text-primary" />
                        エリア
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {areas.map((area) => (
                          <Button
                            key={area}
                            variant={
                              selectedArea === area ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedArea(area)}
                          >
                            {area}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* 日時 */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Clock className="size-4 text-primary" />
                        希望日時
                      </label>
                      <input
                        type="text"
                        placeholder="例: 2026年3月15日 14:00〜17:00"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>

                    <Separator />

                    {/* 人数 */}
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Users className="size-4 text-primary" />
                        利用人数
                      </label>
                      <input
                        type="number"
                        min={1}
                        placeholder="例: 20"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        className="w-32 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <span className="ml-2 text-sm text-muted-foreground">
                        名
                      </span>
                    </div>

                    <Separator />

                    {/* バリアフリー */}
                    <div>
                      <label className="flex items-center gap-3 text-sm font-semibold">
                        <input
                          type="checkbox"
                          checked={barrierFree}
                          onChange={(e) => setBarrierFree(e.target.checked)}
                          className="size-4 rounded accent-primary"
                        />
                        <Accessibility className="size-4 text-primary" />
                        バリアフリー対応が必要
                      </label>
                      <p className="ml-7 mt-1 text-xs text-muted-foreground">
                        車椅子対応、エレベーター、多目的トイレ等がある施設を優先します
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: 検索結果 */}
            {step === 3 && (
              <div>
                <h2 className="mb-2 text-xl font-bold">検索結果</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  条件に合う施設が {mockFacilities.length} 件見つかりました
                </p>
                <div className="space-y-4">
                  {mockFacilities.map((f) => {
                    const avail = availabilityConfig[f.availability];
                    const isSelected = selectedFacility?.id === f.id;
                    return (
                      <Card
                        key={f.id}
                        className={`transition-all ${
                          isSelected ? "ring-2 ring-primary shadow-md" : ""
                        }`}
                      >
                        <CardContent className="flex flex-col gap-4 sm:flex-row">
                          {/* 写真プレースホルダー */}
                          <div className="flex size-full shrink-0 items-center justify-center rounded-lg bg-muted sm:size-32">
                            <ImageIcon className="size-8 text-muted-foreground/40" aria-label="施設画像なし" />
                          </div>
                          {/* 情報 */}
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <h3 className="font-semibold">{f.name}</h3>
                              <Badge className={avail.className}>
                                {avail.label}
                              </Badge>
                            </div>
                            <p className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="size-3.5" />
                              {f.address}
                            </p>
                            <p className="flex items-center gap-1 text-sm font-medium text-primary">
                              <JapaneseYen className="size-3.5" />
                              {f.price}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {f.features.map((feat) => (
                                <Badge
                                  key={feat}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {feat}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2 pt-1">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={f.availability === "full"}
                              >
                                詳細を見る
                              </Button>
                              <Button
                                size="sm"
                                variant={isSelected ? "default" : "cta"}
                                disabled={f.availability === "full"}
                                onClick={() => setSelectedFacility(f)}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="size-4" />
                                    選択済み
                                  </>
                                ) : (
                                  "予約する"
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: 予約確認 */}
            {step === 4 && selectedFacility && (
              <div>
                <h2 className="mb-6 text-xl font-bold">予約内容の確認</h2>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-emerald-600" />
                      {selectedFacility.name}
                    </CardTitle>
                    <CardDescription>
                      以下の内容で予約を申し込みます
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="size-4 text-muted-foreground" />
                        <span className="font-medium">住所:</span>
                        <span>{selectedFacility.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="size-4 text-muted-foreground" />
                        <span className="font-medium">日時:</span>
                        <span>{dateTime || "未指定"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="size-4 text-muted-foreground" />
                        <span className="font-medium">人数:</span>
                        <span>{people ? `${people}名` : "未指定"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <JapaneseYen className="size-4 text-muted-foreground" />
                        <span className="font-medium">料金:</span>
                        <span>{selectedFacility.price}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* 持ち物チェックリスト */}
                    <div>
                      <h3 className="mb-3 font-semibold">持ち物チェックリスト</h3>
                      <div className="space-y-2">
                        {checklistItems.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              className="size-4 rounded accent-primary"
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* 注意事項 */}
                    <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        <div className="text-sm text-amber-800">
                          <p className="font-semibold">ご注意</p>
                          <ul className="mt-1 list-inside list-disc space-y-1">
                            <li>
                              予約は仮予約です。窓口での本申請が必要です。
                            </li>
                            <li>
                              キャンセルは利用日の3日前までにお願いします。
                            </li>
                            <li>
                              利用規約に同意の上、お申し込みください。
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="cta" size="lg" className="w-full sm:w-auto">
                      予約を申し込む
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>

          {/* ナビゲーション */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={step === 1}
            >
              <ArrowLeft className="mr-1 size-4" />
              戻る
            </Button>
            {step < 4 && (
              <Button
                variant="default"
                onClick={goNext}
                disabled={!canNext()}
              >
                次へ
                <ArrowRight className="ml-1 size-4" />
              </Button>
            )}
          </div>
        </div>
    </DemoLayout>
  );
}

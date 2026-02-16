"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  organization: string;
  serviceSlug: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  organization?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    serviceSlug: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスの形式で入力してください";
    }
    if (!formData.organization.trim()) {
      newErrors.organization = "自治体名・組織名を入力してください";
    }
    if (!formData.message.trim()) {
      newErrors.message = "お問い合わせ内容を入力してください";
    }
    return newErrors;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 送信試行後はリアルタイムバリデーション
    if (hasAttemptedSubmit) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // 最初のエラーフィールドにフォーカス
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
      return;
    }

    setErrors({});
    setServerError(null);
    setIsSubmitting(true);

    try {
      // バックエンド未接続のため、送信完了をシミュレート
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch {
      setServerError("送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="size-8 text-success" />
            </div>
            <CardTitle className="text-2xl">
              お問い合わせありがとうございます
            </CardTitle>
            <CardDescription className="text-base">
              内容を確認の上、2営業日以内にご連絡いたします。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <Button asChild>
              <Link href="/">トップページに戻る</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  organization: "",
                  serviceSlug: "",
                  message: "",
                });
                setErrors({});
                setServerError(null);
                setHasAttemptedSubmit(false);
              }}
            >
              別のお問い合わせを送る
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <section className="border-b bg-card py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 size-4" />
            トップページに戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            お問い合わせ
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            サービスに関するご質問やご相談はこちらからお気軽にどうぞ
          </p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>お問い合わせフォーム</CardTitle>
                  <CardDescription>
                    以下の項目をご入力の上、送信してください。
                    <span className="text-red-500" aria-hidden="true">*</span> は必須項目です。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {serverError && (
                    <div
                      role="alert"
                      className="mb-6 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                      {serverError}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 名前 */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-foreground/80"
                      >
                        お名前 <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">（必須）</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="山田 太郎"
                        className={`w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive" : "border-border"}`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-sm text-destructive" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* メールアドレス */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-foreground/80"
                      >
                        メールアドレス <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">（必須）</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="taro.yamada@city.example.lg.jp"
                        className={`w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-destructive" : "border-border"}`}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-sm text-destructive" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* 自治体名・組織名 */}
                    <div>
                      <label
                        htmlFor="organization"
                        className="mb-2 block text-sm font-medium text-foreground/80"
                      >
                        自治体名・組織名{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">（必須）</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.organization}
                        aria-describedby={errors.organization ? "organization-error" : undefined}
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="○○市 DX推進課"
                        className={`w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.organization ? "border-destructive" : "border-border"}`}
                      />
                      {errors.organization && (
                        <p id="organization-error" className="mt-1.5 text-sm text-destructive" role="alert">
                          {errors.organization}
                        </p>
                      )}
                    </div>

                    {/* サービス選択 */}
                    <div>
                      <label
                        htmlFor="serviceSlug"
                        className="mb-2 block text-sm font-medium text-foreground/80"
                      >
                        ご興味のあるサービス
                      </label>
                      <select
                        id="serviceSlug"
                        name="serviceSlug"
                        value={formData.serviceSlug}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">選択してください（任意）</option>
                        <optgroup label="SaaS型サービス">
                          {services
                            .filter((s) => s.category === "saas")
                            .map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.displayName}
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="シンクタンク型サービス">
                          {services
                            .filter((s) => s.category === "thinktank")
                            .map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.displayName}
                              </option>
                            ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* メッセージ */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-foreground/80"
                      >
                        お問い合わせ内容{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">（必須）</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="ご質問やご要望をご記入ください"
                        className={`w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.message ? "border-destructive" : "border-border"}`}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-sm text-destructive" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* 送信ボタン */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          送信中...
                        </>
                      ) : (
                        "送信する"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">お問い合わせ先</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        メール
                      </p>
                      <p className="text-sm text-muted-foreground">
                        contact@civic-ai.jp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">電話</p>
                      <p className="text-sm text-muted-foreground">03-XXXX-XXXX</p>
                      <p className="text-xs text-muted-foreground/60">
                        平日 9:00-18:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        所在地
                      </p>
                      <p className="text-sm text-muted-foreground">東京都千代田区</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">よくあるご質問</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      返信までの目安は？
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      2営業日以内にご返信いたします。
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      無料相談は何回まで？
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      初回のご相談は無料です。オンラインまたは訪問で対応します。
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      POC（概念実証）は可能？
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      ほとんどのSaaS型サービスでPOCプランをご用意しています。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <Badge className="mb-3">おすすめ</Badge>
                  <p className="text-sm font-medium text-foreground">
                    どのサービスを選べばいいかわからない方へ
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    課題のヒアリングから最適なサービスのご提案まで、無料でサポートいたします。お気軽にご相談ください。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

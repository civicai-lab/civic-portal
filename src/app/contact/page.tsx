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
import { ArrowLeft, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  organization: string;
  serviceSlug: string;
  message: string;
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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // バックエンド未接続のため、送信完了をシミュレート
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">
              お問い合わせありがとうございます
            </CardTitle>
            <CardDescription className="text-base">
              内容を確認の上、2営業日以内にご連絡いたします。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/">トップページに戻る</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 size-4" />
            トップページに戻る
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            お問い合わせ
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            サービスに関するご質問やご相談はこちらからお気軽にどうぞ
          </p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>お問い合わせフォーム</CardTitle>
                  <CardDescription>
                    以下の項目をご入力の上、送信してください。
                    <span className="text-red-500">*</span> は必須項目です。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 名前 */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="山田 太郎"
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* メールアドレス */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="taro.yamada@city.example.lg.jp"
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* 自治体名・組織名 */}
                    <div>
                      <label
                        htmlFor="organization"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        自治体名・組織名{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="○○市 DX推進課"
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* サービス選択 */}
                    <div>
                      <label
                        htmlFor="serviceSlug"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        ご興味のあるサービス
                      </label>
                      <select
                        id="serviceSlug"
                        name="serviceSlug"
                        value={formData.serviceSlug}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        お問い合わせ内容{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="ご質問やご要望をご記入ください"
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* 送信ボタン */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "送信中..." : "送信する"}
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
                    <Mail className="mt-0.5 size-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        メール
                      </p>
                      <p className="text-sm text-gray-600">
                        contact@civic-ai.jp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">電話</p>
                      <p className="text-sm text-gray-600">03-XXXX-XXXX</p>
                      <p className="text-xs text-gray-400">
                        平日 9:00-18:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        所在地
                      </p>
                      <p className="text-sm text-gray-600">東京都千代田区</p>
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
                    <p className="text-sm font-medium text-gray-900">
                      返信までの目安は？
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      2営業日以内にご返信いたします。
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      無料相談は何回まで？
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      初回のご相談は無料です。オンラインまたは訪問で対応します。
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      POC（概念実証）は可能？
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      ほとんどのSaaS型サービスでPOCプランをご用意しています。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <Badge className="mb-3">おすすめ</Badge>
                  <p className="text-sm font-medium text-gray-900">
                    どのサービスを選べばいいかわからない方へ
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
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

import { test, expect } from "@playwright/test";

test.describe("ナビゲーション", () => {
  test("ヘッダーナビゲーションのリンクが正しい", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });

    const nav = page.locator('nav[aria-label="メインナビゲーション"]');

    // デスクトップナビゲーションリンクの確認
    await expect(nav.getByRole("link", { name: "ホーム" })).toHaveAttribute(
      "href",
      "/",
      { timeout: 10000 }
    );
    await expect(
      nav.getByRole("link", { name: "サービス一覧" })
    ).toHaveAttribute("href", "/services", { timeout: 10000 });
    await expect(
      nav.getByRole("link", { name: "導入事例" })
    ).toHaveAttribute("href", "/cases", { timeout: 10000 });
    await expect(
      nav.getByRole("link", { name: "会社概要" })
    ).toHaveAttribute("href", "/about", { timeout: 10000 });
    await expect(
      nav.getByRole("link", { name: "お問い合わせ" })
    ).toHaveAttribute("href", "/contact", { timeout: 10000 });
  });

  test("フッターのリンクが正しい", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });

    const footer = page.locator("footer");

    // サービスリンク
    await expect(
      footer.getByRole("link", { name: "すべてのサービス" })
    ).toHaveAttribute("href", "/services", { timeout: 10000 });

    // 会社情報リンク
    await expect(
      footer.getByRole("link", { name: "会社概要" })
    ).toHaveAttribute("href", "/about", { timeout: 10000 });
    await expect(
      footer.getByRole("link", { name: "導入事例" })
    ).toHaveAttribute("href", "/cases", { timeout: 10000 });
    await expect(
      footer.getByRole("link", { name: "ニュース" })
    ).toHaveAttribute("href", "/news", { timeout: 10000 });
    await expect(
      footer.getByRole("link", { name: "採用情報" })
    ).toHaveAttribute("href", "/careers", { timeout: 10000 });

    // サポートリンク
    await expect(
      footer.getByRole("link", { name: "お問い合わせ" })
    ).toHaveAttribute("href", "/contact", { timeout: 10000 });
    await expect(
      footer.getByRole("link", { name: "よくある質問" })
    ).toHaveAttribute("href", "/faq", { timeout: 10000 });
    await expect(
      footer.getByRole("link", { name: "プライバシーポリシー" })
    ).toHaveAttribute("href", "/privacy", { timeout: 10000 });
    await expect(
      footer.getByRole("link", { name: "利用規約" })
    ).toHaveAttribute("href", "/terms", { timeout: 10000 });
  });

  test("404ページが表示される", async ({ page }) => {
    await page.goto("/nonexistent", { timeout: 10000 });
    await expect(page.getByText("ページが見つかりません")).toBeVisible({
      timeout: 10000,
    });
  });

  test("問い合わせページのフォームが表示される", async ({ page }) => {
    await page.goto("/contact", { timeout: 10000 });

    // フォーム要素の確認 - 実際のラベルテキストに合わせる
    await expect(page.getByText("お名前")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("メールアドレス")).toBeVisible({
      timeout: 10000,
    });
    // 実際のラベルは「自治体名・組織名」
    await expect(page.getByText("自治体名・組織名")).toBeVisible({
      timeout: 10000,
    });
  });
});

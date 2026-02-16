import { test, expect } from "@playwright/test";

test.describe("ナビゲーション", () => {
  test("ヘッダーナビゲーションのリンクが正しい", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator('nav[aria-label="メインナビゲーション"]');

    // デスクトップナビゲーションリンクの確認
    await expect(nav.getByRole("link", { name: "ホーム" })).toHaveAttribute(
      "href",
      "/"
    );
    await expect(
      nav.getByRole("link", { name: "サービス一覧" })
    ).toHaveAttribute("href", "/services");
    await expect(
      nav.getByRole("link", { name: "導入事例" })
    ).toHaveAttribute("href", "/cases");
    await expect(
      nav.getByRole("link", { name: "会社概要" })
    ).toHaveAttribute("href", "/about");
    await expect(
      nav.getByRole("link", { name: "お問い合わせ" })
    ).toHaveAttribute("href", "/contact");
  });

  test("フッターのリンクが正しい", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");

    // サービスリンク
    await expect(
      footer.getByRole("link", { name: "すべてのサービス" })
    ).toHaveAttribute("href", "/services");

    // 会社情報リンク
    await expect(
      footer.getByRole("link", { name: "会社概要" })
    ).toHaveAttribute("href", "/about");
    await expect(
      footer.getByRole("link", { name: "導入事例" })
    ).toHaveAttribute("href", "/cases");
    await expect(
      footer.getByRole("link", { name: "ニュース" })
    ).toHaveAttribute("href", "/news");
    await expect(
      footer.getByRole("link", { name: "採用情報" })
    ).toHaveAttribute("href", "/careers");

    // サポートリンク
    await expect(
      footer.getByRole("link", { name: "お問い合わせ" })
    ).toHaveAttribute("href", "/contact");
    await expect(
      footer.getByRole("link", { name: "よくある質問" })
    ).toHaveAttribute("href", "/faq");
    await expect(
      footer.getByRole("link", { name: "プライバシーポリシー" })
    ).toHaveAttribute("href", "/privacy");
    await expect(
      footer.getByRole("link", { name: "利用規約" })
    ).toHaveAttribute("href", "/terms");
  });

  test("404ページが表示される", async ({ page }) => {
    await page.goto("/nonexistent");
    await expect(page.getByText("ページが見つかりません")).toBeVisible();
  });

  test("問い合わせページのフォームが表示される", async ({ page }) => {
    await page.goto("/contact");

    // フォーム要素の確認
    await expect(page.getByText("お名前")).toBeVisible();
    await expect(page.getByText("メールアドレス")).toBeVisible();
    await expect(page.getByText("組織名")).toBeVisible();
  });
});

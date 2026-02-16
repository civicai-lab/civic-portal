import { test, expect } from "@playwright/test";

test.describe("サービス詳細ページ（shiori-library）", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services/shiori-library", { timeout: 10000 });
  });

  test("ページが正しくロードされる", async ({ page }) => {
    // title テンプレート: "%s | Civic AI" で、メタデータ title は "AI司書 SHIORI - Civic AI Product Suite"
    await expect(page).toHaveTitle(/AI司書 SHIORI/, { timeout: 10000 });
  });

  test("Hero セクションにサービス名が表示される", async ({ page }) => {
    // h1 タグで直接確認
    const h1 = page.locator("h1");
    await expect(h1).toContainText("AI司書 SHIORI", { timeout: 10000 });
  });

  test("機能セクションに4つのカードが表示される", async ({ page }) => {
    // 「主な機能」セクション
    const featuresSection = page.locator("section", {
      hasText: "主な機能",
    });
    await expect(featuresSection.first()).toBeVisible({ timeout: 10000 });

    // 機能カード（CardTitle = div[data-slot="card-title"] を含むカード）
    const featureCards = featuresSection
      .first()
      .locator('[data-slot="card"]')
      .filter({ has: page.locator('[data-slot="card-title"]') });
    await expect(featureCards).toHaveCount(4, { timeout: 10000 });
  });

  test("料金プランセクションが表示される", async ({ page }) => {
    await expect(page.getByText("料金プラン").first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("FAQ セクションが表示・開閉できる", async ({ page }) => {
    await expect(page.getByText("よくある質問").first()).toBeVisible({
      timeout: 10000,
    });

    // 最初のFAQ項目を開閉
    const firstFaq = page.locator("details").first();
    await expect(firstFaq).toBeVisible({ timeout: 10000 });

    // 開く前は閉じている
    await expect(firstFaq).not.toHaveAttribute("open", "");

    // クリックして開く
    await firstFaq.locator("summary").click();
    await expect(firstFaq).toHaveAttribute("open", "");

    // もう一度クリックして閉じる
    await firstFaq.locator("summary").click();
    await expect(firstFaq).not.toHaveAttribute("open", "");
  });

  test("デモを試すボタンが /services/shiori-library/demo にリンクしている", async ({
    page,
  }) => {
    const demoLink = page.getByRole("link", { name: "デモを試す" });
    await expect(demoLink).toHaveAttribute(
      "href",
      "/services/shiori-library/demo",
      { timeout: 10000 }
    );
  });

  test("パンくずリスト「サービス一覧に戻る」が機能する", async ({ page }) => {
    const breadcrumb = page.getByRole("link", {
      name: "サービス一覧に戻る",
    });
    await expect(breadcrumb).toBeVisible({ timeout: 10000 });
    await breadcrumb.click();
    await expect(page).toHaveURL("/services", { timeout: 10000 });
  });
});

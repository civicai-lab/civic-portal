import { test, expect } from "@playwright/test";

test.describe("サービス詳細ページ（shiori-library）", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services/shiori-library");
  });

  test("ページが正しくロードされる", async ({ page }) => {
    await expect(page).toHaveTitle(/AI司書 SHIORI/);
  });

  test("Hero セクションにサービス名が表示される", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "AI司書 SHIORI", level: 1 })
    ).toBeVisible();
  });

  test("機能セクションに4つのカードが表示される", async ({ page }) => {
    // 「主な機能」セクション
    const featuresSection = page.locator("section", {
      hasText: "主な機能",
    });
    await expect(featuresSection.first()).toBeVisible();

    // 機能カード（CardTitle を含むカード）
    const featureCards = featuresSection
      .first()
      .locator('[class*="card"]')
      .filter({ has: page.locator("h3") });
    await expect(featureCards).toHaveCount(4);
  });

  test("料金プランセクションが表示される", async ({ page }) => {
    await expect(page.getByText("料金プラン")).toBeVisible();
  });

  test("FAQ セクションが表示・開閉できる", async ({ page }) => {
    await expect(page.getByText("よくある質問")).toBeVisible();

    // 最初のFAQ項目を開閉
    const firstFaq = page.locator("details").first();
    await expect(firstFaq).toBeVisible();

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
      "/services/shiori-library/demo"
    );
  });

  test("パンくずリスト「サービス一覧に戻る」が機能する", async ({ page }) => {
    const breadcrumb = page.getByRole("link", {
      name: "サービス一覧に戻る",
    });
    await expect(breadcrumb).toBeVisible();
    await breadcrumb.click();
    await expect(page).toHaveURL("/services");
  });
});

import { test, expect } from "@playwright/test";

test.describe("ホームページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 10000 });
  });

  test("ホームページが正しくロードされる", async ({ page }) => {
    await expect(page).toHaveTitle(/Civic AI/, { timeout: 10000 });
  });

  test("Hero セクションが表示される", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("自治体のDXを、", { timeout: 10000 });
  });

  test("サービス一覧を見るボタンが /services にリンクしている", async ({
    page,
  }) => {
    const link = page.getByRole("link", { name: "サービス一覧を見る" }).first();
    await expect(link).toHaveAttribute("href", "/services", {
      timeout: 10000,
    });
  });

  test("無料相談 CTA ボタンが /contact にリンクしている", async ({ page }) => {
    // Hero セクション内の無料相談リンク
    const ctaLinks = page.getByRole("link", { name: "無料相談" });
    const heroCtaLink = ctaLinks.first();
    await expect(heroCtaLink).toHaveAttribute("href", "/contact", {
      timeout: 10000,
    });
  });

  test("Stats セクションが表示される", async ({ page }) => {
    await expect(page.getByText("導入自治体数")).toBeVisible({
      timeout: 10000,
    });
  });

  test("注力サービスカードが少なくとも3つ表示される", async ({ page }) => {
    // 注力サービスセクション
    const section = page.locator("section", { hasText: "注力サービス" });
    // CardTitle は <div data-slot="card-title"> で実装されている（h3 ではない）
    const cards = section.locator('[data-slot="card"]').filter({
      has: page.locator('[data-slot="card-title"]'),
    });
    // 少なくとも3つ以上
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("パートナーロゴセクションが表示される", async ({ page }) => {
    // 信頼性セクション（パートナー・認定）
    const partnerSection = page.locator(
      'section[aria-label="信頼のパートナー"]'
    );
    await expect(partnerSection).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("パートナー・認定")).toBeVisible({
      timeout: 10000,
    });
  });
});

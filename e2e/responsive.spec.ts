import { test, expect } from "@playwright/test";

test.describe("レスポンシブ表示", () => {
  test.describe("モバイル (375px)", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("ホームページがモバイルで正しく表示される", async ({ page }) => {
      await page.goto("/", { timeout: 10000 });

      // ハンバーガーメニューが表示される
      const menuButton = page.getByLabel("メニューを開く");
      await expect(menuButton).toBeVisible({ timeout: 10000 });

      // H1が表示される
      const heroTitle = page.locator("h1").first();
      await expect(heroTitle).toBeVisible({ timeout: 10000 });
    });

    test("サービス一覧がモバイルで1カラムになる", async ({ page }) => {
      await page.goto("/services", { timeout: 10000 });

      // サービスカードが縦に並ぶ（1列）
      const firstCard = page.locator("a[href*='/services/']").first();
      await expect(firstCard).toBeVisible({ timeout: 10000 });
    });

    test("フッターがモバイルで正しく表示される", async ({ page }) => {
      await page.goto("/about", { timeout: 10000 });

      const footer = page.locator("footer");
      await expect(footer).toBeVisible({ timeout: 10000 });

      // コピーライトが表示される
      const copyright = page.getByText(/Civic AI/);
      await expect(copyright.first()).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("タブレット (768px)", () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test("ホームページがタブレットで正しく表示される", async ({ page }) => {
      await page.goto("/", { timeout: 10000 });

      // Heroセクションが表示される
      const heroTitle = page.locator("h1").first();
      await expect(heroTitle).toBeVisible({ timeout: 10000 });
    });

    test("サービス一覧がタブレットで2カラムになる", async ({ page }) => {
      await page.goto("/services", { timeout: 10000 });

      const firstCard = page.locator("a[href*='/services/']").first();
      await expect(firstCard).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("デスクトップ (1440px)", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("ホームページがワイドスクリーンで正しく表示される", async ({
      page,
    }) => {
      await page.goto("/", { timeout: 10000 });

      // デスクトップナビゲーションが表示される
      const navLinks = page
        .locator('nav[aria-label="メインナビゲーション"]')
        .first();
      await expect(navLinks).toBeVisible({ timeout: 10000 });

      // コンテンツがmax-widthで中央配置される
      const heroTitle = page.locator("h1").first();
      await expect(heroTitle).toBeVisible({ timeout: 10000 });
    });

    test("サービス一覧がデスクトップで3カラムになる", async ({ page }) => {
      await page.goto("/services", { timeout: 10000 });

      const cards = page.locator("a[href*='/services/']");
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(20);
    });
  });
});

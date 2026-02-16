import { test, expect } from "@playwright/test";

test.describe("アクセシビリティ", () => {
  test("ホームページのスキップリンクが存在する", async ({ page }) => {
    await page.goto("/");

    // スキップリンク（通常は非表示だが DOM に存在する）
    const skipLink = page.getByText("メインコンテンツにスキップ");
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("全画像にalt属性がある（ホームページ）", async ({ page }) => {
    await page.goto("/");

    // alt 属性のない img 要素が存在しないことを確認
    // 装飾画像は alt="" で許容される
    const imagesWithoutAlt = page.locator("img:not([alt])");
    await expect(imagesWithoutAlt).toHaveCount(0);
  });

  test("ヘッダーの aria-label 属性が正しい", async ({ page }) => {
    await page.goto("/");

    // メインナビゲーションの aria-label
    const mainNav = page.locator('nav[aria-label="メインナビゲーション"]');
    await expect(mainNav).toBeVisible();

    // ロゴリンクの aria-label
    const logoLink = page.getByLabel("Civic AI ホーム");
    await expect(logoLink.first()).toBeVisible();
  });

  test("モバイルメニューの aria-expanded が正しい", async ({ page }) => {
    // モバイルサイズに設定
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // ハンバーガーメニューボタン
    const menuButton = page.getByLabel("メニューを開く");
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // メニューを開く
    await menuButton.click();

    // aria-expanded が true に変わる
    const closeButton = page.getByLabel("メニューを閉じる");
    await expect(closeButton).toHaveAttribute("aria-expanded", "true");

    // モバイルナビゲーション領域が表示される
    const mobileNav = page.locator("#mobile-navigation");
    await expect(mobileNav).toBeVisible();
  });
});

import { test, expect } from "@playwright/test";

test.describe("サービス検索機能", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services", { timeout: 10000 });
  });

  test("検索入力フィールドが表示される", async ({ page }) => {
    const searchInput = page.getByLabel("サービスを検索");
    await expect(searchInput).toBeVisible({ timeout: 10000 });
  });

  test("検索するとサービスが絞り込まれる", async ({ page }) => {
    const searchInput = page.getByLabel("サービスを検索");
    await searchInput.fill("SHIORI");

    // 絞り込み結果を待つ
    await page.waitForTimeout(300);

    // SHIORIを含むカードのみ表示される
    const serviceCards = page.locator('a[href^="/services/"]').filter({
      has: page.locator('[data-slot="card-title"]'),
    });
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(20);
  });

  test("検索クリアボタンで全件に戻る", async ({ page }) => {
    const searchInput = page.getByLabel("サービスを検索");
    await searchInput.fill("SHIORI");
    await page.waitForTimeout(300);

    // クリアボタンをクリック
    const clearButton = page.getByLabel("検索をクリア");
    await clearButton.click();

    // 全20件に戻る
    const serviceCards = page.locator('a[href^="/services/"]').filter({
      has: page.locator('[data-slot="card-title"]'),
    });
    await expect(serviceCards).toHaveCount(20, { timeout: 10000 });
  });

  test("該当なしの検索で空状態が表示される", async ({ page }) => {
    const searchInput = page.getByLabel("サービスを検索");
    await searchInput.fill("存在しないサービス名ZZZZZ");

    await page.waitForTimeout(300);

    // 空状態メッセージが表示される
    await expect(
      page.getByText("該当するサービスが見つかりません")
    ).toBeVisible({ timeout: 10000 });
  });
});

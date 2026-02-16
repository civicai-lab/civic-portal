import { test, expect } from "@playwright/test";

test.describe("サービス一覧ページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services", { timeout: 10000 });
  });

  test("サービス一覧ページが正しくロードされる", async ({ page }) => {
    await expect(page).toHaveTitle(/Civic AI/, { timeout: 10000 });
    // h1 タグで直接確認（getByRole heading は CardTitle の div も拾う可能性がある）
    const h1 = page.locator("h1");
    await expect(h1).toContainText("サービス一覧", { timeout: 10000 });
  });

  test("20件のサービスカードが表示される", async ({ page }) => {
    // デフォルトは「すべて」タブが選択されている
    // サービスカードは Link(a) で囲まれ、CardTitle（data-slot="card-title"）を含む
    const serviceCards = page.locator('a[href^="/services/"]').filter({
      has: page.locator('[data-slot="card-title"]'),
    });
    await expect(serviceCards).toHaveCount(20, { timeout: 10000 });
  });

  test("SaaS / シンクタンクのカテゴリバッジが存在する", async ({ page }) => {
    // SaaS バッジ
    const saasBadges = page.getByText("SaaS", { exact: true });
    const saasCount = await saasBadges.count();
    expect(saasCount).toBeGreaterThan(0);

    // シンクタンク バッジ
    const thinktankBadges = page.getByText("シンクタンク", { exact: true });
    const thinktankCount = await thinktankBadges.count();
    expect(thinktankCount).toBeGreaterThan(0);
  });

  test("サービスカードクリックで詳細ページに遷移する", async ({ page }) => {
    // 最初のサービスカードをクリック
    const firstCard = page
      .locator('a[href^="/services/"]')
      .filter({ has: page.locator('[data-slot="card-title"]') })
      .first();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    await expect(page).toHaveURL(href!, { timeout: 10000 });
  });
});

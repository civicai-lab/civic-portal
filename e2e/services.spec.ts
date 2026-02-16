import { test, expect } from "@playwright/test";

test.describe("サービス一覧ページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services");
  });

  test("サービス一覧ページが正しくロードされる", async ({ page }) => {
    await expect(page).toHaveTitle(/Civic AI/);
    await expect(
      page.getByRole("heading", { name: "サービス一覧", level: 1 })
    ).toBeVisible();
  });

  test("20件のサービスカードが表示される", async ({ page }) => {
    // デフォルトは「すべて」タブが選択されている
    // サービスカードはLinkで囲まれたCardコンポーネント
    const serviceCards = page.locator('a[href^="/services/"]').filter({
      has: page.locator("h3"),
    });
    await expect(serviceCards).toHaveCount(20);
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
      .filter({ has: page.locator("h3") })
      .first();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    await expect(page).toHaveURL(href!);
  });
});

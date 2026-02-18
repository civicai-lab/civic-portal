import { test, expect } from "@playwright/test";

test.describe("デモページ操作テスト", () => {
  test("ai-lab デモ: タブ切り替えが動作する", async ({ page }) => {
    await page.goto("/services/ai-lab/demo", { timeout: 10000 });

    // プロジェクトタブをクリック
    await page.getByRole("tab", { name: /プロジェクト/ }).click();

    // プロジェクトカードが表示される
    await expect(page.getByText("ゴミ収集最適化AI")).toBeVisible({
      timeout: 10000,
    });
  });

  test("ai-lab デモ: イベントカテゴリフィルタが動作する", async ({
    page,
  }) => {
    await page.goto("/services/ai-lab/demo", { timeout: 10000 });

    // ハッカソンフィルタをクリック
    await page
      .getByRole("button", { name: "ハッカソン" })
      .click();

    // ハッカソンイベントが表示される
    await expect(page.getByText("自治体AIハッカソン")).toBeVisible({
      timeout: 10000,
    });
  });

  test("ai-lab デモ: 星評価が動作する", async ({ page }) => {
    await page.goto("/services/ai-lab/demo", { timeout: 10000 });

    // 審査タブに移動
    await page.getByRole("tab", { name: /審査/ }).click();

    // 新規性の5点をクリック
    await page.getByLabel("新規性: 5点").click();

    // スコアが表示される
    await expect(page.getByText("5/5")).toBeVisible({ timeout: 5000 });
  });

  test("book-selection デモ: タブ切り替えが動作する", async ({ page }) => {
    await page.goto("/services/book-selection/demo", { timeout: 10000 });

    // ギャップ分析タブをクリック
    await page.getByRole("tab", { name: /ギャップ/ }).click();

    // ギャップ分析タブがアクティブになる
    await expect(page.getByRole("tab", { name: /ギャップ/ })).toHaveAttribute(
      "data-state",
      "active",
      { timeout: 10000 }
    );
  });

  test("guideline-service デモ: タブ切り替えが動作する", async ({
    page,
  }) => {
    await page.goto("/services/guideline-service/demo", { timeout: 10000 });

    // 比較タブをクリック
    await page.getByRole("tab", { name: "比較" }).click();

    // 比較タブの内容が表示される
    await expect(page.getByRole("tab", { name: "比較" })).toHaveAttribute(
      "data-state",
      "active",
      { timeout: 10000 }
    );
  });

  test("pubcom-analysis デモ: タブが表示される", async ({ page }) => {
    await page.goto("/services/pubcom-analysis/demo", { timeout: 10000 });

    // 意見分類タブが表示される
    await expect(page.getByRole("tab", { name: /意見分類|分類/ })).toBeVisible({
      timeout: 10000,
    });
  });
});

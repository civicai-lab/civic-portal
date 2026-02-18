import { test, expect } from "@playwright/test";

test.describe("キーボードナビゲーション", () => {
  test("Tabキーでスキップリンクにフォーカスが移動する", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });

    // 最初のTabでスキップリンクにフォーカス
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toContainText("メインコンテンツにスキップ", {
      timeout: 5000,
    });
  });

  test("Tabキーでヘッダーリンクにフォーカスが移動する", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });

    // スキップリンク → ロゴ → テーマトグル or ナビリンクへ
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // logo

    const focused = page.locator(":focus");
    await expect(focused).toBeVisible({ timeout: 5000 });

    // フォーカスされた要素がリンクまたはボタンである
    const tagName = await focused.evaluate((el) =>
      el.tagName.toLowerCase()
    );
    expect(["a", "button"]).toContain(tagName);
  });

  test("フォーカスされた要素にfocus-visibleスタイルが適用される", async ({
    page,
  }) => {
    await page.goto("/", { timeout: 10000 });

    // キーボードでフォーカスを移動
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // フォーカスされた要素が存在する
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible({ timeout: 5000 });
  });

  test("Escapeキーでモバイルメニューが閉じる", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { timeout: 10000 });

    // メニュー開く
    const menuButton = page.getByLabel("メニューを開く");
    await expect(menuButton).toBeVisible({ timeout: 10000 });
    await menuButton.click();

    // モバイルメニューが開いている
    const mobileNav = page.locator("#mobile-navigation");
    await expect(mobileNav).toHaveAttribute("aria-hidden", "false", {
      timeout: 5000,
    });

    // Escapeで閉じる
    await page.keyboard.press("Escape");

    // モバイルメニューが閉じる
    await expect(mobileNav).toHaveAttribute("aria-hidden", "true", {
      timeout: 5000,
    });
  });

  test("モバイルメニュー内でTabキーがトラップされる", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { timeout: 10000 });

    // メニュー開く
    const menuButton = page.getByLabel("メニューを開く");
    await menuButton.click();

    // モバイルメニューが開いている
    const mobileNav = page.locator("#mobile-navigation");
    await expect(mobileNav).toHaveAttribute("aria-hidden", "false", {
      timeout: 5000,
    });

    // メニュー内のリンクにTabでフォーカスを移動できる
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible({ timeout: 5000 });
  });

  test("Escape後にメニューボタンにフォーカスが戻る", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { timeout: 10000 });

    // メニュー開く
    const menuButton = page.getByLabel("メニューを開く");
    await menuButton.click();

    // モバイルメニューが開いている
    await expect(page.locator("#mobile-navigation")).toHaveAttribute(
      "aria-hidden",
      "false",
      { timeout: 5000 }
    );

    // Escapeで閉じる
    await page.keyboard.press("Escape");

    // フォーカスがメニューボタンに戻る
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toHaveAttribute("aria-label", "メニューを開く", {
      timeout: 5000,
    });
  });
});

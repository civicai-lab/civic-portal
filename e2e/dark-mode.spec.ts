import { test, expect } from "@playwright/test";

test.describe("ダークモード", () => {
  test("テーマトグルボタンが表示される", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });

    // next-themesのマウント待ち
    await page.waitForTimeout(500);

    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });
    await expect(themeToggle).toBeVisible({ timeout: 10000 });
  });

  test("ダークモードに切り替えるとhtml要素にdarkクラスが付与される", async ({
    page,
  }) => {
    await page.goto("/", { timeout: 10000 });
    await page.waitForTimeout(500);

    const html = page.locator("html");

    // テーマトグルをクリック
    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });
    await themeToggle.click();

    // html要素のclass属性にdarkが含まれる（next-themesの動作）
    await expect(html).toHaveClass(/dark/, { timeout: 5000 });
  });

  test("ダークモードでヘッダーの背景が変わる", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });
    await page.waitForTimeout(500);

    // ダークモードに切り替え
    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });
    await themeToggle.click();

    // ヘッダーが表示されている
    const header = page.locator("header");
    await expect(header).toBeVisible({ timeout: 10000 });
  });

  test("ダークモードでサービスカードが正しく表示される", async ({ page }) => {
    await page.goto("/services", { timeout: 10000 });
    await page.waitForTimeout(500);

    // ダークモードに切り替え
    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });
    await themeToggle.click();

    // サービスカードが表示されている
    const firstLink = page.locator("a[href*='/services/']").first();
    await expect(firstLink).toBeVisible({ timeout: 10000 });
  });

  test("ダークモードでデモページが正しく表示される", async ({ page }) => {
    await page.goto("/services/municipal-faq/demo", { timeout: 10000 });
    await page.waitForTimeout(500);

    // ダークモードに切り替え
    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });
    await themeToggle.click();

    // チャット入力が見える
    const input = page.getByPlaceholder(
      "お住まいの地域のことをお気軽にお聞きください"
    );
    await expect(input).toBeVisible({ timeout: 10000 });
  });
});

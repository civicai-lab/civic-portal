import { test, expect } from "@playwright/test";

test.describe("状態永続化", () => {
  test("ダークモードがリロード後も維持される", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });

    // next-themesのマウント待ち
    await page.waitForTimeout(500);

    // ダークモード切替
    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });
    await themeToggle.click();

    // darkクラスが付与される
    await expect(page.locator("html")).toHaveClass(/dark/, { timeout: 5000 });

    // ページをリロード
    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    // next-themesのマウント待ち
    await page.waitForTimeout(500);

    // リロード後もdarkクラスが維持されている
    await expect(page.locator("html")).toHaveClass(/dark/, { timeout: 5000 });
  });

  test("ライトモードに戻してリロードしても維持される", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });
    await page.waitForTimeout(500);

    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });

    // ダークモードに切り替え
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/, { timeout: 5000 });

    // ライトモードに戻す
    await themeToggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/, {
      timeout: 5000,
    });

    // リロード
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);

    // ライトモードが維持されている
    await expect(page.locator("html")).not.toHaveClass(/dark/, {
      timeout: 5000,
    });
  });

  test("localStorageにテーマ設定が保存される", async ({ page }) => {
    await page.goto("/", { timeout: 10000 });
    await page.waitForTimeout(500);

    // ダークモードに切り替え
    const themeToggle = page.getByRole("button", {
      name: /ダークモードに切替|ライトモードに切替|テーマ切替/,
    });
    await themeToggle.click();

    // next-themesはlocalStorageの"theme"キーに保存する
    const themeValue = await page.evaluate(() =>
      localStorage.getItem("theme")
    );
    expect(themeValue).toBe("dark");
  });
});

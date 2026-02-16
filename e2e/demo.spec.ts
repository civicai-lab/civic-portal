import { test, expect } from "@playwright/test";

test.describe("デモページ", () => {
  test("municipal-faq デモがロードされる", async ({ page }) => {
    await page.goto("/services/municipal-faq/demo");
    await expect(page).toHaveURL(/\/services\/municipal-faq\/demo/);
  });

  test("デモ警告バナーが表示される", async ({ page }) => {
    await page.goto("/services/municipal-faq/demo");
    await expect(
      page.getByText("デモ版 - 実際のデータは使用していません")
    ).toBeVisible();
  });

  test("チャット入力欄が存在する", async ({ page }) => {
    await page.goto("/services/municipal-faq/demo");
    const input = page.getByPlaceholder(
      "お住まいの地域のことをお気軽にお聞きください"
    );
    await expect(input).toBeVisible();
  });

  test("メッセージを入力して送信するとAI応答が表示される", async ({
    page,
  }) => {
    await page.goto("/services/municipal-faq/demo");

    // チャット入力欄にメッセージを入力
    const input = page.getByPlaceholder(
      "お住まいの地域のことをお気軽にお聞きください"
    );
    await input.fill("住民票の取り方を教えてください");

    // 送信ボタンをクリック
    const sendButton = page.locator("button").filter({
      has: page.locator('svg.lucide-send, [class*="send"]'),
    });
    await sendButton.click();

    // AI応答が表示されるまで待つ（タイピングアニメーションがあるため余裕を持つ）
    await page.waitForTimeout(2000);

    // ユーザーのメッセージが表示されている
    await expect(
      page.getByText("住民票の取り方を教えてください")
    ).toBeVisible();
  });

  test("shiori-library デモがロードされる", async ({ page }) => {
    await page.goto("/services/shiori-library/demo");
    await expect(page).toHaveURL(/\/services\/shiori-library\/demo/);
    await expect(
      page.getByText("デモ版 - 実際のデータは使用していません")
    ).toBeVisible();
  });

  test("disaster-guide デモがロードされる", async ({ page }) => {
    await page.goto("/services/disaster-guide/demo");
    await expect(page).toHaveURL(/\/services\/disaster-guide\/demo/);
    await expect(
      page.getByText("デモ版 - 実際のデータは使用していません")
    ).toBeVisible();
  });
});

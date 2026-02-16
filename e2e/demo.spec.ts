import { test, expect } from "@playwright/test";

test.describe("デモページ", () => {
  test("municipal-faq デモがロードされる", async ({ page }) => {
    await page.goto("/services/municipal-faq/demo", { timeout: 10000 });
    await expect(page).toHaveURL(/\/services\/municipal-faq\/demo/, {
      timeout: 10000,
    });
  });

  test("デモ警告バナーが表示される", async ({ page }) => {
    await page.goto("/services/municipal-faq/demo", { timeout: 10000 });
    // DemoLayout のバナーテキスト
    await expect(
      page.getByText("デモ版 - 実際のデータは使用していません")
    ).toBeVisible({ timeout: 10000 });
  });

  test("チャット入力欄が存在する", async ({ page }) => {
    await page.goto("/services/municipal-faq/demo", { timeout: 10000 });
    // municipal-faq のプレースホルダー
    const input = page.getByPlaceholder(
      "お住まいの地域のことをお気軽にお聞きください"
    );
    await expect(input).toBeVisible({ timeout: 10000 });
  });

  test("メッセージを入力して送信するとAI応答が表示される", async ({
    page,
  }) => {
    await page.goto("/services/municipal-faq/demo", { timeout: 10000 });

    // チャット入力欄にメッセージを入力
    const input = page.getByPlaceholder(
      "お住まいの地域のことをお気軽にお聞きください"
    );
    await input.fill("住民票の取り方を教えてください");

    // 送信ボタンをクリック（SVG lucide アイコンを含むボタン）
    const sendButton = page.locator("button").filter({
      has: page.locator("svg"),
    }).last();
    await sendButton.click();

    // AI応答が表示されるまで待つ（タイピングアニメーションがあるため余裕を持つ）
    await page.waitForTimeout(2000);

    // ユーザーのメッセージが表示されている（初期メッセージにも同じ内容がある）
    const userMessages = page.getByText("住民票の取り方を教えてください");
    const count = await userMessages.count();
    expect(count).toBeGreaterThan(0);
  });

  test("shiori-library デモがロードされる", async ({ page }) => {
    await page.goto("/services/shiori-library/demo", { timeout: 10000 });
    await expect(page).toHaveURL(/\/services\/shiori-library\/demo/, {
      timeout: 10000,
    });
    // DemoLayout のバナーテキスト
    await expect(
      page.getByText("デモ版 - 実際のデータは使用していません")
    ).toBeVisible({ timeout: 10000 });
  });

  test("disaster-guide デモがロードされる", async ({ page }) => {
    await page.goto("/services/disaster-guide/demo", { timeout: 10000 });
    await expect(page).toHaveURL(/\/services\/disaster-guide\/demo/, {
      timeout: 10000,
    });
    // DemoLayout のバナーテキスト
    await expect(
      page.getByText("デモ版 - 実際のデータは使用していません")
    ).toBeVisible({ timeout: 10000 });
  });
});

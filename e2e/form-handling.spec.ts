import { test, expect } from "@playwright/test";

test.describe("フォームバリデーション", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact", { timeout: 10000 });
    // ブラウザのネイティブバリデーションを無効化して
    // カスタムJSバリデーションをテストする
    await page.locator("form").evaluate((form) => {
      form.setAttribute("novalidate", "");
    });
  });

  test("空のフォーム送信でエラーメッセージが表示される", async ({ page }) => {
    // フォームの必須フィールドを空のまま送信ボタンをクリック
    await page.getByRole("button", { name: "お問い合わせを送信" }).click();

    // aria-invalid="true" の要素が1つ以上存在する
    const invalidFields = page.locator("[aria-invalid='true']");
    await expect(invalidFields.first()).toBeVisible({ timeout: 5000 });
    const count = await invalidFields.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("各必須フィールドにエラーメッセージが表示される", async ({ page }) => {
    await page.getByRole("button", { name: "お問い合わせを送信" }).click();

    // 名前フィールドのエラー
    await expect(
      page.getByText("お名前を入力してください")
    ).toBeVisible({ timeout: 5000 });

    // フォーカスは最初のエラーフィールド（name）に移動する
    const focused = page.locator(":focus");
    await expect(focused).toHaveAttribute("id", "name", { timeout: 5000 });
  });

  test("不正なメールアドレスでエラーが表示される", async ({ page }) => {
    // 名前と組織名は入力し、メールアドレスだけ不正
    await page.locator("#name").fill("テスト太郎");
    await page.locator("#email").fill("invalid-email");
    await page.locator("#organization").fill("テスト自治体");
    await page.locator("#message").fill("テストメッセージです。");

    await page.getByRole("button", { name: "お問い合わせを送信" }).click();

    // メールアドレス形式エラーメッセージが表示される
    await expect(
      page.getByText("メールアドレスの形式が正しくありません")
    ).toBeVisible({ timeout: 5000 });

    // メールフィールドがaria-invalid="true"になる
    await expect(page.locator("#email")).toHaveAttribute(
      "aria-invalid",
      "true",
      { timeout: 5000 }
    );
  });

  test("正常なフォーム送信で成功画面が表示される", async ({ page }) => {
    await page.locator("#name").fill("テスト太郎");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#organization").fill("テスト自治体");
    await page.locator("#message").fill("テストメッセージです。");

    await page.getByRole("button", { name: "お問い合わせを送信" }).click();

    // 送信中の表示
    await expect(page.getByText("送信中...")).toBeVisible({ timeout: 5000 });

    // 成功画面が表示される（1秒のシミュレーション後）
    await expect(
      page.getByText("お問い合わせありがとうございます")
    ).toBeVisible({ timeout: 10000 });

    // トップページに戻るリンクが表示される
    await expect(
      page.getByRole("link", { name: "トップページに戻る" })
    ).toBeVisible({ timeout: 5000 });
  });

  test("成功画面から別のお問い合わせを送るボタンでフォームに戻れる", async ({
    page,
  }) => {
    // フォーム送信
    await page.locator("#name").fill("テスト太郎");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#organization").fill("テスト自治体");
    await page.locator("#message").fill("テストメッセージです。");
    await page.getByRole("button", { name: "お問い合わせを送信" }).click();

    // 成功画面を待つ
    await expect(
      page.getByText("お問い合わせありがとうございます")
    ).toBeVisible({ timeout: 10000 });

    // 別のお問い合わせを送るボタンをクリック
    await page.getByRole("button", { name: "別のお問い合わせを送る" }).click();

    // フォームに戻り、フィールドがクリアされている
    await expect(page.locator("#name")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("#name")).toHaveValue("");
    await expect(page.locator("#email")).toHaveValue("");
    await expect(page.locator("#message")).toHaveValue("");
  });

  test("文字数カウンターが表示される", async ({ page }) => {
    // 初期状態で0/1000文字が表示される
    await expect(page.getByText("0/1000文字")).toBeVisible({ timeout: 5000 });

    // テキストを入力すると文字数が更新される
    await page.locator("#message").fill("テスト");
    await expect(page.getByText("3/1000文字")).toBeVisible({ timeout: 5000 });
  });

  test("送信試行後にリアルタイムバリデーションが動作する", async ({
    page,
  }) => {
    // まず空のまま送信を試みる
    await page.getByRole("button", { name: "お問い合わせを送信" }).click();

    // エラーが表示される
    await expect(
      page.getByText("お名前を入力してください")
    ).toBeVisible({ timeout: 5000 });

    // 名前を入力するとエラーが消える（リアルタイムバリデーション）
    await page.locator("#name").fill("テスト太郎");

    // 名前のエラーメッセージが消える
    await expect(
      page.getByText("お名前を入力してください")
    ).not.toBeVisible({ timeout: 5000 });
  });
});

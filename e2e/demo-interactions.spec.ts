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

  test("rfp-support デモ: ウィザードのステップ進行が動作する", async ({
    page,
  }) => {
    await page.goto("/services/rfp-support/demo", { timeout: 10000 });

    // Step 1: サービス種別と契約期間を選択（必須項目）
    await page.getByRole("button", { name: "AI開発" }).click();
    await page.getByRole("button", { name: "1年" }).click();

    // 「次へ」ボタンをクリック
    await page.getByRole("button", { name: "次へ" }).click();

    // Step 2: 要件チェックリストが表示される
    await expect(page.getByText("要件チェックリスト")).toBeVisible({
      timeout: 10000,
    });
  });

  test("ai-audit デモ: タブ切替が動作する", async ({ page }) => {
    await page.goto("/services/ai-audit/demo", { timeout: 10000 });

    // リスクマトリクスタブをクリック
    await page.getByRole("tab", { name: /リスクマトリクス|マトリクス/ }).click();

    // リスクマトリクスタブがアクティブになる
    await expect(
      page.getByRole("tab", { name: /リスクマトリクス|マトリクス/ })
    ).toHaveAttribute("data-state", "active", { timeout: 10000 });
  });

  test("minutes-summary デモ: ステップ進行が動作する", async ({ page }) => {
    await page.goto("/services/minutes-summary/demo", { timeout: 10000 });

    // サンプルを読み込んでテキストをセット
    await page.getByRole("button", { name: "サンプルを読み込む" }).click();

    // 「要約を生成」ボタンをクリック
    await page.getByRole("button", { name: /要約を生成/ }).click();

    // Step 2: AI処理中の画面が表示される
    await expect(
      page.getByText("AIが議事録を分析しています")
    ).toBeVisible({ timeout: 10000 });
  });

  test("welfare-navigator デモ: 質問フローが動作する", async ({ page }) => {
    await page.goto("/services/welfare-navigator/demo", { timeout: 10000 });

    // 最初の質問が表示される
    await expect(page.getByText("世帯構成を教えてください")).toBeVisible({
      timeout: 10000,
    });

    // 選択肢「単身」をクリックして次の質問へ進む
    await page.getByRole("button", { name: "単身" }).click();

    // 次の質問が表示される
    await expect(page.getByText("お困りごとは何ですか？")).toBeVisible({
      timeout: 10000,
    });
  });

  test("assembly-archive デモ: 検索で結果が絞り込まれる", async ({
    page,
  }) => {
    await page.goto("/services/assembly-archive/demo", { timeout: 10000 });

    // クイック検索「防災」ボタンをクリック
    await page.getByRole("button", { name: "防災" }).click();

    // 検索結果が絞り込まれる（8件 → 2件）
    await expect(page.getByRole("tab", { name: /検索結果 \(2\)/ })).toBeVisible({
      timeout: 10000,
    });
  });

  test("infra-inspection デモ: タブ切替が動作する", async ({ page }) => {
    await page.goto("/services/infra-inspection/demo", { timeout: 10000 });

    // 統計タブをクリック
    await page.getByRole("tab", { name: /統計/ }).click();

    // 統計タブがアクティブになる
    await expect(
      page.getByRole("tab", { name: /統計/ })
    ).toHaveAttribute("data-state", "active", { timeout: 10000 });
  });

  test("tourism-analytics デモ: タブ切替が動作する", async ({ page }) => {
    await page.goto("/services/tourism-analytics/demo", { timeout: 10000 });

    // 言語分析タブをクリック
    await page.getByRole("tab", { name: /言語分析/ }).click();

    // 言語分析タブがアクティブになる
    await expect(
      page.getByRole("tab", { name: /言語分析/ })
    ).toHaveAttribute("data-state", "active", { timeout: 10000 });
  });

  test("ai-reskilling デモ: ステップ進行が動作する", async ({ page }) => {
    await page.goto("/services/ai-reskilling/demo", { timeout: 10000 });

    // Step 1: 役職と経験年数を選択（必須項目）
    await page.getByRole("button", { name: "管理職" }).click();
    await page.getByRole("button", { name: "3-10年" }).click();

    // 「次へ」ボタンをクリック
    await page.getByRole("button", { name: "次へ" }).click();

    // Step 2: スキル自己評価画面が表示される
    await expect(page.getByText("スキル自己評価")).toBeVisible({
      timeout: 10000,
    });
  });
});

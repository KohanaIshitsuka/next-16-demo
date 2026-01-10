import { expect, test } from "@playwright/test";

test.describe("認証ページ", () => {
  test("ログイン画面が表示される", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "ログイン"
    );
    await expect(page.getByLabel("メールアドレス")).toBeVisible();
    await expect(page.getByLabel("パスワード")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "ログイン" })
    ).toBeVisible();
  });

  test("新規登録画面が表示される", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "新規登録"
    );
    await expect(page.getByLabel("メールアドレス")).toBeVisible();
    await expect(page.getByLabel("パスワード")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "アカウントを作成" })
    ).toBeVisible();
  });
});

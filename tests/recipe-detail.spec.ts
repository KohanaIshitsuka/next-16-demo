import { expect, test } from "@playwright/test";

test("レシピ一覧から詳細ページへ遷移できる", async ({ page }) => {
  await page.goto("/");

  const firstDetailLink = page.getByRole("link", { name: "レシピを見る" }).first();
  await firstDetailLink.click();

  await expect(page).toHaveURL(/\/recipes\/\d+$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "焦がしバターのきのこリゾット"
  );
});

test("詳細ページに直接アクセスできる", async ({ page }) => {
  await page.goto("/recipes/1");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "焦がしバターのきのこリゾット"
  );
});

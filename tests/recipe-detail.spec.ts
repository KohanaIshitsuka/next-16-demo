import { expect, test } from "@playwright/test";

const recipeId = process.env.PLAYWRIGHT_RECIPE_ID;
const recipeTitle = process.env.PLAYWRIGHT_RECIPE_TITLE;
const hasRecipeFixture = Boolean(recipeId && recipeTitle);

test.describe("レシピ詳細ページ", () => {
  test.skip(!hasRecipeFixture, "PLAYWRIGHT_RECIPE_ID と TITLE が未設定です。");

  test("レシピ一覧から詳細ページへ遷移できる", async ({ page }) => {
    await page.goto("/");

    const firstDetailLink = page
      .getByRole("link", { name: "レシピを見る" })
      .first();
    await firstDetailLink.click();

    await expect(page).toHaveURL(/\/recipes\/\d+$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      recipeTitle as string
    );
  });

  test("詳細ページに直接アクセスできる", async ({ page }) => {
    await page.goto(`/recipes/${recipeId}`);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      recipeTitle as string
    );
  });
});

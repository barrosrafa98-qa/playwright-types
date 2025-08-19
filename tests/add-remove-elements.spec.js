const { test, expect } = require('@playwright/test');

test.describe('Add/Remove Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // baseURL vem do config
    await page.getByRole('link', { name: 'Add/Remove Elements' }).click();
    await expect(page).toHaveURL(/\/add_remove_elements\//);
  });

  test('adicionar 1 elemento e remover', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: 'Add Element' });
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    // adiciona 1
    await addBtn.click();
    await expect(deleteButtons).toHaveCount(1);

    // remove
    await deleteButtons.first().click();
    await expect(deleteButtons).toHaveCount(0);
  });

  test('adicionar múltiplos e remover pelo índice', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: 'Add Element' });
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    // adiciona 5
    for (let i = 0; i < 5; i++) await addBtn.click();
    await expect(deleteButtons).toHaveCount(5);

    // remove o 3º (índice 2) e depois o primeiro
    await deleteButtons.nth(2).click();
    await expect(deleteButtons).toHaveCount(4);
    await deleteButtons.first().click();
    await expect(deleteButtons).toHaveCount(3);
  });

  test('adicionar 3, remover todos', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: 'Add Element' });
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    // adiciona 3
    await addBtn.click();
    await addBtn.click();
    await addBtn.click();
    await expect(deleteButtons).toHaveCount(3);

    // remove todos (enquanto existir)
    while (await deleteButtons.count() > 0) {
      await deleteButtons.first().click();
    }
    await expect(deleteButtons).toHaveCount(0);
  });
});

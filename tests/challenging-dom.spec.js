const { test, expect } = require('@playwright/test');

test.describe('Challenging DOM', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Challenging DOM' }).click();
    await expect(page).toHaveURL(/\/challenging_dom$/);
    await expect(page.getByRole('heading', { name: 'Challenging DOM' })).toBeVisible();
  });

  test('elementos principais visíveis (canvas e botões)', async ({ page }) => {
    // Canvas presente e com dimensões > 0
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    const { width, height } = await canvas.evaluate(c => ({ width: c.width, height: c.height }));
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);

    // Três botões (azul, vermelho alert, verde success)
    const buttons = page.locator('.button, .button.alert, .button.success');
    await expect(buttons).toHaveCount(3);
    await expect(buttons.nth(0)).toBeVisible();
    await expect(buttons.nth(1)).toBeVisible();
    await expect(buttons.nth(2)).toBeVisible();
  });

  test('headers da tabela estão corretos', async ({ page }) => {
    const headers = page.locator('table thead th');
    const texts = await headers.allTextContents();
    // A página costuma ter estes headers:
    const expected = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Diceret', 'Action'];
    // cada esperado deve existir na lista de headers
    for (const h of expected) {
      expect(texts).toContain(h);
    }

    // deve haver linhas no corpo
    const rows = page.locator('table tbody tr');
    await expect(rows.first()).toBeVisible();
    expect(await rows.count()).toBeGreaterThan(0);
  });

  test('clique em Edit/Delete muda o fragmento da URL', async ({ page }) => {
    const firstRow = page.locator('table tbody tr').first();

    // Edit
    await firstRow.getByRole('link', { name: /^edit$/i }).click();
    await expect(page).toHaveURL(/#edit$/);

    // Delete
    await firstRow.getByRole('link', { name: /^delete$/i }).click();
    await expect(page).toHaveURL(/#delete$/);
  });

  test('IDs dos botões mudam após clique', async ({ page }) => {
    // Seleciona os 3 botões por ordem visual
    const blue   = page.locator('.button').first();           // azul
    const red    = page.locator('.button.alert');             // vermelho (alert)
    const green  = page.locator('.button.success');           // verde (success)

    // captura IDs antes do clique
    const idBeforeBlue  = await blue.getAttribute('id');
    const idBeforeRed   = await red.getAttribute('id');
    const idBeforeGreen = await green.getAttribute('id');

    // clica em cada um
    await blue.click();
    await red.click();
    await green.click();

    // IDs devem ter mudado
    const idAfterBlue  = await blue.getAttribute('id');
    const idAfterRed   = await red.getAttribute('id');
    const idAfterGreen = await green.getAttribute('id');

    expect(idBeforeBlue).not.toBe(idAfterBlue);
    expect(idBeforeRed).not.toBe(idAfterRed);
    expect(idBeforeGreen).not.toBe(idAfterGreen);
  });
});

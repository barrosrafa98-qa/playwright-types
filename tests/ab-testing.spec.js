const { test, expect } = require('@playwright/test');

test('A/B Testing – navegação e validação do título/descrição', async ({ page }) => {
  // 1) abre a home
  await page.goto('/');

  // 2) clica no link "A/B Testing" usando seletor acessível
  await page.getByRole('link', { name: 'A/B Testing' }).click();

  // 3) garante que estamos na rota correta
  await expect(page).toHaveURL(/\/abtest$/);

  // 4) o título da página muda conforme a variação do experimento
  //    Aceite "A/B Test Variation 1" ou "A/B Test Control"
  const heading = page.getByRole('heading', { level: 3 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(/A\/B Test (Variation 1|Control)/);

  // 5) texto descritivo (parágrafo) aparece na página
  const paragraph = page.locator('#content p');
  await expect(paragraph.first()).toBeVisible();

  // 6) (opcional) volta para a home e revalida o link existe
  await page.getByRole('link', { name: 'Elemental Selenium' }).waitFor(); // só para garantir carregamento
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'A/B Testing' })).toBeVisible();
});

const { test, expect } = require('@playwright/test');

test.describe('Basic Auth', () => {
  // Credenciais corretas para o site: admin / admin
  test.use({
    httpCredentials: { username: 'admin', password: 'admin' },
  });

  test('acessa /basic_auth com credenciais válidas', async ({ page }) => {
    const resp = await page.goto('/basic_auth');
    // servidor deve responder 200
    expect(resp.status()).toBe(200);

    // valida mensagem de sucesso
    await expect(page.locator('#content')).toContainText('Congratulations!');
    await expect(page.locator('p')).toContainText('You must have the proper credentials.');
  });
});

// Cenário negativo: credenciais incorretas → 401
test('nega acesso com credenciais inválidas (401)', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'https://the-internet.herokuapp.com',
    httpCredentials: { username: 'wrong', password: 'creds' },
  });
  const page = await context.newPage();
  const resp = await page.goto('/basic_auth');

  expect(resp.status()).toBe(401);
  // a página não deve conter o texto de sucesso
  await expect(page.getByText('Congratulations!')).toHaveCount(0);
});
 // Override pontual dentro do próprio teste (útil se o restante da suíte não precisa de auth)
test('override pontual de credenciais dentro do teste', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'https://the-internet.herokuapp.com',
    httpCredentials: { username: 'admin', password: 'admin' },
  });
  const page = await context.newPage();
  await page.goto('/basic_auth');
  await expect(page.locator('#content')).toContainText('Congratulations!');
  await context.close();
});

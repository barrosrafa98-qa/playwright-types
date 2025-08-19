const { test, expect } = require('@playwright/test');

test.describe('Broken Images', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Broken Images' }).click();
    await expect(page).toHaveURL(/\/broken_images$/);
  });

  test('detectar imagens quebradas via DOM (naturalWidth/complete)', async ({ page }, testInfo) => {
    await page.waitForLoadState('load');
    await page.waitForTimeout(300); // dá tempo de disparar onload/onerror

    const results = await page.locator('#content img').evaluateAll(images =>
      images.map(img => ({
        src: img.getAttribute('src'),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        ok: img.complete && img.naturalWidth > 0, // true se renderizou de fato
      }))
    );

    await testInfo.attach('broken-images-dom.json', {
      contentType: 'application/json',
      body: JSON.stringify(results, null, 2),
    });

    const total = results.length;
    const broken = results.filter(r => !r.ok);
    const valid  = results.filter(r =>  r.ok);

    expect(total).toBeGreaterThan(0);
    expect(broken.length).toBeGreaterThan(0);
  });

  test('validar respostas de rede das imagens (status codes)', async ({ page }, testInfo) => {
    const imageResponses = [];
    page.on('response', resp => {
      if (resp.request().resourceType() === 'image') {
        imageResponses.push({ url: resp.url(), status: resp.status() });
      }
    });

    await page.reload({ waitUntil: 'networkidle' });

    await testInfo.attach('broken-images-network.json', {
      contentType: 'application/json',
      body: JSON.stringify(imageResponses, null, 2),
    });

    expect(imageResponses.length).toBeGreaterThan(0);

    const bad = imageResponses.filter(r => r.status >= 400);
    expect(bad.length).toBeGreaterThan(0); // ao menos 1 quebrada
  });
});

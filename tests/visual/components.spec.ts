import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Helper to create a test page with a component
function createTestPage(html: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; background: #090a0c; color: #f6f5f5; }
    .test-container { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; }
  </style>
</head>
<body>
  <div class="test-container">${html}</div>
</body>
</html>`;
}

test.describe('Badge Components', () => {
  test('badge variants render correctly', async ({ page }) => {
    const html = createTestPage(`
      <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(126,186,181,0.15);color:#7ebab5;">Shipped</div>
      <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(239,68,68,0.15);color:#ef4444;">Failed</div>
      <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(34,197,94,0.15);color:#22c55e;">Building</div>
      <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(234,179,8,0.15);color:#eab308;">Researching</div>
    `);
    await page.setContent(html);
    await expect(page.locator('.test-container')).toHaveScreenshot('badge-variants.png');
  });

  test('tech badges render correctly', async ({ page }) => {
    const html = createTestPage(`
      <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(59,130,246,0.15);color:#3b82f6;">TypeScript</div>
      <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(168,85,247,0.15);color:#a855f7;">Rust</div>
      <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(20,184,166,0.15);color:#14b8a6;">Python</div>
    `);
    await page.setContent(html);
    await expect(page.locator('.test-container')).toHaveScreenshot('tech-badges.png');
  });
});

test.describe('Artifact Card Components', () => {
  test('artifact card renders correctly', async ({ page }) => {
    const html = createTestPage(`
      <div class="phenotype-artifact" style="background:#1c2128;border:1px solid #30363d;border-radius:12px;padding:20px;max-width:320px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(126,186,181,0.15);color:#7ebab5;">Shipped</div>
        </div>
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;color:#f6f5f5;">Omniroute</h3>
        <p style="font-size:13px;color:#8b949e;line-height:1.5;">AI model routing proxy with 40+ providers</p>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(59,130,246,0.15);color:#3b82f6;">TypeScript</div>
          <div class="phenotype-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;background:rgba(168,85,247,0.15);color:#a855f7;">Node.js</div>
        </div>
      </div>
    `);
    await page.setContent(html);
    await expect(page.locator('.test-container')).toHaveScreenshot('artifact-card.png');
  });
});

test.describe('Metric Callout Components', () => {
  test('metric callout renders correctly', async ({ page }) => {
    const html = createTestPage(`
      <div style="background:#1c2128;border:1px solid #30363d;border-radius:12px;padding:20px;text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#7ebab5;">99.9%</div>
        <div style="font-size:13px;color:#8b949e;margin-top:4px;">Uptime</div>
      </div>
      <div style="background:#1c2128;border:1px solid #30363d;border-radius:12px;padding:20px;text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#22c55e;">86</div>
        <div style="font-size:13px;color:#8b949e;margin-top:4px;">Tests Passing</div>
      </div>
      <div style="background:#1c2128;border:1px solid #30363d;border-radius:12px;padding:20px;text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#3b82f6;">5</div>
        <div style="font-size:13px;color:#8b949e;margin-top:4px;">Packages</div>
      </div>
    `);
    await page.setContent(html);
    await expect(page.locator('.test-container')).toHaveScreenshot('metric-callouts.png');
  });
});

test.describe('Lightbox Component', () => {
  test('lightbox backdrop renders correctly', async ({ page }) => {
    const html = `
    <html>
    <head>
      <style>
        body { margin: 0; padding: 0; background: #090a0c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .backdrop { position: relative; width: 100vw; height: 100vh; background: rgba(0,0,0,0.92); display: flex; align-items: center; justify-content: center; }
        .content { max-width: 400px; background: #1c2128; border-radius: 12px; padding: 40px; text-align: center; color: #f6f5f5; }
      </style>
    </head>
    <body>
      <div class="backdrop">
        <div class="content">
          <div style="font-size:48px;margin-bottom:16px;">🖼️</div>
          <div style="font-size:14px;color:#8b949e;">Lightbox Preview</div>
        </div>
      </div>
    </body>
    </html>`;
    await page.setContent(html);
    await expect(page.locator('body')).toHaveScreenshot('lightbox.png');
  });
});

test.describe('Glassmorphism Panel', () => {
  test('glass panel renders correctly', async ({ page }) => {
    const html = `
    <html>
    <head>
      <style>
        body { margin: 0; padding: 24px; background: linear-gradient(135deg, #090a0c 0%, #1a1c1e 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .glass { background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px; color: #f6f5f5; }
      </style>
    </head>
    <body>
      <div class="glass" style="max-width:400px;">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:8px;">Glassmorphism Panel</h3>
        <p style="font-size:13px;color:#8b949e;line-height:1.5;">Frosted glass effect with backdrop blur and subtle border.</p>
      </div>
    </body>
    </html>`;
    await page.setContent(html);
    await expect(page.locator('body')).toHaveScreenshot('glass-panel.png');
  });
});

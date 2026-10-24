import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const source = readFileSync('src/ideasoft-help-popup.js', 'utf8');
function setup(
  config,
  url = 'https://store.example/urun/test?token=private#customer',
) {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url,
    runScripts: 'outside-only',
  });
  const { window } = dom;
  window.IDEASOFT_HELP_POPUP_CONFIG = config;
  window.eval(source);
  window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
  return { dom, window, document: window.document };
}
const valid = {
  actions: [{ type: 'link', text: 'Destek', href: '/destek' }],
  bubbleDuration: 0,
};

test('no configuration creates no misdirected support widget', () => {
  const app = setup(undefined);
  assert.equal(app.document.querySelector('.md-help'), null);
  app.dom.window.close();
});

test('checked-in example has no active phone number or invented store links', () => {
  const app = setup(undefined);
  app.window.eval(readFileSync('config.example.js', 'utf8'));
  assert.equal(app.window.IDEASOFT_HELP_POPUP_CONFIG.whatsappNumber, '');
  assert.equal(app.window.IDEASOFT_HELP_POPUP_CONFIG.includePageUrl, false);
  app.dom.window.close();
});

for (const pathname of [
  '/sepet',
  '/sepet/',
  '/sepet/adim-2',
  '/odeme',
  '/ODEME/',
  '/odeme/basarili',
]) {
  test(`cart and checkout are excluded: ${pathname}`, () => {
    const app = setup(valid, `https://store.example${pathname}`);
    assert.equal(app.document.querySelector('.md-help'), null);
    app.dom.window.close();
  });
}

test('extra exclusions are normalized and do not match unrelated prefixes', () => {
  for (const [pathname, expected] of [
    ['/hesap/profil', false],
    ['/hesaplar', true],
  ]) {
    const app = setup(
      { ...valid, excludedPaths: ['/hesap/'] },
      `https://store.example${pathname}`,
    );
    assert.equal(Boolean(app.document.querySelector('.md-help')), expected);
    app.dom.window.close();
  }
});

test('text settings cannot inject markup', () => {
  const payload = '<img src=x onerror=alert(1)>';
  const app = setup({
    ...valid,
    title: payload,
    welcomeText: payload,
    brandName: payload,
  });
  assert.equal(app.document.querySelectorAll('img').length, 0);
  assert.equal(app.document.querySelector('h2').textContent, payload);
  app.dom.window.close();
});

for (const href of [
  'javascript:alert(1)',
  'data:text/html,hello',
  'http://insecure.example',
  'https://user:pass@example.com',
  '\n javascript:alert(1)',
]) {
  test(`rejects unsafe action URL: ${href}`, () => {
    const app = setup({
      ...valid,
      actions: [...valid.actions, { type: 'link', text: 'unsafe', href }],
    });
    assert.equal(app.document.querySelectorAll('nav a').length, 1);
    app.dom.window.close();
  });
}

test('safe external links have opener protection', () => {
  const app = setup({
    ...valid,
    actions: [
      { type: 'link', href: 'https://support.example/', target: '_blank' },
    ],
  });
  assert.equal(app.document.querySelector('nav a').rel, 'noopener noreferrer');
  app.dom.window.close();
});

test('WhatsApp does not share page address by default', () => {
  const app = setup({ whatsappNumber: '12025550123', bubbleDuration: 0 });
  const href = new URL(app.document.querySelector('nav a').href);
  assert.equal(href.hostname, 'wa.me');
  assert.equal(href.searchParams.get('text').includes('store.example'), false);
  app.dom.window.close();
});

test('opt-in page sharing omits query tokens and fragments', () => {
  const app = setup({
    whatsappNumber: '12025550123',
    includePageUrl: true,
    bubbleDuration: 0,
  });
  const text = new URL(
    app.document.querySelector('nav a').href,
  ).searchParams.get('text');
  assert.ok(text.includes('https://store.example/urun/test'));
  assert.equal(text.includes('private'), false);
  assert.equal(text.includes('customer'), false);
  app.dom.window.close();
});

test('invalid phone is omitted while other valid links remain available', () => {
  const app = setup({
    ...valid,
    whatsappNumber: '+90 invalid',
    actions: [{ type: 'whatsapp' }, ...valid.actions],
  });
  assert.equal(app.document.querySelectorAll('nav a').length, 1);
  app.dom.window.close();
});

test('widget opens with semantic button, Escape closes and restores focus', () => {
  const app = setup(valid);
  const toggle = app.document.querySelector('.md-help__toggle');
  const panel = app.document.querySelector('.md-help__panel');
  toggle.click();
  assert.equal(panel.hidden, false);
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(app.document.activeElement.className, 'md-help__close');
  app.document.activeElement.dispatchEvent(
    new app.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
  );
  assert.equal(panel.hidden, true);
  assert.equal(app.document.activeElement, toggle);
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  app.dom.window.close();
});

test('double loading creates one widget only', () => {
  const app = setup(valid);
  app.window.eval(source);
  assert.equal(app.document.querySelectorAll('.md-help').length, 1);
  app.dom.window.close();
});

test('malformed config arrays and CSS injection are safely ignored', () => {
  const app = setup({
    ...valid,
    primaryColor: 'red;}body{display:none',
    excludedPaths: [null, 1, {}],
    actions: [null, {}, ...valid.actions],
  });
  assert.equal(
    app.document
      .querySelector('.md-help')
      .style.getPropertyValue('--md-help-accent'),
    '#9f1239',
  );
  assert.equal(app.document.querySelectorAll('nav a').length, 1);
  app.dom.window.close();
});

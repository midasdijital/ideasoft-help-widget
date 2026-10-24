/** Midas Dijital — accessible IdeaSoft support widget. MIT License. */
(function () {
  'use strict';

  if (window.MidasHelpWidgetInstalled) return;
  window.MidasHelpWidgetInstalled = true;

  function safeUrl(value) {
    if (typeof value !== 'string' || /[\u0000-\u0020\u007f]/.test(value))
      return null;
    try {
      const url = new URL(value, window.location.origin);
      if (
        !['https:', 'http:'].includes(url.protocol) ||
        url.username ||
        url.password
      )
        return null;
      if (window.location.protocol === 'https:' && url.protocol !== 'https:')
        return null;
      return url.href;
    } catch {
      return null;
    }
  }

  function text(value, fallback, max = 250) {
    return typeof value === 'string' && value.trim()
      ? value.trim().slice(0, max)
      : fallback;
  }

  function path(value) {
    if (typeof value !== 'string' || !value.startsWith('/')) return null;
    return value.replace(/\/+$/, '').toLowerCase() || '/';
  }

  function delay(value, fallback) {
    return Number.isFinite(value) && value >= 0 && value <= 60000
      ? value
      : fallback;
  }

  function configuration() {
    const raw = window.IDEASOFT_HELP_POPUP_CONFIG;
    const input =
      raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    const number =
      typeof input.whatsappNumber === 'string' ? input.whatsappNumber : '';
    return {
      brandName: text(input.brandName, 'Mağazanız', 80),
      title: text(input.title, 'Yardım merkezi', 100),
      subtitle: text(input.subtitle, 'Size nasıl yardımcı olabiliriz?'),
      welcomeText: text(
        input.welcomeText,
        'Destek seçeneklerimizden birini seçin.',
      ),
      logoUrl: input.logoUrl ? safeUrl(input.logoUrl) : null,
      primaryColor: /^#[\da-f]{6}$/i.test(input.primaryColor)
        ? input.primaryColor
        : '#9f1239',
      whatsappNumber: /^[1-9]\d{7,14}$/.test(number) ? number : '',
      includePageUrl: input.includePageUrl === true,
      bubbleText: text(input.bubbleText, 'Yardıma mı ihtiyacınız var?'),
      bubbleDelay: delay(input.bubbleDelay, 3000),
      bubbleDuration: delay(input.bubbleDuration, 5000),
      excludedPaths: [
        '/sepet',
        '/odeme',
        ...(Array.isArray(input.excludedPaths) ? input.excludedPaths : []),
      ]
        .map(path)
        .filter(Boolean),
      actions: Array.isArray(input.actions) ? input.actions.slice(0, 12) : [],
    };
  }

  function element(tag, className, content) {
    const node = document.createElement(tag);
    node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function start() {
    const cfg = configuration();
    const currentPath = path(window.location.pathname);
    if (
      cfg.excludedPaths.some(
        (excluded) =>
          currentPath === excluded ||
          (excluded !== '/' && currentPath.startsWith(`${excluded}/`)),
      )
    )
      return;
    if (document.getElementById('midas-help-widget')) return;

    const root = element('aside', 'md-help');
    root.id = 'midas-help-widget';
    root.setAttribute('aria-label', cfg.title);
    root.style.setProperty('--md-help-accent', cfg.primaryColor);

    const toggle = element('button', 'md-help__toggle', 'Yardım');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'midas-help-panel');
    toggle.setAttribute('aria-label', `${cfg.title} aç`);

    const panel = element('section', 'md-help__panel');
    panel.id = 'midas-help-panel';
    panel.hidden = true;
    panel.setAttribute('aria-labelledby', 'midas-help-title');

    const header = element('div', 'md-help__header');
    if (cfg.logoUrl) {
      const image = element('img', 'md-help__logo');
      image.src = cfg.logoUrl;
      image.alt = cfg.brandName;
      image.referrerPolicy = 'no-referrer';
      image.width = 40;
      image.height = 40;
      image.addEventListener('error', () => image.remove(), { once: true });
      header.append(image);
    }
    const heading = element('h2', 'md-help__title', cfg.title);
    heading.id = 'midas-help-title';
    header.append(heading);
    const close = element('button', 'md-help__close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', 'Yardım merkezini kapat');
    header.append(close);
    panel.append(
      header,
      element('p', 'md-help__subtitle', cfg.subtitle),
      element('p', 'md-help__welcome', cfg.welcomeText),
    );

    const actions = element('nav', 'md-help__actions');
    actions.setAttribute('aria-label', 'Destek bağlantıları');
    const entries = cfg.actions.length
      ? cfg.actions
      : [{ type: 'whatsapp', text: 'WhatsApp destek' }];
    for (const item of entries) {
      if (!item || typeof item !== 'object') continue;
      let href;
      if (item.type === 'whatsapp') {
        if (!cfg.whatsappNumber) continue;
        let message = `Merhaba, ${cfg.brandName} için yardım almak istiyorum.`;
        // Deliberately omit search/hash: they can contain customer IDs and tokens.
        if (cfg.includePageUrl)
          message += `\n${window.location.origin}${window.location.pathname}`;
        href = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(message)}`;
      } else if (item.type === 'link') {
        href = safeUrl(item.href);
      }
      if (!href) continue;
      const link = element(
        'a',
        'md-help__action',
        text(item.text, 'Destek bağlantısı', 100),
      );
      link.href = href;
      if (item.type === 'whatsapp' || item.target === '_blank') {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      actions.append(link);
    }
    // A missing configuration must not produce a useless or misdirected support control.
    if (!actions.childElementCount) return;
    panel.append(actions);
    const bubble = element('div', 'md-help__bubble', cfg.bubbleText);
    bubble.hidden = true;
    bubble.setAttribute('aria-hidden', 'true');
    root.append(panel, toggle, bubble);
    document.body.append(root);

    let showTimer, hideTimer;
    function dismissBubble() {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      bubble.hidden = true;
    }
    function open() {
      dismissBubble();
      panel.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', `${cfg.title} kapat`);
      close.focus();
    }
    function shut() {
      dismissBubble();
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', `${cfg.title} aç`);
      toggle.focus();
    }
    toggle.addEventListener('click', () => (panel.hidden ? open() : shut()));
    close.addEventListener('click', shut);
    root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) {
        event.preventDefault();
        shut();
      }
    });
    root.addEventListener('focusin', dismissBubble);
    if (cfg.bubbleDuration > 0) {
      showTimer = window.setTimeout(() => {
        if (!root.isConnected || !panel.hidden) return;
        bubble.hidden = false;
        hideTimer = window.setTimeout(() => {
          bubble.hidden = true;
        }, cfg.bubbleDuration);
      }, cfg.bubbleDelay);
    }
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();

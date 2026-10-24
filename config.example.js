/** Load a local copy BEFORE src/ideasoft-help-popup.js. Never add secrets here. */
window.IDEASOFT_HELP_POPUP_CONFIG = {
  brandName: 'Mağazanız',
  title: 'Yardım merkezi',
  subtitle: 'Size nasıl yardımcı olabiliriz?',
  welcomeText: 'Sipariş ve destek işlemleriniz için bizimle iletişime geçin.',
  logoUrl: '',
  primaryColor: '#9f1239',
  // Country code, no plus sign/spaces. Empty keeps WhatsApp disabled.
  whatsappNumber: '',
  // When enabled, shares only origin + pathname; never query parameters/hash.
  includePageUrl: false,
  bubbleText: 'Yardıma mı ihtiyacınız var?',
  bubbleDelay: 3000,
  bubbleDuration: 5000,
  // /sepet and /odeme (including subpaths) are always excluded.
  excludedPaths: [],
  actions: [
    { type: 'whatsapp', text: 'WhatsApp destek' },
    // Add only routes that actually exist in your store:
    // { type: 'link', text: 'Kargom nerede?', href: '/sayfa/kargo-takip' },
  ],
};

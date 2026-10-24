# Midas IdeaSoft Help Widget

[![Doğrulama](https://github.com/midasdijital/midas-ideasoft-help-widget/actions/workflows/ci.yml/badge.svg)](https://github.com/midasdijital/midas-ideasoft-help-widget/actions/workflows/ci.yml)

IdeaSoft mağazaları için WhatsApp ve mağazanın destek sayfalarını erişilebilir bir panelde sunan, bağımsız JavaScript/CSS bileşeni.

**Midas Dijital**, e-ticaret danışmanlığı ve mağaza geliştirme hizmetleri sunan bir ajanstır. Bu proje ajansın açık kaynak tema bileşenidir; IdeaSoft'un resmî ürünü değildir.

> **2.0.0-rc.1 ön sürümü:** Bu sürüm ön sürümdür; gerçek mağaza doğrulaması tamamlanmadan kararlı kabul edilmez. 1.x'teki sabit marka/WhatsApp numarası kaldırıldı. Geçerli bir destek bağlantısı yapılandırılmadıkça widget görünmez.

## Özellikler

- Masaüstünde yardım butonu, mobilde kompakt yan kulakçık.
- Klavye ile açma/kapama, Escape ve odağı geri getirme.
- WhatsApp ve güvenli HTTP(S) bağlantıları; yeni sekmede opener koruması.
- Sepet/ödeme sayfalarında ve alt yollarında otomatik gizleme.
- Kısa yardım balonu, marka rengi ve logo yapılandırması.
- Çalışma zamanı bağımlılığı, uzak font, CDN ve izleme içermez.
- Metinler DOM `textContent` ile yazılır; yapılandırmadaki HTML çalıştırılmaz.

## Kurulum

1. Repoyu klonlayın veya doğrulanmış sürüm ZIP'ini açın.
2. `src/ideasoft-help-popup.js` ve `src/ideasoft-help-popup.css` dosyalarını temanızın statik dosya alanına yükleyin.
3. `config.example.js` dosyasını yerelde `config.local.js` adıyla kopyalayın. Marka, numara ve gerçekten var olan mağaza bağlantılarını düzenleyin. Bu dosya Git'e/dağıtım ZIP'ine alınmaz; tarayıcıdan sunulan içeriği herkes okuyabilir, bu yüzden gizli bilgi içermemelidir.
4. Tema yerleşiminde aşağıdaki sırayla yükleyin. `/assets/` örnektir; gerçek URL'leri mağazanıza göre düzenleyin.

```html
<link rel="stylesheet" href="/assets/ideasoft-help-popup.css" />
<script src="/assets/config.local.js" defer></script>
<script src="/assets/ideasoft-help-popup.js" defer></script>
```

JavaScript dosyası `window.IDEASOFT_HELP_POPUP_CONFIG` değerini bir kez okur. `const config = { ... }` tanımlamak yeterli değildir. Dinamik SPA sayfa geçişleri bu sürümde desteklenmez; hariç tutma ilk sayfa yüklemesinde değerlendirilir. Kaynak dosyaları sayfa başına bir kez yükleyin. Tema önbelleğini temizleyin ve asset URL'lerinin 200 döndüğünü kontrol edin.

## Yapılandırma

Tam örnek [config.example.js](config.example.js) içindedir. Asgari bir mağaza içi destek bağlantısı:

```javascript
window.IDEASOFT_HELP_POPUP_CONFIG = {
  brandName: 'Mağazanız',
  title: 'Yardım merkezi',
  actions: [{ type: 'link', text: 'Destek', href: '/destek' }],
};
```

`/destek` sayfası örnektir; kendi mağazanızda var olan yolu kullanın. WhatsApp için `whatsappNumber` ülke koduyla 8–15 rakam içermeli; `+`, boşluk ve parantez içermemelidir. Geçersiz/boş numara varsa WhatsApp eylemi gösterilmez. Numaranın doğruluğu ve kullanım izni mağazanın sorumluluğudur.

- `brandName`, `title`, `subtitle`, `welcomeText`, `bubbleText`: düz metindir.
- `logoUrl`: isteğe bağlı HTTP(S) görsel adresi. Tercihen aynı mağazada barındırın; uzak sunucu ziyaretçinin IP adresini görebilir. Görsel isteğinde referrer gönderilmez.
- `primaryColor`: altı haneli HEX renk (`#9f1239`); değiştirdiğinizde beyaz buton metninin kontrastını kontrol edin.
- `bubbleDelay`, `bubbleDuration`: 0–60000 ms; süreyi `0` yaparak balonu kapatabilirsiniz.
- `actions`: en fazla 12 adet `link` / `whatsapp` eylemi. Link için `href`, isteğe bağlı `target: '_blank'` kullanılır. `javascript:`, `data:`, kimlik bilgili URL'ler ve HTTPS sayfada HTTP bağlantıları reddedilir.
- `excludedPaths`: ek gizleme yolları. Büyük/küçük harf, sondaki slash ve alt yollar dikkate alınır. `/sepet` ve `/odeme` her zaman gizlidir; mağazanızdaki diğer ödeme yollarını ayrıca ekleyin.
- `includePageUrl`: varsayılan `false`. Açılırsa WhatsApp mesajına yalnızca origin ve pathname eklenir; query parametreleri/hash eklenmez. Yolun kendisi de kişisel bilgi içerebilir; mağazanız için değerlendirin. Mesaj yalnızca müşteri bağlantıya tıklayınca WhatsApp'a gider.

## 1.x'ten geçiş

Eski inline widget'ı ve ZIP'teki eski dosyaları kaldırın. Yeni CSS ve JavaScript'i birlikte yükleyin. Ayarları doğru global değişkenle script'ten önce tanımlayın. Varsayılan müşteri markası ve numarası yoktur. Eski `primaryColorDark`, `desktop`, `mobile` ve `icon` ayarları bu sürümde kullanılmaz; konum/boyut için `.md-help` CSS sınıflarını kendi tema dosyanızda düzenleyin. Bu geçiş arayüz ve yapılandırma değişikliği içerir.

## Sürümü indirme

[v2.0.0-rc.1 ön sürümü](https://github.com/midasdijital/midas-ideasoft-help-widget/releases/tag/v2.0.0-rc.1) sayfasından kurulum ZIP'ini ve `SHA256SUMS.txt` dosyasını indirin. `Source code` arşivleri GitHub'ın otomatik kaynak kopyalarıdır; kuruluma yönelik paket sürüm adını taşıyan ZIP'tir. Kurulumdan önce README geçiş adımlarını izleyin.

## Geliştirme ve dağıtım

Node.js yalnızca geliştirme içindir. Node 24.15+ kullanın.

```sh
git clone https://github.com/midasdijital/midas-ideasoft-help-widget.git
cd midas-ideasoft-help-widget
npm ci --ignore-scripts
npm run validate
```

Kontroller sözdizimi, biçimlendirme, DOM davranış testleri ve ZIP üretimini kapsar. CI ayrıca `npm audit` çalıştırır. `npm run build`, aynı kaynakta aynı baytları veren `dist/midas-ideasoft-help-widget-v2.0.0-rc.1.zip` üretir. Yerel müşteri ayarları ve geliştirme bağımlılıkları pakete alınmaz. CI artifact'i kararlı release anlamına gelmez.

```text
src/                JavaScript ve CSS
config.example.js   Hassas veri içermeyen örnek ayarlar
docs/               Mağaza kabul kontrolleri
tests/              Güvenlik ve erişilebilirlik davranış testleri
scripts/            Kontrol ve dağıtım araçları
```

[Mağaza kabul kontrollerini](docs/store-checklist.md) test temasında tamamlayın. DOM testleri gerçek tarayıcı/IdeaSoft tema testi veya tam erişilebilirlik denetimi değildir. Kod mağazanın ağ isteğine, ödemeye veya sipariş verisine erişmez.

## Güvenlik, katkı ve lisans

[Güvenlik politikası](SECURITY.md) · [Katkı rehberi](CONTRIBUTING.md) · [Değişiklik günlüğü](CHANGELOG.md) · [MIT lisansı](LICENSE)

API anahtarı, sipariş bilgisi ve müşteri verisi eklemeyin. Açık kaynak bileşen hizmet seviyesi veya tüm temalarda çalışma garantisi içermez.

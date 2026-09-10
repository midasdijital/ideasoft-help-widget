# Midas IdeaSoft Help Widget

IdeaSoft e-ticaret mağazaları için geliştirilmiş, hafif ve özelleştirilebilir **yardım ve müşteri destek widget'ı**.

**Midas Dijital E-Ticaret Danışmanlık** tarafından geliştirilmiştir.

Widget; müşterilerin WhatsApp desteğine, kargo takip sayfasına, kampanyalara ve mağazanın belirlediği diğer bağlantılara hızlı şekilde ulaşmasını sağlar.

Mobil cihazlarda ekranı kaplamayan kompakt bir **yan kulakçık**, masaüstünde ise modern bir yardım butonu olarak çalışır.

---

## Özellikler

* IdeaSoft mağazalarıyla uyumlu
* Vanilla JavaScript ile geliştirilmiştir
* Harici framework gerektirmez
* Mobil uyumlu responsive tasarım
* Mobilde ekranın soluna sabitlenen kompakt yardım kulakçığı
* Masaüstünde modern yardım butonu
* Açılır müşteri destek paneli
* WhatsApp destek entegrasyonu
* Kargo takip bağlantısı
* Kampanya bağlantısı
* Özel bağlantılar eklenebilir
* Marka logosu değiştirilebilir
* Ana renk ve tasarım renkleri özelleştirilebilir
* Başlık ve açıklamalar değiştirilebilir
* Otomatik yardım mesajı gösterimi
* Belirlenen sayfalarda widget tamamen gizlenebilir
* Sepet ve ödeme sayfaları için hariç tutma desteği
* Müşteri bazlı yapılandırılabilir
* Geist font desteği
* Hafif ve bağımsız yapı

---

## Mobil Görünüm

Mobil cihazlarda widget, ekranın sol tarafında küçük bir **yardım kulakçığı** olarak görüntülenir.

Bu yapı özellikle e-ticaret mağazalarında:

* ürün görsellerinin,
* sepete ekle butonlarının,
* mobil alt menünün,
* ürün seçeneklerinin

üzerinin kapatılmasını önlemek amacıyla tasarlanmıştır.

Kullanıcı kulakçığa dokunduğunda tam yardım paneli açılır.

---

## Masaüstü Görünüm

Masaüstünde yardım sistemi mağazanın belirlenen köşesinde sabit olarak görüntülenir.

Kapalı durumdayken minimal bir yardım butonu olarak çalışır. Kullanıcı butona tıkladığında destek seçeneklerinin bulunduğu panel açılır.

---

## Destek Menüsü

Varsayılan yapı aşağıdaki bağlantıları destekler:

### WhatsApp Destek

Kullanıcı WhatsApp desteğine yönlendirilir.

Mesaja kullanıcının bulunduğu sayfanın URL'si otomatik olarak eklenebilir.

Örnek:

> Merhaba, web sitesinde şu sayfadayım:
> [Sayfa URL'si]
> Yardım almak istiyorum.

### Kargom Nerede?

Mağazanın kargo takip sayfasına yönlendirme yapılabilir.

### Kampanyalar

Aktif kampanyaların bulunduğu sayfaya bağlantı verilebilir.

Sisteme ihtiyaç doğrultusunda yeni menü seçenekleri eklenebilir.

---

## Kurulum

Projeyi indirin veya klonlayın.

```bash
git clone https://github.com/omerarda77/midas-ideasoft-help-widget.git
```

Ardından widget JavaScript dosyasını IdeaSoft mağazanızdaki uygun **Özel Kod / Custom Code** alanına ekleyin.

Kullanılan IdeaSoft tema ve sürümüne göre kodun ekleneceği alan değişebilir.

---

## Yapılandırma

Widget farklı mağazalarda kullanılabilecek şekilde özelleştirilebilir olarak tasarlanmıştır.

Örneğin:

```javascript
const config = {
    brandName: "Marka Adı",

    logoUrl: "LOGO_URL",

    primaryColor: "#dc2237",

    primaryColorDark: "#b91327",

    whatsappNumber: "905XXXXXXXXX",

    title: "Yardım Merkezi",

    subtitle: "Size nasıl yardımcı olabiliriz?",

    bubbleText: "Nasıl yardımcı olabiliriz?",

    bubbleDelay: 3000,

    bubbleDuration: 5000,

    excludedPaths: [
        "/sepet",
        "/sepet/"
    ]
};
```

Bu değerler değiştirilerek aynı widget farklı IdeaSoft mağazalarında kullanılabilir.

---

## Renk Özelleştirme

Ana marka rengi:

```javascript
primaryColor: "#dc2237"
```

Gradient veya koyu yardımcı renk:

```javascript
primaryColorDark: "#b91327"
```

Bu alanları müşterinin kurumsal renklerine göre değiştirebilirsiniz.

---

## Logo

Logo URL üzerinden tanımlanabilir:

```javascript
logoUrl: "https://example.com/logo.png"
```

Kare veya kareye yakın logolar mobil kulakçık görünümünde daha iyi sonuç verir.

---

## WhatsApp

WhatsApp numarası ülke koduyla birlikte ve boşluksuz girilmelidir.

```javascript
whatsappNumber: "905XXXXXXXXX"
```

Türkiye için örnek format:

```text
905321234567
```

`+`, boşluk veya parantez kullanılmaması önerilir.

---

## Hariç Tutulan Sayfalar

Widget'ın görüntülenmemesi gereken sayfalar tanımlanabilir.

Örneğin:

```javascript
excludedPaths: [
    "/sepet",
    "/sepet/",
    "/odeme",
    "/odeme/"
]
```

Bu özellik özellikle **sepet ve ödeme akışında** müşterinin dikkatinin dağılmasını veya widget'ın diğer arayüz bileşenlerinin üzerine gelmesini önlemek için kullanılabilir.

---

## Otomatik Yardım Balonu

Widget belirli bir süre sonra kullanıcıya otomatik olarak kısa bir yardım mesajı gösterebilir.

```javascript
bubbleDelay: 3000,
bubbleDuration: 5000
```

Bu örnekte mesaj:

* Sayfa açıldıktan **3 saniye sonra** gösterilir.
* **5 saniye** boyunca görünür.
* Ardından otomatik olarak kapanır.

---

## Dosya Yapısı

```text
midas-ideasoft-help-widget/
│
├── README.md
├── LICENSE
├── .gitignore
├── config.example.js
│
└── src/
    └── ideasoft-help-popup.js
```

---

## Güvenlik

Gerçek müşteri bilgilerini doğrudan public GitHub reposuna eklemeyin.

Özellikle aşağıdaki bilgiler kontrol edilmelidir:

* Gerçek müşteri WhatsApp numaraları
* API anahtarları
* Erişim tokenları
* Yönetim paneli bilgileri
* Müşteriye özel gizli URL'ler
* Şifreler
* Diğer özel entegrasyon bilgileri

Müşteriye özel yapılandırmalar `.gitignore` ile repository dışında tutulabilir.

Örnek:

```gitignore
config.js
.env

.DS_Store
Thumbs.db

.vscode/
.idea/

*.log
```

Repository içerisinde gerçek `config.js` yerine örnek bir:

```text
config.example.js
```

dosyası paylaşılması önerilir.

---

## Teknolojiler

* JavaScript
* HTML
* CSS
* IdeaSoft
* WhatsApp URL entegrasyonu

Herhangi bir JavaScript framework'üne bağımlı değildir.

---

## Uyumluluk

Proje öncelikli olarak **IdeaSoft e-ticaret altyapısında** kullanılmak üzere geliştirilmiştir.

Tema yapısına ve mağazada kullanılan diğer özel kodlara bağlı olarak ek CSS düzenlemeleri gerekebilir.

---

## Geliştirici

**Midas Dijital E-Ticaret Danışmanlık**

E-ticaret altyapıları, pazaryeri yönetimi, özel e-ticaret geliştirmeleri ve dijital ticaret çözümleri.

Bu proje Midas Dijital tarafından IdeaSoft mağazalarında müşteri destek deneyimini geliştirmek amacıyla hazırlanmıştır.

---

## Katkıda Bulunma

Hata bildirimi, geliştirme önerisi veya yeni özellik talebi için GitHub Issues kullanılabilir.

Pull Request göndermeden önce yapılan değişikliklerin mobil ve masaüstü görünümlerinde test edilmesi önerilir.

---

## Lisans

Bu proje **MIT License** altında yayınlanmaktadır.

Detaylar için `LICENSE` dosyasını inceleyebilirsiniz.

---

## Sürüm

**v1.0.0**

İlk kararlı sürüm:

* Mobil yardım kulakçığı
* Masaüstü yardım widget'ı
* WhatsApp entegrasyonu
* Kargo takip yönlendirmesi
* Kampanya yönlendirmesi
* Otomatik yardım balonu
* Sayfa hariç tutma sistemi
* Marka bazlı renk ve logo özelleştirme

---

© 2026 **Midas Dijital E-Ticaret Danışmanlık**

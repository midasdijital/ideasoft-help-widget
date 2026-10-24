# Mağaza kabul kontrolleri

- Eski widget kodunu kaldırın ve CSS/config/JavaScript yükleme sırasını doğrulayın.
- Marka, logo, destek numarası ve her bağlantının doğru mağazaya ait olduğunu kontrol edin.
- Geçerli destek eylemi yoksa widget görünmemeli; örnek telefonla canlıya çıkılmamalı.
- Sepet ve tüm ödeme yollarında widget gizli kalmalı. Mağazanın farklı ödeme yollarını `excludedPaths` listesine ekleyin.
- Tab/Enter/Space ile buton açılmalı; Escape paneli kapatıp odağı butona döndürmeli.
- 320 px mobil, tablet, masaüstü ve tarayıcı yakınlaştırmasında panel taşmamalı, sepet veya mobil menüyü örtmemeli.
- Marka rengi ve metin kontrastını kontrol edin; yalnızca renk değişimiyle bilgi vermeyin.
- WhatsApp mesajında query tokenları ve hash bulunmamalı. Sayfa yolu paylaşımı kapalıyken URL gönderilmemeli.
- Uzak logonun veri aktarımı ve mağazanın CSP kuralları değerlendirilmeli. Logonun yüklenememesi paneli bozmamalı.
- Konsolda hata ve eksik asset olmamalı. Testlerde gerçek müşteri verisi kullanılmamalı.

Kontrol tarihi, tarayıcı/tema bilgisi ve test edilen commit mağazaya özel kayıtta tutulmalıdır. Bu liste genel bir güvenlik sertifikası veya eksiksiz erişilebilirlik denetimi değildir.

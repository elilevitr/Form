// Birim fiyat
const birimFiyat = 100; // Nokta başı fiyat (₺)

// HTML Elemanları
const tabloGövdesi = document.getElementById("tabloGövdesi");
const toplamFiyatEl = document.getElementById("toplamFiyat");
const satirEkleBtn = document.getElementById("satirEkle");

// Toplam fiyatı hesapla
function toplamFiyatiGuncelle() {
  let toplam = 0;
  const satirlar = document.querySelectorAll(".noktaSayisi");
  satirlar.forEach(input => {
    toplam += parseInt(input.value || 0) * birimFiyat;
  });
  toplamFiyatEl.textContent = toplam;
}

// Yeni satır ekle
function yeniSatirEkle() {
  const satir = document.createElement("tr");
  satir.innerHTML = `
    <td><input type="text" class="form-control" placeholder="Örneğin: Lobi"></td>
    <td><input type="number" class="form-control noktaSayisi" value="0" min="0"></td>
    <td class="toplamAlanFiyat">0 ₺</td>
  `;
  tabloGövdesi.appendChild(satir);

  // Nokta sayısı değiştikçe fiyatı güncelle
  const noktaInput = satir.querySelector(".noktaSayisi");
  noktaInput.addEventListener("input", () => {
    const toplamAlanFiyat = satir.querySelector(".toplamAlanFiyat");
    toplamAlanFiyat.textContent = noktaInput.value * birimFiyat + " ₺";
    toplamFiyatiGuncelle();
  });
}

// Başlangıçta bir satır ekle
yeniSatirEkle();

// Yeni satır ekle butonuna tıklanınca
satirEkleBtn.addEventListener("click", yeniSatirEkle);

// Form gönderildiğinde mail oluştur
document.getElementById("teklifFormu").addEventListener("submit", function(e) {
  e.preventDefault(); // Formun varsayılan gönderimini engelle
  
  // Müşteri bilgilerini al
  const ad = document.getElementById("ad").value;
  const telefon = document.getElementById("telefon").value;
  const email = document.getElementById("email").value;

  // Teklif tablosunu bir string olarak hazırla
  let teklifDetaylari = "Alan İsmi - Nokta Sayısı - Toplam Fiyat\n";
  const satirlar = document.querySelectorAll("#teklifTablosu tbody tr");
  satirlar.forEach(row => {
    const alan = row.querySelector("input[type='text']").value;
    const nokta = row.querySelector(".noktaSayisi").value;
    const fiyat = nokta * birimFiyat;
    teklifDetaylari += `${alan} - ${nokta} - ${fiyat} ₺\n`;
  });

  // Mail için bir bağlantı oluştur
  const mailBody = `
    Ad: ${ad}
    Telefon: ${telefon}
    Email: ${email}

    Teklif Detayları:
    ${teklifDetaylari}
  `;

  // Mailto linki ile gönderim
  window.location.href = `mailto:sizinmailadresiniz@example.com?subject=Yeni Teklif&body=${encodeURIComponent(mailBody)}`;

  // Gönderim sonrası formu temizle
  alert("Teklif başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.");
  document.getElementById("teklifFormu").reset();
  tabloGövdesi.innerHTML = "";
  toplamFiyatiGuncelle();
});

/* =========================================
HEADER SCROLL
========================================= */

const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("header-scroll");
  } else {
    header.classList.remove("header-scroll");
  }
});

/* =========================================
REVEAL
========================================= */

const reveals = document.querySelectorAll(".reveal");

function revealScroll() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealScroll);
window.addEventListener("load", revealScroll);

/* =========================================
FAQ
========================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {
    item.classList.toggle("active");

    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("active");
      }
    });
  });
});

/* =========================================
FLOAT BUTTON
========================================= */

const floatBtn = document.querySelector(".floating-order");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    floatBtn.classList.add("show-float");
  } else {
    floatBtn.classList.remove("show-float");
  }
});

/* =========================================
SCROLL PROGRESS
========================================= */

const progress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const totalHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progressHeight = (window.pageYOffset / totalHeight) * 100;

  progress.style.width = progressHeight + "%";
});

/* =========================================
CURSOR GLOW
========================================= */

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* =========================================
TILT EFFECT
========================================= */

const heroCard = document.querySelector(".hero-card");

heroCard.addEventListener("mousemove", (e) => {
  const rect = heroCard.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = (x / rect.width - 0.5) * 14;
  const rotateX = (y / rect.height - 0.5) * -14;

  heroCard.style.transform = `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.03)
`;
});

heroCard.addEventListener("mouseleave", () => {
  heroCard.style.transform = `
perspective(1000px)
rotateX(0)
rotateY(0)
scale(1)
`;
});

/* =========================================
PARTICLES
========================================= */

for (let i = 0; i < 18; i++) {
  const particle = document.createElement("span");

  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "%";

  particle.style.animationDuration = 10 + Math.random() * 10 + "s";

  particle.style.animationDelay = Math.random() * 5 + "s";

  document.body.appendChild(particle);
}

/* =========================================
SISTEM MULTI ORDER & LOGIKA WHATSAPP (REVISI)
========================================= */
// Fungsi untuk memunculkan input katalog atau link drive berdasarkan pilihan kustomer
function aturInputDesain() {
  const sumber = document.getElementById("sumber-desain").value;
  const groupKatalog = document.getElementById("group-no-katalog");
  const groupDrive = document.getElementById("group-link-drive");

  if (sumber === "Katalog") {
    groupKatalog.style.display = "block";
    groupDrive.style.display = "none";
  } else if (sumber === "Custom") {
    groupKatalog.style.display = "none";
    groupDrive.style.display = "block";
  } else {
    groupKatalog.style.display = "none";
    groupDrive.style.display = "none";
  }
}

// Array global untuk menyimpan item daftar belanja
let keranjangPesanan = [];

// Fungsi menambah item ke tabel daftar pesanan
function tambahItemKeDaftar() {
  const sumberDesain = document.getElementById("sumber-desain").value;
  const noKatalog = document.getElementById("no-katalog").value.trim();
  const linkDrive = document.getElementById("link-drive").value.trim();

  const selectUkuran = document.getElementById("ukuran");
  const jumlahInput = document.getElementById("jumlah");
  const jumlah = parseInt(jumlahInput.value) || 0;

  // Validasi Pilihan Gambar
  if (!sumberDesain) {
    alert("Silakan pilih Sumber Desain Gambar terlebih dahulu!");
    return;
  }
  if (sumberDesain === "Katalog" && !noKatalog) {
    alert("Silakan isi Nomor/Nama Katalog yang Anda pilih!");
    return;
  }
  if (sumberDesain === "Custom") {
    if (!linkDrive) {
      alert("Silakan cantumkan Link Google Drive untuk desain custom Anda!");
      return;
    }

    // TAMBAHAN: Alert Pengingat Interaktif Pengaturan Akses Link Drive
    const konfirmasiAkses = confirm(
      "PENGINGAT AKSES GOOGLE DRIVE:\n\nApakah Anda sudah memastikan status berbagi link tersebut diatur ke 'Anyone with the link' (Semua orang / Siapa saja yang memiliki link)?\n\nJika akses masih dibatasi (Restricted), Admin tidak dapat memproses pesanan Anda.",
    );

    if (!konfirmasiAkses) {
      return; // Membatalkan proses tambah item jika kustomer ingin memeriksa kembali linknya
    }
  }

  // Validasi Ukuran & Jumlah
  if (selectUkuran.value === "") {
    alert("Silakan pilih ukuran pembatas binder terlebih dahulu!");
    return;
  }
  if (jumlah <= 0) {
    alert("Jumlah item minimal adalah 1!");
    return;
  }

  const opsiTerpilih = selectUkuran.options[selectUkuran.selectedIndex];
  const namaUkuran = opsiTerpilih.value;
  const hargaSatuan = parseInt(opsiTerpilih.getAttribute("data-harga"));

  // Tentukan teks keterangan gambar yang disimpan ke keranjang
  let infoGambar = "";
  if (sumberDesain === "Katalog") {
    infoGambar = "Katalog: " + noKatalog;
  } else {
    infoGambar = "Custom Drive: " + linkDrive;
  }

  // Masukkan data baru ke dalam keranjang (Kombinasi ukuran + info gambar unik)
  // Tidak digabung otomatis jika desain gambarnya berbeda agar admin tidak bingung
  const indexEksis = keranjangPesanan.findIndex(
    (item) => item.ukuran === namaUkuran && item.gambar === infoGambar,
  );

  if (indexEksis > -1) {
    keranjangPesanan[indexEksis].qty += jumlah;
    keranjangPesanan[indexEksis].subtotal =
      keranjangPesanan[indexEksis].qty * keranjangPesanan[indexEksis].harga;
  } else {
    keranjangPesanan.push({
      ukuran: namaUkuran,
      harga: hargaSatuan,
      qty: jumlah,
      gambar: infoGambar, // Info gambar disimpan disini
      subtotal: hargaSatuan * jumlah,
    });
  }

  // Reset form pilihan produk setelah berhasil ditambah
  document.getElementById("sumber-desain").value = "";
  document.getElementById("no-katalog").value = "";
  document.getElementById("link-drive").value = "";
  selectUkuran.value = "";
  jumlahInput.value = "1";
  aturInputDesain(); // Sembunyikan kembali inputan dinamis

  renderTabelKeranjang();
  hitungOtomatis();
}

// Fungsi menghapus item dari daftar belanja
function hapusItemDaftar(index) {
  keranjangPesanan.splice(index, 1);
  renderTabelKeranjang();
  hitungOtomatis();
}

// Fungsi menggambar ulang isi tabel di HTML
function renderTabelKeranjang() {
  const tbody = document.getElementById("list-order-body");
  tbody.innerHTML = "";

  if (keranjangPesanan.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 15px; color: #888; font-style: italic;">Belum ada item yang ditambahkan.</td></tr>`;
    return;
  }

  keranjangPesanan.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="padding: 10px; border: 1px solid #ffe3e7;">
        <strong>${item.ukuran}</strong><br>
        <span style="font-size: 12px; color: #64748b; word-break: break-all;">🖼️ ${item.gambar}</span>
      </td>
      <td style="padding: 10px; border: 1px solid #ffe3e7;">Rp ${item.harga.toLocaleString("id-ID")}</td>
      <td style="padding: 10px; border: 1px solid #ffe3e7; text-align: center;">${item.qty}</td>
      <td style="padding: 10px; border: 1px solid #ffe3e7; font-weight:600;">Rp ${item.subtotal.toLocaleString("id-ID")}</td>
      <td style="padding: 10px; border: 1px solid #ffe3e7; text-align: center;">
        <button type="button" onclick="hapusItemDaftar(${index})" style="background: #ff5e7e; color: white; border: none; padding: 4px 10px; border-radius: 5px; cursor: pointer; font-size:12px;">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Perhitungan biaya otomatis berdasarkan isi keranjang dan teks alamat
function cekOngkirDanHarga() {
  const alamatRaw = document.getElementById("alamat").value.toLowerCase();

  // Hitung total harga seluruh produk di keranjang
  let totalHargaProduk = 0;
  keranjangPesanan.forEach((item) => {
    totalHargaProduk += item.subtotal;
  });

  let ongkir = 0;

  // Logika deteksi wilayah pengiriman dari input alamat
  if (alamatRaw.trim() !== "" && keranjangPesanan.length > 0) {
    if (
      alamatRaw.includes("jatim") ||
      alamatRaw.includes("jawa timur") ||
      alamatRaw.includes("surabaya") ||
      alamatRaw.includes("malang") ||
      alamatRaw.includes("sidoarjo") ||
      alamatRaw.includes("gresik")
    ) {
      ongkir = 9000;
    } else if (
      alamatRaw.includes("jawa") ||
      alamatRaw.includes("jakarta") ||
      alamatRaw.includes("jabar") ||
      alamatRaw.includes("jateng") ||
      alamatRaw.includes("yogyakarta") ||
      alamatRaw.includes("diy") ||
      alamatRaw.includes("banten") ||
      alamatRaw.includes("depok") ||
      alamatRaw.includes("bekasi") ||
      alamatRaw.includes("tangerang")
    ) {
      ongkir = 15000;
    } else {
      ongkir = 30000; // Luar Jawa
    }
  }

  const totalBayar = totalHargaProduk + ongkir;

  return { totalHargaProduk, ongkir, totalBayar };
}

/* =========================================
SISTEM BELANJA, QRIS & WHATSAPP (REVISI QRIS)
========================================= */

// Fungsi menghitung otomatis (diperbarui untuk menampilkan section QRIS)
function hitungOtomatis() {
  const dataBiaya = cekOngkirDanHarga();

  // Tampilkan nominal pada summary teks
  document.getElementById("view-harga-produk").innerText =
    "Rp " + dataBiaya.totalHargaProduk.toLocaleString("id-ID");
  document.getElementById("view-ongkir").innerText =
    "Rp " + dataBiaya.ongkir.toLocaleString("id-ID");
  document.getElementById("view-total").innerText =
    "Rp " + dataBiaya.totalBayar.toLocaleString("id-ID");

  const qrisSection = document.getElementById("qris-section");
  const qrisTotalText = document.getElementById("qris-total-text");

  // Jika ada item di keranjang belanja, tampilkan instruksi QRIS secara otomatis
  if (keranjangPesanan.length > 0) {
    qrisSection.style.display = "block";
    qrisTotalText.innerText =
      "Rp " + dataBiaya.totalBayar.toLocaleString("id-ID");
  } else {
    qrisSection.style.display = "none";
  }
}

// Pasang ulang event listener alamat agar sinkron saat diketik kustomernya
document.getElementById("alamat").addEventListener("input", hitungOtomatis);

// Fungsi utama kirim data & konfirmasi ke WhatsApp
function kirimKeWhatsApp() {
  const nama = document.getElementById("nama").value.trim();
  const nohp = document.getElementById("nohp").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const catatan = document.getElementById("catatan").value.trim();
  const buktiBayarFile = document.getElementById("bukti-bayar").files[0];

  // 1. Validasi data utama pelanggan
  if (!nama || !nohp || !alamat) {
    alert(
      "Mohon lengkapi Nama, No. WhatsApp, dan Alamat Anda terlebih dahulu.",
    );
    return;
  }
  if (keranjangPesanan.length === 0) {
    alert(
      "Daftar pesanan Anda masih kosong! Silakan tambah produk terlebih dahulu.",
    );
    return;
  }

  // 2. Validasi file bukti transfer QRIS
  if (!buktiBayarFile) {
    alert(
      "Wajib mengunggah (upload) Foto/Screenshot Bukti Pembayaran QRIS sebelum mengirim orderan!",
    );
    return;
  }

  const biayaFinal = cekOngkirDanHarga();
  const nomorToko = "6282332333445"; // Masukkan nomor WA Toko Anda disini

  // Susun rincian daftar belanja baru beserta detail gambarnya
  let teksDaftarProduk = "";
  keranjangPesanan.forEach((item, index) => {
    teksDaftarProduk += `${index + 1}. ${item.ukuran} x ${item.qty} pcs = Rp ${item.subtotal.toLocaleString("id-ID")}\n   Detail Gambar -> ${item.gambar}\n\n`;
  });

  // 3. Template susunan teks untuk diserahkan ke WhatsApp Admin
  const teksPesan = `Hallo Admin ITSGOLSHOP, saya sudah melakukan pembayaran via QRIS dan ingin memesan Custom Binder Divider.

*Data Pelanggan:*
• Nama Lengkap : ${nama}
• No. WhatsApp : ${nohp}

*Alamat Pengiriman:*
${alamat}

*Daftar Produk Pesanan:*
${teksDaftarProduk}
*Catatan/Request Desain:*
${catatan ? catatan : "-"}

*==============================*
*Rincian Total Biaya (LUNAS VI QRIS):*
• Total Produk : Rp ${biayaFinal.totalHargaProduk.toLocaleString("id-ID")}
• Ongkos Kirim  : Rp ${biayaFinal.ongkir.toLocaleString("id-ID")}
• *Total Pembayaran : Rp ${biayaFinal.totalBayar.toLocaleString("id-ID")}*
*==============================*

_(Bukti transfer/pembayaran telah saya lampirkan di bawah bersama dengan pesan ini)_`;

  const pesanEncoded = encodeURIComponent(teksPesan);
  const urlWhatsApp = `https://wa.me/${nomorToko}?text=${pesanEncoded}`;

  // Membuka tab/aplikasi WhatsApp
  window.open(urlWhatsApp, "_blank");
}

/* =========================================
   FUNGSI ZOOM POPUP QRIS
   ========================================= */

function bukaZoomQris() {
  const modal = document.getElementById("qris-modal");
  modal.classList.add("aktif");
  // Mengunci scroll body utama saat modal terbuka agar user fokus
  document.body.style.overflow = "hidden";
}

function tutupZoomQris() {
  const modal = document.getElementById("qris-modal");
  modal.classList.remove("aktif");
  // Mengembalikan scroll body utama semula
  document.body.style.overflow = "auto";
}

// Menunggu seluruh halaman selesai dimuat oleh browser
document.addEventListener("DOMContentLoaded", function () {
  const qrisContainer = document.querySelector(".qris-container");

  if (qrisContainer) {
    qrisContainer.style.cursor = "zoom-in"; // Memastikan kursor berubah jadi tanda zoom
    qrisContainer.addEventListener("click", function (e) {
      e.preventDefault();
      bukaZoomQris();
    });
  }
});

/* =========================================
   FUNGSI ZOOM POPUP GAMBAR TESTIMONI
   ========================================= */

function bukaZoomTesti(element) {
  const modal = document.getElementById("testi-modal");
  const imgZoom = document.getElementById("img-testi-zoom");

  // Salin sumber gambar screenshot ulasan yang di-klik ke dalam popup modal
  imgZoom.src = element.src;

  // Aktifkan overlay modal popup
  modal.classList.add("aktif");
  // Mengunci scroll halaman utama agar pengguna fokus membaca testimoni
  document.body.style.overflow = "hidden";
}

function tutupZoomTesti() {
  const modal = document.getElementById("testi-modal");

  // Sembunyikan kembali overlay modal popup
  modal.classList.remove("aktif");
  // Kembalikan fungsi scroll halaman utama seperti semula
  document.body.style.overflow = "auto";
}

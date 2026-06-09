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
      alamatRaw.includes("jawa barat") ||
      alamatRaw.includes("jateng") ||
      alamatRaw.includes("jawa tengah") ||
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

/* =======================================================
   FUNGSI RESPOND SINKRONISASI KATALOG DARI LOCALSTORAGE
   ======================================================= */

function ambilKatalogTerpilih() {
  const katalogDariStorage = localStorage.getItem("katalogTerpilih");
  const inputKatalog = document.getElementById("no-katalog");

  if (katalogDariStorage && inputKatalog) {
    inputKatalog.value = katalogDariStorage;

    // Animasi kilas warna hijau menandakan sukses terisi
    inputKatalog.style.backgroundColor = "#e8fbf1";
    setTimeout(() => {
      inputKatalog.style.backgroundColor = "#ffffff";
    }, 1000);
  } else {
    alert(
      "Anda belum memilih katalog apa pun di halaman katalog toko. Silakan klik link lihat katalog terlebih dahulu.",
    );
  }
}

// Otomatis cek berkala jika user memindahkan tab layar kembali ke form utama
window.addEventListener("focus", () => {
  const tipeDesain = document.getElementById("sumber-desain").value;
  if (tipeDesain === "Katalog") {
    const katalogDariStorage = localStorage.getItem("katalogTerpilih");
    if (katalogDariStorage) {
      document.getElementById("no-katalog").value = katalogDariStorage;
    }
  }
});

/* =======================================================
   FUNGSI MODAL KATALOG INTERNAL (DIPERBARUI)
   ======================================================= */

function bukaModalKatalog() {
  const modalKatalog = document.getElementById("modal-pilihan-katalog");
  if (modalKatalog) {
    modalKatalog.classList.add("aktif");
    document.body.style.overflow = "hidden"; // Kunci scroll layar belakang
  }
}

function tutupModalKatalog() {
  const modalKatalog = document.getElementById("modal-pilihan-katalog");
  if (modalKatalog) {
    modalKatalog.classList.remove("aktif");
    document.body.style.overflow = "auto"; // Kembalikan scroll layar
  }
}

// Fungsi otomatis mengisi form ketika katalog di dalam modal diklik
function pilihKatalogMulaiModal(namaKatalog) {
  const inputKatalog = document.getElementById("no-katalog");
  if (inputKatalog) {
    // 1. Isi input dengan nama katalog yang dipilih
    inputKatalog.value = namaKatalog;

    // 2. Beri efek animasi kilas warna hijau tanda sukses
    inputKatalog.style.backgroundColor = "#e8fbf1";
    setTimeout(() => {
      inputKatalog.style.backgroundColor = "#ffffff";
    }, 1000);

    // 3. Tampilkan Notifikasi sukses kepada user
    alert("✨ Sukses! " + namaKatalog + " telah dipilih.");

    // 4. Tutup modal secara otomatis setelah dipilih
    tutupModalKatalog();
  } else {
    alert("Elemen input nomor katalog tidak ditemukan di form.");
  }
}

// Fungsi merender daftar katalog ke dalam modal secara dinamis
// Fungsi merender daftar katalog ke dalam modal secara dinamis
function renderKatalogPilihan() {
  const container = document.getElementById("container-katalog-dinamis");
  if (!container) return;

  container.innerHTML = "";

  daftarKatalog.forEach((item) => {
    // MODIFIKASI: Menghapus tag paragraf sub-judul dan mengubah struktur kolom agar gambar lebih besar
    const itemHtml = `
      <div class="item-katalog-pilih" 
           onclick="pilihKatalogMulaiModal('${item.nama}')"
           style="border: 2px solid #ffe3e7; padding: 8px; border-radius: 16px; cursor: pointer; position: relative; transition: 0.2s; text-align: center; background: white;">
        <img src="${item.img}" alt="Katalog ${item.id}" style="width: 100%; height: auto; max-height: 280px; border-radius: 10px; margin-bottom: 8px; object-fit: cover;" />
        <h4 style="font-size: 15px; color: #0f172a; margin-bottom: 4px; font-weight: 700;">Katalog ${item.id}</h4>
      </div>
    `;
    container.innerHTML += itemHtml;
  });
}

// Data array list katalog
const daftarKatalog = [
  {
    id: "01",
    nama: "Katalog 01",
    img: "katalog/1.png",
  },
  {
    id: "02",
    nama: "Katalog 02",
    img: "katalog/2.png",
  },
  {
    id: "03",
    nama: "Katalog 03",
    img: "katalog/3.png",
  },
  {
    id: "04",
    nama: "Katalog 04",
    img: "katalog/4.png",
  },
  {
    id: "05",
    nama: "Katalog 05",
    img: "katalog/5.png",
  },
  {
    id: "06",
    nama: "Katalog 06",
    img: "katalog/6.png",
  },
  {
    id: "07",
    nama: "Katalog 07",
    img: "katalog/7.png",
  },
  {
    id: "08",
    nama: "Katalog 08",
    img: "katalog/8.png",
  },
  {
    id: "09",
    nama: "Katalog 09",
    img: "katalog/9.png",
  },
  {
    id: "10",
    nama: "Katalog 10",
    img: "katalog/10.png",
  },
  {
    id: "11",
    nama: "Katalog 11",
    img: "katalog/11.png",
  },
  {
    id: "12",
    nama: "Katalog 12",
    img: "katalog/12.png",
  },
  {
    id: "13",
    nama: "Katalog 13",
    img: "katalog/13.png",
  },
  {
    id: "14",
    nama: "Katalog 14",
    img: "katalog/14.png",
  },
  {
    id: "15",
    nama: "Katalog 15",
    img: "katalog/15.png",
  },
  {
    id: "16",
    nama: "Katalog 16",
    img: "katalog/16.png",
  },
  {
    id: "17",
    nama: "Katalog 17",
    img: "katalog/17.png",
  },
  {
    id: "18",
    nama: "Katalog 18",
    img: "katalog/18.png",
  },
  {
    id: "19",
    nama: "Katalog 19",
    img: "katalog/19.png",
  },
  {
    id: "20",
    nama: "Katalog 20",
    img: "katalog/20.png",
  },
  {
    id: "21",
    nama: "Katalog 21",
    img: "katalog/21.png",
  },
  {
    id: "22",
    nama: "Katalog 22",
    img: "katalog/22.png",
  },
  {
    id: "23",
    nama: "Katalog 23",
    img: "katalog/23.png",
  },
  {
    id: "24",
    nama: "Katalog 24",
    img: "katalog/24.png",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  renderKatalogPilihan();
});

/* =========================================
LOGIKA HAMBURGER MENU MOBILE
========================================= */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuToggle && navMenu) {
  // Buka atau tutup menu saat tombol hamburger diklik
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("aktif");
    navMenu.classList.toggle("aktif");
  });

  // Tutup menu secara otomatis saat salah satu link diklik
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("aktif");
      navMenu.classList.remove("aktif");
    });
  });
}

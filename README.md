# Mesin Pengujian Tagihan

Aplikasi React (Vite) untuk menguji tagihan SPD Jabatan Luar Kota, melihat referensi ketentuan SBM, dan menghitung pajak — murni kalkulasi di sisi client, tanpa API key/token apa pun.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk produksi

```bash
npm run build
npm run preview   # opsional, untuk mengecek hasil build sebelum deploy
```

## Deploy ke GitHub + Vercel

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```

2. **Import ke Vercel**
   - Buka [vercel.com/new](https://vercel.com/new), pilih repo GitHub yang baru saja di-push.
   - Vercel otomatis mendeteksi ini sebagai project **Vite** — Build Command (`vite build`), Output Directory (`dist`), dan Install Command (`npm install`) semuanya terisi otomatis, tidak perlu diubah.
   - Klik **Deploy**.

Tidak ada environment variable yang perlu diisi — aplikasi ini tidak memanggil API eksternal apa pun.

## Struktur proyek

```
├── index.html                          # HTML shell
├── src/
│   ├── main.jsx                        # entry point React
│   └── mesin_pengujian_tagihan.jsx     # seluruh logika & UI aplikasi
├── package.json
└── vite.config.js
```

## Mesin yang tersedia

- **Tagihan SPD Jabatan Luar Kota** — kalkulator & penguji klaim SPD (uang harian, hotel, tiket, taksi, kendaraan pribadi, representasi) sesuai batas SBM.
- **Referensi SPD** — rujukan ketentuan dan batas SBM tanpa perlu menghitung.
- **Perhitungan Pajak** — kalkulator PPN, PPh 22/23, PPh 4(2), PPh Konstruksi/Konsultasi, dan PPh 21.

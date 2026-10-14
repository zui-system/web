
## Tampilan baru (gaya korporat)
Bilah atas, hero dengan demo alur interaktif, daftar aplikasi, bagian Kontrol, Harga (pilih IDR/MYR/USD), tiga langkah mulai, tanya jawab, dan footer. Edit `APPS` (alamat, repo, APK) dan `PAKET` (harga normal dan promo) di bagian skrip; samakan harga dengan Zui Admin. Tombol Masuk dan Coba gratis mengarah ke `SYS_URL`. Cache `zui-web-v2`.

## Menu aplikasi
Di komputer, menu **Aplikasi** membuka daftar bertingkat; di HP, ikon menu membuka layar penuh dengan daftar Aplikasi yang bisa dilipat. Isi menu dibuat dari daftar `APPS`, jadi aplikasi baru cukup ditambah satu baris di sana (n, d, url, repo). Aplikasi tanpa `url` tampil "Segera". Cache `zui-web-v4`.

- Logo kotak Z diganti tulisan ZUI bersusun (ZUI di atas, SYSTEM kecil). Ikon situs memakai tulisan ZUI. Cache `zui-web-v6`.

- Logo utama resmi (ZUI di atas, SYSTEM kecil; SVG garis dari huruf Inter) dipakai di atas, bawah, dan layar buka website (muncul sekali per sesi tab, CSS+skrip kecil). Cache `zui-web-v7`.

- Layar buka tampil 10 detik (garis menyala berdenyut), hilang lebih cepat jika disentuh/ditekan tombol. Cache dinaikkan.

- Bagian baru **Cara pakai** (video pengenalan 5 aplikasi: Zui System, Inventori, Manufaktur, Keuangan, Karyawan). Video tanpa suara, direkam dari aplikasi dengan data contoh "Zui Kosmetik", dengan teks keterangan di layar. File ada di folder `video/` (mp4 + webm cadangan + poster jpg). Unggah `index.html`, `sw.js`, dan seluruh folder `video/`. Cache `zui-web-v9` (video tidak ikut di-cache oleh service worker).

- Layar buka website kini memakai animasi yang sama dengan aplikasi (huruf ZUI naik satu per satu, SYSTEM muncul pelan, garis biru memanjang lalu berdenyut), ±7,6 detik, tampil setiap website dibuka, tidak bisa dilewati, tetap jalan walau perangkat memakai mode "kurangi gerakan". Cache `zui-web-v10`.

- Link aplikasi memakai satu domain: `https://zuisystem.com/inventori/`, `/manufaktur/`, `/keuangan/`, `/karyawan/` (sebelumnya subdomain terpisah). Cache `zui-web-v11`.

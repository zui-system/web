
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

- **Pusat pengaturan** (`admin.js`, Firebase `web-zuisystem`): tersembunyi, buka dengan `#pengaturan` atau ketuk logo 5x; login Google pemilik. Panel samping dengan pratinjau langsung: Tampilan (warna, gaya huruf, tampil/sembunyi bagian), Teks, Aplikasi (tambah/ubah/urut/hapus), Harga (paket dan harga per mata uang), Tanya jawab, Media (galeri gambar/video), Akun. Semua disimpan di Firestore `situs/config` (satu dokumen), media di Storage `galeri/`. `index.html` kini membungkus daftar aplikasi dalam fungsi `rA()` agar bisa dirender ulang. Cache `zui-web-v14`.

- Isi web diperbarui untuk aplikasi Zui ERP, Zui Kontraktor, Zui Jurnal. Bagian "Cara pakai" disembunyikan secara bawaan karena video lama (Inventori, Manufaktur, dst.) tidak cocok lagi; aktifkan lewat panel > Tampilan setelah video baru ada. Alamat aplikasi diisi lewat panel > Aplikasi. Cache `zui-web-v15`.

- SEO: judul, canonical, Open Graph, data terstruktur (JSON-LD), `robots.txt`, `sitemap.xml`, `og-image.png`, dan daftar aplikasi cadangan tanpa JavaScript. Setelah aplikasi punya alamat sendiri, tambahkan ke `sitemap.xml`. Cache `zui-web-v16`.

- Halaman per aplikasi dan blog (SEO): `/zui-erp/`, `/zui-kontraktor/`, `/zui-jurnal/`, `/blog/`, dan artikel pertama `/blog/apa-itu-erp/`. Tiap halaman punya judul, deskripsi, canonical, Open Graph/Twitter, JSON-LD (SoftwareApplication, FAQPage, BlogPosting, BreadcrumbList), dan gambar OG sendiri di `assets/og/`. Gaya bersama di `assets/site.css`, skrip kecil di `assets/site.js`. Beranda kini menautkan ke halaman-halaman itu (kartu aplikasi, menu, footer; daftar aplikasi sudah ditulis statis di HTML agar terbaca crawler). `sitemap.xml` diperbarui; naikkan `?v=1` pada tautan CSS/JS bila isinya diubah. Harga \"Rp 79.000\" di halaman aplikasi ditulis tetap di HTML dan JSON-LD, jadi ubah juga di sana bila harga di panel berubah. Unggah seluruh folder `assets/`, `zui-erp/`, `zui-kontraktor/`, `zui-jurnal/`, `blog/`, serta `index.html`, `sitemap.xml`, `sw.js`. Cache `zui-web-v17`.

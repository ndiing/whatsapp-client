# WhatsApp Client

[![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)](https://github.com/ndiing/whatsapp-client/releases)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

`whatsapp-client` adalah sebuah library yang memudahkan kamu berkomunikasi dengan API Web WhatsApp. Library ini dibuat untuk aplikasi yang belum bisa menggunakan soket dan sumber acara.

## Cara Instal

1. **Download** dari [halaman rilis WhatsApp Client](https://github.com/ndiing/whatsapp-client/releases).
2. **Install** aplikasi.

Setelah diinstal, aplikasi akan langsung berjalan dan muncul di ikon tray (pojok kanan bawah layar). Untuk melihat versi aplikasi, kamu bisa mengarahkan kursor ke ikon. Untuk menghentikan aplikasi, klik kanan pada ikon dan pilih "Berhenti".

## Pengaturan

Di folder `whatsapp-client`, ubah file `.env` sesuai dengan pengaturan berikut:

<pre>
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://localhost:2000/api/whatsapp/:_id/webhook
WHATSAPP_AUTOSTART=true
</pre>

- **`WHATSAPP_WEBHOOK`**: Sesuaikan URL webhook sesuai dengan aplikasi yang kamu buat.

## Catatan

- Aplikasi ini masih dalam tahap pengembangan, dan akan otomatis diperbarui.
- Contoh permintaan HTTP bisa dilihat di [lihat request](./http/whatsapp.http).
- Panduan penggunaan dan tutorial sedang dibuat.

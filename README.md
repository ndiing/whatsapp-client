# WhatsApp Client API

API sederhana yang membungkus Web WhatsApp dengan HTTP request. API ini dirancang untuk memberikan support bagi aplikasi yang belum mendukung socket dan event source secara langsung.

## Fitur
- Mengirim dan menerima pesan melalui Web WhatsApp
- Mendukung integrasi aplikasi yang belum support WebSocket atau EventSource
- Dibungkus dengan HTTP request untuk kemudahan implementasi
- **Auto-update**: Aplikasi akan otomatis melakukan update ke versi terbaru

## Cara Install
1. Download versi terbaru dari [releases](https://github.com/ndiing/whatsapp-client/releases)
2. Install aplikasi yang sudah di-download

## Setelah Instalasi
Setelah aplikasi di-download dan di-install untuk pertama kali, aplikasi akan secara otomatis berjalan di tray menu. 

- **Melihat Versi**: Hover pada ikon yang ada di tray untuk melihat versi yang sedang berjalan.
- **Menutup Aplikasi**: Klik kanan pada ikon di tray dan pilih menu "Berhenti" untuk menutup aplikasi.

## Penggunaan
<pre>
Cukup kirim request HTTP untuk memanfaatkan fitur API ini.
Tidak memerlukan pengaturan socket atau event secara manual.
</pre>

Contoh request dapat ditemukan di file [`http/whatsapp.http`](http/whatsapp.http).

**Tutorial atau cara penggunaan menyusul, sedang dalam pengembangan.**

## Konfigurasi
Buka file `.env` untuk mengatur konfigurasi. File ini terletak di lokasi yang sama dengan `whatsapp-client.exe`.

### Default Konfigurasi
<pre>
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://localhost:2000/api/whatsapp/:_id/webhook
WHATSAPP_AUTOSTART=true
</pre>

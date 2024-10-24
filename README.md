# WhatsApp Client

[![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)](https://github.com/ndiing/whatsapp-client/releases)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

**WhatsApp Client** adalah aplikasi desktop yang memudahkan integrasi WhatsApp dengan sistem lain melalui HTTP request dan webhook. Aplikasi ini cocok untuk Anda yang membutuhkan integrasi sederhana dengan WhatsApp tanpa perlu pengetahuan mendalam tentang socket atau Server-Sent Events (SSE).

## Fitur Utama

-   **HTTP Request**: Kirim pesan ke WhatsApp menggunakan request sederhana.
-   **Webhook**: Terima pesan masuk dari WhatsApp secara otomatis.
-   **Mudah Digunakan**: Instal dan langsung gunakan, tanpa perlu konfigurasi rumit.
-   **Kompatibel**: Dukungan penuh untuk aplikasi yang belum support socket/SSE.

## Cara Download dan Instalasi

1. Download versi terbaru dari [WhatsApp Client Releases](https://github.com/ndiing/whatsapp-client/releases).
2. Setelah selesai download, install aplikasi sesuai sistem operasi Anda.
    - Untuk Windows: Jalankan file `.exe`.
    - ~~Untuk Mac: Ekstrak dan jalankan file `.dmg` atau `.pkg`.~~
    - ~~Untuk Linux: Gunakan file `.deb` atau `.AppImage`.~~

## Penggunaan Aplikasi

WhatsApp Client berjalan di background sebagai tray icon. Berikut beberapa fungsinya:

1. **Berhenti**: Klik kanan pada icon di tray, pilih "Berhenti" untuk menutup aplikasi.
2. **Relaunch**: Klik kanan pada icon di tray, pilih "Relaunch" untuk memulai ulang aplikasi.
3. **Lihat Versi Terkini**: Arahkan mouse ke tray icon untuk melihat versi aplikasi yang sedang berjalan.

## Pengaturan Awal (Default .env)

Jika Anda ingin melakukan konfigurasi manual, berikut adalah contoh file `.env` yang digunakan oleh aplikasi:

<pre>
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://127.0.0.1:2001/:_id/webhook
WHATSAPP_AUTOSTART=false
</pre>

### Penjelasan:

-   **HTTP_PORT**: Port yang digunakan untuk HTTP (default: `2000`).
-   **HTTPS_PORT**: Port untuk HTTPS (default: `0`, artinya tidak aktif).
-   **HOSTNAME**: Nama host (default: `localhost`).
-   **WHATSAPP_WEBHOOK**: URL webhook untuk menerima pesan dari WhatsApp.
-   **WHATSAPP_AUTOSTART**: Atur apakah WhatsApp Client otomatis dijalankan saat startup (default: `false`).

## Persiapan Sebelum Memulai

1. **Atur Webhook**: Pastikan untuk mengatur URL webhook pada file `.env`:
   <pre>
   WHATSAPP_WEBHOOK=http://127.0.0.1:2001/:_id/webhook
   </pre>
2. **Contoh Penanganan Login dan Pesan**: Jika Anda ingin mencoba penanganan login dengan QR code dan mengelola pesan, Anda perlu menjalankan aplikasi desktop sebagai gateway. Anda dapat meng-clone repo dan mengatur aplikasi dengan langkah berikut:
   <pre>
   git clone https://github.com/ndiing/whatsapp-client
   npm install
   npm start
   </pre>
   Pastikan Node.js sudah terinstall dan aplikasi desktop sudah dijalankan.

## Contoh REST API

WhatsApp Client menyediakan beberapa endpoint REST API yang dapat Anda gunakan untuk mengirim dan menerima pesan. Berikut contoh file HTTP untuk beberapa fungsionalitas:

1. [Example](./http/example.http) - Contoh umum.
2. [Chat](./http/whatsapp-chat.http) - Kirim pesan.
3. [Group](./http/whatsapp-group.http) - Mengelola grup.
4. [Message](./http/whatsapp-message.http) - Mengelola pesan.
5. [Misc](./http/whatsapp-misc.http) - Fungsi-fungsi tambahan.
6. [Presence](./http/whatsapp-presence.http) - Status kehadiran.
7. [Privacy](./http/whatsapp-privacy.http) - Pengaturan privasi.
8. [Store](./http/whatsapp-store.http) - Pengelolaan store.
9. [WhatsApp](./http/whatsapp.http) - Endpoint utama.

## Identifikasi JID (WhatsApp JID)

Dalam WhatsApp, JID digunakan untuk mengidentifikasi pengguna, grup, atau fungsi tertentu. Berikut penjelasan tipe JID:

1. `xyzxyzxyzxyz@c.us` - Untuk chat individu.
2. `xyzxyzxyzxyz@g.us` - Untuk grup.
3. `xyzxyzxyzxyz@lid` - Pengguna dalam grup tertentu.
4. `xyzxyzxyzxyz@newsletter` - Untuk saluran newsletter.
5. `62123456789@broadcast` - Penerima dalam siaran.
6. `62123456789@s.whatsapp.net` - Identifikasi via nomor telepon.
7. `62123456789@call` - Untuk panggilan di WhatsApp.
8. `status@broadcast` - Untuk melihat status WhatsApp.

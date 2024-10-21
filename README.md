# WhatsApp Client

[![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)](https://github.com/ndiing/whatsapp-client/releases)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

WhatsApp Client adalah aplikasi yang berfungsi sebagai klien dan HTTP server untuk menghubungkan WhatsApp dengan perangkat lunak yang Anda kembangkan. Aplikasi ini berkomunikasi melalui HTTP request dan webhook, dan dirancang untuk perangkat lunak yang belum mendukung teknologi socket dan server-sent event.

## Daftar Isi

-   [Pemasangan](#pemasangan)
-   [Penggunaan](#penggunaan)
-   [Pengaturan](#pengaturan)
-   [REST API](#rest-api)
-   [Tutorial](#tutorial)
-   [Penanganan Error](#penanganan-error)
-   [Referensi](#referensi)

## Pemasangan

Instalasi aplikasi cukup mudah. Ikuti langkah-langkah berikut:

1. Unduh aplikasi dari [halaman rilis](https://github.com/ndiing/whatsapp-client/releases).
2. Instal aplikasi.

> **Catatan:** Setelah instalasi selesai, aplikasi akan berjalan otomatis pada tray icon. Anda bisa mematikan aplikasi jika belum siap digunakan.

## Penggunaan

Berikut adalah cara dasar penggunaan aplikasi:

1. **Hover** pada icon tray untuk melihat versi aplikasi.
2. **Klik kanan** pada icon tray dan pilih **Berhenti** untuk mematikan aplikasi.

## Pengaturan

Untuk mengatur variabel lingkungan (env), buka jendela run (Windows + R) dan ketik `%appdata%/whatsapp-client`, lalu buka file `.env`. Berikut adalah nilai defaultnya:

<pre>
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://localhost:2000/api/whatsapp/:_id/webhook
WHATSAPP_AUTOSTART=false
</pre>

### Langkah Pengaturan

1. **Sesuaikan** nilai `WHATSAPP_WEBHOOK` dengan perangkat lunak yang sedang dikembangkan.
2. **Ubah** `WHATSAPP_AUTOSTART` menjadi `true` jika Anda ingin aplikasi berjalan otomatis saat startup.

## REST API

Contoh penggunaan REST API dapat dilihat pada tautan berikut:

1. [./http/whatsapp.http](./http/whatsapp.http) - Semua API (tidak perlu dicoba semuanya).
2. [./http/whatsapp-message.http](./http/whatsapp-message.http) - API penanganan pesan.
3. [./http/whatsapp-presence.http](./http/whatsapp-presence.http) - API penangan kehadiran.
4. [./http/whatsapp-store.http](./http/whatsapp-store.http) - API untuk penanganan data.

## Tutorial

Berikut langkah-langkah penggunaan aplikasi:

1. **Buat webhook** terlebih dahulu.
2. **Atur webhook** pada file `.env`.
3. **Buka aplikasi**.
4. **Penanganan QR Code**: Pastikan untuk menangani QR code untuk login dan pesan masuk. Berikut adalah contoh kode untuk menangani webhook:
 <pre>
 async function webhook(req, res, next) {
     try {
         if (req.body["connection.update"]) {
             const update = req.body["connection.update"];
 
             if (update.qr) {
                 console.log(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(update.qr)}`);
             }
         }
 
         if (req.body["messages.upsert"]) {
             const upsert = req.body["messages.upsert"];
 
             if (upsert.type === "notify") {
                 for (const msg of upsert.messages) {
                     console.log(msg);
                 }
             }
         }
 
         res.json({ message: "OK" });
     } catch (error) {
         next(error);
     }
 }
 </pre>

5. **Mengakses API WhatsApp**:

    - **Untuk menjalankan API**:
      <pre>
      POST http://localhost:2000/api/whatsapp/{{_id}}/start 
      Content-Type: application/json

    {}
    </pre>
    - **Untuk mengirim pesan** (teks sederhana):
    <pre>
    POST http://localhost:2000/api/whatsapp/{{_id}}/sendMessage 
    Content-Type: application/json

    {
    "jid": "{{jid}}@s.whatsapp.net",
    "content": {
    "text": "Kirim pesan teks sederhana!"
    }
    }
    </pre>
    - **Untuk menghentikan API**:
    <pre>
    POST http://localhost:2000/api/whatsapp/{{_id}}/stop 
    Content-Type: application/json

    {}
    </pre>

6. **Menggunakan Beberapa Akun**: Jika Anda ingin menggunakan lebih dari satu akun, ubah `{{_id}}` dengan ID akun yang sesuai. Berikut adalah contohnya:

    - **Contoh 1**:
      <pre>
      POST http://localhost:2000/api/whatsapp/62123456789/start 
      Content-Type: application/json

    {}
    </pre>
    - **Contoh 2**:
    <pre>
    POST http://localhost:2000/api/whatsapp/62987654321/start 
    Content-Type: application/json

    {}
    </pre>

## Penanganan Error

Jika Anda mengalami masalah saat menggunakan aplikasi, berikut adalah beberapa error umum dan solusinya:

1. **Error QR Code Tidak Muncul**: Pastikan Anda telah menangani webhook dengan benar. Periksa konsol untuk memastikan tidak ada kesalahan.
2. **API Tidak Berfungsi**: Pastikan aplikasi berjalan di background dan variabel `WHATSAPP_WEBHOOK` telah diatur dengan benar.
3. **Kesalahan Koneksi**: Cek koneksi jaringan Anda dan pastikan bahwa port yang digunakan (default: 2000) tidak diblokir oleh firewall.

## Referensi

Untuk informasi lebih lanjut, Anda dapat mengunjungi:

-   [Dokumentasi WhatsApp Web](https://web.whatsapp.com/)
-   [Node.js](https://nodejs.org/en/docs/)

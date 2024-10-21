# WhatsApp Client

[![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)](https://github.com/ndiing/whatsapp-client/releases)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

WhatsApp Client adalah aplikasi yang dirancang sebagai klien dan bertindak sebagai HTTP server untuk menjembatani WhatsApp dengan perangkat lunak yang dikembangkan. Aplikasi ini berkomunikasi menggunakan HTTP request dan webhook, serta dirancang untuk kebutuhan perangkat lunak yang belum mendukung teknologi socket dan server-sent event.

## Pemasangan

Instalasi aplikasi cukup mudah, ikuti langkah-langkah berikut:

1. Unduh aplikasi dari [halaman rilis](https://github.com/ndiing/whatsapp-client/releases).
2. Instal aplikasi.

> **Catatan:** Setelah instalasi selesai, aplikasi akan berjalan otomatis pada tray icon. Anda bisa mematikan aplikasi jika belum siap digunakan.

## Penggunaan

Berikut adalah penggunaan dasar aplikasi:

1. **Hover** pada icon tray untuk melihat versi aplikasi.
2. **Klik kanan** dan pilih **Berhenti** untuk mematikan aplikasi.

## Pengaturan

Untuk mengatur variabel lingkungan (env), silakan buka jendela run (Windows + R) dan ketik `%appdata%/whatsapp-client`, lalu buka file `.env`. Berikut adalah nilai defaultnya:

<pre>
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://localhost:2000/api/whatsapp/:_id/webhook
WHATSAPP_AUTOSTART=false
</pre>

1. Sesuaikan nilai `WHATSAPP_WEBHOOK` dengan perangkat lunak yang sedang dikembangkan.
2. Ubah `WHATSAPP_AUTOSTART` ke `true` untuk menjalankan aplikasi secara otomatis.

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

Pastikan untuk menangani QR code untuk login dan pesan masuk. Berikut adalah contoh kode untuk menangani webhook:

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

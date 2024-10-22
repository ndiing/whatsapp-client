# WhatsApp Client

[![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)](https://github.com/ndiing/whatsapp-client/releases)  
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

WhatsApp Client adalah aplikasi yang berfungsi sebagai klien dan HTTP server untuk menghubungkan WhatsApp dengan perangkat lunak yang Anda kembangkan. Aplikasi ini berkomunikasi melalui HTTP request dan webhook, serta dirancang untuk perangkat lunak yang belum mendukung teknologi socket dan server-sent event.

## Daftar Isi

1.  **[Pemasangan](#pemasangan)**
2.  **[Penggunaan](#penggunaan)**
3.  **[Pengaturan](#pengaturan)**
4.  **[REST API](#rest-api)**
5.  **[Tutorial](#tutorial)**
6.  **[Penanganan Error](#penanganan-error)**
7.  **[Informasi JID](#informasi-jid)**

## Pemasangan

Instalasi aplikasi sangat mudah. Ikuti langkah-langkah berikut:

1. Unduh aplikasi dari [halaman rilis](https://github.com/ndiing/whatsapp-client/releases).
2. Instal aplikasi.

> **Catatan:** Setelah instalasi selesai, aplikasi akan berjalan otomatis di tray icon. Anda dapat mematikan aplikasi jika belum siap digunakan.

## Penggunaan

Berikut cara dasar penggunaan aplikasi:

1. **Hover** pada ikon tray untuk melihat versi aplikasi.
2. **Klik kanan** pada ikon tray dan pilih **Berhenti** untuk mematikan aplikasi.

## Pengaturan

Untuk mengatur variabel lingkungan (env), buka jendela run (Windows + R) dan ketik `%appdata%/whatsapp-client`, lalu buka file `.env`. Berikut adalah nilai defaultnya:

```bash
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://localhost:3000/:_id/webhook
WHATSAPP_AUTOSTART=false
```

### Langkah Pengaturan

1. **Sesuaikan** nilai `WHATSAPP_WEBHOOK` dengan perangkat lunak yang sedang dikembangkan.
2. **Ubah** `WHATSAPP_AUTOSTART` menjadi `true` jika Anda ingin aplikasi berjalan otomatis saat startup.

## REST API

Berikut adalah contoh penggunaan REST API yang tersedia:

1. **[example.http](./http/example.http)** - Contoh umum
2. **[whatsapp-chat.http](./http/whatsapp-chat.http)** - Penanganan chat
3. **[whatsapp-group.http](./http/whatsapp-group.http)** - Penanganan grup
4. **[whatsapp-message.http](./http/whatsapp-message.http)** - Penanganan pesan
5. **[whatsapp-misc.http](./http/whatsapp-misc.http)** - Berbagai penanganan lainnya
6. **[whatsapp-presence.http](./http/whatsapp-presence.http)** - Penanganan kehadiran
7. **[whatsapp-privacy.http](./http/whatsapp-privacy.http)** - Penanganan privasi
8. **[whatsapp-store.http](./http/whatsapp-store.http)** - Penanganan data
9. **[whatsapp.http](./http/whatsapp.http)** - Semua API

## Tutorial

Langkah-langkah penggunaan aplikasi adalah sebagai berikut:

1. **Buat webhook** terlebih dahulu.
2. **Atur webhook** pada file `.env`.
3. **Buka aplikasi**.
4. **Penanganan QR Code**: Pastikan untuk menangani QR code untuk login dan pesan masuk. Berikut adalah contoh kode untuk menangani webhook di server:

```js
const express = require("express");
const app = express();

// Middleware untuk menangani request JSON
app.use(express.json());

// Webhook endpoint untuk menangani berbagai event dari WhatsApp
app.post("/:_id/webhook", (req, res, next) => {
    try {
        // Cek jika ada pembaruan koneksi
        if (req.body["connection.update"]) {
            const update = req.body["connection.update"];
            console.log(update);

            // Menangani QR code (jika ada)
            if (update.qr) {
                console.log(`QR Code: https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(update.qr)}`);
            }
        }

        // Menangani upsert pesan
        if (req.body["messages.upsert"]) {
            const upsert = req.body["messages.upsert"];
            if (upsert.type === "notify") {
                upsert.messages.forEach((msg) => {
                    console.log("Pesan Masuk:", msg);
                });
            }
        }

        res.json({ message: "OK" });
    } catch (error) {
        next(error);
    }
});

// Menjalankan server pada port 3000 dan mengizinkan akses dari luar
const server = app.listen(3000, "0.0.0.0", () => {
    console.log(`Server berjalan di: ${server.address().address}:${server.address().port}`);
});
```

5. **Mengakses API WhatsApp**:

-   **Untuk menjalankan API**:

```http
POST http://localhost:2000/api/whatsapp/{{_id}}/start
Content-Type: application/json

{}
```

-   **Untuk mengirim pesan** (teks sederhana):

```http
POST http://localhost:2000/api/whatsapp/{{_id}}/sendMessage
Content-Type: application/json

{
    "jid": "{{jid}}@s.whatsapp.net",
    "content": {
        "text": "Kirim pesan teks sederhana!"
    }
}
```

-   **Untuk menghentikan API**:

```http
POST http://localhost:2000/api/whatsapp/{{_id}}/stop
Content-Type: application/json

{}
```

6. **Menggunakan Beberapa Akun**: Jika Anda ingin menggunakan lebih dari satu akun, ubah `{{_id}}` dengan ID akun yang sesuai. Berikut adalah contohnya:

-   **Contoh 1**:

```http
POST http://localhost:2000/api/whatsapp/62123456789/start
Content-Type: application/json

{}
```

-   **Contoh 2**:

```http
POST http://localhost:2000/api/whatsapp/62987654321/start
Content-Type: application/json

{}
```

## Penanganan Error

Jika Anda mengalami masalah saat menggunakan aplikasi, berikut adalah beberapa error umum beserta solusinya:

1. **QR Code Tidak Muncul**: Periksa penanganan webhook dan konsol untuk kesalahan.
2. **API Tidak Berfungsi**: Pastikan aplikasi berjalan di latar belakang dan `WHATSAPP_WEBHOOK` telah diatur dengan benar.
3. **Kesalahan Koneksi**: Cek koneksi jaringan dan pastikan port (default: 2000) tidak diblokir firewall.

## Informasi JID

**JID (WhatsApp ID)** adalah identifikasi unik di WhatsApp untuk pengguna dan grup. Berikut adalah format JID yang umum digunakan:

1. **Pengguna pribadi**: `xyzxyzxyzxyz@c.us` - Untuk chat individu.
2. **Grup WhatsApp**: `xyzxyzxyzxyz@g.us` - Untuk mengidentifikasi grup.
3. **Pengguna dalam grup**: `xyzxyzxyzxyz@lid` - Untuk pengguna tertentu dalam grup.
4. **Newsletter**: `xyzxyzxyzxyz@newsletter` - Untuk entitas atau saluran newsletter.
5. **Broadcast**: `62123456789@broadcast` - Untuk penerima dalam siaran.
6. **Pengguna individu**: `62123456789@s.whatsapp.net` - Identifikasi melalui nomor telepon.
7. **Panggilan**: `62123456789@call` - Untuk panggilan di WhatsApp.
8. **Status**: `status@broadcast` - Untuk melihat status WhatsApp.

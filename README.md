# WhatsApp Client

[![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)](https://github.com/ndiing/whatsapp-client/releases)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

`whatsapp-client` adalah library yang memudahkan komunikasi dengan API Web WhatsApp. Library ini cocok untuk aplikasi yang belum mendukung soket dan sse.

## Cara Instal

1. **Download** dari [halaman rilis WhatsApp Client](https://github.com/ndiing/whatsapp-client/releases).
2. **Install** aplikasi.

   Setelah diinstal, aplikasi akan langsung berjalan dan muncul di ikon tray (pojok kanan bawah layar). Untuk melihat versi, arahkan kursor ke ikon. Untuk menghentikan aplikasi, klik kanan pada ikon dan pilih "Berhenti".

## Pengaturan

Di folder `whatsapp-client`, ubah file `.env` dengan pengaturan berikut:

```
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://localhost:3000/:_id/webhook
WHATSAPP_AUTOSTART=true
```

- **`WHATSAPP_WEBHOOK`**: Sesuaikan URL webhook sesuai aplikasi yang kamu buat.

## Lokasi Data

Sejak versi **2.0.0**, lokasi penyimpanan data aplikasi telah dipindahkan. Untuk mengakses folder data aplikasi:

1. Tekan `Win + R`.
2. Ketik `%appdata%/whatsapp-client` dan tekan **Enter**.

## Tutorial: Membuat Webhook dengan Express

Berikut langkah-langkah untuk membuat webhook sederhana menggunakan Express:

1. **Instal Express** jika belum terpasang:
   ```npm install express```

2. **Buat file** bernama `webhook.js` dan tambahkan kode berikut:

```
const express = require('express');

const app = express();

async function webhook(req, res, next) {
    try {
        if (req.body["connection.update"]) {
            const update = req.body["connection.update"];
            if (update.qr) {
                console.log(`QR Code: https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(update.qr)}`);
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

app.use(express.json());
app.post('/:_id/webhook', webhook);

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
```

3. **Jalankan server**:
   ```node webhook.js```

Sekarang server kamu sudah siap dan akan menerima pembaruan dari WhatsApp!

## Tutorial: Membuat Webhook dengan PHP

Berikut langkah-langkah untuk membuat webhook sederhana menggunakan PHP:

1. **Buat file** bernama `webhook.php` dan tambahkan kode berikut:

```
<?php

header('Content-Type: application/json');
$body = json_decode(file_get_contents('php://input'), true);

if (isset($body["connection"]["update"])) {
    $update = $body["connection"]["update"];
    if (isset($update["qr"])) {
        echo "QR Code: https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=" . urlencode($update["qr"]);
    }
}

if (isset($body["messages"]["upsert"])) {
    $upsert = $body["messages"]["upsert"];
    if ($upsert["type"] === "notify") {
        foreach ($upsert["messages"] as $msg) {
            error_log(json_encode($msg));
        }
    }
}

echo json_encode(["message" => "OK"]);
?>
```

2. **Jalankan server PHP** (misalnya dengan menggunakan XAMPP atau server lokal lainnya).

Sekarang server kamu sudah siap dan akan menerima pembaruan dari WhatsApp!

## Catatan

- Aplikasi ini masih dalam tahap pengembangan dan akan diperbarui secara otomatis.
- Contoh permintaan HTTP bisa dilihat di [lihat request](./http/whatsapp.http).
- Panduan penggunaan dan tutorial sedang dibuat.

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
WHATSAPP_WEBHOOK=http://localhost:3000/:_id/webhook
WHATSAPP_AUTOSTART=true
</pre>

- **`WHATSAPP_WEBHOOK`**: Sesuaikan URL webhook sesuai dengan aplikasi yang kamu buat.

## Tutorial: Membuat Webhook dengan Express

Berikut adalah contoh cara membuat webhook sederhana menggunakan Express:

1. **Instal Express** jika belum terpasang:
   <pre>npm install express</pre>

2. **Buat file** bernama `webhook.js` dan tambahkan kode berikut:

<pre>
const express = require('express');

const app = express();

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

app.use(express.json());
app.post('/:_id/webhook', webhook);

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
</pre>

3. **Jalankan server**:
   <pre>node webhook.js</pre>

Sekarang server kamu sudah siap dan akan menerima pembaruan dari WhatsApp!

## Catatan

- Aplikasi ini masih dalam tahap pengembangan, dan akan otomatis diperbarui.
- Contoh permintaan HTTP bisa dilihat di [lihat request](./http/whatsapp.http).
- Panduan penggunaan dan tutorial sedang dibuat.

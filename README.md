# WhatsApp Client

[https://img.shields.io/github/v/release/ndiing/whatsapp-client](https://github.com/ndiing/whatsapp-client/releases)

`whatsapp-client` adalah sebuah library yang meng-wrap HTTP request dari API Web WhatsApp. Library ini dirancang untuk memenuhi kebutuhan aplikasi yang belum mendukung socket dan event source.

## Instal

- Download dari [halaman rilis WhatsApp Client](https://github.com/ndiing/whatsapp-client/releases)
- Install

Setelah diinstal, aplikasi akan dijalankan secara otomatis dan ditampilkan pada tray icon. Untuk melihat versi, kamu bisa hover pada icon, dan untuk menghentikan aplikasi, lakukan klik kanan lalu pilih "Berhenti".

## Env

Pada folder `whatsapp-client`, sesuaikan konfigurasi file `.env` dengan mengubah nilai-nilai berikut:

<pre>
HTTP_PORT=2000
HTTPS_PORT=0
HOSTNAME=localhost
WHATSAPP_WEBHOOK=http://localhost:2000/api/whatsapp/:_id/webhook
WHATSAPP_AUTOSTART=true
</pre>

- `WHATSAPP_WEBHOOK`: Atur webhook sesuai dengan aplikasi yang Anda kembangkan.

## Note

- Aplikasi ini masih dalam tahap pengembangan, dan akan dilakukan update secara otomatis.
- Contoh request HTTP bisa dilihat di [lihat request](./http/whatsapp.http).
- Keterangan penggunaan dan tutorial sedang dibuat.

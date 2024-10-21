# WhatsApp Client API

![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)  
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

API sederhana yang membungkus Web WhatsApp dengan HTTP request. API ini dirancang untuk memberikan dukungan bagi aplikasi yang belum mendukung WebSocket dan EventSource secara langsung.

## Fitur
- Kirim dan terima pesan melalui Web WhatsApp.
- Dukungan untuk integrasi aplikasi yang belum mendukung WebSocket atau EventSource.
- Dibungkus dengan HTTP request untuk kemudahan implementasi.
- **Auto-update**: Aplikasi akan otomatis memperbarui ke versi terbaru.

## Cara Install
1. Download versi terbaru dari [releases](https://github.com/ndiing/whatsapp-client/releases).
2. Install aplikasi yang sudah diunduh.

## Setelah Instalasi
Setelah aplikasi diunduh dan diinstal untuk pertama kali, aplikasi akan otomatis berjalan di tray menu. 

- **Melihat Versi**: Hover pada ikon di tray untuk melihat versi yang sedang berjalan.
- **Menutup Aplikasi**: Klik kanan pada ikon di tray dan pilih "Berhenti" untuk menutup aplikasi.

## Penggunaan
Kirim request HTTP untuk memanfaatkan fitur API ini tanpa memerlukan pengaturan socket atau event secara manual.

Contoh request dapat ditemukan di file [`http/whatsapp.http`](http/whatsapp.http).

**Tutorial atau cara penggunaan akan menyusul, saat ini sedang dalam pengembangan.**

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

### PHP WEBHOOK
<pre>
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

function webhook(ServerRequestInterface $request, ResponseInterface $response, RequestHandlerInterface $handler): ResponseInterface
{
    try {
        $body = json_decode((string) $request->getBody(), true);

        if (isset($body["connection.update"])) {
            $update = $body["connection.update"];
            if (isset($update["qr"])) {
                echo "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=" . urlencode($update["qr"]) . "\n";
            }
        }

        // Menangani berbagai pembaruan
        // ...

        $response->getBody()->write(json_encode(["message" => "OK"]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    } catch (Throwable $error) {
        // Tangani error, log, dll.
        return $response->withStatus(500);
    }
}

// Contoh penggunaan dengan router
$app->post('/{id}/webhook', 'webhook');
</pre>

### NODE WEBHOOK
<pre>
async function webhook(req, res, next) {
    try {
        if (req.body["connection.update"]) {
            const update = req.body["connection.update"];
            if (update.qr) {
                console.log(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(update.qr)}`);
            }
        }

        // Menangani berbagai pembaruan
        // ...

        res.json({ message: "OK" });
    } catch (error) {
        next(error);
    }
}

router.post("/:_id/webhook", webhook);
</pre>

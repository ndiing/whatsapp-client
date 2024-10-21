# WhatsApp Client API

![GitHub Release](https://img.shields.io/github/v/release/ndiing/whatsapp-client)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/ndiing/whatsapp-client/total)](https://github.com/ndiing/whatsapp-client/releases)

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

### PHP WEBHOOK
```php
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\StreamInterface;

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

        if (isset($body["creds.update"])) {
            var_dump($body["creds.update"]);
        }
        if (isset($body["messaging-history.set"])) {
            var_dump($body["messaging-history.set"]);
        }
        if (isset($body["chats.upsert"])) {
            var_dump($body["chats.upsert"]);
        }
        if (isset($body["chats.update"])) {
            var_dump($body["chats.update"]);
        }
        if (isset($body["chats.delete"])) {
            var_dump($body["chats.delete"]);
        }
        if (isset($body["labels.association"])) {
            var_dump($body["labels.association"]);
        }
        if (isset($body["labels.edit"])) {
            var_dump($body["labels.edit"]);
        }
        if (isset($body["presence.update"])) {
            var_dump($body["presence.update"]);
        }
        if (isset($body["contacts.upsert"])) {
            var_dump($body["contacts.upsert"]);
        }
        if (isset($body["contacts.update"])) {
            var_dump($body["contacts.update"]);
        }
        if (isset($body["messages.delete"])) {
            var_dump($body["messages.delete"]);
        }
        if (isset($body["messages.update"])) {
            var_dump($body["messages.update"]);
        }
        if (isset($body["messages.media-update"])) {
            var_dump($body["messages.media-update"]);
        }

        if (isset($body["messages.upsert"])) {
            $upsert = $body["messages.upsert"];

            if ($upsert["type"] === "notify") {
                foreach ($upsert["messages"] as $msg) {
                    var_dump($msg);
                }
            }
        }

        if (isset($body["messages.reaction"])) {
            var_dump($body["messages.reaction"]);
        }
        if (isset($body["message-receipt.update"])) {
            var_dump($body["message-receipt.update"]);
        }
        if (isset($body["groups.upsert"])) {
            var_dump($body["groups.upsert"]);
        }
        if (isset($body["groups.update"])) {
            var_dump($body["groups.update"]);
        }
        if (isset($body["group-participants.update"])) {
            var_dump($body["group-participants.update"]);
        }
        if (isset($body["blocklist.set"])) {
            var_dump($body["blocklist.set"]);
        }
        if (isset($body["blocklist.update"])) {
            var_dump($body["blocklist.update"]);
        }
        if (isset($body["call"])) {
            var_dump($body["call"]);
        }

        $response->getBody()->write(json_encode(["message" => "OK"]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    } catch (Throwable $error) {
        // Handle the error, log it, etc.
        return $response->withStatus(500);
    }
}

// Contoh penggunaan dengan router
$app->post('/{id}/webhook', 'webhook');

```
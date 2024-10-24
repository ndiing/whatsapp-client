function body() {
    return async function (req, res, next) {
        try {
            if (["POST", "PATCH", "PUT"].includes(req.method)) {
                const chunks = [];

                for await (const chunk of req) {
                    chunks.push(chunk);
                }

                const buffer = Buffer.concat(chunks);

                const contentType = req.headers["content-type"] || "";

                if (/^application\/json/.test(contentType)) {
                    req.body = JSON.parse(buffer);
                } else if (/^application\/x-www-form-urlencoded/.test(contentType)) {
                    req.body = Object.fromEntries(new URLSearchParams(buffer.toString()).entries());
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = {
    body,
};

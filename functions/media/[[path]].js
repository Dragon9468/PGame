/**
 * Cloudflare Pages Functions - R2 Media Streaming & Cache Router
 * Route: /media/* -> maps directly to R2 bucket binding 'MEDIA_BUCKET'
 * Features:
 * - Direct zero-cost egress from Cloudflare R2
 * - Supports HTTP Range requests for video/audio seeking
 * - Cloudflare Edge Caching (1 year immutable for hashed/named media assets)
 * - Automatic Content-Type guessing and CORS headers
 */

export async function onRequest(context) {
  const { request, env, params } = context;

  // 1. Kiểm tra R2 binding
  if (!env.MEDIA_BUCKET) {
    return new Response(
      JSON.stringify({ error: "R2 binding 'MEDIA_BUCKET' is not configured on Cloudflare Pages." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Chỉ cho phép GET và HEAD
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // 3. Trích xuất đường dẫn file trong R2
  // params.path là array các segment sau /media/
  const pathSegments = params.path;
  const key = Array.isArray(pathSegments) ? pathSegments.join("/") : (pathSegments || "");

  if (!key) {
    return new Response("Media file path required", { status: 400 });
  }

  // 4. Lấy object từ R2 (có hỗ trợ HTTP Range cho Audio/Video seeking)
  const rangeHeader = request.headers.get("range");
  let object;

  try {
    if (rangeHeader) {
      object = await env.MEDIA_BUCKET.get(key, {
        range: request.headers,
        onlyIf: request.headers,
      });
    } else {
      object = await env.MEDIA_BUCKET.get(key, {
        onlyIf: request.headers,
      });
    }
  } catch (err) {
    return new Response("Failed to fetch object from R2: " + err.message, { status: 500 });
  }

  // 5. Nếu không tìm thấy file trong R2
  if (!object) {
    return new Response("Media object not found: " + key, {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
      }
    });
  }

  // 6. Xây dựng Headers phản hồi
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

  // Đảm bảo có Content-Type chuẩn nếu R2 chưa gắn metadata
  if (!headers.has("content-type")) {
    const ext = key.split(".").pop().toLowerCase();
    const mimeTypes = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      webp: "image/webp",
      gif: "image/gif",
      svg: "image/svg+xml",
      mp3: "audio/mpeg",
      ogg: "audio/ogg",
      wav: "audio/wav",
      m4a: "audio/mp4",
      mp4: "video/mp4",
      webm: "video/webm",
      swf: "application/x-shockwave-flash",
      wasm: "application/wasm",
      json: "application/json",
      bin: "application/octet-stream"
    };
    if (mimeTypes[ext]) {
      headers.set("content-type", mimeTypes[ext]);
    }
  }

  // Bật cache CDN Cloudflare Edge 1 năm cho media
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  // 7. Xử lý status code nếu là Range request (206 Partial Content)
  const status = object.body ? (rangeHeader ? 206 : 200) : 304;

  return new Response(object.body, {
    headers,
    status,
  });
}

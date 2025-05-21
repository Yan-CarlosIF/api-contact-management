import { request as httpRequest } from "http";
import { request as httpsRequest } from "https";
import { URL } from "url";

interface ImageCheckResult {
  isImage: boolean;
  finalUrl: string;
}

export function isValidImageUrl(
  url: string,
  maxRedirects = 5
): Promise<ImageCheckResult> {
  return new Promise((resolve) => {
    if (maxRedirects <= 0) {
      return resolve({ isImage: false, finalUrl: url });
    }

    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === "https:" ? httpsRequest : httpRequest;

    const req = client(
      {
        method: "HEAD",
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        headers: {
          "User-Agent": "Node.js",
        },
      },
      (res) => {
        const statusCode = res.statusCode || 0;

        if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
          const nextUrl = new URL(res.headers.location, url).href;
          return resolve(isValidImageUrl(nextUrl, maxRedirects - 1));
        }

        const contentType = res.headers["content-type"];
        const isImage = Boolean(
          contentType && contentType.startsWith("image/")
        );
        return resolve({ isImage, finalUrl: url });
      }
    );

    req.on("error", () => resolve({ isImage: false, finalUrl: url }));
    req.end();
  });
}

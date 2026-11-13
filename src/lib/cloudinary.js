/**
 * Cloudinary Client Utilities for Ozeonix Infinity
 *
 * Provides global CDN delivery, automatic WebP/AVIF format conversion (f_auto),
 * responsive width scaling, and intelligent lossy compression (q_auto) to ensure
 * minimal page weight and instant asset loads under massive concurrent traffic.
 */

const DEFAULT_CLOUD_NAME =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ||
      import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      import.meta.env.CLOUDINARY_CLOUD_NAME)) ||
  "ds3gjhrob";

/**
 * Checks if a string is already a full Cloudinary delivery URL.
 */
export function isCloudinaryUrl(url) {
  return typeof url === "string" && url.includes("res.cloudinary.com");
}

/**
 * Builds an optimized Cloudinary delivery URL with transformation parameters.
 *
 * @param {string} publicIdOrUrl - The Cloudinary public_id, full delivery URL, or remote image URL.
 * @param {object} [options={}] - Transformation options.
 * @param {number} [options.width] - Target width in pixels.
 * @param {number} [options.height] - Target height in pixels.
 * @param {string} [options.crop='limit'] - Crop mode ('limit', 'fill', 'scale', 'thumb', etc.).
 * @param {string} [options.quality='auto'] - Compression quality ('auto', 'auto:eco', 'auto:good', 'auto:best').
 * @param {string} [options.format='auto'] - Output format ('auto' serves AVIF/WebP depending on browser support).
 * @param {string} [options.gravity] - Focus gravity (e.g. 'auto', 'face', 'center').
 * @param {string} [options.cloudName] - Override cloud name if necessary.
 * @returns {string} The fully qualified, optimized Cloudinary CDN URL.
 */
export function getCloudinaryUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl || typeof publicIdOrUrl !== "string") {
    return publicIdOrUrl;
  }

  const cloudName = options.cloudName || DEFAULT_CLOUD_NAME;
  const quality = options.quality || "auto";
  const format = options.format || "auto";
  const crop = options.crop || (options.width && options.height ? "fill" : "limit");

  // Construct transformation parts
  const transforms = [`f_${format}`, `q_${quality}`];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop || (options.width && options.height)) transforms.push(`c_${crop}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);

  const transformSegment = transforms.join(",");

  // 1. If it's already a Cloudinary upload URL, insert the transforms
  if (isCloudinaryUrl(publicIdOrUrl)) {
    const uploadIndex = publicIdOrUrl.indexOf("/image/upload/");
    if (uploadIndex !== -1) {
      const prefix = publicIdOrUrl.slice(0, uploadIndex + "/image/upload/".length);
      const suffix = publicIdOrUrl.slice(uploadIndex + "/image/upload/".length);
      // Remove any existing transforms in suffix if present
      const cleanSuffix = suffix.replace(/^[a-z]_[^/]+\//g, "");
      return `${prefix}${transformSegment}/${cleanSuffix}`;
    }
    return publicIdOrUrl;
  }

  // 2. If it's an external HTTP/HTTPS URL, deliver it through Cloudinary Fetch
  if (/^https?:\/\//i.test(publicIdOrUrl)) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformSegment}/${encodeURIComponent(
      publicIdOrUrl,
    )}`;
  }

  // 3. Otherwise treat it as a Cloudinary public_id
  const cleanId = publicIdOrUrl.replace(/^\//, "");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformSegment}/${cleanId}`;
}

/**
 * Builds a responsive `srcset` attribute string for Cloudinary images.
 *
 * @param {string} publicIdOrUrl - Cloudinary public ID, delivery URL, or fetchable remote URL.
 * @param {number[]} [widths=[320, 640, 768, 1024, 1280, 1536, 1920]] - Breakpoint widths.
 * @param {object} [options={}] - Additional transformation options.
 * @returns {string} Comma-separated srcset string with `w` descriptors.
 */
export function buildCloudinarySrcSet(
  publicIdOrUrl,
  widths = [320, 640, 768, 1024, 1280, 1536, 1920],
  options = {},
) {
  if (!publicIdOrUrl) return "";

  const safeWidths = [...new Set(widths)]
    .filter((w) => Number.isFinite(w) && w > 0)
    .sort((a, b) => a - b);

  return safeWidths
    .map((w) => {
      const url = getCloudinaryUrl(publicIdOrUrl, { ...options, width: w });
      return `${url} ${w}w`;
    })
    .join(", ");
}

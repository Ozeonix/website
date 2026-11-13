import React from "react";
import { getCloudinaryUrl, buildCloudinarySrcSet } from "../lib/cloudinary.js";

/**
 * CloudinaryImage — High-performance responsive image component for Cloudinary.
 *
 * Automatically delivers:
 * - Next-gen formats (AVIF & WebP) via modern <picture> tags.
 * - Fluid responsive srcset breakpoints (320w to 1920w).
 * - Automatic visual compression (q_auto).
 * - Cumulative Layout Shift (CLS) prevention via aspect ratio reservation.
 * - Native async decoding and lazy loading.
 */
export default function CloudinaryImage({
  src,
  publicId,
  alt,
  width,
  height,
  crop = "limit",
  gravity,
  quality = "auto",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  widths = [320, 480, 640, 768, 1024, 1280, 1600],
  loading = "lazy",
  fetchPriority = "auto",
  className = "",
  pictureClassName = "",
  style,
}) {
  const assetId = publicId || src;
  if (!assetId) return null;

  const safeWidths = [...new Set(widths)]
    .filter((v) => Number.isFinite(v) && v > 0)
    .sort((a, b) => a - b);

  const avifSrcSet = buildCloudinarySrcSet(assetId, safeWidths, {
    format: "avif",
    quality,
    crop,
    gravity,
  });

  const webpSrcSet = buildCloudinarySrcSet(assetId, safeWidths, {
    format: "webp",
    quality,
    crop,
    gravity,
  });

  const fallbackSrc = getCloudinaryUrl(assetId, {
    width: safeWidths[safeWidths.length - 1] || 1200,
    format: "auto",
    quality,
    crop,
    gravity,
  });

  const defaultSrcSet = buildCloudinarySrcSet(assetId, safeWidths, {
    format: "auto",
    quality,
    crop,
    gravity,
  });

  const intrinsicStyle =
    width && height ? { aspectRatio: `${width} / ${height}`, ...style } : style;

  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        srcSet={defaultSrcSet}
        sizes={sizes}
        alt={alt || ""}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        style={intrinsicStyle}
      />
    </picture>
  );
}


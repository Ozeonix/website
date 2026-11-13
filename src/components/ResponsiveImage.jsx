import { isCloudinaryUrl, getCloudinaryUrl, buildCloudinarySrcSet } from "../lib/cloudinary.js";

/**
 * ResponsiveImage — serves optimized remote image variants while preserving
 * intrinsic dimensions and a safe fallback for bundled/local assets.
 * Seamlessly integrates with Cloudinary and Unsplash CDNs.
 */
export default function ResponsiveImage({
  src,
  alt,
  cloudinary = false,
  crop = "limit",
  gravity,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  widths = [400, 600, 800, 1200, 1600],
  srcSet,
  width,
  height,
  loading = "lazy",
  fetchpriority,
  fetchPriority,
  className = "",
  pictureClassName = "",
  style,
}) {
  const safeWidths = [...new Set(widths)]
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);

  const isCloudinary = cloudinary || isCloudinaryUrl(src);
  const isUnsplash = typeof src === "string" && /^https:\/\/images\.unsplash\.com\//.test(src);

  // Cloudinary optimization branch
  if (isCloudinary && src) {
    const avifSrcSet = buildCloudinarySrcSet(src, safeWidths, {
      format: "avif",
      crop,
      gravity,
    });
    const webpSrcSet = buildCloudinarySrcSet(src, safeWidths, {
      format: "webp",
      crop,
      gravity,
    });
    const fallback = getCloudinaryUrl(src, {
      width: safeWidths[safeWidths.length - 1] || 1200,
      crop,
      gravity,
    });
    const defaultSrcSet = buildCloudinarySrcSet(src, safeWidths, {
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
          src={fallback}
          srcSet={defaultSrcSet}
          sizes={sizes}
          alt={alt || ""}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority ?? fetchpriority}
          className={className}
          style={intrinsicStyle}
        />
      </picture>
    );
  }

  // Unsplash / standard optimization branch
  const base = typeof src === "string" ? src.split("?")[0] : src;
  const build = (fm) =>
    safeWidths.map((w) => `${base}?auto=format&fit=crop&q=70&w=${w}&fm=${fm} ${w}w`).join(", ");
  const fallback = isUnsplash
    ? `${base}?auto=format&fit=crop&q=70&w=${safeWidths[safeWidths.length - 1] || 1200}`
    : src;
  const responsiveSources = isUnsplash ? build("jpg") : srcSet;
  const intrinsicStyle =
    width && height ? { aspectRatio: `${width} / ${height}`, ...style } : style;

  return (
    <picture className={pictureClassName}>
      {isUnsplash ? <source type="image/avif" srcSet={build("avif")} sizes={sizes} /> : null}
      {isUnsplash ? <source type="image/webp" srcSet={build("webp")} sizes={sizes} /> : null}
      <img
        src={fallback}
        srcSet={responsiveSources}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority ?? fetchpriority}
        className={className}
        style={intrinsicStyle}
      />
    </picture>
  );
}

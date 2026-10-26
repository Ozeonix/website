/**
 * ResponsiveImage — serves optimized remote image variants while preserving
 * intrinsic dimensions and a safe fallback for bundled/local assets.
 */
export default function ResponsiveImage({
  src,
  alt,
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
  const isOptimizableRemote = typeof src === "string" && /^https:\/\/images\.unsplash\.com\//.test(src);
  const base = typeof src === "string" ? src.split("?")[0] : src;
  const build = (fm) =>
    safeWidths
      .map((w) => `${base}?auto=format&fit=crop&q=70&w=${w}&fm=${fm} ${w}w`)
      .join(", ");
  const fallback = isOptimizableRemote
    ? `${base}?auto=format&fit=crop&q=70&w=${safeWidths[safeWidths.length - 1] || 1200}`
    : src;
  const responsiveSources = isOptimizableRemote ? build("jpg") : srcSet;
  const intrinsicStyle = width && height
    ? { aspectRatio: `${width} / ${height}`, ...style }
    : style;

  return (
    <picture className={pictureClassName}>
      {isOptimizableRemote ? <source type="image/avif" srcSet={build("avif")} sizes={sizes} /> : null}
      {isOptimizableRemote ? <source type="image/webp" srcSet={build("webp")} sizes={sizes} /> : null}
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

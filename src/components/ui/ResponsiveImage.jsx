/**
 * Renders an image descriptor from src/assets/landing/images.js as a <picture>
 * with AVIF/WebP sources, so the browser picks the best format and size.
 *
 * `sizes` must describe the rendered width (e.g. "100vw", "(min-width: 1280px) 690px, 100vw")
 * or the browser can't choose the right file. Set `priority` for above-the-fold images.
 */
export default function ResponsiveImage({
  image,
  alt,
  sizes,
  priority = false,
  className = "",
  pictureClassName = "",
  ...props
}) {
  return (
    <picture className={pictureClassName}>
      {image.sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={className}
        {...props}
      />
    </picture>
  );
}

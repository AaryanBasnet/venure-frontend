import emblemUrl from "../../assets/brand/venure-emblem.svg";

const mask = {
  maskImage: `url(${emblemUrl})`,
  WebkitMaskImage: `url(${emblemUrl})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  // Intrinsic ratio of venure-emblem.svg (viewBox 1894 × 1544)
  aspectRatio: "1894 / 1544",
};

/**
 * Venure emblem. Rendered as a CSS mask so it takes the current text color
 * (e.g. className="text-gold-50") and stays crisp at any size.
 * Size it with `height` (px) or with width classes (height follows the aspect ratio).
 */
export default function Logo({ className = "", height, label = "Venure" }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ ...mask, height }}
    />
  );
}

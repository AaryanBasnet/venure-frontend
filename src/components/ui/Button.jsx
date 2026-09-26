import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border font-body text-button uppercase " +
  "transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  // Gold pill. Figma uses white on #B8963C (2.8:1); gold-800 keeps the look and passes AA.
  primary:
    "border-gold-800 bg-gold-800 text-white hover:border-gold hover:bg-gold focus-visible:outline-gold",
  // Outline on dark imagery / dark backgrounds
  "outline-light":
    "border-stone text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
  // Outline on light backgrounds
  "outline-dark":
    "border-stone text-ink hover:border-ink hover:bg-ink/5 focus-visible:outline-ink",
};

const sizes = {
  sm: "px-5 py-2.5",
  md: "px-8 py-3.5",
};

/**
 * Pill button from the design system. Renders a router <Link> when `to` is set,
 * an <a> when `href` is set, otherwise a <button>.
 */
export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  arrow = false,
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}

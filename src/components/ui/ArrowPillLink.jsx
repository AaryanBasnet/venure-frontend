import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** Outline pill with a round dark arrow badge ("Read All Stories", "Explore Collection"). */
export default function ArrowPillLink({ to, href, className = "", children, ...props }) {
  const classes = `group inline-flex items-center gap-2.5 rounded-full border border-stone py-2 pl-7 pr-2 font-body text-body-lg text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="flex size-[49px] shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-gold-800">
        <ArrowRight aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}

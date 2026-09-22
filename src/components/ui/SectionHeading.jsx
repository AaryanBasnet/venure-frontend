/**
 * The design's section heading: small uppercase eyebrow, then a two-line display
 * title whose second line is an italic gold accent ("Find Your / Perfect Space").
 */
export function Eyebrow({ as = "p", className = "", children }) {
  const Tag = as;
  return <Tag className={`font-body text-eyebrow uppercase text-gold-800 ${className}`}>{children}</Tag>;
}

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  as = "h2",
  id,
  align = "left",
  className = "",
}) {
  const Tag = as;
  const alignment = align === "center" ? "text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={id} className="font-display text-display font-light text-ink">
        {title}
        {accent && (
          <>
            <br />
            <em className="font-light text-gold-700">{accent}</em>
          </>
        )}
      </Tag>
    </div>
  );
}

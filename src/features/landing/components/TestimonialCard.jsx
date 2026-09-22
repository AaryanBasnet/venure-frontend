import { useState } from "react";
import ResponsiveImage from "../../../components/ui/ResponsiveImage";
import { images } from "../../../assets/landing/images";

/**
 * Flip card (Figma component 117:995). A single accessible button toggles
 * between the photo front and the quote back. Respects prefers-reduced-motion
 * by cross-fading instead of rotating in 3D.
 */
export default function TestimonialCard({ testimonial }) {
  const [flipped, setFlipped] = useState(false);
  const { name, initial, location, occasionVenue, quote, image } = testimonial;

  return (
    <li className="[perspective:1500px]">
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? `Show photo of ${name}` : `Read ${name}'s review`}
        onClick={() => setFlipped((f) => !f)}
        data-flipped={flipped}
        className="group relative block h-[464px] w-full rounded-card-lg text-left motion-safe:[transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:data-[flipped=true]:[transform:rotateY(180deg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-800"
      >
        {/* Front — photo */}
        <div className="absolute inset-0 overflow-hidden rounded-card-lg motion-safe:[backface-visibility:hidden] motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:group-data-[flipped=true]:opacity-0">
          <ResponsiveImage
            image={images[image]}
            alt=""
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/40" />
          <div className="relative flex h-full flex-col justify-between p-7">
            <span className="flex size-[50px] items-center justify-center rounded-full border border-white/35 bg-white/20 font-body text-body text-white">
              {initial}
            </span>
            <div>
              <p className="font-display text-h3-italic italic text-white">{name}</p>
              <p className="pt-1.5 font-body text-body-light text-gold-200">{location}</p>
              <p className="pt-2 font-body text-caption uppercase tracking-[0.06em] text-white">
                Click to read review →
              </p>
            </div>
          </div>
        </div>

        {/* Back — quote */}
        <div
          className="absolute inset-0 overflow-hidden rounded-card-lg bg-cream motion-safe:[backface-visibility:hidden] motion-safe:[transform:rotateY(180deg)] motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:group-data-[flipped=true]:opacity-100"
        >
          <div className="flex h-full flex-col justify-between p-7">
            <div>
              <span className="flex size-[50px] items-center justify-center rounded-full border border-gold-200 bg-gold-100 font-body text-body text-gold">
                {initial}
              </span>
              <p className="pt-8 font-body text-body-lg italic text-gold">&ldquo;{quote}&rdquo;</p>
            </div>
            <div className="border-t border-line pt-5">
              <p className="font-display text-h3-italic italic text-ink">{name}</p>
              <p className="pt-1 font-body text-caption text-gold-600">{occasionVenue}</p>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}

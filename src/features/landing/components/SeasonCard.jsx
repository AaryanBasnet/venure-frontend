import ResponsiveImage from "../../../components/ui/ResponsiveImage";
import { images } from "../../../assets/landing/images";

/**
 * Tall seasonal photo card (Figma component 91:524). Figma has no hover
 * variant for this component, so the image-zoom treatment matches its
 * siblings (VenueTypeCard, StoryCard) instead of leaving it static.
 */
export default function SeasonCard({ season }) {
  return (
    <li className="group relative isolate aspect-[294/642] overflow-hidden rounded-card-sm bg-stone/20">
      <ResponsiveImage
        image={images[season.image]}
        alt=""
        sizes="(min-width: 1024px) 294px, (min-width: 640px) 25vw, 46vw"
        className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/10 via-45% to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-4">
        <span className="font-body text-eyebrow uppercase text-gold-200">Venure</span>
        <span className="font-display pt-1 text-h5 font-light text-white">{season.name}</span>
      </div>
    </li>
  );
}

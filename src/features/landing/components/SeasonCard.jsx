import ResponsiveImage from "../../../components/ui/ResponsiveImage";
import { images } from "../../../assets/landing/images";

/** Tall seasonal photo card (Figma component 91:524). */
export default function SeasonCard({ season }) {
  return (
    <li className="relative isolate aspect-[294/642] overflow-hidden rounded-card-sm bg-stone/20">
      <ResponsiveImage
        image={images[season.image]}
        alt=""
        sizes="(min-width: 1024px) 294px, (min-width: 640px) 25vw, 46vw"
        className="absolute inset-0 -z-20 size-full object-cover"
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

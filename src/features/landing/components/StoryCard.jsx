import ResponsiveImage from "../../../components/ui/ResponsiveImage";
import { Eyebrow } from "../../../components/ui/SectionHeading";
import { images } from "../../../assets/landing/images";

/**
 * A venue-story card (Figma 46:76). `variant="feature"` is the large full-bleed
 * photo with text overlaid at the bottom; `variant="compact"` is a smaller
 * image-plus-text card on a sand background.
 */
export default function StoryCard({ story, variant = "compact", className = "" }) {
  const { eyebrow, title, description, image, imageSizes } = story;

  if (variant === "feature") {
    return (
      <article className={`group relative isolate overflow-hidden rounded-card-xl ${className}`}>
        <ResponsiveImage
          image={images[image]}
          alt=""
          sizes={imageSizes}
          className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(10_6_3/0.85)] via-[rgb(10_6_3/0.25)] via-55% to-transparent"
        />
        <div className="flex h-full min-h-[420px] flex-col justify-end p-6 sm:p-10">
          <Eyebrow className="text-gold-200">{eyebrow}</Eyebrow>
          <h3 className="font-display pt-3 text-h2 font-light text-white">{title}</h3>
          <p className="mt-3 max-w-md font-body text-body text-white/90">{description}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="grid grid-cols-1 overflow-hidden rounded-card-xl bg-sand sm:grid-cols-2">
      <ResponsiveImage
        image={images[image]}
        alt=""
        sizes={imageSizes}
        className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-full"
      />
      <div className="flex flex-col justify-center p-6 sm:p-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="font-display pt-2.5 text-h4 font-light text-ink">{title}</h3>
        <p className="mt-2.5 font-body text-caption text-gold-800">{description}</p>
      </div>
    </article>
  );
}

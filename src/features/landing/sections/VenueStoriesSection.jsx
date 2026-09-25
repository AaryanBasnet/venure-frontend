import SectionHeading from "../../../components/ui/SectionHeading";
import ArrowPillLink from "../../../components/ui/ArrowPillLink";
import { storiesIntro, stories } from "../content/landingContent";
import StoryCard from "../components/StoryCard";

const [feature, ...compact] = stories;

// Figma 46:76 — large feature story beside two stacked compact stories.
export default function VenueStoriesSection() {
  return (
    <section id="stories" aria-labelledby="stories-title" className="bg-cream py-16 lg:py-[74px]">
      <div className="container-site flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <SectionHeading
          id="stories-title"
          eyebrow={storiesIntro.eyebrow}
          title={storiesIntro.title}
          accent={storiesIntro.accent}
        />
        {/* No dedicated stories page yet — anchors within the section like the header's nav does for other unbuilt pages */}
        <ArrowPillLink href="#stories" className="self-start lg:self-auto">
          Read all stories
        </ArrowPillLink>
      </div>

      <div className="container-site mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[1.29fr_1fr] lg:gap-[49px]">
        <StoryCard story={feature} variant="feature" className="lg:aspect-[690/600]" />
        <div className="flex flex-col gap-6 lg:min-h-0">
          {compact.map((story) => (
            <StoryCard key={story.title} story={story} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

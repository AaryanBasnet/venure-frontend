import HeroSection from "../../features/landing/sections/HeroSection";
import VenueTypesSection from "../../features/landing/sections/VenueTypesSection";
import VenueStoriesSection from "../../features/landing/sections/VenueStoriesSection";
import SeasonsSection from "../../features/landing/sections/SeasonsSection";
import FeaturedVenuesSection from "../../features/landing/sections/FeaturedVenuesSection";
import TestimonialsSection from "../../features/landing/sections/TestimonialsSection";

// Legacy sections — replaced one by one with features/landing/sections/* from the Figma design
import VenueGallery from "../../components/user/VenueGallery";
import EventListSection from "../../components/user/EventListSection";

function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-cream">
      <HeroSection />
      <VenueTypesSection />
      <VenueStoriesSection />
      <SeasonsSection />
      <FeaturedVenuesSection />
      <EventListSection />
      <VenueGallery />
      <TestimonialsSection />
    </div>
  );
}

export default LandingPage;

import HeroSection from "../../features/landing/sections/HeroSection";
import VenueTypesSection from "../../features/landing/sections/VenueTypesSection";
import VenueStoriesSection from "../../features/landing/sections/VenueStoriesSection";
import SeasonsSection from "../../features/landing/sections/SeasonsSection";
import FeaturedVenuesSection from "../../features/landing/sections/FeaturedVenuesSection";
import TestimonialsSection from "../../features/landing/sections/TestimonialsSection";
import PartnerCtaSection from "../../features/landing/sections/PartnerCtaSection";

function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-cream">
      <HeroSection />
      <VenueTypesSection />
      <VenueStoriesSection />
      <SeasonsSection />
      <FeaturedVenuesSection />
      <TestimonialsSection />
      <PartnerCtaSection />
    </div>
  );
}

export default LandingPage;

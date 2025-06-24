import React from "react";

import HeroSection from "../../components/user/HeroSection";
import VenueGallery from "../../components/user/VenueGallery";
import VenuesSection from "../../components/user/VenuesSection";
import EventListSection from "../../components/user/EventListSection";
import TestimonialsSection from "../../components/user/TestimonialSection";
import NepalExperienceSection from "../../components/user/NepalExperienceSection";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#eeeeea] overflow-x-hidden bg-cream">
      <HeroSection />
      <VenuesSection />
      <EventListSection />
      <NepalExperienceSection />
      <VenueGallery />

      <TestimonialsSection />
    </div>
  );
}

export default LandingPage;

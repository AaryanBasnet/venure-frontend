// Static marketing copy for the landing page (from Figma). Keep text out of components
// so it can later move to a CMS without touching the UI.

export const hero = {
  tagline: "Handpicked heritage venues across Nepal's most sacred valleys.",
  eyebrow: "Authentic spaces · Global heritage · Nepal",
};

export const venueTypesIntro = {
  eyebrow: "Venue types",
  title: "Find Your",
  accent: "Perfect Space",
  description:
    "Five distinct categories of Nepal's finest heritage venues — each with its own character and atmosphere.",
};

// `slug` is the ?category= filter value on /venues. `image`/`badge` are keys in assets/landing/images.js.
export const venueTypes = [
  { slug: "heritage-courtyards", name: "Heritage Courtyards", image: "heritageCourtyards", badge: "heritageBadge" },
  { slug: "garden-estates", name: "Garden Estates", image: "gardenEstates", badge: "gardenBadge" },
  { slug: "intimate-halls", name: "Intimate Halls", image: "intimateHalls", badge: "intimateBadge" },
  { slug: "mountain-retreats", name: "Mountain Retreats", image: "mountainRetreats", badge: "mountainBadge" },
  { slug: "rooftop-terraces", name: "Rooftop Terraces", image: "rooftopTerraces", badge: "rooftopBadge" },
];

export const storiesIntro = {
  eyebrow: "Venue Stories",
  title: "Built for the",
  accent: "Occasion",
};

// First entry renders as the large feature card, the rest as compact cards.
export const stories = [
  {
    eyebrow: "Heritage",
    title: "The Newari Courtyard",
    description:
      "Step inside a living Newari courtyard — carved wood brackets, terracotta friezes, and courtyards that have hosted celebrations for five centuries.",
    image: "storyNewariCourtyard",
    imageSizes: "(min-width: 1024px) 690px, 100vw",
  },
  {
    eyebrow: "Wedding",
    title: "Traditions, Unbroken",
    description:
      "From teej-red to gold-draped mandap, our heritage venues hold space for every ritual with the reverence it deserves.",
    image: "storyWedding",
    imageSizes: "(min-width: 1024px) 269px, (min-width: 640px) 50vw, 100vw",
  },
  {
    eyebrow: "Ambience",
    title: "Candlelight & Stone",
    description:
      "Long dining tables, amber candlelight, and centuries-old stone walls — the kind of evening that guests carry home in memory.",
    image: "storyAmbience",
    imageSizes: "(min-width: 1024px) 269px, (min-width: 640px) 50vw, 100vw",
  },
];

export const seasonsIntro = {
  eyebrow: "Season Experiences",
  title: "Plan Around",
  accent: "the Season",
};

export const seasons = [
  { name: "Summer", image: "seasonSummer" },
  { name: "Winter", image: "seasonWinter" },
  { name: "Spring", image: "seasonSpring" },
  { name: "Autumn", image: "seasonAutumn" },
];

export const featuredIntro = {
  eyebrow: "Our Selection",
  title: "Our Finest",
  accent: "Heritage Spaces",
  description:
    "Hand-curated from across Nepal's most storied valleys — each space carries centuries of cultural memory and is dressed for your occasion.",
};

// Fallback photos for admin-curated featured venues until each one has real venueImages.
export const featuredFallbackImages = ["featuredDarbarPavilion", "featuredKumariHall", "featuredHeritageLodge"];

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  title: "Loved by our clients.",
  accent: "Remembered forever.",
};

// Static for now — reviews from the API rarely have a photo (see docs/design-system.md §4).
export const testimonials = [
  {
    name: "Priya & Aditya Sharma",
    initial: "P",
    location: "Patan, Lalitpur",
    occasionVenue: "Wedding · Darbar Pavilion",
    quote:
      "Venure found us a courtyard that felt like it had been waiting for our wedding. Every guest said it was the most beautiful venue they had ever seen.",
    image: "testimonialPriyaAditya",
  },
  {
    name: "Anita Gurung",
    initial: "A",
    location: "Thamel, Kathmandu",
    occasionVenue: "Corporate Gala · Kumari Hall",
    quote:
      "The heritage halls gave our product launch an atmosphere no hotel ballroom could ever match. Clients are still talking about it months later.",
    image: "testimonialAnita",
  },
  {
    name: "Rohan & Sunita Thapa",
    initial: "R",
    location: "Bandipur",
    occasionVenue: "Private Ceremony · Heritage Lodge",
    quote:
      "We wanted something intimate and deeply Nepali. Venure delivered a hidden gem that made our day feel truly timeless.",
    image: "testimonialRohanSunita",
  },
];

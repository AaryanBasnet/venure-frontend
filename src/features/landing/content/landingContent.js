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

// `slug` is the future ?category= filter value on /venues. `image`/`badge` are keys in assets/landing/images.js.
export const venueTypes = [
  { slug: "heritage-courtyards", name: "Heritage Courtyards", image: "heritageCourtyards", badge: "heritageBadge" },
  { slug: "garden-estates", name: "Garden Estates", image: "gardenEstates", badge: "gardenBadge" },
  { slug: "intimate-halls", name: "Intimate Halls", image: "intimateHalls", badge: "intimateBadge" },
  { slug: "mountain-retreats", name: "Mountain Retreats", image: "mountainRetreats", badge: "mountainBadge" },
  { slug: "rooftop-terraces", name: "Rooftop Terraces", image: "rooftopTerraces", badge: "rooftopBadge" },
];

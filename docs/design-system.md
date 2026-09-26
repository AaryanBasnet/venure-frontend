# Venure Design System & Landing Page Structure

Source of truth: Figma file `iphJNIRUMruhQho2ZsdzBh` ("venue")
- Page `design` (0:1) → frame **landing page** `46:2` (1440 × 5952), frame **spaces** `151:5216` (draft copy of landing)
- Page `Components` (1:2) → component sets: venue types `55:26569`, season card `91:524`, testimonials `117:995`, featured venue cards `117:7364`

Desktop only in Figma (1440). Mobile/tablet behaviour is defined in this doc, not in Figma.

---

## 1. Design tokens

Tokens live in `src/styles/theme.css` as a Tailwind v4 `@theme` block. Components use token classes
(`bg-cream`, `text-gold-700`, `font-display`), never raw hex values.

### Color

| Token | Hex | Figma variable | Use |
|---|---|---|---|
| `ink` | `#1A1208` | Foundation/black/Normal | Primary text, dark buttons, footer bg |
| `stone` | `#B8B6B2` | Foundation/black/Light:active | Outline button borders |
| `gold` | `#B8963C` | Foundation/gold/Normal | Brand accent: buttons, icons, text on dark bg |
| `gold-600` | `#A68736` | Foundation/gold/Normal:hover | Hover state of gold |
| `gold-700` | `#937830` | Foundation/gold/Normal:active | Accent headings on light bg (see a11y) |
| `gold-800` | `#7D6424` | *(new, a11y)* | Small gold text on light bg |
| `gold-200` | `#E9DEC3` | Foundation/gold/Light:active | Soft gold text on dark imagery |
| `gold-100` | `#F4EFE2` | Foundation/gold/Light:hover | Avatar chips |
| `gold-50` | `#F8F5EC` | Foundation/gold/Light | Text on glass panels |
| `cream` | `#FBF6EE` | *(raw in Figma)* | Section bg (stories, featured, CTA), card backs |
| `sand` | `#F5EDE0` | *(raw in Figma)* | Section bg (venue types, seasons, testimonials), story cards |
| `line` | `#E2D5BF` | *(raw in Figma)* | Dividers on cream |
| `overlay` | `rgba(10,6,3,…)` | — | Image gradients (warm black, not pure black) |

### Accessibility adjustments (WCAG 2.2 AA)

Measured contrast of the Figma colors:

| Pairing | Ratio | Required | Status |
|---|---|---|---|
| `#937830` body/caption text on cream | 3.93 | 4.5 | ❌ → use `gold-800` (5.25) |
| `#937830` on sand | 3.64 | 4.5 | ❌ → use `gold-800` (4.86) |
| `#B8963C` italic accent heading (60px) on cream | 2.61 | 3.0 (large) | ❌ → use `gold-700` (3.93) |
| `#B8963C` testimonial quote (16px) on cream | 2.61 | 4.5 | ❌ → use `gold-800` |
| White 10px text on `#B8963C` button | 2.81 | 4.5 | ❌ → darker button bg or ink text |
| Ink on cream | 17.21 | 4.5 | ✅ |
| White on ink (footer) | 18.52 | 4.5 | ✅ |

Minimum type sizes: Figma uses 8px and 10px text (venue-type count, buttons, eyebrows). We render
these at **≥ 11px**, keeping the letter-spacing, so they stay legible.

### Typography

Fonts (Google Fonts, `display=swap`, preconnect): **Fraunces** (display, variable, axes `opsz`, `SOFT 0`, `WONK 1`)
and **DM Sans** (body, variable `opsz 14`). Replaces Playfair Display + Poppins.

| Token (class) | Font | Size / line-height | Tracking | Figma style |
|---|---|---|---|---|
| `text-display` | Fraunces Light | 60 / 64 | 0 | section H2 (not a style in Figma) |
| `text-h2` | Fraunces Light | 42 / 46 | 0 | Fra/heading-02 |
| `text-h3-italic` | Fraunces Light Italic | 27 / 28 | 0 | Fra/heading-04 |
| `text-tagline` | Fraunces Light Italic | 24 / 36 | 0 | Fra/heading-05 |
| `text-h4` | Fraunces Light | 21 / 24 | 0 | Fra/heading-07 |
| `text-h5` | Fraunces Regular | 20 / 24 | 0 | Fra/heading-06 |
| `text-body-lg` | DM Sans Light Italic | 16 / 26.6 | 0 | DM/body-01 |
| `text-body` | DM Sans Regular | 15 / 27 | 0 | DM/body-02 |
| `text-body-light` | DM Sans Light | 15 / 23 | 0 | DM/body-03 |
| `text-small` | DM Sans Light | 14 / 19 | 0 | DM/caption-01 |
| `text-caption` | DM Sans Light | 12 / 17 | 0 | DM/caption-03 |
| `text-label` | DM Sans Medium, uppercase | 12 / 16 | 0.145em | DM/label-01 (nav) |
| `text-eyebrow` | DM Sans Medium, uppercase | 10→11 / 14 | 0.27em | DM/caption-04 |
| `text-button` | DM Sans Medium, uppercase | 10→11 / 15 | 0.22em | DM/btn-03 |
| `text-button-lg` | DM Sans Regular | 15 / 22 | 0 | DM/btn-01 (pill links) |

Display sizes scale down with `clamp()` on small screens (60px → ~40px on mobile).

### Radius, spacing, layout

- Radius: `rounded-sm` 10 (season cards) · `rounded-md` 16 (venue types) · `rounded-lg` 24 (testimonials, glass panels) · `rounded-xl` 32 (story & featured cards) · `rounded-full` (pills, buttons, avatars)
- Container: `max-w-[1280px]`, horizontal padding 80px desktop → 40px tablet → 20px mobile
- Section vertical padding: 50px + 24px inner (Figma) → token `py-section`
- Borders are 0.8px in Figma (scaled design); render as 1px

### Motion

- Hover transitions 300–500ms ease-out; card flip 600ms
- Everything respects `prefers-reduced-motion` (flip becomes a crossfade, expansions become instant)

---

## 2. Component inventory

### UI primitives — `src/components/ui/`
| Component | Figma source | Notes |
|---|---|---|
| `Button` | gold pill "Explore Venues", "Book a Tour", "Apply as a Venue Partner" | variants `primary` (gold), `outline-light` (on dark), `outline-dark`; `as` Link or button |
| `ArrowPillLink` | "Read All Stories", "Explore Collection" | outline pill + round ink arrow badge |
| `TextLink` | "Explore All Venues →" | uppercase, underline, arrow |
| `Eyebrow` | small uppercase gold labels | |
| `SectionHeading` | two-line H2: plain line + italic gold line | props `eyebrow`, `title`, `accent`, `as`, `align` |
| `Container` / `Section` | 1280 container, section bg variants `cream` / `sand` / `ink` | |
| `GlassPanel` | blurred info panel on featured cards | `backdrop-blur`, translucent border |
| `Logo` | "ChatGPT Image…" raster in header/footer | needs an SVG export (see Figma notes) |

Icons: `lucide-react` (`ArrowRight`) replaces the Figma arrow SVGs. One icon library only.

### Layout — `src/layouts/`
- `SiteHeader`: transparent over hero, blurred (`backdrop-blur-16`) sticky bar on scroll; nav + "Book a Tour" CTA; mobile menu drawer
- `SiteFooter`: logo, tagline, newsletter form, 4 link columns, legal row

### Landing feature — `src/features/landing/`
```
features/landing/
  LandingPage.jsx                  // composes sections, sets <title>/meta
  sections/
    HeroSection.jsx                // 46:3
    VenueTypesSection.jsx          // 46:17  (CategorySection)
    VenueStoriesSection.jsx        // 46:76  "Built for the Occasion"
    SeasonsSection.jsx             // 46:119 "Plan Around the Season"
    FeaturedVenuesSection.jsx      // 46:167 "Our Finest Heritage Spaces"
    TestimonialsSection.jsx        // 46:214
    PartnerCtaSection.jsx          // 46:298 "List Your Venue"
  components/
    VenueTypeCard.jsx              // expands on hover/focus (variants Variant2-6)
    StoryCard.jsx                  // variants: feature (large image) / compact (image + text)
    SeasonCard.jsx
    FeaturedVenueCard.jsx          // hover/focus reveals price + Enquire (variant "variat1"/"card")
    TestimonialCard.jsx            // flip card, front photo / back quote (flip/unflip)
  content/landingContent.js        // static copy: hero, stories, seasons, venue-type definitions
  hooks/
    useFeaturedVenues.js           // TanStack Query → API
    useFeaturedTestimonials.js     // TanStack Query → API
```
Static images: `src/assets/landing/*.webp` (exported from Figma, resized to 2× display size, WebP).

---

## 3. Interaction specs (from Components page variants)

- **VenueTypeCard**: 5 equal cards; the hovered/focused card grows (~2×) and its title goes onto one line. Keyboard focus triggers the same. On touch/mobile it becomes a horizontal scroll-snap row with no expansion.
- **FeaturedVenueCard**: default shows name + location · guests; hover/focus expands the glass panel with "From NPR x" (formatted `en-IN`, e.g. 3,20,000) and an **Enquire** button. On touch devices the price and button are always visible.
- **TestimonialCard**: `<button aria-pressed>` flips between the photo front and the quote back. Keyboard: Enter/Space. Reduced motion: crossfade.
- **Header**: transparent over the hero, solid blurred background after scrolling past it.

---

## 4. Data sources

| Section | Source | Status |
|---|---|---|
| Hero, Stories, Seasons, Partner CTA | static content | ready |
| Venue types (names, images) | static content | ready |
| Venue type **counts** ("3 venues") | API | ❌ backend has no venue `category` field |
| Featured venues (name, city, capacity, price, image) | API | ⚠️ no `isFeatured` flag; could use top-booked/top-rated |
| Testimonials | `GET /api/featured` (featured reviews) | ⚠️ reviews have no photo or location; design needs both |
| Newsletter | API | ❌ no endpoint |
| Nav/footer links (Experiences, Planning, Stories, Press, …) | routes | ❌ most pages don't exist |

---

## 5. Responsive plan (not in Figma)

- ≥1280: as designed
- 768–1279: container padding 40; venue-types row scrolls horizontally; stories stack the right column under the feature card; featured venues 2+1; testimonials 2 columns
- <768: single column; display type ~40px; header collapses to a menu button; testimonial cards full width; footer columns become an accordion or 2-column grid

---

## 6. Figma housekeeping (worth fixing in the file)

- Layer names: "ChatGPT Image Sep 17…", "hero ection", "venue tyypes", "testiomonials", many "Container"/"Home" layers
- Variant props are all `Property 1=Default/Variant2…`; rename to e.g. `state=default|hover` or `side=front|back`
- Raw colors not in variables: `#FBF6EE`, `#F5EDE0`, `#E2D5BF`, `#EBEBEB`; the 60px section heading isn't a text style
- Fractional sizes (15.2, 20.8, 10.88px, 0.8px borders) suggest the frame was scaled; the code rounds them
- Logo is a raster PNG; export an SVG
- Footer and CTA use absolute positioning instead of Auto Layout
- No mobile or tablet frames

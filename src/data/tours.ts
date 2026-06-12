export type TourCategory = "Adventure" | "Beach" | "City" | "Desert" | "Tropical" | "Mountain" | "Cruise" | "Cultural";

export type Tour = {
  slug: string;
  title: string;
  location: string;
  country: string; // for "destination" filter — short country/city tag
  category: TourCategory;
  rating: number;
  reviews: number;
  durationDays: number;
  durationLabel: string;
  price: number;
  oldPrice?: number;
  groupSize: string;
  language: string;
  tourType: string;
  badge: { label: string; tone: "popular" | "discount" };
  image: string;
  gallery: string[];
  overview: string;
  highlights: string;
  included: string[];
  excluded: string[];
  plan: { day: string; title: string; body: string }[];
};

const OVERVIEW =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const HIGHLIGHTS =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const PLAN_BODY =
  "Vivamus pretium neque ut dapibus rutrum. Phasellus ut lacus et neque commodo scelerisque. Proin molestie enim mattis arcu vestibulum, vitae aliquet velit tristique. Nam pulvinar, felis et molestie tincidunt, sem massa malesuada mi.";

const INCLUDED = ["Professional tour guide", "Hotel pickup and drop-off", "Welcome drinks and snacks", "All entrance fees"];
const EXCLUDED = ["International flights", "Personal expenses", "Travel insurance"];

const GALLERY = [
  "/images/tours/gallery-1.jpg",
  "/images/tours/gallery-2.jpg",
  "/images/tours/gallery-3.png",
  "/images/tours/gallery-4.jpg",
];

function plan(days: number) {
  const arr: Tour["plan"] = [];
  for (let i = 1; i <= Math.min(days, 5); i++) {
    arr.push({ day: `Day ${String(i).padStart(2, "0")}`, title: i === 1 ? "Tour Start From the Base" : i === days ? "Departure & Farewell" : `Explore & Activities — Day ${i}`, body: PLAN_BODY });
  }
  return arr;
}

export const TOURS: Tour[] = [
  {
    slug: "california-sunset-twilight-boat-cruise",
    title: "California Sunset/Twilight Boat Cruise",
    location: "Jamaica, Kenya",
    country: "Kenya",
    category: "Cruise",
    rating: 4.8,
    reviews: 496,
    durationDays: 7,
    durationLabel: "7 Days 6 Nights",
    price: 565,
    groupSize: "10-15 People",
    language: "English, Spanish",
    tourType: "Specific Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/packages/pkg-1.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(7),
  },
  {
    slug: "santorini-island-hopping-adventure",
    title: "Santorini Island Hopping Adventure",
    location: "Santorini, Greece",
    country: "Greece",
    category: "Beach",
    rating: 4.9,
    reviews: 312,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 540,
    oldPrice: 720,
    groupSize: "8-12 People",
    language: "English, Greek",
    tourType: "Group Tour",
    badge: { label: "25% OFF", tone: "discount" },
    image: "/images/packages/pkg-2.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(5),
  },
  {
    slug: "swiss-alps-scenic-mountain-retreat",
    title: "Swiss Alps Scenic Mountain Retreat",
    location: "Zermatt, Switzerland",
    country: "Switzerland",
    category: "Mountain",
    rating: 4.7,
    reviews: 210,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 890,
    groupSize: "6-10 People",
    language: "English, German",
    tourType: "Specific Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/packages/pkg-3.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(6),
  },
  {
    slug: "bali-tropical-beach-temple-getaway",
    title: "Bali Tropical Beach & Temple Getaway",
    location: "Bali, Indonesia",
    country: "Indonesia",
    category: "Tropical",
    rating: 4.6,
    reviews: 488,
    durationDays: 8,
    durationLabel: "8 Days 7 Nights",
    price: 640,
    groupSize: "10-15 People",
    language: "English, Indonesian",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/packages/pkg-4.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(8),
  },
  {
    slug: "norway-fjords-northern-lights-tour",
    title: "Norway Fjords & Northern Lights Tour",
    location: "Tromso, Norway",
    country: "Norway",
    category: "Adventure",
    rating: 4.9,
    reviews: 175,
    durationDays: 4,
    durationLabel: "4 Days 3 Nights",
    price: 833,
    oldPrice: 980,
    groupSize: "8-12 People",
    language: "English, Norwegian",
    tourType: "Specific Tour",
    badge: { label: "15% OFF", tone: "discount" },
    image: "/images/packages/pkg-5.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(4),
  },
  {
    slug: "machu-picchu-inca-trail-expedition",
    title: "Machu Picchu Inca Trail Expedition",
    location: "Cusco, Peru",
    country: "Peru",
    category: "Adventure",
    rating: 4.8,
    reviews: 264,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 710,
    groupSize: "10-12 People",
    language: "English, Spanish",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/packages/pkg-6.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(5),
  },
  {
    slug: "great-wall-of-china-explorer",
    title: "Great Wall of China Explorer",
    location: "Beijing, China",
    country: "China",
    category: "Cultural",
    rating: 4.7,
    reviews: 388,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 695,
    groupSize: "10-15 People",
    language: "English, Mandarin",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/destinations/great-wall.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(6),
  },
  {
    slug: "eiffel-tower-paris-romantic-escape",
    title: "Eiffel Tower Paris Romantic Escape",
    location: "Paris, France",
    country: "France",
    category: "City",
    rating: 4.8,
    reviews: 532,
    durationDays: 4,
    durationLabel: "4 Days 3 Nights",
    price: 750,
    groupSize: "2-6 People",
    language: "English, French",
    tourType: "Private Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/destinations/eiffel-tower.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(4),
  },
  {
    slug: "taj-mahal-cultural-journey",
    title: "Taj Mahal Cultural Journey",
    location: "Agra, India",
    country: "India",
    category: "Cultural",
    rating: 4.6,
    reviews: 421,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 480,
    groupSize: "10-15 People",
    language: "English, Hindi",
    tourType: "Group Tour",
    badge: { label: "20% OFF", tone: "discount" },
    image: "/images/destinations/taj-mahal.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(5),
  },
  {
    slug: "grand-canyon-desert-adventure",
    title: "Grand Canyon Desert Adventure",
    location: "Arizona, USA",
    country: "USA",
    category: "Desert",
    rating: 4.7,
    reviews: 298,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 620,
    groupSize: "8-12 People",
    language: "English",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/destinations/grand-canyon.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(5),
  },
  {
    slug: "opera-house-sydney-city-tour",
    title: "Opera House Sydney City Tour",
    location: "Sydney, Australia",
    country: "Australia",
    category: "City",
    rating: 4.5,
    reviews: 198,
    durationDays: 4,
    durationLabel: "4 Days 3 Nights",
    price: 720,
    groupSize: "10-15 People",
    language: "English",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/destinations/opera-house.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(4),
  },
  {
    slug: "statue-of-liberty-new-york-city-break",
    title: "Statue of Liberty New York City Break",
    location: "New York, USA",
    country: "USA",
    category: "City",
    rating: 4.6,
    reviews: 354,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 820,
    groupSize: "6-12 People",
    language: "English",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/destinations/statue-of-liberty.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(5),
  },
  {
    slug: "colosseum-rome-historical-tour",
    title: "Colosseum Rome Historical Tour",
    location: "Rome, Italy",
    country: "Italy",
    category: "Cultural",
    rating: 4.7,
    reviews: 267,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 690,
    groupSize: "8-12 People",
    language: "English, Italian",
    tourType: "Group Tour",
    badge: { label: "10% OFF", tone: "discount" },
    image: "/images/destinations/colosseum.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(6),
  },
  {
    slug: "kyoto-cherry-blossom-cultural-trip",
    title: "Kyoto Cherry Blossom Cultural Trip",
    location: "Kyoto, Japan",
    country: "Japan",
    category: "Cultural",
    rating: 4.9,
    reviews: 412,
    durationDays: 7,
    durationLabel: "7 Days 6 Nights",
    price: 1180,
    groupSize: "6-10 People",
    language: "English, Japanese",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/packages/pkg-2.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(7),
  },
  {
    slug: "iceland-ring-road-adventure",
    title: "Iceland Ring Road Adventure",
    location: "Reykjavik, Iceland",
    country: "Iceland",
    category: "Adventure",
    rating: 4.8,
    reviews: 188,
    durationDays: 8,
    durationLabel: "8 Days 7 Nights",
    price: 1450,
    oldPrice: 1680,
    groupSize: "6-10 People",
    language: "English, Icelandic",
    tourType: "Self-Drive Tour",
    badge: { label: "15% OFF", tone: "discount" },
    image: "/images/packages/pkg-5.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(8),
  },
  {
    slug: "palawan-island-hopping-paradise",
    title: "Palawan Island Hopping Paradise",
    location: "Palawan, Philippines",
    country: "Philippines",
    category: "Tropical",
    rating: 4.7,
    reviews: 333,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 540,
    groupSize: "8-14 People",
    language: "English, Filipino",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/packages/pkg-4.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(6),
  },
  {
    slug: "marrakech-sahara-desert-tour",
    title: "Marrakech Sahara Desert Tour",
    location: "Marrakech, Morocco",
    country: "Morocco",
    category: "Desert",
    rating: 4.6,
    reviews: 247,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 460,
    groupSize: "10-16 People",
    language: "English, Arabic, French",
    tourType: "Group Tour",
    badge: { label: "Popular", tone: "popular" },
    image: "/images/destinations/grand-canyon.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(5),
  },
  {
    slug: "amsterdam-canal-city-getaway",
    title: "Amsterdam Canal & City Getaway",
    location: "Amsterdam, Netherlands",
    country: "Netherlands",
    category: "City",
    rating: 4.5,
    reviews: 289,
    durationDays: 4,
    durationLabel: "4 Days 3 Nights",
    price: 580,
    groupSize: "6-12 People",
    language: "English, Dutch",
    tourType: "Group Tour",
    badge: { label: "10% OFF", tone: "discount" },
    image: "/images/destinations/eiffel-tower.png",
    gallery: GALLERY,
    overview: OVERVIEW,
    highlights: HIGHLIGHTS,
    included: INCLUDED,
    excluded: EXCLUDED,
    plan: plan(4),
  },
];

export const TOUR_CATEGORIES: TourCategory[] = [
  "Adventure",
  "Beach",
  "City",
  "Desert",
  "Tropical",
  "Mountain",
];

export const POPULAR_DESTINATIONS = [
  "Machu Picchu",
  "Great Wall",
  "Swiss Alps",
  "Amsterdam",
  "Palawan",
  "Tanzania",
  "Chiang Mai",
  "London, England",
];

export function getTour(slug: string): Tour | undefined {
  return TOURS.find((t) => t.slug === slug);
}

export type TourFilters = {
  q?: string;
  category?: string;
  destination?: string;
  minRating?: number;
  maxPrice?: number;
  page?: number;
};

const PAGE_SIZE = 6;

export function filterTours(filters: TourFilters) {
  const q = (filters.q || "").trim().toLowerCase();
  let list = TOURS.slice();

  if (q) {
    list = list.filter((t) =>
      [t.title, t.location, t.country, t.category].some((v) => v.toLowerCase().includes(q)),
    );
  }
  if (filters.category) {
    list = list.filter((t) => t.category.toLowerCase() === filters.category!.toLowerCase());
  }
  if (filters.destination) {
    const d = filters.destination.toLowerCase();
    list = list.filter((t) => t.location.toLowerCase().includes(d) || t.country.toLowerCase().includes(d));
  }
  if (filters.minRating !== undefined) {
    list = list.filter((t) => t.rating >= filters.minRating!);
  }
  if (filters.maxPrice !== undefined) {
    list = list.filter((t) => t.price <= filters.maxPrice!);
  }

  const page = Math.max(1, filters.page || 1);
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = list.slice(start, start + PAGE_SIZE);

  return { items, total: list.length, page, totalPages, pageSize: PAGE_SIZE };
}

export const CATEGORY_COUNTS = TOUR_CATEGORIES.map((c) => ({
  label: c,
  count: TOURS.filter((t) => t.category === c).length,
}));

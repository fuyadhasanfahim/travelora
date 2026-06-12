export type BlogCategory =
  | "Adventure"
  | "Beach"
  | "Tropical"
  | "Budget Friendly Tour"
  | "City Tour"
  | "Mountain"
  | "Tips and Tricks";

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string; // human readable
  isoDate: string; // for sorting
  readMinutes: number;
  cover: string;
  thumb: string; // small for sidebar
  body: { heading?: string; text: string }[];
  quote?: string;
  relatedTourSlug?: string;
};

const RECENT_THUMBS = [
  "/images/blog/recent-1.png",
  "/images/blog/recent-2.png",
  "/images/blog/recent-3.png",
  "/images/blog/recent-4.png",
  "/images/blog/recent-5.png",
];

const COVER = "/images/blog/post-main.jpg";

const QUOTE =
  "Travel isn't about the destination, it's about the stories you collect along the way and the version of yourself you bring back home.";

function body(heading: string, ...paragraphs: string[]): { heading?: string; text: string }[] {
  return [
    { heading, text: paragraphs[0] },
    ...paragraphs.slice(1).map((p) => ({ text: p })),
  ];
}

const TIP_P1 =
  "Planning a trip can feel overwhelming, but a calm checklist makes everything easier. Start with the non-negotiables — passport validity, visa requirements, and travel insurance — and work outward from there. The most common mistakes happen at the edges: a forgotten adapter, a missed booking confirmation, an early-morning taxi that never shows.";
const TIP_P2 =
  "Pack for the trip you actually have, not the one you imagine. Most travelers carry 30% more than they need. Lay out your clothes, then remove a third. Bring layers instead of bulk, and a single pair of versatile shoes will usually outperform three specialized ones.";
const TIP_P3 =
  "Leave space in your itinerary. The best memories rarely come from the things you planned — they come from the wrong turns, the café you stumbled into, the conversation with a stranger that lasted three hours. Two or three planned highlights per day is plenty.";

const DUBAI_P1 =
  "Dubai rewards travelers who know when to slow down. The city moves fast, but the desert outside it teaches you the opposite lesson. Plan one indulgent day in Downtown for the Burj Khalifa, the Fountain, and the souks — then disappear into the dunes for sunset, camel rides, and a quiet sky full of stars.";
const DUBAI_P2 =
  "If it's your first trip, stay near the Marina or Downtown. The metro is clean, cheap, and connects almost everything worth seeing. Save taxis for late nights and rainy afternoons (yes, it rains — briefly, in January). Friday mornings are quiet; Friday afternoons are busy. Plan accordingly.";

const BALI_P1 =
  "Bali isn't one destination, it's at least four. Canggu is for surfers and digital nomads. Ubud is for art, yoga, and rice terraces. Uluwatu is for cliffside sunsets. Nusa Penida is for the postcards. You can mix two on a single trip — three only if you have ten days and rent a scooter.";
const BALI_P2 =
  "The hidden gems aren't really hidden, but they're quieter than the famous ones. Sidemen valley feels like Ubud did fifteen years ago. Amed has black-sand beaches and almost no tourists. Munduk has waterfalls you can swim in alone before 9am. None of them are on the standard itinerary — and that's exactly the point.";

const MOUNTAIN_P1 =
  "There's a particular kind of silence at altitude that you can't find anywhere else. Whether you're trekking the Inca Trail, the Swiss Alps, or the Annapurna Circuit, the mountains demand respect — and they reward it generously. The first lesson every guide will tell you: go slow.";
const MOUNTAIN_P2 =
  "Acclimatize properly. Most altitude sickness isn't dangerous if you treat it early, but ignoring it is one of the most common mistakes new trekkers make. Plan rest days. Drink twice the water you think you need. And if your guide says turn back, turn back — the mountain will still be there next year.";

const LUXURY_P1 =
  "Luxury travel used to mean five-figure suites and private jets. Today it means knowing where to spend and where to save. The right boutique hotel with a great breakfast often beats a chain resort at half the price. A private guide for one perfect day costs less than three mediocre tours.";
const LUXURY_P2 =
  "Shoulder seasons are the unlock. The same Santorini suite that costs $900 in July is $280 in late September — and the weather is identical. Same with Maldives in May, Bali in November, Japan in early December. The crowd thins, the prices drop, the experience stays.";

const BEACH_P1 =
  "Not all beaches are equal, and the prettiest ones in photos aren't always the best to actually visit. The world's best beaches in 2026 are still the ones with a balance: warm water, soft sand, shade somewhere nearby, and a town small enough to walk in twenty minutes.";
const BEACH_P2 =
  "Our shortlist: Palawan (Philippines) for the lagoons, Zanzibar for the spice and the dhows, the Algarve for sea caves you can kayak into, and the lesser-known coast of Albania — still cheap, still warm, still mostly unknown to anyone outside Europe.";

const CITY_P1 =
  "The best way to understand a city is to pick one neighborhood and stay put for three days. Walk it in the morning before the shops open. Sit in the same café twice. Get lost on purpose at least once. By the third day, you'll start to recognize faces — and the city will start to feel like yours.";
const CITY_P2 =
  "Skip the lines for the obvious sights. Most cities have a 'second' museum, viewpoint, or square that's almost as good and ten times less crowded. Locals usually like it more anyway. Ask your hotel reception, your barista, your taxi driver — not TripAdvisor.";

const BUDGET_P1 =
  "Budget travel isn't about deprivation, it's about leverage. The biggest costs on any trip are flights and accommodation. Get those right and the rest takes care of itself. Use error fares, book Tuesdays, and consider flying into a nearby city and taking the train.";
const BUDGET_P2 =
  "Eat like a local. Street food in most of the world is safer than you've been told, fresher than the hotel restaurant, and a fraction of the price. The rule: go where the line is long and locals are eating. Avoid empty restaurants and 'tourist menus' in five languages.";

export const BLOGS: Blog[] = [
  {
    slug: "ultimate-travel-planning-guide",
    title: "Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey",
    excerpt:
      "From visas to packing lists, here's the simple, calm checklist we use to plan every Travelora trip — so nothing falls through the cracks.",
    category: "Tips and Tricks",
    author: "Tamara Johanson",
    date: "8 December, 2026",
    isoDate: "2026-12-08",
    readMinutes: 6,
    cover: COVER,
    thumb: RECENT_THUMBS[4],
    body: body("Step 01: How prepare", TIP_P1, TIP_P2, TIP_P3),
    quote: QUOTE,
    relatedTourSlug: "california-sunset-twilight-boat-cruise",
  },
  {
    slug: "ultimate-dubai-travel-guide",
    title: "Ultimate Dubai Travel Guide for First-Time Travelers",
    excerpt:
      "Burj Khalifa at sunset, dune bashing under the stars, and the souks at dawn — what to do, what to skip, and how to plan your first Dubai trip.",
    category: "City Tour",
    author: "Tamara Johanson",
    date: "12 December, 2026",
    isoDate: "2026-12-12",
    readMinutes: 7,
    cover: COVER,
    thumb: RECENT_THUMBS[0],
    body: body("Step 01: How prepare", DUBAI_P1, DUBAI_P2),
    quote: QUOTE,
    relatedTourSlug: "california-sunset-twilight-boat-cruise",
  },
  {
    slug: "10-hidden-gems-in-bali",
    title: "10 Hidden Gems in Bali You Must Visit in 2026",
    excerpt:
      "Beyond Ubud and Seminyak, Bali still has quiet corners. Here are ten places to find them — black-sand beaches, jungle waterfalls, and empty rice terraces.",
    category: "Tropical",
    author: "Marco Rivera",
    date: "20 November, 2026",
    isoDate: "2026-11-20",
    readMinutes: 8,
    cover: COVER,
    thumb: RECENT_THUMBS[2],
    body: body("The other Bali", BALI_P1, BALI_P2),
    quote: QUOTE,
    relatedTourSlug: "bali-tropical-beach-temple-getaway",
  },
  {
    slug: "adventure-awaits-best-mountain-trips",
    title: "Adventure Awaits: Best Mountain Trips for Thrill Seekers",
    excerpt:
      "From the Inca Trail to the Swiss Alps, our pick of the world's best multi-day mountain treks — and how to prepare for the altitude.",
    category: "Mountain",
    author: "Liam Foster",
    date: "5 November, 2026",
    isoDate: "2026-11-05",
    readMinutes: 9,
    cover: COVER,
    thumb: RECENT_THUMBS[1],
    body: body("Go slow, go high", MOUNTAIN_P1, MOUNTAIN_P2),
    quote: QUOTE,
    relatedTourSlug: "swiss-alps-scenic-mountain-retreat",
  },
  {
    slug: "experience-luxury-travel",
    title: "Experience Luxury Travel Without Breaking the Bank",
    excerpt:
      "Luxury isn't price, it's leverage. Where to spend, where to save, and how to travel like first class on a premium-economy budget.",
    category: "Tips and Tricks",
    author: "Aisha Khan",
    date: "28 October, 2026",
    isoDate: "2026-10-28",
    readMinutes: 6,
    cover: COVER,
    thumb: RECENT_THUMBS[3],
    body: body("Spend where it matters", LUXURY_P1, LUXURY_P2),
    quote: QUOTE,
    relatedTourSlug: "santorini-island-hopping-adventure",
  },
  {
    slug: "best-beaches-for-2026",
    title: "The Best Beaches for 2026 — From Palawan to the Algarve",
    excerpt:
      "Our shortlist of the world's best beaches for next year, with a balance of warmth, water clarity, walkable towns, and shade in the right places.",
    category: "Beach",
    author: "Sofia Mendes",
    date: "15 October, 2026",
    isoDate: "2026-10-15",
    readMinutes: 7,
    cover: COVER,
    thumb: RECENT_THUMBS[0],
    body: body("The 2026 shortlist", BEACH_P1, BEACH_P2),
    quote: QUOTE,
    relatedTourSlug: "bali-tropical-beach-temple-getaway",
  },
  {
    slug: "how-to-experience-a-city-in-three-days",
    title: "How to Actually Experience a City in Three Days",
    excerpt:
      "The cure for the rushed city break: pick one neighborhood, get lost on purpose, and go where the line is long and the locals are eating.",
    category: "City Tour",
    author: "Tamara Johanson",
    date: "2 October, 2026",
    isoDate: "2026-10-02",
    readMinutes: 5,
    cover: COVER,
    thumb: RECENT_THUMBS[2],
    body: body("Stay in one place", CITY_P1, CITY_P2),
    quote: QUOTE,
    relatedTourSlug: "eiffel-tower-paris-romantic-escape",
  },
  {
    slug: "smart-budget-travel-2026",
    title: "Smart Budget Travel: See More, Spend Less in 2026",
    excerpt:
      "Budget travel isn't deprivation — it's leverage. Where to cut, where to splurge, and how to eat like a local without getting sick.",
    category: "Budget Friendly Tour",
    author: "Marco Rivera",
    date: "20 September, 2026",
    isoDate: "2026-09-20",
    readMinutes: 6,
    cover: COVER,
    thumb: RECENT_THUMBS[4],
    body: body("Get the big costs right", BUDGET_P1, BUDGET_P2),
    quote: QUOTE,
    relatedTourSlug: "machu-picchu-inca-trail-expedition",
  },
  {
    slug: "northern-lights-norway-2026",
    title: "Chasing the Northern Lights: A Practical Guide to Tromsø",
    excerpt:
      "When to go, where to stay, and how to actually see the aurora — including the weather rules nobody tells you about until you're already there.",
    category: "Adventure",
    author: "Liam Foster",
    date: "8 September, 2026",
    isoDate: "2026-09-08",
    readMinutes: 8,
    cover: COVER,
    thumb: RECENT_THUMBS[1],
    body: body("Chasing clear skies", MOUNTAIN_P1, TIP_P3),
    quote: QUOTE,
    relatedTourSlug: "norway-fjords-northern-lights-tour",
  },
  {
    slug: "machu-picchu-inca-trail-tips",
    title: "Hiking the Inca Trail: What I Wish I Knew Before I Left",
    excerpt:
      "Permits, porters, weather, and the one piece of gear that made every other piece of gear matter less. A first-timer's honest debrief.",
    category: "Adventure",
    author: "Aisha Khan",
    date: "1 September, 2026",
    isoDate: "2026-09-01",
    readMinutes: 9,
    cover: COVER,
    thumb: RECENT_THUMBS[3],
    body: body("Permits and pacing", MOUNTAIN_P2, TIP_P1),
    quote: QUOTE,
    relatedTourSlug: "machu-picchu-inca-trail-expedition",
  },
  {
    slug: "santorini-shoulder-season-guide",
    title: "Santorini in the Shoulder Season: Same Sunsets, Half the Crowd",
    excerpt:
      "September and early October on Santorini are the secret. Warm sea, quiet caldera, and the same impossible sunsets — without the August queues.",
    category: "Beach",
    author: "Sofia Mendes",
    date: "22 August, 2026",
    isoDate: "2026-08-22",
    readMinutes: 6,
    cover: COVER,
    thumb: RECENT_THUMBS[0],
    body: body("Time it right", LUXURY_P2, BEACH_P1),
    quote: QUOTE,
    relatedTourSlug: "santorini-island-hopping-adventure",
  },
  {
    slug: "japan-first-trip-cherry-blossom",
    title: "Japan on a First Trip: A Cherry-Blossom Plan That Actually Works",
    excerpt:
      "Tokyo to Kyoto in seven days, with one shinkansen, two ryokans, and the small rules that make Japan feel easy instead of overwhelming.",
    category: "City Tour",
    author: "Tamara Johanson",
    date: "10 August, 2026",
    isoDate: "2026-08-10",
    readMinutes: 7,
    cover: COVER,
    thumb: RECENT_THUMBS[2],
    body: body("Two cities, one week", CITY_P1, TIP_P2),
    quote: QUOTE,
    relatedTourSlug: "eiffel-tower-paris-romantic-escape",
  },
];

export const BLOG_CATEGORIES: { label: BlogCategory; count?: number }[] = (
  [
    "Adventure",
    "Beach",
    "Tropical",
    "Budget Friendly Tour",
    "City Tour",
    "Mountain",
    "Tips and Tricks",
  ] as BlogCategory[]
).map((c) => ({ label: c, count: BLOGS.filter((b) => b.category === c).length }));

export function getBlog(slug: string): Blog | undefined {
  return BLOGS.find((b) => b.slug === slug);
}

export function getAdjacentBlogs(slug: string) {
  const sorted = [...BLOGS].sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));
  const i = sorted.findIndex((b) => b.slug === slug);
  return {
    prev: i > 0 ? sorted[i - 1] : sorted[sorted.length - 1],
    next: i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : sorted[0],
  };
}

export type BlogFilters = { q?: string; category?: string; page?: number };

const BLOG_PAGE_SIZE = 6;

export function filterBlogs(filters: BlogFilters) {
  const q = (filters.q || "").trim().toLowerCase();
  let list = [...BLOGS].sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));

  if (q) {
    list = list.filter((b) =>
      [b.title, b.excerpt, b.category, b.author].some((v) => v.toLowerCase().includes(q)),
    );
  }
  if (filters.category && filters.category !== "all") {
    list = list.filter((b) => b.category.toLowerCase() === filters.category!.toLowerCase());
  }

  const page = Math.max(1, filters.page || 1);
  const totalPages = Math.max(1, Math.ceil(list.length / BLOG_PAGE_SIZE));
  const start = (page - 1) * BLOG_PAGE_SIZE;
  const items = list.slice(start, start + BLOG_PAGE_SIZE);

  return { items, total: list.length, page, totalPages, pageSize: BLOG_PAGE_SIZE };
}

export function trendingBlogs(excludeSlug?: string, limit = 5): Blog[] {
  return [...BLOGS]
    .filter((b) => b.slug !== excludeSlug)
    .sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1))
    .slice(0, limit);
}

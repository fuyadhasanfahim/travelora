/**
 * Seed script — realistic travel content.
 *
 * Idempotent: uses upsert by `slug`/`email`/etc., so it's safe to re-run.
 *
 * Run:
 *   pnpm db:seed
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

import { PrismaClient, BadgeTone, TourCategory } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

// ─── Helpers ────────────────────────────────────────────────────────────

const COMMON_GALLERY = [
  "/images/tours/gallery-1.jpg",
  "/images/tours/gallery-2.jpg",
  "/images/tours/gallery-3.png",
  "/images/tours/gallery-4.jpg",
];

const STANDARD_INCLUDED = [
  "Professional English-speaking tour guide",
  "Hotel pickup and drop-off",
  "Welcome drinks and local snacks",
  "All entrance fees and permits",
  "Comfortable transportation",
  "Bottled water throughout the tour",
];

const STANDARD_EXCLUDED = [
  "International and domestic flights",
  "Personal expenses and souvenirs",
  "Travel insurance",
  "Tips and gratuities (optional)",
  "Meals not mentioned in itinerary",
];

function buildPlan(days: number, theme: string) {
  const plans: { day: string; title: string; body: string }[] = [];
  const last = days;
  const middle = Math.max(1, days - 2);
  for (let i = 1; i <= Math.min(days, 7); i++) {
    let title: string;
    let body: string;
    if (i === 1) {
      title = "Arrival & welcome";
      body = `Land at your destination, meet your guide and transfer to the hotel. After a short rest you'll join a welcome briefing and a relaxed walking introduction to ${theme}, finishing with a local dinner.`;
    } else if (i === last) {
      title = "Departure & farewell";
      body = "Enjoy a final breakfast, free time for last-minute shopping, then a comfortable transfer to the airport with a farewell gift from your guide.";
    } else if (i === 2) {
      title = `${theme} — the highlights`;
      body = `A full day exploring the most iconic landmarks of ${theme}. Expect scenic viewpoints, photo stops, and an unhurried lunch at a hand-picked local spot away from the crowds.`;
    } else if (i === middle) {
      title = "Hidden gems & local culture";
      body = "Step off the main trail to meet artisans, taste regional specialities, and visit neighbourhoods most travellers never see. The afternoon is yours to wander.";
    } else {
      title = `Day ${i} — adventure & exploration`;
      body = `Today's focus is active discovery — light hiking, cultural workshops, or a boat ride depending on the season. Your guide tailors the day to the group's energy.`;
    }
    plans.push({ day: `Day ${String(i).padStart(2, "0")}`, title, body });
  }
  return plans;
}

// ─── Tours (25 realistic entries) ───────────────────────────────────────

type TourSeed = {
  slug: string;
  title: string;
  location: string;
  country: string;
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
  badgeLabel: string;
  badgeTone: BadgeTone;
  image: string;
  overview: string;
  highlights: string;
  featured?: boolean;
};

const tourSeeds: TourSeed[] = [
  {
    slug: "santorini-island-hopping-adventure",
    title: "Santorini Island Hopping Adventure",
    location: "Santorini, Greece",
    country: "Greece",
    category: TourCategory.Beach,
    rating: 4.9,
    reviews: 312,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 540,
    oldPrice: 720,
    groupSize: "8-12 People",
    language: "English, Greek",
    tourType: "Group Tour",
    badgeLabel: "25% OFF",
    badgeTone: BadgeTone.discount,
    image: "/images/packages/pkg-2.png",
    overview:
      "Sail between the volcanic islands of the Cyclades on a five-day escape built around Santorini's whitewashed villages, secret swim spots and unforgettable caldera sunsets. We blend small-boat cruising with relaxed time on land so you taste real Greek life — not just postcard views.",
    highlights:
      "Oia sunset from a quiet rooftop, swimming at the Red and White beaches, a private wine tasting in Megalochori, and a half-day catamaran trip to the hot springs of Palea Kameni.",
    featured: true,
  },
  {
    slug: "swiss-alps-jungfrau-region-explorer",
    title: "Swiss Alps Jungfrau Region Explorer",
    location: "Interlaken, Switzerland",
    country: "Switzerland",
    category: TourCategory.Mountain,
    rating: 4.8,
    reviews: 248,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 1290,
    groupSize: "6-10 People",
    language: "English, German",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-3.png",
    overview:
      "Base yourself in Interlaken and ride iconic cogwheel trains up to Jungfraujoch — the Top of Europe. Between alpine summits you'll cruise the turquoise lakes of Thun and Brienz, hike to Bachalpsee, and unwind in a traditional Swiss chalet.",
    highlights:
      "Jungfraujoch ice palace and observation deck, the Grindelwald-First cliff walk, paragliding optional, and a private cheese-and-chocolate tasting in Lauterbrunnen valley.",
    featured: true,
  },
  {
    slug: "bali-tropical-paradise-retreat",
    title: "Bali Tropical Paradise Retreat",
    location: "Ubud & Seminyak, Indonesia",
    country: "Indonesia",
    category: TourCategory.Tropical,
    rating: 4.7,
    reviews: 421,
    durationDays: 7,
    durationLabel: "7 Days 6 Nights",
    price: 689,
    oldPrice: 820,
    groupSize: "Up to 14 People",
    language: "English, Bahasa",
    tourType: "Group Tour",
    badgeLabel: "16% OFF",
    badgeTone: BadgeTone.discount,
    image: "/images/packages/pkg-4.png",
    overview:
      "Find your rhythm in Bali — sunrise yoga in Ubud's jungle, working alongside farmers in the Tegallalang rice terraces, and finishing each day with golden-hour cocktails on Seminyak's beaches. This retreat balances reflection, culture and indulgence.",
    highlights:
      "Mount Batur sunrise hike, Tirta Empul water-blessing ceremony, a Balinese cooking class with a local family, and a private boat trip to Nusa Penida.",
    featured: true,
  },
  {
    slug: "norwegian-fjords-aurora-expedition",
    title: "Norwegian Fjords & Aurora Expedition",
    location: "Tromsø & Lofoten, Norway",
    country: "Norway",
    category: TourCategory.Adventure,
    rating: 4.9,
    reviews: 187,
    durationDays: 8,
    durationLabel: "8 Days 7 Nights",
    price: 1850,
    groupSize: "6-8 People",
    language: "English, Norwegian",
    tourType: "Specific Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-5.png",
    overview:
      "Chase the northern lights across Arctic Norway. We use small vans and local skippers to follow clear skies — from Tromsø's mountain ridges to the cathedral peaks of Lofoten. Days are filled with snowshoeing, fjord cruising and warming meals in red-painted fishing cabins.",
    highlights:
      "Three dedicated aurora hunting nights, a husky-sledding expedition, a RIB safari into Trollfjord, and two nights in an authentic rorbu cabin on stilts above the sea.",
  },
  {
    slug: "peru-machu-picchu-classic-trek",
    title: "Peru Machu Picchu Classic Trek",
    location: "Cusco, Peru",
    country: "Peru",
    category: TourCategory.Adventure,
    rating: 4.8,
    reviews: 365,
    durationDays: 9,
    durationLabel: "9 Days 8 Nights",
    price: 1450,
    groupSize: "8-12 People",
    language: "English, Spanish",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-6.png",
    overview:
      "Walk the original Inca Trail through cloud forest and stone-carved passes to reach Machu Picchu through the Sun Gate at dawn. Before the trek we acclimatise in Cusco and the Sacred Valley, learning the history that makes the final view so moving.",
    highlights:
      "Four-day Inca Trail with porters and a chef, Ollantaytambo fortress at sunset, a traditional pachamanca feast, and a guided tour of Machu Picchu with a local archaeologist.",
    featured: true,
  },
  {
    slug: "great-wall-of-china-immersion",
    title: "Great Wall of China Immersion",
    location: "Beijing, China",
    country: "China",
    category: TourCategory.Cultural,
    rating: 4.7,
    reviews: 276,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 980,
    groupSize: "10-15 People",
    language: "English, Mandarin",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/destinations/great-wall.png",
    overview:
      "Beyond the crowded sections, the Great Wall is wild and breathtaking. We hike the restored ramparts of Mutianyu, camp under stars on the unrestored Jinshanling stretch, and balance it with Beijing's Forbidden City, hutong life and a Peking duck masterclass.",
    highlights:
      "Sunrise on Jinshanling, a guided Forbidden City visit, hutong rickshaw tour with a local family lunch, and a traditional tea ceremony.",
  },
  {
    slug: "paris-romantic-getaway",
    title: "Paris Romantic Getaway",
    location: "Paris, France",
    country: "France",
    category: TourCategory.City,
    rating: 4.6,
    reviews: 502,
    durationDays: 4,
    durationLabel: "4 Days 3 Nights",
    price: 720,
    oldPrice: 890,
    groupSize: "Private",
    language: "English, French",
    tourType: "Honeymoon",
    badgeLabel: "19% OFF",
    badgeTone: BadgeTone.discount,
    image: "/images/destinations/eiffel-tower.png",
    overview:
      "Paris done thoughtfully — fewer queues, more time together. A private guide takes you behind the scenes at the Louvre, you cycle Montmartre at golden hour, and finish the trip with a candlelit dinner cruise along the Seine.",
    highlights:
      "Skip-the-line Eiffel Tower summit, private Louvre highlights tour, a Montmartre street-art walk, and a sunset Seine river cruise.",
  },
  {
    slug: "rome-ancient-empire-tour",
    title: "Rome Ancient Empire Tour",
    location: "Rome, Italy",
    country: "Italy",
    category: TourCategory.Cultural,
    rating: 4.8,
    reviews: 414,
    durationDays: 5,
    durationLabel: "5 Days 4 Nights",
    price: 860,
    groupSize: "8-12 People",
    language: "English, Italian",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/destinations/colosseum.png",
    overview:
      "Walk through 2,500 years of history with archaeologists who know Rome inside out. From the gladiator's tunnels beneath the Colosseum to the Vatican before opening hours, this trip pairs serious storytelling with long Italian lunches.",
    highlights:
      "Colosseum underground access, early-morning Vatican Museums entry, the Pantheon at dusk, and a pasta-making class in Trastevere.",
  },
  {
    slug: "iceland-ring-road-road-trip",
    title: "Iceland Ring Road Self-Drive",
    location: "Reykjavík, Iceland",
    country: "Iceland",
    category: TourCategory.Adventure,
    rating: 4.9,
    reviews: 198,
    durationDays: 10,
    durationLabel: "10 Days 9 Nights",
    price: 2100,
    groupSize: "Self-Drive",
    language: "English",
    tourType: "Self-Drive",
    badgeLabel: "Premium",
    badgeTone: BadgeTone.popular,
    image: "/images/categories/adventure.jpg",
    overview:
      "Circle the entire island on Route 1 with a fully prepared 4x4, hand-picked guesthouses and a curated daily playbook. You drive, we plan — including weather alerts, road conditions and the hidden detours guidebooks miss.",
    highlights:
      "Seljalandsfoss and Skógafoss waterfalls, glacier hike on Vatnajökull, black-sand beach at Reynisfjara, soaking in the Mývatn nature baths, and Jökulsárlón ice lagoon.",
  },
  {
    slug: "morocco-desert-and-medinas",
    title: "Morocco — Desert and Medinas",
    location: "Marrakech & Sahara, Morocco",
    country: "Morocco",
    category: TourCategory.Desert,
    rating: 4.7,
    reviews: 233,
    durationDays: 8,
    durationLabel: "8 Days 7 Nights",
    price: 920,
    oldPrice: 1150,
    groupSize: "8-14 People",
    language: "English, French, Arabic",
    tourType: "Group Tour",
    badgeLabel: "20% OFF",
    badgeTone: BadgeTone.discount,
    image: "/images/categories/desert.jpg",
    overview:
      "From the energy of Marrakech's Jemaa el-Fna to the silence of the Erg Chebbi dunes, this loop captures Morocco's two faces — vibrant medinas and the soulful Sahara. A camel caravan delivers you to a luxury desert camp for two unforgettable nights.",
    highlights:
      "Jemaa el-Fna food tour by night, blue alleys of Chefchaouen, riad cooking class in Fez, Atlas mountain pass to Merzouga, and a desert overnight with Berber musicians.",
    featured: true,
  },
  {
    slug: "thailand-island-hopper",
    title: "Thailand Island Hopper",
    location: "Phuket & Krabi, Thailand",
    country: "Thailand",
    category: TourCategory.Tropical,
    rating: 4.6,
    reviews: 389,
    durationDays: 7,
    durationLabel: "7 Days 6 Nights",
    price: 640,
    groupSize: "10-16 People",
    language: "English, Thai",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/categories/tropical.jpg",
    overview:
      "Karst cliffs, secret lagoons and beach barbecues. We hop between Phi Phi, James Bond Island and the Yao archipelago on small boats with local skippers, sleeping at hand-picked beach lodges far from the cruise-ship crowds.",
    highlights:
      "Maya Bay snorkel before opening hours, Hong Island kayak tour, Railay Beach climbing day (optional), and a Krabi night-market food crawl.",
  },
  {
    slug: "kenya-masai-mara-safari",
    title: "Kenya Masai Mara Safari",
    location: "Masai Mara, Kenya",
    country: "Kenya",
    category: TourCategory.Wildlife,
    rating: 4.9,
    reviews: 162,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 1690,
    groupSize: "6-8 People",
    language: "English, Swahili",
    tourType: "Specific Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-1.png",
    overview:
      "Track the Big Five in the heart of the Masai Mara during the Great Migration window. Mornings begin with sunrise game drives, afternoons with cultural visits to Maasai villages, and nights around the fire with seasoned naturalist guides.",
    highlights:
      "Mara River crossing viewing (in season), hot-air balloon safari at dawn, sundowners overlooking the savannah, and an authentic Maasai homestay evening.",
  },
  {
    slug: "japan-cherry-blossom-classic",
    title: "Japan Cherry Blossom Classic",
    location: "Tokyo, Kyoto & Osaka, Japan",
    country: "Japan",
    category: TourCategory.Cultural,
    rating: 4.9,
    reviews: 287,
    durationDays: 10,
    durationLabel: "10 Days 9 Nights",
    price: 2380,
    groupSize: "8-12 People",
    language: "English, Japanese",
    tourType: "Group Tour",
    badgeLabel: "Seasonal",
    badgeTone: BadgeTone.popular,
    image: "/images/categories/city.jpg",
    overview:
      "Travel between Tokyo, Hakone, Kyoto and Osaka during sakura season on Japan's beautiful rail network. Mornings under blossom canopies, afternoons in temples and ryokan onsens, evenings exploring back-alley izakayas with our local hosts.",
    highlights:
      "Shinjuku Gyoen blossom picnic, Mount Fuji day trip, Fushimi Inari at dawn, geisha district walk in Gion, and a stay in a traditional ryokan.",
    featured: true,
  },
  {
    slug: "new-zealand-south-island-explorer",
    title: "New Zealand South Island Explorer",
    location: "Queenstown, New Zealand",
    country: "New Zealand",
    category: TourCategory.Adventure,
    rating: 4.8,
    reviews: 174,
    durationDays: 9,
    durationLabel: "9 Days 8 Nights",
    price: 1980,
    groupSize: "Self-Drive",
    language: "English",
    tourType: "Self-Drive",
    badgeLabel: "Premium",
    badgeTone: BadgeTone.popular,
    image: "/images/categories/mountain.jpg",
    overview:
      "From Christchurch to Milford Sound — a curated road trip across the South Island. We line up boutique stays in Wanaka and Te Anau, a glacier helicopter, and gentle hikes in Mount Cook National Park.",
    highlights:
      "Milford Sound cruise, Fox Glacier heli-hike, Lake Tekapo stargazing, Wanaka tree photo stop, and a bungy or zipline experience in Queenstown.",
  },
  {
    slug: "egypt-pyramids-and-nile-cruise",
    title: "Egypt Pyramids and Nile Cruise",
    location: "Cairo & Luxor, Egypt",
    country: "Egypt",
    category: TourCategory.Cruise,
    rating: 4.6,
    reviews: 312,
    durationDays: 8,
    durationLabel: "8 Days 7 Nights",
    price: 1290,
    oldPrice: 1490,
    groupSize: "12-16 People",
    language: "English, Arabic",
    tourType: "Cruise",
    badgeLabel: "13% OFF",
    badgeTone: BadgeTone.discount,
    image: "/images/categories/beach.jpg",
    overview:
      "Stand before the Pyramids of Giza, sleep aboard a Nile cruiser between Luxor and Aswan, and meet the temples of Karnak and Abu Simbel with an Egyptologist guide who brings the hieroglyphs to life.",
    highlights:
      "Giza Pyramids and Sphinx, Egyptian Museum private tour, 4-night Nile cruise, Valley of the Kings, and a hot-air balloon over Luxor (optional).",
  },
  {
    slug: "mexico-yucatan-cenote-trail",
    title: "Mexico Yucatán Cenote Trail",
    location: "Tulum & Mérida, Mexico",
    country: "Mexico",
    category: TourCategory.Tropical,
    rating: 4.7,
    reviews: 221,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 760,
    groupSize: "8-12 People",
    language: "English, Spanish",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-3.png",
    overview:
      "Swim through ancient cave systems, sleep beside Mayan ruins and end the trip on the white sands of Tulum. We blend the energy of Mexico's coast with the deep history of the Yucatán interior.",
    highlights:
      "Chichén Itzá at opening, Ik Kil cenote swim, a Mérida food tour, snorkelling with sea turtles in Akumal, and a Tulum beach sunset.",
  },
  {
    slug: "vietnam-from-hanoi-to-ho-chi-minh",
    title: "Vietnam — Hanoi to Ho Chi Minh",
    location: "Hanoi to HCMC, Vietnam",
    country: "Vietnam",
    category: TourCategory.Cultural,
    rating: 4.7,
    reviews: 256,
    durationDays: 11,
    durationLabel: "11 Days 10 Nights",
    price: 1340,
    groupSize: "10-14 People",
    language: "English, Vietnamese",
    tourType: "Group Tour",
    badgeLabel: "Bestseller",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-4.png",
    overview:
      "Travel south through Vietnam by train, boat and slow van — Hanoi's old quarter, an overnight junk in Halong Bay, the lantern-lit streets of Hoi An, and finally the bustle of Ho Chi Minh and the Mekong Delta.",
    highlights:
      "Halong Bay overnight cruise, Hue imperial city, Hoi An tailor experience, Cu Chi tunnels guided tour, and a Mekong floating market visit.",
  },
  {
    slug: "spain-andalusia-discovery",
    title: "Spain Andalusia Discovery",
    location: "Seville & Granada, Spain",
    country: "Spain",
    category: TourCategory.Cultural,
    rating: 4.6,
    reviews: 198,
    durationDays: 6,
    durationLabel: "6 Days 5 Nights",
    price: 890,
    groupSize: "8-12 People",
    language: "English, Spanish",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-5.png",
    overview:
      "Andalusia rolls Moorish palaces, flamenco rooftops and tapas-trail evenings into one rich week. We move slowly between Seville, Córdoba and Granada with plenty of plaza time and shaded courtyards.",
    highlights:
      "Alhambra night visit, Seville cathedral and Real Alcázar, a flamenco show in a 17th-century tablao, Córdoba's Mezquita, and an evening tapas crawl.",
  },
  {
    slug: "australia-east-coast-classics",
    title: "Australia East Coast Classics",
    location: "Sydney to Cairns, Australia",
    country: "Australia",
    category: TourCategory.Beach,
    rating: 4.8,
    reviews: 145,
    durationDays: 12,
    durationLabel: "12 Days 11 Nights",
    price: 2890,
    groupSize: "Self-Drive + Flights",
    language: "English",
    tourType: "Specific Tour",
    badgeLabel: "Premium",
    badgeTone: BadgeTone.popular,
    image: "/images/destinations/opera-house.png",
    overview:
      "From the Sydney Opera House to the Great Barrier Reef — Australia's east coast in twelve unhurried days. Iconic cities, rainforest drives and time on the water with marine biologists who know the reef intimately.",
    highlights:
      "Sydney Harbour Bridge climb, Whitsundays sailing, Great Barrier Reef snorkel safari, Daintree rainforest guided walk, and a Bondi to Coogee coast walk.",
  },
  {
    slug: "india-golden-triangle-classic",
    title: "India Golden Triangle Classic",
    location: "Delhi, Agra & Jaipur, India",
    country: "India",
    category: TourCategory.Cultural,
    rating: 4.7,
    reviews: 421,
    durationDays: 7,
    durationLabel: "7 Days 6 Nights",
    price: 780,
    groupSize: "10-16 People",
    language: "English, Hindi",
    tourType: "Group Tour",
    badgeLabel: "Bestseller",
    badgeTone: BadgeTone.popular,
    image: "/images/destinations/taj-mahal.png",
    overview:
      "Three cities, one extraordinary week. The Taj Mahal at sunrise, Jaipur's pink-sandstone palaces, and Old Delhi by rickshaw with a guide who grew up in its lanes.",
    highlights:
      "Taj Mahal at sunrise, Amber Fort and elephant village, Hawa Mahal photo stop, Akshardham temple, and a hands-on cooking demonstration.",
  },
  {
    slug: "vatican-city-art-and-faith",
    title: "Vatican City — Art and Faith",
    location: "Vatican City",
    country: "Vatican City",
    category: TourCategory.Cultural,
    rating: 4.8,
    reviews: 167,
    durationDays: 3,
    durationLabel: "3 Days 2 Nights",
    price: 480,
    groupSize: "6-10 People",
    language: "English, Italian",
    tourType: "City Break",
    badgeLabel: "Short Break",
    badgeTone: BadgeTone.popular,
    image: "/images/destinations/colosseum.png",
    overview:
      "Two-night Rome-based break dedicated to the world's smallest sovereign state. With an art historian as your guide, you'll spend hours inside the Vatican Museums and the Sistine Chapel before the crowds arrive.",
    highlights:
      "Vatican Museums after-hours tour, Sistine Chapel guided visit, St Peter's dome climb, and a private audience preparation if travelling on Wednesdays.",
  },
  {
    slug: "tanzania-serengeti-and-zanzibar",
    title: "Tanzania — Serengeti and Zanzibar",
    location: "Arusha & Zanzibar, Tanzania",
    country: "Tanzania",
    category: TourCategory.Wildlife,
    rating: 4.9,
    reviews: 132,
    durationDays: 10,
    durationLabel: "10 Days 9 Nights",
    price: 2640,
    groupSize: "6-8 People",
    language: "English, Swahili",
    tourType: "Specific Tour",
    badgeLabel: "Premium",
    badgeTone: BadgeTone.popular,
    image: "/images/packages/pkg-1.png",
    overview:
      "Spend the first week on safari in the Serengeti and Ngorongoro Crater, then fly to Zanzibar for three nights on the powder-white beaches of Matemwe. A perfect combination of action and recovery.",
    highlights:
      "Serengeti game drives with a Big Five focus, Ngorongoro Crater day, Stone Town spice tour, and a sandbank picnic off Zanzibar's east coast.",
  },
  {
    slug: "dubai-luxury-city-break",
    title: "Dubai Luxury City Break",
    location: "Dubai, UAE",
    country: "United Arab Emirates",
    category: TourCategory.City,
    rating: 4.5,
    reviews: 312,
    durationDays: 4,
    durationLabel: "4 Days 3 Nights",
    price: 980,
    oldPrice: 1180,
    groupSize: "Private",
    language: "English, Arabic",
    tourType: "City Break",
    badgeLabel: "17% OFF",
    badgeTone: BadgeTone.discount,
    image: "/images/categories/city.jpg",
    overview:
      "Skyline highs and desert dunes in one short, indulgent break. From a Burj Khalifa private viewing to a Bedouin-style camp under the stars, this is Dubai delivered without queues.",
    highlights:
      "Burj Khalifa SKY lounge access, Old Dubai souk and abra ride, desert safari with falconry, and a yacht cruise of the Palm and Marina.",
  },
  {
    slug: "patagonia-end-of-the-world-trek",
    title: "Patagonia — End of the World Trek",
    location: "Torres del Paine, Chile",
    country: "Chile",
    category: TourCategory.Adventure,
    rating: 4.9,
    reviews: 96,
    durationDays: 8,
    durationLabel: "8 Days 7 Nights",
    price: 2480,
    groupSize: "6-8 People",
    language: "English, Spanish",
    tourType: "Trek",
    badgeLabel: "Expedition",
    badgeTone: BadgeTone.popular,
    image: "/images/categories/mountain.jpg",
    overview:
      "Walk the famous W Trek through Torres del Paine with a mountain guide, sleeping in refugios that take the load off your back. Glacial lakes, granite towers and Patagonian wind that you'll never forget.",
    highlights:
      "Base of the Towers viewpoint, French Valley day, Grey Glacier cruise, refugio overnights with hot meals, and a final celebratory asado.",
  },
  {
    slug: "scotland-highlands-and-isle-of-skye",
    title: "Scotland Highlands & Isle of Skye",
    location: "Edinburgh to Skye, UK",
    country: "United Kingdom",
    category: TourCategory.Adventure,
    rating: 4.7,
    reviews: 184,
    durationDays: 7,
    durationLabel: "7 Days 6 Nights",
    price: 1180,
    groupSize: "Up to 12 People",
    language: "English, Gaelic",
    tourType: "Group Tour",
    badgeLabel: "Popular",
    badgeTone: BadgeTone.popular,
    image: "/images/categories/adventure.jpg",
    overview:
      "From Edinburgh's old town to the windswept ridges of Skye, this Highland loop combines history-rich towns, lochside drives and quietly beautiful glens. Distillery visits and a ceilidh night included.",
    highlights:
      "Edinburgh castle tour, Glencoe valley drive, Eilean Donan Castle, Old Man of Storr hike, Talisker distillery visit, and a traditional ceilidh evening.",
  },
];

// ─── Blogs (15 realistic entries) ───────────────────────────────────────

type BlogSeed = {
  slug: string;
  title: string;
  cover: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readMinutes: number;
  date: string; // display
  publishedAt: string; // ISO
  quote?: string;
  relatedTourSlug?: string;
  body: { heading?: string; text: string }[];
  featured?: boolean;
};

const blogSeeds: BlogSeed[] = [
  {
    slug: "first-time-greek-island-hopping-what-to-know",
    title: "First-time Greek Island Hopping — what you really need to know",
    cover: "/images/blog/post-main.jpg",
    excerpt:
      "Ferries, currents, secret swim spots and the small things that make a Cyclades trip unforgettable — written by guides who run our Santorini hopper.",
    category: "Destinations",
    tags: ["Greece", "Islands", "Planning"],
    author: "Eleni Marinaki",
    readMinutes: 8,
    date: "March 14, 2026",
    publishedAt: "2026-03-14T08:00:00Z",
    quote:
      "Start in Naxos or Paros, not Mykonos — you'll arrive in the Cyclades with calmer nerves and a much wider view of what Greek island life actually feels like.",
    relatedTourSlug: "santorini-island-hopping-adventure",
    featured: true,
    body: [
      {
        text: "The Aegean ferry network looks intimidating on paper and is genuinely friendly in practice. Once you know how to read the schedules, hopping between islands becomes the most enjoyable part of the trip — slow, scenic, and full of small social moments most tourists never see.",
      },
      {
        heading: "Pick a base, then explore",
        text: "Instead of moving every night, choose one or two base islands and use them as launchpads. Naxos for green countryside and beaches; Paros for a balance of nightlife and quiet; Santorini for the iconic caldera; Milos for moon-like coves you'll never forget.",
      },
      {
        heading: "Book the right ferry, not just any ferry",
        text: "High-speed catamarans cut journey times in half but get cancelled in strong meltemi winds. Conventional ferries are slower, cheaper, more reliable — and the deck breeze is half the holiday.",
      },
      {
        heading: "Carry less, swim more",
        text: "Most of the great memories happen barefoot. Pack one good day-bag, water shoes for the volcanic beaches, and a small dry bag for boat days. Anything heavier and you'll resent it on the third climb up to a hilltop village.",
      },
    ],
  },
  {
    slug: "japan-cherry-blossom-timing-guide",
    title: "Cherry blossom in Japan — timing the bloom and crowds",
    cover: "/images/blog/recent-1.png",
    excerpt:
      "The sakura window is shorter than most travellers think. Here's how we plan around it for our small-group Japan tours.",
    category: "Planning",
    tags: ["Japan", "Seasons", "Sakura"],
    author: "Haruto Sasaki",
    readMinutes: 6,
    date: "January 22, 2026",
    publishedAt: "2026-01-22T09:00:00Z",
    relatedTourSlug: "japan-cherry-blossom-classic",
    featured: true,
    body: [
      {
        text: "Sakura forecasting is a national sport in Japan, with daily updates from the meteorological agency. For a foreigner planning a trip months in advance, the trick is to build a route that gives you multiple bites at the apple — south to north, lower to higher elevation.",
      },
      {
        heading: "The seven-day rule",
        text: "Most blossoms are at their best for about a week. Travel with a five-to-ten day cherry-focused itinerary and you'll usually catch peak in at least one city, even if the bloom shifts by a few days.",
      },
      {
        heading: "Don't skip the smaller spots",
        text: "Everyone goes to Ueno Park and the Philosopher's Path. The best photos we've ever taken were in Yoshino, Hirosaki and along the Meguro river in Tokyo — same trees, fewer crowds.",
      },
    ],
  },
  {
    slug: "packing-list-norway-northern-lights",
    title: "Packing for Arctic Norway — a winter packing list that actually works",
    cover: "/images/blog/recent-2.png",
    excerpt:
      "Three layers, the right gloves, and one mistake nearly everyone makes. Our Tromsø guides walk you through the kit they personally use.",
    category: "Gear",
    tags: ["Norway", "Winter", "Packing"],
    author: "Sindre Knutsen",
    readMinutes: 7,
    date: "December 03, 2025",
    publishedAt: "2025-12-03T07:30:00Z",
    relatedTourSlug: "norwegian-fjords-aurora-expedition",
    body: [
      {
        text: "Cold-weather travel is a kit problem more than a temperature problem. If you have the right layers you'll be comfortable at minus 20°C. If you don't, even a mild Arctic night will feel miserable.",
      },
      {
        heading: "The three-layer rule",
        text: "Base layer (merino, not cotton). Mid layer (fleece or down). Outer layer (windproof, waterproof shell). Add or remove layers depending on activity. Walking briskly? You'll overheat in three layers. Standing still chasing the aurora? You'll wish you'd packed four.",
      },
      {
        heading: "Don't forget your hands",
        text: "The single biggest mistake we see: thin photographer's gloves and no over-mitts. Bring both. You'll thank us at midnight.",
      },
    ],
  },
  {
    slug: "machu-picchu-altitude-prep",
    title: "Acclimatising for Machu Picchu — what works and what doesn't",
    cover: "/images/blog/recent-3.png",
    excerpt:
      "Altitude sickness is the single biggest reason trips to the Inca Trail go sideways. Here's how our trek leaders prepare you for it.",
    category: "Health",
    tags: ["Peru", "Altitude", "Trekking"],
    author: "Dr. Camila Ortiz",
    readMinutes: 9,
    date: "November 18, 2025",
    publishedAt: "2025-11-18T10:00:00Z",
    relatedTourSlug: "peru-machu-picchu-classic-trek",
    body: [
      {
        text: "Cusco sits at 3,400 metres. The Inca Trail crosses Dead Woman's Pass at 4,215. If you fly in from sea level and start hiking the next day, your body will struggle. The good news is that altitude problems are almost always preventable.",
      },
      {
        heading: "Two nights of acclimatisation, minimum",
        text: "Spend the first two days walking gently in Cusco or — even better — in the slightly lower Sacred Valley. Drink water like it's your job. Eat lightly. Skip alcohol.",
      },
      {
        heading: "Coca tea, hydration, and the early signs",
        text: "Mate de coca genuinely helps. So does ibuprofen if you start getting headaches. Watch for nausea, sleeplessness and shortness of breath: these are the body's first signals that you're going up too fast.",
      },
    ],
  },
  {
    slug: "bali-beyond-the-beach",
    title: "Bali beyond the beach — five experiences worth the detour",
    cover: "/images/blog/recent-4.png",
    excerpt:
      "Bali is not one island, it's twenty. Here are five days off the beach that change how you see Indonesia.",
    category: "Culture",
    tags: ["Indonesia", "Bali", "Local"],
    author: "Wayan Suarsana",
    readMinutes: 6,
    date: "October 09, 2025",
    publishedAt: "2025-10-09T08:00:00Z",
    relatedTourSlug: "bali-tropical-paradise-retreat",
    body: [
      {
        text: "If you only see the beaches, you'll like Bali. If you spend a day with a Balinese family in their compound, you'll fall in love with it. Here are five experiences that flip the standard itinerary.",
      },
      {
        heading: "1. Sunrise at Sidemen rice fields",
        text: "Less touristy than Tegallalang, with a backdrop of Mount Agung. Bring a thermos.",
      },
      {
        heading: "2. A Balinese family ceremony",
        text: "Ask your hotel or driver — they'll often know of a wedding or temple festival you can quietly observe. Wear a sarong, bring a small offering, and stay respectful.",
      },
    ],
  },
  {
    slug: "iceland-driving-tips-winter",
    title: "Driving Iceland in winter — five tips that keep you safe",
    cover: "/images/blog/recent-5.png",
    excerpt:
      "Iceland's Ring Road is beautiful and unforgiving in winter. Read this before you pick up the keys.",
    category: "Adventure",
    tags: ["Iceland", "Driving", "Winter"],
    author: "Ásdís Jónsdóttir",
    readMinutes: 5,
    date: "September 26, 2025",
    publishedAt: "2025-09-26T11:00:00Z",
    relatedTourSlug: "iceland-ring-road-road-trip",
    body: [
      {
        text: "If you've driven on snow before, Icelandic winter driving is manageable — provided you respect the wind, the road closures and the limits of your rental.",
      },
      {
        heading: "Check road.is every morning",
        text: "Iceland's official road authority publishes live closure and condition maps in English. Make this your first task with your morning coffee.",
      },
      {
        heading: "Wind is the real enemy, not snow",
        text: "Iceland's gusts can blow car doors clean off. Always hold the door with both hands when getting out, especially at exposed parking pull-offs.",
      },
    ],
  },
  {
    slug: "morocco-medina-survival-guide",
    title: "Navigating the Marrakech medina — a survival guide",
    cover: "/images/blog/post.jpg",
    excerpt:
      "The medina is glorious chaos. Read this and you'll enjoy it twice as much.",
    category: "Culture",
    tags: ["Morocco", "Marrakech", "Souk"],
    author: "Karim El Idrissi",
    readMinutes: 7,
    date: "August 14, 2025",
    publishedAt: "2025-08-14T09:30:00Z",
    relatedTourSlug: "morocco-desert-and-medinas",
    body: [
      {
        text: "Marrakech's medina is a UNESCO-listed labyrinth. It is loud, smoky, beautiful, occasionally overwhelming — and absolutely the highlight of most travellers' Moroccan trip.",
      },
      {
        heading: "Get lost on purpose",
        text: "The medina has logic, but the logic is faster to learn by walking than by map-staring. Pick a landmark (the Koutoubia minaret is your friend) and trust that you'll always find your way back.",
      },
      {
        heading: "Bargaining is conversation, not combat",
        text: "Aim for about a third of the asking price as a starting offer, but smile. The best deals come with mint tea.",
      },
    ],
  },
  {
    slug: "safari-camera-kit-light-and-fast",
    title: "Safari camera kit — light, fast, and what to leave at home",
    cover: "/images/blog/post-main.jpg",
    excerpt:
      "A practical kit list from a wildlife photographer who's spent twelve seasons in East Africa.",
    category: "Gear",
    tags: ["Photography", "Safari", "Kenya"],
    author: "Olivia Carter",
    readMinutes: 8,
    date: "July 22, 2025",
    publishedAt: "2025-07-22T09:00:00Z",
    relatedTourSlug: "kenya-masai-mara-safari",
    body: [
      {
        text: "The pictures you'll be happiest with are the ones you actually took — not the ones you missed while changing a 600mm lens. Travel light.",
      },
      {
        heading: "One body, two lenses",
        text: "A modern mirrorless with a 24-70 and a 100-400 will cover 90% of the situations you'll encounter. Add a teleconverter only if you know you'll use it.",
      },
      {
        heading: "Dust is your enemy",
        text: "Lens-change anywhere outdoors invites dust. Master changing lenses inside the vehicle, with the AC off, and you'll keep your sensor clean.",
      },
    ],
  },
  {
    slug: "patagonia-w-trek-without-suffering",
    title: "Hiking the W Trek without suffering — refugios, weather, gear",
    cover: "/images/blog/recent-1.png",
    excerpt:
      "Torres del Paine is unforgettable. With the right plan it doesn't have to be brutal.",
    category: "Adventure",
    tags: ["Patagonia", "Chile", "Trek"],
    author: "Tomás Aguilar",
    readMinutes: 9,
    date: "June 05, 2025",
    publishedAt: "2025-06-05T08:00:00Z",
    relatedTourSlug: "patagonia-end-of-the-world-trek",
    body: [
      {
        text: "The W Trek covers around 80km in five days. Refugio sleeping and full-board options have transformed the experience — you no longer need to carry a tent, stove or a week of food.",
      },
      {
        heading: "Book refugios early, very early",
        text: "Beds sell out 6-9 months in advance for peak season. The longer you wait, the more your route gets dictated by what's available rather than what's smart.",
      },
      {
        heading: "Expect four seasons in a day",
        text: "Patagonian weather is famously moody. A rain shell, gloves, sun hat and sunscreen — yes, all of them — should live in your day pack.",
      },
    ],
  },
  {
    slug: "vietnam-railway-history-and-route",
    title: "Vietnam's reunification railway — a complete route guide",
    cover: "/images/blog/recent-2.png",
    excerpt:
      "Two days, 1,700 kilometres, four climate zones. Riding the Reunification Express end-to-end.",
    category: "Destinations",
    tags: ["Vietnam", "Trains", "Slow Travel"],
    author: "Linh Nguyen",
    readMinutes: 7,
    date: "May 16, 2025",
    publishedAt: "2025-05-16T08:00:00Z",
    relatedTourSlug: "vietnam-from-hanoi-to-ho-chi-minh",
    body: [
      {
        text: "Vietnam's north-south railway was rebuilt after the war and still runs daily between Hanoi and Saigon. Riding the full route is one of the great slow journeys in Asia.",
      },
      {
        heading: "Which cabin?",
        text: "Soft sleeper (four berths) is the comfortable middle ground. Bring snacks, a power bank, and a small bottle of bourbon — train carriages have a way of turning strangers into friends.",
      },
    ],
  },
  {
    slug: "egypt-pyramids-private-tour-tips",
    title: "Visiting the Pyramids without the chaos — a guide's playbook",
    cover: "/images/blog/recent-3.png",
    excerpt:
      "The Pyramids are magical. The crowds, scams and heat can spoil it. Here's how to do Giza properly.",
    category: "Destinations",
    tags: ["Egypt", "Pyramids", "Tips"],
    author: "Mariam Hosny",
    readMinutes: 6,
    date: "April 19, 2025",
    publishedAt: "2025-04-19T07:00:00Z",
    relatedTourSlug: "egypt-pyramids-and-nile-cruise",
    body: [
      {
        text: "Get there before 8am. That single decision changes everything — the light, the temperature, and the number of touts.",
      },
      {
        heading: "Inside the Great Pyramid?",
        text: "Worth doing once. Claustrophobic, hot, and surprisingly steep. Not recommended if you're claustrophobic or have back issues.",
      },
    ],
  },
  {
    slug: "scotland-distillery-route",
    title: "A whisky lover's Speyside loop — five distilleries, two days",
    cover: "/images/blog/recent-4.png",
    excerpt:
      "From Glenlivet to Aberlour, a thoughtfully paced route for tasting without driving impaired.",
    category: "Food",
    tags: ["Scotland", "Whisky", "Speyside"],
    author: "Fiona MacLeod",
    readMinutes: 6,
    date: "March 02, 2025",
    publishedAt: "2025-03-02T11:00:00Z",
    relatedTourSlug: "scotland-highlands-and-isle-of-skye",
    body: [
      {
        text: "Speyside has more distilleries per square mile than anywhere else on earth. With a designated driver or guided tour, two days is enough for a representative tasting tour.",
      },
      {
        heading: "Drivers samples are a thing",
        text: "Every distillery will offer you sealed take-home samples if you're driving. Use them — it lets you sample at home in the evening.",
      },
    ],
  },
  {
    slug: "india-train-travel-confidence",
    title: "Indian railways for nervous first-timers",
    cover: "/images/blog/recent-5.png",
    excerpt:
      "Yes you can. Yes it's safe. And yes, it's the best way to see the country.",
    category: "Planning",
    tags: ["India", "Trains", "Solo Travel"],
    author: "Anika Sharma",
    readMinutes: 7,
    date: "February 11, 2025",
    publishedAt: "2025-02-11T08:30:00Z",
    relatedTourSlug: "india-golden-triangle-classic",
    body: [
      {
        text: "Indian Railways carries 23 million people every day. The system is huge, busy and remarkably reliable once you know which class to book.",
      },
      {
        heading: "AC2 is the sweet spot",
        text: "Second-class AC sleeper offers privacy curtains, clean bedding, charging points, and meals delivered to your berth. It's how most middle-class Indians travel.",
      },
    ],
  },
  {
    slug: "thailand-island-which-one",
    title: "Which Thai island? A no-nonsense matchmaker",
    cover: "/images/blog/post.jpg",
    excerpt:
      "Phi Phi, Koh Lanta, Koh Tao, Koh Yao Noi — six islands and exactly who they're best for.",
    category: "Destinations",
    tags: ["Thailand", "Islands", "Comparison"],
    author: "Praew Chayanon",
    readMinutes: 7,
    date: "January 18, 2025",
    publishedAt: "2025-01-18T09:00:00Z",
    relatedTourSlug: "thailand-island-hopper",
    body: [
      {
        text: "Thailand has roughly 1,400 islands, but five or six get 90% of the visitors. Here's a quick matchmaker so you don't end up partying on a rave island when you wanted yoga.",
      },
      {
        heading: "Koh Lanta for laid-back families",
        text: "Long flat beaches, easy roads, friendly locals, sunset bars but no all-night parties.",
      },
      {
        heading: "Koh Tao for divers and budget travel",
        text: "Cheapest place in the world to certify as a diver, plus a great backpacker scene.",
      },
    ],
  },
  {
    slug: "new-zealand-south-island-driving",
    title: "Driving New Zealand's South Island — distances and pacing",
    cover: "/images/blog/post-main.jpg",
    excerpt:
      "Roads are smaller than they look, scenery is bigger than it should be. How long the drives really take.",
    category: "Planning",
    tags: ["New Zealand", "Self-Drive"],
    author: "James Whittaker",
    readMinutes: 6,
    date: "December 12, 2024",
    publishedAt: "2024-12-12T10:00:00Z",
    relatedTourSlug: "new-zealand-south-island-explorer",
    body: [
      {
        text: "NZ's South Island is roughly the size of England, with mountains down the middle and roads that wind. Google Maps gives you the optimistic driving time. Reality is usually 20–30% longer once you account for photo stops.",
      },
      {
        heading: "The 4-hour rule",
        text: "Don't try to drive more than four hours in a single day. You'll exhaust yourself and miss the country going past the window.",
      },
    ],
  },
];

// ─── Seed ────────────────────────────────────────────────────────────────

async function main() {
  console.log("→ Connecting to Neon…");
  await prisma.$connect();
  console.log("→ Seeding tours…");
  for (const t of tourSeeds) {
    const plan = buildPlan(t.durationDays, t.location.split(",")[0].trim());
    await prisma.tour.upsert({
      where: { slug: t.slug },
      update: {
        title: t.title,
        location: t.location,
        country: t.country,
        category: t.category,
        rating: t.rating,
        reviews: t.reviews,
        durationDays: t.durationDays,
        durationLabel: t.durationLabel,
        price: t.price,
        oldPrice: t.oldPrice ?? null,
        groupSize: t.groupSize,
        language: t.language,
        tourType: t.tourType,
        badgeLabel: t.badgeLabel,
        badgeTone: t.badgeTone,
        image: t.image,
        gallery: COMMON_GALLERY,
        overview: t.overview,
        highlights: t.highlights,
        included: STANDARD_INCLUDED,
        excluded: STANDARD_EXCLUDED,
        plan,
        featured: t.featured ?? false,
      },
      create: {
        slug: t.slug,
        title: t.title,
        location: t.location,
        country: t.country,
        category: t.category,
        rating: t.rating,
        reviews: t.reviews,
        durationDays: t.durationDays,
        durationLabel: t.durationLabel,
        price: t.price,
        oldPrice: t.oldPrice ?? null,
        groupSize: t.groupSize,
        language: t.language,
        tourType: t.tourType,
        badgeLabel: t.badgeLabel,
        badgeTone: t.badgeTone,
        image: t.image,
        gallery: COMMON_GALLERY,
        overview: t.overview,
        highlights: t.highlights,
        included: STANDARD_INCLUDED,
        excluded: STANDARD_EXCLUDED,
        plan,
        featured: t.featured ?? false,
      },
    });
  }
  console.log(`✓ Tours seeded: ${tourSeeds.length}`);

  console.log("→ Seeding blogs…");
  for (const b of blogSeeds) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        cover: b.cover,
        excerpt: b.excerpt,
        body: b.body,
        category: b.category,
        tags: b.tags,
        author: b.author,
        readMinutes: b.readMinutes,
        date: b.date,
        publishedAt: new Date(b.publishedAt),
        quote: b.quote ?? null,
        relatedTourSlug: b.relatedTourSlug ?? null,
        featured: b.featured ?? false,
      },
      create: {
        slug: b.slug,
        title: b.title,
        cover: b.cover,
        excerpt: b.excerpt,
        body: b.body,
        category: b.category,
        tags: b.tags,
        author: b.author,
        readMinutes: b.readMinutes,
        date: b.date,
        publishedAt: new Date(b.publishedAt),
        quote: b.quote ?? null,
        relatedTourSlug: b.relatedTourSlug ?? null,
        featured: b.featured ?? false,
      },
    });
  }
  console.log(`✓ Blogs seeded: ${blogSeeds.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

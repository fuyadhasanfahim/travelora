import type { Blog, Tour } from "@prisma/client";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Travelora",
    url: SITE,
    logo: `${SITE}/brand/logo.svg`,
    sameAs: [
      "https://twitter.com/travelora",
      "https://facebook.com/travelora",
      "https://instagram.com/travelora",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TourJsonLd({ tour }: { tour: Tour }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.overview,
    image: `${SITE}${tour.image}`,
    touristType: tour.category,
    itinerary: {
      "@type": "ItemList",
      itemListElement: (tour.plan as unknown as { day: string; title: string }[]).map(
        (p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${p.day} — ${p.title}`,
        }),
      ),
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE}/tours/${tour.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviews,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({ blog }: { blog: Blog }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: `${SITE}${blog.cover}`,
    datePublished: blog.publishedAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: { "@type": "Person", name: blog.author },
    publisher: {
      "@type": "Organization",
      name: "Travelora",
      logo: { "@type": "ImageObject", url: `${SITE}/brand/logo.svg` },
    },
    mainEntityOfPage: `${SITE}/blog/${blog.slug}`,
    keywords: blog.tags.join(", "),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

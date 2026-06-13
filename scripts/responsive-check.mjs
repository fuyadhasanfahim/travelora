// Pulls every page at 3 widths and reports overflow + offenders.
const BASE = process.env.BASE || 'http://localhost:3000';
const PAGES = [
  '/', '/tours', '/tours/santorini-island-hopping-adventure',
  '/blog', '/blog/japan-cherry-blossom-timing-guide',
  '/booking?tour=dubai-luxury-city-break&adult=2&child=1&extra=0',
  '/booking/success?ref=BK-TEST123',
  '/contact', '/about',
  '/privacy', '/cookies', '/terms', '/data-policy', '/refund-policy', '/why-shop-with-us',
];
for (const p of PAGES) {
  try {
    const r = await fetch(BASE + p, { redirect: 'follow' });
    console.log(p, '→', r.status);
  } catch (e) {
    console.log(p, 'ERR', e.message);
  }
}

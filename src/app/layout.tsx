import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/app-providers';
import { OrganizationJsonLd } from '@/components/seo/json-ld';

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Travelora — Unveil the beauty of the World',
        template: '%s · Travelora',
    },
    description:
        'Travelora — discover, plan and book unforgettable tours and travel experiences around the world.',
    applicationName: 'Travelora',
    keywords: ['travel', 'tours', 'booking', 'destinations', 'travel agency', 'travelora'],
    openGraph: {
        type: 'website',
        siteName: 'Travelora',
        title: 'Travelora — Unveil the beauty of the World',
        description:
            'Discover, plan and book unforgettable tours and travel experiences around the world.',
        url: siteUrl,
        images: [{ url: '/brand/logo.svg', alt: 'Travelora' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Travelora — Unveil the beauty of the World',
        description:
            'Discover, plan and book unforgettable tours and travel experiences around the world.',
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${poppins.variable} antialiased`}>
            <body className="flex min-h-screen flex-col">
                <OrganizationJsonLd />
                <AppProviders>
                    <main className="flex-1 pt-20">{children}</main>
                </AppProviders>
            </body>
        </html>
    );
}

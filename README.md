# ✈️ Travelora — Premium Travel Booking & Exploration Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://travelora-eight.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8.0-blueviolet?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=neon)](https://neon.tech/)

Travelora is a premium, high-performance, and fully responsive travel planning, booking, and blogging platform built using Next.js 16, React 19, Tailwind CSS v4, and Prisma with Neon PostgreSQL. It is designed to deliver a visually stunning and friction-free user experience for travellers looking to discover packages, plan trips, book tours, and read insightful travel journals.

---

## 🚀 Key Features

*   **Stunning Interactive UI/UX**: Premium aesthetic featuring glassmorphism, responsive grids, gradients, and micro-animations built using Tailwind CSS v4 and Framer Motion.
*   **Dynamic Tour Package Discovery**:
    *   Filter and explore tours by category (Beach, Mountain, Adventure, Tropical, Desert, Wildlife, City, Cruise, Cultural, Honeymoon).
    *   Search and sort packages based on price, rating, and duration.
*   **Comprehensive Tour Details**:
    *   Day-by-day interactive itinerary mapping.
    *   Detailed summaries of highlights, inclusion/exclusion lists, tour guide language, and group size limit details.
    *   Dynamic media gallery showing realistic photos of the destinations.
*   **Advanced Booking Engine**:
    *   Real-time price calculation based on the count of adults, children, and optional tour extras.
    *   Generates unique reference numbers (`BK-XXXX`) for bookings.
*   **Fully Integrated Transactional Email Flows**:
    *   Automated HTML emails sent via the Resend API with custom templates built using React Email.
    *   Sends instant booking confirmation receipts to users and real-time alerts to administrators.
*   **Rich Travel Blog**:
    *   A dedicated writing corner with categories, reading durations, tags, and direct links to related tour packages.
*   **Secure & Robust Backend**:
    *   TypeScript-first development.
    *   Strict runtime environment validation using Zod (`src/env.ts`).
    *   Robust client API rate-limiting to prevent spam on booking and newsletter endpoints.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI/UX**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
*   **Database & ORM**: [Neon Serverless PostgreSQL](https://neon.tech/), [Prisma ORM 7.8.0](https://www.prisma.io/)
*   **Email Client**: [Resend](https://resend.com/) & [React Email](https://react.email/)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (for client-side UI states)
*   **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
*   **Validation**: [Zod](https://zod.dev/)
*   **Notifications**: [Sonner](https://react-hot-toast.com/) (Toast messages)

---

## 📁 File Structure Overview

```bash
travelora/
├── prisma/                 # Database schema and seed files
│   ├── schema.prisma       # Prisma data model definition (PostgreSQL)
│   └── seed.ts             # Realistic tour, blog, and category seed script
├── src/
│   ├── app/                # Next.js App Router folders
│   │   ├── (root)/         # Site routes (Home, Tours, Bookings, Blog, Legal)
│   │   └── api/            # API Endpoints (Tours, Bookings, Contacts, Newsletter)
│   ├── components/         # Modular and reusable UI components
│   │   ├── home/           # Homepage sections (Hero, Popular Packages, Testimonials)
│   │   ├── tour-details/   # Tour detail page sections and Booking Form
│   │   ├── ui/             # Core UI components (Select, Pagination, Skeletons)
│   │   └── footer.tsx / navbar.tsx
│   ├── emails/             # React Email templates (Confirmation, Notifications, Receipts)
│   ├── lib/                # Shared utilities, database config, and validators
│   ├── providers/          # React Query and Client-side providers
│   ├── stores/             # Zustand global state stores
│   └── env.ts              # Strongly typed configuration schema (Zod environment)
└── .env.example            # Environment variables template
```

---

## ⚙️ Getting Started & Local Setup

To run Travelora on your local machine, follow these steps:

### Prerequisites

Make sure you have **Node.js** (v18+) and **npm** or **pnpm** installed on your system.

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/yourusername/travelora.git
cd travelora
pnpm install
# or: npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file and create a `.env` file at the root of the project:

```bash
cp .env.example .env
```

Open `.env` and fill in the required keys:
*   `DATABASE_URL`: Your PostgreSQL connection string (e.g. from a free Neon PostgreSQL database).
*   `RESEND_API_KEY`: API key from your [Resend Dashboard](https://resend.com/) to enable transactional emails.
*   `NEXT_PUBLIC_SITE_URL`: Set to `http://localhost:3000` for local development.

### 3. Setup Database Schema and Seeds

Since we are using Prisma, run the following commands to generate the Prisma client, push the tables to your database, and seed the default tours & blogs:

```bash
# Generate the Prisma client
pnpm db:generate

# Sync schema with database directly
pnpm db:push

# Seed realistic packages, blogs, and categories into the database
pnpm db:seed
```

### 4. Run the Development Server

Start the local server by running:

```bash
pnpm dev
# or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application running locally!

---

## 🗃️ Database Models (Prisma Schema)

The database schema (`prisma/schema.prisma`) consists of the following key tables:

*   **`Tour`**: Stores details of tour packages, duration, price, highlights, itinerary plan, category, rating, and image gallery.
*   **`Blog`**: Stores travel articles, category tags, author profiles, and related tour links.
*   **`Booking`**: Captures passenger information, selected tour reference, custom requests, counts of passengers, coupon details, and pricing summary.
*   **`Payment`**: Captures transaction reference, amount, payment method (Stripe/PayPal/Bank), and status (Paid/Failed/Pending).
*   **`Contact`**: Captures message forms submitted by visitors.
*   **`NewsletterSubscriber`**: Stores active/unsubscribed emails for newsletter updates.

---

## 💻 Available Scripts

You can run the following scripts using your package manager (`pnpm` or `npm run`):

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev` | Launches the hot-reloading development server |
| `build` | `next build` | Compiles the production application bundle |
| `start` | `next start` | Starts the production server after compilation |
| `lint` | `eslint` | Runs code checks using ESLint |
| `typecheck` | `tsc --noEmit` | Runs compilation tests to verify TypeScript safety |
| `db:generate` | `prisma generate` | Generates the Prisma client types |
| `db:push` | `prisma db push` | Pushes local prisma schema changes to the remote database |
| `db:migrate` | `prisma migrate dev` | Performs local schema modifications with tracking migrations |
| `db:studio` | `prisma studio` | Opens a web page to view and edit database rows visually |
| `db:seed` | `tsx prisma/seed.ts` | Runs the database seeding script |

---

## 📧 Email Templates Preview

Travelora includes beautiful, customizable responsive email templates powered by **React Email** under `src/emails/`:
*   `booking-received.tsx`: Sent to customer confirming that booking is received and is pending.
*   `booking-confirmation.tsx`: Sent to customer once payment is verified and booking is active.
*   `admin-booking-notification.tsx`: Alert sent to administrative staff about a new incoming booking.
*   `admin-contact-notification.tsx`: Sent to admins when a user submits the Contact Form.
*   `newsletter-welcome.tsx`: Welcome greeting to new newsletter subscribers.
*   `payment-receipt.tsx`: Standard payment confirmation receipt.

---

## 🛡️ License

This project is private and proprietary. All rights reserved.

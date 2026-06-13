import { z } from "zod";

// ─── Tours query ─────────────────────────────────────────────────────────
export const toursQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  category: z.string().trim().max(200).optional(), // comma-separated lowercase
  destination: z.string().trim().max(200).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxPrice: z.coerce.number().int().min(0).max(100000).optional(),
  featured: z
    .union([z.literal("true"), z.literal("false")])
    .transform((v) => v === "true")
    .optional(),
  sort: z.enum(["popular", "price-low", "price-high", "rating"]).default("popular"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(6),
});
export type ToursQuery = z.infer<typeof toursQuerySchema>;

// ─── Blogs query ─────────────────────────────────────────────────────────
export const blogsQuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  category: z.string().trim().max(120).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(24).default(6),
});
export type BlogsQuery = z.infer<typeof blogsQuerySchema>;

// ─── Booking ─────────────────────────────────────────────────────────────
export const bookingSchema = z.object({
  tourSlug: z.string().min(1, "Tour is required"),
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().email("Enter a valid email").max(160),
  phone: z.string().trim().min(6, "Enter a valid phone").max(40),
  address: z.string().trim().max(240).optional().default(""),
  city: z.string().trim().max(80).optional().default(""),
  zip: z.string().trim().max(20).optional().default(""),
  province: z.string().trim().max(80).optional().default(""),
  country: z.string().trim().min(1, "Country is required").max(80),
  startDate: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
    message: "Invalid start date",
  }),
  endDate: z
    .string()
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), { message: "Invalid end date" })
    .optional(),
  adults: z.coerce.number().int().min(1).max(20),
  children: z.coerce.number().int().min(0).max(20),
  extras: z.boolean().default(false),
  requirements: z.string().max(2000).optional().default(""),
  couponCode: z.string().max(40).optional().default(""),
  acceptTerms: z.literal(true, { message: "Please accept the terms" }),
});
export type BookingInput = z.input<typeof bookingSchema>;
export type BookingOutput = z.output<typeof bookingSchema>;

// ─── Contact ─────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().email("Enter a valid email").max(160),
  subject: z.string().trim().min(1, "Subject is required").max(180),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
  turnstileToken: z.string().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

// ─── Newsletter ──────────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email").max(160),
  source: z.string().max(60).optional(),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ─── Payment ─────────────────────────────────────────────────────────────
export const paymentSchema = z.object({
  bookingReference: z.string().min(1),
  method: z.enum(["bank", "paypal", "stripe", "cash"]),
});
export type PaymentInput = z.infer<typeof paymentSchema>;

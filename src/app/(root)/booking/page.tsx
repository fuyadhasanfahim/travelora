import type { Metadata } from "next";
import { Suspense } from "react";
import PaymentHero from "@/components/payment/payment-hero";
import PaymentForm from "@/components/payment/payment-form";
import SocialUpdates from "@/components/home/social-updates";

export const metadata: Metadata = {
  title: "Checkout — Travelora",
  description: "Complete your booking with Travelora. Enter your details and choose a payment method.",
};

export default function BookingPage() {
  return (
    <>
      <PaymentHero />
      <Suspense fallback={null}>
        <PaymentForm />
      </Suspense>
      <SocialUpdates />
    </>
  );
}

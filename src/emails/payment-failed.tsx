import * as React from "react";
import { Link, Text } from "@react-email/components";
import { BrandLayout } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export default function PaymentFailed({
  firstName,
  bookingRef,
}: {
  firstName: string;
  bookingRef: string;
}) {
  return (
    <BrandLayout
      preview={`Payment failed for booking ${bookingRef}`}
      title={`Hi ${firstName} — your payment didn't go through`}
    >
      <Text>
        Unfortunately, your payment for booking <strong>{bookingRef}</strong>{" "}
        wasn't successful. Don't worry — your booking is held for the next 24
        hours while you try again.
      </Text>
      <Text>
        <Link href={`${SITE}/booking?ref=${bookingRef}`} className="text-[#001c8e]">
          Retry payment
        </Link>{" "}
        or reply to this email and we'll help.
      </Text>
    </BrandLayout>
  );
}

import * as React from "react";
import { Link, Text } from "@react-email/components";
import { BrandLayout } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export default function NewsletterWelcome() {
  return (
    <BrandLayout
      preview="Welcome to the Travelora list — handpicked trips, every week"
      title="Welcome to Travelora"
    >
      <Text>
        Thanks for subscribing! Once a week we send a short briefing — one
        destination idea, one practical travel tip and one curated tour with
        availability.
      </Text>
      <Text>
        While you wait, take a look at our{" "}
        <Link href={`${SITE}/tours`} className="text-[#001c8e]">
          most popular tours
        </Link>
        .
      </Text>
    </BrandLayout>
  );
}

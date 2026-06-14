import * as React from "react";
import { BrandLayout, BodyText, CtaButton } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export default function NewsletterWelcome() {
  return (
    <BrandLayout
      preview="Welcome to Travelora — handpicked trips, every week"
      title="Welcome aboard."
      intro="One destination idea, one practical travel tip, one curated tour with live availability — every week."
    >
      <BodyText>
        We promise: no spam, no fluff, no &quot;Sign up for 5% off!&quot;
        nonsense. Just travel ideas worth your inbox.
      </BodyText>

      <CtaButton href={`${SITE}/tours`}>See our most-loved tours</CtaButton>
    </BrandLayout>
  );
}

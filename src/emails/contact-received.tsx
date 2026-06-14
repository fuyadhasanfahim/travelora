import * as React from "react";
import { BrandLayout, BodyText, CtaButton } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export default function ContactReceived({ name }: { name: string }) {
  return (
    <BrandLayout
      preview={`Hi ${name} — we received your message`}
      title={`Thanks for reaching out, ${name}.`}
      intro="A real human will reply — usually within one business day."
    >
      <BodyText>
        If your trip is time-sensitive, mention it in your reply and we&apos;ll
        bump you to the top of the queue.
      </BodyText>
      <BodyText>— The Travelora team</BodyText>

      <CtaButton href={`${SITE}/tours`}>Browse our tours</CtaButton>
    </BrandLayout>
  );
}

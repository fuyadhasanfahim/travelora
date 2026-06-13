import * as React from "react";
import { Text } from "@react-email/components";
import { BrandLayout } from "./_layout";

export default function ContactReceived({ name }: { name: string }) {
  return (
    <BrandLayout
      preview={`Hi ${name} — we received your message`}
      title={`Thanks for reaching out, ${name}`}
    >
      <Text>
        We've received your message and our team usually replies within one
        business day. If your trip is time-sensitive, mention it in your reply
        and we'll prioritise.
      </Text>
      <Text>— The Travelora team</Text>
    </BrandLayout>
  );
}

import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BrandLayout, Detail } from "./_layout";

export default function AdminContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return (
    <BrandLayout
      preview={`New contact: ${subject}`}
      title="New contact form submission"
    >
      <Section className="my-4 rounded-xl bg-[#f6f7fb] p-4">
        <Detail label="From" value={`${name} <${email}>`} />
        <Detail label="Subject" value={subject} />
      </Section>
      <Text style={{ whiteSpace: "pre-wrap" }}>{message}</Text>
    </BrandLayout>
  );
}

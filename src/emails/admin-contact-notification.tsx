import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BrandLayout, SummaryCard, Detail, BRAND } from "./_layout";

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
      intro={`From ${name} <${email}>`}
    >
      <SummaryCard title="Submission">
        <Detail label="From" value={`${name} <${email}>`} />
        <Detail label="Subject" value={subject} />
      </SummaryCard>

      <Section
        style={{
          marginTop: "20px",
          padding: "20px 22px",
          backgroundColor: "#ffffff",
          border: `1px solid ${BRAND.hairline}`,
          borderRadius: "16px",
        }}
      >
        <Text
          style={{
            margin: "0 0 8px",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: BRAND.navy,
          }}
        >
          Message
        </Text>
        <Text
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: 1.7,
            color: BRAND.ink,
          }}
        >
          {message}
        </Text>
      </Section>
    </BrandLayout>
  );
}

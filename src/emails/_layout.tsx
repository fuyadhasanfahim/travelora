/* Shared brand layout for all Travelora emails. */
import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export function BrandLayout({
  preview,
  title,
  children,
}: {
  preview: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f7fb] font-sans text-[#1f2235]">
          <Container className="mx-auto max-w-[600px] rounded-2xl bg-white p-8 shadow-sm">
            <Section>
              <Img
                src={`${SITE}/brand/logo.svg`}
                alt="Travelora"
                width="160"
                height="32"
              />
            </Section>
            <Hr className="my-6 border-t border-[#eef0f7]" />
            <Heading className="text-[22px] font-semibold text-[#001c8e]">
              {title}
            </Heading>
            {children}
            <Hr className="my-8 border-t border-[#eef0f7]" />
            <Text className="text-[12px] text-[#888da8]">
              You're receiving this email because you interacted with Travelora.
              Visit{" "}
              <Link href={SITE} className="text-[#001c8e]">
                travelora.app
              </Link>{" "}
              or reply to this email if you need help.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Text className="my-1 text-[14px]">
      <span style={{ color: "#888da8" }}>{label}: </span>
      <strong>{value}</strong>
    </Text>
  );
}

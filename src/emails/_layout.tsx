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
  Button,
  Row,
  Column,
} from "@react-email/components";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

const BRAND = {
  navy: "#001c8e",
  primary: "#febc12",
  primaryDark: "#fcb017",
  amberSoft: "#ffb71f",
  ink: "#373737",
  muted: "#8d8fa3",
  surface: "#f6f7fb",
  card: "#ffffff",
  hairline: "#eef0f7",
};

/* ───── Layout ───── */
export function BrandLayout({
  preview,
  title,
  intro,
  children,
}: {
  preview: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head>
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body
          style={{ backgroundColor: BRAND.surface, margin: 0, padding: 0 }}
          className="font-sans"
        >
          <Container className="mx-auto my-0 w-full max-w-[640px] px-4 py-8">
            {/* ── Hero panel — navy with logo + tag ── */}
            <Section
              style={{
                backgroundColor: BRAND.navy,
                backgroundImage: `linear-gradient(135deg, ${BRAND.navy} 0%, #001463 100%)`,
                borderRadius: "24px 24px 0 0",
                padding: "32px 32px 28px",
                color: "#ffffff",
              }}
            >
              <Row>
                <Column>
                  <Img
                    src={`${SITE}/brand/logo-white.svg`}
                    alt="Travelora"
                    width="148"
                    height="28"
                    style={{ display: "block" }}
                  />
                </Column>
                <Column align="right">
                  <Text
                    style={{
                      margin: 0,
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: BRAND.amberSoft,
                      fontWeight: 600,
                    }}
                  >
                    Travelora
                  </Text>
                </Column>
              </Row>

              <Heading
                as="h1"
                style={{
                  margin: "26px 0 6px",
                  fontSize: "26px",
                  lineHeight: 1.25,
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {title}
              </Heading>
              {intro && (
                <Text
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#c2cdf8",
                  }}
                >
                  {intro}
                </Text>
              )}
            </Section>

            {/* ── Amber accent stripe — bridge between hero and body ── */}
            <Section
              style={{
                backgroundColor: BRAND.primary,
                backgroundImage: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.amberSoft} 100%)`,
                height: "4px",
                lineHeight: "4px",
                fontSize: 0,
              }}
            >
              &nbsp;
            </Section>

            {/* ── Body card ── */}
            <Section
              style={{
                backgroundColor: BRAND.card,
                borderRadius: "0 0 24px 24px",
                padding: "32px",
                color: BRAND.ink,
                boxShadow: "0 18px 40px -28px rgba(0, 28, 142, 0.25)",
              }}
            >
              {children}
            </Section>

            {/* ── Footer ── */}
            <Section style={{ padding: "24px 8px 4px", textAlign: "center" }}>
              <Text
                style={{
                  margin: "0 0 8px",
                  fontSize: "12px",
                  color: BRAND.muted,
                  lineHeight: 1.6,
                }}
              >
                You&apos;re receiving this email because you interacted with Travelora.
                <br />
                Need help? Just reply — we read every message.
              </Text>
              <Text style={{ margin: "12px 0 0", fontSize: "12px", color: BRAND.muted }}>
                <Link href={SITE} style={{ color: BRAND.navy, fontWeight: 600 }}>
                  travelora.app
                </Link>
                {" · "}
                <Link href={`${SITE}/privacy`} style={{ color: BRAND.muted }}>
                  Privacy
                </Link>
                {" · "}
                <Link href={`${SITE}/terms`} style={{ color: BRAND.muted }}>
                  Terms
                </Link>
              </Text>
              <Text style={{ margin: "12px 0 0", fontSize: "11px", color: "#b1b3c5" }}>
                © {new Date().getFullYear()} Travelora · All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

/* ───── Reusable bits ───── */

export function SummaryCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Section
      style={{
        backgroundColor: BRAND.surface,
        borderRadius: "16px",
        padding: "20px 22px",
        margin: "18px 0 0",
        border: `1px solid ${BRAND.hairline}`,
      }}
    >
      {title && (
        <Text
          style={{
            margin: "0 0 10px",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: BRAND.navy,
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </Section>
  );
}

export function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: "6px" }}>
      <Column style={{ width: "40%", verticalAlign: "top" }}>
        <Text
          style={{
            margin: 0,
            fontSize: "13px",
            color: BRAND.muted,
            lineHeight: 1.5,
          }}
        >
          {label}
        </Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        <Text
          style={{
            margin: 0,
            fontSize: "14px",
            color: BRAND.ink,
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          {value}
        </Text>
      </Column>
    </Row>
  );
}

export function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Section style={{ textAlign: "center", padding: "24px 0 4px" }}>
      <Button
        href={href}
        style={{
          backgroundColor: BRAND.primary,
          backgroundImage: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.amberSoft} 100%)`,
          color: "#1a1a1a",
          padding: "14px 30px",
          borderRadius: "999px",
          fontSize: "15px",
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-block",
          boxShadow: "0 12px 26px -10px rgba(254, 188, 18, 0.9)",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}

export function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 14px",
        fontSize: "15px",
        lineHeight: 1.7,
        color: BRAND.ink,
      }}
    >
      {children}
    </Text>
  );
}

export function Divider() {
  return (
    <Hr
      style={{
        borderTop: `1px solid ${BRAND.hairline}`,
        margin: "22px 0",
      }}
    />
  );
}

export { BRAND };

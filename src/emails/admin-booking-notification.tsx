import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BrandLayout, Detail } from "./_layout";

export type AdminBookingNotificationProps = {
  reference: string;
  tourTitle: string;
  customer: string;
  email: string;
  phone: string;
  startDate: string;
  travellers: string;
  total: number;
};

export default function AdminBookingNotification({
  reference,
  tourTitle,
  customer,
  email,
  phone,
  startDate,
  travellers,
  total,
}: AdminBookingNotificationProps) {
  return (
    <BrandLayout
      preview={`New booking ${reference} — ${customer}`}
      title="New booking received"
    >
      <Text>A new booking just landed in the system.</Text>
      <Section className="my-4 rounded-xl bg-[#f6f7fb] p-4">
        <Detail label="Reference" value={reference} />
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Customer" value={customer} />
        <Detail label="Email" value={email} />
        <Detail label="Phone" value={phone} />
        <Detail label="Start" value={startDate} />
        <Detail label="Travellers" value={travellers} />
        <Detail label="Total" value={`$${total}`} />
      </Section>
    </BrandLayout>
  );
}

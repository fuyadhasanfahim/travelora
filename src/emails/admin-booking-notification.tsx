import * as React from "react";
import { BrandLayout, BodyText, SummaryCard, Detail } from "./_layout";

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
      intro={`Reference ${reference} just landed in the system.`}
    >
      <SummaryCard title="Booking">
        <Detail label="Reference" value={reference} />
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Customer" value={customer} />
        <Detail label="Email" value={email} />
        <Detail label="Phone" value={phone} />
        <Detail label="Start" value={startDate} />
        <Detail label="Travellers" value={travellers} />
        <Detail label="Total" value={`$${total}`} />
      </SummaryCard>

      <BodyText>
        Confirm availability with the local partner and update the booking
        status when ready.
      </BodyText>
    </BrandLayout>
  );
}

import { redirect } from "next/navigation";

// "Payment Information" lives at /booking now (the Booking → Checkout step).
export default function PaymentPage() {
  redirect("/booking");
}

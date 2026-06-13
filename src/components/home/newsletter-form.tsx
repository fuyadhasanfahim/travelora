"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation/schemas";
import { useSubscribeNewsletter } from "@/lib/query/hooks";

export default function NewsletterForm({ source = "footer" }: { source?: string }) {
  const subscribe = useSubscribeNewsletter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { source },
  });

  const onSubmit = async (values: NewsletterInput) => {
    try {
      await subscribe.mutateAsync({ ...values, source });
      toast.success("You're subscribed — thanks!");
      reset({ email: "", source });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Subscription failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md items-center gap-2 rounded-full bg-white p-1.5 shadow-sm"
      aria-label="Newsletter subscription"
    >
      <input
        type="email"
        placeholder="Your mail address"
        aria-label="Your mail address"
        {...register("email")}
        className={`min-w-0 flex-1 bg-transparent px-4 text-sm outline-none ${
          errors.email ? "text-rose-600 placeholder:text-rose-300" : "text-ink placeholder:text-[#c5c5c5]"
        }`}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="shrink-0 rounded-full bg-navy px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-navy/90 disabled:opacity-60"
      >
        {isSubmitting ? <IconLoader2 className="size-4 animate-spin" stroke={2} /> : "Subscribe"}
      </button>
    </form>
  );
}

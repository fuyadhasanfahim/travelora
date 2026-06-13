import { TourGridSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-[292px_1fr] lg:gap-10">
          <div className="h-[500px] animate-pulse rounded-3xl bg-black/[0.06]" />
          <TourGridSkeleton count={6} />
        </div>
      </div>
    </section>
  );
}

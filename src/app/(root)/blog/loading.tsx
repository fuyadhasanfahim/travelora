import { BlogListSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-content">
        <BlogListSkeleton count={6} />
      </div>
    </section>
  );
}

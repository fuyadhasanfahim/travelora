import { cn } from "@/lib/cn";

export function Skeleton({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-black/[0.06]",
        className,
      )}
      aria-hidden
      {...rest}
    />
  );
}

export function TourCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_-22px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.04]">
      <Skeleton className="aspect-[397/269] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="mt-2 flex items-center justify-between border-t border-black/[0.06] pt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function TourGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <TourCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TourDetailSkeleton() {
  return (
    <div className="container-content space-y-8 py-12">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="aspect-[16/8] w-full rounded-3xl" />
      <div className="grid gap-10 lg:grid-cols-[1fr_397px]">
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-[420px] w-full rounded-3xl" />
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_16px_45px_-28px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.05]">
      <Skeleton className="aspect-[608/350] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="mt-4 h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className="container-content space-y-6 py-12">
      <Skeleton className="aspect-[819/461] w-full rounded-[28px]" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}

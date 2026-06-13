import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center px-6 py-20">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-navy">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#373737] sm:text-4xl">
          Lost in transit
        </h1>
        <p className="mt-3 text-base text-[#8e8e8e]">
          The page you&apos;re looking for has either moved or never existed.
          Let&apos;s get you back on the road.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}

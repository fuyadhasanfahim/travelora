"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[60vh] place-items-center px-6 py-20">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#373737] sm:text-4xl">
          We hit a turbulence
        </h1>
        <p className="mt-3 text-base text-[#8e8e8e]">
          Try again in a moment. If the issue persists, please contact our support.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary-dark"
        >
          Try again
        </button>
        {error.digest && (
          <p className="mt-4 text-xs text-[#a1a1a1]">Error id: {error.digest}</p>
        )}
      </div>
    </section>
  );
}

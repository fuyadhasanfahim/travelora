import Hero from "@/components/home/hero";
import PopularDestination from "@/components/home/popular-destination";
import PopularPackages from "@/components/home/popular-packages";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularDestination />
      <PopularPackages />
      {/* Next sections (Banner, Category, …) build here */}
    </>
  );
}

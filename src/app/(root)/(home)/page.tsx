import Hero from "@/components/home/hero";
import PopularDestination from "@/components/home/popular-destination";
import PopularPackages from "@/components/home/popular-packages";
import TopCategories from "@/components/home/top-categories";
import WhyTravel from "@/components/home/why-travel";
import BookSchedule from "@/components/home/book-schedule";
import Testimonial from "@/components/home/testimonial";
import Blog from "@/components/home/blog";
import SocialUpdates from "@/components/home/social-updates";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularDestination />
      <PopularPackages />
      <TopCategories />
      <WhyTravel />
      <BookSchedule />
      <Testimonial />
      <Blog />
      <SocialUpdates />
    </>
  );
}

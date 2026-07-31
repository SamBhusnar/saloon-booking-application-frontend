import React from "react";
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import HowItWorks from "../components/home/HowItWorks";
import CategorySection from "../components/home/CategorySection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/home/Footer";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <CategorySection />
      <CTASection />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

export default HomePage;

"use client";

import React from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import VideoTestimonial from "./components/VideoTestimonial";
import KeywordsMarquee from "./components/KeywordsMarquee";
import CaseStudies from "./components/CaseStudies";
import StatsCards from "./components/StatsCards";
import About from "./components/About";
import CtaBlock from "./components/CtaBlock";

export default function Home() {
  return (
    <>
      <Hero dark={false} />
      <Services />
      <VideoTestimonial />
      <KeywordsMarquee />
      <CaseStudies />
      <StatsCards />
      <About />
      <CtaBlock />
    </>
  );
}


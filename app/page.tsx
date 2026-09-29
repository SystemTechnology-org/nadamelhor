import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { DropEditorialSection } from "@/components/home/DropEditorialSection";
import { BrandManifestoSection } from "@/components/home/BrandManifestoSection";
import { InstagramGridSection } from "@/components/home/InstagramGridSection";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section: Impactful editorial full-screen hero */}
      <HeroSection />

      {/* 2. New Arrivals Grid: 4 items desktop / 2 items mobile */}
      <NewArrivalsSection />

      {/* 3. Drop 01 Feature: Big editorial campaign presentation */}
      <DropEditorialSection />

      {/* 4. Brand Manifesto: Negative space & philosophy */}
      <BrandManifestoSection />

      {/* 5. Instagram Feed Grid: Community visual feed @nadamelh0r */}
      <InstagramGridSection />
    </div>
  );
}

import LandingNavbar from "../components/layout/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import TrustBar from "../components/landing/TrustBar";
import FeaturesSection from "../components/landing/FeaturesSection";
import LandingCta from "../components/landing/LandingCta";
import LandingFooter from "../components/landing/LandingFooter";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2] font-sans text-[#292524]">
      <LandingNavbar />
      <HeroSection />
      <TrustBar />
      <FeaturesSection />
      <LandingCta />
      <LandingFooter />
    </main>
  );
}



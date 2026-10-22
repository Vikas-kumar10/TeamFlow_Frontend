import LandingNavbar from "../components/layout/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";
import FeaturesSection from "../components/landing/FeaturesSection";

export function Features() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2] font-sans text-[#292524]">
      <LandingNavbar />
      <FeaturesSection />
      <LandingFooter />
    </main>
  );
}



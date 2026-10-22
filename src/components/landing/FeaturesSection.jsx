import FeatureCards from "./FeatureCards";
import FeatureSticker from "./FeatureSticker";

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20" id="features">
      <div className="mb-10 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:mb-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#C2410C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FB923C]" />
            BUILT AROUND YOUR TEAM'S WORK
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-0.05em] text-[#292524] sm:text-5xl lg:text-6xl">
            From first plan
            <br />
            to final check.
          </h2>
          
        </div>
        <FeatureSticker />
      </div>
      <FeatureCards />
    </section>
  );
}

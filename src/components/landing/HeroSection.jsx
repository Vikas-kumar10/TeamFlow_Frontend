import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import ProductPreview from "./ProductPreview";
export default function HeroSection() {
  return (
    <section
      className="mx-auto grid min-h-600px max-w-7xl items-start gap-12 px-5 py-16 sm:px-8 lg:h-680px lg:grid-cols-2 lg:items-stretch lg:py-10"
      id="platform"
    >
      <div className="text-center lg:h-full lg:text-left">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-stone-600 lg:mx-0">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-[#C2410C]">
            <Sparkles size={13} />
          </span>{" "}
          PROJECTS · TASKS · TEAMWORK
        </div>
        <h1 className="text-5xl font-bold leading-[1.04] tracking-[-0.055em] text-[#292524] sm:text-6xl lg:text-[68px]">
          Your team's work,
          <br />
          moving <span className="text-[#C2410C]">forward.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-stone-600 sm:text-base lg:mx-0">
          Plan projects, assign tasks, and see progress at a glance. TeamFlow
          gives managers and members one shared place to keep work on track.
        </p>
        <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/15 transition hover:bg-[#15803D]"
            to="/signup"
          >
            Create your workspace <ArrowRight size={16} />
          </Link>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-[#C2410C]"
            to="/login"
          >
            Log in to TeamFlow <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3 text-xs font-medium text-stone-600 lg:justify-start">
          <div className="flex -space-x-2">
            <i className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#FAF7F2] bg-orange-200 text-orange-900">
              <Check size={12} />
            </i>
            <i className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#FAF7F2] bg-amber-200 text-amber-900">
              <Check size={12} />
            </i>
            <i className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#FAF7F2] bg-green-100 text-green-800">
              <Check size={12} />
            </i>
          </div>
          <span>One workspace for your whole team</span>
        </div>
      </div>
      <div className="relative mx-auto flex h-full w-full max-w-2xl items-start lg:h-680px]">
        <div className="absolute -left-8 top-8 -z-10 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-8 right-0 -z-10 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />
        <ProductPreview />
        <div className="absolute -right-2 top-0 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-lg sm:-right-4">
          <span className="text-[#FB923C]">✦</span> One team. One flow.
        </div>
      </div>
    </section>
  );
}

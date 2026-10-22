import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function LandingCta() {
  return (
    <section
      className="relative mx-4 mb-10 overflow-hidden rounded-2xl bg-[#C2410C] px-5 py-14 text-center text-white sm:mx-8 sm:py-16"
      id="about"
    >
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/15" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/15" />
      
      <span className="text-[10px] font-bold tracking-[0.16em] text-orange-100">
        PROJECTS, TASKS, AND TEAM PROGRESS
      </span>
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
        Give your team
        <br />a clearer way forward.
      </h2>
      <p className="mb-6 mt-3 text-sm text-orange-100">
        Set up your TeamFlow workspace and bring your work into view.
      </p>
      <Link
        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#C2410C] shadow-lg transition hover:bg-[#15803D] hover:text-white"
        to="/signup"
      >
        Create your workspace <ArrowRight size={16} />
      </Link>
      <small className="mt-4 block text-xs text-orange-100">
        Already have a TeamFlow account?{" "}
        <Link className="text-white underline underline-offset-2" to="/login">
          Log in
        </Link>
      </small>
    </section>
  );
}

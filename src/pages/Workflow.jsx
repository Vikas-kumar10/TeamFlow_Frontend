
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { ArrowDownRight, ClipboardList } from "lucide-react";

import WorkflowSteps from "../components/landing/WorkflowSteps";
import LandingNavbar from "../components/layout/LandingNavbar";
import LandingFooter from "../components/landing/LandingFooter";
import FeatureSticker from "../components/landing/FeatureSticker";



export function Workflow() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2] font-sans text-[#292524]">
      <LandingNavbar />

      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {/* Decorative background */}
        <div className="pointer-events-none absolute right-0 top-24  h-56 w-56 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 left-0  h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />

        {/* Hero */}
        <div className="relative z-10 grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#C2410C] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
              HOW TEAMFLOW WORKS
            </span>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.12] tracking-0.05em text-[#292524] sm:text-6xl">
              From a clear plan to{" "}
              <span className="text-[#C2410C]">
                work getting done.
              </span>
            </h1>

            {/* <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              Bring projects, task owners, and progress together in one
              shared workspace. Everyone knows what needs attention
              and what comes next.
            </p> */}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-10 justify-self-start sm:justify-self-end"
          >
            <FeatureSticker />
          </motion.div>
        </div>

        {/* Section heading */}
        <div className="relative z-10 mb-7 mt-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#C2410C]">
              A SIMPLE WORKFLOW
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#292524] sm:text-3xl">
              Three steps. Better teamwork.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-stone-500">
            Everything your team needs to move from ideas to results.
          </p>
        </div>

        <WorkflowSteps />
        {/* Bottom callout */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 mt-8 flex flex-col gap-4 overflow-hidden rounded-3xl border border-orange-200 bg-[#FFF1E8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#C2410C] text-white shadow-md shadow-orange-900/10">
              <ClipboardList size={21} />
            </span>

            <div>
              <h3 className="text-base font-bold text-[#292524] sm:text-lg">
                Ready to bring your team's work together?
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Make project planning clearer and progress easier to follow.
              </p>
            </div>
          </div>

          <motion.a
            href="/register"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/10 transition-colors hover:bg-[#15803D]"
          >
            Get started
            <ArrowDownRight size={16} />
          </motion.a>
        </motion.div>
      </section>

      <LandingFooter />
    </main>
  );
}





import { motion, useReducedMotion } from "framer-motion";

const trustItems = [
  { label: "Project planning" },
  { label: "Task ownership", className: "font-serif italic" },
  { label: "Kanban boards" },
  { label: "TEAM INSIGHTS", className: "text-sm tracking-[0.12em]" },
  { label: "Activity & alerts", className: "font-serif italic" },
];

export default function TrustBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-y border-[#E7E5E4] bg-white px-5 py-10 text-center sm:px-8" id="workflow">
      <span className="text-[10px] font-bold tracking-[0.16em] text-[#C2410C]">
        THE ESSENTIALS FOR KEEPING TEAMWORK ON TRACK
      </span>
      {prefersReducedMotion ? (
        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-9 gap-y-4 text-base font-bold tracking-tight text-stone-500 sm:text-lg">
          {trustItems.map((item) => (
            <b className={item.className} key={item.label}>{item.label}</b>
          ))}
        </div>
      ) : (
        <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 overflow-hidden" aria-label="TeamFlow features">
          <motion.div
            className="flex w-max items-center gap-10 px-5 text-base font-bold tracking-tight text-stone-500 sm:gap-14 sm:px-8 sm:text-lg"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          >
            {[...trustItems, ...trustItems].map((item, index) => (
              <b
                className={`shrink-0 ${item.className ?? ""}`}
                key={`${item.label}-${index}`}
                aria-hidden={index >= trustItems.length}
              >
                {item.label}
              </b>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}



import { motion, useReducedMotion } from "framer-motion";

export default function FeatureCards() {
  const reduceMotion = useReducedMotion();
  const cardVariants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
  return (
    <motion.div className="grid gap-4 md:grid-cols-3" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.16 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <motion.article variants={cardVariants} transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }} whileHover={reduceMotion ? undefined : { y: -6 }} className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition-shadow hover:shadow-xl">
        <div className="mb-6 grid h-40 place-items-center rounded-xl bg-orange-50 p-5">
          <div className="w-full rounded-xl border border-stone-200 bg-white p-4 shadow-md shadow-stone-900/5">
            <div className="mb-3 flex justify-between text-[9px] font-bold tracking-widest text-stone-400">
              <span>PROJECT TASKS</span>
              <span className="text-orange-300">•••</span>
            </div>
            {[
              ["Project kickoff", "Today", "bg-[#C2410C]"],
              ["Design review", "Next", "bg-[#FACC15]"],
              ["Final handoff", "Later", "bg-[#16A34A]"],
            ].map(([label, due, color]) => (
              <div
                key={label}
                className="flex h-8 items-center gap-3 border-t border-stone-100 text-[10px] text-stone-600"
              >
                <i className={`h-4 w-1 rounded-full ${color}`} />
                <span>{label}</span>
                <b className="ml-auto font-medium text-stone-400">{due}</b>
              </div>
            ))}
          </div>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#C2410C]">
          01 / PROJECTS
        </span>
        <h3 className="mb-2 mt-2 text-lg font-bold tracking-tight text-[#292524]">
          Plan projects with clarity.
        </h3>
        <p className="text-sm leading-6 text-stone-600">
          Create projects, set deadlines, and keep key work visible from kickoff
          through completion.
        </p>
      </motion.article>

      <motion.article variants={cardVariants} transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }} whileHover={reduceMotion ? undefined : { y: -6 }} className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition-shadow hover:shadow-xl">
        <div className="relative mb-6 grid h-40 place-items-center overflow-hidden rounded-xl bg-amber-50">
          <div className="absolute left-[22%] top-7 grid h-10 w-10 place-items-center rounded-full border-4 border-white bg-amber-200 text-[10px] font-bold text-amber-900 shadow">
            AM
          </div>
          <div className="absolute right-[22%] top-5 grid h-10 w-10 place-items-center rounded-full border-4 border-white bg-green-100 text-[10px] font-bold text-green-800 shadow">
            JL
          </div>
          <div className="absolute bottom-5 left-[30%] grid h-10 w-10 place-items-center rounded-full border-4 border-white bg-orange-200 text-[10px] font-bold text-orange-900 shadow">
            SK
          </div>
          <div className="absolute bottom-5 right-4 flex w-3/5 items-center gap-2 rounded-lg border border-stone-100 bg-white p-3 shadow-lg">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-[#C2410C]">
              ✓
            </span>
            <div>
              <b className="block text-[9px] text-stone-800">
                Task marked complete
              </b>
              <small className="text-[8px] text-stone-400">
                Website redesign · Alex
              </small>
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#C2410C]">
          02 / TASKS &amp; TEAM
        </span>
        <h3 className="mb-2 mt-2 text-lg font-bold tracking-tight text-[#292524]">
          Know who's doing what.
        </h3>
        <p className="text-sm leading-6 text-stone-600">
          Assign owners, set priorities, and review each person's active and
          completed tasks.
        </p>
      </motion.article>

      <motion.article variants={cardVariants} transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }} whileHover={reduceMotion ? undefined : { y: -6 }} className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition-shadow hover:shadow-xl">
        <div className="mb-6 grid h-40 place-items-center rounded-xl bg-green-50 p-5">
          <div className="w-full rounded-xl border border-stone-200 bg-white p-4 shadow-md shadow-stone-900/5">
            <div className="mb-3 flex justify-between text-[10px]">
              <span className="text-stone-500">Tasks completed</span>
              <b className="text-green-700">On track</b>
            </div>
            <div className="relative flex h-20 items-end justify-between border-b border-stone-100 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_23px,#f5f5f4_24px)] px-1">
              {[25, 39, 32, 57, 48, 73, 92].map((height, i) => (
                <i
                  key={i}
                  className={`w-[8%] rounded-t-sm ${i === 6 ? "bg-green-500" : "bg-green-100"}`}
                  style={{ height: `${height}%` }}
                />
              ))}
              <svg
                className="absolute inset-1 h-[calc(100%-8px)] w-full"
                viewBox="0 0 220 75"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 62 C24 57 23 42 49 48 S74 60 96 38 S126 44 146 27 S175 34 194 13 S210 16 220 4"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <small className="mt-2 block text-[9px] text-stone-400">
              Progress across your projects
            </small>
          </div>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#C2410C]">
          03 / TRACKING
        </span>
        <h3 className="mb-2 mt-2 text-lg font-bold tracking-tight text-[#292524]">
          Catch progress and blockers.
        </h3>
        <p className="text-sm leading-6 text-stone-600">
          Move work across the Kanban board, spot overdue tasks, and follow team
          activity.
        </p>
      </motion.article>
    </motion.div>
  );
}




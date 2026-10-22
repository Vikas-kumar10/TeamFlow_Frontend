import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircleDot,
  ListChecks,
  Target,
  Users,
  Zap,
} from "lucide-react";
const steps = [
  {
    number: "01",
    label: "PLAN",
    title: "Set up your project",
    description:
      "Define your goals, set deadlines, and give your team one clear place to get started.",
    icon: Target,
    color: "orange",
    features: ["Define project goals", "Set clear deadlines"],
    visual: (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <Target size={17} />
            </span>
            <div>
              <p className="text-xs font-bold text-stone-800">
                Website redesign
              </p>
              <p className="mt-1 text-[10px] text-stone-500">
                Project workspace
              </p>
            </div>
          </div>
          <CircleDot size={16} className="text-orange-600" />
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-medium text-stone-500">
            Project setup
          </span>
          <span className="text-[10px] font-bold text-orange-700">
            2 of 3
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-orange-100">
          <motion.div
            className="h-full rounded-full bg-orange-600"
            initial={{ width: "0%" }}
            whileInView={{ width: "66%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    ),
  },
  {
    number: "02",
    label: "ORGANIZE",
    title: "Assign tasks and owners",
    description:
      "Turn big plans into manageable tasks, assign responsibilities, and make ownership clear.",
    icon: Users,
    color: "amber",
    features: ["Clear task ownership", "Team collaboration"],
    visual: (
      <div className="space-y-2.5">
        {[
          { task: "Design homepage", initials: "AM", bg: "bg-orange-100 text-orange-800" },
          { task: "Review wireframes", initials: "JL", bg: "bg-amber-100 text-amber-800" },
          { task: "Prepare content", initials: "SK", bg: "bg-green-100 text-green-800" },
        ].map((item, index) => (
          <motion.div
            key={item.task}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.35 }}
            className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-4 w-4 items-center justify-center rounded border border-stone-300">
                {index === 0 && <Check size={11} className="text-orange-700" />}
              </span>
              <span className="text-[11px] font-semibold text-stone-700">
                {item.task}
              </span>
            </div>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ${item.bg}`}
            >
              {item.initials}
            </span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    number: "03",
    label: "DELIVER",
    title: "Track progress together",
    description:
      "See what is complete, identify blockers early, and keep everyone moving toward the goal.",
    icon: ListChecks,
    color: "green",
    features: ["Live progress visibility", "Fewer missed deadlines"],
    visual: (
      <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-stone-500">
              Tasks completed
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
              86%
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Zap size={19} />
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
          <motion.div
            className="h-full rounded-full bg-green-600"
            initial={{ width: "0%" }}
            whileInView={{ width: "86%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-2 text-[10px] font-medium text-green-700">
          <Check size={13} />
          Your team is making progress
        </div>
      </div>
    ),
  },
];
export default function WorkflowSteps() {
  const reduceMotion = useReducedMotion();
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.16 } },
  };
  const cardVariants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.55, ease: "easeOut" },
    },
  };

  return (
        <motion.div
          className="relative z-10 grid gap-5 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        transition: { duration: 0.25 },
                      }
                }
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-4 shadow-[0_4px_20px_rgba(41,37,36,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(124,45,18,0.10)] sm:p-5"
              >
                {/* Decorative number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-8 select-none text-8xl font-black tracking-tighter text-stone-100/80 transition-colors duration-300 group-hover:text-orange-50"
                >
                  {step.number}
                </span>

                {/* Card header */}
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#C2410C]">
                    STEP {step.number}
                  </span>

                  <motion.span
                    whileHover={
                      reduceMotion ? undefined : { rotate: -8, scale: 1.08 }
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-[#C2410C] shadow-sm transition-colors duration-300 group-hover:bg-[#C2410C] group-hover:text-white"
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </motion.span>
                </div>

                {/* Text */}
                <div className="relative mt-4">
                  <h3 className="text-xl font-bold tracking-tight text-[#292524] sm:text-[22px]">
                    {step.title}
                  </h3>

                  <p className="mt-2 min-h-[56px] text-sm leading-6 text-stone-500">
                    {step.description}
                  </p>
                </div>

                {/* Mini UI preview */}
                <div className="relative mt-4 rounded-2xl border border-stone-100 bg-[#FAF7F2] p-3.5 transition-colors duration-300 group-hover:border-orange-100 sm:p-4">
                  {step.visual}
                </div>

                {/* Feature list */}
                <div className="mt-4 space-y-2">
                  {step.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-xs font-medium text-stone-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Bottom indicator */}
                <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                  <span className="text-xs font-semibold text-stone-400 transition-colors group-hover:text-[#C2410C]">
                    {step.label}
                  </span>

                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : { x: [0, 4, 0] }
                    }
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-[#C2410C]"
                  >
                    <ArrowRight size={15} />
                  </motion.span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

  );
}



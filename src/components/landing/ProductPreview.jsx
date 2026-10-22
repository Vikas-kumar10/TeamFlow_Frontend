
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  Command,
  Layers3,
  Plus,
  Search,
  Sparkles,
  Users2,
} from "lucide-react";

import { motion } from "framer-motion";

const work = [
  {
    title: "Website redesign",
    owner: "AM",
    color: "orange",
    status: "In progress",
    progress: 72,
  },
  {
    title: "Q4 launch plan",
    owner: "JL",
    color: "amber",
    status: "On track",
    progress: 48,
  },
  {
    title: "Customer interviews",
    owner: "SK",
    color: "green",
    status: "Done",
    progress: 100,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      staggerChildren: 0.12,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ProductPreview() {
  return (
    <motion.div
      className="relative mx-auto flex h-full min-h-[540px] w-full max-w-5xl flex-col overflow-visible rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/10"
      aria-label="TeamFlow workspace preview"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-8 -top-8 -z-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="flex min-h-0 min-w-0 flex-1">
        {/* Sidebar */}
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-5 border-r border-stone-200 bg-stone-50 py-5 sm:flex">
          <motion.div
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-600/20"
            whileHover={{ rotate: -8, scale: 1.08 }}
          >
            <Layers3 size={18} />
          </motion.div>

          {[
            Command,
            BarChart3,
            Users2,
            Bell,
          ].map((Icon, index) => (
            <motion.span
              key={index}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 ${
                index === 0
                  ? "bg-orange-100 text-orange-700"
                  : "text-stone-400 hover:bg-orange-50 hover:text-orange-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              <Icon size={17} />
            </motion.span>
          ))}
        </aside>

        {/* Main dashboard */}
        <div className="min-w-0 flex-1">
          {/* Top navigation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between border-b border-stone-100 px-4 py-3 sm:px-6"
          >
            <button className="flex items-center gap-2 text-xs font-semibold text-stone-600 transition-colors hover:text-orange-700 sm:text-sm">
              Workspace
              <ChevronDown size={14} />
            </button>

            <div className="flex items-center gap-3">
              <Search
                size={16}
                className="cursor-pointer text-stone-400 transition-colors hover:text-orange-600"
              />
              <motion.span
                whileHover={{ scale: 1.08 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-800 text-xs font-semibold text-white ring-2 ring-stone-100"
              >
                AM
              </motion.span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between gap-4 px-4 pb-5 pt-6 sm:flex-row sm:items-center sm:px-6"
          >
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-orange-600">
                YOUR WORKSPACE
              </p>

              <h3 className="text-lg font-bold tracking-tight text-stone-900 sm:text-2xl">
                Good morning, Alex{" "}
                <motion.span
                  className="inline-block text-orange-500"
                  animate={{ rotate: [0, 15, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  ✦
                </motion.span>
              </h3>

              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                Here's what's moving across your team.
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 20px rgba(194,65,12,0.2)",
              }}
              whileTap={{ scale: 0.96 }}
              className="flex w-fit items-center gap-2 rounded-xl bg-orange-700 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-orange-700/15 transition-colors hover:bg-orange-800 sm:text-sm"
            >
              <Plus size={15} />
              New project
            </motion.button>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:px-6"
          >
            {[
              {
                label: "Active projects",
                value: "12",
                note: "2 this week",
                icon: Layers3,
              },
              {
                label: "Tasks completed",
                value: "86%",
                note: "8% this week",
                icon: Check,
              },
              {
                label: "Team capacity",
                value: "Good shape",
                note: "4 people available",
                icon: Users2,
              },
            ].map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.label}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    borderColor: "#FDBA74",
                    boxShadow: "0 12px 24px rgba(28,25,23,0.06)",
                  }}
                  className="rounded-xl border border-stone-200 bg-white p-4 transition-colors"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-500">
                      {metric.label}
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                      <Icon size={15} />
                    </span>
                  </div>

                  <strong className="block text-2xl font-bold tracking-tight text-stone-900">
                    {metric.value}
                  </strong>

                  <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-green-700">
                    <ArrowDownRight size={13} className="rotate-45deg" />
                    {metric.note}
                  </p>

                  {index === 2 && (
                    <div className="mt-3 flex gap-1">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <motion.i
                          key={item}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: 0.7 + item * 0.08,
                            duration: 0.3,
                          }}
                          className={`h-1.5 flex-1 origin-left rounded-full ${
                            item < 5 ? "bg-orange-500" : "bg-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Projects board */}
          <motion.div
            variants={itemVariants}
            className="mx-4 mb-4 mt-5 overflow-hidden rounded-xl border border-stone-200 sm:mx-6 sm:mt-6"
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-4 py-4 sm:px-5">
              <strong className="text-sm font-bold text-stone-900">
                Team projects
              </strong>

              <button className="flex items-center gap-1 text-xs font-semibold text-orange-700 transition-colors hover:text-orange-900">
                View board
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[minmax(0,1.6fr)_0.6fr_0.8fr] gap-2 bg-stone-50 px-3 py-3 text-[9px] font-bold tracking-wider text-stone-400 sm:grid-cols-[minmax(0,1.5fr)_0.6fr_0.8fr_0.8fr] sm:px-5">
              <span>PROJECT</span>
              <span>OWNER</span>
              <span>STATUS</span>
              <span className="hidden sm:block">PROGRESS</span>
            </div>

            {work.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.45 + index * 0.14,
                  duration: 0.4,
                }}
                whileHover={{ backgroundColor: "#FFFBF7" }}
                className="grid grid-cols-[minmax(0,1.6fr)_0.6fr_0.8fr] items-center gap-2 border-t border-stone-100 px-3 py-4 text-xs sm:grid-cols-[minmax(0,1.5fr)_0.6fr_0.8fr_0.8fr] sm:px-5"
              >
                <span className="flex min-w-0 items-center gap-2 font-semibold text-stone-700">
                  <i
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      item.color === "orange"
                        ? "bg-orange-500"
                        : item.color === "amber"
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                  />
                  <span className="truncate">{item.title}</span>
                </span>

                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                    item.color === "orange"
                      ? "bg-orange-100 text-orange-800"
                      : item.color === "amber"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.owner}
                </span>

                <span>
                  <b
                    className={`inline-block rounded-md px-2 py-1 text-[9px] font-semibold sm:text-[10px] ${
                      item.color === "orange"
                        ? "bg-orange-50 text-orange-700"
                        : item.color === "amber"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-green-50 text-green-700"
                    }`}
                  >
                    {item.status}
                  </b>
                </span>

                <div className="hidden items-center gap-3 sm:flex">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{
                        delay: 0.7 + index * 0.15,
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full ${
                        item.color === "orange"
                          ? "bg-orange-500"
                          : item.color === "amber"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                    />
                  </div>
                  <span className="w-8 text-right text-[10px] font-semibold text-stone-500">
                    {item.progress}%
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-2 border-t border-stone-100 px-4 py-4 text-[10px] text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <span className="flex items-center gap-2">
              <i className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              All systems looking good
            </span>

            <span className="flex items-center gap-1">
              Updated just now
              <ArrowDownRight size={13} />
            </span>
          </motion.div>
        </div>
      </div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="absolute -bottom-5 right-3 flex max-w-290px items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl shadow-stone-900/10 sm:-right-5 sm:bottom-8 sm:p-4"
      >
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700"
        >
          <Check size={17} />
        </motion.span>

        <div className="min-w-0">
          <strong className="block text-xs font-bold text-stone-900">
            Nice momentum!
          </strong>
          <small className="mt-1 block text-[10px] text-stone-500 sm:text-xs">
            Your team closed 18 tasks today
          </small>
        </div>

        <motion.span
          animate={{ y: [0, -3, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="shrink-0 text-orange-500"
        >
          <Sparkles size={17} />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

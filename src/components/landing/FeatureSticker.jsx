import { motion, useReducedMotion } from "framer-motion";

export default function FeatureSticker() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-44 shrink-0 sm:w-52 lg:mr-8"
      animate={
        reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-2, 2, -2] }
      }
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      role="img"
      aria-label="A cheerful cartoon task helper"
    >
      <div className="absolute inset-3 rounded-full bg-orange-200/60 blur-2xl" />
      <svg
        className="relative w-full drop-shadow-xl"
        viewBox="0 0 220 210"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M38 159c-15-27-8-74 15-100 21-24 66-35 100-16 31 17 47 55 37 88-12 39-49 60-91 55-28-3-49-12-61-27Z"
          fill="#FFEDD5"
        />
        <path
          d="M77 52c0-10 8-18 18-18h41c10 0 18 8 18 18v14H77V52Z"
          fill="#C2410C"
          stroke="#292524"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <rect
          x="59"
          y="61"
          width="112"
          height="105"
          rx="23"
          fill="white"
          stroke="#292524"
          strokeWidth="5"
        />
        <path
          d="M83 95h10m34 0h10"
          stroke="#292524"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M95 119c8 10 22 10 30 0"
          stroke="#C2410C"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="m83 140 8 8 15-17"
          stroke="#16A34A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M59 100 42 108m129-8 17 8"
          stroke="#292524"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M90 166v14m52-14v14"
          stroke="#292524"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M80 183h22m30 0h22"
          stroke="#FB923C"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="m42 55 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Zm142 75 3 7 8 3-8 3-3 8-3-8-8-3 8-3 3-7Z"
          fill="#FACC15"
        />
      </svg>
      <span className="absolute -bottom-1 right-0 rounded-full border border-orange-100 bg-white px-3 py-1.5 text-[10px] font-bold text-[#C2410C] shadow-lg">
        Teamwork, in sync
      </span>
    </motion.div>
  );
}

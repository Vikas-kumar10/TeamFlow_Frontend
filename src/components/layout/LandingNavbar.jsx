import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers3, Menu, X } from "lucide-react";
export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E7E5E4] bg-[#FAF7F2]/95 backdrop-blur">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-[#292524]"
            to="/"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2410C] text-white shadow-md shadow-orange-900/15">
              <Layers3 size={20} />
            </span>
            teamflow<span className="text-[#C2410C]">.</span>
          </Link>
          <div className="hidden items-center gap-1 rounded-xl border border-[#E7E5E4] bg-white p-1 md:flex">
            <a
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 hover:bg-orange-50 hover:text-[#C2410C]"
              href="/#platform"
            >
              Overview
            </a>
            <Link
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 hover:bg-orange-50 hover:text-[#C2410C]"
              to="/features"
            >
              Features
            </Link>
            <Link
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-600 hover:bg-orange-50 hover:text-[#C2410C]"
              to="/workflow"
            >
              How it works
            </Link>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <Link
              className="text-sm font-semibold text-stone-700 hover:text-[#C2410C]"
              to="/login"
            >
              Log in
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-900/15 transition hover:bg-[#15803D]"
              to="/signup"
            >
              Create your workspace <ArrowRight size={15} />
            </Link>
          </div>
          <button
            type="button"
            className="rounded-lg border border-[#E7E5E4] bg-white p-2 text-[#C2410C] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
      </header>
      {menuOpen && (
        <div className="absolute left-0 right-0 z-40 flex flex-col gap-1 border-b border-[#E7E5E4] bg-[#FAF7F2] px-5 pb-4 pt-2 shadow-lg md:hidden">
          <a
            className="rounded-lg px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-orange-50"
            href="/#platform"
            onClick={() => setMenuOpen(false)}
          >
            Overview
          </a>
          <Link
            className="rounded-lg px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-orange-50"
            to="/features"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            className="rounded-lg px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-orange-50"
            to="/workflow"
            onClick={() => setMenuOpen(false)}
          >
            How it works
          </Link>
          <Link
            className="rounded-lg px-3 py-3 text-sm font-semibold text-stone-700 hover:bg-orange-50"
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </Link>
          <Link
            className="mt-1 flex items-center justify-between rounded-lg bg-[#C2410C] px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#15803D]"
            to="/signup"
            onClick={() => setMenuOpen(false)}
          >
            Create your workspace <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </>
  );
}

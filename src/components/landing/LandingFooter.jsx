
import { Link } from "react-router-dom";
import {
  Layers3,
  CircleHelp,
  ArrowUpRight,
  Mail,
  CheckCircle2,
} from "lucide-react";

const productLinks = [
  { label: "Task Management", href: "/features" },
  { label: "Kanban Boards", href: "/features" },
  { label: "Team Collaboration", href: "/features" },
  { label: "Project Tracking", href: "/features" },
];

const workspaceLinks = [
  { label: "Create Workspace", href: "/register" },
  { label: "My Projects", href: "/dashboard/projects" },
  { label: "Team Members", href: "/dashboard/members" },
  { label: "My Tasks", href: "/dashboard/tasks" },
];

const resourceLinks = [
  { label: "About TeamFlow", href: "/about" },
  { label: "Help Center", href: "/help" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold text-[#292524]">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-sm text-[#78716C] transition-colors hover:text-[#C2410C]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LandingFooter() {
  return (
    <footer className="border-t border-orange-200 bg-[#FAF7F2] px-5 pt-12 sm:px-8 lg:pt-16">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-[#292524] transition-colors hover:text-[#C2410C]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C2410C] text-white">
                <Layers3 size={21} />
              </span>
              TeamFlow<span className="text-[#C2410C]">.</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#78716C]">
              One workspace. Every project. A team moving forward together.
              TeamFlow helps teams organize tasks, manage projects, track
              deadlines, and collaborate in one place.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-[#57534E]">
              <CheckCircle2 size={17} className="text-[#C2410C]" />
              <span>Built for better teamwork.</span>
            </div>

            <a
              href="mailto:hello@teamflow.app"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9A3412] focus:outline-none focus:ring-2 focus:ring-[#C2410C] focus:ring-offset-2"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Product Links */}
          <FooterLinks
            title="Product"
            links={productLinks}
          />

          {/* Workspace Links */}
          <FooterLinks
            title="Workspace"
            links={workspaceLinks}
          />

          {/* Resources */}
          <FooterLinks
            title="Resources"
            links={resourceLinks}
          />
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-orange-200 py-6 sm:flex-row">
          <p className="text-center text-xs text-[#78716C]">
            © {new Date().getFullYear()} TeamFlow. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/privacy"
              className="text-xs text-[#78716C] transition-colors hover:text-[#C2410C]"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-[#78716C] transition-colors hover:text-[#C2410C]"
            >
              Terms
            </Link>

            <a
              href="mailto:hello@teamflow.app"
              className="inline-flex items-center gap-1.5 text-xs text-[#78716C] transition-colors hover:text-[#C2410C]"
            >
              <Mail size={14} />
              Support
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-[#78716C] transition-colors hover:text-[#C2410C]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1 1.53 1.24 1.53 1.24.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.5.4.35.76 1.03.76 2.08V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

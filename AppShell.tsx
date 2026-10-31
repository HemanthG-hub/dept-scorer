import { Link, NavLink, Outlet } from "react-router-dom";
import { Activity, FileText, History, LayoutDashboard, ScanLine, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Overview", icon: Activity, testId: "nav-landing-link" },
  { to: "/scanner", label: "Code scanner", icon: ScanLine, testId: "nav-scanner-link" },
  { to: "/history", label: "Scan history", icon: History, testId: "nav-history-link" },
];

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3" data-testid="brand-home-link">
            <span className="flex size-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(0,240,255,0.12)] transition-transform group-hover:scale-105">
              <ShieldCheck className="size-5" />
            </span>
            <span className="hidden sm:block">
              <span className="block font-heading text-sm font-bold tracking-[0.18em] text-white">DEBT//SCORER</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">security intelligence</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            {links.map(({ to, label, icon: Icon, testId }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                data-testid={testId}
                className={({ isActive }) => cn(
                  "group flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-800/60 hover:text-slate-200",
                  isActive && "bg-cyan-400/10 text-cyan-300",
                )}
              >
                <Icon className="size-4" />
                <span className="hidden md:inline">{label}</span>
              </NavLink>
            ))}
            <div className="mx-2 hidden h-5 w-px bg-slate-800 md:block" />
            <Link to="/report/latest" data-testid="nav-report-link" className="hidden items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-800/60 hover:text-slate-200 sm:flex">
              <FileText className="size-4" /> Report
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <Outlet />
      </main>
      <footer className="mx-auto flex max-w-[1500px] items-center justify-between border-t border-slate-800/60 px-4 py-6 text-[11px] text-slate-600 sm:px-6 lg:px-8 print:hidden">
        <span data-testid="footer-status-text">DEBT//SCORER · deterministic security intelligence</span>
        <span className="font-mono text-cyan-400/60" data-testid="footer-mode-text">MODE: MOCK_AI / SAFE_ANALYSIS</span>
      </footer>
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80" data-testid="section-eyebrow">{children}</p>;
}

export function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl" data-testid="page-title">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400" data-testid="page-description">{description}</p>
    </div>
  );
}

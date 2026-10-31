import { Link } from "react-router-dom";
import { ArrowRight, Bot, Check, ChevronRight, Cpu, FileCode2, LockKeyhole, ScanSearch, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionEyebrow } from "@/components/AppShell";

const coverage = ["Secrets", "Injection", "Auth", "XSS", "SSRF", "Crypto", "IoT / OTA", "Dependencies"];

export default function Landing() {
  return (
    <div className="space-y-20 pb-10">
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 size-56 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300" data-testid="landing-status-pill"><span className="size-1.5 animate-pulse rounded-full bg-cyan-300" /> deterministic engine online</div>
            <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl" data-testid="landing-hero-title">Find the security debt hiding in your <span className="text-cyan-300">generated code.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400" data-testid="landing-hero-description">DEBT//SCORER turns source code into a transparent risk signal. Detect vulnerable patterns, trace them to exact lines, and ship a safer replacement.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/scanner" data-testid="landing-start-scan-link"><Button size="lg" className="bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(0,240,255,0.22)] hover:bg-cyan-200">Start a scan <ArrowRight className="size-4" /></Button></Link>
              <Link to="/scanner" data-testid="landing-demo-link"><Button variant="outline" size="lg" className="border-slate-700 bg-slate-950/30 text-slate-200 hover:bg-slate-800">Try vulnerable demo <ChevronRight className="size-4" /></Button></Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500"><span className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> no code execution</span><span className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> mock AI ready</span><span className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> line-level evidence</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-sm rounded-xl border border-slate-700 bg-[#090d16] p-5 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4"><div><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">latest preview</div><div className="mt-1 text-sm font-semibold text-slate-200">payment_service.py</div></div><span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-1 font-mono text-[10px] font-bold text-amber-300">HIGH RISK</span></div>
            <div className="flex items-center gap-6 py-7"><div className="relative flex size-28 items-center justify-center rounded-full p-2" style={{ background: "conic-gradient(#f59e0b 223deg, #1e293b 0deg)" }}><div className="flex size-full flex-col items-center justify-center rounded-full bg-[#0f172a]"><strong className="font-heading text-3xl text-white" data-testid="landing-score-preview">62</strong><span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">/100</span></div></div><div className="space-y-3 font-mono text-[10px] text-slate-400"><div><span className="mr-2 inline-block size-1.5 rounded-full bg-red-400" />1 critical</div><div><span className="mr-2 inline-block size-1.5 rounded-full bg-amber-400" />2 high</div><div><span className="mr-2 inline-block size-1.5 rounded-full bg-blue-400" />3 medium</div></div></div>
            <div className="rounded-lg border border-red-400/20 bg-red-400/5 p-3"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-red-200">SQL injection</span><span className="font-mono text-[10px] text-slate-500">line 18</span></div><div className="mt-2 rounded border border-slate-800 bg-[#070a10] px-2 py-1.5 font-mono text-[10px] text-slate-400"><span className="text-red-300">query</span>(f"SELECT * ... {"${user_id}"}")</div></div>
            <div className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-cyan-300/70"><Sparkles className="size-3" /> transparent scoring engine</div>
          </div>
        </div>
      </section>
      <section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><SectionEyebrow>coverage matrix / 01</SectionEyebrow><h2 className="mt-3 max-w-md font-heading text-3xl font-bold tracking-tight text-white" data-testid="coverage-title">A security review that reads the whole signal.</h2><p className="mt-4 max-w-md text-sm leading-6 text-slate-400" data-testid="coverage-description">Rules are tuned for web services, generated scripts, and the firmware paths most scanners miss.</p></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-800 bg-slate-800 sm:grid-cols-4">{coverage.map((item, index) => <div key={item} className="bg-[#0f172a] p-5 transition-colors hover:bg-[#131c2e]"><div className="font-mono text-[10px] text-slate-600">0{index + 1}</div><div className="mt-7 text-sm font-semibold text-slate-200" data-testid={`coverage-item-${index}`}>{item}</div></div>)}</div></section>
      <section className="grid gap-5 md:grid-cols-3"><FeatureCard icon={ScanSearch} eyebrow="01 / deterministic" title="Rules with receipts" body="Every score is tied to a severity weight, exploitability signal, and exact evidence line—not a random model response." /><FeatureCard icon={Bot} eyebrow="02 / AI-assisted" title="Context, clearly labeled" body="Mock AI mode adds an explanation layer while keeping deterministic findings as the source of truth." /><FeatureCard icon={Cpu} eyebrow="03 / firmware-aware" title="Web to wire" body="Catch hardcoded Wi-Fi credentials, open MQTT, and unsafe OTA patterns alongside conventional web vulnerabilities." /></section>
      <section className="rounded-xl border border-slate-800 bg-[#0f172a] p-7 sm:p-10"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><SectionEyebrow>ready when you are</SectionEyebrow><h2 className="mt-3 font-heading text-2xl font-bold text-white" data-testid="landing-cta-title">Turn your next code drop into a security decision.</h2></div><Link to="/scanner" data-testid="landing-bottom-scan-link"><Button className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">Open scanner <ArrowRight className="size-4" /></Button></Link></div></section>
    </div>
  );
}

function FeatureCard({ icon: Icon, eyebrow, title, body }: { icon: typeof LockKeyhole; eyebrow: string; title: string; body: string }) {
  return <Card className="border-slate-800 bg-[#0f172a] transition-transform hover:-translate-y-1"><CardContent className="p-6"><Icon className="size-5 text-cyan-300" /><div className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600" data-testid="feature-eyebrow">{eyebrow}</div><h3 className="mt-2 font-heading text-xl font-semibold text-white" data-testid="feature-title">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400" data-testid="feature-description">{body}</p></CardContent></Card>;
}

export { FileCode2 };

import { ShieldAlert } from "lucide-react";
import type { RiskLevel } from "@/lib/types";

function scoreColor(score: number) {
  if (score >= 80) return "#ef4444";
  if (score >= 55) return "#f59e0b";
  if (score >= 25) return "#3b82f6";
  return "#10b981";
}

export default function ScoreGauge({ score, risk }: { score: number; risk: RiskLevel }) {
  const color = scoreColor(score);
  return (
    <div className="relative mx-auto flex size-52 items-center justify-center rounded-full p-3 sm:size-60" style={{ background: `conic-gradient(${color} ${score * 3.6}deg, #1e293b 0deg)` }} data-testid="security-debt-score-gauge">
      <div className="absolute inset-[11px] rounded-full bg-[#0f172a] shadow-[inset_0_0_30px_rgba(0,0,0,0.45)]" />
      <div className="relative text-center">
        <ShieldAlert className="mx-auto mb-2 size-5" style={{ color }} />
        <div className="font-heading text-5xl font-extrabold tracking-tight text-white" data-testid="security-debt-score-value">{score}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">/ 100 debt</div>
        <div className="mt-2 text-xs font-bold tracking-[0.2em]" style={{ color }} data-testid="risk-level-badge">{risk}</div>
      </div>
    </div>
  );
}

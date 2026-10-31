import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Bot, ChevronRight, CircleAlert, Code2, ExternalLink, Gauge, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/AppShell";
import ScoreGauge from "@/components/ScoreGauge";
import { apiGet } from "@/lib/api";
import { countSeverities, formatTimestamp, severityDotStyles, severityStyles, type ScanResult, type Vulnerability } from "@/lib/types";

export default function Dashboard() {
  const { scanId } = useParams();
  const [selectedId, setSelectedId] = useState<string>();
  const query = useQuery({
    queryKey: ["scan", scanId],
    queryFn: () => apiGet<ScanResult>(`/scans/${scanId}`),
    enabled: Boolean(scanId),
  });

  if (query.isLoading) return <LoadingState label="Hydrating security dashboard..." />;
  if (query.isError || !query.data) return <ErrorState />;

  const scan = query.data;
  const counts = countSeverities(scan.vulnerabilities);
  const selected = scan.vulnerabilities.find((finding) => finding.id === (selectedId ?? scan.vulnerabilities[0]?.id));

  return (
    <div>
      <PageTitle
        eyebrow="security dashboard / 03"
        title="The risk signal, in full resolution."
        description={`${scan.file_name ?? "Untitled source"} · ${scan.language} · scanned ${formatTimestamp(scan.created_at)}`}
      />
      <div className="space-y-6">
        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Card className="border-slate-800 bg-[#0f172a]">
            <CardContent className="p-6">
              <ScoreGauge score={scan.security_score} risk={scan.risk_level} />
              <div className="mt-5 text-center text-xs leading-5 text-slate-500" data-testid="score-context-copy">{scan.security_debt}</div>
            </CardContent>
          </Card>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-slate-800 bg-[#0f172a] sm:col-span-2">
              <CardContent className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500"><Gauge className="size-3 text-cyan-300" /> analysis outcome</div>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-white" data-testid="dashboard-summary-title">{scan.vulnerabilities.length ? `${scan.vulnerabilities.length} security signal(s) need attention.` : "No immediate signals detected."}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400" data-testid="dashboard-summary-copy">{scan.summary}</p>
                </div>
                <Link to={`/report/${scan.id}`} data-testid="view-report-link"><Button variant="outline" className="shrink-0 border-slate-700 text-slate-200">Open report <ArrowUpRight className="size-4" /></Button></Link>
              </CardContent>
            </Card>
            <MetricCard label="Critical" value={counts.CRITICAL} color="text-red-300" testId="critical-issue-count" />
            <MetricCard label="High" value={counts.HIGH} color="text-amber-300" testId="high-issue-count" />
            <MetricCard label="Medium" value={counts.MEDIUM} color="text-blue-300" testId="medium-issue-count" />
            <MetricCard label="Low" value={counts.LOW} color="text-emerald-300" testId="low-issue-count" />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <FindingsCard findings={scan.vulnerabilities} selectedId={selected?.id} onSelect={setSelectedId} />
          <div className="space-y-6">
            <EvidenceCard scan={scan} selected={selected} />
            <Breakdown breakdown={scan.breakdown} />
          </div>
        </section>

        <Card className="border-cyan-300/15 bg-cyan-300/[0.03]">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
            <Bot className="mt-0.5 size-5 shrink-0 text-cyan-300" />
            <div>
              <div className="flex flex-wrap items-center gap-2"><h3 className="font-heading text-sm font-semibold text-slate-100" data-testid="ai-explanation-card">AI-assisted context</h3><Badge className="border-cyan-300/20 bg-cyan-300/10 font-mono text-[9px] text-cyan-200">{scan.ai_mode === "MOCK_AI" ? "MOCK AI MODE" : "AI-ASSISTED"}</Badge></div>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400" data-testid="ai-explanation-text">{scan.ai_explanation}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FindingsCard({ findings, selectedId, onSelect }: { findings: Vulnerability[]; selectedId?: string; onSelect: (id: string) => void }) {
  return (
    <Card className="border-slate-800 bg-[#0f172a]">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-800/80"><CardTitle className="flex items-center gap-2 font-heading text-base text-white"><CircleAlert className="size-4 text-amber-300" /> Findings overview</CardTitle><span className="font-mono text-[10px] uppercase tracking-widest text-slate-600" data-testid="findings-count-label">{findings.length} mapped</span></CardHeader>
      <CardContent className="p-0">
        {findings.length === 0 ? <EmptyFindings /> : <div className="divide-y divide-slate-800/70">{findings.map((finding) => <button type="button" key={finding.id} data-testid="vulnerability-item-row" onClick={() => onSelect(finding.id)} className={`flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-slate-800/40 ${selectedId === finding.id ? "bg-cyan-300/[0.04]" : ""}`}><span className={`mt-1.5 size-2 shrink-0 rounded-full ${severityDotStyles[finding.severity]}`} /><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="text-sm font-semibold text-slate-200">{finding.title}</span><Badge data-testid="finding-severity-badge" className={severityStyles[finding.severity]}>{finding.severity}</Badge></span><span className="mt-1 block font-mono text-[10px] text-slate-500">line {finding.line} · {finding.cwe} · {finding.owasp_category}</span></span><ChevronRight className="mt-1 size-4 text-slate-700" /></button>)}</div>}
      </CardContent>
    </Card>
  );
}

function EvidenceCard({ scan, selected }: { scan: ScanResult; selected?: Vulnerability }) {
  const lines = scan.source_code.split("\n");
  return (
    <Card className="border-slate-800 bg-[#0f172a]">
      <CardHeader className="border-b border-slate-800/80"><CardTitle className="flex items-center gap-2 font-heading text-base text-white"><Code2 className="size-4 text-cyan-300" /> Evidence inspector</CardTitle></CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[360px] overflow-auto bg-[#090d16] py-3 font-mono text-[11px] leading-6">
          {lines.map((line, index) => <CodeLine key={index} line={line} lineNumber={index + 1} highlighted={scan.vulnerabilities.some((finding) => finding.line === index + 1)} />)}
        </div>
        {selected && <div className="border-t border-slate-800/80 p-4"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">selected line {selected.line}</span><Link to={`/findings/${scan.id}/${selected.id}`} data-testid="finding-details-link" className="text-xs text-cyan-300 hover:text-cyan-200">Open detail <ExternalLink className="ml-1 inline size-3" /></Link></div><p className="mt-2 text-xs leading-5 text-slate-400" data-testid="selected-finding-explanation">{selected.explanation}</p></div>}
      </CardContent>
    </Card>
  );
}

function CodeLine({ line, lineNumber, highlighted }: { line: string; lineNumber: number; highlighted: boolean }) {
  return (
    <div data-testid={`code-line-${lineNumber}`} className={`flex min-w-max px-4 ${highlighted ? "bg-amber-400/10 text-amber-100" : "text-slate-500"}`}>
      <span className="w-8 shrink-0 select-none pr-3 text-right text-slate-700">{lineNumber}</span>
      <span className={`border-l border-transparent pl-3 whitespace-pre ${highlighted ? "border-amber-400/60" : ""}`}>{line || " "}</span>
    </div>
  );
}

function MetricCard({ label, value, color, testId }: { label: string; value: number; color: string; testId: string }) { return <Card className="border-slate-800 bg-[#0f172a]"><CardContent className="flex items-center justify-between p-5"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</span><span className={`font-heading text-3xl font-bold ${color}`} data-testid={testId}>{value}</span></CardContent></Card>; }
function Breakdown({ breakdown }: { breakdown: ScanResult["breakdown"] }) { const items = [{ label: "Severity impact", value: breakdown.severity_impact, color: "bg-amber-300" }, { label: "Sensitive data", value: breakdown.sensitive_data_exposure, color: "bg-red-400" }, { label: "Repeated patterns", value: breakdown.repeated_patterns, color: "bg-blue-400" }, { label: "Complexity", value: breakdown.complexity, color: "bg-cyan-300" }, { label: "Dependency risk", value: breakdown.dependency_risk, color: "bg-emerald-400" }]; return <Card className="border-slate-800 bg-[#0f172a]"><CardHeader className="border-b border-slate-800/80"><CardTitle className="font-heading text-base text-white">Debt breakdown</CardTitle></CardHeader><CardContent className="space-y-4 p-5">{items.map((item) => <div key={item.label}><div className="mb-1.5 flex justify-between font-mono text-[10px] text-slate-500"><span>{item.label}</span><span className="text-slate-300">+{item.value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(100, item.value * 4)}%` }} /></div></div>)}<div className="flex justify-between border-t border-slate-800 pt-4 font-mono text-xs"><span className="text-slate-500">calculated debt score</span><span className="font-bold text-cyan-300" data-testid="breakdown-total-value">{breakdown.total}/100</span></div></CardContent></Card>; }
function EmptyFindings() { return <div className="flex flex-col items-center justify-center p-10 text-center"><ShieldCheck className="size-8 text-emerald-300" /><h3 className="mt-3 text-sm font-semibold text-slate-200" data-testid="no-findings-title">No rule matches found</h3><p className="mt-2 max-w-sm text-xs leading-5 text-slate-500" data-testid="no-findings-copy">This is a positive signal, not a guarantee. Keep dependency and manual review gates enabled.</p></div>; }
function LoadingState({ label }: { label: string }) { return <div className="flex min-h-[50vh] flex-col items-center justify-center"><div className="size-9 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-300" data-testid="dashboard-loading-spinner" /><p className="mt-4 font-mono text-xs uppercase tracking-widest text-slate-500" data-testid="dashboard-loading-state">{label}</p></div>; }
function ErrorState() { return <Card className="border-red-400/20 bg-red-400/5"><CardContent className="p-8 text-center"><CircleAlert className="mx-auto size-8 text-red-300" /><h2 className="mt-4 font-heading text-xl font-bold text-white" data-testid="dashboard-error-title">Scan unavailable</h2><p className="mt-2 text-sm text-slate-400" data-testid="dashboard-error-copy">This scan may have expired or the backend is offline.</p><Link to="/scanner" data-testid="dashboard-error-scanner-link"><Button className="mt-5 bg-cyan-300 text-slate-950 hover:bg-cyan-200">Return to scanner</Button></Link></CardContent></Card>; }

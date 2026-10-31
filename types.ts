export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type RiskLevel = Severity;

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  cwe: string;
  owasp_category: string;
  line: number;
  evidence: string;
  explanation: string;
  recommendation: string;
  secure_fix: string;
  exploitability: string;
  source: "DETERMINISTIC" | "AI_ASSISTED";
}

export interface ScoreBreakdown {
  severity_impact: number;
  sensitive_data_exposure: number;
  repeated_patterns: number;
  complexity: number;
  dependency_risk: number;
  total: number;
}

export interface ScanResult {
  id: string;
  language: string;
  file_name: string | null;
  source_code: string;
  security_score: number;
  risk_level: RiskLevel;
  vulnerabilities: Vulnerability[];
  summary: string;
  security_debt: string;
  breakdown: ScoreBreakdown;
  ai_mode: "MOCK_AI" | "LIVE_AI";
  ai_explanation: string;
  line_count: number;
  created_at: string;
}

export interface ScanSummary {
  id: string;
  language: string;
  file_name: string | null;
  security_score: number;
  risk_level: RiskLevel;
  vulnerability_count: number;
  created_at: string;
}

export const severityStyles: Record<Severity, string> = {
  CRITICAL: "border-red-500/30 bg-red-500/10 text-red-200",
  HIGH: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  MEDIUM: "border-blue-500/30 bg-blue-500/10 text-blue-200",
  LOW: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

export const severityDotStyles: Record<Severity, string> = {
  CRITICAL: "bg-red-400",
  HIGH: "bg-amber-400",
  MEDIUM: "bg-blue-400",
  LOW: "bg-emerald-400",
};

export function formatTimestamp(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function countSeverities(findings: Vulnerability[]) {
  return findings.reduce<Record<Severity, number>>(
    (counts, finding) => {
      counts[finding.severity] += 1;
      return counts;
    },
    { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
  );
}

# DEBT//SCORER living spec

## What it does
DEBT//SCORER is a dark cybersecurity command center for scanning pasted source code or uploaded source files. It detects Python, JavaScript/TypeScript, SQL, C/C++, and Arduino/ESP32 patterns without executing untrusted code, then stores a transparent security-debt result in MongoDB.

## Data model
- `ScanResult`: string id, detected language, optional sanitized filename, source code, 0–100 security score, risk level, vulnerabilities, summary, security debt, score breakdown, AI mode/explanation, line count, and UTC created timestamp
- `Vulnerability`: title, severity, CWE, OWASP-style category, line, evidence, explanation, recommendation, secure replacement, exploitability, and deterministic/AI source label
- `ScanSummary`: history-safe projection with id, language, filename, score, risk, finding count, and timestamp

## Key flows
1. Landing page → Code scanner → paste/load preset/upload file → POST `/api/scans` → dashboard
2. Dashboard shows gauge, severity counters, line-highlighted evidence, transparent breakdown, and mock-AI context
3. Finding details shows evidence, category, explanation, recommendation, and copyable secure replacement
4. Scan history searches stored scans and links to dashboard/report
5. Security report is a print-optimized page using the browser print dialog to export PDF

## Analysis engine
Deterministic regex rules cover hardcoded secrets, command/SQL injection, XSS, weak crypto, unsafe deserialization, path traversal, SSRF, insecure auth, missing validation, excessive permissions, dependency pinning, and IoT communication/firmware configuration. The score is the capped sum of severity impact, sensitive-data exposure, repeated patterns, complexity, and dependency risk. AI is explicitly labeled `MOCK_AI` in this MVP and never changes the deterministic score.

## Auth and roles
No authentication or role gates in this MVP. Scan history is shared demo data in the pod database.

import type { RiskSeverity } from '@/tokens'

export interface ExecutiveRisk {
  id: string
  title: string
  category:
    | 'Strategic'
    | 'Operational'
    | 'Financial'
    | 'Compliance'
    | 'Technology'
    | 'Cybersecurity'
    | 'Reputational'
    | 'People'
    | 'Third-Party'
  department: string
  businessUnit?: string
  owner: string
  ownerRole: string
  severity: RiskSeverity
  riskScore: number
  residualScore?: number
  inherentScore: number
  inherentExposure: string
  residualExposure: string
  trend: 'increasing' | 'stable' | 'decreasing'
  lastUpdated: string
  lastAssessed?: string
  executiveSummary: string
  nextActionTitle: string
  nextActionDue: string
  actionDaysOverdue?: number
  actionStatus?: 'overdue' | 'in_progress' | 'completed' | 'not_started' | 'blocked'
  isBreached: boolean
  appetiteThreshold: string
  controlEffectiveness: 'effective' | 'partially_effective' | 'ineffective'
  inherentLikelihood?: number
  inherentImpact?: number
  residualLikelihood?: number
  residualImpact?: number
  linkedControlsCount?: number
}

export interface KpiItem {
  id: string
  label: string
  value: string
  supporting: string
  delta: string
  comparison: string
  trend: 'up' | 'down' | 'flat'
  positive?: boolean
  status: 'normal' | 'attention' | 'good'
}

export interface MonthlyTrendPoint {
  month: string
  inherentExposure: number // in millions
  residualExposure: number // in millions
}

export interface CategoryExposureItem {
  category: string
  riskCount: number
  highCount: number
  criticalCount: number
  residualExposure: string
  exposureValue: number // in millions
  trend: 'up' | 'flat' | 'down'
  requiresAttention?: boolean
  avgResidualScore?: number
  appetiteLimit?: number
  status?: 'near_limit' | 'breached' | 'within_appetite'
}

export interface DepartmentExposureItem {
  department: string
  risks: number
  critical: number
  high: number
  exposure: string
  exposureValue: number
  trend: 'up' | 'down' | 'flat'
}

export interface OverdueAction {
  id: string
  actionTitle: string
  riskId: string
  riskName: string
  owner: string
  dueDate: string
  daysOverdue: number
  severity: 'critical' | 'high' | 'moderate'
  status: 'overdue'
}

export interface EmergingRiskItem {
  id: string
  name: string
  category: string
  score: number
  trend: 'up_fast' | 'up_moderate'
  velocity: string
  owner: string
  summary: string
}

export interface RecentActivityItem {
  id: string
  timeAgo: string
  title: string
  description: string
  type: 'score' | 'control' | 'assessment' | 'action' | 'appetite'
}

export interface AppetiteBreachItem {
  category: string
  currentExposure: string
  appetiteThreshold: string
  variance: string
  varianceValue: number
  status: 'Above Appetite' | 'Within Appetite'
}

/* ─────────────────────────────────────────────────────────────
 * 1. Primary KPIs (from prompt)
 * ───────────────────────────────────────────────────────────── */

export const EXECUTIVE_KPIS: KpiItem[] = [
  {
    id: 'kpi-total-risks',
    label: 'Total Risks',
    value: '248',
    supporting: '+12 this quarter',
    delta: '+12',
    comparison: 'this quarter',
    trend: 'up',
    positive: false,
    status: 'normal',
  },
  {
    id: 'kpi-critical-risks',
    label: 'Critical Risks',
    value: '12',
    supporting: '3 new this month',
    delta: '+3',
    comparison: 'this month',
    trend: 'up',
    positive: false,
    status: 'attention',
  },
  {
    id: 'kpi-high-risks',
    label: 'High Risks',
    value: '38',
    supporting: '−5 vs previous quarter',
    delta: '−5',
    comparison: 'vs previous quarter',
    trend: 'down',
    positive: true,
    status: 'good',
  },
  {
    id: 'kpi-risk-exposure',
    label: 'Risk Exposure',
    value: '$4.8M',
    supporting: '−8.2% vs previous quarter',
    delta: '−8.2%',
    comparison: 'vs previous quarter',
    trend: 'down',
    positive: true,
    status: 'good',
  },
  {
    id: 'kpi-overdue-actions',
    label: 'Overdue Actions',
    value: '17',
    supporting: '6 critical',
    delta: '6 critical',
    comparison: 'past due date',
    trend: 'up',
    positive: false,
    status: 'attention',
  },
  {
    id: 'kpi-control-effectiveness',
    label: 'Control Effectiveness',
    value: '82%',
    supporting: '+4.5% vs previous quarter',
    delta: '+4.5%',
    comparison: 'vs previous quarter',
    trend: 'up',
    positive: true,
    status: 'good',
  },
]

/* ─────────────────────────────────────────────────────────────
 * 2. Overall Risk Posture Summary & Inherent vs Residual
 * ───────────────────────────────────────────────────────────── */

export const OVERALL_POSTURE = {
  status: 'Elevated',
  summaryText:
    'Overall risk exposure is moderately elevated. Critical technology and third-party risks require immediate attention, while overall residual exposure has decreased 8% compared with the previous quarter.',
  criticalCount: 12,
  highCount: 38,
  moderateCount: 84,
  lowCount: 114,
  totalCount: 248,
  inherentExposure: '$6.2M',
  inherentValue: 6.2,
  residualExposure: '$4.8M',
  residualValue: 4.8,
  exposureReductionPct: '−22.6%',
  exposureReductionValue: '−$1.4M',
  recommendedFocus: 'Cybersecurity & Third-Party Vendor Failover',
  importantChange: '27 controls tested this quarter; 3 new critical risks logged',
}

/* ─────────────────────────────────────────────────────────────
 * 3. 10-Month Risk Exposure Trend (Jan - Oct)
 * ───────────────────────────────────────────────────────────── */

export const MONTHLY_TREND_DATA: MonthlyTrendPoint[] = [
  { month: 'Jan', inherentExposure: 6.8, residualExposure: 5.6 },
  { month: 'Feb', inherentExposure: 6.7, residualExposure: 5.5 },
  { month: 'Mar', inherentExposure: 6.6, residualExposure: 5.4 },
  { month: 'Apr', inherentExposure: 6.5, residualExposure: 5.3 },
  { month: 'May', inherentExposure: 6.6, residualExposure: 5.4 },
  { month: 'Jun', inherentExposure: 6.5, residualExposure: 5.2 },
  { month: 'Jul', inherentExposure: 6.4, residualExposure: 5.1 },
  { month: 'Aug', inherentExposure: 6.3, residualExposure: 5.0 },
  { month: 'Sep', inherentExposure: 6.3, residualExposure: 4.9 },
  { month: 'Oct', inherentExposure: 6.2, residualExposure: 4.8 },
]

/* ─────────────────────────────────────────────────────────────
 * 4. Severity Distribution Breakdown
 * ───────────────────────────────────────────────────────────── */

export const SEVERITY_DISTRIBUTION = [
  {
    severity: 'critical' as RiskSeverity,
    label: 'Critical',
    count: 12,
    pct: 4.8,
    scoreRange: '17–25',
    color: 'var(--color-risk-critical)',
    bgClass: 'bg-[var(--color-risk-critical)]',
    subtleClass: 'bg-[var(--color-risk-critical-subtle)]',
    borderClass: 'border-[var(--color-risk-critical-border)]',
    textClass: 'text-[var(--color-risk-critical-foreground)]',
  },
  {
    severity: 'high' as RiskSeverity,
    label: 'High',
    count: 38,
    pct: 15.3,
    scoreRange: '10–16',
    color: 'var(--color-risk-high)',
    bgClass: 'bg-[var(--color-risk-high)]',
    subtleClass: 'bg-[var(--color-risk-high-subtle)]',
    borderClass: 'border-[var(--color-risk-high-border)]',
    textClass: 'text-[var(--color-risk-high-foreground)]',
  },
  {
    severity: 'moderate' as RiskSeverity,
    label: 'Moderate',
    count: 84,
    pct: 33.9,
    scoreRange: '5–9',
    color: 'var(--color-risk-moderate)',
    bgClass: 'bg-[var(--color-risk-moderate)]',
    subtleClass: 'bg-[var(--color-risk-moderate-subtle)]',
    borderClass: 'border-[var(--color-risk-moderate-border)]',
    textClass: 'text-[var(--color-risk-moderate-foreground)]',
  },
  {
    severity: 'low' as RiskSeverity,
    label: 'Low',
    count: 114,
    pct: 46.0,
    scoreRange: '1–4',
    color: 'var(--color-risk-low)',
    bgClass: 'bg-[var(--color-risk-low)]',
    subtleClass: 'bg-[var(--color-risk-low-subtle)]',
    borderClass: 'border-[var(--color-risk-low-border)]',
    textClass: 'text-[var(--color-risk-low-foreground)]',
  },
]

/* ─────────────────────────────────────────────────────────────
 * 5. 5×5 Matrix Concentration Preview
 * Total sum across cells = 248
 * ───────────────────────────────────────────────────────────── */

export interface MatrixPreviewCell {
  likelihood: number // 1..5
  impact: number // 1..5
  count: number
  score: number
  severity: RiskSeverity
}

export const MATRIX_PREVIEW_CELLS: MatrixPreviewCell[] = [
  // Likelihood 5 (Frequent)
  { likelihood: 5, impact: 1, count: 5, score: 5, severity: 'moderate' },
  { likelihood: 5, impact: 2, count: 8, score: 10, severity: 'high' },
  { likelihood: 5, impact: 3, count: 12, score: 15, severity: 'high' },
  { likelihood: 5, impact: 4, count: 4, score: 20, severity: 'critical' },
  { likelihood: 5, impact: 5, count: 2, score: 25, severity: 'critical' },

  // Likelihood 4 (Likely)
  { likelihood: 4, impact: 1, count: 9, score: 4, severity: 'low' },
  { likelihood: 4, impact: 2, count: 14, score: 8, severity: 'moderate' },
  { likelihood: 4, impact: 3, count: 9, score: 12, severity: 'high' },
  { likelihood: 4, impact: 4, count: 3, score: 16, severity: 'high' },
  { likelihood: 4, impact: 5, count: 4, score: 20, severity: 'critical' },

  // Likelihood 3 (Possible)
  { likelihood: 3, impact: 1, count: 18, score: 3, severity: 'low' },
  { likelihood: 3, impact: 2, count: 22, score: 6, severity: 'moderate' },
  { likelihood: 3, impact: 3, count: 21, score: 9, severity: 'moderate' },
  { likelihood: 3, impact: 4, count: 2, score: 12, severity: 'high' },
  { likelihood: 3, impact: 5, count: 2, score: 15, severity: 'critical' },

  // Likelihood 2 (Unlikely)
  { likelihood: 2, impact: 1, count: 32, score: 2, severity: 'low' },
  { likelihood: 2, impact: 2, count: 28, score: 4, severity: 'low' },
  { likelihood: 2, impact: 3, count: 11, score: 6, severity: 'moderate' },
  { likelihood: 2, impact: 4, count: 3, score: 8, severity: 'moderate' },
  { likelihood: 2, impact: 5, count: 0, score: 10, severity: 'high' },

  // Likelihood 1 (Rare)
  { likelihood: 1, impact: 1, count: 16, score: 1, severity: 'low' },
  { likelihood: 1, impact: 2, count: 11, score: 2, severity: 'low' },
  { likelihood: 1, impact: 3, count: 8, score: 3, severity: 'low' },
  { likelihood: 1, impact: 4, count: 4, score: 4, severity: 'low' },
  { likelihood: 1, impact: 5, count: 0, score: 5, severity: 'moderate' },
]

/* ─────────────────────────────────────────────────────────────
 * 6. Risk Exposure by Category
 * Total = 248 risks, 12 Critical, 38 High
 * ───────────────────────────────────────────────────────────── */

export const CATEGORY_EXPOSURES: CategoryExposureItem[] = [
  {
    category: 'Cybersecurity',
    riskCount: 42,
    highCount: 8,
    criticalCount: 4,
    residualExposure: '$1.6M',
    exposureValue: 1.6,
    trend: 'up',
    requiresAttention: true,
    avgResidualScore: 18.2,
    appetiteLimit: 15.0,
    status: 'breached',
  },
  {
    category: 'Operational',
    riskCount: 56,
    highCount: 10,
    criticalCount: 3,
    residualExposure: '$1.2M',
    exposureValue: 1.2,
    trend: 'up',
    requiresAttention: true,
    avgResidualScore: 15.8,
    appetiteLimit: 16.0,
    status: 'near_limit',
  },
  {
    category: 'Technology',
    riskCount: 34,
    highCount: 6,
    criticalCount: 2,
    residualExposure: '$1.1M',
    exposureValue: 1.1,
    trend: 'up',
    requiresAttention: true,
    avgResidualScore: 16.4,
    appetiteLimit: 15.0,
    status: 'breached',
  },
  {
    category: 'Third-Party',
    riskCount: 18,
    highCount: 4,
    criticalCount: 2,
    residualExposure: '$980K',
    exposureValue: 0.98,
    trend: 'up',
    requiresAttention: true,
    avgResidualScore: 15.5,
    appetiteLimit: 14.0,
    status: 'breached',
  },
  {
    category: 'Financial',
    riskCount: 28,
    highCount: 4,
    criticalCount: 1,
    residualExposure: '$920K',
    exposureValue: 0.92,
    trend: 'down',
    avgResidualScore: 12.1,
    appetiteLimit: 14.0,
    status: 'within_appetite',
  },
  {
    category: 'Strategic',
    riskCount: 18,
    highCount: 2,
    criticalCount: 0,
    residualExposure: '$520K',
    exposureValue: 0.52,
    trend: 'flat',
    avgResidualScore: 10.4,
    appetiteLimit: 12.0,
    status: 'within_appetite',
  },
  {
    category: 'Compliance',
    riskCount: 22,
    highCount: 2,
    criticalCount: 0,
    residualExposure: '$480K',
    exposureValue: 0.48,
    trend: 'down',
    avgResidualScore: 11.2,
    appetiteLimit: 13.0,
    status: 'within_appetite',
  },
  {
    category: 'Reputational',
    riskCount: 14,
    highCount: 1,
    criticalCount: 0,
    residualExposure: '$310K',
    exposureValue: 0.31,
    trend: 'flat',
    avgResidualScore: 9.5,
    appetiteLimit: 12.0,
    status: 'within_appetite',
  },
  {
    category: 'People',
    riskCount: 16,
    highCount: 1,
    criticalCount: 0,
    residualExposure: '$290K',
    exposureValue: 0.29,
    trend: 'down',
    avgResidualScore: 8.7,
    appetiteLimit: 11.0,
    status: 'within_appetite',
  },
]

export const CATEGORY_EXPOSURE = CATEGORY_EXPOSURES

/* ─────────────────────────────────────────────────────────────
 * 7. Risk Exposure by Department
 * ───────────────────────────────────────────────────────────── */

export const DEPARTMENT_EXPOSURES: DepartmentExposureItem[] = [
  {
    department: 'IT',
    risks: 42,
    critical: 4,
    high: 8,
    exposure: '$1.6M',
    exposureValue: 1.6,
    trend: 'up',
  },
  {
    department: 'Operations',
    risks: 56,
    critical: 3,
    high: 10,
    exposure: '$1.2M',
    exposureValue: 1.2,
    trend: 'up',
  },
  {
    department: 'Procurement',
    risks: 18,
    critical: 2,
    high: 5,
    exposure: '$980K',
    exposureValue: 0.98,
    trend: 'up',
  },
  {
    department: 'Finance',
    risks: 28,
    critical: 2,
    high: 6,
    exposure: '$920K',
    exposureValue: 0.92,
    trend: 'down',
  },
  {
    department: 'Legal',
    risks: 22,
    critical: 1,
    high: 4,
    exposure: '$480K',
    exposureValue: 0.48,
    trend: 'flat',
  },
  {
    department: 'HR',
    risks: 16,
    critical: 0,
    high: 2,
    exposure: '$290K',
    exposureValue: 0.29,
    trend: 'down',
  },
  {
    department: 'Sales',
    risks: 14,
    critical: 0,
    high: 2,
    exposure: '$210K',
    exposureValue: 0.21,
    trend: 'down',
  },
  {
    department: 'Marketing',
    risks: 12,
    critical: 0,
    high: 1,
    exposure: '$180K',
    exposureValue: 0.18,
    trend: 'flat',
  },
]

/* ─────────────────────────────────────────────────────────────
 * 8. Top Risks Requiring Attention (from prompt)
 * ───────────────────────────────────────────────────────────── */

export const TOP_RISKS_ATTENTION: ExecutiveRisk[] = [
  {
    id: 'RSK-1042',
    title: 'Cybersecurity Breach — Core Payment Ingress',
    category: 'Cybersecurity',
    department: 'IT',
    businessUnit: 'IT & Digital Infrastructure',
    owner: 'Head of IT',
    ownerRole: 'Head of IT & Infrastructure',
    severity: 'critical',
    riskScore: 22,
    residualScore: 22,
    inherentScore: 25,
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualLikelihood: 4,
    residualImpact: 5,
    linkedControlsCount: 8,
    inherentExposure: '$2.1M',
    residualExposure: '$1.6M',
    trend: 'increasing',
    lastUpdated: 'Today (2h ago)',
    lastAssessed: 'Oct 04, 2026',
    executiveSummary:
      'High-velocity automated credential stuffing and DDoS telemetry observed targeting primary API gateways. Exceeds approved risk appetite of $1.2M.',
    nextActionTitle: 'Implement phishing-resistant authentication & rate limiting',
    nextActionDue: 'Oct 02, 2026',
    actionDaysOverdue: 5,
    actionStatus: 'overdue',
    isBreached: true,
    appetiteThreshold: '$1.2M',
    controlEffectiveness: 'partially_effective',
  },
  {
    id: 'RSK-0987',
    title: 'Third-Party Vendor Failure — Cloud Payment Gateway',
    category: 'Third-Party',
    department: 'Procurement',
    businessUnit: 'Procurement & Vendor Mgmt',
    owner: 'Procurement Director',
    ownerRole: 'Director of Global Procurement',
    severity: 'high',
    riskScore: 17,
    residualScore: 17,
    inherentScore: 20,
    inherentLikelihood: 4,
    inherentImpact: 5,
    residualLikelihood: 3,
    residualImpact: 5,
    linkedControlsCount: 5,
    inherentExposure: '$1.4M',
    residualExposure: '$980K',
    trend: 'increasing',
    lastUpdated: 'Yesterday',
    lastAssessed: 'Oct 03, 2026',
    executiveSummary:
      'Primary transaction gateway vendor undergoing debt restructuring; multi-region hot-standby failover contract currently stalled in legal signoff.',
    nextActionTitle: 'Establish multi-region cloud failover contract',
    nextActionDue: 'Sep 28, 2026',
    actionDaysOverdue: 9,
    actionStatus: 'overdue',
    isBreached: true,
    appetiteThreshold: '$800K',
    controlEffectiveness: 'partially_effective',
  },
  {
    id: 'RSK-0872',
    title: 'Regulatory Compliance Gap — EU DORA Framework',
    category: 'Compliance',
    department: 'Legal',
    businessUnit: 'Legal & Regulatory Affairs',
    owner: 'Compliance Manager',
    ownerRole: 'Senior Compliance Manager',
    severity: 'high',
    riskScore: 16,
    residualScore: 16,
    inherentScore: 18,
    inherentLikelihood: 3,
    inherentImpact: 5,
    residualLikelihood: 3,
    residualImpact: 4,
    linkedControlsCount: 6,
    inherentExposure: '$780K',
    residualExposure: '$480K',
    trend: 'stable',
    lastUpdated: '3d ago',
    lastAssessed: 'Sep 29, 2026',
    executiveSummary:
      'Digital Operational Resilience Act (DORA) enforcement deadline pending. Supplier register requires 14 additional technical audit attestations.',
    nextActionTitle: 'Complete DORA cross-border supplier audit',
    nextActionDue: 'Oct 01, 2026',
    actionDaysOverdue: 6,
    actionStatus: 'overdue',
    isBreached: false,
    appetiteThreshold: '$500K',
    controlEffectiveness: 'partially_effective',
  },
  {
    id: 'RSK-1104',
    title: 'AI Governance & Proprietary Data Exfiltration',
    category: 'Technology',
    department: 'IT',
    businessUnit: 'Information Security Office',
    owner: 'Chief Information Security Officer',
    ownerRole: 'CISO',
    severity: 'critical',
    riskScore: 20,
    residualScore: 20,
    inherentScore: 25,
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualLikelihood: 4,
    residualImpact: 5,
    linkedControlsCount: 4,
    inherentExposure: '$1.5M',
    residualExposure: '$1.1M',
    trend: 'increasing',
    lastUpdated: 'Today',
    lastAssessed: 'Oct 05, 2026',
    executiveSummary:
      'Employees testing unauthorized external LLM APIs with production datasets. Data loss prevention rules intercepting 180+ weekly exfiltration attempts.',
    nextActionTitle: 'Deploy LLM data loss prevention proxy & sandboxed models',
    nextActionDue: 'Sep 25, 2026',
    actionDaysOverdue: 12,
    actionStatus: 'overdue',
    isBreached: true,
    appetiteThreshold: '$1.0M',
    controlEffectiveness: 'ineffective',
  },
  {
    id: 'RSK-0765',
    title: 'Cloud Service Level Dependency — Core Database Cluster',
    category: 'Technology',
    department: 'Operations',
    businessUnit: 'Global Cloud Operations',
    owner: 'VP Infrastructure',
    ownerRole: 'VP of Global Infrastructure',
    severity: 'high',
    riskScore: 15,
    residualScore: 15,
    inherentScore: 20,
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualLikelihood: 3,
    residualImpact: 4,
    linkedControlsCount: 7,
    inherentExposure: '$1.3M',
    residualExposure: '$760K',
    trend: 'increasing',
    lastUpdated: '4d ago',
    lastAssessed: 'Sep 27, 2026',
    executiveSummary:
      'Database read-replica latencies exceeding 400ms SLA during month-end reconciliation runs. Storage autoscaling limits reached.',
    nextActionTitle: 'Conduct automated database partitioning & memory expansion',
    nextActionDue: 'Sep 30, 2026',
    actionDaysOverdue: 7,
    actionStatus: 'overdue',
    isBreached: false,
    appetiteThreshold: '$800K',
    controlEffectiveness: 'partially_effective',
  },
  {
    id: 'RSK-0651',
    title: 'Liquidity Stress Under Sudden Market Volatility',
    category: 'Financial',
    department: 'Finance',
    businessUnit: 'Treasury & Capital Markets',
    owner: 'Treasurer',
    ownerRole: 'Head of Treasury & Capital Markets',
    severity: 'high',
    riskScore: 14,
    residualScore: 14,
    inherentScore: 18,
    inherentLikelihood: 3,
    inherentImpact: 4,
    residualLikelihood: 2,
    residualImpact: 4,
    linkedControlsCount: 9,
    inherentExposure: '$1.2M',
    residualExposure: '$920K',
    trend: 'decreasing',
    lastUpdated: '1w ago',
    lastAssessed: 'Sep 22, 2026',
    executiveSummary:
      'Interest rate hedging program mitigated short-term yield volatility; capital reserve buffers remain well above Basel III liquidity ratios at 164%.',
    nextActionTitle: 'Finalize quarterly collateral rebalancing schedule',
    nextActionDue: 'Oct 15, 2026',
    actionStatus: 'in_progress',
    isBreached: false,
    appetiteThreshold: '$1.0M',
    controlEffectiveness: 'effective',
  },
]

export const TOP_EXECUTIVE_RISKS = TOP_RISKS_ATTENTION

export const BUSINESS_UNITS = [
  'All Business Units',
  'IT',
  'Operations',
  'Procurement',
  'Finance',
  'Legal',
  'HR',
  'Sales',
  'Marketing',
] as const

export const TIME_HORIZONS = [
  { id: 'q4_2026', label: 'Q4 2026' },
  { id: 'q1_2026', label: 'Q1 2026' },
  { id: 'q2_2026', label: 'Q2 2026' },
  { id: 'q3_2026', label: 'Q3 2026' },
] as const

export interface MatrixCellData {
  likelihood: number
  impact: number
  residualCount: number
  inherentCount: number
  severity: RiskSeverity
  score: number
  topRiskIds?: string[]
}

export const HEATMAP_MATRIX: MatrixCellData[] = MATRIX_PREVIEW_CELLS.map((c) => ({
  likelihood: c.likelihood,
  impact: c.impact,
  residualCount: c.count,
  inherentCount: Math.round(c.count * 1.3),
  severity: c.severity,
  score: c.score,
  topRiskIds:
    c.score >= 20 ? ['RSK-1042', 'RSK-1104'] : c.score >= 15 ? ['RSK-0987', 'RSK-0872'] : [],
}))

export interface KriItem {
  id: string
  code: string
  name: string
  category: string
  currentValue: string
  threshold: string
  unit: string
  status: 'within_appetite' | 'warning' | 'breached'
  trend: 'up' | 'down' | 'flat'
  lastMeasured: string
}

export const KEY_RISK_INDICATORS: KriItem[] = [
  {
    id: 'kri-1',
    code: 'KRI-SEC-01',
    name: 'Unpatched Critical CVEs > 14 Days',
    category: 'Cybersecurity',
    currentValue: '18',
    threshold: '10',
    unit: 'vulnerabilities',
    status: 'breached',
    trend: 'up',
    lastMeasured: '2h ago',
  },
  {
    id: 'kri-2',
    code: 'KRI-OPS-03',
    name: 'Core Payment Gateway Latency p99',
    category: 'Technology',
    currentValue: '420',
    threshold: '350',
    unit: 'ms',
    status: 'warning',
    trend: 'up',
    lastMeasured: '1h ago',
  },
  {
    id: 'kri-3',
    code: 'KRI-FIN-02',
    name: 'Liquidity Coverage Ratio (LCR)',
    category: 'Financial',
    currentValue: '164',
    threshold: '120',
    unit: '%',
    status: 'within_appetite',
    trend: 'flat',
    lastMeasured: 'Yesterday',
  },
  {
    id: 'kri-4',
    code: 'KRI-CMP-04',
    name: 'DORA Third-Party Audit Completion',
    category: 'Compliance',
    currentValue: '76',
    threshold: '85',
    unit: '%',
    status: 'warning',
    trend: 'up',
    lastMeasured: '3d ago',
  },
]

/* ─────────────────────────────────────────────────────────────
 * 9. Risk Appetite Monitoring (from prompt)
 * 82% Within Appetite, 3 Breaches
 * ───────────────────────────────────────────────────────────── */

export const APPETITE_MONITORING = {
  overallWithinPct: 82,
  breachCount: 3,
  breaches: [
    {
      category: 'Cybersecurity',
      currentExposure: '$1.6M',
      appetiteThreshold: '$1.2M',
      variance: '+$400K',
      varianceValue: 400000,
      status: 'Above Appetite' as const,
    },
    {
      category: 'Third-Party',
      currentExposure: '$980K',
      appetiteThreshold: '$800K',
      variance: '+$180K',
      varianceValue: 180000,
      status: 'Above Appetite' as const,
    },
    {
      category: 'Technology',
      currentExposure: '$1.1M',
      appetiteThreshold: '$1.0M',
      variance: '+$100K',
      varianceValue: 100000,
      status: 'Above Appetite' as const,
    },
  ],
}

/* ─────────────────────────────────────────────────────────────
 * 10. Overdue Mitigation Actions (from prompt: 17 total, 6 critical)
 * ───────────────────────────────────────────────────────────── */

export const OVERDUE_ACTIONS: OverdueAction[] = [
  {
    id: 'ACT-302',
    actionTitle: 'Implement phishing-resistant authentication',
    riskId: 'RSK-1042',
    riskName: 'Cybersecurity Breach',
    owner: 'Head of IT',
    dueDate: 'Oct 02, 2026',
    daysOverdue: 5,
    severity: 'critical',
    status: 'overdue',
  },
  {
    id: 'ACT-298',
    actionTitle: 'Establish multi-region cloud failover contract',
    riskId: 'RSK-0987',
    riskName: 'Third-Party Vendor Failure',
    owner: 'Procurement Director',
    dueDate: 'Sep 28, 2026',
    daysOverdue: 9,
    severity: 'critical',
    status: 'overdue',
  },
  {
    id: 'ACT-314',
    actionTitle: 'Deploy LLM data loss prevention proxy',
    riskId: 'RSK-1104',
    riskName: 'AI Governance & Data Exfiltration',
    owner: 'CISO',
    dueDate: 'Sep 25, 2026',
    daysOverdue: 12,
    severity: 'critical',
    status: 'overdue',
  },
  {
    id: 'ACT-285',
    actionTitle: 'Complete DORA cross-border supplier audit',
    riskId: 'RSK-0872',
    riskName: 'Regulatory Compliance Gap',
    owner: 'Compliance Manager',
    dueDate: 'Oct 01, 2026',
    daysOverdue: 6,
    severity: 'high',
    status: 'overdue',
  },
  {
    id: 'ACT-271',
    actionTitle: 'Conduct database automated latency load test',
    riskId: 'RSK-0765',
    riskName: 'Cloud Service Level Dependency',
    owner: 'VP Infrastructure',
    dueDate: 'Sep 30, 2026',
    daysOverdue: 7,
    severity: 'high',
    status: 'overdue',
  },
]

/* ─────────────────────────────────────────────────────────────
 * 11. Control Effectiveness (from prompt)
 * 68% Effective, 24% Partially Effective, 8% Ineffective
 * 342 Controls, 287 Tested, 27 Failed, 14 Overdue tests
 * ───────────────────────────────────────────────────────────── */

export const CONTROL_EFFECTIVENESS_METRICS = {
  effectivePct: 68,
  partiallyEffectivePct: 24,
  ineffectivePct: 8,
  totalControls: 342,
  testedControls: 287,
  failedControls: 27,
  overdueTests: 14,
}

/* ─────────────────────────────────────────────────────────────
 * 12. Emerging Risks (from prompt)
 * ───────────────────────────────────────────────────────────── */

export const EMERGING_RISKS: EmergingRiskItem[] = [
  {
    id: 'EMG-101',
    name: 'AI Governance & Shadow Model Adoption',
    category: 'Technology',
    score: 14,
    trend: 'up_fast',
    velocity: 'Fast (+4 pts / 30d)',
    owner: 'CISO',
    summary: 'Proliferation of autonomous generative agents across marketing and sales teams.',
  },
  {
    id: 'EMG-102',
    name: 'Third-Party Concentration in EU Cloud Infrastructure',
    category: 'Third-Party',
    score: 13,
    trend: 'up_fast',
    velocity: 'Fast (+3 pts / 30d)',
    owner: 'VP Infrastructure',
    summary: 'Single-cloud provider dependency nearing 78% of critical revenue services.',
  },
  {
    id: 'EMG-103',
    name: 'Quantum Cryptography Transition Readiness',
    category: 'Cybersecurity',
    score: 11,
    trend: 'up_moderate',
    velocity: 'Moderate (+2 pts / 60d)',
    owner: 'Head of Infosec',
    summary: 'Post-quantum encryption requirements for legacy financial archival records.',
  },
  {
    id: 'EMG-104',
    name: 'Cross-Border Data Sovereignty Mandates',
    category: 'Compliance',
    score: 12,
    trend: 'up_moderate',
    velocity: 'Moderate (+1 pt / 30d)',
    owner: 'Legal Counsel',
    summary: 'New regional residency obligations in APAC payment settlement corridors.',
  },
  {
    id: 'EMG-105',
    name: 'Critical Hardware Supply Chain Disruption',
    category: 'Operational',
    score: 10,
    trend: 'up_moderate',
    velocity: 'Moderate (+1 pt / 45d)',
    owner: 'Supply Chain Lead',
    summary: 'Lead times for next-gen HSM hardware modules extended to 24 weeks.',
  },
]

/* ─────────────────────────────────────────────────────────────
 * 13. Recent Risk Activity (from prompt)
 * ───────────────────────────────────────────────────────────── */

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'act-1',
    timeAgo: 'Today',
    title: 'Risk score updated',
    description: 'RSK-1042 Cybersecurity Breach escalated from 18 to 22 / 25.',
    type: 'score',
  },
  {
    id: 'act-2',
    timeAgo: '2h ago',
    title: 'New control added',
    description: 'Multi-Factor Authentication (Hardware tokens enforced for root admins).',
    type: 'control',
  },
  {
    id: 'act-3',
    timeAgo: 'Yesterday',
    title: 'Risk assessment completed',
    description: 'RSK-0987 Third-Party Vendor Failure re-evaluated by Procurement.',
    type: 'assessment',
  },
  {
    id: 'act-4',
    timeAgo: 'Yesterday',
    title: 'Action marked overdue',
    description: 'ACT-285 Data Privacy Review passed regulatory SLA deadline.',
    type: 'action',
  },
  {
    id: 'act-5',
    timeAgo: '2d ago',
    title: 'Appetite threshold adjusted',
    description: 'Board Risk Committee ratified $1.2M Cybersecurity exposure limit.',
    type: 'appetite',
  },
]

/* ─────────────────────────────────────────────────────────────
 * 14. Selectable Organizations and Reporting Horizons
 * ───────────────────────────────────────────────────────────── */

export const ORGANIZATIONS = [
  'All Organizations',
  'Acme Financial Holdings',
  'North America Operations',
  'EMEA Banking & Markets',
  'APAC Retail Services',
] as const

export const REPORTING_PERIODS = [
  { id: 'q4_2026', label: 'Q4 2026' },
  { id: 'today', label: 'Today' },
  { id: 'this_month', label: 'This Month' },
  { id: 'this_quarter', label: 'This Quarter' },
  { id: 'this_year', label: 'This Year' },
  { id: 'custom', label: 'Custom Range…' },
] as const

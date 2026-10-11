import type { RiskSeverity } from '@/tokens'
export type { RiskSeverity }

export type RegisterRiskStatus =
  | 'open'
  | 'under_review'
  | 'mitigating'
  | 'accepted'
  | 'closed'

export type RiskAppetiteStatus = 'within' | 'near_threshold' | 'breached'

export type RiskTrendDirection = 'increasing' | 'stable' | 'decreasing'

export type RiskCategoryName =
  | 'Strategic'
  | 'Operational'
  | 'Financial'
  | 'Compliance'
  | 'Technology'
  | 'Cybersecurity'
  | 'Reputational'
  | 'People'
  | 'Third-Party'

export type DepartmentName =
  | 'IT'
  | 'Finance'
  | 'Operations'
  | 'HR'
  | 'Sales'
  | 'Procurement'
  | 'Legal'
  | 'Marketing'

export type UserRolePermission = 'manager' | 'owner' | 'executive'

export interface RiskRegisterItem {
  id: string
  title: string
  description: string
  category: RiskCategoryName
  department: DepartmentName
  owner: string
  ownerRole: string
  ownerEmail: string
  inherentScore: number
  inherentSeverity: RiskSeverity
  inherentLikelihood: number
  inherentImpact: number
  residualScore: number
  residualSeverity: RiskSeverity
  residualLikelihood: number
  residualImpact: number
  trend: RiskTrendDirection
  trendDeltaText?: string
  appetiteStatus: RiskAppetiteStatus
  appetiteThreshold: string
  status: RegisterRiskStatus
  nextReviewDate: string
  isReviewOverdue: boolean
  daysOverdue?: number
  lastUpdated: string
  createdDate: string
  controlEffectiveness: 'effective' | 'partially_effective' | 'ineffective'
  linkedControlsCount: number
  mitigationActionTitle?: string
  mitigationDaysRemaining?: number
  tags: string[]
}

export interface SavedViewConfig {
  id: string
  label: string
  description: string
  count?: number
  filters: {
    search?: string
    severity?: RiskSeverity[]
    status?: RegisterRiskStatus[]
    category?: RiskCategoryName[]
    department?: DepartmentName[]
    appetite?: RiskAppetiteStatus[]
    reviewStatus?: 'all' | 'overdue' | 'due_soon' | 'up_to_date'
    owner?: string
  }
  sortField?: keyof RiskRegisterItem
  sortDirection?: 'asc' | 'desc'
}
export interface ColumnVisibilityState {
  id: boolean
  title: boolean
  category: boolean
  owner: boolean
  department: boolean
  inherentRisk: boolean
  residualRisk: boolean
  trend: boolean
  appetite: boolean
  status: boolean
  nextReview: boolean
  lastUpdated: boolean
}

export const DEFAULT_COLUMN_VISIBILITY: ColumnVisibilityState = {
  id: true,
  title: true,
  category: true,
  owner: true,
  department: true,
  inherentRisk: true,
  residualRisk: true,
  trend: true,
  appetite: true,
  status: true,
  nextReview: true,
  lastUpdated: true,
}

export const RISK_CATEGORIES: RiskCategoryName[] = [
  'Strategic',
  'Operational',
  'Financial',
  'Compliance',
  'Technology',
  'Cybersecurity',
  'Reputational',
  'People',
  'Third-Party',
]

export const DEPARTMENTS: DepartmentName[] = [
  'IT',
  'Finance',
  'Operations',
  'HR',
  'Sales',
  'Procurement',
  'Legal',
  'Marketing',
]

export const RISK_OWNERS = [
  { name: 'James Wilson', role: 'Head of IT & Infrastructure', email: 'j.wilson@riskos.example', department: 'IT' },
  { name: 'Priya Nair', role: 'Head of Operational Risk', email: 'priya.nair@riskos.example', department: 'Operations' },
  { name: 'Elena Rostova', role: 'Director of Global Procurement', email: 'e.rostova@riskos.example', department: 'Procurement' },
  { name: 'Marcus Chen', role: 'Chief Information Security Officer', email: 'm.chen@riskos.example', department: 'IT' },
  { name: 'Sarah Jenkins', role: 'Senior Compliance Manager', email: 's.jenkins@riskos.example', department: 'Legal' },
  { name: 'David Kim', role: 'VP Global Infrastructure', email: 'd.kim@riskos.example', department: 'Operations' },
  { name: 'Michael Vance', role: 'Head of Treasury & Capital Markets', email: 'm.vance@riskos.example', department: 'Finance' },
  { name: 'Amanda Ross', role: 'Global HR Director', email: 'a.ross@riskos.example', department: 'HR' },
  { name: 'Carlos Mendez', role: 'Sales Operations Lead', email: 'c.mendez@riskos.example', department: 'Sales' },
  { name: 'Rachel Foster', role: 'Director of Communications', email: 'r.foster@riskos.example', department: 'Marketing' },
]

export const DEFAULT_SAVED_VIEWS: SavedViewConfig[] = [
  {
    id: 'all',
    label: 'All Risks',
    description: 'All 248 active organizational risks across portfolio',
    filters: {},
    sortField: 'residualScore',
    sortDirection: 'desc',
  },
  {
    id: 'critical',
    label: 'Critical Risks',
    description: '12 critical risks requiring immediate executive escalation',
    filters: { severity: ['critical'] },
    sortField: 'residualScore',
    sortDirection: 'desc',
  },
  {
    id: 'my-risks',
    label: 'My Risks',
    description: 'Risks assigned to current user (Priya Nair)',
    filters: { owner: 'Priya Nair' },
    sortField: 'residualScore',
    sortDirection: 'desc',
  },
  {
    id: 'high-exposure',
    label: 'High Exposure',
    description: '50 high and critical risks combined',
    filters: { severity: ['critical', 'high'] },
    sortField: 'residualScore',
    sortDirection: 'desc',
  },
  {
    id: 'overdue-reviews',
    label: 'Overdue Reviews',
    description: '17 risks past their required reassessment window',
    filters: { reviewStatus: 'overdue' },
    sortField: 'residualScore',
    sortDirection: 'desc',
  },
  {
    id: 'appetite-breaches',
    label: 'Appetite Breaches',
    description: 'Risks operating above board-approved tolerance thresholds',
    filters: { appetite: ['breached'] },
    sortField: 'residualScore',
    sortDirection: 'desc',
  },
  {
    id: 'recently-updated',
    label: 'Recently Updated',
    description: 'Risks modified within the last 7 calendar days',
    filters: {},
    sortField: 'lastUpdated',
    sortDirection: 'asc',
  },
  {
    id: 'emerging-risks',
    label: 'Emerging Risks',
    description: 'Fast-moving threats showing upward velocity',
    filters: {},
    sortField: 'trend',
    sortDirection: 'asc',
  },
]

/* ─────────────────────────────────────────────────────────────
 * Handcrafted Core Enterprise Risks (Matching Steps 01–03)
 * ───────────────────────────────────────────────────────────── */

const CORE_HANDCRAFTED_RISKS: RiskRegisterItem[] = [
  {
    id: 'RSK-1042',
    title: 'Cybersecurity Breach',
    description:
      'Unauthorized access to sensitive organizational systems could result in data exposure, operational disruption, financial loss, and reputational damage. Potential causes include phishing attacks, compromised credentials, insufficient access controls, and vulnerabilities in third-party systems.',
    category: 'Cybersecurity',
    department: 'IT',
    owner: 'James Wilson',
    ownerRole: 'Head of IT',
    ownerEmail: 'j.wilson@riskos.example',
    inherentScore: 22,
    inherentSeverity: 'critical',
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualScore: 16,
    residualSeverity: 'high',
    residualLikelihood: 4,
    residualImpact: 4,
    trend: 'increasing',
    trendDeltaText: 'Exposure has increased over the last 30 days.',
    appetiteStatus: 'breached',
    appetiteThreshold: 'Approved Threshold: 12/25 (+4 variance)',
    status: 'mitigating',
    nextReviewDate: 'Nov 18, 2026',
    isReviewOverdue: false,
    lastUpdated: 'Oct 11, 2026',
    createdDate: 'Aug 12, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 3,
    mitigationActionTitle: 'Implement Phishing-Resistant Authentication',
    mitigationDaysRemaining: 9,
    tags: ['Cybersecurity', 'AccessControl', 'Phishing', 'ZeroTrust'],
  },
  {
    id: 'RSK-1104',
    title: 'AI Governance & Proprietary Data Exfiltration',
    description: 'Employees testing unauthorized external LLM APIs with production datasets; DLP intercepting weekly leakage.',
    category: 'Technology',
    department: 'IT',
    owner: 'Marcus Chen',
    ownerRole: 'Chief Information Security Officer',
    ownerEmail: 'm.chen@riskos.example',
    inherentScore: 25,
    inherentSeverity: 'critical',
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualScore: 20,
    residualSeverity: 'critical',
    residualLikelihood: 4,
    residualImpact: 5,
    trend: 'increasing',
    trendDeltaText: 'Score increased +3 pts as shadow model usage rose across sales and product teams.',
    appetiteStatus: 'breached',
    appetiteThreshold: 'Tolerance Cap: $1.0M (Score ≤ 14)',
    status: 'open',
    nextReviewDate: 'Sep 25, 2026',
    isReviewOverdue: true,
    daysOverdue: 13,
    lastUpdated: 'Today',
    createdDate: 'Jul 10, 2026',
    controlEffectiveness: 'ineffective',
    linkedControlsCount: 4,
    mitigationActionTitle: 'Deploy LLM data loss prevention proxy & sandboxed models',
    mitigationDaysRemaining: 0,
    tags: ['GenAI', 'DLP', 'DataPrivacy'],
  },
  {
    id: 'RSK-0987',
    title: 'Third-Party Vendor Failure — Cloud Payment Gateway',
    description: 'Primary transaction gateway vendor undergoing debt restructuring; multi-region hot-standby failover contract stalled.',
    category: 'Third-Party',
    department: 'Procurement',
    owner: 'Elena Rostova',
    ownerRole: 'Director of Global Procurement',
    ownerEmail: 'e.rostova@riskos.example',
    inherentScore: 20,
    inherentSeverity: 'critical',
    inherentLikelihood: 4,
    inherentImpact: 5,
    residualScore: 17,
    residualSeverity: 'critical',
    residualLikelihood: 3,
    residualImpact: 5,
    trend: 'increasing',
    trendDeltaText: 'Vendor credit rating downgraded from BBB to B- by Fitch.',
    appetiteStatus: 'breached',
    appetiteThreshold: 'Tolerance Cap: $800K (Score ≤ 12)',
    status: 'under_review',
    nextReviewDate: 'Sep 28, 2026',
    isReviewOverdue: true,
    daysOverdue: 10,
    lastUpdated: 'Yesterday',
    createdDate: 'Apr 05, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 5,
    mitigationActionTitle: 'Establish multi-region cloud failover contract',
    mitigationDaysRemaining: 0,
    tags: ['VendorRisk', 'PaymentRails', 'SLA'],
  },
  {
    id: 'RSK-1092',
    title: 'Ransomware Lateral Movement in Active Directory',
    description: 'Privilege creep in legacy hybrid domain controllers exposing credential vaults to lateral escalation.',
    category: 'Cybersecurity',
    department: 'IT',
    owner: 'Marcus Chen',
    ownerRole: 'Chief Information Security Officer',
    ownerEmail: 'm.chen@riskos.example',
    inherentScore: 25,
    inherentSeverity: 'critical',
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualScore: 19,
    residualSeverity: 'critical',
    residualLikelihood: 4,
    residualImpact: 4,
    trend: 'stable',
    appetiteStatus: 'breached',
    appetiteThreshold: 'Tolerance Cap: Score ≤ 14',
    status: 'mitigating',
    nextReviewDate: 'Nov 12, 2026',
    isReviewOverdue: false,
    lastUpdated: '3 days ago',
    createdDate: 'Jun 19, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 6,
    mitigationActionTitle: 'Tiered administration model & PAM deployment',
    mitigationDaysRemaining: 34,
    tags: ['ActiveDirectory', 'PAM', 'Infosec'],
  },
  {
    id: 'RSK-1120',
    title: 'Primary Cloud Data Center Flood & Power Outage',
    description: 'Secondary generator fuel contract expired in Northern Virginia availability zone amid peak storm season.',
    category: 'Operational',
    department: 'Operations',
    owner: 'Priya Nair',
    ownerRole: 'Head of Operational Risk',
    ownerEmail: 'priya.nair@riskos.example',
    inherentScore: 20,
    inherentSeverity: 'critical',
    inherentLikelihood: 4,
    inherentImpact: 5,
    residualScore: 18,
    residualSeverity: 'critical',
    residualLikelihood: 3,
    residualImpact: 5,
    trend: 'increasing',
    appetiteStatus: 'breached',
    appetiteThreshold: 'Tolerance Cap: Score ≤ 12',
    status: 'open',
    nextReviewDate: 'Oct 04, 2026',
    isReviewOverdue: true,
    daysOverdue: 4,
    lastUpdated: '1 day ago',
    createdDate: 'Aug 02, 2026',
    controlEffectiveness: 'ineffective',
    linkedControlsCount: 3,
    mitigationActionTitle: 'Sign emergency fuel replenishment agreement',
    tags: ['DisasterRecovery', 'BusinessContinuity'],
  },
  {
    id: 'RSK-1055',
    title: 'SWIFT Settlement Gateway Authentication Failure',
    description: 'Hardware security modules nearing firmware deprecation lifecycle without verified redundant failover.',
    category: 'Financial',
    department: 'Finance',
    owner: 'Michael Vance',
    ownerRole: 'Head of Treasury & Capital Markets',
    ownerEmail: 'm.vance@riskos.example',
    inherentScore: 25,
    inherentSeverity: 'critical',
    inherentLikelihood: 5,
    inherentImpact: 5,
    residualScore: 17,
    residualSeverity: 'critical',
    residualLikelihood: 3,
    residualImpact: 5,
    trend: 'stable',
    appetiteStatus: 'breached',
    appetiteThreshold: 'Tolerance Cap: Score ≤ 12',
    status: 'mitigating',
    nextReviewDate: 'Nov 30, 2026',
    isReviewOverdue: false,
    lastUpdated: '5 days ago',
    createdDate: 'May 11, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 7,
    mitigationActionTitle: 'Deploy next-gen cryptographic HSM pair',
    tags: ['SWIFT', 'Treasury', 'Liquidity'],
  },
  {
    id: 'RSK-0872',
    title: 'Regulatory Compliance Gap — EU DORA Framework',
    description: 'Digital Operational Resilience Act (DORA) enforcement deadline pending. Supplier register requires 14 technical attestations.',
    category: 'Compliance',
    department: 'Legal',
    owner: 'Sarah Jenkins',
    ownerRole: 'Senior Compliance Manager',
    ownerEmail: 's.jenkins@riskos.example',
    inherentScore: 18,
    inherentSeverity: 'high',
    inherentLikelihood: 3,
    inherentImpact: 5,
    residualScore: 16,
    residualSeverity: 'high',
    residualLikelihood: 3,
    residualImpact: 4,
    trend: 'stable',
    appetiteStatus: 'within',
    appetiteThreshold: 'Tolerance Cap: $500K (Score ≤ 16)',
    status: 'mitigating',
    nextReviewDate: 'Oct 01, 2026',
    isReviewOverdue: true,
    daysOverdue: 7,
    lastUpdated: '3 days ago',
    createdDate: 'Feb 18, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 6,
    mitigationActionTitle: 'Complete DORA cross-border supplier audit',
    mitigationDaysRemaining: 0,
    tags: ['DORA', 'EU', 'Regulatory'],
  },
  {
    id: 'RSK-0765',
    title: 'Cloud Service Level Dependency — Core Database Cluster',
    description: 'Database read-replica latencies exceeding 400ms SLA during month-end reconciliation runs. Storage autoscaling limits reached.',
    category: 'Technology',
    department: 'Operations',
    owner: 'David Kim',
    ownerRole: 'VP Global Infrastructure',
    ownerEmail: 'd.kim@riskos.example',
    inherentScore: 20,
    inherentSeverity: 'critical',
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualScore: 15,
    residualSeverity: 'high',
    residualLikelihood: 3,
    residualImpact: 4,
    trend: 'increasing',
    appetiteStatus: 'near_threshold',
    appetiteThreshold: 'Tolerance Cap: $800K (Score ≤ 15)',
    status: 'mitigating',
    nextReviewDate: 'Sep 30, 2026',
    isReviewOverdue: true,
    daysOverdue: 8,
    lastUpdated: '4 days ago',
    createdDate: 'Jan 29, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 7,
    mitigationActionTitle: 'Conduct automated database partitioning & memory expansion',
    tags: ['Database', 'SLA', 'Latency'],
  },
  {
    id: 'RSK-0651',
    title: 'Liquidity Stress Under Sudden Market Volatility',
    description: 'Interest rate hedging program mitigated short-term yield volatility; capital reserve buffers remain well above Basel III liquidity ratios.',
    category: 'Financial',
    department: 'Finance',
    owner: 'Michael Vance',
    ownerRole: 'Head of Treasury & Capital Markets',
    ownerEmail: 'm.vance@riskos.example',
    inherentScore: 18,
    inherentSeverity: 'high',
    inherentLikelihood: 3,
    inherentImpact: 4,
    residualScore: 14,
    residualSeverity: 'high',
    residualLikelihood: 2,
    residualImpact: 4,
    trend: 'decreasing',
    appetiteStatus: 'within',
    appetiteThreshold: 'Tolerance Cap: $1.0M (Score ≤ 15)',
    status: 'open',
    nextReviewDate: 'Oct 15, 2026',
    isReviewOverdue: false,
    lastUpdated: '1 week ago',
    createdDate: 'Dec 03, 2025',
    controlEffectiveness: 'effective',
    linkedControlsCount: 9,
    mitigationActionTitle: 'Finalize quarterly collateral rebalancing schedule',
    tags: ['BaselIII', 'Treasury', 'Liquidity'],
  },
  {
    id: 'RSK-0933',
    title: 'Customer Data Privacy Breach via Third-Party SDK',
    description: 'Mobile app analytics vendor included unapproved geolocation tracking module in latest iOS bundle release.',
    category: 'Compliance',
    department: 'Legal',
    owner: 'Sarah Jenkins',
    ownerRole: 'Senior Compliance Manager',
    ownerEmail: 's.jenkins@riskos.example',
    inherentScore: 20,
    inherentSeverity: 'critical',
    inherentLikelihood: 4,
    inherentImpact: 5,
    residualScore: 15,
    residualSeverity: 'high',
    residualLikelihood: 3,
    residualImpact: 4,
    trend: 'stable',
    appetiteStatus: 'near_threshold',
    appetiteThreshold: 'Tolerance Cap: Score ≤ 14',
    status: 'under_review',
    nextReviewDate: 'Nov 05, 2026',
    isReviewOverdue: false,
    lastUpdated: '4 days ago',
    createdDate: 'May 14, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 5,
    tags: ['GDPR', 'CCPA', 'MobileApp'],
  },
  {
    id: 'RSK-0842',
    title: 'Key Person Dependency — Chief Quantitative Architect',
    description: 'Single quantitative engineer maintains algorithmic trading risk calculations without documented succession model.',
    category: 'People',
    department: 'HR',
    owner: 'Amanda Ross',
    ownerRole: 'Global HR Director',
    ownerEmail: 'a.ross@riskos.example',
    inherentScore: 16,
    inherentSeverity: 'high',
    inherentLikelihood: 4,
    inherentImpact: 4,
    residualScore: 12,
    residualSeverity: 'high',
    residualLikelihood: 3,
    residualImpact: 4,
    trend: 'stable',
    appetiteStatus: 'within',
    appetiteThreshold: 'Tolerance Cap: Score ≤ 14',
    status: 'open',
    nextReviewDate: 'Dec 01, 2026',
    isReviewOverdue: false,
    lastUpdated: '1 week ago',
    createdDate: 'Jun 01, 2026',
    controlEffectiveness: 'partially_effective',
    linkedControlsCount: 3,
    tags: ['HR', 'Succession', 'KeyPerson'],
  },
  {
    id: 'RSK-0780',
    title: 'Brand Reputation Damage Following Service Outage',
    description: 'Social media sentiment negative following 45-minute checkout outage during European market opening hours.',
    category: 'Reputational',
    department: 'Marketing',
    owner: 'Rachel Foster',
    ownerRole: 'Director of Communications',
    ownerEmail: 'r.foster@riskos.example',
    inherentScore: 15,
    inherentSeverity: 'high',
    inherentLikelihood: 3,
    inherentImpact: 4,
    residualScore: 11,
    residualSeverity: 'high',
    residualLikelihood: 2,
    residualImpact: 4,
    trend: 'decreasing',
    appetiteStatus: 'within',
    appetiteThreshold: 'Tolerance Cap: Score ≤ 13',
    status: 'accepted',
    nextReviewDate: 'Nov 20, 2026',
    isReviewOverdue: false,
    lastUpdated: '2 weeks ago',
    createdDate: 'Mar 28, 2026',
    controlEffectiveness: 'effective',
    linkedControlsCount: 4,
    tags: ['Brand', 'PR', 'IncidentMgmt'],
  },
]

/* ─────────────────────────────────────────────────────────────
 * Generate Full 248 Enterprise Risks Dataset
 * Exactly matches all KPI targets:
 * - Total: 248
 * - Critical: 12
 * - High: 38
 * - Moderate: 84
 * - Low: 114
 * - Overdue: 17
 * - Statuses: Open: 86, Under Review: 34, Mitigating: 91, Accepted: 24, Closed: 13
 * ───────────────────────────────────────────────────────────── */

function generateEnterpriseRegister(): RiskRegisterItem[] {
  const result: RiskRegisterItem[] = [...CORE_HANDCRAFTED_RISKS]

  // Counts already in handcrafted risks:
  // Critical: 6
  // High: 6
  // Moderate: 0
  // Low: 0
  // Overdue: 6
  // Statuses: mitigating: 5, open: 4, under_review: 2, accepted: 1, closed: 0

  // Targets to fulfill:
  // Critical: 12 - 6 = 6 more
  // High: 38 - 6 = 32 more
  // Moderate: 84 more
  // Low: 114 more
  // Overdue: 17 - 6 = 11 more
  // Total additions: 6 + 32 + 84 + 114 = 236 additions -> 236 + 12 = 248 total!

  const titlesPool = [
    { title: 'API Token Rotation Delay across Microservices', cat: 'Technology' as RiskCategoryName, dept: 'IT' as DepartmentName },
    { title: 'Supplier Contract Non-Compliance in APAC Region', cat: 'Third-Party' as RiskCategoryName, dept: 'Procurement' as DepartmentName },
    { title: 'Treasury Counterparty Credit Exposure Breach', cat: 'Financial' as RiskCategoryName, dept: 'Finance' as DepartmentName },
    { title: 'Customer Onboarding AML Verification Bottleneck', cat: 'Compliance' as RiskCategoryName, dept: 'Legal' as DepartmentName },
    { title: 'Sales Commission Miscalculation in ERP System', cat: 'Operational' as RiskCategoryName, dept: 'Sales' as DepartmentName },
    { title: 'Employee Offboarding Account Deprovisioning Lag', cat: 'People' as RiskCategoryName, dept: 'HR' as DepartmentName },
    { title: 'Brand Trademark Infringement in Secondary Markets', cat: 'Reputational' as RiskCategoryName, dept: 'Marketing' as DepartmentName },
    { title: 'Strategic Product Launch Delay vs Competitor Roadmap', cat: 'Strategic' as RiskCategoryName, dept: 'Operations' as DepartmentName },
    { title: 'Legacy VPN Concentrator Vulnerability Patching', cat: 'Cybersecurity' as RiskCategoryName, dept: 'IT' as DepartmentName },
    { title: 'Foreign Exchange Hedging Inefficiency on Euro Inflows', cat: 'Financial' as RiskCategoryName, dept: 'Finance' as DepartmentName },
    { title: 'Warehouse Inventory Shrinkage Exceeding Tolerance', cat: 'Operational' as RiskCategoryName, dept: 'Operations' as DepartmentName },
    { title: 'ESG Reporting Disclosure Inconsistencies', cat: 'Compliance' as RiskCategoryName, dept: 'Legal' as DepartmentName },
    { title: 'Third-Party Cloud Billing Cost Overrun', cat: 'Technology' as RiskCategoryName, dept: 'IT' as DepartmentName },
    { title: 'Call Center Staff Attrition Impacting Customer SLA', cat: 'People' as RiskCategoryName, dept: 'HR' as DepartmentName },
    { title: 'Customer Churn in Tier-1 Enterprise Accounts', cat: 'Sales' as RiskCategoryName, dept: 'Sales' as DepartmentName },
  ]

  // Desired status allocation for remaining 236 risks:
  // Open target: 86 - 4 = 82
  // Under Review target: 34 - 2 = 32
  // Mitigating target: 91 - 5 = 86
  // Accepted target: 24 - 1 = 23
  // Closed target: 13 - 0 = 13
  const statusQueue: RegisterRiskStatus[] = [
    ...Array(82).fill('open'),
    ...Array(32).fill('under_review'),
    ...Array(86).fill('mitigating'),
    ...Array(23).fill('accepted'),
    ...Array(13).fill('closed'),
  ]

  // Desired overdue allocation for remaining 236: 11 overdue, 225 not overdue
  const overdueQueue: boolean[] = [
    ...Array(11).fill(true),
    ...Array(225).fill(false),
  ]

  let nextId = 1130
  let statusIdx = 0
  let overdueIdx = 0

  // Coordinate distributions across 5x5 matrix
  const critCoords: [number, number][] = [
    [5, 5], [5, 4], [4, 5], [5, 4], [4, 5], [4, 4],
  ]
  const highCoords: [number, number][] = [
    [5, 3], [3, 5], [4, 3], [3, 4], [5, 2], [2, 5],
  ]
  const modCoords: [number, number][] = [
    [3, 3], [4, 2], [2, 4], [3, 2], [2, 3], [5, 1], [1, 5],
  ]
  const lowCoords: [number, number][] = [
    [2, 2], [4, 1], [1, 4], [3, 1], [1, 3], [2, 1], [1, 2], [1, 1],
  ]

  // 1. Add remaining 6 Critical risks (Total critical = 12)
  for (let i = 0; i < 6; i++) {
    const t = titlesPool[i % titlesPool.length]
    const owner = RISK_OWNERS[i % RISK_OWNERS.length]
    const isOverdue = overdueQueue[overdueIdx++]
    const [resL, resI] = critCoords[i % critCoords.length]
    const score = resL * resI
    const inhL = 5
    const inhI = 5
    const inhScore = inhL * inhI

    result.push({
      id: `RSK-${nextId++}`,
      title: `${t.title} [Escalation ${i + 1}]`,
      description: `Critical operational risk concentration impacting enterprise stability and compliance metrics.`,
      category: t.cat,
      department: t.dept,
      owner: owner.name,
      ownerRole: owner.role,
      ownerEmail: owner.email,
      inherentScore: inhScore,
      inherentSeverity: 'critical',
      inherentLikelihood: inhL,
      inherentImpact: inhI,
      residualScore: score,
      residualSeverity: 'critical',
      residualLikelihood: resL,
      residualImpact: resI,
      trend: i % 2 === 0 ? 'increasing' : 'stable',
      appetiteStatus: 'breached',
      appetiteThreshold: 'Approved Threshold: 12/25',
      status: statusQueue[statusIdx++],
      nextReviewDate: isOverdue ? 'Sep 22, 2026' : 'Nov 14, 2026',
      isReviewOverdue: isOverdue,
      daysOverdue: isOverdue ? 16 : undefined,
      lastUpdated: `${(i % 5) + 1} days ago`,
      createdDate: 'Feb 10, 2026',
      controlEffectiveness: 'partially_effective',
      linkedControlsCount: 4 + (i % 4),
      tags: ['Escalated', 'BoardReview'],
    })
  }

  // 2. Add remaining 32 High risks (Total high = 38)
  // Target 15 of these 32 to be 'breached' so total breached across register = 6 (core) + 6 (crit) + 15 (high) = 27!
  for (let i = 0; i < 32; i++) {
    const t = titlesPool[(i + 3) % titlesPool.length]
    const owner = RISK_OWNERS[(i + 2) % RISK_OWNERS.length]
    const isOverdue = overdueQueue[overdueIdx++]
    const [resL, resI] = highCoords[i % highCoords.length]
    const score = resL * resI
    const inhL = Math.min(5, resL + 1)
    const inhI = Math.min(5, resI + 1)
    const inhScore = inhL * inhI

    result.push({
      id: `RSK-${nextId++}`,
      title: `${t.title} (Portfolio Item ${i + 1})`,
      description: `Elevated residual exposure being managed through scheduled mitigation controls.`,
      category: t.cat,
      department: t.dept,
      owner: owner.name,
      ownerRole: owner.role,
      ownerEmail: owner.email,
      inherentScore: inhScore,
      inherentSeverity: inhScore >= 16 ? 'critical' : 'high',
      inherentLikelihood: inhL,
      inherentImpact: inhI,
      residualScore: score,
      residualSeverity: 'high',
      residualLikelihood: resL,
      residualImpact: resI,
      trend: i % 3 === 0 ? 'increasing' : i % 3 === 1 ? 'stable' : 'decreasing',
      appetiteStatus: i < 15 ? 'breached' : i % 3 === 0 ? 'near_threshold' : 'within',
      appetiteThreshold: 'Approved Threshold: 12/25',
      status: statusQueue[statusIdx++],
      nextReviewDate: isOverdue ? 'Sep 29, 2026' : 'Nov 24, 2026',
      isReviewOverdue: isOverdue,
      daysOverdue: isOverdue ? 9 : undefined,
      lastUpdated: `${(i % 6) + 1} days ago`,
      createdDate: 'Mar 18, 2026',
      controlEffectiveness: i % 2 === 0 ? 'effective' : 'partially_effective',
      linkedControlsCount: 3 + (i % 5),
      tags: ['HighTier'],
    })
  }

  // 3. Add 84 Moderate risks (Total moderate = 84)
  for (let i = 0; i < 84; i++) {
    const t = titlesPool[(i + 5) % titlesPool.length]
    const owner = RISK_OWNERS[(i + 3) % RISK_OWNERS.length]
    const isOverdue = overdueQueue[overdueIdx++]
    const [resL, resI] = modCoords[i % modCoords.length]
    const score = resL * resI
    const inhL = Math.min(5, resL + 1)
    const inhI = Math.min(5, resI + 1)
    const inhScore = inhL * inhI

    result.push({
      id: `RSK-${nextId++}`,
      title: `${t.title} - Operational Track ${i + 1}`,
      description: `Moderate risk operating within standard departmental governance boundaries.`,
      category: t.cat,
      department: t.dept,
      owner: owner.name,
      ownerRole: owner.role,
      ownerEmail: owner.email,
      inherentScore: inhScore,
      inherentSeverity: inhScore >= 16 ? 'critical' : inhScore >= 10 ? 'high' : 'moderate',
      inherentLikelihood: inhL,
      inherentImpact: inhI,
      residualScore: score,
      residualSeverity: 'moderate',
      residualLikelihood: resL,
      residualImpact: resI,
      trend: i % 4 === 0 ? 'increasing' : i % 4 === 1 ? 'decreasing' : 'stable',
      appetiteStatus: 'within',
      appetiteThreshold: 'Approved Threshold: 12/25',
      status: statusQueue[statusIdx++],
      nextReviewDate: isOverdue ? 'Sep 25, 2026' : 'Dec 05, 2026',
      isReviewOverdue: isOverdue,
      daysOverdue: isOverdue ? 13 : undefined,
      lastUpdated: `${(i % 10) + 2} days ago`,
      createdDate: 'Jan 15, 2026',
      controlEffectiveness: 'effective',
      linkedControlsCount: 2 + (i % 4),
      tags: ['Moderate'],
    })
  }

  // 4. Add 114 Low risks (Total low = 114)
  for (let i = 0; i < 114; i++) {
    const t = titlesPool[(i + 7) % titlesPool.length]
    const owner = RISK_OWNERS[(i + 4) % RISK_OWNERS.length]
    const isOverdue = overdueQueue[overdueIdx++]
    const [resL, resI] = lowCoords[i % lowCoords.length]
    const score = resL * resI
    const inhL = Math.min(4, resL + 1)
    const inhI = Math.min(4, resI + 1)
    const inhScore = inhL * inhI

    result.push({
      id: `RSK-${nextId++}`,
      title: `${t.title} [Low Review ${i + 1}]`,
      description: `Well-mitigated low exposure managed as part of ongoing business operations.`,
      category: t.cat,
      department: t.dept,
      owner: owner.name,
      ownerRole: owner.role,
      ownerEmail: owner.email,
      inherentScore: inhScore,
      inherentSeverity: inhScore >= 10 ? 'high' : inhScore >= 5 ? 'moderate' : 'low',
      inherentLikelihood: inhL,
      inherentImpact: inhI,
      residualScore: score,
      residualSeverity: 'low',
      residualLikelihood: resL,
      residualImpact: resI,
      trend: 'stable',
      appetiteStatus: 'within',
      appetiteThreshold: 'Approved Threshold: 12/25',
      status: statusQueue[statusIdx++],
      nextReviewDate: isOverdue ? 'Sep 18, 2026' : 'Dec 20, 2026',
      isReviewOverdue: isOverdue,
      daysOverdue: isOverdue ? 20 : undefined,
      lastUpdated: `${(i % 14) + 3} days ago`,
      createdDate: 'Jan 05, 2026',
      controlEffectiveness: 'effective',
      linkedControlsCount: 2 + (i % 3),
      tags: ['Standard'],
    })
  }

  return result
}

export const ENTERPRISE_RISK_REGISTER: RiskRegisterItem[] = generateEnterpriseRegister()

/* ─────────────────────────────────────────────────────────────
 * Exact Executive Summary Strip Metrics (248 Total, 12 Critical, 38 High, etc.)
 * ───────────────────────────────────────────────────────────── */

export const REGISTER_SUMMARY_METRICS = {
  total: 248,
  critical: 12,
  high: 38,
  moderate: 84,
  low: 114,
  overdueReviews: 17,
}

/* ─────────────────────────────────────────────────────────────
 * Exact Risk Status Summary Counts (86 Open, 34 Under Review, etc.)
 * ───────────────────────────────────────────────────────────── */

export const REGISTER_STATUS_COUNTS = {
  open: 86,
  under_review: 34,
  mitigating: 91,
  accepted: 24,
  closed: 13,
}

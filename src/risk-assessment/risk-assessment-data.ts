export type AssessmentStatus = 'draft' | 'in_progress' | 'pending_review' | 'approved' | 'rejected'
export type LikelihoodLevel = 1 | 2 | 3 | 4 | 5
export type ImpactLevel = 1 | 2 | 3 | 4 | 5
export type SeverityBand = 'low' | 'moderate' | 'high' | 'critical'
export type ControlEffectivenessRating = 'Effective' | 'Partially Effective' | 'Ineffective' | 'Not Tested'

export interface LikelihoodDefinition {
  level: LikelihoodLevel
  label: string
  probability: string
  frequency: string
  description: string
}

export const LIKELIHOOD_DEFINITIONS: Record<LikelihoodLevel, LikelihoodDefinition> = {
  1: {
    level: 1,
    label: 'Rare',
    probability: '< 5% probability',
    frequency: 'Once every 5+ years',
    description: 'Highly exceptional circumstances. No recent historical precedent in comparable environments.',
  },
  2: {
    level: 2,
    label: 'Unlikely',
    probability: '5% – 20% probability',
    frequency: 'Once every 2–5 years',
    description: 'Could occur at some point. Low frequency of external or industry threat campaigns.',
  },
  3: {
    level: 3,
    label: 'Possible',
    probability: '20% – 50% probability',
    frequency: 'Once every 1–2 years',
    description: 'Realistic probability of occurrence under normal operational conditions.',
  },
  4: {
    level: 4,
    label: 'Likely',
    probability: '50% – 80% probability',
    frequency: 'Multiple times per year',
    description: 'High likelihood of occurrence. Frequent credential harvesting and active exploit campaigns.',
  },
  5: {
    level: 5,
    label: 'Almost Certain',
    probability: '> 80% probability',
    frequency: 'Continuous / Monthly',
    description: 'Expected to occur regularly. Persistent external threat actor probing and frequent exposure attempts.',
  },
}

export interface ImpactDefinition {
  level: ImpactLevel
  label: string
  financial: string
  operational: string
  regulatoryReputational: string
  description: string
}

export const IMPACT_DEFINITIONS: Record<ImpactLevel, ImpactDefinition> = {
  1: {
    level: 1,
    label: 'Insignificant',
    financial: '< $50,000 loss',
    operational: 'Negligible disruption (< 15 mins)',
    regulatoryReputational: 'No regulatory breach; no public disclosure',
    description: 'Isolated incident contained locally with existing automated safeguards.',
  },
  2: {
    level: 2,
    label: 'Minor',
    financial: '$50,000 – $250,000 loss',
    operational: 'Brief localized downtime (< 2 hours)',
    regulatoryReputational: 'Internal reporting only; minimal customer impact',
    description: 'Minor service disruption with no compromise of sensitive customer records.',
  },
  3: {
    level: 3,
    label: 'Moderate',
    financial: '$250,000 – $1,000,000 loss',
    operational: 'Service degradation across multiple units (2–8 hours)',
    regulatoryReputational: 'Voluntary supervisory notification; localized press',
    description: 'Measurable financial and operational strain requiring departmental incident team activation.',
  },
  4: {
    level: 4,
    label: 'Major',
    financial: '$1,000,000 – $5,000,000 loss',
    operational: 'Critical business outage (> 8 hours); clearing failure',
    regulatoryReputational: 'Mandatory DORA/GDPR notification; regulatory review',
    description: 'Extensive unauthorized access compromising sensitive customer credentials and core systems.',
  },
  5: {
    level: 5,
    label: 'Severe',
    financial: '> $5,000,000 loss',
    operational: 'Catastrophic systemic outage (> 24 hours)',
    regulatoryReputational: 'Severe enforcement penalties; license review; board crisis',
    description: 'Systemic security breach causing massive data exfiltration, regulatory sanctions, and severe market trust damage.',
  },
}

export interface AssessmentControlItem {
  id: string
  name: string
  type: 'Preventive' | 'Detective' | 'Corrective'
  owner: string
  implementationStatus: 'Implemented' | 'In Progress' | 'Planned' | 'Retired'
  lastTested: string
  effectiveness: ControlEffectivenessRating
  evidenceComment: string
  description: string
  testFrequency: string
  deficienciesCount: number
}

export interface AssessmentEvidenceItem {
  id: string
  title: string
  type: 'Audit Finding' | 'Security Assessment' | 'Telemetry Log' | 'Policy Doc' | 'Penetration Test'
  sourceReference: string
  dateCollected: string
  notes: string
  attachedFileName?: string
  attachedFileSize?: string
}

export interface HistoricalAssessmentItem {
  id: string
  assessmentDate: string
  assessor: string
  inherentScore: number
  inherentSeverity: SeverityBand
  residualScore: number
  residualSeverity: SeverityBand
  reviewStatus: string
  reviewer: string
  notes: string
  methodology: string
}

export interface RiskAssessmentFormData {
  // Base Risk Identity
  riskId: string
  riskTitle: string
  category: string
  department: string
  riskOwner: string
  currentStatus: string
  currentInherentScore: number
  currentResidualScore: number

  // Step 1: Assessment Details
  assessmentName: string
  assessmentType: 'Periodic Review' | 'Initial Assessment' | 'Event-Triggered Review'
  scope: string
  period: string
  methodology: string
  owner: string
  reviewer: string
  dueDate: string
  notes: string

  // Step 2: Likelihood & Impact (Inherent Risk)
  inherentLikelihood: LikelihoodLevel
  inherentImpact: ImpactLevel
  inherentRationale: string

  // Step 3: Controls Review
  controls: AssessmentControlItem[]
  controlEnvironmentNotes: string

  // Step 4: Residual Risk & Evidence
  residualLikelihood: LikelihoodLevel
  residualImpact: ImpactLevel
  residualRationale: string
  evidenceList: AssessmentEvidenceItem[]

  // Status & Governance
  status: AssessmentStatus
  lastSaved: string
  submittedAt?: string
  submissionNotes?: string
}

export const APPETITE_THRESHOLD = 12

export function calculateScore(likelihood: LikelihoodLevel, impact: ImpactLevel): number {
  return likelihood * impact
}

export function getSeverityBand(score: number): SeverityBand {
  if (score >= 16) return 'critical'
  if (score >= 10) return 'high'
  if (score >= 5) return 'moderate'
  return 'low'
}

export function getAppetiteStatus(residualScore: number): {
  status: 'Within Appetite' | 'Approaching Threshold' | 'Above Appetite'
  variance: number
  tone: 'success' | 'warning' | 'error'
  description: string
} {
  const variance = residualScore - APPETITE_THRESHOLD
  if (residualScore > APPETITE_THRESHOLD) {
    return {
      status: 'Above Appetite',
      variance,
      tone: 'error',
      description: `Residual exposure of ${residualScore} exceeds the approved threshold (${APPETITE_THRESHOLD}) by +${variance} points. Executive review required.`,
    }
  }
  if (residualScore >= 10) {
    return {
      status: 'Approaching Threshold',
      variance,
      tone: 'warning',
      description: `Residual exposure of ${residualScore} is within appetite but near the approved ceiling (${APPETITE_THRESHOLD}). Close monitoring recommended.`,
    }
  }
  return {
    status: 'Within Appetite',
    variance,
    tone: 'success',
    description: `Residual exposure of ${residualScore} is well within the approved organizational appetite threshold (${APPETITE_THRESHOLD}).`,
  }
}

export const DEFAULT_CONTROLS: AssessmentControlItem[] = [
  {
    id: 'CTRL-0081',
    name: 'Multi-Factor Authentication',
    type: 'Preventive',
    owner: 'Identity & Access Team',
    implementationStatus: 'Implemented',
    lastTested: 'September 20, 2026',
    effectiveness: 'Partially Effective',
    evidenceComment:
      'Enforced on 92% of corporate staff; legacy VPN fallback still permits SMS OTP in EMEA cluster awaiting FIDO2 hardware token rollout.',
    description:
      'Mandatory multi-factor verification required for all user and administrative access to corporate systems and sensitive cloud environments.',
    testFrequency: 'Monthly Automated Audit',
    deficienciesCount: 1,
  },
  {
    id: 'CTRL-0092',
    name: 'Endpoint Detection & Response',
    type: 'Detective',
    owner: 'Security Operations',
    implementationStatus: 'Implemented',
    lastTested: 'September 22, 2026',
    effectiveness: 'Effective',
    evidenceComment:
      'CrowdStrike Falcon sensor active on 99.4% of fleet. Automated host isolation SLA verified under 4 minutes during testing.',
    description:
      'Continuous behavioral telemetry monitoring, exploit prevention, and rapid automated endpoint containment across corporate workstations and servers.',
    testFrequency: 'Continuous / Automated',
    deficienciesCount: 0,
  },
  {
    id: 'CTRL-0107',
    name: 'Security Awareness Training',
    type: 'Preventive',
    owner: 'Security Awareness Lead',
    implementationStatus: 'Implemented',
    lastTested: 'August 30, 2026',
    effectiveness: 'Partially Effective',
    evidenceComment:
      'Annual completion rate 88%; Q3 targeted phishing simulation click rate was 6.2% (target < 3%). Refresher training scheduled for November.',
    description:
      'Mandatory interactive cyber hygiene training and recurring unannounced simulated phishing tests for all employees and contractors.',
    testFrequency: 'Quarterly',
    deficienciesCount: 1,
  },
  {
    id: 'CTRL-0114',
    name: 'Incident Response Procedure',
    type: 'Corrective',
    owner: 'SecOps Incident Response Team',
    implementationStatus: 'Implemented',
    lastTested: 'July 15, 2026',
    effectiveness: 'Effective',
    evidenceComment:
      'Tabletop crisis exercise executed with Executive Committee in July 2026. Cloud ransomware playbook fully validated with legal counsel.',
    description:
      'Standardized operational runbooks for triage, containment, forensic investigation, and regulatory disclosure following a cybersecurity breach.',
    testFrequency: 'Annual Tabletop Exercise',
    deficienciesCount: 0,
  },
]

export const DEFAULT_EVIDENCE: AssessmentEvidenceItem[] = [
  {
    id: 'EVD-01',
    title: 'SOC 2 Type II Independent Examination Report (Q3 2026)',
    type: 'Security Assessment',
    sourceReference: 'PwC External Audit / SOC2-2026-Q3',
    dateCollected: 'September 15, 2026',
    notes:
      'Evaluates Trust Services Criteria for Security and Availability. 2 minor remediation findings noted in legacy VPN cluster.',
    attachedFileName: 'SOC2_TypeII_Q3_Report_Final.pdf',
    attachedFileSize: '4.2 MB',
  },
  {
    id: 'EVD-02',
    title: 'Okta IAM & Conditional Access Enforcement Telemetry',
    type: 'Telemetry Log',
    sourceReference: 'Okta Admin Log Export / OKTA-SAML-992',
    dateCollected: 'October 8, 2026',
    notes:
      'Telemetry logs verify 100% MFA prompt compliance on administrative portals, 92% coverage across general employee sessions.',
    attachedFileName: 'Okta_MFA_Coverage_Telemetry_Oct2026.csv',
    attachedFileSize: '1.8 MB',
  },
  {
    id: 'EVD-03',
    title: 'Quarterly Red-Team Threat Simulation Findings',
    type: 'Penetration Test',
    sourceReference: 'Mandiant Threat Engagement / RED-2026-04',
    dateCollected: 'August 28, 2026',
    notes:
      'Simulated spear-phishing and OAuth token replay against corporate endpoints. Findings directly prompted action plan ACT-0204.',
    attachedFileName: 'RedTeam_Exercise_ExecutiveSummary.pdf',
    attachedFileSize: '2.4 MB',
  },
]

export const HISTORICAL_ASSESSMENTS: HistoricalAssessmentItem[] = [
  {
    id: 'ASH-01',
    assessmentDate: 'September 28, 2026',
    assessor: 'James Wilson',
    inherentScore: 22,
    inherentSeverity: 'critical',
    residualScore: 16,
    residualSeverity: 'high',
    reviewStatus: 'Approved',
    reviewer: 'Priya Nair, Chief Risk Officer',
    notes:
      'Score adjusted upwards following discovery of legacy OAuth tokens in peripheral systems and FS-ISAC sectoral threat advisory.',
    methodology: 'Enterprise Weighted 5×5 Matrix v2.4',
  },
  {
    id: 'ASH-02',
    assessmentDate: 'August 30, 2026',
    assessor: 'James Wilson',
    inherentScore: 20,
    inherentSeverity: 'critical',
    residualScore: 14,
    residualSeverity: 'high',
    reviewStatus: 'Approved',
    reviewer: 'Priya Nair, Chief Risk Officer',
    notes:
      'Mid-quarter reassessment following rollout of CrowdStrike Falcon EDR. Residual impact reduced by 1 point.',
    methodology: 'Enterprise Weighted 5×5 Matrix v2.4',
  },
  {
    id: 'ASH-03',
    assessmentDate: 'August 12, 2026',
    assessor: 'Sarah Chen',
    inherentScore: 18,
    inherentSeverity: 'critical',
    residualScore: 12,
    residualSeverity: 'high',
    reviewStatus: 'Approved',
    reviewer: 'Priya Nair, Chief Risk Officer',
    notes:
      'Baseline onboarding assessment for newly registered enterprise cyber threat record RSK-1042.',
    methodology: 'Enterprise 5×5 Standard Matrix v2.0',
  },
]

export function getInitialAssessmentData(): RiskAssessmentFormData {
  return {
    riskId: 'RSK-1042',
    riskTitle: 'Cybersecurity Breach',
    category: 'Cybersecurity',
    department: 'IT',
    riskOwner: 'James Wilson',
    currentStatus: 'Mitigating',
    currentInherentScore: 22,
    currentResidualScore: 16,

    // Step 1
    assessmentName: 'Q4 2026 Periodic Cybersecurity Assessment',
    assessmentType: 'Periodic Review',
    scope: 'Enterprise IT Infrastructure, Cloud Kubernetes Services, and Identity Gateways',
    period: 'Q4 2026 (Oct 1 – Dec 31, 2026)',
    methodology: 'Enterprise Weighted 5×5 Matrix v2.4',
    owner: 'James Wilson, Head of IT',
    reviewer: 'Priya Nair, Chief Risk Officer',
    dueDate: '2026-11-18',
    notes:
      'Comprehensive quarterly assessment covering external attack surfaces, credential resilience, and endpoint containment effectiveness ahead of board risk committee review.',

    // Step 2: Inherent Risk (e.g. 5 x 5 = 25 or 4 x 5 = 20)
    inherentLikelihood: 5,
    inherentImpact: 5,
    inherentRationale:
      'Unauthorized access vectors remain critical due to aggressive external credential-harvesting campaigns, third-party vendor interfaces, and high blast radius if core payment clearing engines are impacted.',

    // Step 3: Controls
    controls: [...DEFAULT_CONTROLS],
    controlEnvironmentNotes:
      'Overall control environment provides strong detection (EDR) and response capabilities, but prevention is partially degraded by legacy MFA gaps in the EMEA cluster.',

    // Step 4: Residual Risk
    residualLikelihood: 3,
    residualImpact: 4,
    residualRationale:
      'Deploying EDR across 99.4% of fleet and active 24/7 SOC containment reduces likelihood from 5 (Almost Certain) down to 3 (Possible). Impact remains 4 (Major) due to severe regulatory notification mandates under DORA and GDPR should exfiltration occur.',
    evidenceList: [...DEFAULT_EVIDENCE],

    // Governance
    status: 'in_progress',
    lastSaved: 'Today at 12:35 PM',
  }
}

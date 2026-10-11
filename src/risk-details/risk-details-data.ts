import type { RiskRegisterItem, RiskSeverity } from '@/risk-register'

export interface RiskOverviewDetails {
  description: string
  causes: string[]
  businessImpacts: string[]
  affectedUnits: string[]
  relatedSystems: string[]
  riskSources: string[]
  lastUpdated: string
}

export interface AssessmentSummaryDetails {
  likelihoodLabel: string
  impactLabel: string
  inherentScore: number
  inherentSeverity: string
  residualScore: number
  residualSeverity: string
  assessmentDate: string
  assessor: string
  methodologyNote: string
}

export interface AppetiteToleranceDetails {
  approvedThreshold: number
  currentResidualScore: number
  variancePoints: number
  status: string
  requiredResponse: string
}

export interface AssociatedControlItem {
  id: string
  name: string
  owner: string
  effectiveness: 'Effective' | 'Partially Effective' | 'Ineffective' | 'Not Tested'
  lastTested: string
  status: 'Active' | 'Needs Improvement' | 'Improvement Required'
}

export interface MitigationPlanItem {
  id: string
  title: string
  owner: string
  dueDate: string
  status: 'In Progress' | 'Overdue' | 'Not Started' | 'Completed'
  progressPercent: number
  estimatedCost?: string
}

export interface TreatmentStrategyDetails {
  strategy: 'Mitigate' | 'Avoid' | 'Transfer' | 'Accept'
  rationale: string
  responsibleOwner: string
  targetResidual: string
  targetCompletionDate: string
}

export interface AssessmentHistoryRecord {
  id: string
  date: string
  inherentScore: number
  residualScore: number
  assessor: string
  status: string
}

export interface ActivityTimelineItem {
  id: string
  date: string
  title: string
  user: string
  type: 'user' | 'system'
}

export interface RelatedRecordsDetails {
  relatedRisks: { id: string; title: string; severity: RiskSeverity; score: number }[]
  associatedIncidents: { id: string; title: string; date: string; severity: string; status: string }[]
  complianceRequirements: string[]
  relatedDepartments: string[]
}

export interface ComprehensiveRiskDetail {
  base: RiskRegisterItem
  overviewDetails: RiskOverviewDetails
  assessmentSummary: AssessmentSummaryDetails
  appetiteDetails: AppetiteToleranceDetails
  associatedControls: AssociatedControlItem[]
  mitigationPlans: MitigationPlanItem[]
  treatmentStrategy: TreatmentStrategyDetails
  assessmentHistory: AssessmentHistoryRecord[]
  activityTimeline: ActivityTimelineItem[]
  relatedRecords: RelatedRecordsDetails
}

// Handcrafted rich detail generator for enterprise risks
export function getComprehensiveRiskDetail(risk: RiskRegisterItem): ComprehensiveRiskDetail {
  if (risk.id === 'RSK-1042') {
    return {
      base: risk,
      overviewDetails: {
        description:
          'Unauthorized access to sensitive organizational systems could result in data exposure, operational disruption, financial loss, and reputational damage. Potential causes include phishing attacks, compromised credentials, insufficient access controls, and vulnerabilities in third-party systems.',
        causes: [
          'Phishing attacks and credential harvesting campaigns',
          'Compromised credentials through third-party data breaches',
          'Insufficient multi-factor access controls on legacy admin endpoints',
          'Unpatched vulnerabilities in external third-party software libraries',
        ],
        businessImpacts: [
          'Direct financial loss and customer reimbursement obligations',
          'Sensitive customer personal and transaction data exposure',
          'Prolonged operational disruption to core payment clearing engines',
          'Severe regulatory enforcement penalties under DORA & GDPR',
          'Enduring reputational and shareholder equity damage',
        ],
        affectedUnits: ['IT & Infrastructure', 'Payment Operations', 'Corporate Finance', 'Customer Support', 'Legal & Compliance'],
        relatedSystems: ['Core Clearing Gateways', 'Cloud Kubernetes Clusters', 'Customer Account Database', 'Enterprise SSO / Okta'],
        riskSources: [
          'Internal Security Review (Quarterly Red-Team Report)',
          'External Threat Intelligence (FS-ISAC Cyber Advisory)',
          'Third-Party SOC 2 Vendor Assessment',
        ],
        lastUpdated: 'October 11, 2026',
      },
      assessmentSummary: {
        likelihoodLabel: '5 / 5 — Almost Certain',
        impactLabel: '5 / 5 — Severe',
        inherentScore: 22,
        inherentSeverity: 'Critical',
        residualScore: 16,
        residualSeverity: 'High',
        assessmentDate: 'September 28, 2026',
        assessor: 'James Wilson',
        methodologyNote:
          'Calculated using Enterprise Weighted Risk Matrix v2.4 (inherent gross exposure weighted against technical blast radius and regulatory reporting obligations).',
      },
      appetiteDetails: {
        approvedThreshold: 12,
        currentResidualScore: 16,
        variancePoints: 4,
        status: 'Above Appetite',
        requiredResponse:
          'Mitigation progress and risk acceptance must be reviewed by the authorized risk approver (Chief Risk Officer / Board Audit Committee).',
      },
      associatedControls: [
        {
          id: 'CTL-001',
          name: 'Multi-Factor Authentication',
          owner: 'James Wilson',
          effectiveness: 'Effective',
          lastTested: 'September 28, 2026',
          status: 'Active',
        },
        {
          id: 'CTL-002',
          name: 'Endpoint Detection & Response',
          owner: 'Sarah Chen',
          effectiveness: 'Partially Effective',
          lastTested: 'October 02, 2026',
          status: 'Needs Improvement',
        },
        {
          id: 'CTL-003',
          name: 'Security Awareness Training',
          owner: 'Emily Carter',
          effectiveness: 'Effective',
          lastTested: 'September 15, 2026',
          status: 'Active',
        },
        {
          id: 'CTL-004',
          name: 'Incident Response Procedure',
          owner: 'Michael Brown',
          effectiveness: 'Not Tested',
          lastTested: 'Pending Test',
          status: 'Active',
        },
      ],
      mitigationPlans: [
        {
          id: 'ACT-0204',
          title: 'Implement Phishing-Resistant Authentication',
          owner: 'James Wilson',
          dueDate: 'October 20, 2026',
          status: 'In Progress',
          progressPercent: 65,
          estimatedCost: '$95,000',
        },
        {
          id: 'ACT-0209',
          title: 'Review Privileged Access Permissions',
          owner: 'Identity & Access Team',
          dueDate: 'October 14, 2026',
          status: 'Overdue',
          progressPercent: 40,
          estimatedCost: '$45,000',
        },
        {
          id: 'ACT-0215',
          title: 'Conduct Targeted Phishing Simulation',
          owner: 'Security Awareness Lead',
          dueDate: 'November 5, 2026',
          status: 'Not Started',
          progressPercent: 0,
          estimatedCost: '$25,000',
        },
      ],
      treatmentStrategy: {
        strategy: 'Mitigate',
        rationale:
          'Reduce residual exposure through stronger authentication, access reviews, and improved phishing resilience.',
        responsibleOwner: 'James Wilson',
        targetResidual: '10 / 25 — Moderate',
        targetCompletionDate: 'March 31, 2027 (Q1 2027)',
      },
      assessmentHistory: [
        {
          id: 'ASH-01',
          date: 'Sep 28, 2026',
          inherentScore: 22,
          residualScore: 16,
          assessor: 'James Wilson',
          status: 'Approved',
        },
        {
          id: 'ASH-02',
          date: 'Aug 30, 2026',
          inherentScore: 20,
          residualScore: 14,
          assessor: 'James Wilson',
          status: 'Approved',
        },
        {
          id: 'ASH-03',
          date: 'Aug 12, 2026',
          inherentScore: 18,
          residualScore: 12,
          assessor: 'Sarah Chen',
          status: 'Approved',
        },
      ],
      activityTimeline: [
        {
          id: 'ACT-EVT-1',
          date: 'October 11, 2026',
          title: 'Risk owner reviewed the mitigation plan.',
          user: 'James Wilson',
          type: 'user',
        },
        {
          id: 'ACT-EVT-2',
          date: 'October 9, 2026',
          title: 'Privileged access review marked overdue.',
          user: 'Automated SLA Monitor',
          type: 'system',
        },
        {
          id: 'ACT-EVT-3',
          date: 'October 6, 2026',
          title: 'Risk score updated following a security review.',
          user: 'James Wilson',
          type: 'user',
        },
        {
          id: 'ACT-EVT-4',
          date: 'September 28, 2026',
          title: 'Risk assessment completed by James Wilson.',
          user: 'James Wilson',
          type: 'user',
        },
      ],
      relatedRecords: {
        relatedRisks: [
          { id: 'RSK-0987', title: 'Third-Party Vendor Failure', severity: 'high', score: 14 },
          { id: 'RSK-1031', title: 'Data Privacy Exposure', severity: 'critical', score: 18 },
        ],
        associatedIncidents: [
          {
            id: 'INC-2026-088',
            title: 'Suspicious Credential Stuffing Attempt',
            date: 'Sep 24, 2026',
            severity: 'P2',
            status: 'Mitigated',
          },
        ],
        complianceRequirements: [
          'ISO/IEC 27001:2022 (A.9 Access Control)',
          'SOC 2 Type II (Security & Availability Trust Criteria)',
          'NIST CSF 2.0 (PR.AC Identity Management & DE.CM Monitoring)',
        ],
        relatedDepartments: ['IT', 'Security Operations', 'Legal & Compliance', 'Payment Operations'],
      },
    }
  }

  // Dynamic fallback generator for any other risk item in the register
  const targetResidualScore = Math.max(4, risk.residualScore - 4)
  const isBreached = risk.appetiteStatus === 'breached'

  return {
    base: risk,
    overviewDetails: {
      description: risk.description,
      causes: [
        `Operational process variance across ${risk.department} workflows`,
        'Inadequate automated telemetry monitoring leading to delayed detection',
        'External third-party vendor dependencies without redundant fallbacks',
      ],
      businessImpacts: [
        'Operational disruption affecting client SLA delivery timelines',
        'Direct financial mitigation and remediation cost accrual',
        'Regulatory reporting disclosure requirements under enterprise policy',
      ],
      affectedUnits: [risk.department, 'Corporate Operations', 'Internal Audit'],
      relatedSystems: [`${risk.department} Core Enterprise Platform`, 'Cloud Infrastructure'],
      riskSources: ['Internal Risk Review', 'Operational Audit Assessment'],
      lastUpdated: risk.lastUpdated,
    },
    assessmentSummary: {
      likelihoodLabel: `${risk.residualLikelihood} / 5`,
      impactLabel: `${risk.residualImpact} / 5`,
      inherentScore: risk.inherentScore,
      inherentSeverity: risk.inherentSeverity.charAt(0).toUpperCase() + risk.inherentSeverity.slice(1),
      residualScore: risk.residualScore,
      residualSeverity: risk.residualSeverity.charAt(0).toUpperCase() + risk.residualSeverity.slice(1),
      assessmentDate: 'September 28, 2026',
      assessor: risk.owner,
      methodologyNote:
        'Calculated using Enterprise Weighted Risk Matrix v2.4 (factors technical severity, regulatory exposure, and operational blast radius).',
    },
    appetiteDetails: {
      approvedThreshold: 12,
      currentResidualScore: risk.residualScore,
      variancePoints: Math.max(0, risk.residualScore - 12),
      status: isBreached ? 'Above Appetite' : 'Within Appetite',
      requiredResponse: isBreached
        ? 'Mitigation progress and risk acceptance must be reviewed by the authorized risk approver.'
        : 'Maintain existing internal control operating schedules.',
    },
    associatedControls: [
      {
        id: `CTRL-00${risk.inherentScore}1`,
        name: 'Automated Configuration Verification',
        owner: `${risk.department} Operations`,
        effectiveness: risk.controlEffectiveness === 'effective' ? 'Effective' : 'Partially Effective',
        lastTested: 'September 20, 2026',
        status: 'Active',
      },
      {
        id: `CTRL-00${risk.inherentScore}2`,
        name: 'Quarterly Access Rights Recertification',
        owner: `${risk.department} Compliance`,
        effectiveness: 'Partially Effective',
        lastTested: 'August 30, 2026',
        status: 'Needs Improvement',
      },
    ],
    mitigationPlans: [
      {
        id: `ACT-0${risk.residualScore}1`,
        title: risk.mitigationActionTitle ?? 'Implement Enhanced Operational Safeguards',
        owner: risk.owner,
        dueDate: risk.nextReviewDate,
        status: 'In Progress',
        progressPercent: 55,
        estimatedCost: '$65,000',
      },
    ],
    treatmentStrategy: {
      strategy: 'Mitigate',
      rationale: `Systematically reduce residual exposure through automated controls and cross-departmental reviews in ${risk.department}.`,
      responsibleOwner: risk.owner,
      targetResidual: `${targetResidualScore} / 25`,
      targetCompletionDate: 'March 31, 2027 (Q1 2027)',
    },
    assessmentHistory: [
      {
        id: 'ASH-01',
        date: 'Sep 28, 2026',
        inherentScore: risk.inherentScore,
        residualScore: risk.residualScore,
        assessor: risk.owner,
        status: 'Approved',
      },
      {
        id: 'ASH-02',
        date: 'Aug 12, 2026',
        inherentScore: Math.max(1, risk.inherentScore - 2),
        residualScore: Math.max(1, risk.residualScore - 2),
        assessor: 'Sarah Chen',
        status: 'Approved',
      },
    ],
    activityTimeline: [
      {
        id: 'EVT-01',
        date: 'October 11, 2026',
        title: 'Risk owner reviewed the mitigation plan.',
        user: risk.owner,
        type: 'user',
      },
      {
        id: 'EVT-02',
        date: 'September 28, 2026',
        title: `Risk assessment completed by ${risk.owner}.`,
        user: risk.owner,
        type: 'user',
      },
    ],
    relatedRecords: {
      relatedRisks: [
        { id: 'RSK-0987', title: 'Third-Party Vendor Failure', severity: 'high', score: 14 },
      ],
      associatedIncidents: [],
      complianceRequirements: ['ISO 31000:2018', 'COSO ERM 2017'],
      relatedDepartments: [risk.department, 'Internal Audit'],
    },
  }
}

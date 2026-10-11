export type ControlType = 'Preventive' | 'Detective' | 'Corrective'

export type ControlCategory =
  | 'Access Management'
  | 'Cybersecurity'
  | 'Data Protection'
  | 'Business Continuity'
  | 'Incident Management'
  | 'Financial Controls'
  | 'Regulatory Compliance'
  | 'Vendor Management'
  | 'Employee Security'
  | 'Change Management'

export type ImplementationStatus =
  | 'Planned'
  | 'In Progress'
  | 'Implemented'
  | 'Not Implemented'

export type ControlMethod = 'Manual' | 'Automated' | 'Hybrid'

export type ControlFrequency =
  | 'Continuous'
  | 'Daily'
  | 'Weekly'
  | 'Monthly'
  | 'Quarterly'
  | 'Annually'
  | 'Event-Driven'

export type ControlEffectiveness =
  | 'Effective'
  | 'Needs Improvement'
  | 'Ineffective'
  | 'Not Tested'

export interface ControlActivityLog {
  id: string
  date: string
  action: string
  user: string
  details: string
}

export interface ControlItem {
  id: string
  name: string
  description: string
  objective: string
  type: ControlType
  category: ControlCategory
  framework: string
  owner: string
  ownerRole: string
  ownerEmail: string
  department: string
  supportingTeam?: string
  reviewer?: string
  implementationStatus: ImplementationStatus
  method: ControlMethod
  frequency: ControlFrequency
  effectiveness: ControlEffectiveness
  linkedRiskIds: string[]
  implementationDate: string
  lastReviewed: string
  nextReviewDate: string
  lastEffectivenessAssessment: string
  procedureReference: string
  evidenceRequirements: string
  instructions: string
  notes?: string
  createdDate: string
  isArchived: boolean
  activityHistory: ControlActivityLog[]
}

export type ControlSavedViewId =
  | 'all'
  | 'my_controls'
  | 'effective'
  | 'needs_improvement'
  | 'ineffective'
  | 'not_implemented'
  | 'control_gaps'
  | 'recently_reviewed'

export interface ControlFilters {
  search: string
  type: ControlType | 'all'
  category: ControlCategory | 'all'
  department: string | 'all'
  owner: string | 'all'
  implementationStatus: ImplementationStatus | 'all'
  effectiveness: ControlEffectiveness | 'all'
  frequency: ControlFrequency | 'all'
  linkedRisk: string | 'all'
}

export const DEFAULT_CONTROL_FILTERS: ControlFilters = {
  search: '',
  type: 'all',
  category: 'all',
  department: 'all',
  owner: 'all',
  implementationStatus: 'all',
  effectiveness: 'all',
  frequency: 'all',
  linkedRisk: 'all',
}

export const CONTROL_TAXONOMY: {
  categories: ControlCategory[]
  types: ControlType[]
  frequencies: ControlFrequency[]
  implementationStatuses: ImplementationStatus[]
  effectivenessRatings: ControlEffectiveness[]
  methods: ControlMethod[]
  frameworks: string[]
  departments: string[]
} = {
  categories: [
    'Access Management',
    'Cybersecurity',
    'Data Protection',
    'Business Continuity',
    'Incident Management',
    'Financial Controls',
    'Regulatory Compliance',
    'Vendor Management',
    'Employee Security',
    'Change Management',
  ],
  types: ['Preventive', 'Detective', 'Corrective'],
  frequencies: [
    'Continuous',
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Annually',
    'Event-Driven',
  ],
  implementationStatuses: ['Planned', 'In Progress', 'Implemented', 'Not Implemented'],
  effectivenessRatings: ['Effective', 'Needs Improvement', 'Ineffective', 'Not Tested'],
  methods: ['Manual', 'Automated', 'Hybrid'],
  frameworks: [
    'ISO 27001:2022',
    'NIST CSF v2.0',
    'SOC 2 Type II',
    'CIS Controls v8',
    'COSO Internal Control',
    'PCI-DSS v4.0',
    'DORA (EU)',
  ],
  departments: [
    'IT',
    'Finance',
    'Operations',
    'Human Resources',
    'Legal & Compliance',
    'Product & Engineering',
  ],
}

/**
 * 186 Enterprise Controls with accurate distribution:
 * - 124 Effective
 * - 38 Needs Improvement
 * - 24 Control Gaps (14 Ineffective, 6 Not Tested, 4 Not Implemented)
 */
export function generateEnterpriseControls(): ControlItem[] {
  const controls: ControlItem[] = [
    // ── Required Primary Example 1 ──
    {
      id: 'CTL-001',
      name: 'Multi-Factor Authentication',
      description:
        'Enforce mandatory multi-factor authentication (MFA) via hardware keys or authenticator apps across all corporate systems, admin interfaces, and remote access VPN endpoints.',
      objective:
        'Prevent unauthorized access resulting from credential theft, brute-force attacks, or credential harvesting.',
      type: 'Preventive',
      category: 'Access Management',
      framework: 'ISO 27001:2022 A.9.4.2 / NIST CSF PR.AC-7',
      owner: 'James Wilson',
      ownerRole: 'Head of IT',
      ownerEmail: 'j.wilson@riskos.example',
      department: 'IT',
      supportingTeam: 'Identity & Access Management Team',
      reviewer: 'Priya Nair, Head of Operational Risk',
      implementationStatus: 'Implemented',
      method: 'Automated',
      frequency: 'Continuous',
      effectiveness: 'Effective',
      linkedRiskIds: ['RSK-1042', 'RSK-1011'],
      implementationDate: 'Jan 15, 2026',
      lastReviewed: 'Sep 28, 2026',
      nextReviewDate: 'Nov 18, 2026',
      lastEffectivenessAssessment: 'Sep 28, 2026',
      procedureReference: 'SEC-SOP-014: Corporate Access and MFA Policy',
      evidenceRequirements:
        'Okta identity tenant enforcement reports, monthly administrator login audit trails, and biometric FIDO2 enrollment logs.',
      instructions:
        'All corporate accounts must enforce FIDO2 WebAuthn or push authentication with number matching. SMS verification is strictly deprecated.',
      notes: 'Hardware security keys issued to 100% of privileged server administrators.',
      createdDate: 'Aug 12, 2026',
      isArchived: false,
      activityHistory: [
        {
          id: 'act-1',
          date: 'Sep 28, 2026',
          action: 'Effectiveness Assessment Completed',
          user: 'James Wilson',
          details: 'Quarterly review confirmed 99.8% enforcement compliance across all active directories.',
        },
        {
          id: 'act-2',
          date: 'Aug 14, 2026',
          action: 'Linked to Risk RSK-1042',
          user: 'Priya Nair',
          details: 'Associated as primary preventive control against Cybersecurity Breach.',
        },
        {
          id: 'act-3',
          date: 'Aug 12, 2026',
          action: 'Control Created',
          user: 'James Wilson',
          details: 'Initial control baseline established and imported from ISO 27001 library.',
        },
      ],
    },

    // ── Required Primary Example 2 ──
    {
      id: 'CTL-002',
      name: 'Endpoint Detection & Response',
      description:
        'Deploy and maintain next-generation EDR agent software on all employee laptops, virtual desktops, and cloud production servers to detect anomalous behavioral telemetry.',
      objective:
        'Detect, isolate, and contain malicious process execution, zero-day malware, and lateral movement in real-time.',
      type: 'Detective',
      category: 'Cybersecurity',
      framework: 'NIST CSF DE.CM-1 / CIS Controls 10.5',
      owner: 'Sarah Chen',
      ownerRole: 'Security Operations Lead',
      ownerEmail: 's.chen@riskos.example',
      department: 'IT',
      supportingTeam: 'Security Operations Center (SOC)',
      reviewer: 'James Wilson, Head of IT',
      implementationStatus: 'Implemented',
      method: 'Automated',
      frequency: 'Continuous',
      effectiveness: 'Needs Improvement',
      linkedRiskIds: ['RSK-1042'],
      implementationDate: 'Feb 10, 2026',
      lastReviewed: 'Oct 02, 2026',
      nextReviewDate: 'Nov 15, 2026',
      lastEffectivenessAssessment: 'Oct 02, 2026',
      procedureReference: 'SOC-SOP-008: EDR Agent Deployment and Alert Triage',
      evidenceRequirements:
        'CrowdStrike agent coverage dashboard, monthly unmanaged asset reconciliation reports, and mean-time-to-contain metrics.',
      instructions:
        'Automated telemetry stream forwarded to central SIEM. Any agent missing heartbeats for > 48h triggers IT service desk quarantine ticket.',
      notes:
        'Coverage currently at 94.2% due to legacy staging servers; remediation planned under action ACT-0209.',
      createdDate: 'Aug 15, 2026',
      isArchived: false,
      activityHistory: [
        {
          id: 'act-4',
          date: 'Oct 02, 2026',
          action: 'Review Completed with Finding',
          user: 'Sarah Chen',
          details: 'Flagged Needs Improvement due to lingering unmanaged staging environments.',
        },
        {
          id: 'act-5',
          date: 'Aug 15, 2026',
          action: 'Control Created',
          user: 'Sarah Chen',
          details: 'EDR monitoring standard baseline registered.',
        },
      ],
    },

    // ── Required Primary Example 3 ──
    {
      id: 'CTL-003',
      name: 'Security Awareness Training',
      description:
        'Mandatory quarterly interactive cybersecurity training and simulated spear-phishing drills for all staff, contractors, and executive leadership.',
      objective:
        'Train staff to identify credential phishing, business email compromise (BEC), and social engineering tactics.',
      type: 'Preventive',
      category: 'Employee Security',
      framework: 'ISO 27001:2022 A.7.2.2 / NIST CSF PR.AT-1',
      owner: 'Emily Carter',
      ownerRole: 'Head of People Operations',
      ownerEmail: 'e.carter@riskos.example',
      department: 'Human Resources',
      supportingTeam: 'IT Security Awareness Lead',
      reviewer: 'James Wilson, Head of IT',
      implementationStatus: 'Implemented',
      method: 'Hybrid',
      frequency: 'Quarterly',
      effectiveness: 'Effective',
      linkedRiskIds: ['RSK-1042', 'RSK-1014'],
      implementationDate: 'Mar 01, 2026',
      lastReviewed: 'Sep 15, 2026',
      nextReviewDate: 'Dec 15, 2026',
      lastEffectivenessAssessment: 'Sep 15, 2026',
      procedureReference: 'HR-POL-021: Enterprise Training and Awareness Policy',
      evidenceRequirements:
        'LMS completion certificates, quarterly phishing click-rate summaries, and repeat offender remediation records.',
      instructions:
        'Employees failing 2 consecutive simulation drills must undergo mandatory 1-on-1 coaching within 10 business days.',
      notes: 'Q3 simulated phishing failure rate declined to 2.8% (industry benchmark 7.5%).',
      createdDate: 'Aug 16, 2026',
      isArchived: false,
      activityHistory: [
        {
          id: 'act-6',
          date: 'Sep 15, 2026',
          action: 'Quarterly Training Campaign Concluded',
          user: 'Emily Carter',
          details: '98.4% workforce completion rate certified by People Ops.',
        },
      ],
    },

    // ── Required Primary Example 4 ──
    {
      id: 'CTL-004',
      name: 'Incident Response Procedure',
      description:
        'Formal enterprise incident response plan establishing roles, escalation matrices, containment playbooks, forensic handling, and regulatory breach notification protocols.',
      objective:
        'Minimize business disruption and reputational harm by orchestrating a structured response during severe security incidents.',
      type: 'Corrective',
      category: 'Incident Management',
      framework: 'NIST CSF RS.RP-1 / DORA Article 11',
      owner: 'Michael Brown',
      ownerRole: 'Director of Infrastructure',
      ownerEmail: 'm.brown@riskos.example',
      department: 'IT',
      supportingTeam: 'Computer Security Incident Response Team (CSIRT)',
      reviewer: 'Priya Nair, Head of Operational Risk',
      implementationStatus: 'Implemented',
      method: 'Manual',
      frequency: 'Annually',
      effectiveness: 'Not Tested',
      linkedRiskIds: ['RSK-1042'],
      implementationDate: 'Apr 10, 2026',
      lastReviewed: 'Aug 20, 2026',
      nextReviewDate: 'Dec 01, 2026',
      lastEffectivenessAssessment: 'Pending tabletop drill',
      procedureReference: 'IT-SOP-099: Cyber Incident Response Playbook v3',
      evidenceRequirements:
        'Annual tabletop simulation report, external counsel retainer agreement, and cyber forensics SLA contract.',
      instructions:
        'In the event of a Severity-1 breach, CSIRT commander must convene war room within 15 minutes and notify Legal within 1 hour.',
      notes: 'Scheduled for annual tabletop test with third-party red team on Nov 22, 2026.',
      createdDate: 'Aug 18, 2026',
      isArchived: false,
      activityHistory: [
        {
          id: 'act-7',
          date: 'Aug 20, 2026',
          action: 'Playbook Updated for DORA Compliance',
          user: 'Michael Brown',
          details: 'Added EU 4-hour preliminary notification threshold procedures.',
        },
      ],
    },
  ]

  // Seed remaining 182 controls (to hit exactly 186 controls total: 124 Effective, 38 Needs Improvement, 24 Gaps)
  // Currently: 2 Effective (CTL-001, CTL-003), 1 Needs Improvement (CTL-002), 1 Gap (CTL-004: Not Tested)
  // Need: 122 more Effective, 37 more Needs Improvement, 23 more Gaps (14 Ineffective, 5 Not Tested, 4 Not Implemented)

  const controlCatalogSeeds: Array<{
    name: string
    type: ControlType
    category: ControlCategory
    dept: string
    freq: ControlFrequency
    method: ControlMethod
    framework: string
    objective: string
  }> = [
    {
      name: 'Privileged Access Management (PAM) Vaulting',
      type: 'Preventive',
      category: 'Access Management',
      dept: 'IT',
      freq: 'Continuous',
      method: 'Automated',
      framework: 'ISO 27001 A.9.4.4',
      objective: 'Isolate and record administrative session credentials.',
    },
    {
      name: 'Vulnerability Scanning & Patch Cadence',
      type: 'Detective',
      category: 'Cybersecurity',
      dept: 'IT',
      freq: 'Weekly',
      method: 'Automated',
      framework: 'CIS Controls 7.1',
      objective: 'Identify software CVEs and enforce 14-day SLA on critical vulnerabilities.',
    },
    {
      name: 'Data Loss Prevention (DLP) Content Filtering',
      type: 'Preventive',
      category: 'Data Protection',
      dept: 'IT',
      freq: 'Continuous',
      method: 'Automated',
      framework: 'NIST CSF PR.DS-5',
      objective: 'Block unauthorized exfiltration of sensitive cardholder and PII data.',
    },
    {
      name: 'Dual Authorization on Wire Transfers > $500K',
      type: 'Preventive',
      category: 'Financial Controls',
      dept: 'Finance',
      freq: 'Event-Driven',
      method: 'Manual',
      framework: 'COSO Internal Control Principle 10',
      objective: 'Mitigate unauthorized disbursement and treasury embezzlement fraud.',
    },
    {
      name: 'Third-Party Vendor SOC 2 Attestation Review',
      type: 'Detective',
      category: 'Vendor Management',
      dept: 'Legal & Compliance',
      freq: 'Annually',
      method: 'Manual',
      framework: 'ISO 27001 A.15.2.1',
      objective: 'Assess supplier cybersecurity postures and contractual liability limits.',
    },
    {
      name: 'Database Backup Replication & Immutable Snapshots',
      type: 'Corrective',
      category: 'Business Continuity',
      dept: 'IT',
      freq: 'Daily',
      method: 'Automated',
      framework: 'SOC 2 CC9.1',
      objective: 'Guarantee RPO < 15 minutes and prevent ransomware corruption.',
    },
    {
      name: 'Production Change Advisory Board (CAB) Approvals',
      type: 'Preventive',
      category: 'Change Management',
      dept: 'Product & Engineering',
      freq: 'Weekly',
      method: 'Hybrid',
      framework: 'ITIL v4 Change Enablement',
      objective: 'Prevent unvetted code deployments from degrading live payment systems.',
    },
    {
      name: 'Regulatory Disclosure & Suspicious Activity Filings',
      type: 'Detective',
      category: 'Regulatory Compliance',
      dept: 'Legal & Compliance',
      freq: 'Daily',
      method: 'Hybrid',
      framework: 'FinCEN / BSA AML Regulations',
      objective: 'Detect money laundering patterns and file timely SARs with regulators.',
    },
    {
      name: 'Pre-Employment Background Verification Checks',
      type: 'Preventive',
      category: 'Employee Security',
      dept: 'Human Resources',
      freq: 'Event-Driven',
      method: 'Manual',
      framework: 'ISO 27001 A.7.1.1',
      objective: 'Ensure criminal and credit eligibility prior to granting access to bank records.',
    },
    {
      name: 'Disaster Recovery Warm Failover Testing',
      type: 'Corrective',
      category: 'Business Continuity',
      dept: 'Operations',
      freq: 'Annually',
      method: 'Manual',
      framework: 'ISO 22301 / DORA Art. 12',
      objective: 'Validate cross-region database failover under live simulated outage.',
    },
    {
      name: 'API Gateway Rate Limiting & Web Application Firewall',
      type: 'Preventive',
      category: 'Cybersecurity',
      dept: 'Product & Engineering',
      freq: 'Continuous',
      method: 'Automated',
      framework: 'OWASP Top 10 API Security',
      objective: 'Block distributed denial-of-service (DDoS) and SQL injection attempts.',
    },
    {
      name: 'Segregation of Duties (SoD) Conflict Monitoring',
      type: 'Detective',
      category: 'Financial Controls',
      dept: 'Finance',
      freq: 'Monthly',
      method: 'Automated',
      framework: 'SOX Section 404',
      objective: 'Identify users possessing both invoice creation and approval rights.',
    },
  ]

  const ownersList = [
    { name: 'James Wilson', role: 'Head of IT', email: 'j.wilson@riskos.example' },
    { name: 'Sarah Chen', role: 'Security Operations Lead', email: 's.chen@riskos.example' },
    { name: 'Michael Brown', role: 'Director of Infrastructure', email: 'm.brown@riskos.example' },
    { name: 'Elena Rostova', role: 'Chief Compliance Officer', email: 'e.rostova@riskos.example' },
    { name: 'David Kim', role: 'VP of Engineering', email: 'd.kim@riskos.example' },
    { name: 'Emily Carter', role: 'Head of People Operations', email: 'e.carter@riskos.example' },
    { name: 'Marcus Vance', role: 'Head of Treasury', email: 'm.vance@riskos.example' },
    { name: 'Priya Nair', role: 'Head of Operational Risk', email: 'priya.nair@riskos.example' },
  ]

  const sampleRiskIds = [
    'RSK-1042',
    'RSK-1002',
    'RSK-1011',
    'RSK-1014',
    'RSK-1015',
    'RSK-1018',
    'RSK-1022',
    'RSK-1024',
    'RSK-1028',
    'RSK-1033',
    'RSK-1040',
    'RSK-1045',
  ]

  // Track counts to hit exact targets:
  // Total: 186
  // Effective: 124
  // Needs Improvement: 38
  // Control Gaps: 24 (14 Ineffective, 6 Not Tested, 4 Not Implemented)
  let effectiveCount = 2 // CTL-001, CTL-003
  let needsImpCount = 1 // CTL-002
  let gapsCount = 1 // CTL-004 (Not Tested)

  for (let i = 5; i <= 186; i++) {
    const padId = `CTL-${String(i).padStart(3, '0')}`
    const seed = controlCatalogSeeds[(i - 5) % controlCatalogSeeds.length]
    const ownerObj = ownersList[(i * 3) % ownersList.length]

    // Determine effectiveness & implementation status based on target quota
    let effectiveness: ControlEffectiveness = 'Effective'
    let implementationStatus: ImplementationStatus = 'Implemented'

    if (effectiveCount < 124) {
      effectiveness = 'Effective'
      implementationStatus = 'Implemented'
      effectiveCount++
    } else if (needsImpCount < 38) {
      effectiveness = 'Needs Improvement'
      implementationStatus = 'Implemented'
      needsImpCount++
    } else if (gapsCount < 24) {
      // 14 Ineffective, 5 Not Tested, 4 Not Implemented
      const gapIdx = gapsCount - 1 // 0 to 22
      if (gapIdx < 14) {
        effectiveness = 'Ineffective'
        implementationStatus = 'Implemented'
      } else if (gapIdx < 19) {
        effectiveness = 'Not Tested'
        implementationStatus = 'In Progress'
      } else {
        effectiveness = 'Not Tested'
        implementationStatus = 'Not Implemented'
      }
      gapsCount++
    }

    // Link 1 to 3 risks
    const riskCount = (i % 3) + 1
    const linkedRiskIds: string[] = []
    for (let r = 0; r < riskCount; r++) {
      const rId = sampleRiskIds[(i + r * 4) % sampleRiskIds.length]
      if (!linkedRiskIds.includes(rId)) {
        linkedRiskIds.push(rId)
      }
    }

    const reviewMonth = ['Aug', 'Sep', 'Oct'][i % 3]
    const reviewDay = (i % 28) + 1
    const lastReviewed = `${reviewMonth} ${String(reviewDay).padStart(2, '0')}, 2026`

    controls.push({
      id: padId,
      name: `${seed.name} (${String.fromCharCode(65 + (i % 8))}${Math.floor(i / 8) + 1})`,
      description: `Formal organizational control implementing ${seed.name.toLowerCase()} across relevant environments. Ensures continuous operational compliance and mitigation against designated risks.`,
      objective: seed.objective,
      type: seed.type,
      category: seed.category,
      framework: seed.framework,
      owner: ownerObj.name,
      ownerRole: ownerObj.role,
      ownerEmail: ownerObj.email,
      department: seed.dept,
      supportingTeam: `${seed.dept} Security & Assurance`,
      reviewer: 'Priya Nair, Head of Operational Risk',
      implementationStatus,
      method: seed.method,
      frequency: seed.freq,
      effectiveness,
      linkedRiskIds,
      implementationDate: 'Feb 15, 2026',
      lastReviewed,
      nextReviewDate: 'Nov 30, 2026',
      lastEffectivenessAssessment: lastReviewed,
      procedureReference: `POL-${seed.category.substring(0, 3).toUpperCase()}-${String(i).padStart(3, '0')}`,
      evidenceRequirements: `Standardized operational logs, signed approvals, and periodic testing telemetry for ${seed.name.toLowerCase()}.`,
      instructions: `Operate this control according to established standard operating procedure. Report any anomalies immediately.`,
      createdDate: 'Aug 10, 2026',
      isArchived: false,
      activityHistory: [
        {
          id: `act-${i}-1`,
          date: lastReviewed,
          action: 'Periodic Review Recorded',
          user: ownerObj.name,
          details: `Control review conducted with rating: ${effectiveness}.`,
        },
      ],
    })
  }

  return controls
}

/** In-memory singleton state initialized with 186 controls */
export let ENTERPRISE_CONTROLS_DATA: ControlItem[] = generateEnterpriseControls()

export function setEnterpriseControls(newList: ControlItem[]): void {
  ENTERPRISE_CONTROLS_DATA = newList
}

/** Calculate summary metrics dynamically */
export function calculateControlKPIs(controls: ControlItem[]): {
  total: number
  effective: number
  needsImprovement: number
  controlGaps: number
} {
  const active = controls.filter((c) => !c.isArchived)
  const total = active.length
  const effective = active.filter((c) => c.effectiveness === 'Effective').length
  const needsImprovement = active.filter((c) => c.effectiveness === 'Needs Improvement').length
  // Control Gaps: Ineffective, Not Tested, or Not Implemented
  const controlGaps = active.filter(
    (c) =>
      c.effectiveness === 'Ineffective' ||
      c.effectiveness === 'Not Tested' ||
      c.implementationStatus === 'Not Implemented'
  ).length

  return { total, effective, needsImprovement, controlGaps }
}

/** Filter controls matching multi-criteria */
export function filterEnterpriseControls(
  controls: ControlItem[],
  filters: ControlFilters,
  savedView: ControlSavedViewId,
  currentUserName: string
): ControlItem[] {
  return controls.filter((c) => {
    // 1. Exclude archived by default unless explicit
    if (c.isArchived) return false

    // 2. Saved view logic
    switch (savedView) {
      case 'my_controls':
        if (c.owner !== currentUserName && c.owner !== 'James Wilson') return false
        break
      case 'effective':
        if (c.effectiveness !== 'Effective') return false
        break
      case 'needs_improvement':
        if (c.effectiveness !== 'Needs Improvement') return false
        break
      case 'ineffective':
        if (c.effectiveness !== 'Ineffective') return false
        break
      case 'not_implemented':
        if (c.implementationStatus !== 'Not Implemented') return false
        break
      case 'control_gaps':
        if (
          c.effectiveness !== 'Ineffective' &&
          c.effectiveness !== 'Not Tested' &&
          c.implementationStatus !== 'Not Implemented'
        ) {
          return false
        }
        break
      case 'recently_reviewed':
        if (!c.lastReviewed.includes('Oct') && !c.lastReviewed.includes('Sep')) return false
        break
      case 'all':
      default:
        break
    }

    // 3. Search query (ID, Name, Description, Owner, Procedure)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim()
      const match =
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q) ||
        c.procedureReference.toLowerCase().includes(q) ||
        c.framework.toLowerCase().includes(q)
      if (!match) return false
    }

    // 4. Dropdown filters
    if (filters.type !== 'all' && c.type !== filters.type) return false
    if (filters.category !== 'all' && c.category !== filters.category) return false
    if (filters.department !== 'all' && c.department !== filters.department) return false
    if (filters.owner !== 'all' && c.owner !== filters.owner) return false
    if (
      filters.implementationStatus !== 'all' &&
      c.implementationStatus !== filters.implementationStatus
    )
      return false
    if (filters.effectiveness !== 'all' && c.effectiveness !== filters.effectiveness) return false
    if (filters.frequency !== 'all' && c.frequency !== filters.frequency) return false
    if (filters.linkedRisk !== 'all' && !c.linkedRiskIds.includes(filters.linkedRisk)) return false

    return true
  })
}

/** RFC-4180 compliant CSV Export */
export function exportControlsToCsv(controls: ControlItem[]): void {
  const headers = [
    'Control ID',
    'Control Name',
    'Control Type',
    'Category',
    'Owner',
    'Department',
    'Implementation Status',
    'Method',
    'Frequency',
    'Effectiveness',
    'Framework',
    'Linked Risks',
    'Last Reviewed',
    'Next Review Date',
    'Procedure Reference',
  ]

  const rows = controls.map((c) => [
    `"${c.id}"`,
    `"${c.name.replace(/"/g, '""')}"`,
    `"${c.type}"`,
    `"${c.category}"`,
    `"${c.owner}"`,
    `"${c.department}"`,
    `"${c.implementationStatus}"`,
    `"${c.method}"`,
    `"${c.frequency}"`,
    `"${c.effectiveness}"`,
    `"${c.framework}"`,
    `"${c.linkedRiskIds.join('; ')}"`,
    `"${c.lastReviewed}"`,
    `"${c.nextReviewDate}"`,
    `"${c.procedureReference}"`,
  ])

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute(
    'download',
    `riskos-controls-export-${new Date().toISOString().split('T')[0]}.csv`
  )
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}


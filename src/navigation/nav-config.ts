import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Building2,
  CheckSquare,
  ClipboardList,
  FileText,
  FileWarning,
  Flag,
  Gavel,
  LayoutDashboard,
  ListChecks,
  Network,
  Scale,
  Settings,
  Shield,
  Users,
  Workflow,
} from 'lucide-react'

/**
 * RiskOS information architecture (Step 02).
 * Hierarchical ERM nav: modules → registers → operational views.
 * IDs are stable route keys (no router library yet — shell uses in-app navigation).
 */

export interface NavChildConfig {
  id: string
  label: string
  description?: string
  badge?: number | string
}

export interface NavItemConfig {
  id: string
  label: string
  icon: LucideIcon
  description?: string
  badge?: number | string
  children?: NavChildConfig[]
}

export interface NavSectionConfig {
  id: string
  label: string
  items: NavItemConfig[]
}

export const navSections: NavSectionConfig[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        description: 'Portfolio heat, KRIs, and open escalations',
        children: [
          { id: 'dashboard-executive', label: 'Executive Overview' },
          { id: 'dashboard-operations', label: 'Operational Risk' },
        ],
      },
      {
        id: 'my-work',
        label: 'My work',
        icon: CheckSquare,
        description: 'Owned risks, actions due, and review queue',
        badge: 7,
        children: [
          { id: 'my-work-actions', label: 'Actions due', badge: 4 },
          { id: 'my-work-reviews', label: 'Reviews pending', badge: 2 },
          { id: 'my-work-attestations', label: 'Attestations', badge: 1 },
        ],
      },
    ],
  },
  {
    id: 'risk',
    label: 'Risk management',
    items: [
      {
        id: 'risks',
        label: 'Risk register',
        icon: FileWarning,
        description: 'Enterprise risk inventory and residual scores',
        badge: 248,
        children: [
          { id: 'risks-all', label: 'All risks' },
          { id: 'risks-by-category', label: 'By category' },
          { id: 'risks-by-owner', label: 'By owner' },
          { id: 'risks-heat-map', label: 'Heat map' },
          { id: 'risks-emerging', label: 'Emerging risks', badge: 5 },
        ],
      },
      {
        id: 'assessments',
        label: 'Assessments',
        icon: ClipboardList,
        description: 'Inherent / residual scoring campaigns',
        children: [
          { id: 'assessments-active', label: 'Active campaigns' },
          { id: 'assessments-templates', label: 'Templates' },
          { id: 'assessments-history', label: 'History' },
        ],
      },
      {
        id: 'scenarios',
        label: 'Scenarios & KRIs',
        icon: Activity,
        description: 'Stress scenarios and key risk indicators',
        children: [
          { id: 'scenarios-library', label: 'Scenario library' },
          { id: 'scenarios-kris', label: 'KRI dashboard' },
          { id: 'scenarios-breaches', label: 'Threshold breaches', badge: 3 },
        ],
      },
    ],
  },
  {
    id: 'control',
    label: 'Control environment',
    items: [
      {
        id: 'controls',
        label: 'Controls',
        icon: Shield,
        description: 'Design, operating effectiveness, and owners',
        children: [
          { id: 'controls-library', label: 'Control Library' },
          { id: 'controls-assessments', label: 'Control Assessments' },
          { id: 'controls-testing', label: 'Control Testing' },
        ],
      },
      {
        id: 'frameworks',
        label: 'Frameworks',
        icon: BookOpen,
        description: 'ISO 27001, SOC 2, NIST, and custom maps',
        children: [
          { id: 'frameworks-iso27001', label: 'ISO 27001' },
          { id: 'frameworks-soc2', label: 'SOC 2' },
          { id: 'frameworks-nist', label: 'NIST CSF' },
          { id: 'frameworks-custom', label: 'Custom frameworks' },
        ],
      },
      {
        id: 'policies',
        label: 'Policies & standards',
        icon: Gavel,
        description: 'Policy lifecycle and acknowledgements',
      },
    ],
  },
  {
    id: 'response',
    label: 'Response & assurance',
    items: [
      {
        id: 'actions',
        label: 'Action plans',
        icon: ListChecks,
        description: 'Treatment plans and remediation tracking',
        badge: 23,
        children: [
          { id: 'actions-open', label: 'Open actions' },
          { id: 'actions-overdue', label: 'Overdue', badge: 6 },
          { id: 'actions-completed', label: 'Completed' },
        ],
      },
      {
        id: 'incidents',
        label: 'Incidents',
        icon: AlertTriangle,
        description: 'Operational incidents linked to residual risk',
        badge: 2,
      },
      {
        id: 'issues',
        label: 'Issues & findings',
        icon: Flag,
        description: 'Audit findings and management responses',
      },
      {
        id: 'audits',
        label: 'Audits & reviews',
        icon: Scale,
        description: 'Internal audit plan and evidence requests',
        children: [
          { id: 'audits-plan', label: 'Audit plan' },
          { id: 'audits-engagements', label: 'Engagements' },
          { id: 'audits-evidence', label: 'Evidence requests' },
        ],
      },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    items: [
      {
        id: 'reports',
        label: 'Reports',
        icon: FileText,
        description: 'Board packs, RCSA, and regulatory extracts',
        children: [
          { id: 'reports-board', label: 'Board risk pack' },
          { id: 'reports-rcsa', label: 'RCSA summary' },
          { id: 'reports-regulatory', label: 'Regulatory' },
          { id: 'reports-saved', label: 'Saved views' },
        ],
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        description: 'Trends, concentration, and control coverage',
      },
      {
        id: 'workflow',
        label: 'Workflows',
        icon: Workflow,
        description: 'Approvals, escalations, and SLAs',
      },
    ],
  },
  {
    id: 'admin',
    label: 'Organization',
    items: [
      {
        id: 'organization',
        label: 'Org structure',
        icon: Building2,
        description: 'Legal entities, LOBs, and risk taxonomy',
        children: [
          { id: 'org-entities', label: 'Entities' },
          { id: 'org-taxonomy', label: 'Risk taxonomy' },
          { id: 'org-appetite', label: 'Risk appetite' },
        ],
      },
      {
        id: 'people',
        label: 'People & roles',
        icon: Users,
        description: 'Users, risk owners, and RACI',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: Network,
        description: 'GRC connectors and data feeds',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        description: 'Workspace, scoring model, and notifications',
        children: [
          { id: 'settings-general', label: 'General' },
          { id: 'settings-scoring', label: 'Scoring model' },
          { id: 'settings-notifications', label: 'Notifications' },
          { id: 'settings-security', label: 'Security & SSO' },
        ],
      },
    ],
  },
]

/** Flat lookup for breadcrumbs and page chrome */
export type NavNodeMeta = {
  id: string
  label: string
  parentId?: string
  sectionId?: string
  sectionLabel?: string
  icon?: LucideIcon
  description?: string
}

const nodeIndex: Record<string, NavNodeMeta> = {}

for (const section of navSections) {
  for (const item of section.items) {
    nodeIndex[item.id] = {
      id: item.id,
      label: item.label,
      sectionId: section.id,
      sectionLabel: section.label,
      icon: item.icon,
      description: item.description,
    }
    for (const child of item.children ?? []) {
      nodeIndex[child.id] = {
        id: child.id,
        label: child.label,
        parentId: item.id,
        sectionId: section.id,
        sectionLabel: section.label,
        description: child.description,
      }
    }
  }
}

export function getNavNode(id: string): NavNodeMeta | undefined {
  return nodeIndex[id]
}

export function getBreadcrumbs(id: string): { id: string; label: string }[] {
  if (id === 'dashboard') {
    return [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'dashboard-executive', label: 'Executive Overview' },
    ]
  }

  if (id.startsWith('risk-')) {
    const riskCode = id.replace('risk-', '')
    return [
      { id: 'risk', label: 'Risk Management' },
      { id: 'risks', label: 'Risk Register' },
      { id, label: riskCode },
    ]
  }

  if (id === 'controls' || id === 'controls-library' || id === 'controls-all') {
    return [
      { id: 'control', label: 'Controls' },
      { id: 'controls-library', label: 'Control Library' },
    ]
  }

  if (id === 'risks-heat-map' || id === 'matrix' || id === 'heatmap') {
    return [
      { id: 'risk', label: 'Risk Management' },
      { id: 'risks-heat-map', label: 'Risk Matrix' },
    ]
  }

  if (id === 'risks' || id === 'risks-all') {
    return [
      { id: 'risk', label: 'Risk Management' },
      { id: 'risks', label: 'Risk Register' },
    ]
  }

  const node = nodeIndex[id]
  if (!node) {
    if (id.startsWith('risks')) {
      return [
        { id: 'risk', label: 'Risk Management' },
        { id: 'risks', label: 'Risk Register' },
      ]
    }
    return [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'dashboard-executive', label: 'Executive Overview' },
    ]
  }

  const crumbs: { id: string; label: string }[] = []
  if (node.parentId) {
    const parent = nodeIndex[node.parentId]
    if (parent) crumbs.push({ id: parent.id, label: parent.label })
  } else if (node.sectionLabel && node.id !== 'dashboard') {
    crumbs.push({ id: node.sectionId ?? 'section', label: node.sectionLabel })
  }
  crumbs.push({ id: node.id, label: node.label })
  return crumbs
}

/** Parent ids that should auto-expand when a child is active */
export function getExpandedParentId(activeId: string): string | undefined {
  return nodeIndex[activeId]?.parentId
}

export function isNavItemActive(itemId: string, activeId: string): boolean {
  if (itemId === activeId) return true
  return nodeIndex[activeId]?.parentId === itemId
}

export const currentUser = {
  name: 'Priya Nair',
  role: 'Head of Operational Risk',
  email: 'priya.nair@riskos.example',
  org: 'Northstar Financial',
}

export const headerMeta = {
  environment: 'Production',
  notifications: 5,
  productName: 'RiskOS',
}


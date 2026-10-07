/**
 * RiskOS Design Tokens
 * Single source of truth for the design system.
 * CSS variables in index.css are the runtime source; these mirror for TS usage.
 */

export const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const

export const radius = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const

export const layout = {
  sidebarWidth: 256,
  sidebarCollapsedWidth: 64,
  headerHeight: 64,
  contentMaxWidth: 1440,
  pageMargin: 32,
  sectionGap: 32,
  cardGap: 16,
  formGap: 24,
  tableCellPaddingComfortable: 16,
  tableCellPaddingCompact: 8,
} as const

export const zIndex = {
  dropdown: 50,
  sticky: 100,
  header: 200,
  sidebar: 250,
  overlay: 300,
  modal: 400,
  popover: 450,
  toast: 500,
  tooltip: 600,
} as const

/** Risk score bands (5×5 matrix default: score = likelihood × impact) */
export const riskSeverityBands = {
  low: { min: 1, max: 4, label: 'Low', scoreRange: '1–4' },
  moderate: { min: 5, max: 9, label: 'Moderate', scoreRange: '5–9' },
  high: { min: 10, max: 16, label: 'High', scoreRange: '10–16' },
  critical: { min: 17, max: 25, label: 'Critical', scoreRange: '17–25' },
} as const

export type RiskSeverity = keyof typeof riskSeverityBands

export function getRiskSeverity(score: number): RiskSeverity {
  if (score >= 17) return 'critical'
  if (score >= 10) return 'high'
  if (score >= 5) return 'moderate'
  return 'low'
}

export const riskStatus = [
  'open',
  'under_review',
  'mitigating',
  'accepted',
  'closed',
] as const

export const controlStatus = [
  'effective',
  'partially_effective',
  'ineffective',
  'not_tested',
] as const

export const actionStatus = [
  'not_started',
  'in_progress',
  'blocked',
  'overdue',
  'completed',
] as const

export const complianceStatus = [
  'compliant',
  'partially_compliant',
  'non_compliant',
  'under_review',
] as const

export const generalStatus = [
  'active',
  'inactive',
  'pending',
  'approved',
  'rejected',
  'archived',
] as const

export type RiskStatus = (typeof riskStatus)[number]
export type ControlStatus = (typeof controlStatus)[number]
export type ActionStatus = (typeof actionStatus)[number]
export type ComplianceStatus = (typeof complianceStatus)[number]
export type GeneralStatus = (typeof generalStatus)[number]

export type StatusTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'primary'

export const statusMeta: Record<
  string,
  { label: string; tone: StatusTone }
> = {
  // Risk
  open: { label: 'Open', tone: 'info' },
  under_review: { label: 'Under Review', tone: 'warning' },
  mitigating: { label: 'Mitigating', tone: 'primary' },
  accepted: { label: 'Accepted', tone: 'neutral' },
  closed: { label: 'Closed', tone: 'success' },
  // Control
  effective: { label: 'Effective', tone: 'success' },
  partially_effective: { label: 'Partially Effective', tone: 'warning' },
  ineffective: { label: 'Ineffective', tone: 'error' },
  not_tested: { label: 'Not Tested', tone: 'neutral' },
  // Action
  not_started: { label: 'Not Started', tone: 'neutral' },
  in_progress: { label: 'In Progress', tone: 'info' },
  blocked: { label: 'Blocked', tone: 'error' },
  overdue: { label: 'Overdue', tone: 'error' },
  completed: { label: 'Completed', tone: 'success' },
  // Compliance
  compliant: { label: 'Compliant', tone: 'success' },
  partially_compliant: { label: 'Partially Compliant', tone: 'warning' },
  non_compliant: { label: 'Non-Compliant', tone: 'error' },
  // General
  active: { label: 'Active', tone: 'success' },
  inactive: { label: 'Inactive', tone: 'neutral' },
  pending: { label: 'Pending', tone: 'warning' },
  approved: { label: 'Approved', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'error' },
  archived: { label: 'Archived', tone: 'neutral' },
}

export const interactionPrinciples = {
  hover: 'Subtle background or border shift; no layout jump',
  focus: 'Visible 2px ring with offset; never remove outline without replacement',
  active: 'Slightly darker primary / pressed surface',
  selected: 'Primary subtle background + primary border or indicator',
  disabled: 'Reduced opacity + no pointer events + muted text',
  loading: 'Spinner or skeleton; preserve layout dimensions',
  success: 'Success color + optional check icon + brief confirmation',
  error: 'Error color + inline message adjacent to field',
  confirmation: 'Modal for destructive / irreversible actions',
  destructive: 'Error-styled primary action; require explicit confirm',
  transition: '100–150ms ease for micro-interactions',
} as const

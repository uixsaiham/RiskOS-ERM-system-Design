import * as React from 'react'
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  FileWarning,
  Filter,
  LayoutDashboard,
  Loader2,
  MoreHorizontal,
  Plus,
  Search as SearchIcon,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  User,
  XCircle,
} from 'lucide-react'
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  ConfirmDialog,
  ControlEffectiveness,
  Drawer,
  EmptyState,
  Field,
  Input,
  KpiCard,
  Modal,
  NavItemButton,
  NavSection,
  Pagination,
  Progress,
  Radio,
  RadioGroup,
  RiskScore,
  RiskSeverityBadge,
  RiskSeverityDot,
  SearchCommand,
  Select,
  Sidebar,
  Skeleton,
  Spinner,
  StatusBadge,
  StatusDot,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableToolbar,
  Tabs,
  Textarea,
  Toast,
  Toggle,
  Tooltip,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  colors,
  radius,
  riskSeverityBands,
  shadows,
  spacing,
  typography,
} from '@/tokens'
import { filterChips, kpiSamples, navPreview, sampleRisks } from './showcase-data'

/* ─────────────────────────────────────────────────────────────
 * Section chrome
 * ───────────────────────────────────────────────────────────── */

const SECTIONS = [
  {
    id: 'foundation',
    label: 'Foundation',
    items: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'grid', label: 'Grid' },
      { id: 'radius', label: 'Radius' },
      { id: 'shadows', label: 'Shadows' },
      { id: 'icons', label: 'Icons' },
    ],
  },
  {
    id: 'core',
    label: 'Core components',
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'inputs', label: 'Inputs' },
      { id: 'selects', label: 'Selects' },
      { id: 'checkboxes', label: 'Checkboxes' },
      { id: 'radios', label: 'Radios' },
      { id: 'toggles', label: 'Toggles' },
      { id: 'date-picker', label: 'Date picker' },
      { id: 'search', label: 'Search' },
      { id: 'tabs', label: 'Tabs' },
    ],
  },
  {
    id: 'data',
    label: 'Data components',
    items: [
      { id: 'kpi-cards', label: 'KPI cards' },
      { id: 'tables', label: 'Tables' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'filters', label: 'Filters' },
      { id: 'avatars', label: 'Avatars' },
      { id: 'progress', label: 'Progress indicators' },
    ],
  },
  {
    id: 'risk',
    label: 'Risk & enterprise',
    items: [
      { id: 'risk-score', label: 'Risk score' },
      { id: 'risk-severity', label: 'Risk severity' },
      { id: 'status-badges', label: 'Status badges' },
      { id: 'control-effectiveness', label: 'Control effectiveness' },
      { id: 'action-status', label: 'Action status' },
      { id: 'compliance-status', label: 'Compliance status' },
      { id: 'alert-indicators', label: 'Alert indicators' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      { id: 'toasts', label: 'Toasts' },
      { id: 'alerts', label: 'Alerts' },
      { id: 'modals', label: 'Modals' },
      { id: 'drawers', label: 'Drawers' },
      { id: 'tooltips', label: 'Tooltips' },
      { id: 'confirmation', label: 'Confirmation states' },
    ],
  },
  {
    id: 'system',
    label: 'System states',
    items: [
      { id: 'loading', label: 'Loading' },
      { id: 'empty', label: 'Empty' },
      { id: 'error', label: 'Error' },
      { id: 'success', label: 'Success' },
      { id: 'disabled', label: 'Disabled' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      { id: 'sidebar', label: 'Sidebar' },
      { id: 'submenu', label: 'Submenu' },
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'nav-tabs', label: 'Tabs' },
      { id: 'user-menu', label: 'User / profile menu' },
    ],
  },
] as const

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4 border-b border-[var(--color-border)] pb-12 last:border-0">
      <div className="space-y-1">
        <h2 className="font-h2 text-[var(--color-text-primary)]">{title}</h2>
        {description ? (
          <p className="max-w-3xl font-body-md text-[var(--color-text-secondary)]">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function SubSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div id={id} className={cn('scroll-mt-28 space-y-3', className)}>
      <div>
        <h3 className="font-h4 text-[var(--color-text-primary)]">{title}</h3>
        {description ? (
          <p className="mt-0.5 max-w-2xl font-body-sm text-[var(--color-text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-xs)] sm:p-5">
        {children}
      </div>
    </div>
  )
}

function DemoRow({
  label,
  children,
  className,
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <p className="font-overline text-[var(--color-text-muted)]">{label}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function Swatch({
  name,
  value,
  className,
}: {
  name: string
  value: string
  className?: string
}) {
  return (
    <div className="flex min-w-[120px] flex-col gap-1.5">
      <div
        className={cn(
          'h-14 rounded-md border border-[var(--color-border)] shadow-[var(--shadow-xs)]',
          className,
        )}
        style={className ? undefined : { background: value }}
        title={value}
      />
      <div className="space-y-0.5">
        <p className="font-label text-[var(--color-text-primary)]">{name}</p>
        <p className="font-caption text-[var(--color-text-muted)] tabular-nums">{value}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
 * Showcase
 * ───────────────────────────────────────────────────────────── */

export function DesignSystemShowcase() {
  const [activeSection, setActiveSection] = React.useState('colors')
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [tab, setTab] = React.useState('register')
  const [navTab, setNavTab] = React.useState('overview')
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [toastVisible, setToastVisible] = React.useState(true)
  const [notifyEmail, setNotifyEmail] = React.useState(true)
  const [notifySlack, setNotifySlack] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState<string[]>(['RSK-1042'])
  const [chips, setChips] = React.useState(() =>
    Object.fromEntries(filterChips.map((c) => [c.id, c.active])),
  )
  const [assessmentMethod, setAssessmentMethod] = React.useState('quantitative')
  const [expandedNav, setExpandedNav] = React.useState('risks')

  React.useEffect(() => {
    const ids = SECTIONS.flatMap((g) => g.items.map((i) => i.id))
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5] },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  const critical = sampleRisks[0]

  return (
    <div className="flex min-h-screen bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]">
      {/* Left TOC */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:flex">
        <div className="border-b border-[var(--color-border)] px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
              <Shield className="size-4" aria-hidden />
            </div>
            <div>
              <p className="font-label text-[var(--color-text-primary)]">RiskOS</p>
              <p className="font-caption text-[var(--color-text-muted)]">Design system</p>
            </div>
          </div>
          <p className="mt-3 font-caption text-[var(--color-text-secondary)]">
            Step 01 · Showcase with enterprise risk context — not a decorative catalog.
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-thin p-3">
          {SECTIONS.map((group) => (
            <div key={group.id} className="mb-4">
              <p className="mb-1.5 px-2 font-overline text-[var(--color-text-muted)]">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        'block rounded-md px-2 py-1.5 font-body-sm transition-colors',
                        activeSection === item.id
                          ? 'bg-[var(--color-primary-subtle)] font-medium text-[var(--color-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]',
                      )}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-[var(--color-border)] p-3">
          <p className="font-caption text-[var(--color-text-muted)]">
            Done: Step 03 dashboard · Next: Step 04 register
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-start justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="space-y-1">
              <p className="font-overline text-[var(--color-primary)]">Step 01 of 07</p>
              <h1 className="font-h1 text-[var(--color-text-primary)]">
                Design system showcase
              </h1>
              <p className="max-w-2xl font-body-md text-[var(--color-text-secondary)]">
                Components are shown the way risk teams use them: scores, overdue actions,
                control effectiveness, and compliance posture — so ERM screens can reuse
                proven patterns instead of inventing new ones.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <Badge variant="primary">Enterprise ERM</Badge>
              <Badge variant="neutral">v0.1 tokens</Badge>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:px-6">
          {/* ═══════════ FOUNDATION ═══════════ */}
          <Section
            id="foundation"
            title="Foundation"
            description="Tokens that keep RiskOS dense, scannable, and consistent across registers, assessments, and executive views."
          >
            <SubSection
              id="colors"
              title="Colors"
              description="Semantic surfaces and severity tones used in risk matrices, badges, and alerts. Prefer semantic tokens over raw hex in product UI."
            >
              <div className="space-y-6">
                <DemoRow label="Brand & surfaces">
                  <Swatch name="Primary" value={String(colors.primary?.DEFAULT ?? '#1e3a5f')} className="bg-[var(--color-primary)]" />
                  <Swatch name="Surface" value="var(--color-surface)" className="bg-[var(--color-surface)]" />
                  <Swatch name="Surface 2" value="var(--color-surface-secondary)" className="bg-[var(--color-surface-secondary)]" />
                  <Swatch name="Border" value="var(--color-border)" className="bg-[var(--color-border)]" />
                  <Swatch name="Text" value="var(--color-text-primary)" className="bg-[var(--color-text-primary)]" />
                </DemoRow>
                <DemoRow label="Risk severity (5×5 matrix bands)">
                  {(
                    [
                      ['critical', riskSeverityBands.critical],
                      ['high', riskSeverityBands.high],
                      ['moderate', riskSeverityBands.moderate],
                      ['low', riskSeverityBands.low],
                    ] as const
                  ).map(([key, band]) => (
                    <Swatch
                      key={key}
                      name={`${band.label} (${band.min}–${band.max})`}
                      value={`var(--color-risk-${key})`}
                      className={`bg-[var(--color-risk-${key})]`}
                    />
                  ))}
                </DemoRow>
                <DemoRow label="Feedback">
                  <Swatch name="Success" value="var(--color-success)" className="bg-[var(--color-success)]" />
                  <Swatch name="Warning" value="var(--color-warning)" className="bg-[var(--color-warning)]" />
                  <Swatch name="Error" value="var(--color-error)" className="bg-[var(--color-error)]" />
                  <Swatch name="Info" value="var(--color-info)" className="bg-[var(--color-info)]" />
                </DemoRow>
              </div>
            </SubSection>

            <SubSection
              id="typography"
              title="Typography"
              description="Hierarchy optimized for dense tables and KPI headers. Use tabular nums for scores and percentages."
            >
              <div className="space-y-3">
                <p className="font-display text-[var(--color-text-primary)]">
                  Display — Residual risk exposure
                </p>
                <p className="font-h1">H1 — Executive risk dashboard</p>
                <p className="font-h2">H2 — Risk register</p>
                <p className="font-h3">H3 — Inherent vs residual</p>
                <p className="font-h4">H4 — Control testing results</p>
                <p className="font-body-lg">
                  Body LG — Third-party cloud outage affecting payment processing SLAs.
                </p>
                <p className="font-body-md">
                  Body MD — Owner Priya Nair · Last assessed 12 Mar 2026 · Category Operational
                </p>
                <p className="font-body-sm text-[var(--color-text-secondary)]">
                  Body SM — Linked controls: A.12.1, A.17.1 · Framework ISO 27001
                </p>
                <p className="font-caption text-[var(--color-text-muted)]">
                  Caption — Updated 2 hours ago by Marcus Chen
                </p>
                <p className="font-label">Label — Residual score</p>
                <p className="font-overline">Overline — Risk domain</p>
                <p className="font-body-md tabular-nums">
                  Tabular — 18 / 25 · 82% · 1,248 risks
                </p>
                <p className="font-caption text-[var(--color-text-muted)]">
                  Scale reference: {Object.keys(typography).join(' · ')}
                </p>
              </div>
            </SubSection>

            <SubSection
              id="spacing"
              title="Spacing"
              description="4px base grid. Prefer token steps for padding inside cards, table cells, and form stacks."
            >
              <div className="flex flex-wrap items-end gap-3">
                {([1, 2, 3, 4, 5, 6, 8, 10, 12] as const).map((step) => (
                  <div key={step} className="flex flex-col items-center gap-1">
                    <div
                      className="rounded-sm bg-[var(--color-primary-muted)]"
                      style={{
                        width: spacing[step],
                        height: spacing[step],
                        minWidth: 4,
                      }}
                    />
                    <span className="font-caption text-[var(--color-text-muted)]">
                      {step} · {spacing[step]}
                    </span>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection
              id="grid"
              title="Grid"
              description="12-column layout for dashboards. KPI strips use 2–4 columns; registers go full width."
            >
              <div className="grid grid-cols-12 gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-10 items-center justify-center rounded-md bg-[var(--color-primary-subtle)] font-caption text-[var(--color-primary)]"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                {kpiSamples.slice(0, 4).map((k) => (
                  <div
                    key={k.label}
                    className="rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-secondary)] px-3 py-4"
                  >
                    <p className="font-caption text-[var(--color-text-muted)]">{k.label}</p>
                    <p className="font-h3 tabular-nums">
                      {k.value}
                      {k.unit ? (
                        <span className="ml-1 font-body-sm text-[var(--color-text-muted)]">
                          {k.unit}
                        </span>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection id="radius" title="Radius">
              <div className="flex flex-wrap gap-4">
                {Object.entries(radius).map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center gap-2">
                    <div
                      className="size-16 border border-[var(--color-border-strong)] bg-[var(--color-primary-subtle)]"
                      style={{ borderRadius: value }}
                    />
                    <span className="font-caption text-[var(--color-text-muted)]">
                      {key} · {value}
                    </span>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection id="shadows" title="Shadows">
              <div className="flex flex-wrap gap-6 bg-[var(--color-surface-secondary)] p-4 rounded-md">
                {Object.entries(shadows).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex h-20 w-36 flex-col items-center justify-center rounded-lg bg-[var(--color-surface)]"
                    style={{ boxShadow: String(value) }}
                  >
                    <span className="font-label">{key}</span>
                  </div>
                ))}
              </div>
            </SubSection>

            <SubSection
              id="icons"
              title="Icons"
              description="Lucide set at 16–20px. Pair severity icons with labels — never color alone."
            >
              <DemoRow>
                {(
                  [
                    [ShieldAlert, 'Critical risk'],
                    [Shield, 'Control'],
                    [ClipboardList, 'Assessment'],
                    [FileWarning, 'Issue'],
                    [CheckCircle2, 'Effective'],
                    [AlertTriangle, 'Overdue'],
                    [LayoutDashboard, 'Dashboard'],
                    [Bell, 'Alert'],
                  ] as const
                ).map(([Icon, label]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-md border border-[var(--color-border)] px-2.5 py-1.5"
                  >
                    <Icon className="size-4 text-[var(--color-text-secondary)]" aria-hidden />
                    <span className="font-body-sm">{label}</span>
                  </div>
                ))}
              </DemoRow>
            </SubSection>
          </Section>

          {/* ═══════════ CORE ═══════════ */}
          <Section
            id="core"
            title="Core components"
            description="Form and action primitives used in risk create/edit flows, filters, and assessment worksheets."
          >
            <SubSection id="buttons" title="Buttons">
              <div className="space-y-4">
                <DemoRow label="Variants">
                  <Button>Save assessment</Button>
                  <Button variant="secondary">Export register</Button>
                  <Button variant="tertiary">Add control</Button>
                  <Button variant="destructive">Delete treatment</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="link">View risk history</Button>
                </DemoRow>
                <DemoRow label="Sizes & states">
                  <Button size="sm">Assign owner</Button>
                  <Button size="md">Assign owner</Button>
                  <Button size="lg">Assign owner</Button>
                  <Button loading>Saving…</Button>
                  <Button disabled>Disabled</Button>
                  <Button size="icon" variant="secondary" aria-label="More">
                    <MoreHorizontal />
                  </Button>
                  <Button size="icon" variant="primary" aria-label="Add risk">
                    <Plus />
                  </Button>
                </DemoRow>
              </div>
            </SubSection>

            <SubSection
              id="inputs"
              title="Inputs"
              description="Example: capture residual score rationale on a risk treatment."
            >
              <div className="grid max-w-xl gap-4">
                <Field label="Risk title" htmlFor="risk-title" required>
                  <Input
                    id="risk-title"
                    defaultValue="Third-party cloud outage — payment processing"
                  />
                </Field>
                <Field
                  label="Treatment notes"
                  htmlFor="notes"
                  helperText="Visible to control owners and auditors."
                >
                  <Textarea
                    id="notes"
                    rows={3}
                    defaultValue="Escalate to vendor risk committee. Dual-region failover test scheduled for 28 Mar."
                  />
                </Field>
                <Field label="Residual score input" htmlFor="score" error="Score must be between 1 and 25.">
                  <Input id="score" error defaultValue="31" className="max-w-[120px] tabular-nums" />
                </Field>
              </div>
            </SubSection>

            <SubSection id="selects" title="Selects">
              <div className="grid max-w-xl gap-4 sm:grid-cols-2">
                <Field label="Risk category" htmlFor="category">
                  <Select id="category" defaultValue="operational">
                    <option value="operational">Operational</option>
                    <option value="financial">Financial</option>
                    <option value="compliance">Compliance</option>
                    <option value="strategic">Strategic</option>
                    <option value="technology">Technology</option>
                  </Select>
                </Field>
                <Field label="Risk owner" htmlFor="owner">
                  <Select id="owner" defaultValue="priya">
                    <option value="priya">Priya Nair</option>
                    <option value="marcus">Marcus Chen</option>
                    <option value="elena">Elena Vogt</option>
                    <option value="james">James Okonkwo</option>
                  </Select>
                </Field>
              </div>
            </SubSection>

            <SubSection id="checkboxes" title="Checkboxes">
              <div className="space-y-3">
                <Checkbox
                  defaultChecked
                  label="Include inherent score in executive pack"
                />
                <Checkbox label="Notify control owners on residual change" />
                <Checkbox indeterminate label="Select all risks on this page" />
                <Checkbox disabled label="Legacy field (read-only policy)" />
              </div>
            </SubSection>

            <SubSection id="radios" title="Radios">
              <Field label="Assessment method">
                <RadioGroup>
                  <Radio
                    name="method"
                    value="quantitative"
                    label="Quantitative (score 1–25)"
                    checked={assessmentMethod === 'quantitative'}
                    onChange={() => setAssessmentMethod('quantitative')}
                  />
                  <Radio
                    name="method"
                    value="qualitative"
                    label="Qualitative (L / M / H bands)"
                    checked={assessmentMethod === 'qualitative'}
                    onChange={() => setAssessmentMethod('qualitative')}
                  />
                  <Radio
                    name="method"
                    value="hybrid"
                    label="Hybrid (score + narrative)"
                    checked={assessmentMethod === 'hybrid'}
                    onChange={() => setAssessmentMethod('hybrid')}
                  />
                </RadioGroup>
              </Field>
            </SubSection>

            <SubSection id="toggles" title="Toggles">
              <div className="space-y-3 max-w-md">
                <Toggle
                  checked={notifyEmail}
                  onCheckedChange={setNotifyEmail}
                  label="Email digest for overdue actions"
                />
                <Toggle
                  checked={notifySlack}
                  onCheckedChange={setNotifySlack}
                  label="Slack alerts for critical residual ≥ 17"
                />
                <Toggle checked disabled label="Auto-close on control pass (policy locked)" />
              </div>
            </SubSection>

            <SubSection
              id="date-picker"
              title="Date picker"
              description="Native date input styled to tokens — full popover picker ships with assessment scheduling in a later step."
            >
              <div className="grid max-w-xl gap-4 sm:grid-cols-2">
                <Field label="Assessment due date" htmlFor="due">
                  <Input id="due" type="date" defaultValue="2026-03-28" />
                </Field>
                <Field label="Action deadline" htmlFor="deadline">
                  <Input id="deadline" type="date" defaultValue="2026-03-15" />
                </Field>
              </div>
            </SubSection>

            <SubSection
              id="search"
              title="Search"
              description="Global command search across risks, controls, and people — realistic ERM targets."
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" onClick={() => setSearchOpen(true)}>
                  <SearchIcon className="size-4" />
                  Search risks, controls…
                  <kbd className="ml-2 rounded border border-[var(--color-border)] px-1.5 font-caption text-[var(--color-text-muted)]">
                    ⌘K
                  </kbd>
                </Button>
                <div className="relative w-full max-w-sm">
                  <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <Input
                    className="pl-9"
                    placeholder="Filter register by ID or title…"
                    defaultValue="payment processing"
                  />
                </div>
              </div>
              <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
            </SubSection>

            <SubSection id="tabs" title="Tabs">
              <Tabs
                items={[
                  { id: 'register', label: 'Register', count: 248 },
                  { id: 'assessments', label: 'Assessments', count: 12 },
                  { id: 'treatments', label: 'Treatments', count: 41 },
                  { id: 'archive', label: 'Archive', disabled: true },
                ]}
                value={tab}
                onChange={setTab}
              />
              <p className="mt-3 font-body-sm text-[var(--color-text-secondary)]">
                Active view:{' '}
                <span className="font-medium text-[var(--color-text-primary)]">{tab}</span> —
                same pattern as Risk Register section chrome.
              </p>
            </SubSection>
          </Section>

          {/* ═══════════ DATA ═══════════ */}
          <Section
            id="data"
            title="Data components"
            description="How RiskOS presents portfolio signal — KPIs, registers, and filterable dense tables."
          >
            <SubSection
              id="kpi-cards"
              title="KPI cards"
              description="Executive strip with directional deltas. Tone follows risk meaning, not decoration."
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {kpiSamples.map((k) => (
                  <KpiCard
                    key={k.label}
                    title={k.label}
                    value={k.value + (k.unit ? ` ${k.unit}` : '')}
                    supporting={k.helper}
                    trend={{
                      value: `${k.delta > 0 ? '+' : ''}${k.delta} ${k.deltaLabel}`,
                      direction: k.trend,
                      positive: k.tone === 'success',
                    }}
                  />
                ))}
              </div>
            </SubSection>

            <SubSection
              id="tables"
              title="Tables"
              description="Risk register excerpt — severity, residual score, control effectiveness, and action hygiene in one scan line."
            >
              <Card className="overflow-hidden p-0">
                <TableToolbar
                  searchPlaceholder="Search risk ID or title…"
                  searchValue=""
                  onSearchChange={() => {}}
                >
                  <Button size="sm" variant="secondary">
                    <Filter className="size-3.5" />
                    Filters
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="size-3.5" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="size-3.5" />
                    Add risk
                  </Button>
                </TableToolbar>
                <Table density="compact">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox
                          aria-label="Select all"
                          checked={selectedRows.length === sampleRisks.length}
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < sampleRisks.length
                          }
                          onChange={(e) =>
                            setSelectedRows(
                              e.target.checked ? sampleRisks.map((r) => r.id) : [],
                            )
                          }
                        />
                      </TableHead>
                      <TableHead sortable sorted="asc">
                        Risk
                      </TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Residual</TableHead>
                      <TableHead>Controls</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleRisks.map((risk) => (
                      <TableRow
                        key={risk.id}
                        selected={selectedRows.includes(risk.id)}
                      >
                        <TableCell>
                          <Checkbox
                            aria-label={`Select ${risk.id}`}
                            checked={selectedRows.includes(risk.id)}
                            onChange={(e) =>
                              setSelectedRows((prev) =>
                                e.target.checked
                                  ? [...prev, risk.id]
                                  : prev.filter((id) => id !== risk.id),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            <RiskSeverityDot score={risk.residual} className="mt-1.5" />
                            <div>
                              <p className="font-label text-[var(--color-text-primary)]">
                                {risk.id}
                              </p>
                              <p className="max-w-[240px] truncate font-body-sm text-[var(--color-text-secondary)]">
                                {risk.title}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar name={risk.owner} size="sm" />
                            <span className="font-body-sm">{risk.owner}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <RiskScore score={risk.residual} size="sm" />
                        </TableCell>
                        <TableCell>
                          <ControlEffectiveness value={risk.controlEffectiveness} />
                        </TableCell>
                        <TableCell>
                          {risk.actionStatus === 'overdue' ? (
                            <StatusBadge
                              status="overdue"
                              label={`Overdue · ${risk.actionDaysOverdue} days`}
                            />
                          ) : (
                            <StatusBadge status={risk.actionStatus} />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex min-w-[100px] flex-col gap-1">
                            <span className="font-caption tabular-nums text-[var(--color-text-secondary)]">
                              {risk.compliancePct}% compliant
                            </span>
                            <Progress
                              value={risk.compliancePct}
                              size="sm"
                              variant={
                                risk.compliancePct >= 90
                                  ? 'success'
                                  : risk.compliancePct >= 70
                                    ? 'warning'
                                    : 'error'
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="icon-sm" variant="ghost" aria-label="Row actions">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </SubSection>

            <SubSection id="pagination" title="Pagination">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={248}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />
            </SubSection>

            <SubSection
              id="filters"
              title="Filters"
              description="Chip filters for register and action queues — active filters stay visible."
            >
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="secondary">
                  <SlidersHorizontal className="size-3.5" />
                  All filters
                </Button>
                {filterChips.map((chip) => {
                  const active = chips[chip.id]
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() =>
                        setChips((prev) => ({ ...prev, [chip.id]: !prev[chip.id] }))
                      }
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-caption transition-colors',
                        active
                          ? 'border-[var(--color-primary-muted)] bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]',
                      )}
                    >
                      {chip.label}
                      {active ? <Check className="size-3" aria-hidden /> : null}
                    </button>
                  )
                })}
                <button
                  type="button"
                  className="font-caption text-[var(--color-text-link)] hover:underline"
                  onClick={() =>
                    setChips(Object.fromEntries(filterChips.map((c) => [c.id, false])))
                  }
                >
                  Clear all
                </button>
              </div>
              <p className="mt-3 font-body-sm text-[var(--color-text-secondary)]">
                Showing risks matching{' '}
                <span className="font-medium text-[var(--color-text-primary)]">
                  Critical + High + Overdue actions
                </span>{' '}
                · 27 results
              </p>
            </SubSection>

            <SubSection id="avatars" title="Avatars">
              <DemoRow label="Owners & committees">
                <Avatar name="Priya Nair" size="sm" />
                <Avatar name="Marcus Chen" size="md" />
                <Avatar name="Elena Vogt" size="lg" />
                <AvatarGroup
                  people={[
                    { name: 'Priya Nair' },
                    { name: 'Marcus Chen' },
                    { name: 'Elena Vogt' },
                    { name: 'James Okonkwo' },
                    { name: 'Aisha Rahman' },
                    { name: 'Board Risk Committee' },
                  ]}
                  max={4}
                />
              </DemoRow>
            </SubSection>

            <SubSection id="progress" title="Progress indicators">
              <div className="grid max-w-lg gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between font-caption">
                    <span>Q1 assessment cycle</span>
                    <span className="tabular-nums">146 / 180</span>
                  </div>
                  <Progress value={81} showLabel={false} variant="primary" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between font-caption">
                    <span>Control testing — ISO 27001</span>
                    <span className="tabular-nums">82%</span>
                  </div>
                  <Progress value={82} variant="success" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between font-caption">
                    <span>Treatment plan completion</span>
                    <span className="tabular-nums text-[var(--color-warning)]">54%</span>
                  </div>
                  <Progress value={54} variant="warning" />
                </div>
                <div className="flex items-center gap-3">
                  <Spinner />
                  <span className="font-body-sm text-[var(--color-text-secondary)]">
                    Recalculating residual scores…
                  </span>
                </div>
              </div>
            </SubSection>
          </Section>

          {/* ═══════════ RISK & ENTERPRISE ═══════════ */}
          <Section
            id="risk"
            title="Risk & enterprise components"
            description="Domain primitives. These should look correct on day one of the Risk Register and Assessment screens."
          >
            <SubSection
              id="risk-score"
              title="Risk score"
              description="Example from the live register: payment-processing outage residual."
            >
              <div className="flex flex-wrap items-end gap-6">
                <div className="space-y-2">
                  <p className="font-overline text-[var(--color-text-muted)]">Residual</p>
                  <RiskScore score={critical.residual} size="lg" />
                  <p className="font-body-sm text-[var(--color-text-secondary)]">
                    {critical.residual} / 25 — Critical
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-overline text-[var(--color-text-muted)]">Inherent</p>
                  <RiskScore score={critical.inherent} size="md" />
                </div>
                <div className="space-y-2">
                  <p className="font-overline text-[var(--color-text-muted)]">Sizes</p>
                  <div className="flex items-center gap-3">
                    <RiskScore score={18} size="sm" />
                    <RiskScore score={12} size="md" />
                    <RiskScore score={6} size="lg" />
                    <RiskScore score={4} size="sm" />
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
                <p className="font-body-sm text-[var(--color-text-secondary)]">
                  <span className="font-label text-[var(--color-text-primary)]">
                    {critical.id}
                  </span>{' '}
                  {critical.title} · L{critical.likelihood}×I{critical.impact} · Owner{' '}
                  {critical.owner}
                </p>
              </div>
            </SubSection>

            <SubSection id="risk-severity" title="Risk severity">
              <DemoRow label="Badges">
                {(['critical', 'high', 'moderate', 'low'] as const).map((s) => (
                  <RiskSeverityBadge key={s} severity={s} />
                ))}
              </DemoRow>
              <DemoRow label="From score" className="mt-4">
                {[18, 12, 9, 6, 3].map((score) => (
                  <div key={score} className="flex items-center gap-2">
                    <RiskSeverityDot score={score} />
                    <RiskSeverityBadge score={score} />
                    <span className="font-caption tabular-nums text-[var(--color-text-muted)]">
                      score {score}
                    </span>
                  </div>
                ))}
              </DemoRow>
            </SubSection>

            <SubSection id="status-badges" title="Status badges">
              <DemoRow label="Workflow">
                <StatusBadge status="draft" />
                <StatusBadge status="open" />
                <StatusBadge status="in_progress" />
                <StatusBadge status="pending_review" />
                <StatusBadge status="completed" />
                <StatusBadge status="closed" />
              </DemoRow>
              <DemoRow label="With dot" className="mt-3">
                <StatusDot status="in_progress" />
                <StatusDot status="completed" />
                <StatusDot status="overdue" />
              </DemoRow>
            </SubSection>

            <SubSection
              id="control-effectiveness"
              title="Control effectiveness"
              description="Tied to testing language auditors expect."
            >
              <DemoRow>
                <ControlEffectiveness value="highly_effective" />
                <ControlEffectiveness value="effective" />
                <ControlEffectiveness value="partially_effective" />
                <ControlEffectiveness value="ineffective" />
                <ControlEffectiveness value="not_tested" />
              </DemoRow>
              <p className="mt-3 font-body-sm text-[var(--color-text-secondary)]">
                {critical.id} controls are{' '}
                <span className="font-medium text-[var(--color-text-primary)]">
                  Partially Effective
                </span>{' '}
                — failover tested in staging only; production dual-region drill overdue.
              </p>
            </SubSection>

            <SubSection id="action-status" title="Action status">
              <DemoRow>
                <StatusBadge status="open" label="Open" />
                <StatusBadge status="in_progress" label="In progress" />
                <StatusBadge
                  status="overdue"
                  label={`Overdue · ${critical.actionDaysOverdue} days`}
                />
                <StatusBadge status="completed" label="Completed" />
                <StatusBadge status="cancelled" label="Cancelled" />
              </DemoRow>
              <Card className="mt-4 max-w-md">
                <CardHeader>
                  <CardTitle className="font-h4">ACT-2201 · Failover drill</CardTitle>
                  <CardDescription>
                    Linked to {critical.id} · Owner {critical.owner}
                  </CardDescription>
                </CardHeader>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <StatusBadge
                    status="overdue"
                    label={`Overdue · ${critical.actionDaysOverdue} days`}
                  />
                  <span className="font-caption text-[var(--color-text-muted)]">
                    Due 12 Mar 2026
                  </span>
                </div>
              </Card>
            </SubSection>

            <SubSection id="compliance-status" title="Compliance status">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { framework: 'SOC 2 Type II', pct: 82, label: '82% Compliant' },
                  { framework: 'ISO 27001', pct: 91, label: '91% Compliant' },
                  { framework: 'GDPR control set', pct: 68, label: '68% Compliant' },
                ].map((item) => (
                  <Card key={item.framework}>
                    <p className="font-caption text-[var(--color-text-muted)]">
                      {item.framework}
                    </p>
                    <p className="mt-1 font-h3 tabular-nums">{item.label}</p>
                    <Progress
                      className="mt-3"
                      value={item.pct}
                      variant={
                        item.pct >= 90 ? 'success' : item.pct >= 75 ? 'warning' : 'error'
                      }
                    />
                  </Card>
                ))}
              </div>
            </SubSection>

            <SubSection id="alert-indicators" title="Alert indicators">
              <DemoRow>
                <Badge variant="error">
                  <AlertTriangle className="size-3" />
                  18 critical residual
                </Badge>
                <Badge variant="warning">
                  <Bell className="size-3" />
                  27 overdue actions
                </Badge>
                <Badge variant="info">
                  <Shield className="size-3" />
                  12 assessments due
                </Badge>
                <Badge variant="success">
                  <ShieldCheck className="size-3" />
                  4 controls passed
                </Badge>
              </DemoRow>
            </SubSection>
          </Section>

          {/* ═══════════ FEEDBACK ═══════════ */}
          <Section
            id="feedback"
            title="Feedback"
            description="System messaging for saves, policy warnings, and destructive confirmations."
          >
            <SubSection id="toasts" title="Toasts">
              <div className="flex flex-col gap-3 max-w-md">
                {toastVisible ? (
                  <Toast
                    variant="success"
                    title="Assessment saved"
                    description={`${critical.id} residual updated to 18 / 25 — Critical.`}
                    onClose={() => setToastVisible(false)}
                  />
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => setToastVisible(true)}>
                    Show toast again
                  </Button>
                )}
                <Toast
                  variant="info"
                  title="Syncing control library"
                  description="ISO 27001 mapping refresh in progress."
                />
                <Toast
                  variant="error"
                  title="Could not close action"
                  description="ACT-2201 still has open evidence requests."
                />
              </div>
            </SubSection>

            <SubSection id="alerts" title="Alerts">
              <div className="space-y-3">
                <Alert variant="warning" title="Residual above appetite">
                  {critical.id} exceeds enterprise appetite (threshold 15). Escalation to Risk Committee is required within 5 business days.
                </Alert>
                <Alert variant="info" title="Assessment cycle">
                  Q1 cycle closes 31 Mar. 34 risks still unassessed in Operational.
                </Alert>
                <Alert variant="error" title="Control test failed">
                  A.17.1.2 disaster recovery — evidence rejected. Linked residual scores will not auto-reduce.
                </Alert>
                <Alert variant="success" title="Treatment verified">
                  ACT-1988 dual-approval workflow marked complete by Internal Audit.
                </Alert>
              </div>
            </SubSection>

            <SubSection id="modals" title="Modals">
              <Button onClick={() => setModalOpen(true)}>Open risk summary modal</Button>
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`${critical.id} · Risk summary`}
                description="Quick view before opening the full risk detail page."
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setModalOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>Open full record</Button>
                  </>
                }
              >
                <div className="space-y-4">
                  <p className="font-body-md">{critical.title}</p>
                  <div className="flex flex-wrap gap-3">
                    <RiskScore score={critical.residual} />
                    <ControlEffectiveness value={critical.controlEffectiveness} />
                    <StatusBadge
                      status="overdue"
                      label={`Overdue · ${critical.actionDaysOverdue} days`}
                    />
                  </div>
                </div>
              </Modal>
            </SubSection>

            <SubSection id="drawers" title="Drawers">
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
                Open treatment drawer
              </Button>
              <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Add treatment action"
                description={`Linked risk ${critical.id}`}
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setDrawerOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setDrawerOpen(false)}>Create action</Button>
                  </>
                }
              >
                <div className="space-y-4">
                  <Field label="Action title" htmlFor="act-title" required>
                    <Input
                      id="act-title"
                      placeholder="e.g. Schedule production failover drill"
                    />
                  </Field>
                  <Field label="Owner" htmlFor="act-owner">
                    <Select id="act-owner" defaultValue="priya">
                      <option value="priya">Priya Nair</option>
                      <option value="marcus">Marcus Chen</option>
                    </Select>
                  </Field>
                  <Field label="Due date" htmlFor="act-due">
                    <Input id="act-due" type="date" defaultValue="2026-03-28" />
                  </Field>
                </div>
              </Drawer>
            </SubSection>

            <SubSection id="tooltips" title="Tooltips">
              <DemoRow>
                <Tooltip content="Residual = Likelihood × Impact after controls">
                  <Button variant="secondary" size="sm">
                    Residual score
                  </Button>
                </Tooltip>
                <Tooltip content="Partially effective — design OK, operating effectiveness gaps">
                  <span>
                    <ControlEffectiveness value="partially_effective" />
                  </span>
                </Tooltip>
                <Tooltip content="Score 17–25 on the 5×5 matrix" side="bottom">
                  <span>
                    <RiskSeverityBadge severity="critical" />
                  </span>
                </Tooltip>
              </DemoRow>
            </SubSection>

            <SubSection id="confirmation" title="Confirmation states">
              <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
                Close risk without treatment…
              </Button>
              <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                title="Close risk without residual treatment?"
                description={`${critical.id} still has overdue actions and partially effective controls. This will mark the risk closed for reporting.`}
                confirmLabel="Close risk"
                destructive
                onConfirm={() => setConfirmOpen(false)}
              />
            </SubSection>
          </Section>

          {/* ═══════════ SYSTEM STATES ═══════════ */}
          <Section
            id="system"
            title="System states"
            description="Every register and panel needs loading, empty, error, success, and disabled — shown with ERM copy."
          >
            <SubSection id="loading" title="Loading">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-24 w-full" />
                </div>
                <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[var(--color-border)] p-8">
                  <Loader2 className="size-6 animate-spin text-[var(--color-primary)]" />
                  <p className="font-body-sm text-[var(--color-text-secondary)]">
                    Loading risk register…
                  </p>
                </div>
              </div>
            </SubSection>

            <SubSection id="empty" title="Empty">
              <EmptyState
                icon={ClipboardList}
                title="No risks match these filters"
                description="Try clearing “Overdue actions” or expanding severity beyond Critical and High. You can also create a risk in this category."
                action={
                  <Button size="sm">
                    <Plus className="size-3.5" />
                    Add risk
                  </Button>
                }
              />
            </SubSection>

            <SubSection id="error" title="Error">
              <div className="flex flex-col items-center gap-3 rounded-md border border-[var(--color-error-border)] bg-[var(--color-error-subtle)] px-6 py-10 text-center">
                <XCircle className="size-8 text-[var(--color-error)]" />
                <div className="space-y-1">
                  <p className="font-h4 text-[var(--color-text-primary)]">
                    Couldn’t load risk register
                  </p>
                  <p className="max-w-md font-body-sm text-[var(--color-text-secondary)]">
                    The risk service returned 503. Your filters were kept. Retry or check
                    system status.
                  </p>
                </div>
                <Button size="sm" variant="secondary">
                  Retry
                </Button>
              </div>
            </SubSection>

            <SubSection id="success" title="Success">
              <div className="flex flex-col items-center gap-3 rounded-md border border-[var(--color-success-border)] bg-[var(--color-success-subtle)] px-6 py-10 text-center">
                <CheckCircle2 className="size-8 text-[var(--color-success)]" />
                <div className="space-y-1">
                  <p className="font-h4">Assessment submitted</p>
                  <p className="max-w-md font-body-sm text-[var(--color-text-secondary)]">
                    {critical.id} is pending Risk Committee review. Residual 18 / 25 remains
                    Critical until treatments close.
                  </p>
                </div>
              </div>
            </SubSection>

            <SubSection id="disabled" title="Disabled">
              <DemoRow>
                <Button disabled>Save (policy lock)</Button>
                <Input disabled placeholder="Read-only residual" className="max-w-[200px]" />
                <Select disabled defaultValue="x" className="max-w-[200px]">
                  <option value="x">Archived risk</option>
                </Select>
                <Toggle checked disabled label="Inherited from parent framework" />
                <Checkbox disabled checked label="Board-approved appetite" />
              </DemoRow>
            </SubSection>
          </Section>

          {/* ═══════════ NAVIGATION ═══════════ */}
          <Section
            id="navigation"
            title="Navigation"
            description="Shell patterns for deep ERM hierarchies. Full IA lives in src/navigation (AppShell + nav-config)."
          >
            <SubSection
              id="sidebar"
              title="Sidebar"
              description="Collapsed and expanded shells. Production IA: src/navigation/nav-config.ts."
            >
              <div className="flex h-[420px] overflow-hidden rounded-lg border border-[var(--color-border)]">
                <Sidebar
                  collapsed={sidebarCollapsed}
                  onCollapsedChange={setSidebarCollapsed}
                  logo={
                    sidebarCollapsed ? (
                      <Shield className="size-5 text-[var(--color-primary)]" />
                    ) : (
                      <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
                        <Shield className="size-5 text-[var(--color-primary)]" />
                        <span className="font-label font-bold">RiskOS</span>
                      </div>
                    )
                  }
                  footer={
                    <NavItemButton
                      item={{ id: 'settings', label: 'Settings', icon: Settings }}
                      collapsed={sidebarCollapsed}
                      active={false}
                    />
                  }
                >
                  <NavSection label="Workspace" collapsed={sidebarCollapsed}>
                    <NavItemButton
                      item={{
                        id: 'dashboard',
                        label: 'Executive dashboard',
                        icon: LayoutDashboard,
                      }}
                      collapsed={sidebarCollapsed}
                      active
                    />
                  </NavSection>
                  <NavSection label="Risk" collapsed={sidebarCollapsed}>
                    {navPreview.slice(1).map((item) => (
                      <NavItemButton
                        key={item.id}
                        item={{
                          id: item.id,
                          label: item.label,
                          icon: item.id === 'controls' ? Shield : ClipboardList,
                          children: item.children.map((c) => ({
                            id: c.id,
                            label: c.label,
                            badge: 'badge' in c ? c.badge : undefined,
                          })),
                        }}
                        collapsed={sidebarCollapsed}
                        active={false}
                        expanded={expandedNav === item.id}
                        onToggle={() =>
                          setExpandedNav((cur) => (cur === item.id ? '' : item.id))
                        }
                      />
                    ))}
                  </NavSection>
                </Sidebar>
                <div className="flex flex-1 flex-col bg-[var(--color-surface-secondary)] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-label">Canvas preview</p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSidebarCollapsed((v) => !v)}
                    >
                      {sidebarCollapsed ? 'Expand' : 'Collapse'} sidebar
                    </Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)]">
                    <p className="max-w-xs text-center font-body-sm text-[var(--color-text-muted)]">
                      Step 02 will lock Information Architecture, nested routes, and badge
                      counts. This showcase only validates the shell components.
                    </p>
                  </div>
                </div>
              </div>
            </SubSection>

            <SubSection id="submenu" title="Submenu">
              <p className="mb-3 font-body-sm text-[var(--color-text-secondary)]">
                Nested items under Risk management — badges show queue depth, not decoration.
              </p>
              <div className="max-w-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-sidebar-bg)] p-2 text-[var(--color-sidebar-fg)]">
                {navPreview[1].children.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 font-body-sm text-[var(--color-sidebar-fg-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-[var(--color-text-primary)]"
                  >
                    <ChevronRight className="size-3.5 opacity-50" />
                    <span className="flex-1 text-left">{child.label}</span>
                    {'badge' in child && child.badge != null ? (
                      <span className="font-caption tabular-nums opacity-70">
                        {child.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </SubSection>

            <SubSection id="breadcrumb" title="Breadcrumb">
              <Breadcrumb
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Risk management', href: '#' },
                  { label: 'Risk register', href: '#' },
                  { label: critical.id },
                ]}
              />
            </SubSection>

            <SubSection id="nav-tabs" title="Tabs (page level)">
              <Tabs
                items={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'assessment', label: 'Assessment', count: 3 },
                  { id: 'controls', label: 'Controls', count: 8 },
                  { id: 'actions', label: 'Actions', count: 4 },
                  { id: 'history', label: 'History' },
                ]}
                value={navTab}
                onChange={setNavTab}
              />
            </SubSection>

            <SubSection id="user-menu" title="User / profile menu">
              <Card className="max-w-sm p-0 overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-3 py-3 text-left hover:bg-[var(--color-surface-secondary)]"
                >
                  <Avatar name="Priya Nair" size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-label truncate">Priya Nair</p>
                    <p className="font-caption text-[var(--color-text-muted)] truncate">
                      Chief Risk Officer · Contoso Financial
                    </p>
                  </div>
                </button>
                <div className="border-t border-[var(--color-border)] py-1">
                  {(
                    [
                      [User, 'Profile & preferences'],
                      [Bell, 'Notification settings'],
                      [Shield, 'Risk appetite defaults'],
                      [Settings, 'Administration'],
                    ] as const
                  ).map(([Icon, label]) => (
                    <button
                      key={label}
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 font-body-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                      <Icon className="size-4" />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-[var(--color-border)] p-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Sign out
                  </Button>
                </div>
              </Card>
            </SubSection>
          </Section>

          <footer className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="font-overline text-[var(--color-primary)]">Roadmap</p>
            <ol className="mt-2 space-y-1 font-body-sm text-[var(--color-text-secondary)]">
              <li className="font-medium text-[var(--color-text-primary)]">
                Step 01 — Design system showcase ✅
              </li>
              <li className="font-medium text-[var(--color-text-primary)]">
                Step 02 — Navigation architecture + app shell ✅
              </li>
              <li className="font-medium text-[var(--color-text-primary)]">
                Step 03 — Executive risk dashboard ✅
              </li>
              <li>Step 04 — Risk register</li>
              <li>Step 05 — Risk details</li>
              <li>Step 06 — Risk assessment</li>
              <li>Step 07 — Risk matrix / heatmap</li>
            </ol>
            <p className="mt-3 font-caption text-[var(--color-text-muted)]">
              Executive risk dashboard is live in shell. Next prompt: Step 04 — Risk register.
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default DesignSystemShowcase

import * as React from 'react'
import {
  Bell,
  ChevronsUpDown,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  EmptyState,
  GlobalSearch,
  NavItemButton,
  NavSection,
  Sidebar,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { ExecutiveDashboard } from '@/dashboard'
import { RiskRegisterWorkspace } from '@/risk-register'
import {
  currentUser,
  getBreadcrumbs,
  getExpandedParentId,
  getNavNode,
  headerMeta,
  isNavItemActive,
  navSections,
} from './nav-config'

function RiskOsLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 w-full', collapsed && 'justify-center')}>
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xs ring-1 ring-blue-700/20">
        <ShieldCheck className="size-5" aria-hidden />
        <span className="absolute -top-0.5 -right-0.5 flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
        </span>
      </div>
      {!collapsed && (
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 tracking-tight text-[15px]">
              {headerMeta.productName}
            </span>
            <span className="rounded bg-blue-50 px-1 py-0.2 text-[9px] font-mono font-semibold text-blue-700 border border-blue-200">
              ERM
            </span>
          </div>
          <p className="truncate text-[11px] font-medium text-slate-500 mt-0.5">
            {currentUser.org}
          </p>
        </div>
      )}
    </div>
  )
}

function UserMenu({
  collapsed,
  onCollapseToggle,
}: {
  collapsed?: boolean
  onCollapseToggle?: () => void
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative w-full space-y-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'group flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition-all duration-150 select-none',
          'hover:bg-slate-100/80 border border-transparent hover:border-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
          collapsed && 'justify-center p-1',
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="relative shrink-0">
          <Avatar name={currentUser.name} size="sm" />
          <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[13px] font-semibold text-slate-900">{currentUser.name}</p>
              <p className="truncate text-[11px] text-slate-500">
                {currentUser.role}
              </p>
            </div>
            <ChevronsUpDown
              className="size-3.5 shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors"
              aria-hidden
            />
          </>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-[var(--z-dropdown,300)] min-w-[240px] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10',
            collapsed ? 'bottom-0 left-full ml-2' : 'bottom-full left-0 right-0 mb-2',
          )}
        >
          <div className="border-b border-slate-100 px-2.5 py-2">
            <p className="text-[13px] font-semibold text-slate-900">{currentUser.name}</p>
            <p className="text-[11px] text-slate-500">{currentUser.email}</p>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200/80">
              <span>Role:</span>
              <span className="font-semibold">{currentUser.role}</span>
            </div>
          </div>
          <div className="py-1">
            {(
              [
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'settings', label: 'Settings & Preferences', icon: Settings },
                { id: 'sign-out', label: 'Sign out', icon: LogOut },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                onClick={() => setOpen(false)}
              >
                <item.icon className="size-3.5 opacity-70" aria-hidden />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapse toggle at bottom of sidebar when expanded */}
      {!collapsed && onCollapseToggle && (
        <button
          type="button"
          onClick={onCollapseToggle}
          className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-[11px] text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <PanelLeftClose className="size-3.5 text-slate-400" />
            <span>Collapse menu</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1 py-0.2 rounded border border-slate-200/80">
            ⌘[
          </span>
        </button>
      )}
    </div>
  )
}

function PagePlaceholder({ activeId }: { activeId: string }) {
  const node = getNavNode(activeId)
  const Icon = node?.icon

  return (
    <div className="mx-auto max-w-[var(--layout-content-max,1440px)] space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {Icon && (
              <span className="flex size-9 items-center justify-center rounded-md bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
                <Icon className="size-5" aria-hidden />
              </span>
            )}
            <h1 className="font-h1 text-[var(--color-text-primary)]">
              {node?.label ?? 'Page'}
            </h1>
          </div>
          {node?.description && (
            <p className="max-w-2xl font-body-md text-[var(--color-text-secondary)]">
              {node.description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm">
            Export
          </Button>
          <Button variant="primary" size="sm">
            New
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {['Open items', 'Attention required', 'Last updated'].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-xs)]"
          >
            <p className="font-caption text-[var(--color-text-muted)]">{label}</p>
            <p className="mt-1 font-h3 tabular-nums text-[var(--color-text-primary)]">—</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]">
        <EmptyState
          icon={Icon}
          title={`${node?.label ?? 'Module'} workspace`}
          description="Step 02 delivers IA and shell chrome. Domain screens (registers, assessments, board packs) land in later steps on this route map."
        />
      </div>
    </div>
  )
}

export function AppShell({
  initialRoute = 'dashboard',
  onOpenShowcase,
}: {
  initialRoute?: string
  /** Dev escape hatch back to design system showcase */
  onOpenShowcase?: () => void
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [activeId, setActiveId] = React.useState(initialRoute)
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(() => {
    const parent = getExpandedParentId(initialRoute)
    const seed: Record<string, boolean> = {
      dashboard: true,
      risks: true,
      'my-work': true,
    }
    if (parent) seed[parent] = true
    return seed
  })

  const navigate = React.useCallback((id: string) => {
    setActiveId(id)
    setExpanded((prev) => {
      const next = { ...prev }
      const parent = getExpandedParentId(id)
      if (parent) next[parent] = true
      // Expand module roots when landed on directly (e.g. collapsed icon click)
      const sectionItem = navSections
        .flatMap((s) => s.items)
        .find((i) => i.id === id)
      if (sectionItem?.children?.length) next[id] = true
      return next
    })
    setMobileNavOpen(false)
  }, [])

  const toggleExpand = React.useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const crumbs = React.useMemo(() => {
    return getBreadcrumbs(activeId).map((c) => ({
      label: c.label,
      onClick: c.id !== activeId ? () => navigate(c.id) : undefined,
    }))
  }, [activeId, navigate])

  const renderSidebar = (isCollapsed: boolean) => (
    <Sidebar
      collapsed={isCollapsed}
      onCollapsedChange={setCollapsed}
      logo={<RiskOsLogo collapsed={isCollapsed} />}
      footer={<UserMenu collapsed={isCollapsed} onCollapseToggle={() => setCollapsed(!isCollapsed)} />}
      className="h-full"
    >
      {navSections.map((section) => (
        <NavSection key={section.id} label={section.label} collapsed={isCollapsed}>
          {section.items.map((item) => (
            <NavItemButton
              key={item.id}
              item={{
                id: item.id,
                label: item.label,
                icon: item.icon,
                badge: item.badge,
                children: item.children?.map((c) => ({
                  id: c.id,
                  label: c.label,
                  badge: c.badge,
                })),
              }}
              active={isNavItemActive(item.id, activeId)}
              activeChildId={activeId}
              collapsed={isCollapsed}
              expanded={!!expanded[item.id]}
              onToggle={() => toggleExpand(item.id)}
              onSelect={navigate}
            />
          ))}
        </NavSection>
      ))}
    </Sidebar>
  )

  return (
    <div className="flex h-dvh overflow-hidden bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Desktop sidebar */}
      <div className="hidden h-full shrink-0 md:flex">{renderSidebar(collapsed)}</div>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[var(--z-sidebar)] flex md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative z-10 h-full shadow-[var(--shadow-lg)]">
            {renderSidebar(false)}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 sm:px-5">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label="Open navigation"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </Button>

          <div className="hidden min-w-0 sm:block">
            <Breadcrumb items={crumbs} onHomeClick={() => navigate('dashboard')} />
          </div>

          <div className="mx-auto hidden w-full max-w-md flex-1 lg:block">
            <GlobalSearch />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Badge variant="neutral" className="hidden sm:inline-flex">
              {headerMeta.environment}
            </Badge>
            {onOpenShowcase && (
              <Button variant="ghost" size="sm" onClick={onOpenShowcase} className="hidden lg:inline-flex">
                Design system
              </Button>
            )}
            <Button variant="ghost" size="sm" aria-label="Notifications" className="relative">
              <Bell className="size-5" />
              {headerMeta.notifications > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-[var(--color-error)] text-[10px] font-semibold text-white">
                  {headerMeta.notifications}
                </span>
              )}
            </Button>
            <div className="hidden sm:block md:hidden">
              <Avatar name={currentUser.name} size="sm" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-4 sm:hidden">
            <Breadcrumb items={crumbs} onHomeClick={() => navigate('dashboard')} />
          </div>
          {activeId === 'dashboard' || activeId === 'dashboard-executive' ? (
            <ExecutiveDashboard onNavigate={navigate} />
          ) : activeId.startsWith('risk') ? (
            <RiskRegisterWorkspace
              key={activeId}
              onNavigate={navigate}
              routeId={activeId}
              initialFilter={
                activeId.startsWith('risk-')
                  ? { search: activeId.replace('risk-', '') }
                  : undefined
              }
            />
          ) : (
            <PagePlaceholder activeId={activeId} />
          )}
        </main>
      </div>
    </div>
  )
}

export default AppShell

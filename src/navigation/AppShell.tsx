import * as React from 'react'
import {
  Bell,
  ChevronDown,
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
    <div className={cn('flex items-center gap-2.5', collapsed && 'justify-center')}>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[var(--shadow-xs)]">
        <ShieldCheck className="size-4" aria-hidden />
      </div>
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <p className="font-label truncate text-white">{headerMeta.productName}</p>
          <p className="truncate font-caption text-[var(--color-sidebar-fg-muted)]">
            {currentUser.org}
          </p>
        </div>
      )}
    </div>
  )
}

function UserMenu({ collapsed }: { collapsed?: boolean }) {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-md p-2 text-left transition-colors',
          'hover:bg-[var(--color-sidebar-hover)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
          collapsed && 'justify-center',
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={currentUser.name} size="sm" />
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate font-label text-white">{currentUser.name}</p>
              <p className="truncate font-caption text-[var(--color-sidebar-fg-muted)]">
                {currentUser.role}
              </p>
            </div>
            <ChevronDown
              className={cn(
                'size-4 shrink-0 text-[var(--color-sidebar-fg-muted)] transition-transform',
                open && 'rotate-180',
              )}
              aria-hidden
            />
          </>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-[var(--z-dropdown,300)] min-w-[220px] overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-[var(--shadow-lg)]',
            collapsed ? 'bottom-0 left-full ml-2' : 'bottom-full left-0 right-0 mb-2',
          )}
        >
          <div className="border-b border-[var(--color-border)] px-3 py-2">
            <p className="font-label text-[var(--color-text-primary)]">{currentUser.name}</p>
            <p className="font-caption text-[var(--color-text-muted)]">{currentUser.email}</p>
          </div>
          {(
            [
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'sign-out', label: 'Sign out', icon: LogOut },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-2 px-3 py-2 font-body-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
              onClick={() => setOpen(false)}
            >
              <item.icon className="size-4 opacity-70" aria-hidden />
              {item.label}
            </button>
          ))}
        </div>
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
      href: c.id === activeId ? undefined : '#',
    }))
  }, [activeId])

  const renderSidebar = (isCollapsed: boolean) => (
    <Sidebar
      collapsed={isCollapsed}
      onCollapsedChange={setCollapsed}
      logo={<RiskOsLogo collapsed={isCollapsed} />}
      footer={<UserMenu collapsed={isCollapsed} />}
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
            <Breadcrumb items={crumbs} />
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
            <Breadcrumb items={crumbs} />
          </div>
          <PagePlaceholder activeId={activeId} />
        </main>
      </div>
    </div>
  )
}

export default AppShell

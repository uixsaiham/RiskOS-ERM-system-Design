import * as React from 'react'
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  Info,
  LogOut,
  Palette,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
  User,
  Workflow,
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export interface NotificationItem {
  id: string
  title: string
  message: string
  severity: 'critical' | 'warning' | 'info' | 'success'
  time: string
  unread: boolean
  routeId: string
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Critical KRI Breach: Liquidity Ratio',
    message: 'Liquidity Coverage Ratio fell to 104.2% (Threshold: 110%). Immediate treasury review required.',
    severity: 'critical',
    time: '5m ago',
    unread: true,
    routeId: 'dashboard-operations',
  },
  {
    id: 'notif-2',
    title: 'P1 Incident Escalated: INC-8821',
    message: 'Payment Gateway Timeout affecting EU region transactions. Incident team engaged.',
    severity: 'critical',
    time: '24m ago',
    unread: true,
    routeId: 'incidents',
  },
  {
    id: 'notif-3',
    title: 'Assessment Review Due: RSK-1042',
    message: 'Third-Party Cloud Data Breach assessment review pending CISO approval before SLA expiry.',
    severity: 'warning',
    time: '1h ago',
    unread: true,
    routeId: 'assess-RSK-1042',
  },
  {
    id: 'notif-4',
    title: 'Control Deficiency Detected: CTRL-SEC-004',
    message: 'MFA enforcement control failed Q3 audit sample verification. CAPA remediation assigned.',
    severity: 'warning',
    time: '3h ago',
    unread: true,
    routeId: 'controls-deficiencies',
  },
  {
    id: 'notif-5',
    title: 'Executive Risk Deck Ready',
    message: 'Q3 Board Risk Summary & capital allocation metrics report is compiled and ready for sign-off.',
    severity: 'info',
    time: 'Yesterday',
    unread: true,
    routeId: 'reports',
  },
]

export function HeaderNotifications({
  onNavigate,
}: {
  onNavigate: (routeId: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'critical'>('all')
  const containerRef = React.useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => n.unread).length

  // Click outside to close
  React.useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const markItemAsRead = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)),
    )
  }

  const handleItemClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
    )
    setOpen(false)
    onNavigate(item.routeId)
  }

  const filteredList = notifications.filter((item) => {
    if (filter === 'unread') return item.unread
    if (filter === 'critical') return item.severity === 'critical'
    return true
  })

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-expanded={open}
        className={cn(
          'relative inline-flex size-8.5 items-center justify-center rounded-lg border transition-all cursor-pointer shadow-2xs',
          open
            ? 'border-blue-300 bg-blue-50/70 text-blue-700 ring-2 ring-blue-500/20'
            : 'border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 hover:border-slate-300',
        )}
      >
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white shadow-xs animate-in zoom-in-75">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notification center"
          className="absolute right-0 top-full mt-2 z-[var(--z-dropdown,300)] w-[360px] sm:w-[420px] rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/15 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-slate-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-700 border border-rose-200/60">
                  {unreadCount} unread
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <CheckCheck className="size-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex border-b border-slate-100 px-3 pt-2 gap-1 bg-white">
            {(
              [
                { id: 'all', label: `All (${notifications.length})` },
                { id: 'unread', label: `Unread (${unreadCount})` },
                {
                  id: 'critical',
                  label: `Critical (${notifications.filter((n) => n.severity === 'critical').length})`,
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer',
                  filter === tab.id
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Items List */}
          <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100/80 p-1.5 scrollbar-thin">
            {filteredList.length === 0 ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto size-8 text-emerald-500 mb-2 opacity-80" />
                <p className="text-xs font-semibold text-slate-700">All caught up!</p>
                <p className="text-[11px] text-slate-400 mt-0.5">No notifications in this filter.</p>
              </div>
            ) : (
              filteredList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    'group flex items-start gap-3 rounded-xl p-3 text-left transition-all cursor-pointer',
                    item.unread ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50',
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.severity === 'critical' ? (
                      <span className="flex size-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                        <ShieldAlert className="size-4" />
                      </span>
                    ) : item.severity === 'warning' ? (
                      <span className="flex size-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                        <ShieldAlert className="size-4" />
                      </span>
                    ) : (
                      <span className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <Info className="size-4" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          'text-xs leading-snug',
                          item.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700',
                        )}
                      >
                        {item.title}
                      </p>
                      {item.unread && (
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>{item.time}</span>
                      <button
                        type="button"
                        onClick={(e) => markItemAsRead(item.id, e)}
                        className="text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {item.unread ? 'Mark read' : 'Mark unread'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-4 py-2.5">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onNavigate('my-work')
              }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              View My Work Queue →
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onNavigate('settings-general')
              }}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function HeaderEnvironmentPopover() {
  const [open, setOpen] = React.useState(false)
  const [currentEnv, setCurrentEnv] = React.useState<'Production' | 'Staging' | 'DR'>('Production')
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Cluster environment health and status"
        className={cn(
          'inline-flex h-8.5 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-all cursor-pointer shadow-2xs',
          open
            ? 'border-slate-300 bg-slate-100 text-slate-900 ring-2 ring-slate-400/20'
            : 'border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300',
        )}
      >
        <span
          className={cn(
            'size-2 rounded-full',
            currentEnv === 'Production'
              ? 'bg-emerald-500 animate-pulse'
              : currentEnv === 'Staging'
              ? 'bg-amber-500'
              : 'bg-blue-500',
          )}
        />
        <span>{currentEnv}</span>
        <ChevronDown className="size-3 text-slate-400 opacity-80" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="System status & environment"
          className="absolute right-0 top-full mt-2 z-[var(--z-dropdown,300)] w-[300px] rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xl shadow-slate-900/15 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5">
              <Server className="size-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">RiskOS Infrastructure</span>
            </div>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60">
              99.99% SLA
            </span>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">Cluster Region:</span>
              <span className="font-medium text-slate-800">AWS us-east-1a (Primary)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">Engine Version:</span>
              <span className="font-mono text-slate-800">v2.4.1-enterprise</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">API Latency:</span>
              <span className="font-medium text-slate-800">38ms (Healthy)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">Compliance Enclave:</span>
              <span className="font-medium text-emerald-700">SOC 2 Type II Verified</span>
            </div>
          </div>

          <div className="mt-3.5 border-t border-slate-100 pt-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Switch Environment (Demo)
            </span>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {(
                [
                  { id: 'Production', label: 'Prod', color: 'emerald' },
                  { id: 'Staging', label: 'Stage', color: 'amber' },
                  { id: 'DR', label: 'DR', color: 'blue' },
                ] as const
              ).map((env) => (
                <button
                  key={env.id}
                  type="button"
                  onClick={() => {
                    setCurrentEnv(env.id)
                    setOpen(false)
                  }}
                  className={cn(
                    'rounded-lg py-1.5 text-center text-xs font-semibold transition-all cursor-pointer border',
                    currentEnv === env.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100',
                  )}
                >
                  {env.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function HeaderUserMenu({
  currentUser,
  onNavigate,
}: {
  currentUser: { name: string; role: string; email: string; org: string }
  onNavigate: (routeId: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="User profile and account settings"
        aria-expanded={open}
        className={cn(
          'inline-flex h-8.5 items-center gap-1.5 rounded-lg border p-1 transition-all cursor-pointer shadow-2xs',
          open
            ? 'border-blue-300 ring-2 ring-blue-500/20 bg-blue-50/50'
            : 'border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300',
        )}
      >
        <div className="relative size-6.5 shrink-0">
          <Avatar name={currentUser.name} size="sm" className="size-6.5 text-[11px]" />
          <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>
        <ChevronDown className="hidden sm:inline-block size-3 text-slate-400 mr-1" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="User account menu"
          className="absolute right-0 top-full mt-2 z-[var(--z-dropdown,300)] w-[260px] rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-2xl shadow-slate-900/15 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="border-b border-slate-100 px-3 py-2.5">
            <p className="text-[13px] font-bold text-slate-900">{currentUser.name}</p>
            <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200/70">
              <ShieldCheck className="size-3" />
              <span>{currentUser.role}</span>
            </div>
          </div>

          <div className="py-1">
            {(
              [
                { id: 'my-work', label: 'My Work & Queue', icon: Workflow, route: 'my-work' },
                { id: 'profile', label: 'Risk Profile & Roles', icon: User, route: 'people' },
                { id: 'audits', label: 'Audit Trail & Activities', icon: ShieldCheck, route: 'audits' },
                { id: 'settings', label: 'Settings & Preferences', icon: Settings, route: 'settings-general' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  onNavigate(item.route)
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <item.icon className="size-4 text-slate-400" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false)
                onNavigate('dashboard')
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="size-4 text-rose-500" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function HeaderDesignSystemButton({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Open Design System Component Showcase (⌥D)"
      className="hidden lg:inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
    >
      <Palette className="size-3.5 text-slate-500" />
      <span>Design system</span>
      <kbd className="ml-0.5 rounded border border-slate-200 bg-slate-50 px-1 py-0.2 font-mono text-[10px] text-slate-400">
        ⌥D
      </kbd>
    </button>
  )
}

import * as React from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip } from './tooltip'

export interface NavChild {
  id: string
  label: string
  href?: string
  badge?: number | string
}

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  badge?: number | string
  children?: NavChild[]
}

export function SidebarNavItem({
  item,
  active,
  activeChildId,
  collapsed,
  expanded,
  onToggle,
  onSelect,
}: {
  item: NavItem
  active?: boolean
  /** When a nested child is the current route */
  activeChildId?: string
  collapsed?: boolean
  expanded?: boolean
  onToggle?: () => void
  onSelect?: (id: string) => void
}) {
  const Icon = item.icon
  const hasChildren = !!item.children?.length
  const childActive = !!activeChildId && item.children?.some((c) => c.id === activeChildId)
  const isExactParentActive = !!active && !childActive

  const button = (
    <button
      type="button"
      onClick={() => {
        onSelect?.(item.id)
        if (hasChildren && !collapsed) {
          if (!expanded) {
            onToggle?.()
          } else if (isExactParentActive) {
            onToggle?.()
          }
        }
      }}
      className={cn(
        'group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 font-body-sm font-medium transition-all duration-150 select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
        collapsed ? 'h-10 w-10 justify-center p-0 mx-auto' : 'h-9 py-1.5',
        isExactParentActive
          ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs border border-blue-200/80'
          : childActive
            ? 'text-slate-900 bg-slate-50 border border-slate-200/60 font-medium'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent',
      )}
      aria-current={isExactParentActive ? 'page' : undefined}
      aria-expanded={hasChildren ? expanded : undefined}
    >
      {/* Active Left Indicator Bar for exact parent active */}
      {!collapsed && isExactParentActive && (
        <span
          className="absolute -left-1 top-2 bottom-2 w-1 rounded-r-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.4)]"
          aria-hidden
        />
      )}

      {/* Primary Icon */}
      <Icon
        className={cn(
          'size-[18px] shrink-0 transition-colors duration-150',
          isExactParentActive
            ? 'text-blue-600'
            : childActive
              ? 'text-blue-600'
              : 'text-slate-500 group-hover:text-slate-700',
        )}
        aria-hidden
      />

      {!collapsed && (
        <>
          <span className="flex-1 truncate text-left text-[13px] tracking-tight">
            {item.label}
          </span>

          {item.badge != null && (
            <span
              className={cn(
                'min-w-[20px] rounded-full px-1.5 py-0.5 text-center text-[10px] font-semibold font-mono tabular-nums leading-none border transition-colors',
                isExactParentActive
                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-slate-100 text-slate-600 group-hover:text-slate-900 border-slate-200/80',
              )}
            >
              {item.badge}
            </span>
          )}

          {hasChildren && (
            <ChevronDown
              className={cn(
                'size-3.5 shrink-0 text-slate-400 transition-transform duration-200 group-hover:text-slate-600',
                expanded && 'rotate-180 text-slate-600',
              )}
              aria-hidden
            />
          )}
        </>
      )}
    </button>
  )

  return (
    <div className={cn(collapsed && 'flex justify-center')}>
      {collapsed ? (
        <Tooltip content={item.label} side="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}

      {/* Nested Submenu Items */}
      {hasChildren && expanded && !collapsed && (
        <div className="mt-1 ml-4 pl-3.5 space-y-0.5 border-l border-slate-200 relative">
          {item.children!.map((child) => {
            const isChildActive = activeChildId === child.id
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => onSelect?.(child.id)}
                className={cn(
                  'group/child flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[12.5px] transition-all duration-150 text-left select-none',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/40',
                  isChildActive
                    ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200/70 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent',
                )}
                aria-current={isChildActive ? 'page' : undefined}
              >
                {/* Micro bullet dot */}
                <span
                  className={cn(
                    'size-1.5 rounded-full shrink-0 transition-all duration-150',
                    isChildActive
                      ? 'bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.5)] scale-110'
                      : 'bg-slate-300 group-hover/child:bg-slate-400',
                  )}
                  aria-hidden
                />

                <span className="flex-1 truncate">{child.label}</span>

                {child.badge != null && (
                  <span
                    className={cn(
                      'text-[10px] font-mono px-1.5 py-0.2 rounded tabular-nums border',
                      isChildActive
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-500 group-hover/child:text-slate-700 border-slate-200/60',
                    )}
                  >
                    {child.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Alias used by showcase and app shell */
export const NavItemButton = SidebarNavItem

export function NavSection({
  label,
  collapsed,
  children,
  className,
}: {
  label?: string
  collapsed?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && !collapsed && (
        <div className="px-2.5 pt-3 pb-1">
          <p className="font-mono text-[10px] font-semibold tracking-wider uppercase text-slate-400">
            {label}
          </p>
        </div>
      )}
      {collapsed && label && (
        <div
          className="mx-auto my-2.5 h-px w-5 bg-slate-200"
          aria-hidden
        />
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

export function Sidebar({
  collapsed,
  onCollapsedChange,
  logo,
  children,
  footer,
  className,
}: {
  collapsed?: boolean
  onCollapsedChange?: (v: boolean) => void
  logo?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        'relative flex h-full flex-col bg-white text-slate-700 border-r border-slate-200 transition-[width] duration-200 ease-in-out select-none shadow-xs',
        collapsed ? 'w-[68px]' : 'w-64',
        className,
      )}
      data-collapsed={collapsed || undefined}
    >
      {/* Sidebar Header / Brand */}
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-slate-200',
          collapsed ? 'justify-center px-2' : 'px-3.5',
        )}
      >
        {logo}
      </div>

      {/* Navigation Body */}
      <nav
        className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
        aria-label="Primary"
      >
        {children}
      </nav>

      {/* Sidebar Footer */}
      {footer && (
        <div
          className={cn(
            'shrink-0 border-t border-slate-200 p-2.5 bg-white',
            collapsed && 'flex justify-center p-2',
          )}
        >
          {footer}
        </div>
      )}

      {onCollapsedChange && (
        <button
          type="button"
          className="sr-only"
          onClick={() => onCollapsedChange(!collapsed)}
        >
          Toggle sidebar
        </button>
      )}
    </aside>
  )
}

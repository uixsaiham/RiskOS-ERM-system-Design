import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

const widthMap = {
  sm: 'max-w-[360px]',
  md: 'max-w-[480px]',
  lg: 'max-w-[640px]',
}

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: keyof typeof widthMap
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Drawer({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  className,
}: DrawerProps) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex justify-end">
      <div
        className="absolute inset-0 bg-[var(--color-surface-overlay)]"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={cn(
          'relative z-10 flex h-full w-full flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xl)]',
          widthMap[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] px-5 py-4">
          <div>
            {title && (
              <h2 id="drawer-title" className="font-h3 text-[var(--color-text-primary)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 font-body-md text-[var(--color-text-muted)]">{description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
            <X />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

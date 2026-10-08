import * as React from 'react'
import {
  Search as SearchIcon,
  Clock,
  FileWarning,
  Shield,
  Users,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchResult {
  id: string
  title: string
  category: string
  subtitle?: string
}

const categoryIcons: Record<string, React.ElementType> = {
  Risks: FileWarning,
  Controls: Shield,
  Users: Users,
  default: SearchIcon,
}

export interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
}

export function SearchCommand({
  open,
  onOpenChange,
  placeholder = 'Search risks, controls, actions…',
}: SearchCommandProps) {
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClose = React.useCallback(() => {
    setQuery('')
    onOpenChange(false)
  }, [onOpenChange])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
  }, [open, handleClose])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  const recent = ['Vendor concentration risk', 'SOC 2 controls', 'Q3 action plans']
  const results: SearchResult[] =
    query.length > 1
      ? [
          {
            id: '1',
            title: 'Data breach — third party processor',
            category: 'Risks',
            subtitle: 'RSK-1042 · High',
          },
          {
            id: '2',
            title: 'Access control review',
            category: 'Controls',
            subtitle: 'CTL-221 · Effective',
          },
          {
            id: '3',
            title: 'Sarah Chen',
            category: 'Users',
            subtitle: 'Risk Owner · Operations',
          },
        ].filter(
          (r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.category.toLowerCase().includes(query.toLowerCase()),
        )
      : []

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-[12vh] px-4">
      <div
        className="absolute inset-0 bg-[var(--color-surface-overlay)]"
        onClick={handleClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-label="Global search"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-xl)]"
      >
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4">
          <SearchIcon className="size-5 text-[var(--color-text-muted)]" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-12 flex-1 bg-transparent font-body-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none"
            aria-autocomplete="list"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              aria-label="Clear"
            >
              <X className="size-4" />
            </button>
          )}
          <kbd className="font-caption text-[var(--color-text-muted)]">ESC</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
          {!query && (
            <div className="px-2 py-2">
              <div className="px-2 pb-1.5 font-overline text-[var(--color-text-muted)]">
                Recent
              </div>
              {recent.map((r) => (
                <button
                  key={r}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-[var(--color-surface-secondary)]"
                  onClick={() => setQuery(r)}
                >
                  <Clock className="size-4 text-[var(--color-text-muted)]" />
                  <span className="font-body-md text-[var(--color-text-primary)]">{r}</span>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <div className="font-label text-[var(--color-text-primary)]">No results</div>
              <p className="mt-1 font-body-sm text-[var(--color-text-muted)]">
                No matches for “{query}”. Try another term.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div>
              {['Risks', 'Controls', 'Users'].map((cat) => {
                const items = results.filter((r) => r.category === cat)
                if (!items.length) return null
                const Icon = categoryIcons[cat] || categoryIcons.default
                return (
                  <div key={cat} className="mb-1">
                    <div className="px-2 py-1.5 font-overline text-[var(--color-text-muted)]">
                      {cat}
                    </div>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-[var(--color-surface-secondary)]"
                        onClick={handleClose}
                      >
                        <Icon className="size-4 text-[var(--color-text-muted)]" />
                        <div className="min-w-0 flex-1">
                          <div className="font-body-md text-[var(--color-text-primary)] truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="font-caption text-[var(--color-text-muted)]">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-[var(--color-border)] px-4 py-2 font-caption text-[var(--color-text-muted)]">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  )
}

export function GlobalSearch({
  className,
  placeholder = 'Search risks, controls, actions…',
}: {
  className?: string
  placeholder?: string
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-left shadow-[var(--shadow-xs)] transition-colors',
          'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-secondary)]',
          'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
          className,
        )}
      >
        <SearchIcon className="size-4 text-[var(--color-text-muted)]" aria-hidden />
        <span className="flex-1 truncate font-body-md text-[var(--color-text-muted)]">
          {placeholder}
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-1.5 py-0.5 font-caption text-[var(--color-text-muted)]">
          ⌘K
        </kbd>
      </button>

      <SearchCommand open={open} onOpenChange={setOpen} placeholder={placeholder} />
    </>
  )
}

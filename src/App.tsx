import { useState, lazy, Suspense } from 'react'
import { AppShell } from '@/navigation'

const DesignSystemShowcase = lazy(() => import('./design-system/Showcase'))

type AppView = 'shell' | 'showcase'

function App() {
  const [view, setView] = useState<AppView>('shell')

  if (view === 'showcase') {
    return (
      <div className="relative min-h-dvh">
        <div className="sticky top-0 z-[var(--z-overlay,300)] flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-4 py-2 backdrop-blur">
          <p className="font-caption text-[var(--color-text-muted)]">
            Design system showcase · Step 01
          </p>
          <button
            type="button"
            className="rounded-md bg-[var(--color-primary)] px-3 py-1.5 font-button text-[var(--color-primary-foreground)] hover:opacity-90 cursor-pointer"
            onClick={() => setView('shell')}
          >
            Open navigation shell
          </button>
        </div>
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center p-8 text-sm text-slate-500">
              Loading design system showcase…
            </div>
          }
        >
          <DesignSystemShowcase />
        </Suspense>
      </div>
    )
  }

  return <AppShell onOpenShowcase={() => setView('showcase')} />
}

export default App

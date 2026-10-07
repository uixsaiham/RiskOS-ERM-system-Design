import * as React from 'react'
import { cn } from '@/lib/utils'

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, disabled, ...props }, ref) => {
    const inputId = id || React.useId()
    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-center gap-2 cursor-pointer select-none',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <span className="relative inline-flex size-4 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            className="peer absolute inset-0 size-4 cursor-pointer appearance-none rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] transition-colors checked:border-[var(--color-primary)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed"
            {...props}
          />
          <span className="pointer-events-none absolute inset-[4px] rounded-full bg-[var(--color-primary)] opacity-0 peer-checked:opacity-100" />
        </span>
        {label && (
          <span className="font-body-md text-[var(--color-text-primary)]">{label}</span>
        )}
      </label>
    )
  },
)
Radio.displayName = 'Radio'

export function RadioGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { 'aria-label'?: string }) {
  return (
    <div role="radiogroup" className={cn('flex flex-col gap-2', className)} {...props}>
      {children}
    </div>
  )
}

import * as React from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, label, id, checked, disabled, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current!)

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate
      }
    }, [indeterminate])

    const generatedId = React.useId()
    const inputId = id || generatedId

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
            ref={inputRef}
            id={inputId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer absolute inset-0 size-4 cursor-pointer appearance-none rounded-[3px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] transition-colors checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed"
            {...props}
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100">
            {indeterminate ? (
              <Minus className="size-3" strokeWidth={3} />
            ) : (
              <Check className="size-3" strokeWidth={3} />
            )}
          </span>
        </span>
        {label && (
          <span className="font-body-md text-[var(--color-text-primary)]">{label}</span>
        )}
      </label>
    )
  },
)
Checkbox.displayName = 'Checkbox'

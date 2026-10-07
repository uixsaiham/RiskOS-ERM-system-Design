import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-caption font-medium whitespace-nowrap border',
  {
    variants: {
      variant: {
        neutral:
          'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
        primary:
          'bg-[var(--color-primary-subtle)] text-[var(--color-primary)] border-[var(--color-primary-muted)]',
        success:
          'bg-[var(--color-success-subtle)] text-[var(--color-success)] border-[var(--color-success-border)]',
        warning:
          'bg-[var(--color-warning-subtle)] text-[var(--color-warning)] border-[var(--color-warning-border)]',
        error:
          'bg-[var(--color-error-subtle)] text-[var(--color-error)] border-[var(--color-error-border)]',
        info: 'bg-[var(--color-info-subtle)] text-[var(--color-info)] border-[var(--color-info-border)]',
        outline:
          'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-strong)]',
      },
      size: {
        sm: 'px-1.5 py-0 text-[11px]',
        md: 'px-2 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { badgeVariants }

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap border',
  {
    variants: {
      variant: {
        neutral:
          'bg-slate-100 text-slate-700 border-slate-200/80',
        primary:
          'bg-blue-50 text-blue-700 border-blue-200/80',
        success:
          'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        warning:
          'bg-amber-50 text-amber-700 border-amber-200/80',
        error:
          'bg-rose-50 text-rose-700 border-rose-200/80',
        info:
          'bg-sky-50 text-sky-700 border-sky-200/80',
        outline:
          'bg-transparent text-slate-600 border-slate-200',
      },
      size: {
        sm: 'px-1.5 py-0 text-[11px]',
        md: 'px-2 py-0.5 text-xs',
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

import * as React from 'react'
import {
  FileText,
  SlidersHorizontal,
  ShieldCheck,
  Scale,
  FileCheck2,
  Check,
} from 'lucide-react'

export type AssessmentStepIndex = 1 | 2 | 3 | 4 | 5

interface StepDefinition {
  step: AssessmentStepIndex
  title: string
  subtitle: string
  icon: React.ReactNode
}

const STEPS: StepDefinition[] = [
  {
    step: 1,
    title: 'Assessment Details',
    subtitle: 'Scope, period & owner',
    icon: <FileText className="size-4" />,
  },
  {
    step: 2,
    title: 'Likelihood & Impact',
    subtitle: 'Inherent risk evaluation',
    icon: <SlidersHorizontal className="size-4" />,
  },
  {
    step: 3,
    title: 'Control Effectiveness',
    subtitle: 'Validate control health',
    icon: <ShieldCheck className="size-4" />,
  },
  {
    step: 4,
    title: 'Residual Risk',
    subtitle: 'Net score & appetite',
    icon: <Scale className="size-4" />,
  },
  {
    step: 5,
    title: 'Review & Submit',
    subtitle: 'Validation & approval',
    icon: <FileCheck2 className="size-4" />,
  },
]

interface AssessmentStepperProps {
  currentStep: AssessmentStepIndex
  onSelectStep: (step: AssessmentStepIndex) => void
  completedSteps: Set<AssessmentStepIndex>
}

export function AssessmentStepper({
  currentStep,
  onSelectStep,
  completedSteps,
}: AssessmentStepperProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
      <nav aria-label="Assessment Progress" className="overflow-x-auto scrollbar-none">
        <ol className="flex items-center min-w-[700px] justify-between">
          {STEPS.map((s, index) => {
            const isCurrent = currentStep === s.step
            const isCompleted = completedSteps.has(s.step)

            return (
              <li key={s.step} className="flex-1 flex items-center">
                <button
                  type="button"
                  onClick={() => onSelectStep(s.step)}
                  className={`group flex items-center gap-3 text-left w-full p-2 rounded-xl transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-50/60 ring-1 ring-blue-600/30'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Step indicator circle */}
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-600/20'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="size-4 stroke-[2.5]" />
                    ) : (
                      <span>{s.step}</span>
                    )}
                  </div>

                  {/* Step labels */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold truncate leading-tight ${
                        isCurrent
                          ? 'text-blue-700'
                          : isCompleted
                          ? 'text-slate-900'
                          : 'text-slate-600'
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>
                </button>

                {/* Connector line between steps */}
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-6 shrink-0 mx-1.5 transition-colors ${
                      completedSteps.has(s.step)
                        ? 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}

import {
  ArrowLeft,
  Save,
  Clock,
  User,
  History,
  FileCheck2,
  XCircle,
} from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import type { RiskAssessmentFormData } from '../risk-assessment-data'

interface AssessmentHeaderProps {
  data: RiskAssessmentFormData
  onBackToRisk: () => void
  onSaveDraft: () => void
  onCancel: () => void
  onSubmitForReview: () => void
  onOpenHistory: () => void
  isSubmitting?: boolean
}

export function AssessmentHeader({
  data,
  onBackToRisk,
  onSaveDraft,
  onCancel,
  onSubmitForReview,
  onOpenHistory,
  isSubmitting = false,
}: AssessmentHeaderProps) {
  const getStatusBadge = () => {
    switch (data.status) {
      case 'pending_review':
        return <Badge variant="warning" size="sm">Pending Review</Badge>
      case 'approved':
        return <Badge variant="success" size="sm">Approved</Badge>
      case 'draft':
        return <Badge variant="neutral" size="sm">Draft</Badge>
      case 'in_progress':
      default:
        return <Badge variant="neutral" size="sm">In Progress</Badge>
    }
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
      {/* ── Top Breadcrumbs & Actions Row ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb trace */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToRisk}
            className="text-slate-500 hover:text-slate-900 -ml-1 gap-1.5 h-7 px-2"
          >
            <ArrowLeft className="size-3.5" />
            <span>Risk Register</span>
          </Button>

          <span className="text-slate-300 select-none">/</span>
          <span className="font-medium text-slate-500">Risk Management</span>

          <span className="text-slate-300 select-none">/</span>
          <button
            type="button"
            onClick={onBackToRisk}
            className="font-mono font-semibold text-slate-700 hover:text-blue-600 hover:underline cursor-pointer"
          >
            {data.riskId}
          </button>

          <span className="text-slate-300 select-none">/</span>
          <span className="font-semibold text-slate-900">
            Assessment
          </span>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="View Previous Assessments"
          >
            <History className="size-3.5 text-slate-400" />
            <span className="hidden sm:inline">Assessment History</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <XCircle className="size-3.5" />
            <span>Cancel</span>
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="size-3.5 text-slate-400" />
            <span>Save Draft</span>
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={onSubmitForReview}
            loading={isSubmitting}
            className="gap-1.5 h-8 text-xs font-medium shadow-xs bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-3.5 cursor-pointer"
          >
            <FileCheck2 className="size-3.5" />
            <span>Submit for Review</span>
          </Button>
        </div>
      </div>

      {/* ── Title, Subtitle, and Target Risk Identification Strip ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-t border-slate-100 pt-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Risk Assessment Workspace
            </h1>
            {getStatusBadge()}
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Evaluate inherent risk exposure, assess control design and operating effectiveness, and determine residual exposure.
          </p>
        </div>

        {/* Risk Metadata Card */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-2 text-xs">
          <div className="space-y-0.5">
            <span className="text-[11px] font-medium text-slate-400">
              Target risk
            </span>
            <div className="flex items-center gap-1.5 font-medium text-slate-900">
              <span className="font-mono text-blue-600 font-semibold">{data.riskId}</span>
              <span className="text-slate-300">·</span>
              <span>{data.riskTitle}</span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="space-y-0.5">
            <span className="text-[11px] font-medium text-slate-400">
              Lead assessor
            </span>
            <div className="flex items-center gap-1 text-slate-800 font-medium">
              <User className="size-3 text-slate-400" />
              <span>{data.owner}</span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="space-y-0.5">
            <span className="text-[11px] font-medium text-slate-400">
              Last saved
            </span>
            <div className="flex items-center gap-1 text-slate-600 font-mono text-[11px]">
              <Clock className="size-3 text-slate-400" />
              <span>{data.lastSaved}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

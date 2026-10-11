import { useState } from 'react'
import {
  ArrowLeft,
  Copy,
  Check,
  Edit3,
  Play,
  MoreVertical,
  CopyPlus,
  UserCheck,
  RefreshCw,
  Archive,
  History,
  Building2,
  FolderTree,
} from 'lucide-react'
import { Button, StatusBadge } from '@/components/ui'
import type { ComprehensiveRiskDetail } from '../risk-details-data'

interface RiskDetailsHeaderProps {
  detail: ComprehensiveRiskDetail
  onBack: () => void
  onOpenEdit: () => void
  onStartAssessment: () => void
  onDuplicateRisk: () => void
  onChangeOwner: () => void
  onChangeStatus: () => void
  onArchiveRisk: () => void
  onViewAuditHistory: () => void
}

export function RiskDetailsHeader({
  detail,
  onBack,
  onOpenEdit,
  onStartAssessment,
  onDuplicateRisk,
  onChangeOwner,
  onChangeStatus,
  onArchiveRisk,
  onViewAuditHistory,
}: RiskDetailsHeaderProps) {
  const [copied, setCopied] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const { base } = detail

  const handleCopyId = () => {
    navigator.clipboard?.writeText(base.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3.5">
      {/* Top breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb trace */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] -ml-1 gap-1.5 h-7 px-2"
          >
            <ArrowLeft className="size-3.5" />
            <span>Risk Register</span>
          </Button>

          <span className="text-[var(--color-border)] select-none">/</span>

          <span className="font-medium text-[var(--color-text-muted)]">Risk Management</span>

          <span className="text-[var(--color-border)] select-none">/</span>

          <span className="font-semibold text-[var(--color-text-primary)] font-mono">
            {base.id}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenEdit}
            className="gap-1.5 h-8 text-xs font-semibold"
          >
            <Edit3 className="size-3.5" />
            <span>Edit Risk</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onStartAssessment}
            className="gap-1.5 h-8 text-xs font-semibold shadow-xs"
          >
            <Play className="size-3.5" />
            <span>Start Assessment</span>
          </Button>

          {/* More Actions dropdown menu */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="px-2 h-8"
              title="More Actions"
            >
              <MoreVertical className="size-4" />
            </Button>

            {moreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 shadow-xl z-50 text-xs">
                  <div className="px-3 py-1 font-semibold text-[var(--color-text-muted)] uppercase tracking-wider text-[10px]">
                    Risk Operations
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false)
                      onDuplicateRisk()
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                  >
                    <CopyPlus className="size-3.5 text-[var(--color-text-muted)]" />
                    <span>Duplicate Risk</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false)
                      onChangeOwner()
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                  >
                    <UserCheck className="size-3.5 text-[var(--color-text-muted)]" />
                    <span>Change Owner</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false)
                      onChangeStatus()
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                  >
                    <RefreshCw className="size-3.5 text-[var(--color-text-muted)]" />
                    <span>Change Status</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false)
                      onViewAuditHistory()
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
                  >
                    <History className="size-3.5 text-[var(--color-text-muted)]" />
                    <span>View Audit History</span>
                  </button>

                  <div className="border-t border-[var(--color-border)] my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false)
                      onArchiveRisk()
                    }}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <Archive className="size-3.5" />
                    <span>Archive Risk</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Title & Status Row */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {/* Risk ID with Copy */}
            <div className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-primary)]/20 bg-[var(--color-primary-subtle)]/30 px-2 py-0.5 text-xs">
              <span className="font-mono font-bold text-[var(--color-primary)]">{base.id}</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="text-[var(--color-primary)]/70 hover:text-[var(--color-primary)] transition-colors"
                title="Copy Risk ID"
              >
                {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
              </button>
            </div>

            <StatusBadge status={base.status} size="sm" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 leading-tight">
            {base.title}
          </h1>
        </div>
      </div>

      {/* Supporting Metadata Subheader */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--color-border)] pt-2.5 text-xs text-[var(--color-text-secondary)]">
        <div className="flex items-center gap-1.5">
          <span className="font-mono font-bold text-[var(--color-text-primary)]">{base.id}</span>
        </div>

        <span className="text-[var(--color-border)] select-none">•</span>

        <div className="flex items-center gap-1.5">
          <FolderTree className="size-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text-primary)]">{base.category}</span>
        </div>

        <span className="text-[var(--color-border)] select-none">•</span>

        <div className="flex items-center gap-1.5">
          <Building2 className="size-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text-primary)]">{base.department} Department</span>
        </div>

        <span className="text-[var(--color-border)] select-none">•</span>

        <div>
          <span className="text-[var(--color-text-muted)]">Created: </span>
          <span className="font-medium text-[var(--color-text-primary)]">{base.createdDate}</span>
        </div>

        <span className="text-[var(--color-border)] select-none">•</span>

        <div>
          <span className="text-[var(--color-text-muted)]">Last Updated: </span>
          <span className="font-medium text-[var(--color-text-primary)]">{detail.overviewDetails.lastUpdated}</span>
        </div>
      </div>
    </div>
  )
}

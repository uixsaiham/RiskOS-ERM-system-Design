import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress, Spinner } from '@/components/ui/progress'
import { FileText, Download, CheckCircle2, Shield, Presentation } from 'lucide-react'

interface BoardPackModalProps {
  open: boolean
  onClose: () => void
  onExportSuccess?: (format: string) => void
}

export function BoardPackModal({ open, onClose, onExportSuccess }: BoardPackModalProps) {
  const [format, setFormat] = React.useState<'pdf' | 'pptx'>('pdf')
  const [sections, setSections] = React.useState({
    executiveSummary: true,
    matrix: true,
    kris: true,
    topRisks: true,
    actionsTimeline: true,
  })
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generationProgress, setGenerationProgress] = React.useState(0)
  const [isDone, setIsDone] = React.useState(false)

  const handleStartExport = () => {
    setIsGenerating(true)
    setGenerationProgress(15)

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          setTimeout(() => {
            setIsGenerating(false)
            setIsDone(true)
            onExportSuccess?.(format.toUpperCase())
          }, 300)
          return 100
        }
        return prev + 25
      })
    }, 200)
  }

  const handleReset = () => {
    setIsGenerating(false)
    setGenerationProgress(0)
    setIsDone(false)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleReset}
      title="Generate Board Risk Committee Pack"
      description="Compile confidential executive briefing document for Q1 Risk Governance Committee"
      size="md"
      footer={
        <div className="flex w-full items-center justify-between gap-2">
          <Button variant="secondary" onClick={handleReset} disabled={isGenerating}>
            {isDone ? 'Close' : 'Cancel'}
          </Button>

          {isDone ? (
            <Button
              variant="primary"
              onClick={() => {
                alert(`Downloaded: RiskOS_Q1_2026_Board_Pack.${format}`)
                handleReset()
              }}
            >
              <Download className="size-4 mr-1.5" />
              Download Document (.${format})
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled={isGenerating}
              onClick={handleStartExport}
            >
              {isGenerating ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Compiling Report…
                </>
              ) : (
                <>
                  <FileText className="size-4 mr-1.5" />
                  Generate {format.toUpperCase()} Pack
                </>
              )}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-4">
        {isGenerating || isDone ? (
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5 text-center space-y-4">
            {isDone ? (
              <>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--color-success-subtle)] text-[var(--color-success)]">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <h3 className="font-h3 text-[var(--color-text-primary)]">
                    Board Pack Compiled Successfully
                  </h3>
                  <p className="mt-1 font-body-sm text-[var(--color-text-secondary)]">
                    Ready for distribution · 24 pages · Confidential classification
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)]">
                  <FileText className="size-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-h3 text-[var(--color-text-primary)]">
                    Generating Governance Artifacts
                  </h3>
                  <p className="mt-1 font-body-sm text-[var(--color-text-secondary)]">
                    Aggregating residual matrices, KRI telemetry, and audit trail…
                  </p>
                </div>
                <div className="mx-auto max-w-xs space-y-1">
                  <Progress value={generationProgress} size="md" />
                  <span className="font-caption tabular-nums text-[var(--color-text-muted)]">
                    {generationProgress}% complete
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Format selection */}
            <div>
              <p className="font-caption font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Output Format
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    format === 'pdf'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/40 ring-1 ring-[var(--color-primary)]'
                      : 'border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]'
                  }`}
                >
                  <FileText className="size-5 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <p className="font-label text-[var(--color-text-primary)]">Executive PDF</p>
                    <p className="font-caption text-[var(--color-text-muted)]">
                      Print-ready memo format
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('pptx')}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    format === 'pptx'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/40 ring-1 ring-[var(--color-primary)]'
                      : 'border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]'
                  }`}
                >
                  <Presentation className="size-5 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <p className="font-label text-[var(--color-text-primary)]">Slides (PPTX)</p>
                    <p className="font-caption text-[var(--color-text-muted)]">
                      16:9 Committee deck
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Included sections */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 space-y-3">
              <p className="font-caption font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Sections to Include
              </p>

              <div className="space-y-2">
                <Checkbox
                  id="sec-exec"
                  checked={sections.executiveSummary}
                  onChange={(e) =>
                    setSections((s) => ({ ...s, executiveSummary: e.target.checked }))
                  }
                  label="Executive Risk Posture & Appetite Breach Summary"
                />
                <Checkbox
                  id="sec-matrix"
                  checked={sections.matrix}
                  onChange={(e) =>
                    setSections((s) => ({ ...s, matrix: e.target.checked }))
                  }
                  label="5×5 Portfolio Inherent vs Residual Heatmap Matrix"
                />
                <Checkbox
                  id="sec-kris"
                  checked={sections.kris}
                  onChange={(e) =>
                    setSections((s) => ({ ...s, kris: e.target.checked }))
                  }
                  label="Key Risk Indicators (KRIs) Threshold Velocity Scorecard"
                />
                <Checkbox
                  id="sec-top"
                  checked={sections.topRisks}
                  onChange={(e) =>
                    setSections((s) => ({ ...s, topRisks: e.target.checked }))
                  }
                  label="Top Critical Escalated Risks Deep Dive (RSK-1042, etc.)"
                />
                <Checkbox
                  id="sec-act"
                  checked={sections.actionsTimeline}
                  onChange={(e) =>
                    setSections((s) => ({ ...s, actionsTimeline: e.target.checked }))
                  }
                  label="Overdue Remediation Action Accountability Trail"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-[var(--color-surface-secondary)] p-2.5 text-xs text-[var(--color-text-muted)]">
              <Shield className="size-4 text-[var(--color-text-secondary)] shrink-0" />
              <span>
                Pack includes cryptographic audit timestamp and watermark for <strong>Saiham Hossain</strong>.
              </span>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

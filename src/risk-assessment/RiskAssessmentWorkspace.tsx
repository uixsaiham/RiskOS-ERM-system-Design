import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import {
  getInitialAssessmentData,
  type RiskAssessmentFormData,
} from './risk-assessment-data'
import { AssessmentHeader } from './components/AssessmentHeader'
import { AssessmentStepper, type AssessmentStepIndex } from './components/AssessmentStepper'
import { Step1Details } from './components/Step1Details'
import { Step2LikelihoodImpact } from './components/Step2LikelihoodImpact'
import { Step3ControlEffectiveness } from './components/Step3ControlEffectiveness'
import { Step4ResidualRisk } from './components/Step4ResidualRisk'
import { Step5ReviewSubmit } from './components/Step5ReviewSubmit'
import { AssessmentHistoryModal } from './components/AssessmentHistoryModal'
import { SubmitConfirmModal } from './components/SubmitConfirmModal'
import { DiscardConfirmModal } from './components/DiscardConfirmModal'

interface RiskAssessmentWorkspaceProps {
  riskId?: string
  onNavigate?: (routeId: string) => void
}

export function RiskAssessmentWorkspace({
  riskId = 'RSK-1042',
  onNavigate,
}: RiskAssessmentWorkspaceProps) {
  // Initialize state with rich defaults for RSK-1042
  const [data, setData] = useState<RiskAssessmentFormData>(() => {
    const initial = getInitialAssessmentData()
    if (riskId && riskId !== 'RSK-1042') {
      return { ...initial, riskId }
    }
    return initial
  })

  const [currentStep, setCurrentStep] = useState<AssessmentStepIndex>(1)
  const [completedSteps, setCompletedSteps] = useState<Set<AssessmentStepIndex>>(
    () => new Set([1])
  )

  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [discardModalOpen, setDiscardModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleDataChange = (fields: Partial<RiskAssessmentFormData>) => {
    setData((prev) => ({
      ...prev,
      ...fields,
      lastSaved: 'Unsaved edits',
    }))
  }

  const handleSaveDraft = () => {
    const timestamp = `Today at ${new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })}`
    setData((prev) => ({
      ...prev,
      lastSaved: timestamp,
    }))
    showToast(`Assessment draft saved (${timestamp}).`)
  }

  const handleCancel = () => {
    setDiscardModalOpen(true)
  }

  const handleConfirmDiscard = () => {
    setDiscardModalOpen(false)
    onNavigate?.(`risk-${data.riskId}`)
  }

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as AssessmentStepIndex)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as AssessmentStepIndex)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSelectStep = (step: AssessmentStepIndex) => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmitForReviewTrigger = () => {
    if (currentStep !== 5) {
      // Jump to step 5 review summary first
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
      setCurrentStep(5)
      showToast('Navigated to final review step. Validate checklist before submission.')
    } else {
      setSubmitModalOpen(true)
    }
  }

  const handleConfirmSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitModalOpen(false)
      const nowStr = new Date().toISOString()
      setData((prev) => ({
        ...prev,
        status: 'pending_review',
        submittedAt: nowStr,
        lastSaved: 'Submitted for Review',
      }))
      showToast(`Assessment submitted for review to ${data.reviewer}.`)
    }, 600)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 shadow-xl text-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. Page Header (Section 3) ── */}
      <AssessmentHeader
        data={data}
        onBackToRisk={() => onNavigate?.(`risk-${data.riskId}`)}
        onSaveDraft={handleSaveDraft}
        onCancel={handleCancel}
        onSubmitForReview={handleSubmitForReviewTrigger}
        onOpenHistory={() => setHistoryModalOpen(true)}
        isSubmitting={isSubmitting}
      />

      {/* ── 2. Assessment Progress Stepper (Section 4) ── */}
      <AssessmentStepper
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        completedSteps={completedSteps}
      />

      {/* ── 3. Step Views ── */}
      <div>
        {currentStep === 1 && (
          <Step1Details
            data={data}
            onChange={handleDataChange}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 2 && (
          <Step2LikelihoodImpact
            data={data}
            onChange={handleDataChange}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 3 && (
          <Step3ControlEffectiveness
            data={data}
            onChange={handleDataChange}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 4 && (
          <Step4ResidualRisk
            data={data}
            onChange={handleDataChange}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}

        {currentStep === 5 && (
          <Step5ReviewSubmit
            data={data}
            onPrev={handlePrevStep}
            onSaveDraft={handleSaveDraft}
            onSubmitForReview={handleSubmitForReviewTrigger}
            onNavigateToRisk={(id) => onNavigate?.(id ? `risk-${id}` : 'risks')}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* ── Modals & Dialogs ── */}
      <AssessmentHistoryModal
        open={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        currentData={data}
      />

      <SubmitConfirmModal
        open={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        data={data}
        isSubmitting={isSubmitting}
      />

      <DiscardConfirmModal
        open={discardModalOpen}
        onClose={() => setDiscardModalOpen(false)}
        onConfirm={handleConfirmDiscard}
      />
    </div>
  )
}


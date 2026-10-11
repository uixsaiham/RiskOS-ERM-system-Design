import { useState } from 'react'
import {
  X,
  Trash2,
  Search,
  Shield,
} from 'lucide-react'
import { Button, RiskSeverityBadge } from '@/components/ui'
import { ENTERPRISE_RISK_REGISTER } from '@/risk-register'
import {
  type ControlItem,
  type ControlType,
  type ControlCategory,
  type ImplementationStatus,
  type ControlMethod,
  type ControlFrequency,
  type ControlEffectiveness,
  CONTROL_TAXONOMY,
} from '../controls-data'

interface CreateEditControlModalProps {
  open: boolean
  onClose: () => void
  onSave: (control: ControlItem) => void
  initialControl?: ControlItem | null
  existingControlCount: number
}

export function CreateEditControlModal({
  open,
  onClose,
  onSave,
  initialControl,
  existingControlCount,
}: CreateEditControlModalProps) {
  const isEditing = Boolean(initialControl)

  // Auto-generate ID if creating new
  const defaultId = initialControl?.id || `CTL-${String(existingControlCount + 1).padStart(3, '0')}`

  // Form State
  const [formData, setFormData] = useState<Partial<ControlItem>>(() => {
    if (initialControl) return { ...initialControl }
    return {
      id: defaultId,
      name: '',
      description: '',
      objective: '',
      type: 'Preventive',
      category: 'Access Management',
      framework: 'ISO 27001:2022',
      owner: 'James Wilson',
      ownerRole: 'Head of IT',
      ownerEmail: 'j.wilson@riskos.example',
      department: 'IT',
      supportingTeam: 'IT Security & Assurance',
      reviewer: 'Priya Nair, Head of Operational Risk',
      implementationStatus: 'Implemented',
      method: 'Automated',
      frequency: 'Continuous',
      effectiveness: 'Effective',
      linkedRiskIds: ['RSK-1042'],
      implementationDate: 'Oct 11, 2026',
      lastReviewed: 'Oct 11, 2026',
      nextReviewDate: 'Nov 30, 2026',
      lastEffectivenessAssessment: 'Oct 11, 2026',
      procedureReference: 'SOP-CTL-001: Standard Operational Procedure',
      evidenceRequirements: 'Periodic operational logs and configuration telemetry.',
      instructions: 'Execute control according to formal procedure.',
      notes: '',
      createdDate: 'Oct 11, 2026',
      isArchived: false,
      activityHistory: [],
    }
  })

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'basic' | 'ownership' | 'implementation' | 'risks' | 'docs'>('basic')
  const [riskSearchQuery, setRiskSearchQuery] = useState('')
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false)

  if (!open) return null

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name?.trim()) newErrors.name = 'Control name is required.'
    if (!formData.description?.trim()) newErrors.description = 'Control description is required.'
    if (!formData.owner?.trim()) newErrors.owner = 'Control owner is required.'
    if (!formData.department?.trim()) newErrors.department = 'Department is required.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) {
      // Switch to first tab with error
      if (errors.name || errors.description) setActiveTab('basic')
      else if (errors.owner || errors.department) setActiveTab('ownership')
      return
    }

    const finalControl: ControlItem = {
      ...(formData as ControlItem),
      id: formData.id || defaultId,
      activityHistory: initialControl?.activityHistory
        ? [
            {
              id: `act-edit-${Date.now()}`,
              date: 'Oct 11, 2026',
              action: isEditing ? 'Control Updated' : 'Control Created',
              user: 'Priya Nair',
              details: isEditing
                ? 'Control attributes updated via management workspace.'
                : 'Initial control record created and activated.',
            },
            ...initialControl.activityHistory,
          ]
        : [
            {
              id: `act-init-${Date.now()}`,
              date: 'Oct 11, 2026',
              action: 'Control Created',
              user: 'Priya Nair',
              details: 'Control initialized and registered in enterprise library.',
            },
          ],
    }

    onSave(finalControl)
    onClose()
  }

  const handleLinkRisk = (riskId: string) => {
    const current = formData.linkedRiskIds || []
    if (!current.includes(riskId)) {
      setFormData((prev) => ({
        ...prev,
        linkedRiskIds: [...current, riskId],
      }))
    }
    setRiskSearchQuery('')
  }

  const handleUnlinkRisk = (riskId: string) => {
    setFormData((prev) => ({
      ...prev,
      linkedRiskIds: (prev.linkedRiskIds || []).filter((id) => id !== riskId),
    }))
  }

  // Filter available risks for linking
  const availableRisksToLink = ENTERPRISE_RISK_REGISTER.filter((r) => {
    const alreadyLinked = (formData.linkedRiskIds || []).includes(r.id)
    if (alreadyLinked) return false
    if (!riskSearchQuery.trim()) return true
    const q = riskSearchQuery.toLowerCase()
    return (
      r.id.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.owner.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q)
    )
  }).slice(0, 5)

  // Get objects for currently linked risks
  const currentlyLinkedRisks = ENTERPRISE_RISK_REGISTER.filter((r) =>
    (formData.linkedRiskIds || []).includes(r.id)
  )

  const handleCloseAttempt = () => {
    // If dirty, ask confirmation
    if (formData.name?.trim()) {
      setShowUnsavedConfirm(true)
    } else {
      onClose()
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
        <div
          className="w-full max-w-3xl max-h-[90vh] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-control-title"
        >
          {/* ── Modal Header ── */}
          <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center font-bold">
                  <Shield className="size-4" />
                </div>
                <div>
                  <h2 id="modal-control-title" className="font-h2 text-lg font-bold text-[var(--color-text-primary)]">
                    {isEditing ? `Edit Control ${formData.id}` : 'Create New Enterprise Control'}
                  </h2>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Define operational scope, governance attributes, and link to monitored risks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseAttempt}
                className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 pt-2 border-t border-[var(--color-border)] text-xs overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'basic'
                    ? 'bg-[var(--color-primary)] text-white font-bold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                }`}
              >
                A. Basic Information
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ownership')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'ownership'
                    ? 'bg-[var(--color-primary)] text-white font-bold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                }`}
              >
                B. Ownership
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('implementation')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'implementation'
                    ? 'bg-[var(--color-primary)] text-white font-bold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                }`}
              >
                C. Implementation
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('risks')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'risks'
                    ? 'bg-[var(--color-primary)] text-white font-bold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                }`}
              >
                D. Linked Risks ({formData.linkedRiskIds?.length || 0})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('docs')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'docs'
                    ? 'bg-[var(--color-primary)] text-white font-bold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                }`}
              >
                E. Documentation
              </button>
            </div>
          </div>

          {/* ── Modal Scrollable Body ── */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {/* SECTION A: BASIC INFO */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1 space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Control ID <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.id || ''}
                      onChange={(e) => setFormData((p) => ({ ...p, id: e.target.value }))}
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 font-mono text-xs font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Control Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Multi-Factor Authentication"
                      value={formData.name || ''}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, name: e.target.value }))
                        if (errors.name) setErrors((p) => ({ ...p, name: '' }))
                      }}
                      className={`w-full h-9 rounded-lg border px-3 text-xs ${
                        errors.name
                          ? 'border-rose-500 bg-rose-50/20'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-600">{errors.name}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Control Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide a comprehensive operational description of this control..."
                    value={formData.description || ''}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, description: e.target.value }))
                      if (errors.description) setErrors((p) => ({ ...p, description: '' }))
                    }}
                    className={`w-full rounded-lg border p-3 text-xs leading-relaxed ${
                      errors.description
                        ? 'border-rose-500 bg-rose-50/20'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-[11px] text-rose-600">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Control Objective
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mitigate unauthorized access resulting from credential stuffing attacks"
                    value={formData.objective || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, objective: e.target.value }))}
                    className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Control Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, type: e.target.value as ControlType }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    >
                      {CONTROL_TAXONOMY.types.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          category: e.target.value as ControlCategory,
                        }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    >
                      {CONTROL_TAXONOMY.categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Framework / Standard
                    </label>
                    <select
                      value={formData.framework}
                      onChange={(e) => setFormData((p) => ({ ...p, framework: e.target.value }))}
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    >
                      {CONTROL_TAXONOMY.frameworks.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION B: OWNERSHIP */}
            {activeTab === 'ownership' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Control Owner <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. James Wilson"
                      value={formData.owner || ''}
                      onChange={(e) => setFormData((p) => ({ ...p, owner: e.target.value }))}
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Responsible Department <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData((p) => ({ ...p, department: e.target.value }))}
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    >
                      {CONTROL_TAXONOMY.departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Supporting Team
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Identity & Access Management Team"
                      value={formData.supportingTeam || ''}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, supportingTeam: e.target.value }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Reviewer or Approver
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Nair, Head of Operational Risk"
                      value={formData.reviewer || ''}
                      onChange={(e) => setFormData((p) => ({ ...p, reviewer: e.target.value }))}
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION C: IMPLEMENTATION */}
            {activeTab === 'implementation' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Implementation Status
                    </label>
                    <select
                      value={formData.implementationStatus}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          implementationStatus: e.target.value as ImplementationStatus,
                        }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    >
                      {CONTROL_TAXONOMY.implementationStatuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Control Method
                    </label>
                    <select
                      value={formData.method}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          method: e.target.value as ControlMethod,
                        }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    >
                      {CONTROL_TAXONOMY.methods.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Execution Frequency
                    </label>
                    <select
                      value={formData.frequency}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          frequency: e.target.value as ControlFrequency,
                        }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    >
                      {CONTROL_TAXONOMY.frequencies.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Implementation Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Feb 15, 2026"
                      value={formData.implementationDate || ''}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, implementationDate: e.target.value }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                      Next Review Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 30, 2026"
                      value={formData.nextReviewDate || ''}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, nextReviewDate: e.target.value }))
                      }
                      className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Effectiveness Assessment
                  </label>
                  <select
                    value={formData.effectiveness}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        effectiveness: e.target.value as ControlEffectiveness,
                      }))
                    }
                    className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                  >
                    {CONTROL_TAXONOMY.effectivenessRatings.map((eff) => (
                      <option key={eff} value={eff}>
                        {eff}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* SECTION D: LINKED RISKS */}
            {activeTab === 'risks' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    Link Monitored Risks
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Connect this control to registered enterprise risks to establish mitigation mapping.
                  </p>
                </div>

                {/* Risk Search Picker */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="text"
                    value={riskSearchQuery}
                    onChange={(e) => setRiskSearchQuery(e.target.value)}
                    placeholder="Search risk by ID, title, owner, or department..."
                    className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 text-xs"
                  />

                  {riskSearchQuery && availableRisksToLink.length > 0 && (
                    <div className="absolute left-0 right-0 top-10 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-20 max-h-56 overflow-y-auto p-1.5 space-y-1">
                      {availableRisksToLink.map((risk) => (
                        <div
                          key={risk.id}
                          onClick={() => handleLinkRisk(risk.id)}
                          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-mono font-bold text-blue-600">{risk.id}</span>
                            <span className="ml-2 font-medium text-slate-800 dark:text-slate-200">
                              {risk.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {risk.department} • Owner: {risk.owner}
                            </span>
                          </div>
                          <RiskSeverityBadge severity={risk.residualSeverity} size="sm" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Currently Linked Risks Table/List */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Currently Linked ({currentlyLinkedRisks.length}):
                  </span>

                  {currentlyLinkedRisks.length === 0 ? (
                    <p className="text-slate-400 text-xs italic">
                      No risks linked yet. Use the search bar above to connect risks.
                    </p>
                  ) : (
                    currentlyLinkedRisks.map((risk) => (
                      <div
                        key={risk.id}
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-blue-600">{risk.id}</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {risk.title}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {risk.department} • Owner: {risk.owner}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <RiskSeverityBadge severity={risk.residualSeverity} size="sm" />
                          <button
                            type="button"
                            onClick={() => handleUnlinkRisk(risk.id)}
                            className="p-1 rounded text-rose-500 hover:bg-rose-50 hover:text-rose-700"
                            title="Unlink Risk"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SECTION E: DOCUMENTATION */}
            {activeTab === 'docs' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Procedure or Policy Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SEC-SOP-014: Corporate Access and MFA Policy"
                    value={formData.procedureReference || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, procedureReference: e.target.value }))
                    }
                    className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Evidence Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="What evidence confirms the operating effectiveness of this control?"
                    value={formData.evidenceRequirements || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, evidenceRequirements: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Operational Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Detailed steps for operating and testing this control..."
                    value={formData.instructions || ''}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, instructions: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Additional Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hardware tokens provisioned for all production administrators"
                    value={formData.notes || ''}
                    onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                    className="w-full h-9 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Modal Footer ── */}
          <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-secondary)]/30 shrink-0 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleCloseAttempt} className="text-xs">
              Cancel
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSave}
                className="text-xs font-semibold"
              >
                Save Draft
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                className="text-xs font-bold"
              >
                {isEditing ? 'Save Changes' : 'Create Control'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xl space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Discard unsaved changes?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              You have unsaved changes in this control form. Closing now will discard your entries.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowUnsavedConfirm(false)}
              >
                Keep Editing
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setShowUnsavedConfirm(false)
                  onClose()
                }}
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

import { useState } from 'react'
import { IconCheck, IconX, IconDetails } from './icons'

const STATUS_STYLES = {
  confirmed: { label: 'Confirmed', className: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  rejected: { label: 'Rejected', className: 'border-slate-200 bg-slate-50 text-slate-500' },
}

export default function UpdateProposalCard({ proposal, student, status, onConfirm, onReject }) {
  const [showDetails, setShowDetails] = useState(false)
  const settled = status !== 'pending'

  return (
    <div
      className={`mt-3 rounded-xl border p-4 ${
        settled ? STATUS_STYLES[status].className : 'border-amber-200 bg-amber-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            {settled ? STATUS_STYLES[status].label : 'Pending confirmation'}
          </p>
          <p className="mt-1 font-medium text-slate-900">
            {proposal.kind === 'marks' ? 'Update marks' : 'Add record'} — {student.name}
          </p>
          <p className="text-sm text-slate-600">{proposal.summary}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowDetails((open) => !open)}
            aria-label="View details"
            aria-expanded={showDetails}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
          >
            <IconDetails className="h-4.5 w-4.5" />
          </button>

          {!settled && (
            <>
              <button
                type="button"
                onClick={onReject}
                aria-label="Reject update"
                className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 transition-colors hover:border-[#d03b3b] hover:text-[#d03b3b]"
              >
                <IconX className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={onConfirm}
                aria-label="Confirm update"
                className="rounded-lg bg-slate-900 p-1.5 text-white transition-colors hover:bg-slate-700"
              >
                <IconCheck className="h-4.5 w-4.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {showDetails && (
        <dl className="mt-3 space-y-1 border-t border-black/5 pt-3 text-sm">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-slate-500">Student</dt>
            <dd className="text-slate-800">
              {student.name} · {student.class}
            </dd>
          </div>
          {proposal.kind === 'marks' ? (
            <>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">Subject</dt>
                <dd className="text-slate-800">{proposal.subject}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">Change</dt>
                <dd className="text-slate-800 tabular-nums">
                  {proposal.previous} → {proposal.value}
                </dd>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">When</dt>
                <dd className="text-slate-800 tabular-nums">
                  {proposal.record.date} {proposal.record.time}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">Topic</dt>
                <dd className="text-slate-800">{proposal.record.topic}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">Notes</dt>
                <dd className="text-slate-800">{proposal.record.notes}</dd>
              </div>
            </>
          )}
        </dl>
      )}
    </div>
  )
}

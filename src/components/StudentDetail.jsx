import { useState } from 'react'
import MarksChart from './MarksChart'
import { IconArrowLeft, IconUser, IconEdit } from './icons'

function RecordRow({ record, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(record)

  function startEditing() {
    setDraft(record)
    setEditing(true)
  }

  if (editing) {
    return (
      <li className="px-4 py-3">
        <input
          value={draft.topic}
          onChange={(event) => setDraft({ ...draft, topic: event.target.value })}
          className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
        />
        <textarea
          value={draft.notes}
          onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
          rows={3}
          className="mt-2 w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
        />
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => {
              onSave(draft)
              setEditing(false)
            }}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white transition-colors hover:bg-slate-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="flex items-start justify-between gap-4 px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs text-slate-500 tabular-nums">
          {record.date} · {record.time}
        </p>
        <p className="mt-0.5 font-medium text-slate-900">{record.topic}</p>
        <p className="mt-0.5 text-sm text-slate-600">{record.notes}</p>
      </div>
      <button
        type="button"
        onClick={startEditing}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50"
      >
        <IconEdit className="h-4 w-4" />
        Edit
      </button>
    </li>
  )
}

export default function StudentDetail({ student, onBack, onEditRecord }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-4xl px-6 py-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"
        >
          <IconArrowLeft className="h-4.5 w-4.5" />
          Back to chat
        </button>

        <header className="mt-5 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <IconUser className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{student.name}</h1>
            <p className="text-sm text-slate-500">{student.class}</p>
          </div>
        </header>

        <div className="mt-6">
          <MarksChart student={student} />
        </div>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white">
          <h2 className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900">
            Records
          </h2>
          <ul className="divide-y divide-slate-100">
            {student.records.map((record, index) => (
              <RecordRow
                key={`${record.date}-${record.time}-${index}`}
                record={record}
                onSave={(patch) => onEditRecord(student.id, index, patch)}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

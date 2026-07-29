import { SUBJECTS, SUBJECT_NAMES } from '../data/students'

export default function StudentRecordCard({ student, onOpen }) {
  const latest = student.records[0]

  return (
    <button
      type="button"
      onClick={() => onOpen(student.id)}
      className="mt-3 block w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium tracking-wide text-slate-500 uppercase">
          Student {student.id} Record
        </span>
        <span className="text-xs text-blue-700">View details →</span>
      </div>

      <p className="mt-1 font-semibold text-slate-900">{student.name}</p>
      <p className="text-sm text-slate-500">{student.class}</p>

      <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SUBJECTS.map((subject) => {
          const mark = student.marks[subject]
          const atRisk = mark < student.threshold
          return (
            <div key={subject} className="rounded-lg bg-slate-50 px-2.5 py-2">
              <dt className="text-[11px] text-slate-500">
                {subject} — {SUBJECT_NAMES[subject]}
              </dt>
              <dd
                className={`text-sm font-semibold tabular-nums ${
                  atRisk ? 'text-[#d03b3b]' : 'text-slate-900'
                }`}
              >
                {mark}
                {atRisk && <span className="ml-1 text-[11px] font-medium">below</span>}
              </dd>
            </div>
          )
        })}
      </dl>

      {latest && (
        <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-600">
          <span className="font-medium text-slate-700">{latest.topic}</span> — {latest.notes}
        </p>
      )}
    </button>
  )
}

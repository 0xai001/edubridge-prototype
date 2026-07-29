import { useEffect, useRef, useState } from 'react'
import StudentRecordCard from './StudentRecordCard'
import UpdateProposalCard from './UpdateProposalCard'
import { IconBot, IconUser, IconSend } from './icons'

function Avatar({ role }) {
  const isBot = role === 'assistant'
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
        isBot ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
      }`}
    >
      {isBot ? <IconBot className="h-4.5 w-4.5" /> : <IconUser className="h-4.5 w-4.5" />}
    </div>
  )
}

function Message({ message, students, onOpenStudent, onConfirm, onReject }) {
  const isBot = message.role === 'assistant'
  const student = students.find((s) => s.id === (message.cardStudentId ?? message.proposal?.studentId))

  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <Avatar role={message.role} />
      <div className={`min-w-0 ${isBot ? 'max-w-2xl' : 'max-w-lg'}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm ${
            isBot
              ? 'rounded-tl-sm bg-white text-slate-800 ring-1 ring-slate-200'
              : 'rounded-tr-sm bg-slate-900 text-white'
          }`}
        >
          {message.text}
        </div>

        {message.cardStudentId && student && (
          <StudentRecordCard student={student} onOpen={onOpenStudent} />
        )}

        {message.proposal && student && (
          <UpdateProposalCard
            proposal={message.proposal}
            student={student}
            status={message.status}
            onConfirm={() => onConfirm(message.id)}
            onReject={() => onReject(message.id)}
          />
        )}
      </div>
    </div>
  )
}

export default function ChatScreen({ messages, students, onSend, onConfirm, onReject, onOpenStudent }) {
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function submit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-5 px-6 py-6">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              students={students}
              onOpenStudent={onOpenStudent}
              onConfirm={onConfirm}
              onReject={onReject}
            />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <form onSubmit={submit} className="border-t border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about a student, or describe an update…"
            className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Connect
            <IconSend className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

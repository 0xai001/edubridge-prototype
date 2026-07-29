import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatScreen from './components/ChatScreen'
import StudentDetail from './components/StudentDetail'
import { seedStudents } from './data/students'
import { respondTo } from './lib/assistant'

const GREETING = {
  id: 'm0',
  role: 'assistant',
  text:
    "Hi — I'm EduBridge. Ask me for a student's record, or tell me about a change and " +
    'I\'ll draft it for you to confirm. Try "show Priya" or "update Daniel S2 to 68".',
}

let nextId = 1
const makeId = () => `m${nextId++}`

export default function App() {
  const [students, setStudents] = useState(seedStudents)
  const [messages, setMessages] = useState([GREETING])
  const [openStudentId, setOpenStudentId] = useState(null)

  function handleSend(text) {
    const reply = respondTo(text, students)
    setMessages((current) => [
      ...current,
      { id: makeId(), role: 'teacher', text },
      {
        id: makeId(),
        role: 'assistant',
        text: reply.text,
        cardStudentId: reply.cardStudentId,
        proposal: reply.proposal,
        // A proposal is inert until the teacher acts on it — this flag is what
        // the confirmation card reads.
        status: reply.proposal ? 'pending' : undefined,
      },
    ])
  }

  function applyProposal(proposal) {
    setStudents((current) =>
      current.map((student) => {
        if (student.id !== proposal.studentId) return student
        if (proposal.kind === 'marks') {
          return { ...student, marks: { ...student.marks, [proposal.subject]: proposal.value } }
        }
        return { ...student, records: [proposal.record, ...student.records] }
      }),
    )
  }

  function handleConfirm(messageId) {
    const message = messages.find((m) => m.id === messageId)
    if (!message || message.status !== 'pending') return

    applyProposal(message.proposal)
    setMessages((current) => [
      ...current.map((m) => (m.id === messageId ? { ...m, status: 'confirmed' } : m)),
      {
        id: makeId(),
        role: 'assistant',
        text: 'Done — the record is updated.',
        cardStudentId: message.proposal.studentId,
      },
    ])
  }

  function handleReject(messageId) {
    setMessages((current) => [
      ...current.map((m) => (m.id === messageId ? { ...m, status: 'rejected' } : m)),
      { id: makeId(), role: 'assistant', text: 'Discarded — nothing was changed.' },
    ])
  }

  function handleEditRecord(studentId, index, patch) {
    setStudents((current) =>
      current.map((student) =>
        student.id === studentId
          ? {
              ...student,
              records: student.records.map((record, i) =>
                i === index ? { ...record, ...patch } : record,
              ),
            }
          : student,
      ),
    )
  }

  const openStudent = students.find((student) => student.id === openStudentId)

  return (
    <div className="flex h-full bg-slate-50">
      <Sidebar
        view={openStudent ? 'detail' : 'chat'}
        onHome={() => setOpenStudentId(null)}
        onNewChat={() => {
          setOpenStudentId(null)
          setMessages([GREETING])
        }}
      />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {openStudent ? (
          <StudentDetail
            student={openStudent}
            onBack={() => setOpenStudentId(null)}
            onEditRecord={handleEditRecord}
          />
        ) : (
          <ChatScreen
            messages={messages}
            students={students}
            onSend={handleSend}
            onConfirm={handleConfirm}
            onReject={handleReject}
            onOpenStudent={setOpenStudentId}
          />
        )}
      </main>
    </div>
  )
}

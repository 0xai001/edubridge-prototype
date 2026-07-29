import { SUBJECT_NAMES } from '../data/students'

// Stand-in for the model call. Everything here is rule-based string matching:
// the prototype needs the *interaction* (retrieve a record, propose an update,
// wait for confirmation) to feel real, not the language understanding.

const UPDATE_VERBS = /\b(update|change|set|correct|revise|raise|lower)\b/i
const RECORD_VERBS = /\b(add|log|note|record|remark)\b/i
const MARK_PATTERN = /\b(s[1-4])\b[^0-9]{0,24}(\d{1,3})\b/i

function findStudent(text, students) {
  const byIndex = text.match(/\bstudent\s*(\d+)\b/i)
  if (byIndex) {
    const student = students[Number(byIndex[1]) - 1]
    if (student) return student
  }

  const lowered = text.toLowerCase()
  return (
    students.find((s) => lowered.includes(s.name.toLowerCase())) ||
    // Fall back to any single name part ("Priya", "Okoye") so the teacher does
    // not have to type the full name.
    students.find((s) =>
      s.name
        .toLowerCase()
        .split(' ')
        .some((part) => part.length > 2 && new RegExp(`\\b${part}\\b`).test(lowered)),
    ) ||
    null
  )
}

function today() {
  const now = new Date()
  return {
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 5),
  }
}

// "add a note for student 1 about Fractions saying she finished early"
//                                       └─ topic ──┘└─────── notes ───────┘
// The topic runs from its keyword to whichever comes first: a notes keyword or
// punctuation. Without a notes keyword, the message minus its leading command
// becomes the note.
const NOTES_KEYWORDS = /\b(?:saying|remarks?|noting|that)\s+(.+)/i
const TOPIC_KEYWORDS = /\b(?:topic|about|on)\s+(.+?)(?=\s+\b(?:saying|remarks?|noting|that)\b|[.,;]|$)/i
const LEADING_COMMAND = /^\s*(?:please\s+)?(?:add|log|note|record|remark)\s*(?:a\s+|an\s+)?(?:new\s+)?(?:note|record|remark)?\s*(?:for\s+[^,]*?\b)?(?=about\b|on\b|topic\b|$|\s)/i

function extractRecord(text) {
  const topicMatch = text.match(TOPIC_KEYWORDS)
  const notesMatch = text.match(NOTES_KEYWORDS)

  return {
    ...today(),
    topic: topicMatch ? topicMatch[1].trim() : 'General observation',
    notes: (notesMatch ? notesMatch[1] : text.replace(LEADING_COMMAND, '')).trim(),
  }
}

export function respondTo(text, students) {
  const student = findStudent(text, students)
  const markMatch = text.match(MARK_PATTERN)

  if (student && markMatch && (UPDATE_VERBS.test(text) || RECORD_VERBS.test(text))) {
    const subject = markMatch[1].toUpperCase()
    const value = Math.min(100, Number(markMatch[2]))
    const previous = student.marks[subject]

    return {
      text: `I can update ${student.name}'s ${SUBJECT_NAMES[subject]} (${subject}) mark from ${previous} to ${value}. Confirm to commit this to the record.`,
      proposal: {
        kind: 'marks',
        studentId: student.id,
        subject,
        value,
        previous,
        summary: `${subject} · ${SUBJECT_NAMES[subject]}: ${previous} → ${value}`,
      },
    }
  }

  if (student && RECORD_VERBS.test(text)) {
    const record = extractRecord(text)
    return {
      text: `I've drafted a new record for ${student.name}. Confirm to add it to their file.`,
      proposal: {
        kind: 'record',
        studentId: student.id,
        record,
        summary: `${record.topic} — ${record.date} ${record.time}`,
      },
    }
  }

  if (student) {
    return {
      text: `Here's the current record for ${student.name}.`,
      cardStudentId: student.id,
    }
  }

  return {
    text:
      "I couldn't match that to a student. Try naming one — for example " +
      '"show Priya", "update Daniel S2 to 68", or "add a note for student 1 about fractions".',
  }
}

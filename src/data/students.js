// Seed data for the prototype. Marks are keyed S1–S4 (subjects); `threshold` is
// the per-student pass mark the chart flags against.
//
// The spread is deliberate — between them these eight cover every state the UI
// has to render: no subjects at risk, one, several, all four; a mark sitting
// exactly on the threshold (which counts as a pass); marks a point either side
// of it (where the chart moves the value label inside the bar); a 100 and a 22
// for the extremes of the y-scale; and record lists from one entry to five.
export const SUBJECTS = ['S1', 'S2', 'S3', 'S4']

export const SUBJECT_NAMES = {
  S1: 'Mathematics',
  S2: 'Science',
  S3: 'English',
  S4: 'History',
}

export const seedStudents = [
  {
    id: 1,
    name: 'Priya Raman',
    class: 'Class 4B',
    marks: { S1: 78, S2: 41, S3: 66, S4: 84 },
    threshold: 50,
    records: [
      {
        date: '2026-07-21',
        time: '09:15',
        topic: 'Science — Photosynthesis',
        notes: 'Struggled with the light-reaction diagram. Re-teach with the leaf experiment.',
      },
      {
        date: '2026-07-14',
        time: '11:40',
        topic: 'Mathematics — Long division',
        notes: 'Confident on 2-digit divisors. Ready to move on.',
      },
      {
        date: '2026-07-02',
        time: '14:05',
        topic: 'Parent meeting',
        notes: 'Parents asked for extra science practice at home. Worksheets sent.',
      },
    ],
  },
  {
    id: 2,
    name: 'Daniel Okoye',
    class: 'Class 4B',
    marks: { S1: 55, S2: 47, S3: 72, S4: 43 },
    threshold: 50,
    records: [
      {
        date: '2026-07-23',
        time: '10:00',
        topic: 'History — Trade routes',
        notes: 'Missed two weeks of lessons. Needs a catch-up plan before the term test.',
      },
      {
        date: '2026-07-09',
        time: '13:20',
        topic: 'English — Persuasive writing',
        notes: 'Strong argument structure. Encouraged him to enter the essay contest.',
      },
    ],
  },
  {
    id: 3,
    name: 'Mei Ling Tan',
    class: 'Class 4A',
    marks: { S1: 91, S2: 88, S3: 79, S4: 94 },
    threshold: 60,
    records: [
      {
        date: '2026-07-25',
        time: '08:45',
        topic: 'Mathematics — Fractions extension',
        notes: 'Finished the extension set early. Give harder problems next session.',
      },
      {
        date: '2026-07-11',
        time: '15:30',
        topic: 'Science — Lab safety',
        notes: 'Led the group demo. Good peer-teaching instinct.',
      },
    ],
  },
  {
    id: 4,
    name: 'Arjun Mehta',
    class: 'Class 4B',
    marks: { S1: 38, S2: 44, S3: 51, S4: 29 },
    threshold: 50,
    records: [
      {
        date: '2026-07-27',
        time: '11:10',
        topic: 'Intervention review',
        notes: 'Three subjects below threshold. Flagged to the year head for support hours.',
      },
      {
        date: '2026-07-18',
        time: '09:30',
        topic: 'History — Source analysis',
        notes: 'Left half the paper blank. Reading speed may be the real issue, not the content.',
      },
      {
        date: '2026-07-06',
        time: '14:45',
        topic: 'Mathematics — Place value',
        notes: 'Re-taught in a small group. Some improvement by the end of the session.',
      },
      {
        date: '2026-06-24',
        time: '16:00',
        topic: 'Parent meeting',
        notes: 'Discussed a home reading routine. Follow up at the end of term.',
      },
    ],
  },
  {
    id: 5,
    name: 'Sofia Almeida',
    class: 'Class 4A',
    marks: { S1: 60, S2: 72, S3: 58, S4: 65 },
    threshold: 60,
    records: [
      {
        date: '2026-07-24',
        time: '10:20',
        topic: 'English — Comprehension',
        notes: 'Two marks short of the threshold. Close enough to fix with targeted practice.',
      },
      {
        date: '2026-07-15',
        time: '13:00',
        topic: 'Science — Fair testing',
        notes: 'Excellent method write-up. Used her work as the class exemplar.',
      },
    ],
  },
  {
    id: 6,
    name: 'Kwame Boateng',
    class: 'Class 4B',
    marks: { S1: 46, S2: 45, S3: 88, S4: 90 },
    threshold: 45,
    records: [
      {
        date: '2026-07-26',
        time: '09:00',
        topic: 'Progress check',
        notes: 'Sitting right on the threshold in maths and science. Watch closely next assessment.',
      },
      {
        date: '2026-07-13',
        time: '11:25',
        topic: 'History — Local museum trip',
        notes: 'Asked the best questions of the group. Real curiosity for the subject.',
      },
      {
        date: '2026-07-01',
        time: '15:10',
        topic: 'Science — Materials',
        notes: 'Confuses mass and weight. Worth a dedicated recap.',
      },
    ],
  },
  {
    id: 7,
    name: 'Hana Sato',
    class: 'Class 4A',
    marks: { S1: 97, S2: 63, S3: 100, S4: 71 },
    threshold: 60,
    records: [
      {
        date: '2026-07-28',
        time: '08:30',
        topic: 'English — Poetry unit',
        notes: 'Full marks. Ready for the upper-band reading list.',
      },
      {
        date: '2026-07-17',
        time: '14:15',
        topic: 'Science — Forces',
        notes: 'Weakest of her four subjects. More practical work, less textbook.',
      },
      {
        date: '2026-07-03',
        time: '10:50',
        topic: 'Mathematics — Problem solving',
        notes: 'Working two years ahead. Needs genuine extension, not more of the same.',
      },
    ],
  },
  {
    id: 8,
    name: "Liam O'Connor",
    class: 'Class 4B',
    marks: { S1: 22, S2: 35, S3: 48, S4: 31 },
    threshold: 50,
    records: [
      {
        date: '2026-07-29',
        time: '09:45',
        topic: 'Support plan review',
        notes: 'All four subjects below threshold. Formal support plan starts next week.',
      },
      {
        date: '2026-07-22',
        time: '13:40',
        topic: 'Attendance',
        notes: 'Nine sessions missed this half-term. Attendance is the first thing to fix.',
      },
      {
        date: '2026-07-10',
        time: '11:00',
        topic: 'Mathematics — Times tables',
        notes: 'Knows 2s, 5s and 10s reliably. Everything above that is guesswork.',
      },
      {
        date: '2026-06-30',
        time: '15:20',
        topic: 'Parent meeting',
        notes: 'Home situation discussed in confidence. Year head has the detail.',
      },
      {
        date: '2026-06-19',
        time: '10:15',
        topic: 'English — Phonics screen',
        notes: 'Below the expected standard. Referred for a reading assessment.',
      },
    ],
  },
]

export const TEACHER = { name: 'Ms. A. Fernandez', role: 'Form teacher, 4B' }

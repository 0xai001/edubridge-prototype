# EduBridge — prototype

Two-screen web app prototype for a teacher-facing student records assistant.
Client-side only: no backend, no auth, no persistence (a refresh resets to seed data).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
```

## Screens

**Chat assistant** (home) — dark sidebar, scrollable thread, fixed input bar with a
`Connect` send button. AI replies render structured cards:

- a **student record card** (marks per subject, latest record) — click it to open the detail screen
- a **confirmation card** when the AI proposes a change — ✓ commits it to state, ✗ discards it,
  and the ⓘ button expands the exact before/after

**Student detail** — back arrow, student header, bar chart of marks with a dashed
threshold line (bars below it render red and are also named in text), and a Records
list with inline Edit.

## Things to type

| Input | What happens |
|---|---|
| `show Priya` / `student 2` | retrieves that student's record card |
| `update Daniel S2 to 68` | proposes a marks change, waits for confirmation |
| `add a note for student 1 about Fractions saying she finished early` | proposes a new record |

## Structure

```
src/
  App.jsx                  state owner: students, messages, which screen is open
  data/students.js         seed data (3 students)
  lib/assistant.js         rule-based stand-in for the model call
  components/
    Sidebar.jsx
    ChatScreen.jsx         thread + input bar
    StudentRecordCard.jsx  retrieved-data card
    UpdateProposalCard.jsx confirm / reject card
    StudentDetail.jsx      screen 2
    MarksChart.jsx         hand-rolled SVG bar chart
    icons.jsx
```

`lib/assistant.js` is regex matching, not language understanding — it exists so the
*interaction* (retrieve → propose → confirm) can be demonstrated without a backend.
Swapping it for a real model call is the one seam that matters here.

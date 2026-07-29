import { useState } from 'react'
import { SUBJECTS, SUBJECT_NAMES } from '../data/students'
import { IconAlert } from './icons'

// Geometry is in viewBox units. The right padding is a gutter for the threshold
// line's label, so it never lands on top of a bar.
const VB_W = 640
const VB_H = 300
const PAD = { top: 22, right: 84, bottom: 48, left: 44 }
const PLOT_W = VB_W - PAD.left - PAD.right
const PLOT_H = VB_H - PAD.top - PAD.bottom
const BAR_W = 18
const CAP_R = 4
const Y_MAX = 100
const Y_TICKS = [0, 25, 50, 75, 100]

const yToPx = (value) => PAD.top + PLOT_H * (1 - value / Y_MAX)
const bandCenter = (index) => PAD.left + (PLOT_W / SUBJECTS.length) * (index + 0.5)

// Rounded data-end at the top, square where it meets the baseline.
function barPath(x, top, width, baseline) {
  const r = Math.min(CAP_R, (baseline - top) / 2, width / 2)
  return [
    `M ${x} ${baseline}`,
    `L ${x} ${top + r}`,
    `Q ${x} ${top} ${x + r} ${top}`,
    `L ${x + width - r} ${top}`,
    `Q ${x + width} ${top} ${x + width} ${top + r}`,
    `L ${x + width} ${baseline}`,
    'Z',
  ].join(' ')
}

export default function MarksChart({ student }) {
  const [hovered, setHovered] = useState(null)
  const [showTable, setShowTable] = useState(false)

  const baseline = yToPx(0)
  const thresholdY = yToPx(student.threshold)
  const bars = SUBJECTS.map((subject, index) => {
    const value = student.marks[subject]
    const top = yToPx(value)
    // A cap-label on a bar that ends near the threshold would sit on the dashed
    // line, so those labels move inside the bar instead.
    const labelInside = Math.abs(top - 8 - thresholdY) < 12 && baseline - top > 28
    return {
      subject,
      value,
      atRisk: value < student.threshold,
      x: bandCenter(index) - BAR_W / 2,
      cx: bandCenter(index),
      top,
      labelInside,
    }
  })
  const atRiskCount = bars.filter((bar) => bar.atRisk).length

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-semibold text-slate-900">Marks by subject</h2>
          <p className="text-sm text-slate-500">
            {atRiskCount > 0
              ? `${atRiskCount} of ${SUBJECTS.length} subjects below the ${student.threshold}-mark threshold`
              : `All subjects above the ${student.threshold}-mark threshold`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowTable((open) => !open)}
          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-50"
        >
          {showTable ? 'Hide table' : 'Show table'}
        </button>
      </div>

      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full"
          role="img"
          aria-label={`Bar chart of marks for ${student.name}. ${SUBJECTS.map(
            (s) => `${SUBJECT_NAMES[s]} ${student.marks[s]}`,
          ).join(', ')}. Threshold ${student.threshold}.`}
        >
          {Y_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={VB_W - PAD.right}
                y1={yToPx(tick)}
                y2={yToPx(tick)}
                stroke={tick === 0 ? 'var(--viz-baseline)' : 'var(--viz-grid)'}
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={yToPx(tick) + 4}
                textAnchor="end"
                fontSize="11"
                fill="var(--viz-muted)"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {tick}
              </text>
            </g>
          ))}

          <text
            x={14}
            y={PAD.top + PLOT_H / 2}
            fontSize="11"
            fill="var(--viz-muted)"
            textAnchor="middle"
            transform={`rotate(-90 14 ${PAD.top + PLOT_H / 2})`}
          >
            marks
          </text>

          {bars.map((bar, index) => (
            <g
              key={bar.subject}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Full-band hit area — the bar itself is a small target. */}
              <rect
                x={bandCenter(index) - PLOT_W / SUBJECTS.length / 2}
                y={PAD.top}
                width={PLOT_W / SUBJECTS.length}
                height={PLOT_H}
                fill="transparent"
              />
              <path
                d={barPath(bar.x, bar.top, BAR_W, baseline)}
                fill={bar.atRisk ? 'var(--viz-critical)' : 'var(--viz-series)'}
                opacity={hovered === null || hovered === index ? 1 : 0.55}
              />
              <text
                x={bar.cx}
                y={bar.labelInside ? bar.top + 15 : bar.top - 8}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={bar.labelInside ? '#ffffff' : 'var(--viz-ink)'}
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {bar.value}
              </text>
              <text
                x={bar.cx}
                y={baseline + 18}
                textAnchor="middle"
                fontSize="12"
                fill="var(--viz-ink-secondary)"
              >
                {bar.subject}
              </text>
              <text
                x={bar.cx}
                y={baseline + 32}
                textAnchor="middle"
                fontSize="10"
                fill="var(--viz-muted)"
              >
                {SUBJECT_NAMES[bar.subject]}
              </text>
            </g>
          ))}

          {/* Threshold reference line — dashed so it never reads as a gridline. */}
          <line
            x1={PAD.left}
            x2={VB_W - PAD.right}
            y1={thresholdY}
            y2={thresholdY}
            stroke="var(--viz-critical)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text
            x={VB_W - PAD.right + 8}
            y={thresholdY + 4}
            textAnchor="start"
            fontSize="11"
            fill="var(--viz-critical)"
          >
            threshold {student.threshold}
          </text>
        </svg>

        {hovered !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
            style={{
              left: `${(bars[hovered].cx / VB_W) * 100}%`,
              top: `${((bars[hovered].top - 26) / VB_H) * 100}%`,
            }}
          >
            <span className="font-medium">{SUBJECT_NAMES[bars[hovered].subject]}</span> ·{' '}
            <span className="tabular-nums">{bars[hovered].value}</span>
            {bars[hovered].atRisk && <span className="text-red-300"> · below threshold</span>}
          </div>
        )}
      </div>

      {/* Status never rides on colour alone: at-risk subjects are named here. */}
      {atRiskCount > 0 && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-[#d03b3b]">
          <IconAlert className="h-4 w-4 shrink-0" />
          At risk:{' '}
          {bars
            .filter((bar) => bar.atRisk)
            .map((bar) => `${SUBJECT_NAMES[bar.subject]} (${bar.value})`)
            .join(', ')}
        </p>
      )}

      {showTable && (
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-1.5 font-medium">Subject</th>
              <th className="py-1.5 font-medium">Mark</th>
              <th className="py-1.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bars.map((bar) => (
              <tr key={bar.subject} className="border-b border-slate-100">
                <td className="py-1.5 text-slate-700">
                  {bar.subject} — {SUBJECT_NAMES[bar.subject]}
                </td>
                <td className="py-1.5 text-slate-900 tabular-nums">{bar.value}</td>
                <td className={`py-1.5 ${bar.atRisk ? 'text-[#d03b3b]' : 'text-slate-500'}`}>
                  {bar.atRisk ? 'Below threshold' : 'Above threshold'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

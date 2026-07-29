// Inline stroke icons — a whole icon package is more than a two-screen
// prototype needs.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="m5 13 4 4 10-10" />
    </svg>
  )
}

export function IconX(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function IconDetails(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  )
}

export function IconArrowLeft(props) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}

export function IconBot(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 3v4M9 12v1M15 12v1M9.5 16h5" />
    </svg>
  )
}

export function IconUser(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.4 4-5 7-5s5.8 1.6 7 5" />
    </svg>
  )
}

export function IconSend(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconHome(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />
    </svg>
  )
}

export function IconHistory(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12a8 8 0 1 0 2.5-5.8M4 5v3.5h3.5M12 8v4.5l3 1.7" />
    </svg>
  )
}

export function IconPlus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconLogout(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 5h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4M10 8l-4 4 4 4M6 12h9" />
    </svg>
  )
}

export function IconEdit(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z" />
    </svg>
  )
}

export function IconAlert(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5 21 19H3z" />
      <path d="M12 10v4M12 16.5h.01" />
    </svg>
  )
}

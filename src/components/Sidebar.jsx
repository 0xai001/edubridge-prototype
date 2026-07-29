import { IconHome, IconHistory, IconPlus, IconLogout } from './icons'
import { TEACHER } from '../data/students'

function NavLink({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="h-4.5 w-4.5 shrink-0" />
      {label}
    </button>
  )
}

export default function Sidebar({ view, onHome, onNewChat }) {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-slate-900 px-4 py-5">
      <div className="px-3">
        <span className="text-lg font-semibold tracking-tight text-white">EduBridge</span>
        <p className="mt-0.5 text-xs text-slate-400">Student records assistant</p>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        <NavLink icon={IconHome} label="Home" active={view === 'chat'} onClick={onHome} />
        <NavLink icon={IconHistory} label="History" active={false} onClick={onHome} />
        <NavLink icon={IconPlus} label="New Chat" active={false} onClick={onNewChat} />
      </nav>

      <div className="mt-auto border-t border-slate-800 pt-4">
        <div className="px-3">
          <p className="text-sm font-medium text-white">{TEACHER.name}</p>
          <p className="text-xs text-slate-400">{TEACHER.role}</p>
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <IconLogout className="h-4.5 w-4.5 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )
}

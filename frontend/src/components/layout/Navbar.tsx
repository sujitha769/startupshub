import { useAuth } from '../../context/AuthContext'

interface Props {
  onToggleSidebar?: () => void
}

const Navbar = ({ onToggleSidebar }: Props) => {
  const { user, logout } = useAuth()

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100 z-20"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-gray-700 focus:outline-none transition-colors p-1 rounded-md hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Logo — unified brand mark */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-blue-600">Startups</span>
            <span className="text-indigo-600">Hub</span>
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 pl-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
          >
            {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user?.name || user?.email?.split('@')[0] || 'User'}
          </span>
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <button
          onClick={logout}
          title="Logout"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

interface MenuItem {
  name: string
  path: string
  soon?: boolean
  adminOnly?: boolean
  isSeparator?: boolean
  showBadgeIfPending?: boolean
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Leads', path: '/dashboard/leads' },
  { name: 'Funding Opportunities', path: '/dashboard/funding' },
  { name: 'Startups Raising Funds', path: '/dashboard/startups' },
  { name: 'divider', path: '', isSeparator: true, adminOnly: true },
  { name: 'Manage Staff', path: '/dashboard/admin/staff', adminOnly: true },
  { name: 'Manage Investors', path: '/dashboard/admin/investors', adminOnly: true, showBadgeIfPending: true },
  { name: 'Manage Highlights', path: '/dashboard/admin/highlights', adminOnly: true },
 
  { name: 'Manage Subscriptions', path: '/dashboard/admin/subscriptions', adminOnly: true },
]

interface SidebarProps {
  isOpen?: boolean
}

const Sidebar = ({ isOpen = true }: SidebarProps) => {
  const { user } = useAuth()
  const [pendingCount, setPendingCount] = useState(0)

  const visibleItems = menuItems.filter(
    (item) => !item.adminOnly || user?.role === 'ADMIN'
  )

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      api.get('/admin/investors/pending-count')
        .then(res => setPendingCount(res.data.count))
        .catch(err => console.error(err))
    }
  }, [user])

  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (user?.email) return user.email[0].toUpperCase()
    return 'U'
  }

  return (
    <aside
      className={`absolute md:relative z-30 h-full flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'w-64 p-4' : 'w-0 p-0'}`}
      style={{
        background: 'linear-gradient(160deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)',
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)'
      }}
    >
      <div className="w-56 h-full flex flex-col">
        {/* Main nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {visibleItems.map((item, idx) => (
            <div key={item.name + idx}>
              {item.isSeparator ? (
                <div className="h-px bg-white/20 my-2 mx-2 rounded-full"></div>
              ) : item.soon ? (
                <div className="px-3 py-2 text-white/50 text-sm">
                  {item.name}
                  <span className="ml-2 text-[10px] uppercase font-bold text-yellow-300 bg-yellow-300/10 px-1.5 py-0.5 rounded">
                    soon
                  </span>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'text-white/80 hover:bg-white/15 hover:text-white'
                    }`
                  }
                >
                  <span>{item.name}</span>
                  {item.showBadgeIfPending && pendingCount > 0 && (
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Profile */}
        <div className="pt-3 border-t border-white/20">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/25 text-white'
                  : 'text-white/80 hover:bg-white/15 hover:text-white'
              }`
            }
          >
            <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
              {getInitials()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-white text-sm">
                {user?.name || 'Profile'}
              </span>
              {user?.email && (
                <span className="text-[11px] text-white/60 truncate">
                  {user.email}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
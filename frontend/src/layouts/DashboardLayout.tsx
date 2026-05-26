import { useState } from 'react'
import type { ReactNode } from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

interface Props {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768)

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50/50">

      {/* Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* Main */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-20" 
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50/50 w-full">
          {children}
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout
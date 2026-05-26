import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'
import {
  RocketLaunchIcon,
  BoltIcon,
  GlobeAltIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid'

interface Highlight {
  id: number
  title: string
  description: string
  icon: string
}

const LandingPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const highlightsRes = await api.get('/highlights')
        setHighlights(highlightsRes.data)
      } catch (err) {
        console.error('Failed to load data', err)
      }
    }
    fetchData()
  }, [])

  // ── Smooth scroll helper ──
  const scrollToSection = (label: string) => {
    const idMap: Record<string, string> = {
      'Home': 'home',
      'About Us': 'aboutus',
      'Contact Us': 'contactus',
    }
    const id = idMap[label]
    if (!id) return
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col scroll-smooth" style={{ background: '#f8faff' }}>

      {/* ── Global background layer ── */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% -10%, #dbeafe 0%, transparent 60%), ' +
              'radial-gradient(ellipse 60% 50% at 80% 110%, #e0e7ff 0%, transparent 60%), ' +
              'radial-gradient(ellipse 50% 40% at 50% 50%, #f0f4ff 0%, transparent 70%), ' +
              'linear-gradient(165deg, #f0f7ff 0%, #f8faff 45%, #eef2ff 100%)',
          }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, #93c5fd44 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Floating orbs */}
        <div
          className="absolute rounded-full blur-3xl opacity-40"
          style={{
            width: 520,
            height: 520,
            top: '-120px',
            left: '-100px',
            background: 'radial-gradient(circle, #bfdbfe, #a5b4fc)',
            animation: 'floatA 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: 400,
            height: 400,
            top: '30%',
            right: '-80px',
            background: 'radial-gradient(circle, #c7d2fe, #818cf8)',
            animation: 'floatB 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            width: 300,
            height: 300,
            bottom: '10%',
            left: '30%',
            background: 'radial-gradient(circle, #bae6fd, #6ee7b7)',
            animation: 'floatC 26s ease-in-out infinite',
          }}
        />

        {/* Diagonal lines accent */}
        <svg
          className="absolute top-0 right-0 opacity-10"
          width="420"
          height="420"
          viewBox="0 0 420 420"
          fill="none"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1={i * 26 - 60}
              y1="0"
              x2={i * 26 + 300}
              y2="420"
              stroke="#6366f1"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Bottom-left geometric ring */}
        <svg
          className="absolute bottom-0 left-0 opacity-10"
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
        >
          <circle cx="0" cy="320" r="180" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="0" cy="320" r="130" stroke="#6366f1" strokeWidth="1" />
          <circle cx="0" cy="320" r="80" stroke="#3b82f6" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -25px) scale(1.04); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          40% { transform: translate(-35px, 30px) scale(1.06); }
          70% { transform: translate(20px, -15px) scale(0.96); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(25px, -30px) scale(1.08); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: fadeSlideUp 0.7s ease both; }
        .hero-animate-2 { animation: fadeSlideUp 0.7s 0.15s ease both; }
        .hero-animate-3 { animation: fadeSlideUp 0.7s 0.28s ease both; }
      `}</style>

      {/* ── Navbar ── */}
      <header
        className="relative p-6 flex justify-between items-center max-w-7xl mx-auto w-full sticky top-0 z-50 rounded-b-3xl mb-4"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 1px 0 0 rgba(99,102,241,0.08), 0 4px 24px 0 rgba(59,130,246,0.07)',
          border: '1px solid rgba(165,180,252,0.18)',
        }}
      >
        <div
          className="font-bold text-2xl tracking-tight cursor-pointer select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-blue-600">Startups</span>
          <span className="text-indigo-600">Hub</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {['Home', 'About Us', 'Contact Us'].map((label) => (
            <button
              key={label}
              onClick={() => scrollToSection(label)}
              className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 font-bold focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕ Close' : 'Menu'}
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            className="absolute top-full left-0 w-full flex flex-col items-start gap-4 px-8 py-6 md:hidden z-50 rounded-b-2xl"
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(59,130,246,0.10)',
            }}
          >
            {['Home', 'About Us', 'Contact Us'].map((label) => (
              <button
                key={label}
                onClick={() => { scrollToSection(label); setMenuOpen(false) }}
                className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero Section ── */}
      <main id="home" className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-24 text-center">

        {/* Pill badge */}
        <div
          className="hero-animate mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #dbeafe, #e0e7ff)',
            color: '#4338ca',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
          Now in Beta — Join 500+ Founders
        </div>

        <h1 className="hero-animate-2 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 py-2 leading-tight">
          <span
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 60%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Startups
          </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hub
          </span>
        </h1>

        <p className="hero-animate-3 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          Find clients, funding, and startup opportunities — all in one place
        </p>

        <div className="hero-animate-3 flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => navigate(user ? '/dashboard' : '/login')}
            className="relative overflow-hidden font-semibold py-3.5 px-10 rounded-full text-white text-base transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              boxShadow: '0 4px 24px rgba(79,70,229,0.35), 0 1px 3px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 8px 32px rgba(79,70,229,0.5), 0 2px 6px rgba(0,0,0,0.14)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 4px 24px rgba(79,70,229,0.35), 0 1px 3px rgba(0,0,0,0.12)'
            }}
          >
            {user ? 'Go to Dashboard' : 'Get Started →'}
          </button>

          <button
            onClick={() => scrollToSection('About Us')}
            className="text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-colors underline underline-offset-4 bg-transparent border-none cursor-pointer"
          >
            Learn more
          </button>
        </div>

        {/* Social proof */}
        <div className="hero-animate-3 mt-8 flex items-center gap-3 text-xs text-slate-400 font-medium">
          <div className="flex -space-x-2">
            {['#60a5fa', '#818cf8', '#34d399', '#f472b6', '#fb923c'].map((color, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: color }} />
            ))}
          </div>
          <span>Trusted by <strong className="text-slate-600">500+</strong> founders worldwide</span>
        </div>

        {/* Highlights Grid */}
        <div className="mt-24 w-full max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Everything you need to <span style={{ color: '#4f46e5' }}>grow</span>
          </h2>
          <p className="text-slate-500 text-sm mb-10">Powerful tools built for modern founders</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.length > 0
              ? highlights.map((item, idx) => (
                  <div
                    key={item.id}
                    className="group relative text-left p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.75)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(165,180,252,0.25)',
                      boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
                      animationDelay: `${idx * 80}ms`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 8px 32px rgba(99,102,241,0.18)'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor =
                        'rgba(99,102,241,0.35)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 2px 12px rgba(99,102,241,0.07)'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor =
                        'rgba(165,180,252,0.25)'
                    }}
                  >
                    <div
                      className="rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        width: 52,
                        height: 52,
                        background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)',
                        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.9)',
                      }}
                    >
                      {(() => {
                        const map: Record<string, any> = {
                          rocket: RocketLaunchIcon,
                          bolt: BoltIcon,
                          globe: GlobeAltIcon,
                          network: UsersIcon,
                          pricing: CurrencyDollarIcon,
                        }
                        const Icon =
                          item.icon && map[item.icon.toLowerCase()]
                            ? map[item.icon.toLowerCase()]
                            : RocketLaunchIcon
                        return <Icon className="w-6 h-6 text-indigo-600" />
                      })()}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl animate-pulse"
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(165,180,252,0.2)',
                    }}
                  >
                    <div className="rounded-xl mb-5" style={{ width: 52, height: 52, background: '#e2e8f0' }} />
                    <div className="h-5 rounded-lg w-2/3 mb-3" style={{ background: '#e2e8f0' }} />
                    <div className="h-3 rounded-lg w-full mb-2" style={{ background: '#f1f5f9' }} />
                    <div className="h-3 rounded-lg w-4/5" style={{ background: '#f1f5f9' }} />
                  </div>
                ))}
          </div>
        </div>
      </main>

      {/* ── About Us (wrapped with id for scroll target) ── */}
      <div id="aboutus">
        <AboutUs />
      </div>

      {/* ── Contact Us (wrapped with id for scroll target) ── */}
      <div id="contactus">
        <ContactUs />
      </div>

      {/* Footer */}
      <footer
        className="py-12 text-center text-sm"
        style={{
          background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
          color: '#94a3b8',
        }}
      >
        <div className="mb-2 font-bold text-lg">
          <span className="text-blue-400">Startups</span>
          <span className="text-indigo-400">Hub</span>
        </div>
        <p>© {new Date().getFullYear()} StartupsHub. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
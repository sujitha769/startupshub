import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage)
      window.history.replaceState({}, '')
    }
  }, [location.state])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const user = await login(form)
      if (user.role === 'ADMIN') {
        navigate('/dashboard/admin', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-24px) rotate(8deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-6deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-30px) rotate(20deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .login-card {
          animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both;
        }
        .shape1 { animation: float1 7s ease-in-out infinite; }
        .shape2 { animation: float2 9s ease-in-out infinite 1s; }
        .shape3 { animation: float3 11s ease-in-out infinite 2s; }
        .shape4 { animation: float1 8s ease-in-out infinite 0.5s; }
        .shape5 { animation: float2 10s ease-in-out infinite 3s; }
        .input-field {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fafafa;
          color: #111;
        }
        .input-field:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
          background: #fff;
        }
        .btn-submit {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          color: white;
          letter-spacing: 0.01em;
        }
        .btn-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(79,70,229,0.35);
        }
        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>

      <section
        className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0a0f1e 0%, #0d1f3c 40%, #1a0a2e 70%, #0a0f2e 100%)',
        }}
      >
        {/* Ambient glow blobs */}
        <div style={{
          position: 'absolute', top: '10%', left: '15%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '10%',
          width: 350, height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.22) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 500, height: 200,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }} />

        {/* Floating geometric shapes */}
        <div className="shape1" style={{
          position: 'absolute', top: '12%', left: '8%',
          width: 70, height: 70,
          border: '1.5px solid rgba(37,99,235,0.35)',
          borderRadius: 16,
          pointerEvents: 'none',
        }} />
        <div className="shape2" style={{
          position: 'absolute', top: '20%', right: '12%',
          width: 50, height: 50,
          border: '1.5px solid rgba(79,70,229,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div className="shape3" style={{
          position: 'absolute', bottom: '20%', left: '6%',
          width: 90, height: 90,
          border: '1.5px solid rgba(37,99,235,0.25)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div className="shape4" style={{
          position: 'absolute', bottom: '28%', right: '8%',
          width: 55, height: 55,
          border: '1.5px solid rgba(79,70,229,0.3)',
          borderRadius: 12,
          pointerEvents: 'none',
        }} />
        <div className="shape5" style={{
          position: 'absolute', top: '60%', left: '20%',
          width: 30, height: 30,
          background: 'rgba(37,99,235,0.15)',
          borderRadius: 6,
          pointerEvents: 'none',
        }} />
        {/* Dotted grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }} />

        {/* Branding watermark left side */}
        <div style={{
          position: 'absolute', left: '6%', bottom: '8%',
          display: 'flex', flexDirection: 'column', gap: 8,
        }} className="hidden lg:flex">
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Powering startup ecosystems
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Leads', 'Funding', 'Growth'].map(tag => (
              <span key={tag} style={{
                fontSize: 11, padding: '3px 10px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.05em',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Card */}
        <div
          className="login-card w-full max-w-md relative z-10"
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 24,
            padding: '36px 36px 32px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-7">
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
            }}>
              <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#2563eb' }}>Startups</span>
              <span style={{ color: '#4f46e5' }}>Hub</span>
            </span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
              Sign in to your account to continue
            </p>
          </div>

          {successMessage && (
            <div style={{
              marginBottom: 16, padding: '10px 14px',
              background: '#eff6ff', color: '#1e40af',
              borderRadius: 10, fontSize: 13,
              border: '1px solid #bfdbfe',
            }}>
              {successMessage}
            </div>
          )}

          {error && (
            <div style={{
              marginBottom: 16, padding: '10px 14px',
              background: '#fef2f2', color: '#b91c1c',
              borderRadius: 10, fontSize: 13,
              border: '1px solid #fecaca',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            }}>
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b91c1c', fontWeight: 600, marginLeft: 12, fontSize: 14, lineHeight: 1 }}
                aria-label="Dismiss error"
              >✕</button>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: 12, color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="input-field"
                  style={{ paddingRight: 42 }}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0,
                  }}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-submit" style={{ marginTop: 4 }}>
              {isSubmitting ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ fontSize: 13, textAlign: 'center', marginTop: 20, color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default LoginPage
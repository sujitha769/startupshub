import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import type { FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  password: string
}

const AdminSetupPage = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
  })

  const [setupKey, setSetupKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const SETUP_KEY = import.meta.env.VITE_ADMIN_SETUP_KEY

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!SETUP_KEY || setupKey !== SETUP_KEY) {
      setError('Invalid setup key')
      return
    }

    setIsLoading(true)
    try {
      await api.post('/admin/setup', form)

      setSuccess('Admin account created successfully')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Setup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Admin Setup
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center mb-2">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Setup Key */}
          <input
            type="password"
            placeholder="Setup Key"
            value={setupKey}
            onChange={(e) => setSetupKey(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="admin@startupshub.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 chars)"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLoading ? 'Setting up...' : 'Create Admin'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminSetupPage
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface StaffForm {
  name: string
  email: string
  password: string
}

const StaffRegisterPage = () => {
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<StaffForm>({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      // backend assigns STAFF role
      await register(form, '/admin/staff')

      setSuccess('Staff account created! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold">Staff Portal</h1>
          <p className="text-sm text-gray-500">
            Create your staff account
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center mb-2">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="staff@startupshub.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Min 8 characters"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
          >
            {isLoading ? 'Creating...' : 'Create Staff Account'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default StaffRegisterPage
import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../api/axios'

interface Staff {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

const ManageStaffPage = () => {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchStaff = useCallback(async () => {
    try {
      const res = await api.get('/admin/staff')
      setStaffList(res.data.data || [])
    } catch (err) {
      console.error('Failed to fetch staff', err)
    }
  }, [])

  useEffect(() => {
    fetchStaff()
  }, [fetchStaff])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required')
      return
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    try {
      setLoading(true)
      await api.post('/admin/staff', formData)
      
      setSuccess('Staff member created successfully!')
      setFormData({ name: '', email: '', password: '' })
      fetchStaff() // Refresh the list
      setTimeout(() => setShowForm(false), 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create staff')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return
    
    try {
      await api.delete(`/admin/staff/${id}`)
      fetchStaff() // Refresh list
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete staff')
    }
  }

  const filteredStaff = staffList.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Staff</h1>
            <p className="text-gray-500 mt-1">Manage and invite team members to your organization.</p>
          </div>
        </div>

        {/* Action Bar: Search & Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="w-full sm:w-96 relative">
            <input 
              type="text" 
              placeholder="Search staff by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {showForm ? 'Cancel' : '+ Add Staff'}
          </button>
        </div>

        {/* Add Staff Form Toggle */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in slide-in-from-top-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Staff</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-100 text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded border border-green-100 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="md:col-span-3 flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Staff Member'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-800 text-xs uppercase font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{staff.name}</td>
                      <td className="px-6 py-4">{staff.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(staff.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button 
                          onClick={() => alert('Update feature coming soon!')} 
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(staff.id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      {search ? 'No staff members found matching your search.' : 'No staff members found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

export default ManageStaffPage

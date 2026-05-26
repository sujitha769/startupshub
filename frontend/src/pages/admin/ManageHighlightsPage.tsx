import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../api/axios'

interface Highlight {
  id: number
  title: string
  description: string
  icon: string
  createdAt: string
}

const ManageHighlightsPage = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  })
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const fetchHighlights = useCallback(async () => {
    try {
      const res = await api.get('/highlights')
      setHighlights(res.data || [])
    } catch (err) {
      console.error('Failed to fetch highlights', err)
    }
  }, [])

  useEffect(() => {
    fetchHighlights()
  }, [fetchHighlights])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description) {
      setError('Title and Description are required')
      return
    }

    try {
      setLoading(true)
      if (editId) {
        await api.put(`/admin/highlights/${editId}`, formData)
        setSuccess('Highlight updated successfully!')
      } else {
        await api.post('/admin/highlights', formData)
        setSuccess('Highlight added successfully!')
      }
      
      setFormData({ title: '', description: '', icon: '' })
      setEditId(null)
      fetchHighlights()
      setTimeout(() => setShowForm(false), 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save highlight')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (highlight: Highlight) => {
    setFormData({
      title: highlight.title,
      description: highlight.description,
      icon: highlight.icon
    })
    setEditId(highlight.id)
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this highlight?')) return
    
    try {
      await api.delete(`/admin/highlights/${id}`)
      fetchHighlights()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete highlight')
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Highlights</h1>
            <p className="text-gray-500 mt-1">Add or edit the cards shown on the Landing Page.</p>
          </div>
          <button 
            onClick={() => {
              setShowForm(!showForm)
              setEditId(null)
              setFormData({ title: '', description: '', icon: '' })
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancel' : '+ Add Highlight'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in slide-in-from-top-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{editId ? 'Edit Highlight' : 'Add New Highlight'}</h2>
            
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-100 text-sm">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded border border-green-100 text-sm">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Find Clients"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Access exclusive leads..."
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editId ? 'Update Highlight' : 'Add Highlight'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 text-xs uppercase font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {highlights.length > 0 ? (
                highlights.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{item.description}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => handleEdit(item)} 
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No highlights added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  )
}

export default ManageHighlightsPage

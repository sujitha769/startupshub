import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../api/axios'

interface InvestorApplication {
  id: number
  userId: number
  linkedin: string
  investmentExperience: string
  pastInvestments: string
  ticketSize: string
  status: string
  createdAt: string
  user: {
    name: string
    email: string
  }
}

const ManageInvestorsPage = () => {
  const [applications, setApplications] = useState<InvestorApplication[]>([])
  const [loading, setLoading] = useState(true)

  const getOptionalValue = (value?: string) => {
    const normalizedValue = value?.trim()
    return normalizedValue ? normalizedValue : 'Not provided'
  }

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const res = await api.get('/admin/investors')
      setApplications(res.data)
    } catch (err) {
      console.error('Failed to fetch investor applications', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleStatusUpdate = async (userId: number, newStatus: string) => {
    try {
      await api.put(`/admin/investors/${userId}/status`, { status: newStatus })
      fetchApplications()
    } catch (err) {
      alert('Failed to update status')
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Manage Investors</h1>
          <p className="text-sm text-gray-500 mt-1">Review applications for verified investor access.</p>
        </div>

        {loading ? (
          <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
        ) : applications.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-100 text-gray-500">
            No applications found.
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{app.user.name}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold tracking-wide ${
                      app.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                      app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{app.user.email} | Applied on {new Date(app.createdAt).toLocaleDateString()}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">LinkedIn</p>
                      <a href={app.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{app.linkedin}</a>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Ticket Size</p>
                      <p className="text-gray-600">{getOptionalValue(app.ticketSize)}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-semibold text-gray-700">Experience</p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded mt-1">{getOptionalValue(app.investmentExperience)}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-semibold text-gray-700">Past Investments</p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded mt-1">{getOptionalValue(app.pastInvestments)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-end gap-3 md:w-48 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 border-gray-100">
                  {app.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleStatusUpdate(app.userId, 'APPROVED')}
                      className="w-full py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                  )}
                  {app.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleStatusUpdate(app.userId, 'REJECTED')}
                      className="w-full py-2 bg-red-50 text-red-600 rounded font-medium hover:bg-red-100 transition"
                    >
                      Reject
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ManageInvestorsPage

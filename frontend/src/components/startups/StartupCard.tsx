import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

interface Startup {
  id: number
  title: string
  amount: string
  stage: string
  details: string
  contactLink: string
}

interface Props {
  startup: Startup
  onEdit?: (startup: Startup) => void
  onDelete?: () => void
}

const StartupCard = ({ startup, onEdit, onDelete }: Props) => {
  const { user } = useAuth()
  const canManage = user?.role === 'ADMIN' || user?.role === 'STAFF'

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this startup?')) {
      try {
        await api.delete(`/admin/startups/${startup.id}`)
        if (onDelete) onDelete()
      } catch (err) {
        alert('Failed to delete startup')
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative group flex flex-col h-full">
      {canManage && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button onClick={() => onEdit && onEdit(startup)} className="p-1.5 bg-blue-50 text-blue-600 rounded">✎</button>
          <button onClick={handleDelete} className="p-1.5 bg-red-50 text-red-600 rounded">🗑</button>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase">
          {startup.stage}
        </span>
        <span className="font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200 text-[10px]">
          Raising: {startup.amount}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{startup.title}</h3>
      <p className="text-sm text-gray-600 mb-6 flex-grow">{startup.details}</p>

      <a 
        href={startup.contactLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-auto w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
      >
        Contact Founder
      </a>
    </div>
  )
}

export default StartupCard
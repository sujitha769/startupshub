import { useAuth } from '../../context/AuthContext'

interface Props {
  search: string
  setSearch: (value: string) => void
  onAddClick?: () => void
}

const LeadsHeader = ({ search, setSearch, onAddClick }: Props) => {
  const { user } = useAuth()
  const isAdminOrStaff = user?.role === 'ADMIN' || user?.role === 'STAFF'

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
      />
      {isAdminOrStaff && (
        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition whitespace-nowrap"
        >
          + Add Lead
        </button>
      )}
    </div>
  )
}

export default LeadsHeader
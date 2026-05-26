interface AccountDetailsProps {
  name?: string
  email?: string
}

const AccountDetails = ({ name, email }: AccountDetailsProps) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      <h2 className="text-sm font-semibold text-gray-900">Account Details</h2>
    </div>
    <div className="divide-y divide-gray-50">
      {[
        { label: 'Full Name', value: name || 'Not available' },
        { label: 'Email Address', value: email || 'Not available' },
      ].map(({ label, value }) => (
        <div key={label} className="px-6 py-4 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider w-32">{label}</p>
          <p className="text-sm text-gray-800 font-medium flex-1 text-right">{value}</p>
        </div>
      ))}
    </div>
  </div>
)

export default AccountDetails
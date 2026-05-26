const PerksCard = ({ perks }: { perks: string[] }) => {
  if (!perks?.length) return null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Perks & Benefits</h3>
      <ul className="space-y-2.5">
        {perks.map((perk, idx) => (
          <li key={idx} className="flex items-start text-gray-700">
            <svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PerksCard
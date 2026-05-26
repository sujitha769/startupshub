import type { Lead } from '../../../hooks/useLeadDetails'

const BasicInfoCard = ({ lead }: { lead: Lead }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6 md:p-8 border-b border-gray-100">
      <div className="flex gap-3 mb-4">
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{lead.domain}</span>
        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{lead.projectType}</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{lead.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{lead.shortDescription}</p>

      <div className="flex flex-wrap gap-y-4 gap-x-8 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {lead.location}
        </div>
        <div className="flex items-center gap-2 font-semibold text-green-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {lead.budget}
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {lead.duration}
        </div>
      </div>
    </div>

    <div className="p-6 md:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h2>
      <div className="text-gray-600 whitespace-pre-wrap leading-relaxed text-base">
        {lead.fullDescription}
      </div>
    </div>
  </div>
)

export default BasicInfoCard
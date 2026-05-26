import type { Lead } from '../../../hooks/useLeadDetails'

const JobOverviewCard = ({ lead }: { lead: Lead }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h3>
    <ul className="space-y-4">
      <li className="flex justify-between items-center pb-3 border-b border-gray-50">
        <span className="text-gray-500 text-sm">Experience</span>
        <span className="font-medium text-gray-900">{lead.experienceLevel}</span>
      </li>
      <li className="flex justify-between items-center pb-3 border-b border-gray-50">
        <span className="text-gray-500 text-sm">Openings</span>
        <span className="font-medium text-gray-900">{lead.numberOfOpenings}</span>
      </li>
      <li className="flex justify-between items-center pb-3 border-b border-gray-50">
        <span className="text-gray-500 text-sm">Posted On</span>
        <span className="font-medium text-gray-900">{new Date(lead.createdAt).toLocaleDateString()}</span>
      </li>
      {lead.deadline && (
        <li className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Deadline</span>
          <span className="font-medium text-red-600">{new Date(lead.deadline).toLocaleDateString()}</span>
        </li>
      )}
    </ul>
  </div>
)

export default JobOverviewCard
import type { Lead } from '../../../hooks/useLeadDetails'

const SkillsCard = ({ lead }: { lead: Lead }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills & Requirements</h2>

    <div className="space-y-6">
      {lead.skillsRequired?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {lead.skillsRequired.map((skill, idx) => (
              <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-100">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {lead.toolsTechnologies?.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Tools & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {lead.toolsTechnologies.map((tool, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Eligibility Criteria</h3>
          <p className="text-gray-900">{lead.eligibilityCriteria}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Portfolio Required</h3>
          <p className="text-gray-900 font-medium">
            {lead.portfolioRequired ? 'Yes, must provide portfolio' : 'No, not required'}
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default SkillsCard
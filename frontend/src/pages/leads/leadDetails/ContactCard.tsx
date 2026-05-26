import type { Lead } from '../../../hooks/useLeadDetails'

const ContactCard = ({ lead }: { lead: Lead }) => (
  <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-6">
    <h3 className="text-lg font-semibold text-blue-900 mb-4">Contact Employer</h3>

    <div className="space-y-4">
      <div>
        <p className="text-xs text-blue-600/70 font-semibold uppercase tracking-wider mb-1">Contact Person</p>
        <p className="font-medium text-blue-900">{lead.contactName}</p>
      </div>

      <div>
        <p className="text-xs text-blue-600/70 font-semibold uppercase tracking-wider mb-1">Email</p>
        <a href={`mailto:${lead.contactEmail}`} className="text-blue-700 hover:text-blue-900 underline underline-offset-2 break-all">
          {lead.contactEmail}
        </a>
      </div>

      <div>
        <p className="text-xs text-blue-600/70 font-semibold uppercase tracking-wider mb-1">Phone</p>
        <a href={`tel:${lead.phoneNumber}`} className="text-blue-700 hover:text-blue-900">
          {lead.phoneNumber}
        </a>
      </div>

      {lead.websiteUrl && (
        <div>
          <p className="text-xs text-blue-600/70 font-semibold uppercase tracking-wider mb-1">Website</p>
          <a href={lead.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline underline-offset-2 break-all">
            {lead.websiteUrl}
          </a>
        </div>
      )}

      <div className="pt-2 border-t border-blue-200/60 mt-2">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Preferred Method:</span> {lead.preferredContactMethod}
        </p>
      </div>
    </div>
  </div>
)

export default ContactCard
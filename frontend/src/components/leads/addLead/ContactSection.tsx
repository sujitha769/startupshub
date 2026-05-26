import type { ChangeEvent } from 'react'
import { CONTACT_METHODS } from './constants'

interface Props {
  form: any
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const inputCls = 'w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500'

const ContactSection = ({ form, onChange }: Props) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-red-600 flex items-center">
      <span className="mr-2">🟥</span> 5. Contact Details (CRITICAL)
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
        <input required name="contactName" placeholder="Full Name"
          value={form.contactName} onChange={onChange} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input required type="email" name="contactEmail" placeholder="email@company.com"
          value={form.contactEmail} onChange={onChange} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input required name="phoneNumber" placeholder="+1 234 567 890"
          value={form.phoneNumber} onChange={onChange} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Website / Company URL</label>
        <input type="url" name="websiteUrl" placeholder="https://..."
          value={form.websiteUrl} onChange={onChange} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
        <select name="preferredContactMethod" value={form.preferredContactMethod}
          onChange={onChange} className={inputCls}>
          {CONTACT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
    </div>
  </div>
)

export default ContactSection
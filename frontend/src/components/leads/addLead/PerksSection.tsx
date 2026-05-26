import type { ChangeEvent } from 'react'

interface Props {
  form: any
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const PerksSection = ({ form, onChange }: Props) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-purple-700 flex items-center">
      <span className="mr-2">🟪</span> 4. Perks / Benefits
    </h3>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Perks (comma-separated)</label>
      <input name="perks" placeholder="Certificate, Flexible hours, Paid bonus"
        value={form.perks} onChange={onChange}
        className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500" />
    </div>
  </div>
)

export default PerksSection
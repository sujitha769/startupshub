import type { ChangeEvent } from 'react'

interface Props {
  form: any
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const inputCls = 'w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500'

const SkillsSection = ({ form, onChange }: Props) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-green-700 flex items-center">
      <span className="mr-2">🟩</span> 3. Skills & Requirements
    </h3>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required (comma-separated)</label>
      <input required name="skillsRequired" placeholder="React, Node, Figma"
        value={form.skillsRequired} onChange={onChange} className={inputCls} />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Tools / Technologies (comma-separated)</label>
      <input name="toolsTechnologies" placeholder="AWS, Docker, VS Code"
        value={form.toolsTechnologies} onChange={onChange} className={inputCls} />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
      <input required name="eligibilityCriteria" placeholder="e.g., Must have a degree, 3+ years exp."
        value={form.eligibilityCriteria} onChange={onChange} className={inputCls} />
    </div>

    <div className="flex items-center mt-2">
      <input type="checkbox" id="portfolio" name="portfolioRequired"
        checked={form.portfolioRequired} onChange={onChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
      <label htmlFor="portfolio" className="ml-2 block text-sm text-gray-700">Portfolio Required?</label>
    </div>
  </div>
)

export default SkillsSection
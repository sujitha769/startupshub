import type { ChangeEvent } from 'react'
import { PROJECT_TYPES, DURATIONS, EXP_LEVELS } from './constants'

interface Props {
  form: any
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

const inputCls = 'w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500'

const WorkDetailsSection = ({ form, onChange }: Props) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-yellow-600 flex items-center">
      <span className="mr-2">🟨</span> 2. Work Details
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
        <select name="projectType" value={form.projectType} onChange={onChange} className={inputCls}>
          {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
        <select name="duration" value={form.duration} onChange={onChange} className={inputCls}>
          {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
        <select name="experienceLevel" value={form.experienceLevel} onChange={onChange} className={inputCls}>
          {EXP_LEVELS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Openings</label>
        <input required type="number" min="1" name="numberOfOpenings"
          value={form.numberOfOpenings} onChange={onChange} className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline (Optional)</label>
        <input type="date" name="deadline" value={form.deadline} onChange={onChange} className={inputCls} />
      </div>
    </div>
  </div>
)

export default WorkDetailsSection
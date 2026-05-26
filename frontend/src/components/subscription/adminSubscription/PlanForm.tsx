import type { PlanFormState } from '../../../hooks/useAdminSubscription'

const inputCls = 'w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100'

interface Props {
  form: PlanFormState
  setForm: React.Dispatch<React.SetStateAction<PlanFormState>>
  editingPlanId: number | null
  isSaving: boolean
  message: string
  error: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancelEdit: () => void
}

const PlanForm = ({ form, setForm, editingPlanId, isSaving, message, error, onSubmit, onCancelEdit }: Props) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
        Subscription Form
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Create and manage plans</h2>
      <p className="text-sm text-slate-500">
        Add pricing, duration, and feature details for the plans users can subscribe to.
      </p>
    </div>

    <form onSubmit={onSubmit} className="mt-6 space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Plan name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
            placeholder="Pro Monthly"
            className={inputCls}
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Price in INR</span>
          <input
            type="number"
            min="1"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((c) => ({ ...c, amount: e.target.value }))}
            placeholder="999"
            className={inputCls}
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Plan description</span>
        <textarea
          value={form.description}
          onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
          placeholder="Best for founders who need full lead access and faster outreach."
          rows={4}
          className={inputCls}
          required
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Duration in days</span>
          <input
            type="number"
            min="1"
            step="1"
            value={form.durationInDays}
            onChange={(e) => setForm((c) => ({ ...c, durationInDays: e.target.value }))}
            placeholder="30"
            className={inputCls}
            required
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((c) => ({ ...c, isActive: e.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">
            Keep this plan active for new subscriptions
          </span>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Features</span>
        <textarea
          value={form.features}
          onChange={(e) => setForm((c) => ({ ...c, features: e.target.value }))}
          placeholder={'Unlimited lead previews\nFull lead detail access\nPriority support'}
          rows={5}
          className={inputCls}
        />
        <p className="mt-2 text-xs text-slate-400">Add one feature per line.</p>
      </label>

      {(message || error) && (
        <div className={`rounded-2xl px-4 py-3 text-sm ${
          error
            ? 'border border-rose-200 bg-rose-50 text-rose-700'
            : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
        }`}>
          {error || message}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSaving ? 'Saving plan...' : editingPlanId ? 'Update plan' : 'Create plan'}
        </button>

        {editingPlanId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel edit
          </button>
        )}
      </div>
    </form>
  </div>
)

export default PlanForm
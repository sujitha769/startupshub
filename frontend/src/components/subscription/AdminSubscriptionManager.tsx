import { useAdminSubscription } from '../../hooks/useAdminSubscription'
import PlanForm from './adminSubscription/PlanForm'
import PlanList from './adminSubscription/PlanList'

const AdminSubscriptionManager = () => {
  const {
    plans,
    form, setForm,
    editingPlanId,
    isLoadingPlans,
    isSaving,
    message,
    error,
    resetForm,
    handleEdit,
    handleSubmit,
    handleTogglePlan,
  } = useAdminSubscription()

  return (
    <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <PlanForm
        form={form}
        setForm={setForm}
        editingPlanId={editingPlanId}
        isSaving={isSaving}
        message={message}
        error={error}
        onSubmit={handleSubmit}
        onCancelEdit={resetForm}
      />
      <PlanList
        plans={plans}
        isLoadingPlans={isLoadingPlans}
        onEdit={handleEdit}
        onToggle={handleTogglePlan}
      />
    </section>
  )
}

export default AdminSubscriptionManager
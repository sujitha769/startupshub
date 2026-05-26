import { useState } from 'react'
import type { ChangeEvent } from 'react'
import api from '../api/axios'
import { DOMAINS, LOCATIONS, BUDGET_TYPES, PROJECT_TYPES, DURATIONS, EXP_LEVELS, CONTACT_METHODS } from '../components/leads/addLead/constants'

export const useAddLeadForm = (initialData: any, onClose: () => void, onSuccess?: () => void) => {
  let initBudgetType = BUDGET_TYPES[0]
  let initBudgetAmt = initialData?.budget || ''
  if (initialData?.budget?.includes(':')) {
    const parts = initialData.budget.split(':')
    initBudgetType = parts[0].trim()
    initBudgetAmt = parts.slice(1).join(':').trim()
  }

  const [form, setForm] = useState({
    title: initialData?.title || '',
    shortDescription: initialData?.shortDescription || '',
    fullDescription: initialData?.fullDescription || '',
    domain: initialData?.domain || DOMAINS[0],
    location: initialData?.location || LOCATIONS[0],
    budget: initBudgetAmt,
    budgetType: initBudgetType,
    projectType: initialData?.projectType || PROJECT_TYPES[0],
    duration: initialData?.duration || DURATIONS[0],
    experienceLevel: initialData?.experienceLevel || EXP_LEVELS[0],
    numberOfOpenings: initialData?.numberOfOpenings || 1,
    deadline: initialData?.deadline || '',
    skillsRequired: initialData?.skillsRequired?.join(', ') || '',
    toolsTechnologies: initialData?.toolsTechnologies?.join(', ') || '',
    eligibilityCriteria: initialData?.eligibilityCriteria || '',
    portfolioRequired: initialData?.portfolioRequired || false,
    perks: initialData?.perks?.join(', ') || '',
    contactName: initialData?.contactName || '',
    contactEmail: initialData?.contactEmail || '',
    phoneNumber: initialData?.phoneNumber || '',
    websiteUrl: initialData?.websiteUrl || '',
    preferredContactMethod: initialData?.preferredContactMethod || CONTACT_METHODS[0],
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = {
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        domain: form.domain,
        location: form.location,
        budget: `${form.budgetType}: ${form.budget}`,
        projectType: form.projectType,
        duration: form.duration,
        experienceLevel: form.experienceLevel,
        numberOfOpenings: form.numberOfOpenings,
        deadline: form.deadline,
        skillsRequired: form.skillsRequired.split(',').map((s: string) => s.trim()).filter(Boolean),
        toolsTechnologies: form.toolsTechnologies.split(',').map((s: string) => s.trim()).filter(Boolean),
        eligibilityCriteria: form.eligibilityCriteria,
        portfolioRequired: form.portfolioRequired,
        perks: form.perks.split(',').map((s: string) => s.trim()).filter(Boolean),
        contactName: form.contactName,
        contactEmail: form.contactEmail,
        phoneNumber: form.phoneNumber,
        websiteUrl: form.websiteUrl,
        preferredContactMethod: form.preferredContactMethod,
      }

      if (initialData?.id) {
        await api.put(`/leads/${initialData.id}`, payload)
      } else {
        await api.post('/leads', payload)
      }

      if (onSuccess) onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save lead')
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, error, handleChange, handleSubmit }
}
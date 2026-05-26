import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { getApiStatus } from '../utils/api'

export interface Lead {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  domain: string
  location: string
  budget: string
  projectType: string
  duration: string
  experienceLevel: string
  numberOfOpenings: number
  deadline?: string
  skillsRequired: string[]
  toolsTechnologies: string[]
  eligibilityCriteria: string
  portfolioRequired: boolean
  perks: string[]
  contactName: string
  contactEmail: string
  phoneNumber: string
  websiteUrl?: string
  preferredContactMethod: string
  createdAt: string
  updatedAt: string
}

export const useLeadDetails = () => {
  const { id } = useParams()
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLocked, setIsLocked] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  const fetchLead = useCallback(async () => {
    try {
      setLoading(true)
      setIsLocked(false)
      const res = await api.get(`/leads/${id}`)
      setLead(res.data)
    } catch (error) {
      if (getApiStatus(error) === 403) {
        setLead(null)
        setIsLocked(true)
        setShowSubscriptionModal(true)
        return
      }
      console.error('Failed to fetch lead details', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void fetchLead()
  }, [fetchLead])

  return { lead, loading, isLocked, showSubscriptionModal, setShowSubscriptionModal, fetchLead }
}
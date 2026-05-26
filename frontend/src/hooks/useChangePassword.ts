import { useState } from 'react'
import api from '../api/axios'

export type PasswordStep = 'idle' | 'verify-old' | 'set-new'

export const useChangePassword = () => {
  const [pwStep, setPwStep] = useState<PasswordStep>('idle')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState<string | null>(null)
  const [pwSuccess, setPwSuccess] = useState<string | null>(null)

  const resetPasswordState = () => {
    setPwStep('idle')
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPwError(null)
    setShowOld(false)
    setShowNew(false)
    setShowConfirm(false)
  }

  const handleVerifyOld = async () => {
    if (!oldPassword) { setPwError('Please enter your current password'); return }
    setPwLoading(true)
    setPwError(null)
    try {
      await api.post('/auth/verify-password', { password: oldPassword })
      setPwStep('set-new')
    } catch (err: any) {
      setPwError(err?.response?.data?.message || 'Current password is incorrect')
    } finally {
      setPwLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setPwError(null)
    if (!newPassword || !confirmPassword) { setPwError('Please fill in all fields'); return }
    if (newPassword !== confirmPassword) { setPwError('New passwords do not match'); return }
    if (newPassword.length < 8) { setPwError('Password must be at least 8 characters'); return }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(newPassword)) {
      setPwError('Password must contain uppercase, lowercase, and a number')
      return
    }
    setPwLoading(true)
    try {
      await api.post('/auth/change-password', { oldPassword, newPassword })
      setPwSuccess('Password changed successfully!')
      resetPasswordState()
    } catch (err: any) {
      setPwError(err?.response?.data?.message || 'Failed to change password')
    } finally {
      setPwLoading(false)
    }
  }

  return {
    pwStep, setPwStep,
    oldPassword, setOldPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    showOld, setShowOld,
    showNew, setShowNew,
    showConfirm, setShowConfirm,
    pwLoading, pwError, pwSuccess,
    resetPasswordState,
    handleVerifyOld,
    handleChangePassword,
  }
}
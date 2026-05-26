import axios from 'axios'

interface ApiErrorResponse {
  message?: string
}

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message || fallback
  }

  return fallback
}

export const getApiStatus = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.status
  }

  return undefined
}

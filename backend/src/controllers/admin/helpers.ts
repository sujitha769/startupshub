export const parseId = (idParam: string | string[]): number => {
  const id = Array.isArray(idParam) ? idParam[0] : idParam
  const parsed = Number(id)

  if (isNaN(parsed)) {
    throw new Error('INVALID_ID')
  }

  return parsed
}
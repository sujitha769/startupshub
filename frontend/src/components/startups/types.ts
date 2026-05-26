// frontend/src/components/startups/types.ts

export interface Startup {
  id: number
  title: string
  amount: string
  stage: string
  details: string
  contactLink: string
}

export interface StartupFilters {
  search: string
  stage: string
  amountRange: string
}

export const STAGES = [
  'All',
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Series D+',
  'Bridge Round',
  'Angel Round',
  'Bootstrapped',
  'IPO Ready',
  'Other',
]

export const AMOUNT_RANGES = [
  'All',
  'Under $100K',
  '$100K – $500K',
  '$500K – $1M',
  '$1M – $5M',
  '$5M – $10M',
  '$10M+',
]
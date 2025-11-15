export interface POC {
  name: string
  email: string
}

export interface ValueBreakdown {
  category: string
  value: number
}

export interface RFPSubmission {
  id: string
  clientName: string
  poCs: POC[] // Changed from pocName string to array of POC objects
  geo: string
  submissionDate: string
  guidewireProducts: string[]
  insuranceProducts: string[]
  commercial: boolean
  personal: boolean
  specialty: boolean
  implementation: boolean
  productStrategy: boolean
  programTesting: boolean
  pmo: boolean
  amsOperate: boolean
  cloudSelfManaged: 'Cloud' | 'Self-Managed'
  cloudPlatform?: 'AWS' | 'GCP' | 'Azure'
  newMigrationUpgrade: 'New' | 'Migration' | 'Upgrade'
  liveInFlightRfp: ('Live' | 'In-Flight' | 'RFP')[]
  outcome: 'Won' | 'Lost' | 'Pending'
  totalImplementations: number
  valueBreakdown: ValueBreakdown[]
  numberOfHours: number
  duration: {
    value: number
    unit: 'weeks' | 'months' | 'years'
  }
  deltaVariance: number | null
  numberOfIntegrations: number | null
  artifactPresent: 'Yes' | 'No'
  projectData: {
    name: string
    link: string
  }
  comments: string
  documentsAvailable: string[]
}

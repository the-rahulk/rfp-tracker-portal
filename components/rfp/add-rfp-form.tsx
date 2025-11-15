'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'

interface AddRFPFormProps {
  onSuccess: () => void
}

// Comprehensive country list
const countryList = [
  'United States', 'Canada', 'Mexico', 'United Kingdom', 'Ireland', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands',
  'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary',
  'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore', 'India', 'China', 'Hong Kong', 'Malaysia', 'Thailand',
  'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'South Africa', 'United Arab Emirates', 'Saudi Arabia'
]

const newMigrationUpgradeOptions = ['New', 'Migration', 'Upgrade']
const liveInFlightRfpOptions = ['Live', 'In-Flight', 'RFP']
const outcomeOptions = ['Won', 'Lost', 'Pending']
const durationUnits = ['weeks', 'months', 'years']

interface POCEntry {
  id: string
  name: string
  email: string
}

interface ProductEntry {
  id: string
  name: string
}

interface ValueEntry {
  id: string
  label: string
  amount: string
}

interface DocumentEntry {
  id: string
  name: string
}

export function AddRFPForm({ onSuccess }: AddRFPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [pocList, setPocList] = useState<POCEntry[]>([{ id: '1', name: '', email: '' }])
  const [guidewireList, setGuidewireList] = useState<ProductEntry[]>([{ id: '1', name: '' }])
  const [insuranceList, setInsuranceList] = useState<ProductEntry[]>([{ id: '1', name: '' }])
  const [valueList, setValueList] = useState<ValueEntry[]>([{ id: '1', label: '', amount: '' }])
  const [documentList, setDocumentList] = useState<DocumentEntry[]>([])
  const [filteredCountries, setFilteredCountries] = useState<string[]>([])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  const [formData, setFormData] = useState({
    clientName: '',
    geo: '',
    submissionDate: '',
    guidewireProducts: [] as string[],
    insuranceProducts: [] as string[],
    commercial: false,
    personal: false,
    specialty: false,
    implementation: false,
    productStrategy: false,
    programTesting: false,
    pmo: false,
    amsOperate: false,
    cloudSelfManaged: 'Self-Managed' as const,
    cloudPlatform: '',
    newMigrationUpgrade: '',
    liveInFlightRfp: [] as string[],
    outcome: '',
    totalImplementations: 1,
    numberOfHours: 0,
    durationValue: 36,
    durationUnit: 'months',
    deltaVariance: '',
    numberOfIntegrations: '',
    artifactPresent: false,
    projectDataName: '',
    projectDataLink: '',
    comments: '',
    documentsAvailable: false,
  })

  const handleCountrySearch = (value: string) => {
    setFormData({ ...formData, geo: value })
    if (value.trim()) {
      const filtered = countryList.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCountries(filtered)
      setShowCountryDropdown(true)
    } else {
      setFilteredCountries([])
      setShowCountryDropdown(false)
    }
  }

  const selectCountry = (country: string) => {
    setFormData({ ...formData, geo: country })
    setShowCountryDropdown(false)
    setFilteredCountries([])
  }

  const addPOC = () => {
    setPocList([...pocList, { id: String(Date.now()), name: '', email: '' }])
  }

  const removePOC = (id: string) => {
    if (pocList.length > 1) {
      setPocList(pocList.filter((poc) => poc.id !== id))
    }
  }

  const updatePOC = (id: string, field: 'name' | 'email', value: string) => {
    setPocList(pocList.map((poc) => (poc.id === id ? { ...poc, [field]: value } : poc)))
  }

  const addGuidewareProduct = () => {
    setGuidewireList([...guidewireList, { id: String(Date.now()), name: '' }])
  }

  const removeGuidewareProduct = (id: string) => {
    if (guidewireList.length > 1) {
      setGuidewireList(guidewireList.filter((p) => p.id !== id))
    }
  }

  const updateGuidewareProduct = (id: string, name: string) => {
    setGuidewireList(guidewireList.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  const addInsuranceProduct = () => {
    setInsuranceList([...insuranceList, { id: String(Date.now()), name: '' }])
  }

  const removeInsuranceProduct = (id: string) => {
    if (insuranceList.length > 1) {
      setInsuranceList(insuranceList.filter((p) => p.id !== id))
    }
  }

  const updateInsuranceProduct = (id: string, name: string) => {
    setInsuranceList(insuranceList.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  const addValue = () => {
    setValueList([...valueList, { id: String(Date.now()), label: '', amount: '' }])
  }

  const removeValue = (id: string) => {
    if (valueList.length > 1) {
      setValueList(valueList.filter((v) => v.id !== id))
    }
  }

  const updateValue = (id: string, field: 'label' | 'amount', value: string) => {
    setValueList(valueList.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  const addDocument = () => {
    setDocumentList([...documentList, { id: String(Date.now()), name: '' }])
  }

  const removeDocument = (id: string) => {
    setDocumentList(documentList.filter((d) => d.id !== id))
  }

  const updateDocument = (id: string, name: string) => {
    setDocumentList(documentList.map((d) => (d.id === id ? { ...d, name } : d)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const submissionData = {
      ...formData,
      poCs: pocList.filter((p) => p.name && p.email),
      guidewireProducts: guidewireList.filter((p) => p.name).map((p) => p.name),
      insuranceProducts: insuranceList.filter((p) => p.name).map((p) => p.name),
      valueBreakdown: valueList.filter((v) => v.label && v.amount),
      documentsAvailable: documentList.filter((d) => d.name).map((d) => d.name),
    }
    console.log('RFP Submitted:', submissionData)
    setTimeout(() => {
      onSuccess()
    }, 1000)
  }

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.clientName &&
        pocList.some((p) => p.name && p.email) &&
        formData.geo &&
        formData.submissionDate
      )
    }
    if (currentStep === 2) {
      return (
        guidewireList.some((p) => p.name) &&
        insuranceList.some((p) => p.name)
      )
    }
    if (currentStep === 3) {
      return (
        (formData.commercial || formData.personal || formData.specialty || formData.implementation || formData.productStrategy || formData.programTesting || formData.pmo || formData.amsOperate) &&
        formData.newMigrationUpgrade &&
        formData.liveInFlightRfp.length > 0
      )
    }
    if (currentStep === 4) {
      return formData.cloudSelfManaged && (formData.cloudSelfManaged === 'Self-Managed' || formData.cloudPlatform) && formData.outcome && formData.totalImplementations > 0
    }
    if (currentStep === 5) {
      return valueList.some((v) => v.label && v.amount) && formData.numberOfHours > 0 && formData.projectDataLink && (!formData.documentsAvailable || documentList.some((d) => d.name))
    }
    return true
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Bar */}
      <div>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-colors ${
                step <= currentStep ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Step {currentStep} of 5</p>
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="premium-card space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Client Name *</label>
            <input
              type="text"
              required
              placeholder="Enter client name"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-foreground">Points of Contact (POC) *</label>
              <button
                type="button"
                onClick={addPOC}
                className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-3 py-1 rounded-md hover:bg-accent/90 transition-colors"
              >
                <Plus size={14} /> Add POC
              </button>
            </div>
            <div className="space-y-3">
              {pocList.map((poc, index) => (
                <div key={poc.id} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="POC Name"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                      value={poc.name}
                      onChange={(e) => updatePOC(poc.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                      value={poc.email}
                      onChange={(e) => updatePOC(poc.id, 'email', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePOC(poc.id)}
                    disabled={pocList.length === 1}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
            <input
              type="text"
              required
              placeholder="Type to search countries..."
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.geo}
              onChange={(e) => handleCountrySearch(e.target.value)}
              onFocus={() => formData.geo && setShowCountryDropdown(true)}
            />
            {showCountryDropdown && filteredCountries.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-border rounded-lg bg-background shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => selectCountry(country)}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Submission Date *</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.submissionDate}
              onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Step 2: Products */}
      {currentStep === 2 && (
        <div className="premium-card space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Select Products</h2>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-foreground">Guidewire Products *</label>
              <button
                type="button"
                onClick={addGuidewareProduct}
                className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-3 py-1 rounded-md hover:bg-accent/90 transition-colors"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>
            <div className="space-y-2">
              {guidewireList.map((product) => (
                <div key={product.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="e.g., Policy Center, Billing Center, Claim Center"
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    value={product.name}
                    onChange={(e) => updateGuidewareProduct(product.id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeGuidewareProduct(product.id)}
                    disabled={guidewireList.length === 1}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-foreground">Insurance Products *</label>
              <button
                type="button"
                onClick={addInsuranceProduct}
                className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-3 py-1 rounded-md hover:bg-accent/90 transition-colors"
              >
                <Plus size={14} /> Add Product
              </button>
            </div>
            <div className="space-y-2">
              {insuranceList.map((product) => (
                <div key={product.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="e.g., Auto, Excess Casualty, WC, CL"
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    value={product.name}
                    onChange={(e) => updateInsuranceProduct(product.id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeInsuranceProduct(product.id)}
                    disabled={insuranceList.length === 1}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Services & Implementation */}
      {currentStep === 3 && (
        <div className="premium-card space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Services & Implementation Type</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Services *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'commercial', label: 'Commercial' },
                { key: 'personal', label: 'Personal' },
                { key: 'specialty', label: 'Specialty' },
                { key: 'implementation', label: 'Implementation' },
                { key: 'productStrategy', label: 'Product Strategy' },
                { key: 'programTesting', label: 'Program Testing' },
                { key: 'pmo', label: 'PMO' },
                { key: 'amsOperate', label: 'AMS/Operate' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData[key as keyof typeof formData] as boolean}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Type (New/Migration/Upgrade) *</label>
              <select
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.newMigrationUpgrade}
                onChange={(e) => setFormData({ ...formData, newMigrationUpgrade: e.target.value })}
              >
                <option value="">Select type</option>
                {newMigrationUpgradeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Phase (Live/In-Flight/RFP) *</label>
              <div className="flex flex-col gap-2">
                {liveInFlightRfpOptions.map((phase) => (
                  <label key={phase} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.liveInFlightRfp.includes(phase)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            liveInFlightRfp: [...formData.liveInFlightRfp, phase],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            liveInFlightRfp: formData.liveInFlightRfp.filter((p) => p !== phase),
                          })
                        }
                      }}
                      className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="text-sm font-medium text-foreground">{phase}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Deployment & Outcome */}
      {currentStep === 4 && (
        <div className="premium-card space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Deployment & Outcome</h2>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Deployment Type *</label>
            <select
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.cloudSelfManaged}
              onChange={(e) => setFormData({ ...formData, cloudSelfManaged: e.target.value as 'Cloud' | 'Self-Managed', cloudPlatform: '' })}
            >
              <option value="Self-Managed">Self-Managed</option>
              <option value="Cloud">Cloud</option>
            </select>
          </div>

          {formData.cloudSelfManaged === 'Cloud' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cloud Platform *</label>
              <select
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.cloudPlatform}
                onChange={(e) => setFormData({ ...formData, cloudPlatform: e.target.value })}
              >
                <option value="">Select platform</option>
                {['AWS', 'GCP', 'Azure'].map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Outcome *</label>
            <select
              required
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
            >
              <option value="">Select outcome</option>
              {outcomeOptions.map((outcome) => (
                <option key={outcome} value={outcome}>
                  {outcome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Total Number of Implementations *</label>
            <input
              type="number"
              required
              min="1"
              placeholder="Enter number"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.totalImplementations}
              onChange={(e) => setFormData({ ...formData, totalImplementations: parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>
      )}

      {/* Step 5: Financial & Delivery Details */}
      {currentStep === 5 && (
        <div className="premium-card space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Financial & Delivery Details</h2>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-foreground">Value ($) - Multiple Breakdowns *</label>
              <button
                type="button"
                onClick={addValue}
                className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-3 py-1 rounded-md hover:bg-accent/90 transition-colors"
              >
                <Plus size={14} /> Add Value
              </button>
            </div>
            <div className="space-y-3">
              {valueList.map((value) => (
                <div key={value.id} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="e.g., Implementation Lite + Full"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                      value={value.label}
                      onChange={(e) => updateValue(value.id, 'label', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="e.g., $10.4M"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                      value={value.amount}
                      onChange={(e) => updateValue(value.id, 'amount', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeValue(value.id)}
                    disabled={valueList.length === 1}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">No. of Hours *</label>
            <input
              type="number"
              required
              min="0"
              placeholder="Enter hours"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.numberOfHours}
              onChange={(e) => setFormData({ ...formData, numberOfHours: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Duration Value *</label>
              <input
                type="number"
                required
                min="1"
                placeholder="Enter duration"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.durationValue}
                onChange={(e) => setFormData({ ...formData, durationValue: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Duration Unit *</label>
              <select
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.durationUnit}
                onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value })}
              >
                {durationUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Delta (% variance from OOTB)</label>
              <input
                type="text"
                placeholder="e.g., 0.1 or NA"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.deltaVariance}
                onChange={(e) => setFormData({ ...formData, deltaVariance: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">No. of Integrations</label>
              <input
                type="text"
                placeholder="e.g., 28 or NA"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.numberOfIntegrations}
                onChange={(e) => setFormData({ ...formData, numberOfIntegrations: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="artifactPresent"
              checked={formData.artifactPresent}
              onChange={(e) => setFormData({ ...formData, artifactPresent: e.target.checked })}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <label htmlFor="artifactPresent" className="text-sm font-medium text-foreground cursor-pointer">
              Artifact Present
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Data Name</label>
              <input
                type="text"
                placeholder="Project name or title"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.projectDataName}
                onChange={(e) => setFormData({ ...formData, projectDataName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Data Link (SharePoint) *</label>
              <input
                type="url"
                required
                placeholder="https://sharepoint.company.com/..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.projectDataLink}
                onChange={(e) => setFormData({ ...formData, projectDataLink: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
            <textarea
              placeholder="Add any additional notes or comments"
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="documentsAvailable"
              checked={formData.documentsAvailable}
              onChange={(e) => setFormData({ ...formData, documentsAvailable: e.target.checked, documentsAvailableList: e.target.checked ? [] : undefined })}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <label htmlFor="documentsAvailable" className="text-sm font-medium text-foreground cursor-pointer">
              Documents Available
            </label>
          </div>

          {formData.documentsAvailable && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-foreground">Add Documents</label>
                <button
                  type="button"
                  onClick={addDocument}
                  className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-3 py-1 rounded-md hover:bg-accent/90 transition-colors"
                >
                  <Plus size={14} /> Add Document
                </button>
              </div>
              <div className="space-y-2">
                {documentList.map((doc) => (
                  <div key={doc.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Document name"
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                      value={doc.name}
                      onChange={(e) => updateDocument(doc.id, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeDocument(doc.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <Button
          type="button"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="bg-muted hover:bg-muted/80 text-muted-foreground font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          Previous
        </Button>

        {currentStep < 5 ? (
          <Button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!isStepValid()}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting || !isStepValid()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RFP'}
          </Button>
        )}
      </div>
    </form>
  )
}

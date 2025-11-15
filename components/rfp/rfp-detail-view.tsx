'use client'

import { useState } from 'react'
import type { RFPSubmission } from '@/lib/types'
import { ExternalLink, Download } from 'lucide-react'

interface RFPDetailViewProps {
  rfp: RFPSubmission
}

export function RFPDetailView({ rfp }: RFPDetailViewProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Lost':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value)
  }

  const totalValue = rfp.valueBreakdown.reduce((sum, item) => sum + item.value, 0)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="premium-card">
            <h1 className="text-3xl font-bold text-foreground mb-2">{rfp.clientName}</h1>
            <p className="text-muted-foreground mb-4">RFP ID: {rfp.id}</p>
            <div className="flex flex-wrap gap-2">
              <span className={`px-4 py-2 text-sm font-semibold rounded-lg ${getStatusColor(rfp.outcome)}`}>
                {rfp.outcome}
              </span>
              <span className="px-4 py-2 text-sm font-semibold bg-muted rounded-lg text-foreground">
                {rfp.newMigrationUpgrade}
              </span>
              <span className="px-4 py-2 text-sm font-semibold bg-muted rounded-lg text-foreground">
                {rfp.cloudSelfManaged}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2">
          <div className="premium-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Financial Overview</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                <p className="text-2xl font-bold text-accent">{formatCurrency(totalValue)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Hours</p>
                  <p className="text-lg font-semibold text-foreground">{rfp.numberOfHours.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="text-lg font-semibold text-foreground">{rfp.duration.value} {rfp.duration.unit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="premium-card mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Submission Date</p>
            <p className="text-sm font-semibold text-foreground">{new Date(rfp.submissionDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Geography</p>
            <p className="text-sm font-semibold text-foreground">{rfp.geo}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Implementation Type</p>
            <p className="text-sm font-semibold text-foreground">{rfp.newMigrationUpgrade}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Phase</p>
            <div className="flex flex-wrap gap-1">
              {rfp.liveInFlightRfp.map((phase) => (
                <span key={phase} className="px-2 py-1 text-xs font-medium bg-muted rounded">
                  {phase}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* POC Section */}
      <div className="premium-card mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Points of Contact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rfp.poCs.map((poc, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold text-foreground mb-1">{poc.name}</p>
              <a href={`mailto:${poc.email}`} className="text-sm text-accent hover:underline">
                {poc.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-4 border-b border-border overflow-x-auto">
          {['products', 'services', 'financial', 'details'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Guidewire Products</h3>
              <div className="space-y-2">
                {rfp.guidewireProducts.map((product) => (
                  <div key={product} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-foreground">{product}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Insurance Products</h3>
              <div className="space-y-2">
                {rfp.insuranceProducts.map((product) => (
                  <div key={product} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-foreground">{product}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="premium-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Services & Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { label: 'Commercial', value: rfp.commercial },
                { label: 'Personal', value: rfp.personal },
                { label: 'Specialty', value: rfp.specialty },
                { label: 'Implementation', value: rfp.implementation },
                { label: 'Product Strategy', value: rfp.productStrategy },
                { label: 'Program Testing', value: rfp.programTesting },
                { label: 'PMO', value: rfp.pmo },
                { label: 'AMS/Operate', value: rfp.amsOperate },
              ].map((service) => (
                <div key={service.label} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center ${service.value ? 'bg-accent border-accent' : 'border-border'}`}>
                    {service.value && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-6">
            {/* Value Breakdown */}
            <div className="premium-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Value Breakdown</h3>
              <div className="space-y-3">
                {rfp.valueBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                    <span className="text-lg font-bold text-accent">{formatCurrency(item.value)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Total Value</span>
                  <span className="text-xl font-bold text-accent">{formatCurrency(totalValue)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Metrics */}
            <div className="premium-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Total Hours</p>
                  <p className="text-2xl font-bold text-foreground">{rfp.numberOfHours.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Duration</p>
                  <p className="text-lg font-semibold text-foreground">{rfp.duration.value} {rfp.duration.unit}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Delta (OOTB Variance)</p>
                  <p className={`text-lg font-bold ${rfp.deltaVariance === null ? 'text-muted-foreground' : rfp.deltaVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {rfp.deltaVariance === null ? 'NA' : `${rfp.deltaVariance > 0 ? '+' : ''}${rfp.deltaVariance.toFixed(2)}%`}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">No. of Integrations</p>
                  <p className="text-2xl font-bold text-foreground">{rfp.numberOfIntegrations ?? 'NA'}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Artifact Present</p>
                  <p className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${rfp.artifactPresent === 'Yes' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                    {rfp.artifactPresent}
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Total Implementations</p>
                  <p className="text-2xl font-bold text-foreground">{rfp.totalImplementations}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Infrastructure & Configuration */}
            <div className="premium-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Infrastructure & Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Deployment Type</p>
                  <p className="text-sm font-semibold text-foreground">{rfp.cloudSelfManaged}</p>
                </div>
                {rfp.cloudSelfManaged === 'Cloud' && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">Cloud Platform</p>
                    <p className="text-sm font-semibold text-foreground">{rfp.cloudPlatform}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Project Data & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="premium-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Project Data</h3>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-3">{rfp.projectData.name}</p>
                  <a
                    href={rfp.projectData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline text-sm"
                  >
                    View SharePoint Link
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="premium-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Documents Available</h3>
                <div className="space-y-2">
                  {rfp.documentsAvailable.length > 0 ? (
                    rfp.documentsAvailable.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Download className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-foreground">{doc}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No documents available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Comments */}
            {rfp.comments && (
              <div className="premium-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Comments</h3>
                <p className="text-foreground bg-muted/50 p-4 rounded-lg leading-relaxed">{rfp.comments}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

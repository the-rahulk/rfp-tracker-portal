'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { RFPCardGrid } from '@/components/dashboard/rfp-card-grid'
import { DashboardFilters } from '@/components/dashboard/dashboard-filters'
import { mockRFPData } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    geo: '',
    month: '',
  })
  const [sortBy, setSortBy] = useState('date-desc')

  // Filter and search logic
  const filteredData = useMemo(() => {
    let result = mockRFPData

    // Search by client, POC, or geo
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (rfp) =>
          rfp.clientName.toLowerCase().includes(term) ||
          rfp.pocName.toLowerCase().includes(term) ||
          rfp.geo.toLowerCase().includes(term)
      )
    }

    // Filter by geo
    if (filters.geo) {
      result = result.filter((rfp) => rfp.geo === filters.geo)
    }

    // Filter by month
    if (filters.month) {
      result = result.filter((rfp) => {
        const rfpMonth = new Date(rfp.submissionDate).toISOString().slice(0, 7)
        return rfpMonth === filters.month
      })
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
        case 'date-asc':
          return new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
        case 'client':
          return a.clientName.localeCompare(b.clientName)
        default:
          return 0
      }
    })

    return result
  }, [searchTerm, filters, sortBy])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleAddRFP = () => {
    router.push('/dashboard/add-rfp')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">RFP Submissions</h1>
            <p className="text-muted-foreground mt-2">Manage and track all your RFP submissions</p>
          </div>
          <Button
            onClick={handleAddRFP}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            + Add New RFP
          </Button>
        </div>

        <DashboardFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <RFPCardGrid rfps={filteredData} />
      </main>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'

interface DashboardFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filters: {
    geo: string
    month: string
  }
  onFiltersChange: (filters: { geo: string; month: string }) => void
  sortBy: string
  onSortChange: (value: string) => void
}

const geoOptions = ['North America', 'Europe', 'Asia Pacific', 'LATAM', 'Middle East']
const monthOptions = [
  { value: '2025-01', label: 'January 2025' },
  { value: '2025-02', label: 'February 2025' },
  { value: '2024-12', label: 'December 2024' },
  { value: '2024-11', label: 'November 2024' },
]

export function DashboardFilters({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
}: DashboardFiltersProps) {
  const handleClearFilters = () => {
    onSearchChange('')
    onFiltersChange({ geo: '', month: '' })
    onSortChange('date-desc')
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search by client name, POC, or location..."
          className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <select
          value={filters.geo}
          onChange={(e) => onFiltersChange({ ...filters, geo: e.target.value })}
          className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="">All Locations</option>
          {geoOptions.map((geo) => (
            <option key={geo} value={geo}>
              {geo}
            </option>
          ))}
        </select>

        <select
          value={filters.month}
          onChange={(e) => onFiltersChange({ ...filters, month: e.target.value })}
          className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="">All Months</option>
          {monthOptions.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="client">Client Name</option>
        </select>

        <Button
          onClick={handleClearFilters}
          className="bg-muted hover:bg-muted/80 text-muted-foreground font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}

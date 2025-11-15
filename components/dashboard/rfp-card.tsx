'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { RFPSubmission } from '@/lib/types'

interface RFPCardProps {
  rfp: RFPSubmission
}

export function RFPCard({ rfp }: RFPCardProps) {
  const router = useRouter()

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

  return (
    <div className="premium-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground truncate">{rfp.clientName}</h3>
          <p className="text-sm text-muted-foreground">{rfp.pocName}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(rfp.outcome)}`}>
          {rfp.outcome}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Location</span>
          <span className="text-sm font-medium text-foreground">{rfp.geo}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Submission Date</span>
          <span className="text-sm font-medium text-foreground">
            {new Date(rfp.submissionDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Products</span>
          <span className="text-sm font-medium text-foreground">{rfp.guidewireProducts.length}</span>
        </div>
      </div>

      <Button
        onClick={() => router.push(`/dashboard/rfp/${rfp.id}`)}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-lg transition-colors text-sm"
      >
        View Details
      </Button>
    </div>
  )
}

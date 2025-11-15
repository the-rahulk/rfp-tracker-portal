'use client'

import { useRouter } from 'next/navigation'
import { RFPCard } from './rfp-card'
import type { RFPSubmission } from '@/lib/types'

interface RFPCardGridProps {
  rfps: RFPSubmission[]
}

export function RFPCardGrid({ rfps }: RFPCardGridProps) {
  if (rfps.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-muted-foreground text-lg">No RFP submissions found</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rfps.map((rfp) => (
        <RFPCard key={rfp.id} rfp={rfp} />
      ))}
    </div>
  )
}

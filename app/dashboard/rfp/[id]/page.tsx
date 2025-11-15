'use client'

import { useParams, useRouter } from 'next/navigation'
import { RFPDetailView } from '@/components/rfp/rfp-detail-view'
import { mockRFPData } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

export default function RFPDetailPage() {
  const params = useParams()
  const router = useRouter()
  const rfp = mockRFPData.find((r) => r.id === params.id)

  if (!rfp) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">RFP Not Found</h1>
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-muted hover:bg-muted/80 text-muted-foreground font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Button>
        </div>
      </header>

      <RFPDetailView rfp={rfp} />
    </div>
  )
}

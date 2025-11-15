'use client'

import { useRouter } from 'next/navigation'
import { AddRFPForm } from '@/components/rfp/add-rfp-form'
import { Button } from '@/components/ui/button'

export default function AddRFPPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Add New RFP Submission</h1>
          <p className="text-muted-foreground mt-2">Fill in the details below to create a new RFP submission</p>
        </div>

        <AddRFPForm onSuccess={() => router.push('/dashboard')} />
      </main>
    </div>
  )
}

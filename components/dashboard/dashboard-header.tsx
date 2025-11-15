'use client'

import { Button } from '@/components/ui/button'

interface DashboardHeaderProps {
  onLogout: () => void
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">RFP Manager</h2>
            <p className="text-xs text-muted-foreground">Submission Tracking</p>
          </div>
        </div>
        <Button
          onClick={onLogout}
          className="bg-muted hover:bg-muted/80 text-muted-foreground font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}

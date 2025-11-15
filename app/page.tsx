'use client'

import { useState } from 'react'
import { LoginForm } from '@/components/auth/login-form'
import { RegisterForm } from '@/components/auth/register-form'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">RFP Manager</h1>
          <p className="text-muted-foreground mt-2">Enterprise RFP Submission Tracking</p>
        </div>

        {isLogin ? (
          <>
            <LoginForm />
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:text-accent font-semibold transition-colors"
                >
                  Create one
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <RegisterForm />
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:text-accent font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

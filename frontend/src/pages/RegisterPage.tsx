import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GoogleLogo } from '@/components/auth/GoogleLogo'
import { BrandLogo } from '@/components/drive/BrandLogo'
import { apiFetch } from '@/lib/api'

export function RegisterPage() {
  const [error, setError] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)

  async function continueWithGoogle() {
    setGoogleLoading(true)
    setError('')
    try {
      const data = await apiFetch<{ url: string }>('/auth/google/url', { skipAuth: true })
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google register failed')
      setGoogleLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left side: Branding / Premium Visual */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-red-50 to-red-100 p-12 lg:flex">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-red-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-[500px] w-[500px] rounded-full bg-red-300/30 blur-3xl" />
        
        <div className="relative z-10 flex items-center gap-3">
          <BrandLogo className="h-10 w-10 shadow-none" />
          <span className="text-xl font-extrabold tracking-tight">Open<span className="text-red-500">Drive</span></span>
        </div>

        <div className="relative z-10 mb-20 max-w-lg">
          <h2 className="text-4xl font-extrabold leading-tight text-slate-900">Your secure, self-hosted storage gateway.</h2>
          <p className="mt-6 text-lg text-slate-600">Connect your Google Drive accounts, organize your files in virtual folders, and share effortlessly—all from one unified interface.</p>
        </div>
      </div>

      {/* Right side: Register form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white p-5">
        <Card className="w-full max-w-md border-none p-8 shadow-2xl shadow-red-900/5">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <BrandLogo className="h-14 w-14" />
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Create account</h1>
              <p className="mt-1.5 text-sm text-slate-500">Create your OpenDrive storage gateway.</p>
            </div>
          </div>
          <div className="grid gap-3">
            {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}
            <Button variant="outline" className="h-12 border-slate-200 font-bold shadow-sm transition-all hover:bg-slate-50 hover:shadow" disabled={googleLoading} onClick={continueWithGoogle}>
              <GoogleLogo />{googleLoading ? 'Redirecting...' : 'Continue with Google and connect Drive'}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}

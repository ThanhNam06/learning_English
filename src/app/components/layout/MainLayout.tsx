import { Navigation } from './Navigation'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

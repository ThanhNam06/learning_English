'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { MainLayout } from '@/components/MainLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060813] flex items-center justify-center">
        <div className="text-lg text-slate-200">Đang tải...</div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return <MainLayout>{children}</MainLayout>
}

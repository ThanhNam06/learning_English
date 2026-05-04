import { MainLayout } from '@/app/components/layout/MainLayout'
import { Crown } from 'lucide-react'

export default function Upgrade() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Crown className="w-8 h-8 text-indigo-400" />
          Upgrade
        </h1>
        <p className="text-slate-400">Nâng cấp tài khoản để mở khóa tính năng cao cấp...</p>
      </div>
    </MainLayout>
  )
}

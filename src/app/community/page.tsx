import { MainLayout } from '@/app/components/layout/MainLayout'
import { Users } from 'lucide-react'

export default function Community() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Users className="w-8 h-8 text-indigo-400" />
          Community
        </h1>
        <p className="text-slate-400">Kết nối với cộng đồng học viên...</p>
      </div>
    </MainLayout>
  )
}

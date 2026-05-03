import { MainLayout } from '../components/layout/MainLayout'
import { User } from 'lucide-react'

export default function Profile() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <User className="w-8 h-8 text-indigo-400" />
          Profile
        </h1>
        <p className="text-slate-400">Quản lý hồ sơ cá nhân...</p>
      </div>
    </MainLayout>
  )
}

'use client'

import { MainLayout } from '../components/layout/MainLayout'
import { Settings } from 'lucide-react'

export default function Settings() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Settings className="w-8 h-8 text-indigo-400" />
          Settings
        </h1>
        <p className="text-slate-400">Cài đặt tài khoản...</p>
      </div>
    </MainLayout>
  )
}

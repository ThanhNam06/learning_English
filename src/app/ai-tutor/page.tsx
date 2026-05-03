'use client'

import { MainLayout } from '../components/layout/MainLayout'
import { Sparkles } from 'lucide-react'

export default function AITutor() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-indigo-400" />
          AI Tutor
        </h1>
        <p className="text-slate-400">Luyện nói và viết với AI Tutor...</p>
      </div>
    </MainLayout>
  )
}

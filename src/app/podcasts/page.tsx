import { MainLayout } from '@/app/components/layout/MainLayout'
import { Mic } from 'lucide-react'

export default function Podcasts() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <Mic className="w-8 h-8 text-indigo-400" />
          Podcasts
        </h1>
        <p className="text-slate-400">Nghe podcast để cải thiện kỹ năng nghe...</p>
      </div>
    </MainLayout>
  )
}

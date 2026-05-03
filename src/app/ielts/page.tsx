import { MainLayout } from '../components/layout/MainLayout'
import { GraduationCap, BookOpen, Headphones, Mic } from 'lucide-react'

export default function IELTS() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
          IELTS Practice
        </h1>
        <p className="text-slate-400 mb-8">Luyện thi IELTS với các bài tập chất lượng cao.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TestTypeCard
            icon={<BookOpen className="w-8 h-8 text-blue-400" />}
            title="Reading"
            description="Luyện đọc hiểu với các bài đọc thực tế"
            type="reading"
          />
          <TestTypeCard
            icon={<Headphones className="w-8 h-8 text-green-400" />}
            title="Listening"
            description="Luyện nghe với các audio chất lượng"
            type="listening"
          />
          <TestTypeCard
            icon={<Mic className="w-8 h-8 text-purple-400" />}
            title="Speaking"
            description="Luyện nói với AI Tutor"
            type="speaking"
          />
          <TestTypeCard
            icon={<GraduationCap className="w-8 h-8 text-orange-400" />}
            title="Writing"
            description="Luyện viết với feedback chi tiết"
            type="writing"
          />
        </div>
      </div>
    </MainLayout>
  )
}

function TestTypeCard({ icon, title, description, type }: { icon: any, title: string, description: string, type: string }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors cursor-pointer">
      <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  )
}

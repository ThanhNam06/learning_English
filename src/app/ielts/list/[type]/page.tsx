import { MainLayout } from '@/app/components/layout/MainLayout'

export default function IELTSTestList({ params }: { params: { type: string } }) {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          IELTS {params.type.charAt(0).toUpperCase() + params.type.slice(1)} Tests
        </h1>
        <p className="text-slate-400">Danh sách bài thi {params.type}...</p>
      </div>
    </MainLayout>
  )
}

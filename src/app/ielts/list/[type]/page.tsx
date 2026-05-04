import { MainLayout } from '@/app/components/layout/MainLayout'

export default async function IELTSTestList({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          IELTS {type.charAt(0).toUpperCase() + type.slice(1)} Tests
        </h1>
        <p className="text-slate-400">Danh sách bài thi {type}...</p>
      </div>
    </MainLayout>
  )
}

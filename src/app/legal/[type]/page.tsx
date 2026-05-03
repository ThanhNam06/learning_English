import { MainLayout } from '../../components/layout/MainLayout'

export default function Legal({ params }: { params: { type: string } }) {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          {params.type.charAt(0).toUpperCase() + params.type.slice(1)}
        </h1>
        <p className="text-slate-400">Legal information...</p>
      </div>
    </MainLayout>
  )
}

'use client'

import { MainLayout } from '../../components/layout/MainLayout'

export default function IELTSTest({ params }: { params: { type: string, testId: string } }) {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          IELTS {params.type.charAt(0).toUpperCase() + params.type.slice(1)} Test
        </h1>
        <p className="text-slate-400">Test ID: {params.testId}</p>
      </div>
    </MainLayout>
  )
}

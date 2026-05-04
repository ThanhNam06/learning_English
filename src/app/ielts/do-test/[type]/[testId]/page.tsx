'use client'

import { MainLayout } from '@/app/components/layout/MainLayout'

export default function IELTSTest({ params }: { params: { type: string, testId: string } }) {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          IELTS {type.charAt(0).toUpperCase() + type.slice(1)} Test
        </h1>
        <p className="text-slate-400">Test ID: {testId}</p>
      </div>
    </MainLayout>
  )
}

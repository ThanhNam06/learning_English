import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learn English - Nền tảng học tiếng Anh thông minh',
  description: 'Học tiếng Anh hiệu quả với AI, flashcards, IELTS mock tests và cộng đồng học tập',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

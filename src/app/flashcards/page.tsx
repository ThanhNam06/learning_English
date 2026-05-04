'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { MainLayout } from '@/app/components/layout/MainLayout'
import { Layers, Trash2, ArrowRight, BookOpen } from 'lucide-react'

const FlashcardItem = ({ word, removeFlashcard }: { word: any, removeFlashcard: (id: string) => void }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative h-64 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`w-full h-full transition-all duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg">
          <button
            onClick={(e) => { e.stopPropagation(); removeFlashcard(word.id); }}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors z-10"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          {word.topic && (
            <span className="absolute top-5 left-5 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-slate-400">
              {word.topic}
            </span>
          )}
          <h3 className="text-3xl font-bold text-indigo-300 mb-2">{word.en}</h3>
          <p className="text-slate-500 text-sm">Chạm để lật</p>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-center text-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          <h3 className="text-2xl font-bold text-white mb-4">{word.vn}</h3>
          <p className="text-indigo-200 text-sm italic border-t border-white/10 pt-4">"{word.example}"</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([
    { id: '1', en: 'ephemeral', vn: 'phù du, ngắn ngủi', example: 'Fame is often ephemeral.', topic: 'Advanced' },
    { id: '2', en: 'ubiquitous', vn: 'khắp nơi, hiện diện khắp nơi', example: 'Smartphones are now ubiquitous.', topic: 'Advanced' },
  ])

  const [activeTab, setActiveTab] = useState<'yours' | 'topics'>('yours')

  const topicDecks = [
    { title: "IELTS Core Vocabulary", count: 500, color: "from-blue-500 to-indigo-600" },
    { title: "Business English", count: 320, color: "from-emerald-500 to-teal-600" },
    { title: "Science & Space", count: 150, color: "from-purple-500 to-fuchsia-600" },
  ]

  const removeFlashcard = (id: string) => {
    setFlashcards(flashcards.filter(f => f.id !== id))
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
              <Layers className="w-8 h-8 text-indigo-400" />
              Bộ Flashcards
            </h1>
            <p className="text-slate-400 mt-2">Học và ôn tập từ vựng mỗi ngày để duy trì chuỗi.</p>
          </div>

          <div className="flex bg-[#0f1123] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('yours')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === 'yours'
                  ? 'bg-indigo-500/20 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Từ của bạn ({flashcards.length})
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === 'topics'
                  ? 'bg-indigo-500/20 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Theo chủ đề
            </button>
          </div>
        </div>

        {activeTab === 'yours' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-2xl bg-black/20">
                <BookOpen className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-medium text-slate-300 mb-2">Bạn chưa có từ nào</h3>
                <p className="text-slate-500">Hãy vào phần Từ điển để tra và thêm từ vựng mới vào đây nhé.</p>
              </div>
            ) : (
              flashcards.map((word) => (
                <FlashcardItem key={word.id} word={word} removeFlashcard={removeFlashcard} />
              ))
            )}
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topicDecks.map((deck, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className={`rounded-2xl p-6 cursor-pointer relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity ${deck.color}`} />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{deck.title}</h3>
                    <p className="text-white/80">{deck.count} từ vựng</p>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}</style>
      </div>
    </MainLayout>
  )
}

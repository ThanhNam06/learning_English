'use client'

import { useState, useEffect } from 'react'
import { Search, Volume2, Plus, Bookmark, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { updateDailyProgress } from '@/lib/progress'
import { cn } from '@/lib/utils'

type Vocabulary = {
  id: string
  word: string
  pronunciation: string
  definition: string
  example: string
  level: string
}

export default function DictionaryPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [words, setWords] = useState<Vocabulary[]>([])
  const [loading, setLoading] = useState(false)
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set())
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null)
  const [searched, setSearched] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    if (user) {
      loadSavedWords()
      loadSearchHistory()
    }
  }, [user])

  const loadSavedWords = async () => {
    if (!user) return

    const { data } = await supabase
      .from('flashcards')
      .select('vocabulary_id')
      .eq('user_id', user.id)

    if (data) {
      setSavedWords(new Set(data.map((f: { vocabulary_id: string }) => f.vocabulary_id)))
    }
  }

  const loadSearchHistory = () => {
    const history = localStorage.getItem('search_history')
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }

  const saveSearchHistory = (query: string) => {
    if (!query.trim()) return

    const history = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10)
    setSearchHistory(history)
    localStorage.setItem('search_history', JSON.stringify(history))
  }

  const searchWords = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setSearched(true)

    let query = supabase
      .from('vocabulary')
      .select('*')
      .ilike('word', `${searchQuery}%`)
      .order('word', { ascending: true })
      .limit(1)

    if (selectedLevel !== 'all') {
      query = query.eq('level', selectedLevel)
    }

    const { data } = await query

    if (data && data.length > 0) {
      setSelectedWord(data[0])
      saveSearchHistory(searchQuery)
    } else {
      setSelectedWord(null)
    }

    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchWords()
  }

  const saveToFlashcards = async (vocabularyId: string) => {
    if (!user) {
      alert('Vui lòng đăng nhập để lưu từ vựng')
      return
    }

    const { error } = await supabase
      .from('flashcards')
      .insert({
        user_id: user.id,
        vocabulary_id: vocabularyId,
      })

    if (error) {
      if (error.code === '23505') {
        alert('Từ này đã có trong flashcards của bạn')
      } else {
        alert('Lỗi khi lưu từ vựng')
      }
    } else {
      setSavedWords(prev => new Set(prev).add(vocabularyId))
      await updateDailyProgress(user.id, { words_learned: 1 })
      alert('Đã lưu vào flashcards!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Từ Điển Vũ Trụ
        </h1>
        <p className="text-slate-400">Tra cứu nhanh chóng. Từ Anh-Việt kèm ví dụ.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nhập từ cần tra cứu..."
          className="w-full bg-[#0f1123] border-2 border-white/10 rounded-2xl py-5 pl-14 pr-6 text-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-2 right-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Đang tìm...' : 'Tra từ'}
        </button>
      </form>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500">Gần đây:</span>
          {searchHistory.slice(0, 5).map((term, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSearchQuery(term)
              }}
              className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 rounded-full hover:bg-white/10 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#0f1123] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative blob */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {selectedWord ? (
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-100 mb-2 flex items-end gap-4">
                      {selectedWord.word}
                      <span className="text-xl font-normal text-indigo-300">{selectedWord.pronunciation}</span>
                    </h2>
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                      {selectedWord.level}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 transition-colors">
                      <Volume2 className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => saveToFlashcards(selectedWord.id)}
                      disabled={savedWords.has(selectedWord.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all",
                        savedWords.has(selectedWord.id)
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                          : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                      )}
                    >
                      {savedWords.has(selectedWord.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {savedWords.has(selectedWord.id) ? "Đã thêm" : "Thêm vào Flashcard"}
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2 mb-4">
                    <Bookmark className="w-5 h-5" />
                    Định nghĩa
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">{selectedWord.definition}</p>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-6">
                  <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-2">Ví dụ (Example)</h4>
                  <p className="text-xl text-slate-200 italic font-serif">&quot;{selectedWord.example}&quot;</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-xl">Không tìm thấy từ này trong cơ sở dữ liệu.</p>
                <p className="text-sm mt-2">Vui lòng kiểm tra lại chính tả hoặc thử một từ khác.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

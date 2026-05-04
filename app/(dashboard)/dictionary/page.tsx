'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { updateDailyProgress } from '@/lib/progress'

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

  const supabase = createClient()

  // Load saved words and search history
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
    setLoading(true)

    let query = supabase
      .from('vocabulary')
      .select('*')
      .order('word', { ascending: true })
      .limit(50)

    if (searchQuery) {
      query = query.ilike('word', `${searchQuery}%`)
      saveSearchHistory(searchQuery)
    }

    if (selectedLevel !== 'all') {
      query = query.eq('level', selectedLevel)
    }

    const { data, error } = await query

    if (data) {
      setWords(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    searchWords()
  }, [selectedLevel])

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

      // Update daily progress
      await updateDailyProgress(user.id, { words_learned: 1 })

      alert('Đã lưu vào flashcards!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Từ Điển</h1>

      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm từ vựng
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập từ cần tìm..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Đang tìm...' : 'Tìm kiếm'}
              </button>
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Gần đây:</span>
                {searchHistory.slice(0, 5).map((term, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term)
                      searchWords()
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              Lọc theo trình độ
            </label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="A1">A1 - Beginner</option>
              <option value="A2">A2 - Elementary</option>
              <option value="B1">B1 - Intermediate</option>
              <option value="B2">B2 - Upper Intermediate</option>
              <option value="C1">C1 - Advanced</option>
              <option value="C2">C2 - Proficiency</option>
            </select>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-600">Đang tải...</div>
        ) : words.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
            Không tìm thấy từ vựng nào. Thử tìm kiếm khác hoặc chọn trình độ khác.
          </div>
        ) : (
          words.map((word) => (
            <div key={word.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{word.word}</h3>
                  <p className="text-gray-600 italic">{word.pronunciation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {word.level}
                  </span>
                  <button
                    onClick={() => saveToFlashcards(word.id)}
                    disabled={savedWords.has(word.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      savedWords.has(word.id)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {savedWords.has(word.id) ? '✓ Đã lưu' : '+ Lưu'}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-gray-700">Định nghĩa: </span>
                  <span className="text-gray-900">{word.definition}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Ví dụ: </span>
                  <span className="text-gray-900 italic">&quot;{word.example}&quot;</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

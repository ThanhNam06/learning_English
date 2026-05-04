'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'

type FlashcardWithVocabulary = {
  id: string
  vocabulary_id: string
  next_review: string
  interval_days: number
  ease_factor: number
  repetitions: number
  vocabulary: {
    word: string
    pronunciation: string
    definition: string
    example: string
    level: string
  }
}

export default function FlashcardsPage() {
  const { user } = useAuth()
  const [cards, setCards] = useState<FlashcardWithVocabulary[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reviewCompleted, setReviewCompleted] = useState(0)

  const supabase = createClient()

  useEffect(() => {
    if (user) {
      loadDueCards()
    }
  }, [user])

  const loadDueCards = async () => {
    if (!user) return

    setLoading(true)
    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('flashcards')
      .select(`
        id,
        vocabulary_id,
        next_review,
        interval_days,
        ease_factor,
        repetitions,
        vocabulary:vocabulary_id (
          word,
          pronunciation,
          definition,
          example,
          level
        )
      `)
      .eq('user_id', user.id)
      .lte('next_review', now)
      .order('next_review', { ascending: true })

    if (data) {
      setCards(data as unknown as FlashcardWithVocabulary[])
    }
    setLoading(false)
  }

  const calculateNextReview = (
    quality: number,
    currentInterval: number,
    currentEaseFactor: number,
    currentRepetitions: number
  ) => {
    let interval = currentInterval
    let easeFactor = currentEaseFactor
    let repetitions = currentRepetitions

    if (quality >= 3) {
      repetitions += 1

      if (repetitions === 1) {
        interval = 1
      } else if (repetitions === 2) {
        interval = 6
      } else {
        interval = Math.round(interval * easeFactor)
      }

      easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
      if (easeFactor < 1.3) {
        easeFactor = 1.3
      }
    } else {
      repetitions = 0
      interval = 1
    }

    const nextReview = new Date()
    nextReview.setDate(nextReview.getDate() + interval)

    return {
      next_review: nextReview.toISOString(),
      interval_days: interval,
      ease_factor: Number(easeFactor.toFixed(2)),
      repetitions,
    }
  }

  const handleReview = async (quality: number) => {
    const currentCard = cards[currentCardIndex]
    if (!currentCard) return

    const updateData = calculateNextReview(
      quality,
      currentCard.interval_days,
      currentCard.ease_factor,
      currentCard.repetitions
    )

    await supabase
      .from('flashcards')
      .update(updateData)
      .eq('id', currentCard.id)

    setReviewCompleted(prev => prev + 1)

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      // Reload due cards after finishing review session
      loadDueCards()
      setCurrentCardIndex(0)
      setShowAnswer(false)
      setReviewCompleted(0)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Flashcards</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-600">
          Đang tải flashcards...
        </div>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Flashcards</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không có thẻ nào cần review</h2>
          <p className="text-gray-600 mb-4">
            Bạn đã hoàn thành tất cả flashcards hôm nay hoặc chưa lưu từ nào.
          </p>
          <a
            href="/dictionary"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Đi đến Từ Điển để thêm từ
          </a>
        </div>
      </div>
    )
  }

  const currentCard = cards[currentCardIndex]
  if (!currentCard) return null

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Flashcards</h1>

      {/* Progress */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Tiến độ: {currentCardIndex + 1} / {cards.length}
          </span>
          <span className="text-sm font-medium text-green-600">
            Đã review: {reviewCompleted}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="bg-white rounded-lg shadow-md p-8 min-h-[400px] flex flex-col justify-center">
        <div className="text-center">
          <div className="mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {currentCard.vocabulary.level}
            </span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {currentCard.vocabulary.word}
          </h2>
          <p className="text-xl text-gray-600 italic mb-8">
            {currentCard.vocabulary.pronunciation}
          </p>

          {showAnswer ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-900 mb-2">
                  <span className="font-semibold">Định nghĩa:</span> {currentCard.vocabulary.definition}
                </p>
                <p className="text-gray-700 italic">
                  <span className="font-semibold not-italic">Ví dụ:</span> "{currentCard.vocabulary.example}"
                </p>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-600 mb-4">Bạn nhớ từ này như thế nào?</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleReview(1)}
                    className="px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    😵 Khó
                  </button>
                  <button
                    onClick={() => handleReview(3)}
                    className="px-4 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    😐 Trung bình
                  </button>
                  <button
                    onClick={() => handleReview(4)}
                    className="px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    😊 Tốt
                  </button>
                  <button
                    onClick={() => handleReview(5)}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    🚀 Rất dễ
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Hiện đáp án
            </button>
          )}
        </div>
      </div>

      {/* Card stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-600">Lần lặp</p>
          <p className="text-2xl font-bold text-gray-900">{currentCard.repetitions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-600">Khoảng cách</p>
          <p className="text-2xl font-bold text-gray-900">{currentCard.interval_days} ngày</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-600">Độ dễ</p>
          <p className="text-2xl font-bold text-gray-900">{currentCard.ease_factor}</p>
        </div>
      </div>
    </div>
  )
}

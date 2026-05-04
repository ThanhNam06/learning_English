import { createClient } from '@/lib/supabase/client'

// Update daily progress
export async function updateDailyProgress(
  userId: string,
  updates: {
    words_learned?: number
    flashcards_reviewed?: number
    ielts_tests_taken?: number
    podcasts_listened?: number
    study_time_minutes?: number
  }
) {
  const supabase = createClient()
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  // Try to get today's progress
  const { data: existing } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single()

  if (existing) {
    // Update existing record
    const updateData: Record<string, number> = {}
    if (updates.words_learned) {
      updateData['words_learned'] = existing['words_learned'] + updates.words_learned
    }
    if (updates.flashcards_reviewed) {
      updateData['flashcards_reviewed'] = existing['flashcards_reviewed'] + updates.flashcards_reviewed
    }
    if (updates.ielts_tests_taken) {
      updateData['ielts_tests_taken'] = existing['ielts_tests_taken'] + updates.ielts_tests_taken
    }
    if (updates.podcasts_listened) {
      updateData['podcasts_listened'] = existing['podcasts_listened'] + updates.podcasts_listened
    }
    if (updates.study_time_minutes) {
      updateData['study_time_minutes'] = existing['study_time_minutes'] + updates.study_time_minutes
    }

    await supabase
      .from('user_progress')
      .update(updateData)
      .eq('id', existing.id)
  } else {
    // Insert new record
    await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        date: today,
        words_learned: updates.words_learned || 0,
        flashcards_reviewed: updates.flashcards_reviewed || 0,
        ielts_tests_taken: updates.ielts_tests_taken || 0,
        podcasts_listened: updates.podcasts_listened || 0,
        study_time_minutes: updates.study_time_minutes || 0,
      })
  }
}

// Get flashcard statistics
export async function getFlashcardStats(userId: string) {
  const supabase = createClient()
  const now = new Date().toISOString()
  const today = new Date().toISOString().split('T')[0]

  // Total flashcards
  const { count: total } = await supabase
    .from('flashcards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  // Due today
  const { count: due } = await supabase
    .from('flashcards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .lte('next_review', now)

  // Reviewed today (check user_progress)
  const { data: progress } = await supabase
    .from('user_progress')
    .select('flashcards_reviewed')
    .eq('user_id', userId)
    .eq('date', today)
    .single()

  return {
    total: total || 0,
    due: due || 0,
    reviewed_today: progress?.flashcards_reviewed || 0,
  }
}

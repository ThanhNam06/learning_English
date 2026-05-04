export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string
          level: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name: string
          level: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          level?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          date: string
          words_learned: number
          flashcards_reviewed: number
          ielts_tests_taken: number
          podcasts_listened: number
          study_time_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          words_learned?: number
          flashcards_reviewed?: number
          ielts_tests_taken?: number
          podcasts_listened?: number
          study_time_minutes?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          words_learned?: number
          flashcards_reviewed?: number
          ielts_tests_taken?: number
          podcasts_listened?: number
          study_time_minutes?: number
          created_at?: string
        }
      }
      vocabulary: {
        Row: {
          id: string
          word: string
          pronunciation: string
          definition: string
          example: string
          level: string
          created_at: string
        }
        Insert: {
          id?: string
          word: string
          pronunciation: string
          definition: string
          example: string
          level: string
          created_at?: string
        }
        Update: {
          id?: string
          word?: string
          pronunciation?: string
          definition?: string
          example?: string
          level?: string
          created_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          user_id: string
          vocabulary_id: string
          next_review: string
          interval_days: number
          ease_factor: number
          repetitions: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vocabulary_id: string
          next_review?: string
          interval_days?: number
          ease_factor?: number
          repetitions?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vocabulary_id?: string
          next_review?: string
          interval_days?: number
          ease_factor?: number
          repetitions?: number
          created_at?: string
          updated_at?: string
        }
      }
      ielts_tests: {
        Row: {
          id: string
          title: string
          description: string
          duration_minutes: number
          total_questions: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          duration_minutes: number
          total_questions: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          duration_minutes?: number
          total_questions?: number
          created_at?: string
        }
      }
      ielts_questions: {
        Row: {
          id: string
          test_id: string
          question_number: number
          question_text: string
          question_type: string
          correct_answer: string
          created_at: string
        }
        Insert: {
          id?: string
          test_id: string
          question_number: number
          question_text: string
          question_type: string
          correct_answer: string
          created_at?: string
        }
        Update: {
          id?: string
          test_id?: string
          question_number?: number
          question_text?: string
          question_type?: string
          correct_answer?: string
          created_at?: string
        }
      }
      podcasts: {
        Row: {
          id: string
          title: string
          description: string
          audio_url: string
          transcript: string
          duration_seconds: number
          level: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          audio_url: string
          transcript: string
          duration_seconds: number
          level: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          audio_url?: string
          transcript?: string
          duration_seconds?: number
          level?: string
          created_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          user_id: string
          content: string
          likes_count: number
          comments_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

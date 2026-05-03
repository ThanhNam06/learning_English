export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          level: string
          streak: number
          total_hours: number
          target_score: number
          plan: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          level?: string
          streak?: number
          total_hours?: number
          target_score?: number
          plan?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          level?: string
          streak?: number
          total_hours?: number
          target_score?: number
          plan?: string
          updated_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          en: string
          vn: string
          example: string | null
          topic: string | null
          difficulty: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          en: string
          vn: string
          example?: string | null
          topic?: string | null
          difficulty?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          en?: string
          vn?: string
          example?: string | null
          topic?: string | null
          difficulty?: string
          updated_at?: string
        }
      }
      user_flashcards: {
        Row: {
          id: string
          user_id: string
          flashcard_id: string
          mastery_level: number
          last_reviewed_at: string | null
          next_review_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          flashcard_id: string
          mastery_level?: number
          last_reviewed_at?: string | null
          next_review_at?: string | null
          created_at?: string
        }
        Update: {
          mastery_level?: number
          last_reviewed_at?: string | null
          next_review_at?: string | null
        }
      }
      ielts_tests: {
        Row: {
          id: string
          type: string
          title: string
          description: string | null
          duration: number | null
          difficulty: string
          questions: any
          answers: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: string
          title: string
          description?: string | null
          duration?: number | null
          difficulty?: string
          questions: any
          answers: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          type?: string
          title?: string
          description?: string | null
          duration?: number | null
          difficulty?: string
          questions?: any
          answers?: any
          updated_at?: string
        }
      }
      user_test_results: {
        Row: {
          id: string
          user_id: string
          test_id: string
          score: number
          answers: any
          time_spent: number | null
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          test_id: string
          score: number
          answers: any
          time_spent?: number | null
          completed_at?: string
        }
        Update: {
          score?: number
          answers?: any
          time_spent?: number | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          date: string
          hours_spent: number
          flashcards_reviewed: number
          tests_completed: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          hours_spent?: number
          flashcards_reviewed?: number
          tests_completed?: number
          created_at?: string
        }
        Update: {
          hours_spent?: number
          flashcards_reviewed?: number
          tests_completed?: number
        }
      }
      community_posts: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          tags: string[]
          likes_count: number
          comments_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          tags?: string[]
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string
          tags?: string[]
          likes_count?: number
          comments_count?: number
          updated_at?: string
        }
      }
      community_comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          content?: string
          updated_at?: string
        }
      }
    }
  }
}

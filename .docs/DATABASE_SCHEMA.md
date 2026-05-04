# Database Schema Documentation

## Overview

**Database:** PostgreSQL 15 (Supabase)  
**Total Tables:** 8  
**Security:** Row Level Security (RLS) enabled  
**Extensions:** uuid-ossp

---

## Tables

### 1. users

Extends Supabase auth.users with additional profile information.

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Columns:**
- `id` - User UUID (references auth.users)
- `email` - User email address
- `display_name` - User's display name
- `level` - English proficiency level (A1-C2)
- `avatar_url` - Profile picture URL
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

**Indexes:**
- Primary key on `id`
- Unique constraint on `email`

**RLS Policies:**
- Users can view their own profile
- Users can update their own profile

**Triggers:**
- `update_users_updated_at` - Auto-update `updated_at` on changes
- `on_auth_user_created` - Auto-create profile when auth user is created

---

### 2. user_progress

Tracks daily learning statistics for each user.

```sql
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  words_learned INTEGER NOT NULL DEFAULT 0,
  flashcards_reviewed INTEGER NOT NULL DEFAULT 0,
  ielts_tests_taken INTEGER NOT NULL DEFAULT 0,
  podcasts_listened INTEGER NOT NULL DEFAULT 0,
  study_time_minutes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

**Columns:**
- `id` - Progress record UUID
- `user_id` - Reference to user
- `date` - Date of progress
- `words_learned` - Number of new words learned
- `flashcards_reviewed` - Number of flashcards reviewed
- `ielts_tests_taken` - Number of IELTS tests completed
- `podcasts_listened` - Number of podcasts listened to
- `study_time_minutes` - Total study time in minutes
- `created_at` - Record creation timestamp

**Indexes:**
- Primary key on `id`
- Index on `user_id`
- Index on `date`
- Unique constraint on `(user_id, date)`

**RLS Policies:**
- Users can view their own progress
- Users can insert their own progress
- Users can update their own progress

---

### 3. vocabulary

Master vocabulary database with English words.

```sql
CREATE TABLE public.vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word TEXT NOT NULL UNIQUE,
  pronunciation TEXT NOT NULL,
  definition TEXT NOT NULL,
  example TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Columns:**
- `id` - Vocabulary UUID
- `word` - English word
- `pronunciation` - IPA pronunciation
- `definition` - Word definition
- `example` - Example sentence
- `level` - CEFR level (A1-C2)
- `created_at` - Record creation timestamp

**Indexes:**
- Primary key on `id`
- Unique constraint on `word`
- Index on `word` for search
- Index on `level` for filtering

**RLS Policies:**
- Anyone can view vocabulary (public read-only)

---

### 4. flashcards

User's personal flashcard collection with spaced repetition data.

```sql
CREATE TABLE public.flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vocabulary_id UUID NOT NULL REFERENCES public.vocabulary(id) ON DELETE CASCADE,
  next_review TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  interval_days INTEGER NOT NULL DEFAULT 1,
  ease_factor DECIMAL(3,2) NOT NULL DEFAULT 2.5,
  repetitions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, vocabulary_id)
);
```

**Columns:**
- `id` - Flashcard UUID
- `user_id` - Reference to user
- `vocabulary_id` - Reference to vocabulary word
- `next_review` - Next scheduled review time
- `interval_days` - Days until next review (SM-2 algorithm)
- `ease_factor` - Ease factor for SM-2 algorithm (1.3-2.5)
- `repetitions` - Number of successful repetitions
- `created_at` - Card creation timestamp
- `updated_at` - Last review timestamp

**Indexes:**
- Primary key on `id`
- Index on `user_id`
- Index on `next_review` for due cards query
- Unique constraint on `(user_id, vocabulary_id)`

**RLS Policies:**
- Users can view their own flashcards
- Users can insert their own flashcards
- Users can update their own flashcards
- Users can delete their own flashcards

**Triggers:**
- `update_flashcards_updated_at` - Auto-update `updated_at` on review

**SM-2 Algorithm:**
```
If quality >= 3:
  repetitions += 1
  if repetitions == 1:
    interval = 1
  else if repetitions == 2:
    interval = 6
  else:
    interval = interval * ease_factor
  ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
else:
  repetitions = 0
  interval = 1
  
next_review = now + interval days
```

---

### 5. ielts_tests

IELTS practice test templates.

```sql
CREATE TABLE public.ielts_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Columns:**
- `id` - Test UUID
- `title` - Test title
- `description` - Test description
- `duration_minutes` - Time limit in minutes
- `total_questions` - Total number of questions
- `created_at` - Test creation timestamp

**Indexes:**
- Primary key on `id`

**RLS Policies:**
- Anyone can view tests (public read-only)

---

### 6. ielts_questions

Questions for IELTS tests.

```sql
CREATE TABLE public.ielts_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_id UUID NOT NULL REFERENCES public.ielts_tests(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank', 'matching')),
  correct_answer TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(test_id, question_number)
);
```

**Columns:**
- `id` - Question UUID
- `test_id` - Reference to test
- `question_number` - Question order (1, 2, 3...)
- `question_text` - Question content
- `question_type` - Type of question
- `correct_answer` - Correct answer
- `created_at` - Question creation timestamp

**Question Types:**
- `multiple_choice` - A, B, C, D options
- `true_false` - True/False/Not Given
- `fill_blank` - Fill in the blank
- `matching` - Match items

**Indexes:**
- Primary key on `id`
- Index on `test_id`
- Unique constraint on `(test_id, question_number)`

**RLS Policies:**
- Anyone can view questions (public read-only)

---

### 7. podcasts

Audio content for listening practice.

```sql
CREATE TABLE public.podcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  transcript TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Columns:**
- `id` - Podcast UUID
- `title` - Podcast title
- `description` - Podcast description
- `audio_url` - URL to audio file (Supabase Storage)
- `transcript` - Full transcript text
- `duration_seconds` - Audio duration in seconds
- `level` - CEFR level (A1-C2)
- `created_at` - Podcast creation timestamp

**Indexes:**
- Primary key on `id`

**RLS Policies:**
- Anyone can view podcasts (public read-only)

---

### 8. community_posts

Social posts from users.

```sql
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Columns:**
- `id` - Post UUID
- `user_id` - Reference to user
- `content` - Post content
- `likes_count` - Number of likes
- `comments_count` - Number of comments
- `created_at` - Post creation timestamp
- `updated_at` - Last update timestamp

**Indexes:**
- Primary key on `id`
- Index on `user_id`
- Index on `created_at DESC` for feed query

**RLS Policies:**
- Anyone can view posts
- Users can insert their own posts
- Users can update their own posts
- Users can delete their own posts

**Triggers:**
- `update_community_posts_updated_at` - Auto-update `updated_at` on changes

---

## Relationships

```
users (1) ──< (many) user_progress
users (1) ──< (many) flashcards
users (1) ──< (many) community_posts

vocabulary (1) ──< (many) flashcards

ielts_tests (1) ──< (many) ielts_questions
```

---

## Triggers

### Auto-update updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Auto-create user profile

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name, level)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'level', 'A1')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## Common Queries

### Get user with progress
```sql
SELECT 
  u.*,
  COUNT(f.id) as total_flashcards,
  SUM(CASE WHEN f.next_review <= NOW() THEN 1 ELSE 0 END) as due_flashcards
FROM users u
LEFT JOIN flashcards f ON f.user_id = u.id
WHERE u.id = $1
GROUP BY u.id;
```

### Get due flashcards
```sql
SELECT 
  f.*,
  v.word,
  v.pronunciation,
  v.definition,
  v.example
FROM flashcards f
JOIN vocabulary v ON v.id = f.vocabulary_id
WHERE f.user_id = $1
  AND f.next_review <= NOW()
ORDER BY f.next_review ASC
LIMIT 20;
```

### Get weekly progress
```sql
SELECT 
  date,
  words_learned,
  flashcards_reviewed,
  study_time_minutes
FROM user_progress
WHERE user_id = $1
  AND date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY date DESC;
```

---

## Migration File

Location: `supabase/migrations/001_initial_schema.sql`

To apply:
1. Go to Supabase Dashboard → SQL Editor
2. Copy entire migration file
3. Execute

---

**Last Updated:** 2026-05-04  
**Version:** 1.0.0

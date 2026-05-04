# API Documentation - Learn English Platform

## Authentication API

### Sign Up with Email
```typescript
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "John Doe",
  "level": "B1"
}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "display_name": "John Doe"
  }
}
```

### Sign In with Email
```typescript
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### Sign In with Google OAuth
```typescript
GET /api/auth/google

Redirects to Google OAuth consent screen
Callback: /auth/callback?code=...
```

### Sign Out
```typescript
POST /api/auth/signout

Response: 200 OK
{
  "message": "Signed out successfully"
}
```

### Get Current User
```typescript
GET /api/auth/user

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "display_name": "John Doe",
    "level": "B1",
    "avatar_url": "https://...",
    "created_at": "2026-05-04T12:00:00Z"
  }
}
```

---

## Dictionary API (Phase 2)

### Search Words
```typescript
GET /api/dictionary/search?q=hello&level=A1

Response: 200 OK
{
  "words": [
    {
      "id": "uuid",
      "word": "hello",
      "pronunciation": "/həˈloʊ/",
      "definition": "Used as a greeting",
      "example": "Hello, how are you?",
      "level": "A1"
    }
  ],
  "total": 1
}
```

### Get Word Details
```typescript
GET /api/dictionary/words/:id

Response: 200 OK
{
  "word": {
    "id": "uuid",
    "word": "hello",
    "pronunciation": "/həˈloʊ/",
    "definition": "Used as a greeting",
    "example": "Hello, how are you?",
    "level": "A1",
    "audio_url": "https://..."
  }
}
```

### Save Word to Collection
```typescript
POST /api/dictionary/save
Content-Type: application/json

{
  "vocabulary_id": "uuid"
}

Response: 201 Created
{
  "flashcard": {
    "id": "uuid",
    "vocabulary_id": "uuid",
    "next_review": "2026-05-05T12:00:00Z"
  }
}
```

---

## Flashcards API (Phase 2)

### Get Due Flashcards
```typescript
GET /api/flashcards/due

Response: 200 OK
{
  "flashcards": [
    {
      "id": "uuid",
      "word": "hello",
      "pronunciation": "/həˈloʊ/",
      "definition": "Used as a greeting",
      "example": "Hello, how are you?",
      "next_review": "2026-05-04T12:00:00Z",
      "interval_days": 1,
      "ease_factor": 2.5,
      "repetitions": 0
    }
  ],
  "total": 10
}
```

### Review Flashcard
```typescript
POST /api/flashcards/review
Content-Type: application/json

{
  "flashcard_id": "uuid",
  "quality": 4  // 0-5 (SM-2 algorithm)
}

Response: 200 OK
{
  "flashcard": {
    "id": "uuid",
    "next_review": "2026-05-06T12:00:00Z",
    "interval_days": 2,
    "ease_factor": 2.6,
    "repetitions": 1
  }
}
```

### Get Flashcard Statistics
```typescript
GET /api/flashcards/stats

Response: 200 OK
{
  "total": 100,
  "due_today": 10,
  "reviewed_today": 5,
  "mastered": 20,
  "learning": 80
}
```

---

## User Progress API

### Get Daily Progress
```typescript
GET /api/progress/daily?date=2026-05-04

Response: 200 OK
{
  "progress": {
    "date": "2026-05-04",
    "words_learned": 10,
    "flashcards_reviewed": 15,
    "ielts_tests_taken": 1,
    "podcasts_listened": 2,
    "study_time_minutes": 45
  }
}
```

### Update Progress
```typescript
POST /api/progress/update
Content-Type: application/json

{
  "words_learned": 5,
  "flashcards_reviewed": 10,
  "study_time_minutes": 30
}

Response: 200 OK
{
  "progress": {
    "date": "2026-05-04",
    "words_learned": 15,
    "flashcards_reviewed": 25,
    "study_time_minutes": 75
  }
}
```

### Get Weekly Statistics
```typescript
GET /api/progress/weekly

Response: 200 OK
{
  "stats": [
    {
      "date": "2026-05-04",
      "words_learned": 10,
      "flashcards_reviewed": 15,
      "study_time_minutes": 45
    },
    // ... 6 more days
  ],
  "totals": {
    "words_learned": 70,
    "flashcards_reviewed": 105,
    "study_time_minutes": 315
  }
}
```

---

## IELTS Tests API (Phase 3)

### Get All Tests
```typescript
GET /api/ielts/tests

Response: 200 OK
{
  "tests": [
    {
      "id": "uuid",
      "title": "IELTS Practice Test 1",
      "description": "Full IELTS Reading test",
      "duration_minutes": 60,
      "total_questions": 40
    }
  ]
}
```

### Get Test Questions
```typescript
GET /api/ielts/tests/:id/questions

Response: 200 OK
{
  "test": {
    "id": "uuid",
    "title": "IELTS Practice Test 1"
  },
  "questions": [
    {
      "id": "uuid",
      "question_number": 1,
      "question_text": "What is the main idea?",
      "question_type": "multiple_choice",
      "options": ["A", "B", "C", "D"]
    }
  ]
}
```

### Submit Test Answers
```typescript
POST /api/ielts/tests/:id/submit
Content-Type: application/json

{
  "answers": {
    "1": "A",
    "2": "B",
    "3": "C"
  }
}

Response: 200 OK
{
  "score": 35,
  "total": 40,
  "percentage": 87.5,
  "band_score": 7.5,
  "correct_answers": {
    "1": "A",
    "2": "C",
    "3": "C"
  }
}
```

---

## Podcasts API (Phase 3)

### Get All Podcasts
```typescript
GET /api/podcasts?level=B1

Response: 200 OK
{
  "podcasts": [
    {
      "id": "uuid",
      "title": "Daily English Conversation",
      "description": "Practice everyday English",
      "audio_url": "https://...",
      "duration_seconds": 300,
      "level": "B1"
    }
  ]
}
```

### Get Podcast Details
```typescript
GET /api/podcasts/:id

Response: 200 OK
{
  "podcast": {
    "id": "uuid",
    "title": "Daily English Conversation",
    "description": "Practice everyday English",
    "audio_url": "https://...",
    "transcript": "Hello everyone...",
    "duration_seconds": 300,
    "level": "B1",
    "vocabulary": [
      {
        "word": "conversation",
        "timestamp": 10
      }
    ]
  }
}
```

---

## Community API (Phase 4)

### Get Feed
```typescript
GET /api/community/feed?page=1&limit=20

Response: 200 OK
{
  "posts": [
    {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "display_name": "John Doe",
        "avatar_url": "https://..."
      },
      "content": "Just completed my first IELTS test!",
      "likes_count": 10,
      "comments_count": 3,
      "created_at": "2026-05-04T12:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "pages": 5
}
```

### Create Post
```typescript
POST /api/community/posts
Content-Type: application/json

{
  "content": "Just learned 50 new words today!"
}

Response: 201 Created
{
  "post": {
    "id": "uuid",
    "content": "Just learned 50 new words today!",
    "likes_count": 0,
    "comments_count": 0,
    "created_at": "2026-05-04T12:00:00Z"
  }
}
```

### Like Post
```typescript
POST /api/community/posts/:id/like

Response: 200 OK
{
  "likes_count": 11
}
```

---

## AI Tutor API (Phase 4)

### Send Message
```typescript
POST /api/ai-tutor/chat
Content-Type: application/json

{
  "message": "How do I use present perfect?",
  "context": {
    "user_level": "B1",
    "conversation_id": "uuid"
  }
}

Response: 200 OK
{
  "response": "The present perfect is used to...",
  "suggestions": [
    "I have studied English for 5 years",
    "She has visited Paris twice"
  ],
  "corrections": []
}
```

### Get Conversation History
```typescript
GET /api/ai-tutor/conversations/:id

Response: 200 OK
{
  "conversation": {
    "id": "uuid",
    "messages": [
      {
        "role": "user",
        "content": "How do I use present perfect?",
        "timestamp": "2026-05-04T12:00:00Z"
      },
      {
        "role": "assistant",
        "content": "The present perfect is used to...",
        "timestamp": "2026-05-04T12:00:05Z"
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": {
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Please sign in to access this resource"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

---

## Rate Limiting (Future)

```
Rate Limit: 100 requests per minute per user
Headers:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1620000000
```

---

**Last Updated:** 2026-05-04  
**Version:** 1.0.0  
**Status:** Phase 1 APIs implemented, Phase 2-4 planned

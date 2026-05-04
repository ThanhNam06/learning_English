# Learn English Platform - Technical Documentation

## Project Overview

**Name:** Learn English Platform  
**Type:** Full-stack web application  
**Tech Stack:** Next.js 14, TypeScript, Supabase, Tailwind CSS  
**Target Users:** Vietnamese English learners (A1-C2 levels)

## Core Features

### 1. Dictionary (Từ Điển)
- Search English words
- Pronunciation with audio
- Definitions and examples
- Save to personal collection
- Level-based vocabulary (A1-C2)

### 2. Flashcards (Thẻ Ghi Nhớ)
- Spaced repetition algorithm (SM-2)
- Personal vocabulary decks
- Review scheduling
- Progress tracking
- Daily review reminders

### 3. IELTS Mock Tests
- Full IELTS practice tests
- Reading, Listening, Writing, Speaking
- Auto-grading for objective sections
- Score calculation
- Performance analytics

### 4. Podcasts (Nghe Hiểu)
- English podcasts with transcripts
- Interactive vocabulary highlighting
- Playback speed control
- Level-based content
- Progress tracking

### 5. Community (Cộng Đồng)
- Social feed for learners
- Share progress and tips
- Like and comment system
- Study groups
- Peer motivation

### 6. AI Tutor (Trợ Lý AI)
- Chat with AI for practice
- Grammar correction
- Vocabulary suggestions
- Conversation practice
- Personalized learning tips

### 7. User Profile
- Learning statistics
- Progress dashboard
- Achievement badges
- Study streak tracking
- Level progression

### 8. Settings
- Account management
- Notification preferences
- Theme customization
- Language settings
- Privacy controls

## Architecture

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **State Management:** React hooks + SWR
- **Forms:** React Hook Form + Zod validation
- **UI Components:** Custom components + Radix UI

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (email/password + OAuth)
- **Storage:** Supabase Storage (audio files, images)
- **API:** Next.js API routes + Server Actions
- **Real-time:** Supabase Realtime subscriptions

### Security
- Row Level Security (RLS) policies
- JWT authentication
- httpOnly cookies for sessions
- Environment variable protection
- Input validation with Zod

### Deployment
- **Hosting:** Vercel
- **Database:** Supabase Cloud
- **CDN:** Vercel Edge Network
- **CI/CD:** GitHub → Vercel auto-deploy

## Database Schema

### Tables

1. **users** - User profiles
2. **user_progress** - Daily learning statistics
3. **vocabulary** - English words database
4. **flashcards** - User's flashcard collection
5. **ielts_tests** - IELTS test templates
6. **ielts_questions** - Test questions
7. **podcasts** - Audio content
8. **community_posts** - Social posts

### Relationships
- users → user_progress (1:many)
- users → flashcards (1:many)
- vocabulary → flashcards (1:many)
- ielts_tests → ielts_questions (1:many)
- users → community_posts (1:many)

## Development Phases

### Phase 1: Foundation (Week 1-2) ✅
- Project setup
- Authentication system
- Database schema
- Basic routing
- Deployment pipeline

### Phase 2: Core Features (Week 3-6)
- Dictionary implementation
- Flashcards with spaced repetition
- Vocabulary seeding
- User progress tracking

### Phase 3: IELTS & Content (Week 7-10)
- IELTS mock tests
- Podcasts with transcripts
- Content management
- Audio player

### Phase 4: Social & AI (Week 11-14)
- Community features
- AI tutor integration
- Real-time updates
- Notifications

### Phase 5: Polish & Launch (Week 15-16)
- UI/UX refinement
- Performance optimization
- Testing
- Production launch

## Key Technologies

- **Next.js 14:** React framework with App Router
- **TypeScript:** Type-safe development
- **Supabase:** Backend-as-a-Service
- **Tailwind CSS:** Utility-first styling
- **Zod:** Schema validation
- **SWR:** Data fetching and caching
- **React Hook Form:** Form management
- **Radix UI:** Accessible components

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=your_app_url
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
Learn_Eng/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages
│   ├── (dashboard)/       # Protected pages
│   └── auth/callback/     # OAuth callback
├── lib/                   # Utilities
│   ├── supabase/         # Supabase clients
│   ├── auth.ts           # Auth functions
│   └── validation.ts     # Zod schemas
├── hooks/                # React hooks
├── types/                # TypeScript types
├── components/           # React components
├── supabase/            # Database migrations
└── public/              # Static assets
```

## Links

- **GitHub:** https://github.com/ThanhNam06/learning_English
- **Supabase:** https://ledotsbpzvvhkeedfcou.supabase.co
- **Vercel:** (To be deployed)

---

**Last Updated:** 2026-05-04  
**Version:** 1.0.0  
**Status:** Phase 1 Complete

# Technical Stack - Learn English Platform

## Frontend Stack

### Core Framework
- **Next.js 14.2.4**
  - App Router (file-based routing)
  - Server Components by default
  - Client Components when needed
  - Server Actions for mutations
  - Middleware for auth
  - Image optimization
  - Font optimization

### Language
- **TypeScript 5.x**
  - Strict mode enabled
  - Additional safety rules:
    - `noUncheckedIndexedAccess`
    - `noImplicitOverride`
    - `noPropertyAccessFromIndexSignature`
    - `forceConsistentCasingInFileNames`
  - Type-safe database queries
  - Zod for runtime validation

### Styling
- **Tailwind CSS 4.0**
  - Utility-first approach
  - Custom design system
  - Dark mode support
  - Responsive design
  - CSS variables for theming
  - PostCSS with @tailwindcss/postcss

### UI Components
- **Radix UI** (planned)
  - Accessible primitives
  - Unstyled components
  - Keyboard navigation
  - ARIA attributes
- **Custom Components**
  - Built on top of Radix
  - Tailwind styling
  - Reusable patterns

### State Management
- **React Hooks**
  - useState, useEffect
  - useContext for global state
  - Custom hooks (useAuth, etc.)
- **SWR 2.2.5**
  - Data fetching
  - Caching
  - Revalidation
  - Optimistic updates
  - Real-time updates

### Forms
- **React Hook Form 7.54.2**
  - Performance optimization
  - Minimal re-renders
  - Easy validation
  - TypeScript support
- **Zod 3.24.1**
  - Schema validation
  - Type inference
  - Error messages
  - Custom validators

---

## Backend Stack

### Database
- **Supabase (PostgreSQL 15)**
  - Hosted PostgreSQL
  - RESTful API auto-generated
  - Real-time subscriptions
  - Full-text search
  - JSON support
  - Triggers and functions

### Authentication
- **Supabase Auth**
  - Email/Password
  - Google OAuth
  - JWT tokens
  - Session management
  - Row Level Security
  - Magic links (future)

### Storage
- **Supabase Storage**
  - Audio files (podcasts)
  - User avatars
  - Test materials
  - CDN delivery
  - Access control

### API
- **Next.js API Routes**
  - RESTful endpoints
  - Server Actions
  - Edge functions
  - Middleware
  - Rate limiting (future)

---

## Database Schema

### Tables (8 total)

#### 1. users
```sql
- id: UUID (PK, references auth.users)
- email: TEXT
- display_name: TEXT
- level: TEXT (A1-C2)
- avatar_url: TEXT
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 2. user_progress
```sql
- id: UUID (PK)
- user_id: UUID (FK → users)
- date: DATE
- words_learned: INTEGER
- flashcards_reviewed: INTEGER
- ielts_tests_taken: INTEGER
- podcasts_listened: INTEGER
- study_time_minutes: INTEGER
- created_at: TIMESTAMPTZ
```

#### 3. vocabulary
```sql
- id: UUID (PK)
- word: TEXT (unique)
- pronunciation: TEXT
- definition: TEXT
- example: TEXT
- level: TEXT (A1-C2)
- created_at: TIMESTAMPTZ
```

#### 4. flashcards
```sql
- id: UUID (PK)
- user_id: UUID (FK → users)
- vocabulary_id: UUID (FK → vocabulary)
- next_review: TIMESTAMPTZ
- interval_days: INTEGER
- ease_factor: DECIMAL(3,2)
- repetitions: INTEGER
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 5. ielts_tests
```sql
- id: UUID (PK)
- title: TEXT
- description: TEXT
- duration_minutes: INTEGER
- total_questions: INTEGER
- created_at: TIMESTAMPTZ
```

#### 6. ielts_questions
```sql
- id: UUID (PK)
- test_id: UUID (FK → ielts_tests)
- question_number: INTEGER
- question_text: TEXT
- question_type: TEXT (enum)
- correct_answer: TEXT
- created_at: TIMESTAMPTZ
```

#### 7. podcasts
```sql
- id: UUID (PK)
- title: TEXT
- description: TEXT
- audio_url: TEXT
- transcript: TEXT
- duration_seconds: INTEGER
- level: TEXT (A1-C2)
- created_at: TIMESTAMPTZ
```

#### 8. community_posts
```sql
- id: UUID (PK)
- user_id: UUID (FK → users)
- content: TEXT
- likes_count: INTEGER
- comments_count: INTEGER
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### Security (RLS Policies)
- Users can only access their own data
- Public tables (vocabulary, tests, podcasts) are read-only
- Community posts visible to all, editable by owner
- Automatic profile creation via trigger

---

## Development Tools

### Package Manager
- **npm** (Node.js 22.x)

### Code Quality
- **ESLint 9.x**
  - Next.js config
  - TypeScript rules
  - Custom rules
- **Prettier** (planned)
  - Code formatting
  - Import sorting

### Version Control
- **Git**
  - GitHub repository
  - Feature branches
  - Conventional commits
  - Protected main branch

### CI/CD
- **Vercel**
  - Auto-deploy on push
  - Preview deployments
  - Environment variables
  - Edge network
  - Analytics

---

## Third-Party Services

### AI Services (Future)
- **OpenAI GPT-4**
  - AI tutor conversations
  - Grammar correction
  - Content generation
- **Groq**
  - Fast inference
  - Cost optimization
  - Fallback option

### Payment (Future)
- **VNPay**
  - Vietnamese payment gateway
  - Local cards
  - Bank transfer
- **PayPal**
  - International payments
  - Credit cards
  - Subscriptions

### Analytics (Future)
- **Vercel Analytics**
  - Web vitals
  - Page views
  - User flow
- **PostHog** (planned)
  - Product analytics
  - Feature flags
  - A/B testing

### Monitoring (Future)
- **Sentry**
  - Error tracking
  - Performance monitoring
  - Release tracking
- **Vercel Logs**
  - Server logs
  - Function logs
  - Real-time debugging

---

## Performance Optimizations

### Frontend
- Server Components by default
- Client Components only when needed
- Image optimization (next/image)
- Font optimization (next/font)
- Code splitting
- Lazy loading
- Prefetching

### Backend
- Database indexes
- Query optimization
- Connection pooling
- Caching with SWR
- Edge functions
- CDN for static assets

### Build
- Turbopack (dev mode)
- Tree shaking
- Minification
- Compression
- Bundle analysis

---

## Security Measures

### Authentication
- JWT tokens
- httpOnly cookies
- CSRF protection
- Session timeout
- Password hashing (Supabase)

### Database
- Row Level Security (RLS)
- Prepared statements
- Input validation
- SQL injection prevention

### Application
- Environment variables
- Secrets management
- HTTPS only
- Content Security Policy
- Rate limiting (future)

### Code
- TypeScript strict mode
- Zod validation
- ESLint security rules
- Dependency audits

---

## Development Environment

### Required
- Node.js 22.x
- npm 10.x
- Git
- Code editor (VS Code recommended)

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- GitLens

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

---

## Deployment Architecture

```
User Request
    ↓
Vercel Edge Network (CDN)
    ↓
Next.js App (Vercel Serverless)
    ↓
Supabase (Database + Auth + Storage)
```

### Regions
- **Vercel:** Global edge network
- **Supabase:** Southeast Asia (Singapore)
- **CDN:** Worldwide

### Scaling
- Serverless auto-scaling
- Database connection pooling
- CDN caching
- Edge functions

---

**Last Updated:** 2026-05-04  
**Version:** 1.0.0

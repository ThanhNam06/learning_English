# Frontend - Learn English Platform

## Mục tiêu

Xây dựng frontend cho platform học tiếng Anh với Next.js App Router, tối ưu hiệu suất và trải nghiệm người dùng.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context (local), Server Components (data fetching)
- **Animation**: motion (Framer Motion)
- **Charts**: Recharts
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## Cấu trúc App Router

```
src/app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── globals.css             # Global styles
├── dictionary/
│   └── page.tsx           # Dictionary page
├── flashcards/
│   └── page.tsx           # Flashcards page
├── ielts/
│   ├── page.tsx           # IELTS overview
│   ├── list/
│   │   └── [type]/page.tsx  # Test list by type
│   └── do-test/
│       └── [type]/
│           └── [testId]/page.tsx  # Take test
├── podcasts/
│   └── page.tsx           # Podcasts page
├── community/
│   └── page.tsx           # Community page
├── ai-tutor/
│   └── page.tsx           # AI Tutor page
├── upgrade/
│   └── page.tsx           # Upgrade page
├── profile/
│   └── page.tsx           # User profile
├── settings/
│   └── page.tsx           # Settings
├── legal/
│   └── [type]/page.tsx   # Legal pages
├── login/
│   └── page.tsx           # Login page
└── admin/
    └── page.tsx           # Admin dashboard
```

## Component Strategy

### Server Components (Mặc định)

- Layout components
- Data fetching pages
- Static content
- SEO-critical pages

### Client Components (Khi cần)

- Flashcards (flip animation)
- Forms (input, validation)
- Interactive charts
- Real-time updates
- Auth state management

## Việc đã hoàn thành

- [x] Next.js 15 setup với App Router
- [x] Tailwind CSS 4 configuration
- [x] shadcn/ui components installation
- [x] Supabase client dependencies
- [x] Basic page structure

## Việc cần làm tiếp theo

- [ ] Tích hợp Supabase client
- [ ] Chuyển đổi pages từ `src/app/pages/` sang App Router
- [ ] Tạo Server Components cho data fetching
- [ ] Tạo Client Components cho interactivity
- [ ] Setup authentication flow
- [ ] Implement error boundaries
- [ ] Add loading states

## Quyết định kỹ thuật

1. **Server Components mặc định**: Tối ưu SEO và performance, giảm bundle size
2. **Client Components chỉ khi cần**: Giảm JavaScript trên client
3. **Supabase SSR**: Sử dụng `@supabase/ssr` cho server-side auth
4. **TypeScript strict mode**: Đảm bảo type safety

## Lưu ý quan trọng

- Mọi page mới phải là Server Component trừ khi có lý do cụ thể
- Sử dụng `'use client'` directive chỉ khi cần interactivity
- Data fetching ưu tiên Server Components
- Environment variables quản lý qua Vercel

# 🚀 Hướng Dẫn Deploy và Setup

## ✅ Đã Hoàn Thành

- ✅ Next.js 14 app với TypeScript strict mode
- ✅ Authentication system (login, register)
- ✅ Dashboard với 8 pages
- ✅ Database schema migration file
- ✅ Code đã push lên GitHub
- ✅ Build thành công

---

## 📋 Các Bước Tiếp Theo

### 1. Deploy lên Vercel

**Option A: Vercel Dashboard (Khuyến nghị)**

1. Truy cập https://vercel.com/new
2. Import GitHub repository: `ThanhNam06/learning_English`
3. Configure Project:
   - Framework Preset: Next.js
   - Root Directory: `./` (để trống)
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Environment Variables** (Quan trọng!):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ledotsbpzvvhkeedfcou.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZG90c2JwenZ2aGtlZWRmY291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MzgxMzMsImV4cCI6MjA5MzMxNDEzM30.otwB59vn_w2RvOd1rwNXgLcmMK0qCuEVrda4UA_QWOk
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZG90c2JwenZ2aGtlZWRmY291Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzczODEzMywiZXhwIjoyMDkzMzE0MTMzfQ.42KC0iF6EdKzmRugXI_1gOylgyYOftYUz14I8c7030I
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```
   
   **Lưu ý:** Sau khi deploy, cập nhật `NEXT_PUBLIC_APP_URL` với URL thực tế của Vercel

5. Click **Deploy**

6. Sau khi deploy xong, cập nhật lại environment variable:
   - Vào Project Settings → Environment Variables
   - Sửa `NEXT_PUBLIC_APP_URL` thành URL thực tế (vd: `https://learning-english-xyz.vercel.app`)
   - Redeploy

**Option B: Vercel CLI**

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Sau khi deploy, set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_APP_URL

# Deploy production
vercel --prod
```

---

### 2. Run Database Migration

1. Truy cập Supabase Dashboard: https://supabase.com/dashboard/project/ledotsbpzvvhkeedfcou

2. Vào **SQL Editor** (menu bên trái)

3. Click **New Query**

4. Copy toàn bộ nội dung file `supabase/migrations/001_initial_schema.sql`

5. Paste vào SQL Editor

6. Click **Run** (hoặc Ctrl+Enter)

7. Verify tables đã được tạo:
   - Vào **Table Editor**
   - Kiểm tra 8 tables: users, user_progress, vocabulary, flashcards, ielts_tests, ielts_questions, podcasts, community_posts

---

### 3. Configure Google OAuth

1. **Google Cloud Console:**
   - Truy cập https://console.cloud.google.com
   - Tạo project mới hoặc chọn project có sẵn
   - Vào **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs:
     ```
     https://ledotsbpzvvhkeedfcou.supabase.co/auth/v1/callback
     ```
   - Copy **Client ID** và **Client Secret**

2. **Supabase Dashboard:**
   - Vào **Authentication** → **Providers**
   - Enable **Google**
   - Paste Client ID và Client Secret
   - Save

---

### 4. Test Authentication Flow

1. Truy cập app trên Vercel: `https://your-app.vercel.app`

2. Test các flow:
   - ✅ Click "Đăng Ký Ngay" → Register form
   - ✅ Điền thông tin → Submit
   - ✅ Check email confirmation (nếu có)
   - ✅ Login với email/password
   - ✅ Login với Google OAuth
   - ✅ Redirect về /dictionary sau khi login
   - ✅ Logout → Redirect về /

3. Verify trong Supabase:
   - Vào **Authentication** → **Users**
   - Kiểm tra user mới được tạo
   - Vào **Table Editor** → **users**
   - Kiểm tra profile được tạo tự động

---

## 🔍 Troubleshooting

### Build Failed
```bash
# Local test
npm run build

# Check logs
vercel logs
```

### Authentication Not Working
- Kiểm tra environment variables đã set đúng
- Verify Google OAuth redirect URI
- Check Supabase logs: Authentication → Logs

### Database Connection Failed
- Verify Supabase credentials
- Check RLS policies enabled
- Run migration lại nếu cần

---

## 📊 Current Status

- ✅ Code: Pushed to GitHub
- ⏳ Vercel: Chưa deploy (cần user thực hiện)
- ⏳ Database: Chưa migrate (cần user thực hiện)
- ⏳ Google OAuth: Chưa configure (cần user thực hiện)

---

## 🎯 Next Steps After Deploy

1. Test authentication flow
2. Seed vocabulary data (Phase 2)
3. Implement Dictionary feature (Phase 2)
4. Implement Flashcards feature (Phase 2)

---

**Prepared by:** Claude Opus 4.7  
**Date:** 2026-05-04  
**GitHub:** https://github.com/ThanhNam06/learning_English  
**Supabase:** https://ledotsbpzvvhkeedfcou.supabase.co

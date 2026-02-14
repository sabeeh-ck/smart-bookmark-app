# Smart Bookmark App

A simple personal bookmark manager built with Next.js and Supabase.  
Users can log in with Google, save bookmarks, and see updates in real-time across tabs. All bookmarks are private per user.

## Live Demo

**Live URL:** https://smart-bookmark-app-demo-ck.vercel.app

## Tech Stack

- Next.js (App Router)
- Supabase (Auth + Postgres + Realtime)
- Google OAuth
- Tailwind CSS
- Vercel (Deployment)

## Features

- Google OAuth login (no email/password)
- Add bookmarks (URL + title)
- Delete your own bookmarks
- Real-time updates across multiple tabs
- Private bookmarks per user (Row Level Security enabled)
- Fully deployed on Vercel

## Authentication

Authentication is handled using Supabase Google OAuth.  
Only logged-in users can access bookmarks.

Bookmarks are protected using **Row Level Security (RLS)** policies to ensure:

- Users can only read their own bookmarks
- Users can only insert/delete their own bookmarks

## ⚙️ Local Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app
```

2. Install dependencies:

```
npm install
```

3. Create a .env.local file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run locally:

```
npm run dev
```

## Challenges Faced & Solutions

#### 1. Google OAuth redirecting to localhost

After deploying to Vercel, Google login kept redirecting back to `localhost`.  
It turned out the production URL wasn’t added properly in Supabase’s redirect settings.  
I fixed it by updating the authorized redirect URLs and redeploying.

#### 2. Real-time not updating across tabs

At first, bookmarks only updated after refreshing the page.  
To fix this, I subscribed to Supabase Realtime changes on the bookmarks table and updated state when INSERT or DELETE events fired.

#### 3. Loading user session before fetching data

Sometimes bookmarks would try to load before the user session was available, causing empty results.  
I handled this by fetching the authenticated user first and only querying bookmarks once the user ID was confirmed.

#### 4. Making bookmarks truly private

Just filtering by user ID on the frontend isn’t secure.  
I enabled Row Level Security in Supabase and added policies so users can only access records where `user_id = auth.uid()`.

## Deployment

- Deployed on Vercel

- Environment variables configured in Vercel dashboard
- Supabase OAuth redirect URLs updated to include production domain

## Future Improvements

- Automatic metadata fetching (title/preview image)

- Search and filtering

- Pagination for large bookmark lists

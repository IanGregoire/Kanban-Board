# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

# 🏗️ Remix Kanban Board with Supabase

A **Kanban Board** built with **Remix** and **Supabase** for real-time task management. This project supports **drag-and-drop**, real-time updates, and persistence using Supabase as the backend.

---

## 🚀 Features
- 🖼 **Drag-and-Drop** task management  
- 🔄 **Real-time Updates** with Supabase  
- 🛠 **Remix for Full-Stack Rendering**  
- 🔐 **Authentication (Optional - Supabase Auth)**  
- 💾 **Persistent Storage with Supabase Database**  
- 🌎 **Deployable on Vercel, Netlify, or Fly.io**  

---

## 🏗️ Installation & Setup

### 1️⃣ Clone the repository:
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/remix-kanban.git
cd remix-kanban
```

### Install dependencies
```bash
npm install
```

### Setup Supabase
- Go to supabase.com and create new project
- Copy your SUPABASE_URL and SUPABASE_ANON_KEY from the project settings.
- Create a .env file and add
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Run Development Server
```bash
npm run dev
```

Now open your browser and go to http://localhost:3000

### Project Structure
```bash
remix-kanban/
│-- app/
│   ├── routes/
│   │   ├── _index.tsx      # Main Kanban board
│   │   ├── api/            # API routes for Supabase actions
│   ├── components/         # Reusable UI components
│   ├── utils/
│   │   ├── supabase.server.ts  # Server-side Supabase client
│   │   ├── supabase.client.ts  # Client-side Supabase client
│-- public/                 # Static assets
│-- .env                    # Environment variables (not committed)
│-- package.json
│-- remix.config.js
│-- README.md
```

### Deployment
- Deploy to Vercel
  ```bash
  vercel
  ```
  Set environment variables on Vercel dashboard (SUPABASE_URL, SUPABASE_ANON_KEY

- Deploy to Netlify
```bash
netlify deploy
```
Add .env variables in Netlify dashboard → Site settings → Environment Variables.

- Deploy to Fly.io
```bash
flyctl launch
```
Set secrets
```bash
flyctl secrets set SUPABASE_URL=your-supabase-url SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Technologies Used
- Remix - Full-stack React Framework
- Supabase - Backend as a Service
- React - UI Framework
- Tailwind CSS(Optional) - Styling

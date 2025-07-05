import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData 
} from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useEffect } from "react";
import { useThemeStore } from "./stores/useThemeStore";

import "./tailwind.css";

// Expose environment variables to the client
export const loader: LoaderFunction = () => {
  return json({
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Kanban Board - Oraganize Your Projects' },
    {
      name: 'description',
      content: 'A modern Kanban board to manage tasks, projects, and teams with support for labels, priorities, Git metadata, and dark mode.'
    },
    { name: 'viewport', content: 'width=device-width, intial-scale=1' },
    { name: 'theme-color', content: '#0f172a' },
    { name: 'keywords', content: 'Kanban, Project Management, Tasks, Git, Supabase, Remix' },
    { name: 'author', content: 'Ian Gregoire' },
    { property: 'og:title' , content: 'Kanban Board' },
    { 
      property: 'og:description',
      content: 'Task and project management with Git integration and dark mode.'
     },
     { property: "og:url", content: "https://kanban-board-pied-iota.vercel.app" },
  ]
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export default function App() {
  const data = useLoaderData<typeof loader>();

  const setTheme = useThemeStore((state: any) => state.setTheme);

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(stored);
  }, [setTheme])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id='root'>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data)}`,
            }}
          />
        </div>
      </body>
    </html>
  );
}
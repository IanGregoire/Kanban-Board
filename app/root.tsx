import {
  Links,
  Meta,
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

  // const setTheme = useThemeStore((state: any) => state.setTheme);

  // useEffect(() => {
  //   const stored = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  //   setTheme(stored);
  // }, [setTheme])

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
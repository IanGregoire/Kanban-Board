// app/routes/_index.tsx
import { Link } from "@remix-run/react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Remix Kanban</h1>
      <p className="mb-6 text-center max-w-xl">
        A modern task management tool with dark mode, Git integration, label filtering, and more.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Log In</Link>
        <Link to="/signup" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sign Up</Link>
      </div>
    </div>
  );
}

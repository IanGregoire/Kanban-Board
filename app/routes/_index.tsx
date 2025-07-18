// app/routes/_index.tsx
import { Link } from "@remix-run/react";
import PublicLayout from "~/components/PublicLayout";

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Remix Kanban</h1>
        <p className="text-lg mb-6">Organize your tasks with a beautiful, responsive kaban board</p>
        <a href='/signup' className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded shadow">
          Try It Now
        </a>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-4">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Task Labels</h3>
            <p className="text-gray-700 dark:text-gray-300">Prioritize and categorize your tasks with customizable labels.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Dark/Light Mode</h3>
            <p className="text-gray-700 dark:text-gray-300">Switch themes effortlessly based on your preference or system settings.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Project Filtering</h3>
            <p className="text-gray-700 dark:text-gray-300">Work across multiple projects and filter tasks easily.</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

// app/routes/_index.tsx
import { Link } from "@remix-run/react";
import { BsTags, BsMoonStars, BsFolder } from 'react-icons/bs';
import PublicLayout from "~/components/PublicLayout";

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-10">
          {/* Text Column */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Remix Kanban
            </h1>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              Organize your tasks with a beautiful, responsive Kanban board.
            </p>
            <a
              href="/signup"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded shadow transition transform hover:scale-105"
            >
              Try It Now
            </a>
          </div>

          {/* Visual / Mockup Column */}
          <div className="flex-1 relative">
            {/* Background board */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-md mx-auto">
              {/* Example cards */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-700 rounded p-4 shadow transform transition duration-500 hover:translate-y-[-3px] hover:shadow-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Design homepage</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded p-4 shadow transform transition duration-500 hover:translate-y-[-3px] hover:shadow-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Add authentication</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded p-4 shadow transform transition duration-500 hover:translate-y-[-3px] hover:shadow-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Set up project filters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-3 text-center">
        <div className="flex flex-col items-center">
          <BsTags className="text-blue-600 dark:text-blue-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Task Labels</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Prioritize and categorize your tasks with customizable labels.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <BsMoonStars className="text-yellow-500 dark:text-yellow-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Dark/Light Mode</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Switch themes effortlessly based on your preference or system settings.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <BsFolder className="text-green-600 dark:text-green-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Project Filtering</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Work across multiple projects and filter tasks easily.
          </p>
        </div>
      </div>
    </section>
    </PublicLayout>
  );
}

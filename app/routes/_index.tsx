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

      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          
          {/* HOW IT WORKS */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              How It Works
            </h2>

            <ol className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-lg">Create a Project</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Organize work by projects to keep everything focused.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-lg">Columns</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Define your workflow — To Do, In Progress, Done.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-lg">Create Tasks</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Add tasks, assign labels, and track progress visually.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
                  4
                </span>
                <div>
                  <h4 className="font-semibold text-lg">Stay Organized</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Filter by project, switch themes, and stay productive.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* DEMO */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              {/* Replace src with your real GIF or video */}
              <video
                src="/demo/kanban-demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-auto rounded-lg shadow-lg"
              >
                Your browser does not support the video tag.
              </video>

            </div>

            {/* Optional floating label */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm shadow">
              Live Demo
            </div>
          </div>

        </div>
      </section>

    </PublicLayout>
  );
}

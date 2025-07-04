import { Form } from "@remix-run/react";
import { Link } from '@remix-run/react';
import { ThemeToggle } from "./themeToggle";

interface TopBarProps {
    email: string;
    selectedProjectId: number;
    projects: any[];
    setShowDeleteModal: () => boolean;
    setShowProjectModal: () => boolean;
    setShowNewTaskModal: () => boolean;
}

export default function TopBar({email, selectedProjectId, projects, setShowDeleteModal, setShowProjectModal, setShowNewTaskModal}: TopBarProps) {
    return (
      <div className="flex justify-between items-center px-6 py-4 br-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
        <Form method="get" className="flex items-center gap-3">
          <select
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-3 py-2 text-gray-900 dark:text-white"
            name="projectId"
            defaultValue={selectedProjectId}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
          >
            {projects.map((project: any) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <input type="hidden" name="intent" value="delete-project" />
          <input type="hidden" name="projectId" value={selectedProjectId} />
          <button
            type="submit"
            className="px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded disabled:opacity-50"
            disabled={!selectedProjectId}
            onClick={() => setShowDeleteModal()}
          >
            🗑 Delete Project
          </button>

          <button
            type="button"
            onClick={() => setShowProjectModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded"
          >
            + Add Project
          </button>

          <button
            type="button"
            onClick={() => setShowNewTaskModal()}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded"
          >
            + Add Task
          </button>
        </Form>

        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-700 dark:text-gray-300"> User: {email} </p>
          
          <Link
            to='/settings'
            className="px-3 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
          >
            ⚙️ Settings
          </Link>

          <Form method="post" action="/logout">
            <button 
              type="submit" 
              className="px-3 py-2 ml-2 text-sm font-medium text-white bg-red-500 hover:bg-red-700 rounded"
            >
              Logout
            </button>
          </Form>

          <ThemeToggle />
        </div>
      </div>
    )
}
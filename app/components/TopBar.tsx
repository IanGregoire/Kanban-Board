import { Form } from "@remix-run/react";

interface TopBarProps {
    selectedProjectId: number;
    projects: any[];
    setShowDeleteModal: () => boolean;
    setShowProjectModal: () => boolean;
    setShowNewTaskModal: () => boolean;
}

export default function TopBar({selectedProjectId, projects, setShowDeleteModal, setShowProjectModal, setShowNewTaskModal}: TopBarProps) {
    return (
      <>
        <Form method="get" className="flex items-center gap-3">
          <select
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
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
            className="ml-2 px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
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
        <Form method="post" action="/logout">
          <button 
            type="submit" 
            className="px-3 py-2 ml-2 text-sm text-white font-medium bg-red-500 hover:bg-red-800 rounded"
          >
            Logout
          </button>
        </Form>
      </>
    )
}
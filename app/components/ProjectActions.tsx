import { Form } from "@remix-run/react";

interface ProjectActionsProps {
    selectedProjectId: number;
    setShowDeleteModal: () => boolean;
    setShowProjectModal: () => boolean;
    setShowNewTaskModal: () => boolean;
}

export default function ProjectActions({selectedProjectId, setShowDeleteModal, setShowProjectModal, setShowNewTaskModal}: ProjectActionsProps) {
    return (
          <>
            <Form method="post">
                <input type="hidden" name="intent" value="delete-project" />
                <input type="hidden" name="projectId" value={selectedProjectId} />
                <button
                type="submit"
                className="px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded disabled:opacity-50"
                disabled={!selectedProjectId}
                onClick={setShowDeleteModal}
                >
                🗑 Delete Project
                </button>
            </Form>

            <button
                type="button"
                onClick={setShowProjectModal}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded"
            >
                + Add Project
            </button>

            <button
                type="button"
                onClick={setShowNewTaskModal}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded"
            >
                + Add Task
            </button>
          </>
    )
}
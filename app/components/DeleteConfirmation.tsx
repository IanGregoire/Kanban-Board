import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { useModalAccessibility } from "~/hooks/useModalAccessability";

interface DeleteConfirmationProps {
    selectedProjectId: number;
    setShowDeleteModal: () => boolean;
    handleProjectDelete: () => void;
}

export default function DeleteConfirmation({ selectedProjectId, setShowDeleteModal, handleProjectDelete}: DeleteConfirmationProps) {
  const onClose = () =>  setShowDeleteModal();
  
  const modalRef = useModalAccessibility(onClose);
  return (
        <div
          ref={modalRef}
          tabIndex={0}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 id="delete-dialog-title" className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Project
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this project? All associated tasks will also be deleted. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal()}
                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
              >
                Cancel
              </button>
              <Form method="post">
                <input type="hidden" name="intent" value="delete-project" />
                <input type="hidden" name="projectId" value={selectedProjectId} />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600"
                  onClick={handleProjectDelete}
                >
                  Yes, Delete
                </button>
              </Form>
            </div>
          </div>
        </div>
    )
}
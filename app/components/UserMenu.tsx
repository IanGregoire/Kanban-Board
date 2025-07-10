import { Form } from "@remix-run/react";
import { Link } from '@remix-run/react';
import { ThemeToggle } from "./themeToggle";
import { useState } from "react";
import ProjectActions from "./ProjectActions";

interface UserMenuProps {
    email: string;
    selectedProjectId: number;
    setShowDeleteModal: () => boolean;
    setShowProjectModal: () => boolean;
    setShowNewTaskModal: () => boolean;
}

export default function UserMenu({ email, selectedProjectId, setShowDeleteModal, setShowProjectModal, setShowNewTaskModal }: UserMenuProps)  {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isTabletMenuOpen, setIsTabletMenuOpen] = useState(false);

    return (
        <>
          <div className="hidden xl:flex items-center gap-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">User: {email}</p>

            <Link
                to="/settings"
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
            <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden text-gray-700 dark:text-white text-2xl"
            >
                ☰
            </button>
            <button
                onClick={() => setIsTabletMenuOpen((prev) => !prev)}
                className="hidden md:block xl:hidden text-gray-700 dark:text-white text-2xl"
            >
                ☰
            </button>
            {isTabletMenuOpen && (
              <div className="hidden md:flex xl:hidden absolute right-2 mt-64 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex-col gap-3 z-50">
                <p className="text-sm text-gray-700 dark:text-gray-300">User: {email}</p>

                <Link
                    to="/settings"
                    className="px-3 py-2 text-center text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                >
                    ⚙️ Settings
                </Link>

                <Form method="post" action="/logout">
                    <button
                    type="submit"
                    className="px-3 py-2 w-full text-sm font-medium text-white bg-red-500 hover:bg-red-700 rounded"
                    >
                    Logout
                    </button>
                </Form>
                <ThemeToggle />
              </div>
            )}
            {isMobileMenuOpen && (
              <div className="md:hidden absolute right-2 mt-96 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col gap-3 z-50">
                <ProjectActions 
                    selectedProjectId={selectedProjectId} 
                    setShowDeleteModal={setShowDeleteModal} 
                    setShowProjectModal={setShowProjectModal} 
                    setShowNewTaskModal={setShowNewTaskModal}
                />
                <p className="text-sm text-gray-700 dark:text-gray-300">User: {email}</p>

                <Link
                    to="/settings"
                    className="px-3 py-2 text-center text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                >
                    ⚙️ Settings
                </Link>

                <Form method="post" action="/logout">
                    <button
                    type="submit"
                    className="px-3 py-2 w-full text-sm font-medium text-white bg-red-500 hover:bg-red-700 rounded"
                    >
                    Logout
                    </button>
                </Form>
                <ThemeToggle />
              </div>
            )}
        </>
    )
}
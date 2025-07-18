import { Form } from "@remix-run/react";
import { Link } from '@remix-run/react';
import { useState } from "react";
import UserMenu from "./UserMenu";
import ProjectActions from "./ProjectActions";

interface TopBarProps {
    email: string;
    selectedProjectId: number;
    selectedProjectName: string;
    projects: any[];
    setShowDeleteModal: () => boolean;
    setShowProjectModal: () => boolean;
    setShowNewTaskModal: () => boolean;
}

export default function TopBar({email, selectedProjectId, selectedProjectName, projects, setShowDeleteModal, setShowProjectModal, setShowNewTaskModal}: TopBarProps) {

    return (
      <div className="relative flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Form method="get" className="flex items-center gap-3">
            <select
              name="projectName"
              value={selectedProjectName}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-3 py-2 text-gray-900 dark:text-white"
            >
              {projects.map((project: any) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </Form>

          <div className="hidden md:flex flex-row gap-3">
            <ProjectActions 
              selectedProjectId={selectedProjectId} 
              setShowDeleteModal={setShowDeleteModal} 
              setShowProjectModal={setShowProjectModal} 
              setShowNewTaskModal={setShowNewTaskModal}
            />
          </div> 
        </div>

        <UserMenu 
          email={email} 
          selectedProjectId={selectedProjectId} 
          setShowDeleteModal={setShowDeleteModal} 
          setShowProjectModal={setShowProjectModal} 
          setShowNewTaskModal={setShowNewTaskModal}
        />
      </div>
    )
}
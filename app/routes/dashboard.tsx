import { useState } from "react";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { supabase, requireUser } from "~/utils/supabase.server"; // Server-side client
import Column from "~/components/Column";
import TaskModal, { Label } from "~/components/TaskModal";
import { json, redirect  } from "@remix-run/node";
import ProjectModal from "~/components/ProjectModal";
import TopBar from "~/components/TopBar";
import DeleteConfirmation from "~/components/DeleteConfirmation";
import {
  createProject,
  deleteProject,
  createTask,
  updateTask,
  deleteTask,
  updateTaskLabels,
  maxPosition,
  deleteLabels,
} from '~/routes/api/mutations';

type Column = {
  id: number;
  title: string;
  position: number;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  git_branch: string;
  git_commit: string;
  column_id: number;
  position: number;
  start_date: string;
  end_date: string;
  labels: Label[];
}

// Loader to fetch initial data
export const loader: LoaderFunction = async({ request }) => {
  const session = await supabase.auth.getSession();
  const user = await requireUser(request);

  if (!session.data.session) {
    return redirect("/login");
  }
  
  try {
    const url = new URL(request.url);
    const projectNameFromUrl = url.searchParams.get("projectName");

    let { data: projects, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order('id');
    
    if(projectError) throw new Error(`Projects fetch error: ${projectError.message}`);

    if (!projects || projects.length === 0) {
      const { data: insertedProjects, error: insertError } = await supabase
        .from('projects')
        .insert({ name: 'First Project', user_id: user.id})
        .select();

        if(insertError) {
          console.error('Failed to create starter project: ', insertError.message);
          throw new Response("Failed to create starter project", { status: 500 });
        }

        projects = insertedProjects;
    }

    // Determine selected project
    const selectedProject =
      projects.find((p) => p.name === projectNameFromUrl) || projects[0];

    const { data: columns, error: columnError } = await supabase
    .from("columns")
    .select("*")
    .order("position");
    
    if(columnError) throw new Error(`Columns fetch error: ${columnError.message}`);

    const { data: tasks, error: taskError } = await supabase
    .from('tasks')
    .select("*, task_labels(label_id, labels(id, name, color))")
    .eq("project_id", selectedProject.id);

    if(taskError) throw new Error(`Tasks fetch error: ${taskError.message}`);

    const { data: labels } = await supabase
    .from('labels')
    .select('id, name, color, category')

    const { data: taskLabels } = await supabase
    .from('task_labels')
    .select('task_id, label_id');

    const tasksWithLabels = tasks?.map((task) => ({
      ...task,
      labels: task.task_labels.map((tl: any) => tl.labels),
    }));


    return json({ projects, selectedProject, columns, tasks: tasksWithLabels, email: user.email, labels, taskLabels});
  } catch(error: any) {
    console.error('Loader Error:', error.message);
    throw new Response(error.message, { status: 500 });
  }
};

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const projectName = url.searchParams.get("projectName");

  const user = await requireUser(request);
  if (!user) throw new Error("Not authenticated");

  const formData = await request.formData();

  const intent = formData.get('intent');
  const mode = formData.get('mode');
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const git_branch = formData.get("git_branch") as string | null;
  const git_commit = formData.get("git_commit") as string | null;
  const column_id = Number(formData.get("column_id"));
  const project_id = formData.get("project_id") as string;

  const labelIds = formData.getAll("labels") as string[];

  // Use today's date as fallback
  const start_date = formData.get("start_date") || today; // before || today was as string || null
  const end_date = formData.get("end_date") || today; 

  // Validate 1 label per category
  const { data: allLabels } = await supabase.from("labels").select("*");
  const selected = allLabels!.filter(label => labelIds.includes(label.id.toString()));
  const categoryCounts = selected.reduce((acc, label) => {
    acc[label.category] = (acc[label.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  for (const [cat, count] of Object.entries(categoryCounts) as [string, number][]) {
    if (count > 1) {
      return json({ error: `Only one label allowed in "${cat}" category.` }, { status: 400 });
    }
  }

  if (intent === "create-project") {
    const name = formData.get("name") as string;
    const { error } = await createProject(user.id, name);
    if (error) return json({ error: "Failed to add project" }, { status: 500 });

    return redirect(`/dashboard?projectName=${encodeURIComponent(name)}`);
  }

  if(intent === 'delete-project') {
    const projectId = formData.get("projectId") as string;
    const { error } = await deleteProject(projectId);
    if (error) return json({ error: "Failed to delete project" }, { status: 500 });
  
    // Fetch remaining projects for this user
    const { data: remainingProjects } = await supabase
      .from("projects")
      .select("name")
      .eq("user_id", user.id)
      .order("id"); // You can change the ordering if needed

    const nextProject = remainingProjects?.[0]?.name;

    if (nextProject) {
      return redirect(`/dashboard?projectName=${encodeURIComponent(nextProject)}`);
    } else {
      return redirect(`/dashboard`);
    }
  }

  if(intent === 'delete') {
    if(!id) return json({ error: 'Task ID is required' }, { status: 400 });

    const { error: labelDeleteError } = await supabase
      .from('task_labels')
      .delete()
      .eq('task_id', id);

    if (labelDeleteError) {
      console.error('Failed to delete task labels:', labelDeleteError);
      return json({ error: 'Failed to delete task labels' }, { status: 500 });
    }

    const { error } = await deleteTask(id);
    if(error) {
      console.error(error);
      return json({ error: "Failed to delete task" }, { status: 500});
    }

    return redirect(`/dashboard?projectName=${encodeURIComponent(projectName!)}`);
  }

  if (!title ||  !column_id) { // Including !project_id fails check
    console.log('Title check')
    return json({ error: "Missing fields" }, { status: 400 });
  }

  // Get the max position in the column
  const { data: maxData, error: maxError } = await maxPosition(column_id);
  
  if (maxError) {
    console.error("Failed to fetch max position:", maxError);
    return json({ error: "Could not determine position" }, { status: 500 });
  }
  
  const nextPosition = maxData?.[0]?.position != null ? maxData[0].position + 1 : 0;
  
  console.log("Task Mode:", mode);

  if(mode === 'edit') {
    await deleteLabels(id)

    const { error } = await updateTask(Number(id), { title, description, git_branch, git_commit, column_id, start_date, end_date })
    if (error) return json({ error: "Update failed" }, { status: 500 });
    
    if (labelIds.length > 0) {
      await updateTaskLabels(Number(id), labelIds)
    }

    return redirect(`/dashboard?projectName=${encodeURIComponent(projectName!)}`);
  } else {
    const { data: newTasks, error } = await createTask([{title, description, git_branch, git_commit, column_id, start_date, end_date, project_id, position: nextPosition}]);

    if (error) return json({ error: "Create failed" }, { status: 500 });

    const newTaskId = newTasks?.[0]?.id;

    if(newTaskId && labelIds.length > 0) {
      const labelLinks = labelIds.map((labelId) => ({
        task_id: newTaskId,
        label_id: Number(labelId),
      }))
      await supabase.from('task_labels').insert(labelLinks).select();
    }
  }

  return redirect(`/dashboard?projectName=${encodeURIComponent(projectName!)}`);
}

export default function Dashboard() {
  const { projects, selectedProject , columns, tasks, email, labels, taskLabels } = useLoaderData<typeof loader>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewtaskModal, setShowNewTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetcher = useFetcher();

  function handleProjectDelete() {
    const formData = new FormData();
    formData.append('projectId', selectedProject.id);
    formData.append('intent', 'delete-project');

    fetcher.submit(formData, {
      method: 'POST',
    })

    setShowDeleteModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="border-b border-gray-300 dark:border-gray-700">
        <TopBar 
          email={email}
          selectedProjectId={selectedProject.id} 
          selectedProjectName={selectedProject.name} 
          projects={projects} 
          setShowDeleteModal={() => {
            setShowDeleteModal(true);
            return true;
          }}
          setShowProjectModal={() => {
            setShowProjectModal(true);
            return true;
          }}
          setShowNewTaskModal={() => {
            setShowNewTaskModal(true);
            return true;
          }} />
      </div>
      <div className="flex justify-center gap-6 p-6">
        {columns.map((column: any) => (
          <div key={column.id} className="w-72 min-h-[300px] bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-center font-semibold text-lg mb-4 text-gray-800 dark:text-white">{column.title}</h3>
            <ul className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-hide">
            {tasks
            .filter((task: Task) => task.column_id === column.id)
            .map((task: Task) => (
              <Column key={task.id} task={task} labels={labels} onClick={setSelectedTask} />
            ))}
            </ul>
          </div>
        ))}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          columns={columns}
          labels={labels}
          onClose={() => setSelectedTask(null)}
          mode='edit'
        />
      )}
      {showNewtaskModal && (
        <TaskModal
          columns={columns}
          labels={labels}
          selectedProjectId={selectedProject.id}
          onClose={() => setShowNewTaskModal(false)}
          mode='create'
        />
      )}
      {showProjectModal && (
        <ProjectModal onClose={() => setShowProjectModal(false)}/>
      )}
      {showDeleteModal && (
        <DeleteConfirmation 
          selectedProjectId={selectedProject.id} 
          setShowDeleteModal={() => {
            setShowDeleteModal(false);
            return true;
          }} 
          handleProjectDelete={handleProjectDelete}
        />
      )}
      </div>
    </div>
  );
}
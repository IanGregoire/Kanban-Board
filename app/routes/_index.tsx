import { useEffect, useState } from "react";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server"; // Server-side client
import Column from "~/components/Column";
import TaskModal from "~/components/TaskModal";
import { json, redirect  } from "@remix-run/node";

type Column = {
  id: number;
  title: string;
  position: number;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  column_id: number;
  position: number;
  start_date: string;
  end_date: string;
}

// Loader to fetch initial data
export const loader: LoaderFunction = async({ request }) => {
  try {
    const url = new URL(request.url);
    const projectIdFromUrl = url.searchParams.get("projectId");

    const { data: projects, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .order('id');
    
    if(projectError) throw new Error(`Projects fetch error: ${projectError.message}`);
    if (!projects || projects.length === 0) throw new Error("No projects found");

    // Determine selected project
    const selectedProject =
      projects.find((p) => p.id === projectIdFromUrl) || projects[0];

    const { data: columns, error: columnError } = await supabase
    .from("columns")
    .select("*")
    .order("position");
    
    if(columnError) throw new Error(`Columns fetch error: ${columnError.message}`);

    const { data: tasks, error: taskError } = await supabase
    .from('tasks')
    .select('*')
    .eq("project_id", selectedProject.id);

    if(taskError) throw new Error(`Tasks fetch error: ${taskError.message}`);



    return json({ projects, selectedProject, columns, tasks});
  } catch(error: any) {
    console.error('Loader Error:', error.message);
    throw new Response(error.message, { status: 500 });
  }
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const intent = formData.get('intent');
  const mode = formData.get('mode');
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const column_id = Number(formData.get("column_id"));
  const project_id = formData.get("project_id") as string;

  // Use today's date as fallback
  const start_date = formData.get("start_date") || today; // before || today was as string || null
  const end_date = formData.get("end_date") || today; // Optional — you could also default to today if needed

  if(intent === 'delete') {
    if(!id) return json({ error: 'Task ID is required' }, { status: 400 });

    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if(error) {
      console.error(error);
      return json({ error: "Failed to delete task" }, { status: 500});
    }

    return redirect('/');
  }

  if (!title || !column_id || !project_id) {
    return json({ error: "Missing fields" }, { status: 400 });
  }

  console.log("Task Mode:", mode);
  // Get the max position in the column
  const { data: maxData, error: maxError } = await supabase
  .from("tasks")
  .select("position")
  .eq("column_id", column_id)
  .order("position", { ascending: false })
  .limit(1);

  if (maxError) {
    console.error("Failed to fetch max position:", maxError);
    return json({ error: "Could not determine position" }, { status: 500 });
  }

  const nextPosition = maxData?.[0]?.position != null ? maxData[0].position + 1 : 0;


  if(mode === 'edit') {
    const id = formData.get("id") as string;
    const { error } = await supabase
      .from('tasks')
      .update({ title, description, column_id, start_date, end_date })
      .eq("id", Number(id)).select();
    
    if (error) return json({ error: "Update failed" }, { status: 500 });
  } else {
    const { error } = await supabase
      .from("tasks")
      .insert([{ title, description, column_id, start_date, end_date, project_id, position: nextPosition}])
      .select();

    if (error) return json({ error: "Create failed" }, { status: 500 });
  }

  return redirect("/"); // Reload page to show updated tasks Doesn't work currently
}

export default function Index() {
  const { projects, selectedProjectId , columns, tasks } = useLoaderData<typeof loader>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewtaskModal, setShowNewTaskModal] = useState(false);

  function handleAddProject() {
    // Want to add to database so show modal to add project details
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-12 p-6 bg-gray-900 text-white">
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

          <button
            type="button"
            onClick={handleAddProject}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded"
          >
            + Add Project
          </button>

          <button
            type="button"
            onClick={() => setShowNewTaskModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded"
          >
            + Add Task
          </button>
        </Form>
      </div>
      <div className="flex justify-center gap-6 p-6">
        {columns.map((column: any) => (
          <div key={column.id} className="w-72 min-h-[300px] bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <h3 className="text-center font-semibold text-lg mb-4">{column.title}</h3>
            <ul className="space-y-4">
            {tasks
            .filter((task: Task) => task.column_id === column.id)
            .map((task: Task) => (
              <Column key={task.id} task={task} onClick={setSelectedTask} />
            ))}
            </ul>
          </div>
        ))}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          columns={columns}
          onClose={() => setSelectedTask(null)}
          mode='edit'
        />
      )}
      {showNewtaskModal && (
        <TaskModal
          columns={columns}
          onClose={() => setShowNewTaskModal(false)}
          mode='create'
        />
      )}
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server"; // Server-side client
// import { getSupabaseClient } from "~/utils/supabase.client";
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
export const loader: LoaderFunction = async() => {
  try {
    const { data: columns, error: columnError } = await supabase
    .from("columns")
    .select("*")
    .order("position");
    
    if(columnError) throw new Error(`Columns fetch error: ${columnError.message}`);

    const { data: tasks, error: taskError } = await supabase
    .from('tasks')
    .select('*')
    .order('position');

    if(taskError) throw new Error(`Tasks fetch error: ${taskError.message}`);

    return json({ columns, tasks});
  } catch(error: any) {
    console.error('Loader Error:', error.message);
    throw new Response(error.message, { status: 500 });
  }
};

export async function action({ request }: ActionFunctionArgs) {
  // const supabase = getSupabaseClient(); just using server works
  const formData = await request.formData();

  const mode = formData.get('mode');
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  // const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const column_id = Number(formData.get("column_id"));
  // Use today's date as fallback
  const start_date = formData.get("start_date") || today;
  const end_date = formData.get("end_date") || today; // Optional — you could also default to today if needed
  // const start_date = formData.get("start_date") as string | null;
  // const end_date = formData.get("end_date") as string | null;

  if (!title || !column_id) {
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
      .insert([{ title, description, column_id, start_date, end_date, position: nextPosition,}])
      .select();

    if (error) return json({ error: "Create failed" }, { status: 500 });
  }

  return redirect("/"); // Reload page to show updated tasks
}

export default function Index() {
  const { columns, tasks } = useLoaderData<typeof loader>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNewtaskModal, setShowNewTaskModal] = useState(false);

  return (
    <div className="flex flex-col justify-right p-6">
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="bg-green-600 text-white px-6 py-1 rounded hover:bg-green-700"
      >
        + Add task
      </button>
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
          columns={columns} // <-- pass columns here
          onClose={() => setSelectedTask(null)}
          mode='edit'
        />
      )}
      {showNewtaskModal && (
        <TaskModal
          columns={columns} // <-- pass columns here
          onClose={() => setShowNewTaskModal(false)}
          mode='create'
        />
      )}
      </div>
    </div>
  );
}


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

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const column_id = Number(formData.get("column_id"));
  const start_date = formData.get("start_date") as string | null;
  const end_date = formData.get("end_date") as string | null;

  if (!id || !title || !column_id) {
    return json({ error: "Missing fields" }, { status: 400 });
  }

  const { error, data } = await supabase
    .from("tasks")
    .update({
      title,
      description,
      column_id,
      start_date,
      end_date,
    })
    .eq("id", Number(id)).select();

    
    if (error) {
      console.error(error);
      return json({ error: "Failed to update task" }, { status: 500 });
    }
    
  // console.log("Updated task:", data);

  return redirect("/"); // Reload page to show updated tasks
}

export default function Index() {
  const { columns, tasks } = useLoaderData<typeof loader>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // useEffect(() => {
  //   console.log("Selected task is:", selectedTask);
  // }, [selectedTask]);

  return (
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
      />
    )}
    </div>
  );
}


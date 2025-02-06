import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server"; // Server-side client

type Column = {
  id: number;
  title: string;
  position: number;
}

type Task = {
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

    return Response.json({ columns, tasks});
  } catch(error: any) {
    console.error('Loader Error:', error.message);
    throw new Response(error.message, { status: 500 });
  }
};

export default function Index() {
  const { columns, tasks } = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center gap-6 p-6">
      {columns.map((column: any) => (
        <div key={column.id}  className="w-72 min-h-[300px] bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-center font-semibold text-lg mb-4">{column.title}</h3>
          <ul className="space-y-4">
            {tasks
              .filter((task: any) => task.column_id === column.id)
              .map((task: any) => (
                <li key={task.id} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow">
                  <strong className="block text-gray-900 dark:text-white">{task.title}</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{task.description}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

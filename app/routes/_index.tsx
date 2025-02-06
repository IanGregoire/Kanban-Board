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
    <div className={"kanban-board"}>
      {columns.map((column: any) => (
        <div key={column.id} className="kanban-column">
          <h3>{column.title}</h3>
          <ul>
            {tasks
              .filter((task: any) => task.column_id === column.id)
              .map((task: any) => (
                <li key={task.id} className="kanban-task">
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

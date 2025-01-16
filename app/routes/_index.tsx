import { useEffect, useState } from "react";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server";

// Loader to fetch initial data
export const loader: LoaderFunction = async () => {
  const { data: columns, error: columnError } = await supabase
    .from("columns")
    .select("*")
    .order("position");

  if (columnError) throw new Error(columnError.message);

  const { data: tasks, error: taskError } = await supabase
    .from("tasks")
    .select("*")
    .order("position");

  if (taskError) throw new Error(taskError.message);

  return json({ columns, tasks });
};

export default function Index() {
  const { columns: initialColumns, tasks: initialTasks } = useLoaderData<typeof loader>();
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  // Create a function to handle inserts
  const handleInserts = (payload: any) => {
    console.log('Change received!', payload)
  }
  useEffect(() => {
    // Function to fetch and update data
    const fetchData = async () => {
      const { data: updatedColumns } = await supabase
        .from("columns")
        .select("*")
        .order("position");

      const { data: updatedTasks } = await supabase
        .from("tasks")
        .select("*")
        .order("position");

      setColumns(updatedColumns || []);
      setTasks(updatedTasks || []);
    };

    // Real-time subscriptions
    const columnsSubscription = supabase
    .channel('columns')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public.columns',
        table: 'columns'
      },
      (payload) => console.log(payload)
    )
    .subscribe()

    const tasksSubscription = supabase
    .channel('tasks')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks'
      },
      (payload) => console.log(payload)
    )
    .subscribe()

    // Cleanup subscriptions on component unmount
    return () => {
      supabase.removeChannel(columnsSubscription);
      supabase.removeChannel(tasksSubscription);
    };
  }, []);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {columns.map((column: any) => (
        <div key={column.id} style={{ border: "1px solid black", padding: "16px" }}>
          <h3>{column.title}</h3>
          <ul>
            {tasks
              .filter((task: any) => task.column_id === column.id)
              .map((task: any) => (
                <li key={task.id}>
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

import { useState } from "react";
import { Form, useFetcher } from "@remix-run/react";
import { Task } from "~/routes/_index";

type Column = {
  id: number;
  title: string;
};

type Props = {
  task: Task;
  columns: Column[];
  onClose: () => void;
};

export default function TaskModal({ task, columns, onClose }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [columnId, setColumnId] = useState(task.column_id);
  const [startDate, setStartDate] = useState(task.start_date?.split('T')[0] || '');
  const [endDate, setEndDate] = useState(task.end_date?.split('T')[0] || '');
  const fetcher = useFetcher();

  const start_date = startDate ? `${startDate}T00:00:00` : null;
  const end_date = endDate ? `${endDate}T00:00:00` : null;


  function handleSave() {
    const formData = new FormData();
    formData.append("id", task.id.toString());
    formData.append("title", title);
    formData.append("description", description);
    formData.append("column_id", columnId.toString());
    formData.append("start_date", start_date ?? "");
    formData.append("end_date", end_date ?? "");

    fetcher.submit(formData, {
      method: "POST",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Edit Task</h2>
          <Form method='post'>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Title</label>
            <input
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Column</label>
            <select
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={columnId}
              onChange={(e) => setColumnId(Number(e.target.value))}
              >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              // value={task.start_date ? task.start_date.split('T')[0] : ''}
              value={startDate ?? ''}
              onChange={(e) => setStartDate(e.target.value)}
              />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">End Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              // value={task.end_date ? task.end_date.split('T')[0] : ''}
              value={endDate ?? ''}
              onChange={(e) => setEndDate(e.target.value)}
              />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded"
              onClick={onClose}
              >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSave}
              >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

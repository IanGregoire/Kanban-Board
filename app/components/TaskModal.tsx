import { useState } from "react";
import { Form, useFetcher } from "@remix-run/react";
import { Task } from "~/routes/dashboard";

type Column = {
  id: number;
  title: string;
};

export type Label = {
  id: number;
  name: string;
  color: string;
  category: string;
}

type Props = {
  task?: Task;  // Optional for new task
  selectedProjectId?: string;
  columns: Column[];
  labels: Label[];
  onClose: () => void;
  mode: 'create' | 'edit';
};

export default function TaskModal({ task, selectedProjectId, columns, labels, onClose, mode }: Props) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [columnId, setColumnId] = useState(task?.column_id ?? columns[0]?.id ?? 1);
  const [gitBranch, setGitBranch] = useState(task?.git_branch ?? '');
  const [gitCommit, setGitCommit] = useState(task?.git_commit ?? '');
  const [selectedLabels, setSelectedLabels] = useState<number[]>(
    mode === 'edit' ? task?.labels?.map(l => l.id) ?? [] : []
  );

  const fetcher = useFetcher();

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(task?.start_date ?? today);
  const [endDate, setEndDate] = useState(task?.end_date ?? today); 

  // Labels enforce one per category
  const groupedLabels = labels.reduce((acc, label) => {
    if(!acc[label.category]) acc[label.category] = [];
    acc[label.category].push(label);
    return acc;
  }, {} as Record<string, Label[]>);

  function toggleCategoryLabel(category: string, labelId: number) {
  const otherLabels = labels
    .filter(l => l.category === category && selectedLabels.includes(l.id));
  const newSelected = selectedLabels.filter(id => !otherLabels.some(l => l.id === id));

  setSelectedLabels([...newSelected, labelId]);
}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg space-y-4 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Edit Task</h2>
          <Form method='post' id='task-form' onSubmit={() => onClose()}>
            <input type="hidden" name="intent" value="save-task" />
            {mode === "edit" && <input type="hidden" name="id" value={task!.id} />}
            {mode === "create" && <input type="hidden" name="project_id" value={selectedProjectId} />}
            <input type="hidden" name="column_id" value={columnId} />
            <input type="hidden" name="start_date" value={startDate} />
            <input type="hidden" name="end_date" value={endDate} />
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="description" value={description} />
            <input type="hidden" name="git_branch" value={gitBranch} />
            <input type="hidden" name="git_commit" value={gitCommit} />
            {selectedLabels.map(id => (
              <input key={id} type="hidden" name="labels" value={id} />
            ))}

            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                  Labels
                </label>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(groupedLabels).map(([category, labels]) => (
                    <div key={category}>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{category}</p>
                      {labels.map(label => (
                        <label key={label.id} className="inline-flex items-center space-x-1">
                          <input
                            type="radio"
                            name={category}
                            value={label.id}
                            checked={selectedLabels.includes(label.id)}
                            onChange={() => toggleCategoryLabel(category, label.id)}
                            className="accent-blue-600"
                          />
                          <span className="text-xs px-2 py-1 rounded text-white" style={{ backgroundColor: label.color }}>{label.name}</span>
                        </label>
                      ))}
                    </div>
                  ))}
              </div>
            </div>

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Title</label>
            <input
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Git Branch</label>
            <input
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={gitBranch}
              onChange={(e) => setGitBranch(e.target.value)}
            />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Git Commit</label>
            <input
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={gitCommit}
              onChange={(e) => setGitCommit(e.target.value)}
            />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Column</label>
            <select
              name='column_id'
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              defaultValue={task?.column_id ?? columns[0]?.id}
              onChange={(e) => setColumnId(Number(e.target.value))}
              >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={task?.start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">End Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            {mode === "edit" && (
              <Form method="post" onSubmit={onClose}>
                <input type="hidden" name="id" value={task?.id.toString()} />
                <input type="hidden" name="intent" value="delete" />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </Form>
            )}
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              name="mode"
              value={mode}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

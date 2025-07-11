import { Task } from "~/routes/dashboard";
import { Label } from "./TaskModal";

type Props = {
  task: Task;
  labels: Label[];
  onClick: (task: Task) => void;
};

export default function Column({ task, labels, onClick }: Props) {
  return (
    <li
      role="listitem" 
      key={task.id}
      onClick={() => onClick(task)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(task);
        }
      }}
      tabIndex={0}
      className="cursor-pointer p-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-300 dark:hover:br-gray-600 transition-colors"
      aria-label={`View details for task: ${task.title}`}
    >
      <div className="flex flex-wrap gap-1 mb-2">
        {task.labels.map( label => (
          <span 
            key={label.id}
            className="text-xs px-2 py-0.5 rounded text-white"
            style={{ backgroundColor: label.color }} 
            >
            {label.name}
          </span>
        ))}
      </div>
      <strong className="block text-gray-900 dark:text-white mb-1">{task.title}</strong>
      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{task.description}</p>
    </li>
  );
}

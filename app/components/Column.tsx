import { Task } from "~/routes/_index";
import { Label } from "./TaskModal";

type Props = {
  task: Task;
  labels: Label[];
  onClick: (task: Task) => void;
};

export default function Column({ task, labels, onClick }: Props) {
  return (
    <li
        onClick={() => onClick(task)}
      className="cursor-pointer p-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow"
    >
      {task.labels.map( label => (
        <span 
          key={label.id}
          className="text-xs px-2 py-1 rounded text-white"
          style={{ backgroundColor: label.color }} 
          >
          {label.name}
        </span>
      ))}
      <strong className="block text-gray-900 dark:text-white">{task.title}</strong>
      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{task.description}</p>
    </li>
  );
}

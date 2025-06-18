import { Task } from "~/routes/_index";

type Props = {
  task: Task;
  onClick: (task: Task) => void;
};

export default function Column({ task, onClick }: Props) {
  return (
    <li
        onClick={() => onClick(task)}
      className="cursor-pointer p-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow"
    >
      <strong className="block text-gray-900 dark:text-white">{task.title}</strong>
      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{task.description}</p>
    </li>
  );
}

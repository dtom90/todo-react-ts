import { Task } from "../types";
import { useTaskStore } from "../store/useTaskStore";


export default function TaskItem({ task }: { task: Task }) {
  const { toggleTask, removeTask } = useTaskStore();

  return (
    <div key={task.id} className="flex items-center py-2 px-4 border border-gray-200 rounded-lg mb-2">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTask(task.id)}
      />
      <span className="ml-4 flex-grow">{task.text}</span>
      <button className="hover:bg-gray-200 p-1 rounded-lg" onClick={() => removeTask(task.id)}>Remove</button>
    </div>
  );
}

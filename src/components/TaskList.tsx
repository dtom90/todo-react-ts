import { useStore } from "../contexts/StoreProvider";
import { Task } from "../types";

export default function TaskList() {
    const { incompleteTasks, toggleTask, removeTask, completedTasks } = useStore();

    function TaskItem({ task }: { task: Task }) {
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

    return (
      <div className="todo-list">
        {incompleteTasks.length > 0 && <h3 className="text-xl text-center font-bold my-4">My Tasks</h3>}
        {incompleteTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {completedTasks.length > 0 && <h3 className="text-xl text-center font-bold my-4">Completed Tasks</h3>}
        {completedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    );
}

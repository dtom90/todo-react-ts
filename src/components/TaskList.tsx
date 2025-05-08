import { useTasks } from "../contexts/TaskContext";
import { Task } from "../types";

export default function TaskList() {
    const { incompleteTasks, toggleTask, removeTask, completedTasks } = useTasks();

    function TaskItem({ task }: { task: Task }) {
      return (
        <div key={task.id}>
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
          <button onClick={() => removeTask(task.id)}>Remove</button>
        </div>
      );
    }

    return (
      <div className="todo-list">
        <h3>My Tasks</h3>
        {incompleteTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <p>Completed Tasks:</p>
        {completedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

    );
}

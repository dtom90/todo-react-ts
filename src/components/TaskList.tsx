import { useTaskStore } from "../store/useTaskStore";
import { Task } from "../types";
import { useMemo } from 'react';
import TaskItem from "./TaskItem";

export default function TaskList() {
    const { tasks } = useTaskStore();
    
    const { incompleteTasks, completedTasks } = useMemo(() => {
      const incomplete = tasks.filter((task: Task) => !task.completed);
      const completed = tasks.filter((task: Task) => task.completed);
      return { incompleteTasks: incomplete, completedTasks: completed };
    }, [tasks]);

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

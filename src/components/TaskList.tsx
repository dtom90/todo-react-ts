import { useTasks } from "../hooks/useTasksQuery";
import TaskItem from "./TaskItem";

const IncompleteTaskList: React.FC = () => {
  // Enable whyDidYouRender for this component
  // IncompleteTaskList.whyDidYouRender = true;
  // console.log("IncompleteTaskList rendered");

  const { data: tasks, isLoading, error } = useTasks();
  
  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;
  
  const incompleteTasks = tasks?.filter(task => !task.completed) ?? [];
  
  return (
    <div>
      {incompleteTasks.length > 0 && <h3 className="text-xl text-center font-bold my-4">My Tasks</h3>}
      {incompleteTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

const CompletedTaskList: React.FC = () => {
  // Enable whyDidYouRender for this component
  // CompletedTaskList.whyDidYouRender = true;
  // console.log("CompletedTaskList rendered");

  const { data: tasks, isLoading, error } = useTasks();
  
  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;
  
  const completedTasks = tasks?.filter(task => task.completed) ?? [];
  
  return (
    <div>
      {completedTasks.length > 0 && <h3 className="text-xl text-center font-bold my-4">Completed Tasks</h3>}
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export { IncompleteTaskList, CompletedTaskList };


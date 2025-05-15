import { useTasks } from "../hooks/useTasksQuery";
import TaskItem from "./TaskItem";
import { Task } from "../types";

interface TaskListProps {
  title: string;
  filterCondition: (task: Task) => boolean;
}

const TaskList: React.FC<TaskListProps> = ({ title, filterCondition }) => {
  const { data: tasks, isLoading, error } = useTasks();
  
  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;
  
  const filteredTasks = tasks?.filter(filterCondition) ?? [];
  
  return (
    <div>
      {filteredTasks.length > 0 && <h3 className="text-xl text-center font-bold my-4">{title}</h3>}
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

const IncompleteTaskList: React.FC = () => {
  return <TaskList title="My Tasks" filterCondition={(task) => !task.completed} />;
};

const CompletedTaskList: React.FC = () => {
  return <TaskList title="Completed Tasks" filterCondition={(task) => task.completed} />;
};

export { IncompleteTaskList, CompletedTaskList };


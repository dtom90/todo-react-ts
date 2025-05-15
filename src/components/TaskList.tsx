import { Task } from "../types";
import { useTasks } from "../hooks/useTasksQuery";
import { useClientStore } from "../hooks/useClientStore";
import TaskItem from "./TaskItem";

interface TaskListProps {
  title: string;
  typeCondition: (task: Task) => boolean;
}

const TaskList: React.FC<TaskListProps> = ({ title, typeCondition }) => {
  const { data: tasks, isLoading, error } = useTasks();
  const { filter } = useClientStore();
  
  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;
  
  const tasksForType = tasks?.filter(typeCondition) ?? [];
  const filteredTasks = tasksForType.filter(task => task.name.toLowerCase().includes(filter.toLowerCase()));
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
  return <TaskList title="My Tasks" typeCondition={(task) => !task.completed} />;
};

const CompletedTaskList: React.FC = () => {
  return <TaskList title="Completed Tasks" typeCondition={(task) => task.completed} />;
};

export { IncompleteTaskList, CompletedTaskList };

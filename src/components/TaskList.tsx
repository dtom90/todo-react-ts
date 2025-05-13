import { useTaskStore } from "../store/useTaskStore";
import TaskItem from "./TaskItem";

const IncompleteTaskList: React.FC = () => {
  // Enable whyDidYouRender for this component
  IncompleteTaskList.whyDidYouRender = true;

  const incompleteTasks = useTaskStore((state) => state.incompleteTasks);
  
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
  CompletedTaskList.whyDidYouRender = true;

  const completedTasks = useTaskStore((state) => state.completedTasks);
  
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


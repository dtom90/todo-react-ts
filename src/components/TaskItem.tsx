import { useTaskStore } from "../store/useTaskStore";


const TaskItem: React.FC<{ taskId: number }> = ({ taskId }) => {
  // Enable whyDidYouRender for this component
  TaskItem.whyDidYouRender = true;

  const { toggleTask, removeTask } = useTaskStore()
  const task = useTaskStore((state) => state.taskMap.get(taskId))

  if (!task) return null;

  return (
    <div key={taskId} className="flex items-center py-2 px-4 border border-gray-200 rounded-lg mb-2">
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

export default TaskItem
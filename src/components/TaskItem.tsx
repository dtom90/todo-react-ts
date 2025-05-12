import { useTaskStore } from "../store/useTaskStore";
import { useRef, useState } from "react";


const TaskItem: React.FC<{ taskId: number }> = ({ taskId }) => {
  const { toggleTask, removeTask, updateTask } = useTaskStore()
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Enable whyDidYouRender for this component
  TaskItem.whyDidYouRender = true;
  console.log(`TaskItem {id: ${taskId}} rendered`);

  const task = useTaskStore((state) => state.taskMap.get(taskId))

  if (!task) return null;

  const editName = () => {
    setEditMode(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  return (
    <div key={taskId} className="flex items-center py-2 px-4 border border-gray-200 rounded-lg mb-2">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTask(task.id)}
      />
      {editMode ? (
        <input
          className="ml-4 flex-grow"
          type="text"
          value={task.name}
          ref={inputRef}
          onChange={(e) => {
            const newTask = { ...task, name: e.target.value };
            updateTask(taskId, newTask);
          }} 
          onBlur={() => setEditMode(false)} 
        />
      ) : (
        <span className="ml-4 flex-grow" onClick={editName}>{task.name}</span>
      )}
      <button className="hover:bg-gray-200 p-1 rounded-lg" onClick={() => removeTask(task.id)}>Remove</button>
    </div>
  );
}

export default TaskItem
import { useTaskStore } from "../store/useTaskStore";
import { useRef, useState } from "react";
import { Task } from "../types";
import React from "react";

interface TaskItemProps {
  task: Task;
}

// Memoize the component to prevent re-renders when the task is not updated
const MemoTaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
  // It is absolutely imperative that you only hook into the part of the store that you are actually using in this component, 
  // otherwise any store update will trigger a re-render of this component.
  const { toggleTask, removeTask, updateTask } = useTaskStore((state) => state.actions);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Enable whyDidYouRender for this component
  // TaskItem.whyDidYouRender = true;
  // console.log(`TaskItem {id: ${task.id}} rendered`);

  const editName = () => {
    setEditMode(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask(task.id, { name: e.target.value });
  };

  return (
    <div className="flex items-center py-2 px-4 border border-gray-200 rounded-lg mb-2">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTask(task.id)}
        className="cursor-pointer"
      />
      {editMode ? (
        <input
          className="ml-4 flex-grow border border-gray-300 rounded px-2 py-1"
          type="text"
          value={task.name}
          ref={inputRef}
          onChange={handleUpdateName}
          onBlur={() => setEditMode(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditMode(false)}
        />
      ) : (
        <span 
          className="ml-4 flex-grow cursor-text" 
          onClick={editName}
        >
          {task.name}
        </span>
      )}
      <button 
        className="ml-2 hover:bg-gray-200 p-1 rounded-lg text-sm" 
        onClick={() => removeTask(task.id)}
      >
        Remove
      </button>
    </div>
  );
})

export default MemoTaskItem;

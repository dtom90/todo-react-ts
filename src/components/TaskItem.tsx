import { useRef, useState } from "react";
import { Task } from "../types";
import React from "react";
import { useUpdateTask, useToggleTask, useDeleteTask } from "../hooks/useTasksQuery";

interface TaskItemProps {
  task: Task;
}

// Memoize the component to prevent re-renders when the task is not updated
const MemoTaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
  const updateTaskMutation = useUpdateTask();
  const toggleTaskMutation = useToggleTask();
  const deleteTaskMutation = useDeleteTask();
  
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
    updateTaskMutation.mutate({ id: task.id, task: { name: e.target.value } });
  };

  const handleToggle = () => {
    toggleTaskMutation.mutate({ id: task.id, completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(task.id);
    }
  };

  return (
    <div className="flex items-center py-2 px-4 border border-gray-200 rounded-lg mb-2">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={handleToggle}
        className="cursor-pointer"
        disabled={toggleTaskMutation.isPending}
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
          disabled={updateTaskMutation.isPending}
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
        onClick={handleDelete}
        disabled={deleteTaskMutation.isPending}
      >
        {deleteTaskMutation.isPending ? 'Removing...' : 'Remove'}
      </button>
    </div>
  );
})

export default MemoTaskItem;

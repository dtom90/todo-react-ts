import { FormEvent, ChangeEvent, useState, useRef } from 'react';
import { useCreateTask } from '../hooks/useTasksQuery';

const TaskForm: React.FC = () => {

  const createTaskMutation = useCreateTask();
  const [taskText, setTaskText] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (taskText.trim() === '') {
      setHasError(true);
      return;
    }
    
    try {
      await createTaskMutation.mutateAsync({
        name: taskText,
        completed: false,
      });
      setTaskText('');
      setHasError(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (error) {
      setHasError(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
    setHasError(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="text" 
          placeholder="Add a task" 
          ref={inputRef}
          value={taskText} 
          onChange={handleChange} 
          disabled={createTaskMutation.isPending}
          className={`flex-1 px-3 py-2 border rounded-md transition-colors ${
            hasError 
              ? 'border-red-500 shadow-[0_0_0_2px_rgba(255,68,68,0.1)]' 
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none'
          }`}
        />
        <button 
          type="submit"
          disabled={createTaskMutation.isPending}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
        >
          {createTaskMutation.isPending ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

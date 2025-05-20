import { FormEvent, ChangeEvent, useState, useRef } from 'react';
import { useCreateTask } from '../hooks/useTasksQuery';

const TaskForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [error, setError] = useState('');
  const createTaskMutation = useCreateTask();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim() === '') {
      setError('Task name cannot be empty');
      return;
    }
    
    try {
      await createTaskMutation.mutateAsync({
        name: newTaskName,
        completed: false,
      });
      setNewTaskName('');
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (error) {
      setError('Failed to add task');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
    setError('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="text" 
          placeholder="Add a task" 
          ref={inputRef}
          value={newTaskName} 
          onChange={handleChange} 
          disabled={createTaskMutation.isPending}
          className={`flex-1 px-3 py-2 border rounded-md transition-colors ${
            error
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
      {error && (
        <div className="text-red-600 text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default TaskForm;

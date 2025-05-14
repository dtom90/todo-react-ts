import { FormEvent, ChangeEvent, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

const TaskForm: React.FC = () => {
  // Enable whyDidYouRender for this component
  // TaskForm.whyDidYouRender = true;

  const { addTask } = useTaskStore((state) => state.actions);
  const [taskText, setTaskText] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskText.trim() === '') {
      setHasError(true);
      return;
    }
    const newTask = {
      id: Date.now(),
      name: taskText,
      completed: false,
    };
    addTask(newTask);
    setTaskText('');
    setHasError(false);
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
          value={taskText} 
          onChange={handleChange} 
          className={`flex-1 px-3 py-2 border rounded-md transition-colors ${
            hasError 
              ? 'border-red-500 shadow-[0_0_0_2px_rgba(255,68,68,0.1)]' 
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none'
          }`}
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

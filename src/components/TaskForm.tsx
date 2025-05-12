import { FormEvent, ChangeEvent, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

const TaskForm: React.FC = () => {
  // Enable whyDidYouRender for this component
  TaskForm.whyDidYouRender = true;

  const addTask = useTaskStore((state) => state.addTask);
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
      text: taskText,
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
      <form onSubmit={handleSubmit} className="flex w-full">
        <input 
          type="text" 
          placeholder="Add a task" 
          value={taskText} 
          onChange={handleChange} 
          className={`add-task-input ${hasError ? 'error' : ''}`}
        />
        <button className="add-task-btn" type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

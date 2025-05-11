import { FormEvent, ChangeEvent, useState } from 'react';
import { useStore } from '../contexts/StoreProvider';

export default function TaskForm() {
  const { addTask } = useStore();
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
    <div className="w-100 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="todo-form">
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
}

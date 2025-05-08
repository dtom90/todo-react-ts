import React from 'react';
import { Task } from '../types';

interface TaskFormProps {
  onTaskAdded: (newTask: Task) => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [taskText, setTaskText] = React.useState('');
  const [hasError, setHasError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
    onTaskAdded(newTask);
    setTaskText('');
    setHasError(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
    setHasError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Add a task" 
        value={taskText} 
        onChange={handleChange} 
        className={`add-task-input ${hasError ? 'error' : ''}`}
      />
      <button className="add-task-btn" type="submit">Add Task</button>
    </form>
  );
}

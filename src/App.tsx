import React from 'react';
import './App.css';

function App() {

  const [newTaskText, setNewTaskText] = React.useState('');
  const [tasks, setTasks] = React.useState<{ id: number; text: string; completed: boolean; }[]>([]);
  const [hasError, setHasError] = React.useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') {
      setHasError(true);
      return;
    }
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Todo List</h1>
        </div>
      </header>
      <main className="main-content">
        <div className="todo-container">
          <div>
            <h2>My Tasks</h2>
          </div>
          <form onSubmit={handleAddTask}>
            <input 
              type="text" 
              placeholder="Add a task" 
              value={newTaskText} 
              onChange={(e) => {
                setNewTaskText(e.target.value);
                setHasError(false);
              }} 
              className={`add-task-input ${hasError ? 'error' : ''}`}
            />
            <button className="add-task-btn" type="submit">Add Task</button>
          </form>

          <div className="todo-list">
            {tasks.map((task) => (
              <div key={task.id}>
                <input type="checkbox" checked={task.completed} />
                <span>{task.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

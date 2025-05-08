import React from 'react';
import TaskForm from './components/TaskForm';
import './App.css';
import { Task } from './types';

function App() {

  const [tasks, setTasks] = React.useState<Task[]>([]);

  const handleTaskAdded = (newTask: Task) => {
    setTasks([...tasks, newTask]);
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
          <TaskForm 
            onTaskAdded={handleTaskAdded}
          />

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

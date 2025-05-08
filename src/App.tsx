import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Todo List</h1>
        </div>
      </header>
      <main className="main-content">
        <div className="todo-container">
          <div className="todo-header">
            <h2>My Tasks</h2>
            <button className="add-task-btn">Add Task</button>
          </div>
          <div className="todo-list">
            {/* Todo items will be added here */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

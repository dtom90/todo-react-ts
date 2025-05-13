import { useEffect } from 'react';
import TaskForm from './components/TaskForm';
import { IncompleteTaskList, CompletedTaskList } from './components/TaskList';
import { useTaskStore } from './store/useTaskStore';
import './App.css';

function App() {
  const { fetchTasks } = useTaskStore(state => state.actions);

  useEffect(() => {
    fetchTasks().catch(console.error);
  }, [fetchTasks]);
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="text-3xl font-bold mb-6">Todo List</h1>
        </div>
      </header>
      <main className="main-content">
        <div className="todo-container">
          <div className="todo-wrapper">
            <TaskForm />
            <div className="todo-list">
              <IncompleteTaskList />
              <CompletedTaskList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

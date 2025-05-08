import './App.css';
import { TaskProvider } from './contexts/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

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
          <TaskForm />

          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <TaskProvider>
      <App />
    </TaskProvider>
  );
}

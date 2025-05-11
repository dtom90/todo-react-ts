import './App.css';
import { StoreProvider } from './contexts/StoreProvider';
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
          <div className="todo-wrapper">
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}

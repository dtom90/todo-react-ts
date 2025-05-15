import { useEffect } from 'react';
import TaskForm from './components/TaskForm';
import { IncompleteTaskList, CompletedTaskList } from './components/TaskList';
import { useTaskStore } from './store/useTaskStore';
import TaskFilter from './components/TaskFilter';

function App() {
  const { fetchTasks } = useTaskStore(state => state.actions);

  useEffect(() => {
    fetchTasks().catch(console.error);
  }, [fetchTasks]);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#282c34] py-8 px-4 text-white flex-shrink-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Todo List</h1>
          <p className="text-gray-300 text-lg">Stay organized and boost your productivity</p>
        </div>
      </header>
      <main className="flex-grow p-8 bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="max-w-md mx-auto w-full">
            <TaskForm />
            <hr className="my-8" />
            <TaskFilter />
            <div className="min-h-[400px]">
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

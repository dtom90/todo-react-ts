import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import { IncompleteTaskList, CompletedTaskList } from './components/TaskList';
import { useTaskStore } from './store/useTaskStore';
import TaskFilter from './components/TaskFilter';
import { SessionContextProvider, useUser } from '@supabase/auth-helpers-react';
import { supabase } from './supabaseClient';
import AuthModal from './components/AuthModal';

function Header({ onSignIn }: { onSignIn: () => void }) {
  const user = useUser();

  return (
    <div className="max-w-3xl mx-auto text-center relative">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <p className="text-gray-300 text-lg">Stay organized and boost your productivity</p>
      {user ? (
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <span className="bg-white text-[#282c34] px-3 py-1 rounded shadow text-sm">{user.email}</span>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            onClick={async () => { await supabase.auth.signOut(); }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className="absolute top-4 right-4 bg-white text-[#282c34] px-4 py-2 rounded shadow hover:bg-gray-100"
          onClick={onSignIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
}

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <div className="min-h-screen flex flex-col">
        <header className="bg-[#282c34] py-8 px-4 text-white flex-shrink-0">
          <Header onSignIn={() => setAuthOpen(true)} />
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
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </SessionContextProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task } from '../types';

interface TaskContextType {
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  incompleteTasks: Task[];
  completedTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: tasks.length + 1 };
    setTasks(prev => [...prev, newTask]);
  }, [tasks]);

  const toggleTask = useCallback((id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const removeTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <TaskContext.Provider value={{ addTask, toggleTask, removeTask, incompleteTasks, completedTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useStore() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

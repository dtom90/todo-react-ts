import { create } from 'zustand';
import { Task } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  
  addTask: (task) => {
    set((state) => {
      const newTask: Task = { 
        ...task, 
        id: state.tasks.length > 0 
          ? Math.max(...state.tasks.map(t => t.id)) + 1 
          : 1 
      };
      return { tasks: [...state.tasks, newTask] };
    });
  },
  
  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  },
  
  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  }
}));

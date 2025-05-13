import { create } from 'zustand';
import { Task } from '../types';

// Combined store type
type TaskStore = {
  // State
  incompleteTasks: Task[];
  completedTasks: Task[];

  // Actions
  actions: {
    getNextId: () => number;
    addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
    updateTask: (id: number, updates: Partial<Task>) => void;
    toggleTask: (id: number) => void;
    removeTask: (id: number) => void;
  };
};

// Create the store
export const useTaskStore = create<TaskStore>((set, get) => ({
  // State
  incompleteTasks: [],
  completedTasks: [],
  
  // Actions
  actions: {
    getNextId: () => {
      const { incompleteTasks, completedTasks } = get();
      const allTasks = [...incompleteTasks, ...completedTasks];
      return allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) + 1 : 1;
    },

    addTask: (task) => {
      set((state) => {
        const newTask: Task = { 
          ...task, 
          id: get().actions.getNextId(),
          completed: false
        };
        return {
          incompleteTasks: [...state.incompleteTasks, newTask]
        };
      });
    },
    
    updateTask: (id, updates) => {
      set((state) => {
        const targetArray = state.incompleteTasks.some(t => t.id === id) 
          ? 'incompleteTasks' 
          : 'completedTasks';
        
        const updatedTasks = state[targetArray].map(task => 
          task.id === id ? { ...task, ...updates } : task
        );
        
        return { [targetArray]: updatedTasks };
      });
    },
    
    toggleTask: (id) => {
      set((state) => {
        const sourceArray = state.incompleteTasks.some(t => t.id === id) 
          ? 'incompleteTasks' 
          : 'completedTasks';
        const targetArray = sourceArray === 'incompleteTasks' ? 'completedTasks' : 'incompleteTasks';
        
        const task = state[sourceArray].find(t => t.id === id);
        if (!task) return {};
        
        const updatedTask = { ...task, completed: !task.completed };
        
        return {
          [sourceArray]: state[sourceArray].filter(t => t.id !== id),
          [targetArray]: [...state[targetArray], updatedTask]
        };
      });
    },
    
    removeTask: (id) => {
      set((state) => {
        const sourceArray = state.incompleteTasks.some(t => t.id === id) 
          ? 'incompleteTasks' 
          : 'completedTasks';
        
        return {
          [sourceArray]: state[sourceArray].filter(task => task.id !== id)
        };
      });
    }
  }
}));

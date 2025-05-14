import { create } from 'zustand';
import { Task } from '../types';
import * as apiClient from './apiClient';

// Combined store type
type TaskStore = {
  // State
  incompleteTasks: Task[];
  completedTasks: Task[];
  isLoading: boolean;
  error: string | null;

  // Actions
  actions: {
    fetchTasks: () => Promise<void>;
    addTask: (task: { name: string; description?: string }) => Promise<Task>;
    updateTask: (id: number, updates: Partial<Omit<Task, 'id'>>) => Promise<void>;
    toggleTask: (id: number) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    setError: (error: string | null) => void;
  };
};

// Helper function to partition tasks based on completion status
const partitionTasks = (tasks: Task[]): [Task[], Task[]] => {
  const incomplete: Task[] = [];
  const completed: Task[] = [];
  
  tasks.forEach(task => {
    if (task.completed) {
      completed.push(task);
    } else {
      incomplete.push(task);
    }
  });
  
  return [incomplete, completed];
};

// Create the store
export const useTaskStore = create<TaskStore>((set, get) => ({
  // State
  incompleteTasks: [],
  completedTasks: [],
  isLoading: false,
  error: null,
  
  // Actions
  actions: {
    fetchTasks: async () => {
      set({ isLoading: true, error: null });
      try {
        const tasks = await apiClient.getTasks();
        // Map API TaskItem to our Task type
        const mappedTasks: Task[] = tasks.map(task => ({
          id: task.id,
          name: task.name,
          completed: task.completed,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt
        }));
        
        const [incompleteTasks, completedTasks] = partitionTasks(mappedTasks);
        set({ incompleteTasks, completedTasks });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ isLoading: false });
      }
    },

    addTask: async (task) => {
      set({ isLoading: true, error: null });
      try {
        const newTask = await apiClient.createTask({
          name: task.name,
          completed: false
        });
        
        const mappedTask: Task = {
          id: newTask.id,
          name: newTask.name,
          completed: newTask.completed,
          createdAt: newTask.createdAt,
          updatedAt: newTask.updatedAt
        };
        
        set(state => ({
          incompleteTasks: [...state.incompleteTasks, mappedTask]
        }));
        
        return mappedTask;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ isLoading: false });
      }
    },
    
    updateTask: async (id, updates) => {
      set({ isLoading: true, error: null });
      try {
        await apiClient.updateTask(id, {
          name: updates.name,
          completed: updates.completed
        });
        
        set(state => {
          const targetArray = state.incompleteTasks.some(t => t.id === id) 
            ? 'incompleteTasks' 
            : 'completedTasks';
          
          const sourceArray = targetArray === 'incompleteTasks' ? 'completedTasks' : 'incompleteTasks';
          
          // If we're toggling completion status, move between arrays
          if (updates.completed !== undefined) {
            const taskToMove = state[targetArray].find(t => t.id === id);
            if (!taskToMove) return state;
            
            const updatedTask = { ...taskToMove, ...updates };
            
            return {
              [targetArray]: state[targetArray].filter(t => t.id !== id),
              [sourceArray]: [...state[sourceArray], updatedTask]
            };
          }
          
          // Otherwise, just update the task in place
          const updatedTasks = state[targetArray].map(task => 
            task.id === id ? { ...task, ...updates } : task
          );
          
          return { [targetArray]: updatedTasks };
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ isLoading: false });
      }
    },
    
    toggleTask: async (id: number) => {
      const { updateTask } = get().actions;
      let task = get().incompleteTasks.find(t => t.id === id);
      if (!task) {
        task = get().completedTasks.find(t => t.id === id);
      }
      await updateTask(id, { completed: !task?.completed });
    },
    
    deleteTask: async (id: number) => {
      if (!confirm('Are you sure you want to delete this task?')) {
        return;
      }
      set({ isLoading: true, error: null });
      try {
        await apiClient.deleteTask(id);
        
        set(state => ({
          incompleteTasks: state.incompleteTasks.filter(t => t.id !== id),
          completedTasks: state.completedTasks.filter(t => t.id !== id)
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ isLoading: false });
      }
    },
    
    setError: (error: string | null) => {
      set({ error });
    }
  }
}));

import { create } from 'zustand';
import { Task } from '../types';

interface TaskStore {
  taskMap: Map<number, Task>;
  incompleteTasks: number[];
  completedTasks: number[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  taskMap: new Map(),
  incompleteTasks: [],
  completedTasks: [],

  addTask: (task) => {
    set((state) => {
      const newTask: Task = { 
        ...task, 
        id: state.taskMap.size + 1
      };
      return {
        incompleteTasks: [...state.incompleteTasks, newTask.id], 
        taskMap: state.taskMap.set(newTask.id, newTask) 
      };
    });
  },
  
  toggleTask: (id) => {
    set((state) => {
      const task = state.taskMap.get(id);
      if (!task) return {}
      state.taskMap.set(id, { ...task, completed: !task.completed })
      if (task.completed) {
        return {
          completedTasks: state.completedTasks.filter(taskId => taskId !== id),
          incompleteTasks: [...state.incompleteTasks, id]
        }
      }
      return {
        incompleteTasks: state.incompleteTasks.filter(taskId => taskId !== id),
        completedTasks: [...state.completedTasks, id]
      }
    });
  },
  
  removeTask: (id) => {
    set((state) => {
      const task = state.taskMap.get(id);
      if (!task) return {}
      
      const newTaskMap = new Map(state.taskMap);
      newTaskMap.delete(id);
      
      if (task.completed) {
        return {
          completedTasks: state.completedTasks.filter(taskId => taskId !== id),
          taskMap: newTaskMap
        }
      }
      return {
        incompleteTasks: state.incompleteTasks.filter(taskId => taskId !== id),
        taskMap: newTaskMap
      }
    });
  }
}));

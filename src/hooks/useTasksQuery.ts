import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as supabaseApiClient from './supabaseApiClient';
import { Task } from '../types';

// Query keys
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  detail: (id: number) => [...taskKeys.all, 'detail', id] as const,
};

// Hook for fetching all tasks
export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.lists(),
    queryFn: supabaseApiClient.getTasks,
  });
};

// Hook for fetching a single task
export const useTask = (id: number) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => supabaseApiClient.getTask(id),
    enabled: !!id,
  });
};

// Hook for creating a task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => 
      supabaseApiClient.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

// Hook for updating a task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: Partial<Task> }) =>
      supabaseApiClient.updateTask(id, task),
    onSuccess: (updatedTask: Task) => {
      // Update the task in the lists query
      queryClient.setQueryData(taskKeys.lists(), (oldData: Task[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        );
      });
      
      // Update the task in the detail query
      queryClient.setQueryData(taskKeys.detail(updatedTask.id), updatedTask);
    },
  });
};

// Hook for deleting a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => supabaseApiClient.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

// Hook for toggling task completion
export const useToggleTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      supabaseApiClient.toggleTaskCompletion(id, completed),
    onSuccess: (updatedTask: Task) => {
      // Update the task in the lists query
      queryClient.setQueryData(taskKeys.lists(), (oldData: Task[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        );
      });
      
      // Update the task in the detail query
      queryClient.setQueryData(taskKeys.detail(updatedTask.id), updatedTask);
    },
  });
};

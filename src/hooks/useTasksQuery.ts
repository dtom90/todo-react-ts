import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../store/apiClient';
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
    queryFn: apiClient.getTasks,
  });
};

// Hook for fetching a single task
export const useTask = (id: number) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => apiClient.getTask(id),
    enabled: !!id,
  });
};

// Hook for creating a task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => 
      apiClient.createTask(task),
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
      apiClient.updateTask(id, task),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
};

// Hook for deleting a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteTask(id),
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
      apiClient.toggleTaskCompletion(id, completed),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) });
    },
  });
};

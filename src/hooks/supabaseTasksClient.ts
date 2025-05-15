import { supabase } from '../supabaseClient';
import { Task } from '../types';

// Get all tasks for the current user
export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('task')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

// Get a single task by ID (if owned by the user)
export const getTask = async (id: number): Promise<Task | null> => {
  const { data, error } = await supabase
    .from('task')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

// Create a new task for the current user
export const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<Task> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user?.id) throw new Error('User not authenticated');
  const { data, error } = await supabase
    .from('task')
    .insert([{ ...task, user_id: userData.user.id }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

// Update an existing task (if owned by the user)
export const updateTask = async (id: number, updates: Partial<Omit<Task, 'id' | 'user_id'>>): Promise<void> => {
  const { error } = await supabase
    .from('task')
    .update(updates)
    .eq('id', id);
  if (error) throw new Error(error.message);
};

// Delete a task (if owned by the user)
export const deleteTask = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('task')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
};

// Toggle task completion
export const toggleTaskCompletion = async (id: number, completed: boolean): Promise<void> => {
  await updateTask(id, { completed });
};

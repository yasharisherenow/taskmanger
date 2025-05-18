export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  projectId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  assignedTo: string | null;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export type TaskFilter = {
  status: 'all' | 'active' | 'completed';
  projectId: string | null;
  priority: 'all' | 'low' | 'medium' | 'high';
  search: string;
};

export type SortOption = 'dueDate' | 'priority' | 'createdAt';

export type ThemeMode = 'light' | 'dark';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Project, User, TaskFilter, SortOption, ThemeMode } from '../types';
import { generateId } from '../utils/helpers';

interface AppContextType {
  tasks: Task[];
  projects: Project[];
  users: User[];
  activeProject: string | null;
  taskFilter: TaskFilter;
  sortOption: SortOption;
  theme: ThemeMode;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (projectId: string | null) => void;
  setTaskFilter: (filter: Partial<TaskFilter>) => void;
  setSortOption: (option: SortOption) => void;
  toggleTheme: () => void;
}

const defaultUsers: User[] = [
  { id: '1', name: 'You', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Sam Wilson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Taylor Kim', avatar: 'https://i.pravatar.cc/150?img=4' },
];

const defaultProjects: Project[] = [
  { id: 'p1', name: 'Personal', color: '#3B82F6', createdAt: new Date().toISOString() },
  { id: 'p2', name: 'Work', color: '#F59E0B', createdAt: new Date().toISOString() },
  { id: 'p3', name: 'Health', color: '#10B981', createdAt: new Date().toISOString() },
];

const defaultTasks: Task[] = [
  {
    id: 't1',
    title: 'Finalize project proposal',
    description: 'Review and submit the final version of the proposal.',
    completed: false,
    projectId: 'p2',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    assignedTo: '1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 't2',
    title: 'Morning run',
    description: '30 minute jog in the park',
    completed: true,
    projectId: 'p3',
    priority: 'medium',
    dueDate: new Date().toISOString(),
    assignedTo: '1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 't3',
    title: 'Grocery shopping',
    description: 'Buy fruits, vegetables, and milk',
    completed: false,
    projectId: 'p1',
    priority: 'low',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    assignedTo: '1',
    createdAt: new Date().toISOString(),
  },
];

const defaultFilter: TaskFilter = {
  status: 'all',
  projectId: null,
  priority: 'all',
  search: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });
  
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });
  
  const [users] = useState<User[]>(defaultUsers);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(defaultFilter);
  const [sortOption, setSortOption] = useState<SortOption>('dueDate');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(project => (project.id === id ? { ...project, ...updates } : project)));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    setTasks(tasks.filter(task => task.projectId !== id));
  };

  const updateTaskFilter = (filter: Partial<TaskFilter>) => {
    setTaskFilter(prev => ({ ...prev, ...filter }));
  };

  const value = {
    tasks,
    projects,
    users,
    activeProject,
    taskFilter,
    sortOption,
    theme,
    addTask,
    updateTask,
    deleteTask,
    addProject,
    updateProject,
    deleteProject,
    setActiveProject,
    setTaskFilter: updateTaskFilter,
    setSortOption,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
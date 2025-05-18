export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Check if date is today
  if (date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
    return 'Today';
  }
  
  // Check if date is tomorrow
  if (date.setHours(0, 0, 0, 0) === tomorrow.setHours(0, 0, 0, 0)) {
    return 'Tomorrow';
  }
  
  // Otherwise format the date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });
};

export const getPriorityColor = (priority: string): string => {
  switch(priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-amber-500';
    case 'low':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

export const getPriorityLabel = (priority: string): string => {
  switch(priority) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'None';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const filterTasks = (
  tasks: any[],
  filter: { status: string; projectId: string | null; priority: string; search: string },
  sortOption: string
) => {
  let filteredTasks = [...tasks];
  
  // Filter by status
  if (filter.status === 'active') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  } else if (filter.status === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  }
  
  // Filter by project
  if (filter.projectId) {
    filteredTasks = filteredTasks.filter(task => task.projectId === filter.projectId);
  }
  
  // Filter by priority
  if (filter.priority !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
  }
  
  // Filter by search term
  if (filter.search) {
    const searchTerm = filter.search.toLowerCase();
    filteredTasks = filteredTasks.filter(
      task => 
        task.title.toLowerCase().includes(searchTerm) || 
        task.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort tasks
  filteredTasks.sort((a, b) => {
    switch (sortOption) {
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'priority':
        const priorityValues = { high: 3, medium: 2, low: 1 };
        return priorityValues[b.priority as keyof typeof priorityValues] - 
               priorityValues[a.priority as keyof typeof priorityValues];
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });
  
  return filteredTasks;
};
import React from 'react';
import { useApp } from '../../context/AppContext';
import TaskItem from './TaskItem';
import { filterTasks } from '../../utils/helpers';
import { Frown } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, taskFilter, sortOption, projects } = useApp();
  const filteredTasks = filterTasks(tasks, taskFilter, sortOption);

  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 p-4 mb-4">
          <Frown size={36} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
        <p className="text-gray-500 max-w-md">
          {taskFilter.search
            ? `No tasks matching "${taskFilter.search}"`
            : taskFilter.status === 'completed'
            ? "You haven't completed any tasks yet"
            : "You don't have any tasks yet. Click 'New Task' to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          project={projects.find(p => p.id === task.projectId)}
        />
      ))}
    </div>
  );
};

export default TaskList;
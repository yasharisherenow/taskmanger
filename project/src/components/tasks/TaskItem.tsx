import React, { useState } from 'react';
import { Clock, Pencil, Trash2, User } from 'lucide-react';
import { Task, Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatDate, getPriorityColor } from '../../utils/helpers';
import TaskModal from './TaskModal';
import ConfirmDialog from '../ui/ConfirmDialog';

interface TaskItemProps {
  task: Task;
  project?: Project;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, project }) => {
  const { updateTask, deleteTask, users } = useApp();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const assignedUser = task.assignedTo 
    ? users.find(user => user.id === task.assignedTo) 
    : null;
  
  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 ${
        isHovered ? 'shadow-md translate-y-[-2px]' : ''
      } ${
        task.completed ? 'opacity-75' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors cursor-pointer"
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center">
              <h3 className={`text-base font-medium ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              {project && (
                <span 
                  className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${project.color}20`, 
                    color: project.color 
                  }}
                >
                  {project.name}
                </span>
              )}
            </div>
            <div className="flex mt-1 sm:mt-0">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mr-2 ${getPriorityColor(task.priority)} bg-opacity-10 text-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'amber' : 'blue'}-800`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          </div>
          
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{task.description}</p>
          
          <div className="mt-2 flex flex-wrap items-center text-xs text-gray-500 gap-3">
            {task.dueDate && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
            
            {assignedUser && (
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                <span>{assignedUser.name}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex-shrink-0 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowTaskModal(true)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {showTaskModal && (
        <TaskModal 
          task={task} 
          onClose={() => setShowTaskModal(false)} 
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog 
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete"
          confirmVariant="danger"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default TaskItem;
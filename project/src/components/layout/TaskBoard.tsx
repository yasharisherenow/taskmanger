import React, { useState } from 'react';
import { ArrowDownAZ, Calendar, Filter, Star, LayoutDashboard, List } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TaskList from '../tasks/TaskList';
import Dashboard from '../dashboard/Dashboard';
import { SortOption, TaskFilter } from '../../types';

const TaskBoard: React.FC = () => {
  const { 
    taskFilter, 
    setTaskFilter, 
    activeProject, 
    projects,
    sortOption, 
    setSortOption,
  } = useApp();
  
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'dashboard'>('dashboard');
  
  const activeProjectName = activeProject 
    ? projects.find(p => p.id === activeProject)?.name 
    : null;

  const handleStatusChange = (status: TaskFilter['status']) => {
    setTaskFilter({ status });
    setShowFilter(false);
  };

  const handlePriorityChange = (priority: TaskFilter['priority']) => {
    setTaskFilter({ priority });
    setShowFilter(false);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-dark-900 min-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {activeProjectName 
              ? activeProjectName
              : taskFilter.status === 'completed' 
                ? 'Completed Tasks' 
                : taskFilter.status === 'active' 
                  ? 'Active Tasks' 
                  : 'All Tasks'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {activeProjectName 
              ? `All tasks in ${activeProjectName}` 
              : 'Manage and organize your tasks'}
          </p>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('dashboard')}
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'dashboard'
                    ? 'border-blue-500 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
              >
                <LayoutDashboard size={16} className="mr-2" />
                Dashboard
              </button>
              
              <button 
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'border-blue-500 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
              >
                <List size={16} className="mr-2" />
                List
              </button>
            </div>

            {viewMode === 'list' && (
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowFilter(!showFilter)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => handleSortChange(sortOption === 'dueDate' ? 'priority' : 'dueDate')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {sortOption === 'dueDate' ? (
                      <>
                        <Calendar size={16} className="mr-2" />
                        Due Date
                      </>
                    ) : sortOption === 'priority' ? (
                      <>
                        <Star size={16} className="mr-2" />
                        Priority
                      </>
                    ) : (
                      <>
                        <ArrowDownAZ size={16} className="mr-2" />
                        Created
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            <div className="w-full sm:w-auto">
              <select
                value={taskFilter.status}
                onChange={(e) => handleStatusChange(e.target.value as TaskFilter['status'])}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {showFilter && viewMode === 'list' && (
            <div className="mt-2 p-4 bg-gray-50 dark:bg-dark-700 rounded-md">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by priority</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePriorityChange('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    taskFilter.priority === 'all' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handlePriorityChange('high')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    taskFilter.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  High
                </button>
                <button
                  onClick={() => handlePriorityChange('medium')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    taskFilter.priority === 'medium' 
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => handlePriorityChange('low')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    taskFilter.priority === 'low' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Low
                </button>
              </div>
            </div>
          )}
        </div>

        {viewMode === 'dashboard' ? <Dashboard /> : <TaskList />}
      </div>
    </div>
  );
};

export default TaskBoard;
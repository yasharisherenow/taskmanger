import React, { useState } from 'react';
import { Menu, Plus, Search, X, Moon, Sun } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TaskModal from '../tasks/TaskModal';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { taskFilter, setTaskFilter, theme, toggleTheme } = useApp();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskFilter({ search: e.target.value });
  };

  const clearSearch = () => {
    setTaskFilter({ search: '' });
  };

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-4 justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-2 hidden sm:block">TaskFlow</h1>
      </div>

      <div className={`flex-1 max-w-lg mx-4 relative transition-all duration-200 ${searchFocused ? 'scale-105' : ''}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-all"
            value={taskFilter.search}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {taskFilter.search && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={() => setShowTaskModal(true)}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 flex items-center transition-colors duration-200 shadow-sm hover:shadow"
        >
          <Plus size={18} className="mr-1" />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>

      {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} />}
    </header>
  );
};

export default Header;
import React from 'react';
import { 
  Home, 
  CheckCircle2, 
  Clock, 
  Folder, 
  Settings, 
  Plus,
  Circle,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProjectModal from '../projects/ProjectModal';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { projects, activeProject, setActiveProject, setTaskFilter } = useApp();
  const [showProjectModal, setShowProjectModal] = React.useState(false);

  const handleFilterAll = () => {
    setActiveProject(null);
    setTaskFilter({ status: 'all', projectId: null });
  };

  const handleFilterActive = () => {
    setActiveProject(null);
    setTaskFilter({ status: 'active', projectId: null });
  };

  const handleFilterCompleted = () => {
    setActiveProject(null);
    setTaskFilter({ status: 'completed', projectId: null });
  };

  const handleProjectSelect = (projectId: string) => {
    setActiveProject(projectId);
    setTaskFilter({ projectId, status: 'all' });
  };

  return (
    <>
      <aside 
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 lg:border-b-0">
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          <button 
            onClick={onClose} 
            className="lg:hidden text-gray-600 hover:text-gray-900 p-1"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-6">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Tasks</h2>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={handleFilterAll}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeProject === null && 'bg-gray-100 text-gray-900'
                  } hover:bg-gray-100 text-gray-700`}
                >
                  <Home size={18} className="mr-2 flex-shrink-0" />
                  All Tasks
                </button>
              </li>
              <li>
                <button 
                  onClick={handleFilterActive}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  <Clock size={18} className="mr-2 flex-shrink-0" />
                  Active
                </button>
              </li>
              <li>
                <button 
                  onClick={handleFilterCompleted}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  <CheckCircle2 size={18} className="mr-2 flex-shrink-0" />
                  Completed
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Projects</h2>
              <button 
                onClick={() => setShowProjectModal(true)}
                className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                aria-label="Add project"
              >
                <Plus size={16} />
              </button>
            </div>
            <ul className="space-y-1">
              {projects.map(project => (
                <li key={project.id}>
                  <button
                    onClick={() => handleProjectSelect(project.id)}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeProject === project.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } hover:bg-gray-100`}
                  >
                    <Circle 
                      size={18} 
                      className="mr-2 flex-shrink-0" 
                      fill={project.color} 
                      color={project.color}
                    />
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6">
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700 transition-colors">
              <Settings size={18} className="mr-2 flex-shrink-0" />
              Settings
            </button>
          </div>
        </nav>
      </aside>

      {showProjectModal && (
        <ProjectModal onClose={() => setShowProjectModal(false)} />
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" 
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ShieldCheck, LogOut } from 'lucide-react';
import Button from '../ui/Button';

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/projects', label: 'Project Inbox' },
    { path: '/admin/developers', label: 'Developer Management' },
    { path: '/admin/settings', label: 'Settings' },
  ];
  
  const handleLogout = async () => {
    await logout();
    // Redirect to home page after logout
    window.location.href = '/';
  };
  
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/admin" className="flex items-center space-x-2">
                <ShieldCheck className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold">ProjectMarket Admin</span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(link.path)
                      ? 'border-primary-400 text-white'
                      : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              {user?.avatar ? (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.avatar}
                  alt={user.name}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              )}
              
              <span className="text-sm font-medium text-gray-200">
                {user?.name || 'Admin User'}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
                icon={<LogOut size={16} />}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
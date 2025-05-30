import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogIn, Menu, X, Upload, ShoppingBag, Repeat } from 'lucide-react';
import Button from '../ui/Button';
import AuthModal from '../auth/AuthModal';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { isAuthenticated, user, logout, switchRole } = useAuthStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse Projects' },
  ];
  
  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const handleRoleSwitch = async () => {
    if (user) {
      const newRole = user.role === 'buyer' ? 'seller' : 'buyer';
      await switchRole(newRole);
    }
  };
  
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-bold text-gray-900">ProjectMarket</span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(link.path)
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'seller' && (
                  <Link to="/upload">
                    <Button variant="accent\" size="sm\" icon={<Upload size={16} />}>
                      Upload Project
                    </Button>
                  </Link>
                )}
                
                <div className="relative">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Repeat size={16} />}
                      onClick={handleRoleSwitch}
                    >
                      Switch to {user?.role === 'buyer' ? 'Seller' : 'Buyer'}
                    </Button>

                    <Link to="/account" className="flex items-center">
                      {user?.avatar ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-800 font-medium text-sm">
                            {user?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>
                    </Link>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                icon={<LogIn size={16} />}
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In
              </Button>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden animate-fade-in">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  {user?.avatar ? (
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-800 font-medium">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                
                <div className="mt-3 space-y-1">
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start px-4"
                    icon={<Repeat size={16} />}
                    onClick={handleRoleSwitch}
                  >
                    Switch to {user?.role === 'buyer' ? 'Seller' : 'Buyer'}
                  </Button>

                  <Link
                    to="/account"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Your Account
                  </Link>
                  
                  <Link
                    to="/purchases"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Your Purchases
                  </Link>
                  
                  {user?.role === 'seller' && (
                    <Link
                      to="/upload"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Upload Project
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;
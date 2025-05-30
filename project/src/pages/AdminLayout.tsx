import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AdminHeader from '../components/admin/AdminHeader';
import { ShieldAlert } from 'lucide-react';
import Button from '../components/ui/Button';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Check if user is authenticated and has admin role
  const isAdmin = isAuthenticated && user?.role === 'admin';
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <ShieldAlert className="h-16 w-16 text-error-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access the admin area. Please log in with an admin account.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminHeader />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} ProjectMarket Admin Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
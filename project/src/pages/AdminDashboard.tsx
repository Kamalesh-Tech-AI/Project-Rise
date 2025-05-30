import React from 'react';
import { Link } from 'react-router-dom';
import ProjectInbox from '../components/admin/ProjectInbox';
import Button from '../components/ui/Button';
import { Archive, Clock, Shield, ThumbsDown, ThumbsUp, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock statistics
  const stats = [
    { name: 'Pending Reviews', value: 4, icon: Clock, color: 'bg-blue-500' },
    { name: 'Approved Projects', value: 127, icon: ThumbsUp, color: 'bg-green-500' },
    { name: 'Rejected Projects', value: 23, icon: ThumbsDown, color: 'bg-red-500' },
    { name: 'Total Users', value: 512, icon: Users, color: 'bg-purple-500' },
    { name: 'Developer Accounts', value: 38, icon: Shield, color: 'bg-amber-500' },
    { name: 'Archived Projects', value: 94, icon: Archive, color: 'bg-gray-500' },
  ];
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-2 text-white mr-3`}>
                  <stat.icon size={18} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProjectInbox />
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <Link to="/admin/projects">
                <Button
                  variant="primary"
                  fullWidth
                  className="justify-start"
                >
                  Review Pending Projects
                </Button>
              </Link>
              
              <Link to="/admin/developers">
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start"
                >
                  Manage Developer Accounts
                </Button>
              </Link>
              
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                Generate Reports
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                className="justify-start"
              >
                System Settings
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ThumbsUp className="h-5 w-5 text-success-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">You approved</span> E-commerce Website Template
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ThumbsDown className="h-5 w-5 text-error-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">You rejected</span> Mobile App Design System
                    </p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Shield className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">You assigned developer status</span> to Jane Smith
                    </p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ThumbsUp className="h-5 w-5 text-success-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">You approved</span> Personal Portfolio Website
                    </p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-4 text-center">
                <button className="text-sm text-primary-600 hover:text-primary-500">
                  View all activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
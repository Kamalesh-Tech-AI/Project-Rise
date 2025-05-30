import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { AlertTriangle, Check, Key, Search, UserCheck } from 'lucide-react';
import { mockUsers } from '../../utils/mockData';

const DeveloperManagement: React.FC = () => {
  const { assignDeveloperStatus, isLoading } = useAdminStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);
  
  // Filter users who are sellers (potential developers)
  const sellers = mockUsers.filter(user => user.role === 'seller');
  
  const filteredSellers = sellers.filter(seller => 
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAssignDeveloper = async (userId: string) => {
    setSelectedUser(userId);
    setIsModalOpen(true);
  };
  
  const confirmAssignDeveloper = async () => {
    if (selectedUser) {
      try {
        const result = await assignDeveloperStatus(selectedUser);
        if (result.success && result.credentials) {
          setCredentials(result.credentials);
        }
      } catch (error) {
        alert('Failed to assign developer status. Please try again.');
      }
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setCredentials(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-lg font-medium text-gray-900">Developer Management</h2>
        <p className="mt-1 text-sm text-gray-600">
          Assign developer status to high-rated sellers to allow them special access.
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search sellers by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Seller
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rating
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Projects
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {seller.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={seller.avatar}
                            alt={seller.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-800 font-medium">
                              {seller.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{seller.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-amber-500">
                      <span className="text-sm font-medium mr-1">
                        {(Math.random() * (5 - 4) + 4).toFixed(1)}
                      </span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-4 h-4"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 10) + 1} projects
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<UserCheck size={16} />}
                      onClick={() => handleAssignDeveloper(seller.id)}
                    >
                      Assign Developer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSellers.length === 0 && (
          <div className="text-center py-6">
            <AlertTriangle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No sellers found matching your search.</p>
          </div>
        )}
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={credentials ? "Developer Credentials" : "Confirm Developer Status"}
        size="md"
      >
        {credentials ? (
          <div>
            <div className="bg-success-50 text-success-700 p-4 rounded-md mb-4">
              <div className="flex">
                <Check className="h-5 w-5 mr-2" />
                <p className="text-sm font-medium">Developer status assigned successfully!</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              Developer credentials have been generated. Please share these with the seller.
              These credentials will allow them to log in with developer privileges.
            </p>
            
            <div className="bg-gray-50 rounded-md p-4 mb-4">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    readOnly
                    value={credentials.username}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Temporary Password</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    readOnly
                    value={credentials.password}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-100"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm mb-4">
              <div className="flex">
                <Key className="h-5 w-5 mr-2" />
                <p>
                  Important: The seller will be asked to change their password upon first login.
                  These credentials will expire in 48 hours if not used.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="primary" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to assign developer status to this seller?
              Developers can upload higher-value projects and gain additional privileges.
            </p>
            
            <div className="bg-yellow-50 text-yellow-700 p-3 rounded-md text-sm mb-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <p>
                  This action will generate secure login credentials that you'll need to share
                  with the seller.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmAssignDeveloper}
                isLoading={isLoading}
              >
                Confirm
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DeveloperManagement;
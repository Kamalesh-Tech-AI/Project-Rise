import React, { useEffect } from 'react';
import { useAdminStore } from '../../store/adminStore';
import Button from '../ui/Button';
import { 
  AlertTriangle, 
  Check, 
  CheckCircle, 
  ExternalLink, 
  Eye, 
  ThumbsDown, 
  XCircle 
} from 'lucide-react';
import { ProjectType } from '../../types';

const ProjectTypeLabel: React.FC<{ type: ProjectType }> = ({ type }) => {
  const typeStyles = {
    website: 'bg-blue-100 text-blue-800',
    portfolio: 'bg-purple-100 text-purple-800',
    custom: 'bg-green-100 text-green-800',
    phd: 'bg-amber-100 text-amber-800',
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyles[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const ProjectInbox: React.FC = () => {
  const { 
    pendingProjects, 
    fetchPendingProjects, 
    reviewProject, 
    isLoading, 
    error 
  } = useAdminStore();
  
  useEffect(() => {
    fetchPendingProjects();
  }, [fetchPendingProjects]);
  
  const handleApprove = async (projectId: string) => {
    if (confirm('Are you sure you want to approve this project?')) {
      const success = await reviewProject(projectId, 'approve');
      if (success) {
        alert('Project approved successfully.');
      }
    }
  };
  
  const handleReject = async (projectId: string) => {
    const feedback = prompt('Please provide feedback for rejection:');
    if (feedback) {
      const success = await reviewProject(projectId, 'reject', feedback);
      if (success) {
        alert('Project rejected successfully.');
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-error-50 text-error-700 p-6 rounded-lg">
        <h3 className="text-lg font-medium flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Error Loading Projects
        </h3>
        <p className="mt-2">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => fetchPendingProjects()}
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Pending Projects ({pendingProjects.length})
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchPendingProjects()}
        >
          Refresh
        </Button>
      </div>
      
      {pendingProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <CheckCircle className="h-12 w-12 text-success-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Pending Projects</h3>
          <p className="text-gray-600">All submitted projects have been reviewed.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Project
                </th>
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
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Submitted
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
              {pendingProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={project.screenshots[0]}
                          alt={project.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{project.seller.name}</div>
                      <div className="ml-1 flex items-center text-amber-500">
                        <span className="text-xs font-medium">{project.seller.rating}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className="w-3 h-3 ml-0.5"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProjectTypeLabel type={project.type} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${project.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {project.previewUrl && (
                        <a
                          href={project.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      
                      <a
                        href={`/admin/projects/${project.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye size={18} />
                      </a>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-success-600 hover:text-success-900"
                        icon={<Check size={18} />}
                        onClick={() => handleApprove(project.id)}
                      >
                        Approve
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error-600 hover:text-error-900"
                        icon={<ThumbsDown size={18} />}
                        onClick={() => handleReject(project.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectInbox;
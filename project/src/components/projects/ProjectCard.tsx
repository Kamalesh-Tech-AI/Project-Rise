import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { Eye, Tag } from 'lucide-react';

// Function to disable right-click
const disableRightClick = (e: React.MouseEvent) => {
  e.preventDefault();
  return false;
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, description, price, type, category, screenshots, seller } = project;
  
  return (
    <Link 
      to={`/projects/${id}`}
      className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={screenshots[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onContextMenu={disableRightClick}
          onDragStart={(e) => e.preventDefault()}
          style={{ 
            position: 'relative',
          }}
        />
        <div
          className="absolute inset-0 bg-repeat opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0L40 20L20 40z' /%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        ></div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 bg-gradient-to-t from-black/70 to-transparent">
          <span className="text-white text-sm font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          <span className="bg-accent-500 text-white px-2 py-0.5 rounded text-sm font-bold">
            ${price}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Tag size={16} className="text-secondary-500 mr-2" />
            <span className="text-gray-600 text-xs">{category}</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              {seller.avatar ? (
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-5 h-5 rounded-full mr-1"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mr-1">
                  <span className="text-primary-800 text-xs font-medium">
                    {seller.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-gray-600 text-xs">{seller.name}</span>
            </div>
            
            <div className="flex items-center text-amber-500">
              <span className="text-xs font-medium mr-1">{seller.rating}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-3 h-3"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-500 text-xs">
            <Eye size={14} className="mr-1" />
            <span>{Math.floor(Math.random() * 1000) + 100} views</span>
          </div>
          <span className="text-primary-600 text-sm font-medium">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
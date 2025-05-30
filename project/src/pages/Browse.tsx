import React, { useEffect, useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import ProjectCard from '../components/projects/ProjectCard';
import { AlertTriangle, Filter, Search, SlidersHorizontal } from 'lucide-react';
import Button from '../components/ui/Button';
import { ProjectType } from '../types';

const Browse: React.FC = () => {
  const { projects, fetchProjects, isLoading, error } = useProjectStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => project.category))];
  
  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || project.type === selectedType;
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    const matchesPrice = project.price >= priceRange[0] && project.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesCategory && matchesPrice;
  });
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Projects</h1>
          <p className="mt-1 text-gray-600">
            Discover and purchase high-quality digital projects
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button
            variant="outline"
            icon={<SlidersHorizontal size={16} />}
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="md:hidden"
          >
            Filters
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h3>
              
              <div className="relative rounded-md shadow-sm mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search projects"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full mb-6 text-gray-600"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Project Type</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    checked={selectedType === 'all'}
                    onChange={() => setSelectedType('all')}
                  />
                  <span className="ml-2 text-gray-700">All Types</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    checked={selectedType === 'website'}
                    onChange={() => setSelectedType('website')}
                  />
                  <span className="ml-2 text-gray-700">Websites</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    checked={selectedType === 'portfolio'}
                    onChange={() => setSelectedType('portfolio')}
                  />
                  <span className="ml-2 text-gray-700">Portfolios</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    checked={selectedType === 'custom'}
                    onChange={() => setSelectedType('custom')}
                  />
                  <span className="ml-2 text-gray-700">Custom Projects</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    checked={selectedType === 'phd'}
                    onChange={() => setSelectedType('phd')}
                  />
                  <span className="ml-2 text-gray-700">PhD Projects</span>
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Category</h4>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                className="w-full"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(0, 100)}
                >
                  Under $100
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(100, 250)}
                >
                  $100 - $250
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(250, 500)}
                >
                  $250 - $500
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(500, 1000)}
                >
                  Over $500
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters - Mobile */}
        {isMobileFiltersOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-sm p-6 mb-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="relative rounded-md shadow-sm mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Project Type</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedType === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('all')}
                >
                  All Types
                </Button>
                <Button
                  variant={selectedType === 'website' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('website')}
                >
                  Websites
                </Button>
                <Button
                  variant={selectedType === 'portfolio' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('portfolio')}
                >
                  Portfolios
                </Button>
                <Button
                  variant={selectedType === 'custom' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('custom')}
                >
                  Custom
                </Button>
                <Button
                  variant={selectedType === 'phd' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('phd')}
                >
                  PhD
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Category</h4>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                className="w-full"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(0, 100)}
                >
                  Under $100
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(100, 250)}
                >
                  $100 - $250
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(250, 500)}
                >
                  $250 - $500
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceChange(500, 1000)}
                >
                  Over $500
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={() => setIsMobileFiltersOpen(false)}
                fullWidth
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>
        )}
        
        {/* Projects Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-error-50 text-error-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Error Loading Projects
              </h3>
              <p className="mt-2">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => fetchProjects()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {filteredProjects.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No projects found</h3>
                  <p className="mt-1 text-gray-500">
                    Try changing your search criteria or removing some filters.
                  </p>
                  <div className="mt-6">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600">
                      Showing {filteredProjects.length} projects
                    </p>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Sort by:</span>
                      <select
                        className="border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option>Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Most Popular</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
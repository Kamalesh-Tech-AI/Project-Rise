import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import ProjectCard from '../components/projects/ProjectCard';
import Button from '../components/ui/Button';
import { ArrowRight, Code, Download, Shield, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const { projects, fetchProjects, isLoading } = useProjectStore();
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  // Get featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                The Secure Marketplace for Digital Projects
              </h1>
              <p className="text-lg text-primary-100 leading-relaxed">
                Buy and sell digital projects with confidence. From websites and portfolios to custom applications and academic projects, all secured with encryption.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/browse">
                  <Button
                    variant="accent"
                    size="lg"
                    icon={<Sparkles size={18} />}
                  >
                    Browse Projects
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                  >
                    Sell Your Project
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Digital marketplace"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Discover high-quality digital projects from our top creators
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link to="/browse">
                  <Button
                    variant="outline"
                    icon={<ArrowRight size={16} className="ml-2" />}
                    iconPosition="right"
                  >
                    View All Projects
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our secure platform makes buying and selling digital projects simple
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full text-primary-600 mb-4">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Sellers</h3>
              <p className="text-gray-600">
                Upload your digital projects, set your price, and reach a global audience of buyers. All projects are securely encrypted and protected.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-accent-100 rounded-full text-accent-600 mb-4">
                <Download size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Buyers</h3>
              <p className="text-gray-600">
                Browse projects with live previews, make secure purchases, and receive one-time download links to access your files.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-secondary-100 rounded-full text-secondary-600 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Security First</h3>
              <p className="text-gray-600">
                All projects are encrypted, previews are protected, and our admin team reviews every submission for quality and security.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-accent-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of developers, designers, and creators buying and selling digital projects on our secure marketplace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/browse">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-accent-600 hover:bg-gray-100"
              >
                Browse Projects
              </Button>
            </Link>
            <Link to="/upload">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Sell Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from the creators and buyers who use our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <span className="text-primary-800 font-medium">J</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">John D.</h4>
                  <p className="text-sm text-gray-500">Seller</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ProjectMarket has transformed how I sell my digital projects. The security features give my clients confidence, and the platform has connected me with buyers worldwide."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                  <span className="text-accent-800 font-medium">S</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Buyer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've purchased multiple website templates that saved me countless hours of development time. The preview feature let me see exactly what I was getting before buying."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                  <span className="text-secondary-800 font-medium">R</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Ryan K.</h4>
                  <p className="text-sm text-gray-500">Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a developer with special status, I can offer premium projects to clients. The platform handles all the security and payment processing, letting me focus on creating great code."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
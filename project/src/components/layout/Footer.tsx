import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Twitter, Facebook, Instagram, Github as GitHub } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">ProjectMarket</span>
            </Link>
            <p className="text-gray-400 text-sm">
              The secure marketplace for buying and selling digital projects. Discover, sell, and purchase with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <GitHub size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Marketplace
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white text-sm">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-400 hover:text-white text-sm">
                  Sell Your Projects
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-gray-400 hover:text-white text-sm">
                  Featured Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-gray-400 hover:text-white text-sm">
                  Submission Guidelines
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/developers" className="text-gray-400 hover:text-white text-sm">
                  Developer Program
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/license" className="text-gray-400 hover:text-white text-sm">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="/dmca" className="text-gray-400 hover:text-white text-sm">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} ProjectMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
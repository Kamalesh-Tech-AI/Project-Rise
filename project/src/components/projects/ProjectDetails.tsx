import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProjectStore } from '../../store/projectStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { 
  AlertCircle, 
  ArrowLeft, 
  Calendar, 
  Check, 
  Download, 
  ExternalLink, 
  Globe, 
  Lock, 
  Shield, 
  ShoppingCart, 
  Tag, 
  User 
} from 'lucide-react';

// Function to disable right-click
const disableRightClick = (e: React.MouseEvent) => {
  e.preventDefault();
  return false;
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    currentProject, 
    fetchProjectById, 
    isLoading, 
    error,
    purchaseProject,
    downloadProject,
    purchases
  } = useProjectStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  
  // Check if user has already purchased this project
  const hasPurchased = purchases.some(p => p.projectId === id);
  
  // Get the purchase if it exists
  const purchase = purchases.find(p => p.projectId === id);
  
  React.useEffect(() => {
    if (id) {
      fetchProjectById(id);
    }
  }, [id, fetchProjectById]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error || !currentProject) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <AlertCircle className="h-12 w-12 text-error-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
        <p className="text-gray-600 mb-6">{error || "We couldn't find the project you're looking for."}</p>
        <Link to="/browse">
          <Button variant="primary" icon={<ArrowLeft size={16} />}>
            Back to Browse
          </Button>
        </Link>
      </div>
    );
  }
  
  const { 
    title, 
    description, 
    price, 
    type, 
    category, 
    screenshots, 
    seller, 
    previewUrl,
    createdAt
  } = currentProject;
  
  const handlePurchase = async () => {
    if (!isAuthenticated) {
      setPurchaseError('You must be logged in to purchase projects');
      return;
    }
    
    if (!isTermsAccepted) {
      setPurchaseError('You must accept the terms to continue');
      return;
    }
    
    try {
      const purchase = await purchaseProject(id!);
      setPurchaseId(purchase.id);
      setPurchaseSuccess(true);
      setPurchaseError(null);
    } catch (error) {
      setPurchaseError('Failed to process your purchase. Please try again.');
    }
  };
  
  const handleDownload = async () => {
    if (purchase) {
      try {
        await downloadProject(purchase.id);
        window.alert('Download started successfully!');
      } catch (error) {
        window.alert('Failed to start download. Please try again.');
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/browse" className="text-primary-600 hover:text-primary-500 flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Browse</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={screenshots[activeImageIndex]}
                alt={title}
                className="w-full object-cover"
                style={{ height: '400px' }}
                onContextMenu={disableRightClick}
                onDragStart={(e) => e.preventDefault()}
              />
              <div
                className="absolute inset-0 bg-repeat opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0L40 20L20 40z' /%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px',
                }}
              ></div>
            </div>
            
            {screenshots.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 border-2 rounded overflow-hidden ${
                      index === activeImageIndex ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-16 h-16 object-cover"
                      onContextMenu={disableRightClick}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </button>
                ))}
              </div>
            )}
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
              
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded text-sm">
                  {category}
                </span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(createdAt)}
                </span>
              </div>
              
              <div className="prose max-w-none mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{description}</p>
              </div>
              
              {previewUrl && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-500"
                  >
                    <Globe size={16} className="mr-1" />
                    View Live Demo
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              )}
              
              <div className="border-t border-gray-200 mt-8 pt-6">
                <h3 className="text-lg font-semibold mb-4">Security Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Shield className="h-5 w-5 text-success-500" />
                    </div>
                    <p className="ml-2 text-gray-700">
                      <span className="font-medium">Secure Download:</span> All projects are securely encrypted and delivered via one-time download links.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Lock className="h-5 w-5 text-success-500" />
                    </div>
                    <p className="ml-2 text-gray-700">
                      <span className="font-medium">Content Protection:</span> Screenshots are watermarked to prevent unauthorized usage before purchase.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <p className="ml-2 text-gray-700">
                      <span className="font-medium">Verified Seller:</span> This project is from a verified seller with a proven track record.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm sticky top-8">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gray-900">${price}</span>
                <span className="text-gray-500 ml-2">one-time payment</span>
              </div>
              
              {hasPurchased ? (
                <div className="space-y-4">
                  <div className="bg-success-50 text-success-700 p-4 rounded-md flex items-start">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">Already Purchased</h3>
                      <p className="text-xs mt-1">You have already purchased this project.</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    icon={<Download size={16} />}
                    onClick={handleDownload}
                    disabled={purchase?.downloaded}
                  >
                    {purchase?.downloaded ? 'Already Downloaded' : 'Download Project'}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="accent"
                  fullWidth
                  size="lg"
                  icon={<ShoppingCart size={18} />}
                  onClick={() => setIsPurchaseModalOpen(true)}
                >
                  Purchase Now
                </Button>
              )}
              
              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    {seller.avatar ? (
                      <img
                        src={seller.avatar}
                        alt={seller.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-800 font-medium">
                          {seller.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{seller.name}</h3>
                    <div className="flex items-center">
                      <div className="flex items-center text-amber-500">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={i < Math.floor(seller.rating) ? 'currentColor' : 'none'}
                              stroke={i < Math.floor(seller.rating) ? 'none' : 'currentColor'}
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        <span className="ml-1 text-sm text-gray-700">{seller.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link to={`/seller/${seller.id}`}>
                  <Button variant="outline" fullWidth icon={<User size={16} />}>
                    View Seller Profile
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">What's included:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <Check size={16} className="text-success-500 mr-2" />
                    Full source code
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="text-success-500 mr-2" />
                    Documentation
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="text-success-500 mr-2" />
                    One-time download
                  </li>
                  <li className="flex items-center">
                    <Check size={16} className="text-success-500 mr-2" />
                    License for use
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center bg-gray-100 rounded px-2 py-1 text-xs text-gray-800">
                    <Tag size={12} className="mr-1" />
                    {type}
                  </span>
                  <span className="inline-flex items-center bg-gray-100 rounded px-2 py-1 text-xs text-gray-800">
                    <Tag size={12} className="mr-1" />
                    {category}
                  </span>
                  <span className="inline-flex items-center bg-gray-100 rounded px-2 py-1 text-xs text-gray-800">
                    <Tag size={12} className="mr-1" />
                    digital
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Modal */}
      <Modal 
        isOpen={isPurchaseModalOpen} 
        onClose={() => {
          if (!purchaseSuccess) {
            setIsPurchaseModalOpen(false);
            setPurchaseError(null);
            setIsTermsAccepted(false);
          }
        }}
        title={purchaseSuccess ? "Purchase Successful" : "Confirm Purchase"}
        size="md"
      >
        {purchaseSuccess ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100 mb-4">
              <Check className="h-8 w-8 text-success-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Thank you for your purchase!</h3>
            <p className="text-gray-600 mb-6">
              Your download is now available. You can access it using the button below.
            </p>
            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                icon={<Download size={16} />}
                onClick={handleDownload}
              >
                Download Project
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setIsPurchaseModalOpen(false);
                  setPurchaseSuccess(false);
                  setIsTermsAccepted(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Purchase: {title}</h3>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">${price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">${price}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Terms of Purchase:</h4>
              <div className="border border-gray-200 rounded-md p-3 text-sm text-gray-700 h-32 overflow-y-auto mb-2">
                <p className="mb-2">By purchasing this project, you agree to the following terms:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You will receive a one-time download link for the project.</li>
                  <li>The link will expire after the first download or after 24 hours.</li>
                  <li>You may use the project for personal or commercial purposes.</li>
                  <li>You may not redistribute, resell, or share the project with others.</li>
                  <li>You may not claim the project as your own or remove any attribution.</li>
                  <li>All sales are final and non-refundable.</li>
                </ul>
              </div>
              
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I have read and agree to the terms of purchase
                </label>
              </div>
            </div>
            
            {purchaseError && (
              <div className="bg-error-50 text-error-700 p-3 rounded-md mb-4 text-sm">
                {purchaseError}
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button
                variant="primary"
                fullWidth
                icon={<ShoppingCart size={16} />}
                onClick={handlePurchase}
                isLoading={isLoading}
                disabled={!isTermsAccepted || !isAuthenticated}
              >
                Confirm Purchase
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsPurchaseModalOpen(false);
                  setPurchaseError(null);
                  setIsTermsAccepted(false);
                }}
              >
                Cancel
              </Button>
            </div>
            
            {!isAuthenticated && (
              <div className="mt-4 text-sm text-gray-600 text-center">
                You need to be logged in to make a purchase.
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectDetails;
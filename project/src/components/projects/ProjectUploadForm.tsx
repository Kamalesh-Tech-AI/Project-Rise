import React, { useState } from 'react';
import { useProjectStore } from '../../store/projectStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { 
  AlertTriangle, 
  FileUp, 
  Globe, 
  Image as ImageIcon, 
  Info, 
  Tag, 
  Text, 
  Type 
} from 'lucide-react';
import { ProjectType } from '../../types';

interface UploadFormErrors {
  title?: string;
  description?: string;
  type?: string;
  category?: string;
  price?: string;
  file?: string;
  screenshots?: string;
}

const ProjectUploadForm: React.FC = () => {
  const { uploadProject, isLoading } = useProjectStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ProjectType>('website');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [errors, setErrors] = useState<UploadFormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const projectTypes = [
    { value: 'website', label: 'Website' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'custom', label: 'Custom Project' },
    { value: 'phd', label: 'PhD Project' },
  ];
  
  const validateForm = () => {
    const newErrors: UploadFormErrors = {};
    let isValid = true;
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    if (!type) {
      newErrors.type = 'Project type is required';
      isValid = false;
    }
    
    if (!category.trim()) {
      newErrors.category = 'Category is required';
      isValid = false;
    }
    
    if (!price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be a positive number';
      isValid = false;
    }
    
    if (!file) {
      newErrors.file = 'Project file is required';
      isValid = false;
    }
    
    if (screenshots.length === 0) {
      newErrors.screenshots = 'At least one screenshot is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || (user?.role !== 'seller' && user?.role !== 'developer')) {
      alert('You must be logged in as a seller or developer to upload projects');
      return;
    }
    
    if (!validateForm()) return;
    
    const projectData = {
      title,
      description,
      type,
      category,
      price: parseFloat(price),
      previewUrl: previewUrl || undefined,
      screenshots,
    };
    
    try {
      const result = await uploadProject(projectData, file!);
      if (result.success) {
        setSuccessMessage(result.message);
        // Reset form
        setTitle('');
        setDescription('');
        setType('website');
        setCategory('');
        setPrice('');
        setPreviewUrl('');
        setFile(null);
        setScreenshots([]);
        setErrors({});
      } else {
        setErrors({ ...errors, file: result.message });
      }
    } catch (error) {
      setErrors({ ...errors, file: 'Failed to upload project. Please try again.' });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleScreenshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setScreenshots(prev => [...prev, ...filesArray]);
    }
  };
  
  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };
  
  if (!isAuthenticated || (user?.role !== 'seller' && user?.role !== 'developer')) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          You must be logged in as a seller or developer to upload projects.
        </p>
        <Button variant="primary">Sign In</Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Project</h1>
        
        {successMessage && (
          <div className="bg-success-50 text-success-700 p-4 rounded-md mb-6 flex items-start">
            <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium">Success!</h3>
              <p className="text-sm mt-1">{successMessage}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                fullWidth
                icon={<Type size={18} />}
                error={errors.title}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 text-gray-400">
                  <Text size={18} />
                </div>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project in detail..."
                  className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 min-h-[120px] ${
                    errors.description ? 'border-error-500' : ''
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-error-500">{errors.description}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 text-gray-400">
                    <Tag size={18} />
                  </div>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as ProjectType)}
                    className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                      errors.type ? 'border-error-500' : ''
                    }`}
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-error-500">{errors.type}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., E-commerce, Portfolio, Data Science"
                  fullWidth
                  icon={<Tag size={18} />}
                  error={errors.category}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (USD)
                </label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g., 99.99"
                  fullWidth
                  icon={<span className="text-gray-400">$</span>}
                  error={errors.price}
                />
              </div>
              
              <div>
                <label htmlFor="previewUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Live Preview URL (optional)
                </label>
                <Input
                  id="previewUrl"
                  type="url"
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  placeholder="https://example.com/preview"
                  fullWidth
                  icon={<Globe size={18} />}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Project File (ZIP)
              </label>
              <div className="mt-1">
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a ZIP file</span>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          accept=".zip"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">ZIP file up to 100MB</p>
                  </div>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: <span className="font-medium">{file.name}</span>
                  </p>
                )}
                {errors.file && (
                  <p className="mt-1 text-sm text-error-500">{errors.file}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="screenshots" className="block text-sm font-medium text-gray-700 mb-1">
                Screenshots (at least one)
              </label>
              <div className="mt-1">
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="screenshots"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload screenshots</span>
                        <input
                          id="screenshots"
                          name="screenshots"
                          type="file"
                          accept="image/*"
                          multiple
                          className="sr-only"
                          onChange={handleScreenshotsChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                  </div>
                </div>
                {screenshots.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Selected Screenshots ({screenshots.length})
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {screenshots.map((screenshot, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(screenshot)}
                            alt={`Screenshot ${index + 1}`}
                            className="h-20 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeScreenshot(index)}
                            className="absolute top-0 right-0 bg-error-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.screenshots && (
                  <p className="mt-1 text-sm text-error-500">{errors.screenshots}</p>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Important information</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>All projects are reviewed by our team before being published.</li>
                      <li>Projects containing malware or inappropriate content will be rejected.</li>
                      <li>Project files are encrypted and securely stored.</li>
                      <li>Approval process typically takes 1-2 business days.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Content Guidelines
                </a>
              </label>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Submit Project for Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectUploadForm;
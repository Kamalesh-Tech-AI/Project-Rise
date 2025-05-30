import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Lock, Mail, User } from 'lucide-react';

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [errors, setErrors] = useState<{ 
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register, isLoading, error } = useAuthStore();
  
  const validateForm = () => {
    const newErrors: { 
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;
    
    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(name, email, password, role);
      onClose();
    } catch (error) {
      // Error is handled by the store
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          fullWidth
          icon={<User size={18} />}
          error={errors.name}
        />
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          fullWidth
          icon={<Mail size={18} />}
          error={errors.email}
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          fullWidth
          icon={<Lock size={18} />}
          error={errors.password}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          fullWidth
          icon={<Lock size={18} />}
          error={errors.confirmPassword}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            I want to
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                checked={role === 'buyer'}
                onChange={() => setRole('buyer')}
              />
              <span className="ml-2 text-sm text-gray-700">Buy Projects</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                checked={role === 'seller'}
                onChange={() => setRole('seller')}
              />
              <span className="ml-2 text-sm text-gray-700">Sell Projects</span>
            </label>
          </div>
        </div>
        
        {error && (
          <div className="bg-error-50 text-error-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default SignupForm
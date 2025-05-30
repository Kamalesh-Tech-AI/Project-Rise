import React, { useState } from 'react';
import { Github, Mail, X } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('login');
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {view === 'login' ? 'Sign In' : 'Create Account'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X size={20} />
        </button>
      </div>
      
      {view === 'login' ? (
        <LoginForm onClose={onClose} />
      ) : (
        <SignupForm onClose={onClose} />
      )}
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full"
            icon={<Github size={18} />}
          >
            GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full"
            icon={<Mail size={18} />}
          >
            Google
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {view === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="ml-1 font-medium text-primary-600 hover:text-primary-500"
          >
            {view === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;
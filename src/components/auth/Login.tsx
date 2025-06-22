import React, { useState } from 'react';
import { Mail, Lock, Heart } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useAuth } from '../../hooks/useAuth';

interface LoginProps {
  onToggleRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onToggleRegister }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient' as 'patient' | 'doctor'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await login(formData.email, formData.password, formData.role);
    
    if (!success) {
      setErrors({ general: 'Invalid credentials. Try: sarah.johnson@hospital.com (doctor) or john.smith@email.com (patient)' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your healthcare account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'patient' })}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    formData.role === 'patient'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'doctor' })}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    formData.role === 'doctor'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Doctor
                </button>
              </div>

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                icon={<Mail className="w-5 h-5 text-gray-400" />}
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onToggleRegister}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* <div className="mt-6 text-xs text-gray-500 text-center">
            Demo accounts: sarah.johnson@hospital.com (Doctor) or john.smith@email.com (Patient)
          </div> */}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, BookOpen } from 'lucide-react';
import Logo from './Logo';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    const tempInput = document.createElement('input');
    tempInput.type = name === 'email' ? 'email' : 'text';
    tempInput.value = value;
    tempInput.required = true;

    if (name === 'email') {
      tempInput.pattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
    }
    if (name === 'password') {
      tempInput.minLength = 6;
    }

    const isValid = tempInput.checkValidity();
    const errorMessage = tempInput.validationMessage;

    return {
      isValid,
      message: isValid ? '' : errorMessage || `Invalid ${name}`
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const validation = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: validation.message
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    Object.keys(formData).forEach(key => {
      const validation = validateField(key, formData[key]);
      if (!validation.isValid) {
        validationErrors[key] = validation.message;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors(prev => ({
          ...prev,
          submit: result.error || 'Invalid email or password'
        }));
      }
    } catch {
      setErrors(prev => ({
        ...prev,
        submit: 'An unexpected error occurred. Please try again.'
      }));
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-auto">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Header */}
      <div className="relative z-20 flex justify-between items-center p-6">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span className="text-sm">Back to Home</span>
        </Link>
        <Logo />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-16">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                Welcome back
              </h1>
              <p className="text-lg text-gray-400">
                Sign in to continue your learning journey
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 shadow-2xl">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
                    Email address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-12 pr-4 py-4 bg-gray-800/70 border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 text-white placeholder-gray-400 text-lg ${
                        errors.email 
                          ? 'border-red-500 bg-red-950/30 focus:border-red-400' 
                          : 'border-gray-700 focus:border-orange-500 hover:border-gray-600'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-400">{errors.email}</p>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-200">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-12 pr-14 py-4 bg-gray-800/70 border-2 rounded-2xl focus:outline-none focus:ring-0 transition-all duration-300 text-white placeholder-gray-400 text-lg ${
                        errors.password 
                          ? 'border-red-500 bg-red-950/30 focus:border-red-400' 
                          : 'border-gray-700 focus:border-orange-500 hover:border-gray-600'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-400">{errors.password}</p>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="rounded-2xl bg-red-950/50 border border-red-800 p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-400">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || Object.values(errors).some(error => error)}
                  className="w-full flex justify-center items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-xl hover:shadow-orange-500/25 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900 text-gray-400">or</span>
                </div>
              </div>

              {/* Sign up link */}
              <div className="text-center">
                <p className="text-gray-400 text-lg">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-semibold text-orange-500 hover:text-orange-400 transition-colors underline decoration-orange-500/30 hover:decoration-orange-400"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

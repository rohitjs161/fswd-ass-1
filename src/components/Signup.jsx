import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  BookOpen,
  Check,
} from "lucide-react";
import Logo from "./Logo";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Real-time validation using Constraint Validation API
  const validateField = (name, value) => {
    const tempInput = document.createElement("input");
    tempInput.value = value;
    tempInput.required = true;

    let isValid = true;
    let message = "";

    switch (name) {
      case "name":
        tempInput.minLength = 2;
        isValid = tempInput.checkValidity() && value.trim().length >= 2;
        message = isValid ? "" : "Name must be at least 2 characters long";
        break;
      case "email":
        tempInput.type = "email";
        tempInput.pattern = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        isValid = tempInput.checkValidity();
        message = isValid ? "" : "Please enter a valid email address";
        break;
      case "password": {
        tempInput.minLength = 6;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);

        isValid =
          tempInput.checkValidity() &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumbers;
        if (!isValid) {
          if (value.length < 6) {
            message = "Password must be at least 6 characters long";
          } else if (!hasUpperCase) {
            message = "Password must contain at least one uppercase letter";
          } else if (!hasLowerCase) {
            message = "Password must contain at least one lowercase letter";
          } else if (!hasNumbers) {
            message = "Password must contain at least one number";
          }
        }
        break;
      }
      case "confirmPassword":
        isValid = value === formData.password;
        message = isValid ? "" : "Passwords do not match";
        break;
      default:
        break;
    }

    return {
      isValid,
      message,
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const validation = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: validation.message,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
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
      const result = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: result.error,
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        submit: "An unexpected error occurred. Please try again.",
      }));
    }

    setIsSubmitting(false);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = [
    "bg-red-500",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-500",
  ];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="min-h-screen bg-black text-white overflow-auto ">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Header */}
      <div className="relative z-20 flex justify-between items-center p-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span className="text-sm">Back to Home</span>
        </Link>
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
                Join the community
              </h1>
              <p className="text-lg text-gray-400">
                Start your learning journey today
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 shadow-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-white placeholder-gray-500 ${
                        errors.name
                          ? "border-red-500 bg-red-900/20"
                          : "border-gray-700 focus:border-orange-500"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-white placeholder-gray-500 ${
                        errors.email
                          ? "border-red-500 bg-red-900/20"
                          : "border-gray-700 focus:border-orange-500"
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-white placeholder-gray-500 ${
                        errors.password
                          ? "border-red-500 bg-red-900/20"
                          : "border-gray-700 focus:border-orange-500"
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex space-x-1 mb-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded-full ${
                              index < passwordStrength
                                ? strengthColors[passwordStrength - 1]
                                : "bg-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400">
                        Strength:{" "}
                        {strengthLabels[passwordStrength - 1] || "Very Weak"}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-white placeholder-gray-500 ${
                        errors.confirmPassword
                          ? "border-red-500 bg-red-900/20"
                          : "border-gray-700 focus:border-orange-500"
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="rounded-xl bg-red-900/20 border border-red-800 p-4">
                    <p className="text-sm text-red-400">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isSubmitting || Object.values(errors).some((error) => error)
                  }
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-800 disabled:to-orange-900 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-orange-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

               

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900/50 text-gray-500">
                      or
                    </span>
                  </div>
                </div>

                {/* Sign in link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-orange-500 hover:text-orange-400 transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                {/* Back to Home */}
                <div className="text-center pt-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

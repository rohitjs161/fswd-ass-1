import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockCourses';
import { ArrowLeft, Play, Clock, Users, Star, CheckCircle, BookOpen, Award, Video } from 'lucide-react';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, hasPurchasedCourse, purchaseCourse, getCourseProgress } = useAuth();
  const [course, setCourse] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const foundCourse = mockCourses.find(c => c.id === courseId);
    setCourse(foundCourse);
  }, [courseId]);

  const handlePurchase = async () => {
    setPurchasing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      const result = purchaseCourse(courseId);
      if (result.success) {
        navigate(`/course/${courseId}/watch`);
      } else {
        alert(result.error || 'Purchase failed');
      }
      setPurchasing(false);
    }, 1000);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4">Course Not Found</h2>
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const videos = course.media.filter(item => item.type === 'video');
  const totalDuration = videos.reduce((total, video) => total + video.durationSec, 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  const isPurchased = isAuthenticated && hasPurchasedCourse(courseId);
  const progress = isAuthenticated ? getCourseProgress(courseId) : { currentVideo: 0 };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Course Preview */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900/20 pt-24 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Preview */}
              <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm">
                <div className="aspect-video relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/50 flex items-center justify-center hover:bg-orange-500/30 transition-all duration-200 cursor-pointer group">
                      <Play className="w-6 h-6 text-orange-400 ml-1 group-hover:scale-110 transition-transform duration-200" />
                    </div>
                  </div>
                  
                  {/* Course Stats Overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.isFree && (
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded-full shadow-lg">
                        FREE
                      </span>
                    )}
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-gray-300 text-sm rounded-full border border-gray-600/50">
                      {course.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Information */}
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {course.title}
                </h1>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span>By {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-blue-500" />
                    <span>{videos.length} videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>{hours}h {minutes}m total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>4.8 rating</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: <Award className="w-5 h-5" />, text: 'Certificate included', color: 'text-yellow-500' },
                    { icon: <Users className="w-5 h-5" />, text: 'Expert instructor', color: 'text-blue-500' },
                    { icon: <CheckCircle className="w-5 h-5" />, text: 'Lifetime access', color: 'text-green-500' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <span className={feature.color}>{feature.icon}</span>
                      <span className="text-gray-300 text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  Course Content
                </h2>
                <div className="space-y-3">
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg bg-gray-700/30 border border-gray-600/50 hover:border-orange-500/50 hover:bg-gray-700/50 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/50 group-hover:bg-orange-500/30 transition-colors duration-200">
                        <span className="text-orange-400 text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white group-hover:text-orange-400 transition-colors duration-200">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                          {video.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.floor(video.durationSec / 60)}:{(video.durationSec % 60).toString().padStart(2, '0')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            HD Quality
                          </span>
                        </div>
                      </div>
                      {(course.isFree || isPurchased) && (
                        <div className="text-green-400">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm sticky top-6">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {course.isFree ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      <span className="text-orange-400">
                        ₹{course.priceINR.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {!course.isFree && (
                    <p className="text-sm text-gray-400">One-time payment • Lifetime access</p>
                  )}
                </div>

                {/* Action Button */}
                <div className="mb-6">
                  {isAuthenticated ? (
                    (() => {
                      if (course.isFree || isPurchased) {
                        return (
                          <Link
                            to={`/course/${courseId}/watch`}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-center block transition-all duration-200 shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
                          >
                            {progress.currentVideo > 0 ? (
                              <>
                                <Play className="w-5 h-5 inline mr-2" />
                                Continue Learning
                              </>
                            ) : (
                              <>
                                <Play className="w-5 h-5 inline mr-2" />
                                Start Learning
                              </>
                            )}
                          </Link>
                        );
                      } else {
                        return (
                          <button
                            onClick={handlePurchase}
                            disabled={purchasing}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-center transition-all duration-200 shadow-lg hover:shadow-orange-500/30 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                          >
                            {purchasing ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin inline mr-2"></div>
                                Processing...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-5 h-5 inline mr-2" />
                                Buy Now
                              </>
                            )}
                          </button>
                        );
                      }
                    })()
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/signup"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-xl font-semibold text-center block transition-all duration-200 shadow-lg hover:shadow-orange-500/30 transform hover:scale-105"
                      >
                        Sign Up to Start
                      </Link>
                      <Link
                        to="/login"
                        className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white py-3 px-6 rounded-xl font-medium text-center block border border-gray-600/50 hover:border-orange-500/50 transition-all duration-200"
                      >
                        Already have an account? Sign In
                      </Link>
                    </div>
                  )}
                </div>

                {/* Course Details */}
                <div className="space-y-4 border-t border-gray-700/50 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Instructor
                    </span>
                    <span className="font-medium text-white">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </span>
                    <span className="font-medium text-white">{hours}h {minutes}m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Videos
                    </span>
                    <span className="font-medium text-white">{videos.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Category
                    </span>
                    <span className="font-medium text-white">{course.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Level
                    </span>
                    <span className="font-medium text-white">Beginner</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Rating
                    </span>
                    <span className="font-medium text-white">4.8/5</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg">
                  <h4 className="font-semibold text-orange-400 mb-2">What you'll learn:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      Master the fundamentals
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      Build real-world projects
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      Industry best practices
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;

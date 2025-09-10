import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockCourses';
import { Search, Filter, BookOpen, Users, Clock, Star } from 'lucide-react';

const CourseList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user, hasPurchasedCourse, getCourseProgress } = useAuth();

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(mockCourses.map(course => course.category)))];

  // Filter courses
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCourseButtonContent = (course) => {
    if (!user) {
      return {
        text: 'View Details',
        link: `/course/${course.id}`,
        style: 'px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white text-sm rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-orange-500/50'
      };
    }

    const isPurchased = hasPurchasedCourse(course.id);
    const progress = getCourseProgress(course.id);

    if (course.isFree || isPurchased) {
      if (progress.currentVideo > 0) {
        return {
          text: 'Continue',
          link: `/course/${course.id}/watch`,
          style: 'px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/30'
        };
      } else {
        return {
          text: 'Start Learning',
          link: `/course/${course.id}/watch`,
          style: 'px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/30'
        };
      }
    }

    return {
      text: 'View Details',
      link: `/course/${course.id}`,
      style: 'px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white text-sm rounded-xl transition-all duration-200 border border-gray-700/50 hover:border-orange-500/50'
    };
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900/20 pt-24 pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Explore Our <span className="text-orange-500">Courses</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Master new skills with our expertly crafted courses designed for modern learners
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white placeholder-gray-400 transition-all duration-200 backdrop-blur-sm"
                  placeholder="Search courses, instructors..."
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white transition-all duration-200 backdrop-blur-sm min-w-[180px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-500" />
                {filteredCourses.length} Courses
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                50k+ Students
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                4.8 Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-orange-500/50 hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm hover:transform hover:scale-105"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-gray-300 text-xs rounded-full border border-gray-600/50">
                        {course.category}
                      </span>
                    </div>

                    {/* Free Badge */}
                    {course.isFree && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full shadow-lg">
                          FREE
                        </span>
                      </div>
                    )}

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3">
                      <span className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm text-gray-300 text-xs rounded-full">
                        <Clock className="w-3 h-3" />
                        {course.media.filter(m => m.type === 'video').length} videos
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors duration-200">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                    
                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {course.instructor.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">{course.instructor}</span>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <span className={`font-bold text-lg ${course.isFree ? 'text-green-400' : 'text-orange-400'}`}>
                          {course.isFree ? 'FREE' : `₹${course.priceINR.toLocaleString()}`}
                        </span>
                        {!course.isFree && (
                          <div className="text-xs text-gray-500">One-time payment</div>
                        )}
                      </div>
                      
                      {(() => {
                        const buttonInfo = getCourseButtonContent(course);
                        return (
                          <Link
                            to={buttonInfo.link}
                            className={buttonInfo.style}
                          >
                            {buttonInfo.text}
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseList;

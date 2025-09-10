import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockCourses';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target,
  Play,
  TrendingUp,
  BarChart3,
  PlusCircle,
  BookMarked,
  Activity,
  Zap,
  Brain,
  Award,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { user, purchasedCourses, getCourseProgress } = useAuth();

  // Get purchased courses with real progress
  const myPurchasedCourses = mockCourses.filter(course => 
    course.isFree || purchasedCourses.includes(course.id)
  ).map(course => {
    const progress = getCourseProgress(course.id);
    const totalVideos = course.media.filter(m => m.type === 'video').length;
    const completedVideos = progress.currentVideo || 0;
    const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
    
    return {
      ...course,
      progress: progressPercentage,
      currentVideo: completedVideos,
      totalVideos
    };
  });

  // Calculate user stats
  const completedCourses = myPurchasedCourses.filter(course => course.progress === 100);
  const coursesInProgress = myPurchasedCourses.filter(course => course.progress > 0 && course.progress < 100);
  const totalVideosWatched = myPurchasedCourses.reduce((total, course) => total + (course.currentVideo || 0), 0);
  const totalHours = myPurchasedCourses.reduce((total, course) => {
    const videos = course.media.filter(m => m.type === 'video');
    const watchedVideos = videos.slice(0, course.currentVideo || 0);
    return total + watchedVideos.reduce((sum, video) => sum + (video.durationSec / 3600), 0);
  }, 0);

  const userStats = {
    completedCourses: completedCourses.length,
    coursesInProgress: coursesInProgress.length,
    totalHours: Math.round(totalHours * 10) / 10,
    videosWatched: totalVideosWatched,
    currentStreak: 3
  };

  // Mock data for analytics
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, videos: 8 },
    { day: 'Tue', hours: 1.8, videos: 6 },
    { day: 'Wed', hours: 3.2, videos: 12 },
    { day: 'Thu', hours: 0.5, videos: 2 },
    { day: 'Fri', hours: 2.1, videos: 7 },
    { day: 'Sat', hours: 4.2, videos: 15 },
    { day: 'Sun', hours: 1.9, videos: 5 }
  ];

  const categoryData = [
    { name: 'Frontend', value: 35, color: '#3b82f6' },
    { name: 'Backend', value: 25, color: '#f97316' },
    { name: 'Database', value: 20, color: '#10b981' },
    { name: 'DevOps', value: 20, color: '#8b5cf6' }
  ];

  const performanceMetrics = [
    { 
      label: 'Learning Velocity', 
      value: '+23%', 
      trend: 'up', 
      description: 'vs last week',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    { 
      label: 'Quiz Accuracy', 
      value: '87%', 
      trend: 'up', 
      description: '+5% improvement',
      icon: Target,
      color: 'text-blue-400'
    },
    { 
      label: 'Completion Rate', 
      value: '76%', 
      trend: 'down', 
      description: '-2% from last week',
      icon: Trophy,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-10">
      {/* Subtle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple-500/2 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                Learning Analytics
              </h1>
              <p className="text-gray-400">
                Welcome back, <span className="text-orange-400 font-medium">{user?.name}</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gray-900/60 border border-gray-800/50 rounded-xl px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">{userStats.currentStreak} day streak</span>
                  </div>
                  <div className="w-px h-4 bg-gray-700"></div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">Today</span>
                  </div>
                </div>
              </div>
              <Link
                to="/courses"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg hover:shadow-orange-500/25"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>+12%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{userStats.coursesInProgress}</p>
              <p className="text-gray-400 text-sm">Active Courses</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>+{userStats.completedCourses}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{userStats.completedCourses}</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex items-center space-x-1 text-orange-400 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>+23%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{userStats.totalHours}h</p>
              <p className="text-gray-400 text-sm">Learning Time</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-700/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  <span>+{userStats.videosWatched}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{userStats.videosWatched}</p>
              <p className="text-gray-400 text-sm">Videos Watched</p>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weekly Progress Chart */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Weekly Learning Progress</h3>
                  <p className="text-gray-400 text-sm">Hours spent learning this week</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-400">Learning Hours</span>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyProgress}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorHours)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-6">Performance Insights</h3>
              
              <div className="space-y-6">
                {performanceMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  const TrendIcon = metric.trend === 'up' ? ArrowUp : metric.trend === 'down' ? ArrowDown : Minus;
                  const trendColor = metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400';
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${metric.color.replace('text-', 'bg-').replace('400', '500/20')} rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{metric.label}</p>
                          <p className="text-gray-400 text-xs">{metric.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">{metric.value}</span>
                        <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Categories */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-6">Learning Categories</h3>
              
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-gray-300 text-sm">{category.name}</span>
                    </div>
                    <span className="text-white font-medium text-sm">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Courses */}
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Continue Learning</h3>
                <Link to="/courses" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                  View All →
                </Link>
              </div>

              {myPurchasedCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookMarked className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-white mb-2">No courses enrolled</h4>
                  <p className="text-gray-400 text-sm mb-6">Start your learning journey today</p>
                  <Link
                    to="/courses"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-orange-500/25"
                  >
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myPurchasedCourses.slice(0, 4).map((course) => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}/watch`}
                      className="flex items-center space-x-4 p-4 bg-gray-800/30 border border-gray-700/30 rounded-xl hover:bg-gray-800/50 hover:border-gray-600/50 transition-all group"
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate group-hover:text-orange-400 transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-2">{course.instructor}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-orange-400 font-medium min-w-0">{course.progress}%</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions - Floating */}
          <div className="fixed bottom-8 right-8 flex flex-col space-y-3 z-50">
            <Link
              to="/quiz"
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-blue-500/25 flex items-center justify-center transition-all hover:scale-105 group"
              title="Take Quiz"
            >
              <Brain className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Link>
            <Link
              to="/courses"
              className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg hover:shadow-green-500/25 flex items-center justify-center transition-all hover:scale-105 group"
              title="Browse Courses"
            >
              <PlusCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

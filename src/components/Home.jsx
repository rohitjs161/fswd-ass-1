import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './shared/Button';
import { Users, BookOpen, CheckCircle, Clock, BarChart3, Users2 } from 'lucide-react';

// Icon components for features
const BookIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CommunityIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookIcon />,
      title: "Interactive Learning",
      description: "Hands-on projects and real-world applications",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <AnalyticsIcon />,
      title: "Progress Tracking",
      description: "AI-powered analytics and personalized insights",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <CommunityIcon />,
      title: "Expert Community",
      description: "Connect with industry professionals",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Dark Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-orange-900/20 pt-20">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <div className="animate-fade-in">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <Users className="w-4 h-4 text-orange-500" />
              <span className="font-medium">50,000+ learners building careers</span>
            </div>

            {/* Value Proposition */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="text-white relative">
                  Master Skills That
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                </span>
                <br />
                <span className="text-orange-500">Matter Today</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto font-light">
                Transform your career with hands-on learning and expert mentorship
              </p>
            </div>

            {/* Key Benefits - Clean Grouping */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: <BookOpen className="w-4 h-4" />, text: "Interactive Projects" },
                { icon: <BarChart3 className="w-4 h-4" />, text: "Track Progress" },
                { icon: <Users2 className="w-4 h-4" />, text: "Expert Community" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/40 border border-gray-700/50 rounded-full text-sm text-gray-300 hover:border-orange-500/50 hover:bg-gray-800/60 transition-all duration-300"
                >
                  <span className="text-orange-500">{feature.icon}</span>
                  {feature.text}
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="mb-8">
              {isAuthenticated ? (
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full px-6 py-3 font-semibold shadow-xl hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300"
                >
                  Continue Learning
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full px-6 py-3 font-semibold shadow-xl hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300"
                >
                  Start Learning Free
                </Button>
              )}
            </div>

            {/* Trust Indicators - Subtle Bottom */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                <span>1000+ Courses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Remove Scroll Indicator for minimal look */}
      </section>

      {/* Features Section - Dark Theme */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Why Choose <span className="text-orange-500">EduPlatform</span>?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Experience learning designed for today's professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-orange-500/50 hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Theme */}
      <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-orange-900/20 border-t border-gray-800/50">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your <span className="text-orange-500">Learning Journey</span>?
            </h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Join thousands of learners building successful careers
            </p>
          </div>
          
          {!isAuthenticated ? (
            <div className="space-y-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full px-8 py-3 font-semibold shadow-xl hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Start Learning Free
              </Button>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mt-4">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Free to start
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No credit card
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/courses')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-full px-8 py-3 font-semibold shadow-xl hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Continue Your Journey
              </Button>
              <p className="text-sm text-gray-500">
                Welcome back! Ready to continue learning?
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';
import Button from './shared/Button';
import clsx from 'clsx';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/courses', label: 'Courses', icon: <BookIcon /> },
    { path: '/quiz', label: 'Quiz', icon: <QuizIcon /> },
    ...(isAuthenticated ? [{ path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> }] : [])
  ];

  return (
    <>
      <nav className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent backdrop-blur-sm'
      )}>
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="group">
              <Logo size="md" className="transition-transform group-hover:scale-105" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={clsx(
                    'relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    isActivePage(path)
                      ? 'text-orange-400 '
                      : 'text-white hover:text-orange-400 hover:bg-white/10'
                  )}
                >
                  <span className="w-4 h-4 transition-transform group-hover:scale-110">
                    {icon}
                  </span>
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-orange-500/50 transition-all duration-200 group focus-ring"
                aria-label="Toggle theme"
              >
                <div className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-white hover:text-orange-400">
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </div>
              </button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* User Avatar */}
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/10 border border-white/20">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-semibold">
                        {(() => {
                          const displayName = user?.name || user?.email || '';
                          return displayName && typeof displayName === 'string' && displayName.length > 0
                            ? displayName.charAt(0).toUpperCase()
                            : 'U';
                        })()}
                      </span>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-sm font-medium text-white">
                        {(() => {
                          if (user?.name && typeof user.name === 'string' && user.name.trim()) {
                            return user.name;
                          }
                          if (user?.email && typeof user.email === 'string' && user.email.includes('@')) {
                            return user.email.split('@')[0];
                          }
                          return 'User';
                        })()}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleLogout}
                    icon={<LogoutIcon />}
                    className="bg-white/10 hover:bg-white/20 text-white hover:text-orange-400 border-white/20 hover:border-orange-500/50"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/login')}
                    className="text-white hover:text-orange-400 hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/signup')}
                    icon={<ArrowRightIcon />}
                    iconPosition="right"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-orange-500/30"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-orange-500/50 transition-all duration-200 focus-ring"
              >
                <div className="w-5 h-5 text-white hover:text-orange-400">
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </div>
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-orange-500/50 transition-all duration-200 focus-ring"
              >
                <div className="w-6 h-6 text-white hover:text-orange-400">
                  {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={clsx(
          'lg:hidden transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="bg-black/40 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx(
                    'flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                    isActivePage(path)
                      ? 'text-orange-400 bg-orange-500/20 border border-orange-500/30'
                      : 'text-white hover:text-orange-400 hover:bg-white/10'
                  )}
                >
                  <span className="w-5 h-5">{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/20">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold">
                          {(() => {
                            const displayName = user?.name || user?.email || '';
                            return displayName && typeof displayName === 'string' && displayName.length > 0
                              ? displayName.charAt(0).toUpperCase()
                              : 'U';
                          })()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {(() => {
                            if (user?.name && typeof user.name === 'string' && user.name.trim()) {
                              return user.name;
                            }
                            if (user?.email && typeof user.email === 'string' && user.email.includes('@')) {
                              return user.email.split('@')[0];
                            }
                            return 'User';
                          })()}
                        </p>
                        <p className="text-sm text-gray-300">
                          {user?.email && typeof user.email === 'string' ? user.email : ''}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={handleLogout}
                      className="w-full bg-white/10 hover:bg-white/20 text-white hover:text-orange-400 border-white/20 hover:border-orange-500/50"
                      icon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-white hover:text-orange-400 hover:bg-white/10"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        navigate('/signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-orange-500/30"
                      icon={<ArrowRightIcon />}
                      iconPosition="right"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

// Icon Components (ChaiCode Style)
const HomeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BookIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const QuizIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DashboardIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const SunIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const MenuIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LogoutIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default Navigation;

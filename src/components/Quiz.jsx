import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Brain, Clock, Trophy, Target, CheckCircle, XCircle, RotateCcw, Play, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Quiz = () => {
  const { isAuthenticated } = useAuth();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('web-dev');
  const [difficulty, setDifficulty] = useState('medium');

  // Quiz categories related to our courses
  const categories = [
    { id: 'web-dev', name: 'Web Development' },
    { id: 'react', name: 'React & Frontend' },
    { id: 'javascript', name: 'JavaScript Fundamentals' },
    { id: 'css', name: 'CSS & Styling' },
    { id: 'html', name: 'HTML Basics' },
    { id: 'nodejs', name: 'Node.js & Backend' },
    { id: 'database', name: 'Database & SQL' },
    { id: 'git', name: 'Git & Version Control' },
    { id: 'programming', name: 'Programming Concepts' }
  ];

  // Course-specific quiz data
  const getQuizData = () => {
    const quizSets = {
      'web-dev': {
        title: 'Web Development Quiz',
        questions: [
          {
            id: 0,
            question: 'What does HTML stand for?',
            options: ['Hypertext Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hypertext Machine Language'],
            correct: 0,
            difficulty: 'easy',
            category: 'Web Development'
          },
          {
            id: 1,
            question: 'Which HTTP method is used to retrieve data from a server?',
            options: ['POST', 'GET', 'PUT', 'DELETE'],
            correct: 1,
            difficulty: 'easy',
            category: 'Web Development'
          },
          {
            id: 2,
            question: 'What is the purpose of the viewport meta tag?',
            options: ['To set page title', 'To control page scaling on mobile devices', 'To link CSS files', 'To define character encoding'],
            correct: 1,
            difficulty: 'medium',
            category: 'Web Development'
          },
          {
            id: 3,
            question: 'Which status code indicates a successful HTTP request?',
            options: ['404', '500', '200', '301'],
            correct: 2,
            difficulty: 'easy',
            category: 'Web Development'
          },
          {
            id: 4,
            question: 'What is responsive web design?',
            options: ['Fast loading websites', 'Websites that adapt to different screen sizes', 'Websites with animations', 'Websites with good SEO'],
            correct: 1,
            difficulty: 'medium',
            category: 'Web Development'
          }
        ]
      },
      'react': {
        title: 'React & Frontend Quiz',
        questions: [
          {
            id: 0,
            question: 'What is JSX?',
            options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database'],
            correct: 1,
            difficulty: 'easy',
            category: 'React & Frontend'
          },
          {
            id: 1,
            question: 'Which hook is used to manage state in functional components?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            correct: 1,
            difficulty: 'easy',
            category: 'React & Frontend'
          },
          {
            id: 2,
            question: 'What is the Virtual DOM?',
            options: ['A browser API', 'A JavaScript object representing the real DOM', 'A CSS framework', 'A testing library'],
            correct: 1,
            difficulty: 'medium',
            category: 'React & Frontend'
          },
          {
            id: 3,
            question: 'Which method is called after a component is mounted?',
            options: ['componentDidMount', 'componentWillMount', 'componentDidUpdate', 'componentWillUnmount'],
            correct: 0,
            difficulty: 'medium',
            category: 'React & Frontend'
          },
          {
            id: 4,
            question: 'What is the purpose of keys in React lists?',
            options: ['Styling', 'Help React identify which items have changed', 'Performance optimization only', 'Error handling'],
            correct: 1,
            difficulty: 'medium',
            category: 'React & Frontend'
          }
        ]
      },
      'javascript': {
        title: 'JavaScript Fundamentals Quiz',
        questions: [
          {
            id: 0,
            question: 'Which of the following is not a primitive data type in JavaScript?',
            options: ['string', 'number', 'boolean', 'array'],
            correct: 3,
            difficulty: 'easy',
            category: 'JavaScript Fundamentals'
          },
          {
            id: 1,
            question: 'What does "===" operator do?',
            options: ['Assignment', 'Equality with type coercion', 'Strict equality without type coercion', 'Greater than or equal'],
            correct: 2,
            difficulty: 'easy',
            category: 'JavaScript Fundamentals'
          },
          {
            id: 2,
            question: 'What is closure in JavaScript?',
            options: ['A way to close functions', 'Inner function has access to outer function variables', 'A method to end loops', 'A type of error'],
            correct: 1,
            difficulty: 'hard',
            category: 'JavaScript Fundamentals'
          },
          {
            id: 3,
            question: 'Which method adds an element to the end of an array?',
            options: ['push()', 'pop()', 'shift()', 'unshift()'],
            correct: 0,
            difficulty: 'easy',
            category: 'JavaScript Fundamentals'
          },
          {
            id: 4,
            question: 'What is the difference between "let" and "var"?',
            options: ['No difference', 'let is function-scoped, var is block-scoped', 'let is block-scoped, var is function-scoped', 'let is faster than var'],
            correct: 2,
            difficulty: 'medium',
            category: 'JavaScript Fundamentals'
          }
        ]
      },
      'css': {
        title: 'CSS & Styling Quiz',
        questions: [
          {
            id: 0,
            question: 'Which CSS property is used to change the text color?',
            options: ['font-color', 'text-color', 'color', 'foreground-color'],
            correct: 2,
            difficulty: 'easy',
            category: 'CSS & Styling'
          },
          {
            id: 1,
            question: 'What does "display: flex" do?',
            options: ['Makes element flexible in size', 'Creates a flexbox container', 'Adds animation', 'Changes font'],
            correct: 1,
            difficulty: 'medium',
            category: 'CSS & Styling'
          },
          {
            id: 2,
            question: 'Which unit is relative to the viewport height?',
            options: ['px', 'em', 'vh', 'rem'],
            correct: 2,
            difficulty: 'medium',
            category: 'CSS & Styling'
          },
          {
            id: 3,
            question: 'What is the CSS Box Model?',
            options: ['A design pattern', 'Content, padding, border, margin', 'A framework', 'A JavaScript concept'],
            correct: 1,
            difficulty: 'medium',
            category: 'CSS & Styling'
          },
          {
            id: 4,
            question: 'Which pseudo-class selects the first child element?',
            options: [':first', ':first-child', ':first-element', ':child(1)'],
            correct: 1,
            difficulty: 'easy',
            category: 'CSS & Styling'
          }
        ]
      },
      'nodejs': {
        title: 'Node.js & Backend Quiz',
        questions: [
          {
            id: 0,
            question: 'What is Node.js?',
            options: ['A JavaScript framework', 'A JavaScript runtime for server-side', 'A database', 'A CSS preprocessor'],
            correct: 1,
            difficulty: 'easy',
            category: 'Node.js & Backend'
          },
          {
            id: 1,
            question: 'Which module is used to create HTTP servers in Node.js?',
            options: ['fs', 'http', 'path', 'crypto'],
            correct: 1,
            difficulty: 'easy',
            category: 'Node.js & Backend'
          },
          {
            id: 2,
            question: 'What is npm?',
            options: ['Node Package Manager', 'New Programming Method', 'Network Protocol Manager', 'Node Process Manager'],
            correct: 0,
            difficulty: 'easy',
            category: 'Node.js & Backend'
          },
          {
            id: 3,
            question: 'Which method is used to read files asynchronously in Node.js?',
            options: ['fs.readFile()', 'fs.readFileSync()', 'fs.read()', 'fs.open()'],
            correct: 0,
            difficulty: 'medium',
            category: 'Node.js & Backend'
          },
          {
            id: 4,
            question: 'What is Express.js?',
            options: ['A database', 'A web framework for Node.js', 'A testing tool', 'A CSS framework'],
            correct: 1,
            difficulty: 'easy',
            category: 'Node.js & Backend'
          }
        ]
      }
    };

    // Get questions based on selected category and difficulty
    let questions = quizSets[selectedCategory]?.questions || quizSets['web-dev'].questions;
    
    // Filter by difficulty if needed
    if (difficulty !== 'medium') {
      questions = questions.filter(q => q.difficulty === difficulty);
      // If no questions match difficulty, use all questions
      if (questions.length === 0) {
        questions = quizSets[selectedCategory]?.questions || quizSets['web-dev'].questions;
      }
    }

    // Limit to 5 questions for faster quiz
    questions = questions.slice(0, 5);

    return {
      title: quizSets[selectedCategory]?.title || 'Web Development Quiz',
      description: `Test your knowledge with ${questions.length} ${difficulty} questions`,
      questions: questions
    };
  };

  // Fetch quiz from course data
  const fetchQuiz = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const quizData = getQuizData();
      setQuizData(quizData);
    } catch (error) {
      console.error('Error loading quiz:', error);
      // Fallback quiz
      setQuizData({
        title: 'Web Development Quiz',
        description: 'A basic web development quiz',
        questions: [
          {
            id: 0,
            question: 'What does HTML stand for?',
            options: ['Hypertext Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hypertext Machine Language'],
            correct: 0,
            difficulty: 'easy',
            category: 'Web Development'
          }
        ]
      });
    }
    setLoading(false);
  };

  const currentQuestion = quizData?.questions[currentQuestionIndex];
  const totalQuestions = quizData?.questions.length || 0;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = useCallback(() => {
    if (!quizData) return;
    
    const results = quizData.questions.map(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correct;
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correct,
        isCorrect,
        options: question.options
      };
    });

    const correctCount = results.filter(r => r.isCorrect).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    setShowResults({ results, correctCount, percentage });
  }, [quizData, answers, totalQuestions]);

  const startQuiz = async () => {
    await fetchQuiz();
    setQuizStarted(true);
    setTimeRemaining(300); // 5 minutes for shorter quiz
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setTimeRemaining(300);
    setQuizStarted(false);
    setQuizData(null);
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizStarted && timeRemaining > 0 && !showResults && quizData) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeRemaining, showResults, quizData, handleSubmit]);

  // Authentication check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white">
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900/20 pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-lg mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Sign in to take <span className="text-orange-500">quizzes</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Please sign in to access interactive quizzes and track your progress.
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/30"
            >
              Sign In
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    );
  }

  // Quiz setup screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900/20 pt-24 pb-16">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Challenge Your <span className="text-orange-500">Knowledge</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Test yourself with quizzes from various programming topics and courses
              </p>
            </div>

            {/* Quiz Configuration */}
            <div className="max-w-2xl mx-auto bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-6">Quiz Settings</h3>
              
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white transition-all duration-200"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id} className="bg-gray-800">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['easy', 'medium', 'hard'].map(level => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          difficulty === level
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={startQuiz}
                  disabled={loading}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Loading Quiz...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start Quiz
                    </>
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">5 Questions</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">5 Minutes</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Instant Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const { results, correctCount, percentage } = showResults;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-black text-white">
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900/20 pt-24 pb-16">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                passed ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                {passed ? <Trophy className="w-10 h-10 text-white" /> : <XCircle className="w-10 h-10 text-white" />}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {passed ? 'Congratulations!' : 'Good Try!'}
              </h1>
              
              <div className="text-6xl font-bold mb-4">
                <span className={passed ? 'text-green-400' : 'text-red-400'}>{percentage}%</span>
              </div>
              
              <p className="text-lg text-gray-300 mb-8">
                You got {correctCount} out of {totalQuestions} questions correct
              </p>
              
              {/* Score Analysis */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-gray-300">
                {passed ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Excellent work! You passed the quiz.
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 text-orange-500" />
                    Keep practicing! You need 70% to pass.
                  </>
                )}
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">Question Review</h3>
              
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div key={result.questionId} className="border border-gray-700/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        result.isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {result.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-3">
                          Question {index + 1}: {result.question}
                        </h4>
                        
                        <div className="space-y-2">
                          {result.options.map((option, optionIndex) => {
                            const isUserAnswer = result.userAnswer === optionIndex;
                            const isCorrectAnswer = result.correctAnswer === optionIndex;
                            
                            return (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border ${
                                  isCorrectAnswer
                                    ? 'bg-green-500/20 border-green-500/50 text-green-200'
                                    : isUserAnswer && !isCorrectAnswer
                                    ? 'bg-red-500/20 border-red-500/50 text-red-200'
                                    : 'bg-gray-700/30 border-gray-600/50 text-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {isCorrectAnswer && <CheckCircle className="w-4 h-4 text-green-400" />}
                                  {isUserAnswer && !isCorrectAnswer && <XCircle className="w-4 h-4 text-red-400" />}
                                  <span>{option}</span>
                                  {isUserAnswer && (
                                    <span className="text-xs text-gray-400 ml-auto">Your answer</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/30 mr-4"
              >
                <RotateCcw className="w-5 h-5" />
                Take Another Quiz
              </button>
              
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white border border-gray-600/50 hover:border-orange-500/50 rounded-xl font-medium transition-all duration-200"
              >
                <Users className="w-5 h-5" />
                Back to Dashboard
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Quiz interface
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900/20 pt-24 pb-16 min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quiz Header */}
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">
                {quizData?.title}
              </h1>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                timeRemaining <= 60 ? 'bg-red-500/20 border border-red-500/50' : 'bg-orange-500/20 border border-orange-500/50'
              }`}>
                <Clock className={`w-5 h-5 ${timeRemaining <= 60 ? 'text-red-400' : 'text-orange-400'}`} />
                <span className={`font-mono text-lg font-bold ${timeRemaining <= 60 ? 'text-red-400' : 'text-orange-400'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700/50 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete</span>
            </div>
          </div>

          {/* Question Card */}
          {currentQuestion && (
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm mb-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-400 text-sm rounded-full">
                    {currentQuestion.category}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-sm rounded-full">
                    {currentQuestion.difficulty}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-white leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'bg-orange-500/20 border-orange-500/50 text-orange-100'
                          : 'bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/30 hover:border-gray-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-500'
                        }`}>
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white border border-gray-600/50 hover:border-orange-500/50 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {quizData?.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentQuestionIndex
                      ? 'bg-orange-500'
                      : answers[index] !== undefined
                      ? 'bg-green-500'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/30"
              >
                <Trophy className="w-5 h-5" />
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/30"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;

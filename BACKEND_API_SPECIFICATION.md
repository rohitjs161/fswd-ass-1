

# Frontend Mock Data Inventory

# 1. Course Management (`/src/data/mockCourses.js`)

**Current Mock Data:**

```javascript
// 10 Static Courses with:
{
  id: '1',
  title: 'Complete React Developer Course',
  thumbnail: 'https://img.youtube.com/vi/...',
  description: 'Master React from scratch...',
  instructor: 'Sarah Johnson',
  duration: '12 hours 30 minutes',
  media: [
    {
      type: 'video',
      src: 'https://commondatastorage.googleapis.com/...',
      title: 'Introduction to React',
      description: 'Learn what React is...',
      durationSec: 596
    }
  ],
  progress: 65,
  priceINR: 2999,
  isFree: false,
  category: 'Frontend Development'
}
```

**Categories Used:**

- Frontend Development
- Backend Development
- Programming Languages
- Database
- Tools & DevOps

---

### 2. 🧠 Quiz System (`/src/data/mockQuiz.js` + `/src/components/Quiz.jsx`)

**Current Mock Data:**

```javascript
// Multiple Quiz Sets:
const quizSets = {
  'web-dev': { title: 'Web Development Quiz', questions: [...] },
  'react': { title: 'React & Frontend Quiz', questions: [...] },
  'javascript': { title: 'JavaScript Fundamentals Quiz', questions: [...] },
  'css': { title: 'CSS & Styling Quiz', questions: [...] },
  'nodejs': { title: 'Node.js & Backend Quiz', questions: [...] }
}

// Question Structure:
{
  id: 0,
  question: 'What does HTML stand for?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correct: 0,
  difficulty: 'easy',
  category: 'Web Development'
}
```

**Quiz Categories:**

- Web Development (5 questions)
- React & Frontend (5 questions)
- JavaScript Fundamentals (5 questions)
- CSS & Styling (5 questions)
- Node.js & Backend (5 questions)

---

### 3. 👤 Authentication System (`/src/contexts/AuthContext.jsx`)

**Current Mock Data:**

```javascript
// localStorage based authentication
{
  users: [
    {
      id: Date.now(),
      email: 'user@example.com',
      password: 'plaintext', // ⚠️ Not hashed in mock
      name: 'John Doe'
    }
  ],
  authToken: 'mock-token-{userId}',
  userData: { id, email, name }
}

// User-specific data
purchases_{userId}: ['courseId1', 'courseId2'],
progress_{userId}: {
  courseId: {
    currentVideo: 2,
    lastAccessed: '2025-09-10T...'
  }
}
```

---

### 4. 📈 Analytics & Dashboard Data (`/src/components/Dashboard.jsx`)

**Current Mock Data:**

```javascript
// Weekly Progress
weeklyProgress = [
  { day: "Mon", hours: 2.5, videos: 8 },
  { day: "Tue", hours: 1.8, videos: 6 },
  // ... rest of week
];

// Category Distribution
categoryData = [
  { name: "Frontend", value: 35, color: "#3b82f6" },
  { name: "Backend", value: 25, color: "#f97316" },
  { name: "Database", value: 20, color: "#10b981" },
  { name: "DevOps", value: 20, color: "#8b5cf6" },
];

// Performance Metrics
performanceMetrics = [
  { label: "Learning Velocity", value: "+23%", trend: "up" },
  { label: "Quiz Accuracy", value: "87%", trend: "up" },
  { label: "Completion Rate", value: "76%", trend: "down" },
];

// User Statistics (calculated)
userStats = {
  completedCourses: 2,
  coursesInProgress: 3,
  totalHours: 15.7,
  videosWatched: 45,
  currentStreak: 3,
};
```

---

## 🔗 Required Backend APIs

### 🏗️ API Base URL

```
Production: https://api.edustream.com/v1
Development: http://localhost:3001/api/v1
```

---

## 📡 API Endpoints Specification

### 1. 🔐 Authentication APIs

#### **POST /auth/register**

Register a new user

```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-09-10T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### **POST /auth/login**

User login

```json
Request:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### **POST /auth/logout**

User logout (invalidate token)

```json
Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### **GET /auth/profile**

Get user profile (requires auth)

```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "enrolledCourses": 5,
    "completedCourses": 2,
    "joinedAt": "2025-09-10T..."
  }
}
```

---

### 2. 🎓 Course Management APIs

#### **GET /courses**

Get all courses with filtering

```json
Query Parameters:
- category (optional): "Frontend Development"
- search (optional): "React"
- page (optional): 1
- limit (optional): 10
- sortBy (optional): "popular" | "newest" | "price"

Response:
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": 1,
        "title": "Complete React Developer Course",
        "description": "Master React from scratch...",
        "thumbnail": "https://cdn.edustream.com/thumbnails/react-course.jpg",
        "instructor": {
          "id": 1,
          "name": "Sarah Johnson",
          "avatar": "https://cdn.edustream.com/avatars/sarah.jpg"
        },
        "duration": "12:30:00",
        "totalVideos": 45,
        "price": 2999,
        "isFree": false,
        "category": "Frontend Development",
        "level": "Beginner",
        "rating": 4.8,
        "studentsEnrolled": 1250,
        "createdAt": "2025-08-15T...",
        "updatedAt": "2025-09-10T..."
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCourses": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### **GET /courses/:courseId**

Get specific course details

```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete React Developer Course",
    "description": "Master React from scratch...",
    "thumbnail": "https://cdn.edustream.com/thumbnails/react-course.jpg",
    "instructor": {
      "id": 1,
      "name": "Sarah Johnson",
      "bio": "10+ years of React development...",
      "avatar": "https://cdn.edustream.com/avatars/sarah.jpg"
    },
    "curriculum": [
      {
        "id": 1,
        "title": "Introduction to React",
        "description": "Learn what React is...",
        "duration": 596,
        "videoUrl": "https://cdn.edustream.com/videos/react-intro.mp4",
        "order": 1,
        "isFree": true
      }
    ],
    "price": 2999,
    "isFree": false,
    "category": "Frontend Development",
    "level": "Beginner",
    "rating": 4.8,
    "studentsEnrolled": 1250,
    "requirements": ["Basic JavaScript knowledge"],
    "learningOutcomes": ["Build React applications", "Understand JSX"],
    "createdAt": "2025-08-15T..."
  }
}
```

#### **POST /courses/:courseId/enroll**

Enroll in a course (requires auth)

```json
Request:
{
  "paymentMethod": "stripe", // for paid courses
  "paymentToken": "tok_..." // for paid courses
}

Response:
{
  "success": true,
  "data": {
    "enrollment": {
      "id": 1,
      "userId": 1,
      "courseId": 1,
      "enrolledAt": "2025-09-10T...",
      "progress": {
        "currentVideo": 0,
        "completedVideos": 0,
        "progressPercentage": 0
      }
    }
  }
}
```

#### **GET /courses/:courseId/videos/:videoId**

Get video streaming URL (requires enrollment)

```json
Response:
{
  "success": true,
  "data": {
    "videoUrl": "https://cdn.edustream.com/videos/secure-token/video.m3u8",
    "duration": 596,
    "quality": ["720p", "1080p"],
    "subtitles": [
      {
        "language": "en",
        "url": "https://cdn.edustream.com/subtitles/en.vtt"
      }
    ]
  }
}
```

---

### 3. 📊 Progress Tracking APIs

#### **GET /users/courses**

Get user's enrolled courses with progress

```json
Response:
{
  "success": true,
  "data": {
    "enrolledCourses": [
      {
        "courseId": 1,
        "title": "Complete React Developer Course",
        "thumbnail": "https://cdn.edustream.com/thumbnails/react-course.jpg",
        "instructor": "Sarah Johnson",
        "progress": {
          "currentVideo": 5,
          "totalVideos": 45,
          "completedVideos": 4,
          "progressPercentage": 11,
          "lastAccessed": "2025-09-10T...",
          "timeSpent": 7200 // seconds
        },
        "enrolledAt": "2025-09-01T..."
      }
    ]
  }
}
```

#### **PUT /courses/:courseId/progress**

Update course progress (requires auth)

```json
Request:
{
  "videoId": 5,
  "currentTime": 120, // seconds
  "completed": false,
  "watchTime": 300 // seconds watched
}

Response:
{
  "success": true,
  "data": {
    "progress": {
      "currentVideo": 5,
      "progressPercentage": 11,
      "lastAccessed": "2025-09-10T...",
      "totalTimeSpent": 7500
    }
  }
}
```

---

### 4. 🧠 Quiz APIs

#### **GET /quizzes/categories**

Get available quiz categories

```json
Response:
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "web-dev",
        "name": "Web Development",
        "questionCount": 50,
        "difficulty": ["easy", "medium", "hard"]
      },
      {
        "id": "react",
        "name": "React & Frontend",
        "questionCount": 35,
        "difficulty": ["easy", "medium", "hard"]
      }
    ]
  }
}
```

#### **POST /quizzes/generate**

Generate a quiz based on preferences

```json
Request:
{
  "category": "react",
  "difficulty": "medium",
  "questionCount": 5
}

Response:
{
  "success": true,
  "data": {
    "quiz": {
      "id": "quiz_abc123",
      "title": "React & Frontend Quiz",
      "category": "react",
      "difficulty": "medium",
      "timeLimit": 300, // seconds
      "questions": [
        {
          "id": 1,
          "question": "What is JSX?",
          "options": [
            "JavaScript XML - a syntax extension",
            "A new programming language",
            "A database query language",
            "A CSS framework"
          ],
          "difficulty": "easy"
          // Note: correct answer not sent to frontend
        }
      ]
    }
  }
}
```

#### **POST /quizzes/:quizId/submit**

Submit quiz answers

```json
Request:
{
  "answers": {
    "1": 0, // questionId: selectedOptionIndex
    "2": 2,
    "3": 1
  },
  "timeSpent": 245 // seconds
}

Response:
{
  "success": true,
  "data": {
    "results": {
      "score": 80,
      "correctAnswers": 4,
      "totalQuestions": 5,
      "passed": true,
      "timeSpent": 245,
      "questions": [
        {
          "questionId": 1,
          "userAnswer": 0,
          "correctAnswer": 0,
          "isCorrect": true,
          "question": "What is JSX?",
          "options": ["..."]
        }
      ]
    }
  }
}
```

#### **GET /users/quiz-history**

Get user's quiz history

```json
Response:
{
  "success": true,
  "data": {
    "quizHistory": [
      {
        "id": "quiz_abc123",
        "title": "React & Frontend Quiz",
        "category": "react",
        "score": 80,
        "passed": true,
        "takenAt": "2025-09-10T...",
        "timeSpent": 245
      }
    ],
    "stats": {
      "totalQuizzesTaken": 15,
      "averageScore": 75,
      "bestScore": 95,
      "totalTimeSpent": 3600
    }
  }
}
```

---

### 5. 📈 Analytics APIs

#### **GET /users/dashboard**

Get dashboard analytics data

```json
Response:
{
  "success": true,
  "data": {
    "stats": {
      "coursesInProgress": 3,
      "completedCourses": 2,
      "totalHours": 15.7,
      "videosWatched": 45,
      "currentStreak": 3,
      "longestStreak": 7
    },
    "weeklyProgress": [
      {
        "date": "2025-09-04",
        "day": "Mon",
        "hours": 2.5,
        "videos": 8
      }
    ],
    "categoryProgress": [
      {
        "category": "Frontend Development",
        "coursesEnrolled": 2,
        "coursesCompleted": 1,
        "hoursSpent": 12.5,
        "percentage": 35
      }
    ],
    "performanceMetrics": {
      "learningVelocity": {
        "current": 2.3,
        "previous": 1.8,
        "change": "+23%",
        "trend": "up"
      },
      "quizAccuracy": {
        "current": 87,
        "previous": 82,
        "change": "+5%",
        "trend": "up"
      },
      "completionRate": {
        "current": 76,
        "previous": 78,
        "change": "-2%",
        "trend": "down"
      }
    }
  }
}
```

#### **GET /users/analytics/detailed**

Get detailed learning analytics

```json
Query Parameters:
- period: "week" | "month" | "year"
- startDate: "2025-09-01"
- endDate: "2025-09-30"

Response:
{
  "success": true,
  "data": {
    "learningTime": {
      "totalMinutes": 950,
      "averagePerDay": 45,
      "mostActiveDay": "Saturday",
      "timeDistribution": [
        { "hour": 9, "minutes": 120 },
        { "hour": 20, "minutes": 180 }
      ]
    },
    "courseProgress": [
      {
        "courseId": 1,
        "title": "React Course",
        "progressPercentage": 65,
        "timeSpent": 450,
        "lastActivity": "2025-09-10T..."
      }
    ],
    "skillDevelopment": [
      {
        "skill": "React",
        "level": "Intermediate",
        "progress": 75,
        "certificates": 1
      }
    ]
  }
}
```

---

## 🗄️ Database Schema Design

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Courses Table

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id INTEGER REFERENCES users(id),
  price DECIMAL(10,2) DEFAULT 0,
  is_free BOOLEAN DEFAULT TRUE,
  category VARCHAR(100),
  level VARCHAR(50), -- Beginner, Intermediate, Advanced
  duration_seconds INTEGER,
  rating DECIMAL(3,2) DEFAULT 0,
  students_enrolled INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active', -- active, draft, archived
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Course Videos Table

```sql
CREATE TABLE course_videos (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration_seconds INTEGER,
  order_index INTEGER,
  is_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Enrollments Table

```sql
CREATE TABLE user_enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0,
  current_video_id INTEGER REFERENCES course_videos(id),
  last_accessed TIMESTAMP,
  UNIQUE(user_id, course_id)
);
```

### Video Progress Table

```sql
CREATE TABLE video_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  video_id INTEGER REFERENCES course_videos(id),
  course_id INTEGER REFERENCES courses(id),
  watch_time_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_position_seconds INTEGER DEFAULT 0,
  watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, video_id)
);
```

### Quiz Questions Table

```sql
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- ["option1", "option2", "option3", "option4"]
  correct_answer INTEGER NOT NULL, -- index of correct option
  difficulty VARCHAR(50) DEFAULT 'medium', -- easy, medium, hard
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Quiz Attempts Table

```sql
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  category VARCHAR(100),
  questions_data JSONB, -- snapshot of questions asked
  user_answers JSONB, -- user's answers
  score INTEGER,
  total_questions INTEGER,
  time_spent_seconds INTEGER,
  passed BOOLEAN,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Learning Sessions Table

```sql
CREATE TABLE learning_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  video_id INTEGER REFERENCES course_videos(id),
  session_start TIMESTAMP,
  session_end TIMESTAMP,
  watch_time_seconds INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Backend Technology Stack

### Core Framework

- **Node.js + Express.js** or **Python + FastAPI**
- **TypeScript** for type safety
- **PostgreSQL** for main database
- **Redis** for caching and sessions

### Authentication & Security

- **JWT tokens** for authentication
- **bcrypt** for password hashing
- **express-rate-limit** for API rate limiting
- **helmet** for security headers
- **CORS** configuration

### File Storage & CDN

- **AWS S3** for video/image storage
- **CloudFront** for CDN delivery
- **Multer** for file uploads
- **FFmpeg** for video processing

### Payment Processing

- **Stripe API** for payments
- **Webhook handling** for payment events

### Email & Notifications

- **SendGrid** or **AWS SES** for emails
- **Socket.io** for real-time notifications

### Monitoring & Analytics

- **Winston** for logging
- **Prometheus + Grafana** for monitoring
- **Sentry** for error tracking

---

## 🚀 Implementation Priority

### Phase 1: Core APIs

1. ✅ Authentication (register, login, profile)
2. ✅ Course listing and details
3. ✅ Course enrollment
4. ✅ Basic progress tracking

### Phase 2: Enhanced Features

1. ✅ Video streaming with security
2. ✅ Quiz system with dynamic generation
3. ✅ Detailed analytics dashboard
4. ✅ Payment integration

### Phase 3: Advanced Features

1. ✅ Real-time notifications
2. ✅ Advanced analytics
3. ✅ Content management system
4. ✅ Mobile API optimizations

---

## 📝 Notes

- All APIs require proper error handling and validation
- Implement pagination for large data sets
- Use appropriate HTTP status codes
- Include comprehensive API documentation (Swagger/OpenAPI)
- Implement proper logging and monitoring
- Add comprehensive testing (unit, integration, e2e)
- Follow RESTful API design principles
- Implement proper CORS and security measures

---

**Last Updated:** September 10, 2025  
**Version:** 1.0  
**Status:** Ready for Implementation

# 📋 Todo List App

A modern, feature-rich task management application built with React and Vite, designed to help users organize their workflow with collections, priorities, and smart task management.

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure login and registration system with JWT tokens
- **Task Management** - Create, read, update, and delete tasks with ease
- **Smart Collections** - Organize tasks into customizable color-coded collections
- **Priority Levels** - Set task priorities (Low, Medium, High) for better focus
- **Task Completion** - Mark tasks as complete/incomplete with visual feedback
- **Due Date Tracking** - Set and monitor task deadlines with overdue indicators

### 🎨 User Experience
- **Modern UI/UX** - Beautiful, responsive design using Tailwind CSS
- **Real-time Updates** - Instant feedback on all user actions
- **Interactive Modals** - Smooth modal dialogs for adding/editing collections
- **Loading States** - Professional loading indicators for better user experience
- **Toast Notifications** - Non-intrusive success and error messages
- **Confirmation Dialogs** - Safe deletion with confirmation prompts

### 🔧 Technical Features
- **Form Validation** - Robust validation using React Hook Form and Zod schemas
- **Protected Routes** - Authentication-based route protection
- **Context Management** - Efficient state management with React Context API
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Component Architecture** - Modular, reusable React components
- **API Integration** - RESTful API communication with Axios

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Vite 7.3.1** - Fast development server and build tool
- **Tailwind CSS 4.2.0** - Utility-first CSS framework
- **React Router DOM 7.13.0** - Client-side routing
- **React Hook Form 7.71.2** - Form management and validation
- **Zod 4.3.6** - TypeScript-first schema validation
- **Axios 1.13.5** - HTTP client for API requests
- **React Hot Toast 2.6.0** - Beautiful toast notifications
- **SweetAlert2 11.26.20** - Elegant alert dialogs

### Development Tools
- **ESLint 9.39.1** - Code linting and quality assurance
- **Generate React CLI 9.1.0** - Component scaffolding tool
- **Fontsource** - Custom fonts (Inter, Manrope)
- **Font Awesome 7.2.0** - Icon library


## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Layout/         # Main layout components
│   ├── Home/           # Home page with collections
│   ├── AllTasks/       # Task management interface
│   ├── Profile/        # User profile page
│   ├── Login/          # Authentication page
│   ├── Register/       # User registration
│   ├── modals/         # Modal components
│   └── ...             # Other UI components
├── Contexts/           # React Context providers
├── assets/             # Static assets (images, etc.)
├── Template/           # Template components
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Key Pages & Components

### Authentication
- **Login Page** - Secure user authentication with validation
- **Register Page** - New user registration with form validation

### Main Application
- **Home Dashboard** - Overview of task collections with quick actions
- **All Tasks View** - Comprehensive task management with filtering
- **Collection View** - Detailed view of tasks within a specific collection
- **Profile Page** - User profile management and account settings

### Features
- **Task Filtering** - Filter by completion status, priority, and collection
- **Collection Management** - Create, edit, and delete color-coded collections
- **Task Operations** - Complete, incomplete, and delete tasks with confirmation
- **Responsive Navigation** - Mobile-friendly navigation with user context

## 🔐 Authentication & Security

- **JWT Token-based Authentication** - Secure session management
- **Protected Routes** - Route guards for authenticated users only
- **Input Validation** - Client-side validation with Zod schemas
- **Password Requirements** - Strong password policies enforced
- **API Security** - Authorization headers for all API requests

## 🎨 Design System

- **Color Palette** - Consistent color scheme with CSS custom properties
- **Typography** - Modern font stack using Inter and Manrope
- **Spacing** - Consistent spacing system using Tailwind classes
- **Components** - Reusable UI components with consistent styling
- **Responsive Design** - Mobile-first approach with breakpoints

## 📱 Responsive Features

- **Mobile Optimized** - Fully responsive design for all screen sizes
- **Touch-friendly** - Optimized for touch interactions
- **Adaptive Layouts** - Grid and flexbox layouts that adapt to screen size
- **Progressive Enhancement** - Core functionality works on all devices



## 🌐 API Integration

The application integrates with a backend API at:
```
https://todo-app-backend-wine.vercel.app
```

### Key API Endpoints
- `/users/login` - User authentication
- `/users/register` - User registration
- `/users` - Get user profile
- `/tasks` - Task CRUD operations
- `/categories` - Collection management
- `/tasks/complete/:id` - Mark task as complete
- `/tasks/incomplete/:id` - Mark task as incomplete

## 🎯 User Workflow

1. **Sign Up/Login** - Create account or authenticate
2. **Create Collections** - Organize tasks into themed collections
3. **Add Tasks** - Create tasks with priorities and due dates
4. **Manage Tasks** - Complete, edit, or delete tasks as needed
5. **Filter & Sort** - Use filters to focus on specific tasks
6. **Track Progress** - Monitor completion and overdue tasks

## 🚀 Performance Features

- **Fast Refresh** - Instant development feedback with Vite
- **Code Splitting** - Optimized bundle sizes
- **Lazy Loading** - Components loaded on demand
- **Optimized Assets** - Efficient image and asset loading

## 📈 Future Enhancements

- Real-time collaboration features
- Task templates and recurring tasks
- Advanced analytics and reporting
- Offline mode support
- Integration with calendar applications


## 🌐 Live Demo

Check out the live demo: **[Todo List App - Live Demo](https://todo-list-project-nine-xi.vercel.app/)**





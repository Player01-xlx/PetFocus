# Overview

PetFocus is a gamified productivity application that combines virtual pet care with task management and focus sessions. Users adopt and care for virtual pets while completing tasks and using a Pomodoro-style timer to stay productive. The application features multiple pet species with evolution stages, a comprehensive task system with rewards, and data export/import capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a React-based single-page application with the following architectural decisions:

- **React + TypeScript**: Provides type safety and modern component development
- **Wouter**: Lightweight routing solution chosen for simplicity over React Router
- **Zustand**: State management library with localStorage persistence for offline-first experience
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with pre-built components for rapid UI development
- **TanStack Query**: Server state management (prepared for future backend integration)

## Component Structure
The UI follows a modular component architecture:
- **Pages**: Top-level route components (Dashboard, MyPets, Tasks, Support, DataManagement)
- **Components**: Reusable UI components (PetCard, TaskCard, FocusTimer, Navigation)
- **UI Components**: shadcn/ui based design system components
- **Stores**: Zustand stores for state management (petStore, taskStore, timerStore)

## Data Management
Currently implements a client-side data model with localStorage persistence:
- **Pet System**: Species-based pets with stats (happiness, hunger, energy), evolution stages, and experience points
- **Task System**: Priority-based tasks with XP rewards and completion tracking
- **Timer System**: Focus sessions with Pomodoro-style timing and experience rewards
- **Data Portability**: Export/import functionality for user data backup and migration

## State Management Strategy
Uses Zustand with persistence middleware for:
- Offline-first functionality
- Automatic localStorage synchronization
- Simple state updates without boilerplate
- Easy integration with React components

## Styling Architecture
Implements a design system approach:
- **CSS Variables**: Theme-based color system with light/dark mode support
- **Component Variants**: Class variance authority for consistent component styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Custom Properties**: CSS custom properties for dynamic theming

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **TypeScript**: Static typing for development safety
- **Vite**: Build tool for fast development and optimized production builds

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives (via shadcn/ui)
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Component variant management
- **clsx + tailwind-merge**: Conditional CSS class management

## State and Data Management
- **Zustand**: Client-side state management with persistence
- **TanStack React Query**: Server state management (prepared for future API integration)
- **nanoid**: Unique ID generation for entities

## Development and Build Tools
- **ESBuild**: Fast JavaScript bundler for server builds
- **PostCSS + Autoprefixer**: CSS processing pipeline
- **tsx**: TypeScript execution for development server

## Backend Preparation
The application includes backend scaffolding for future server integration:
- **Express.js**: Web framework ready for API development
- **Drizzle ORM**: Database toolkit configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL provider integration
- **Zod**: Schema validation for data consistency

## Utilities and Enhancement
- **date-fns**: Date manipulation and formatting
- **wouter**: Lightweight routing solution
- **cmdk**: Command palette functionality
- **embla-carousel**: Carousel component implementation
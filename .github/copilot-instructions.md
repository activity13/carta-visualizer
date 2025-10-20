# Carta Visualizer - AI Agent Instructions

This document provides essential information for AI agents working with the Carta Visualizer codebase, a Next.js application for restaurant menu management.

## Project Architecture

### Core Components

- `src/app/la-k/components/` - Menu visualization components
  - `Karta.tsx` - Main menu display component with dual-mode view (regular/pizza)
- `src/models/` - MongoDB schemas
- `src/app/api/` - Next.js API routes with MongoDB integration
- `src/components/ui/` - Reusable UI components using shadcn/ui

### Key Data Flows

1. Menu data flows from MongoDB → API routes → Frontend components
2. Authentication handled via NextAuth.js with MongoDB adapter
3. Category/meal management through backoffice routes

## Project Conventions

### Component Patterns

- Client components marked with "use client" directive
- Responsive design uses mobile-first Tailwind classes
- Two-column layout for regular menu, single column for pizza menu

### State Management

- React state for UI controls (e.g., `activeMenu` in `Karta.tsx`)
- MongoDB for persistent data
- Next.js server components for data fetching

### Styling

- Tailwind CSS with custom utilities
- shadcn/ui components with consistent styling
- Custom decorative elements for menu presentation

## Development Workflow

### Setup

```bash
npm install
npm run dev
```

### Key Commands

- Development: `npm run dev --turbopack`
- Production build: `npm run build`
- Linting: `npm run lint`

### Database Integration

- MongoDB connection configured in `src/lib/mongodb.ts`
- Models defined in `src/models/` with Mongoose schemas

## Common Patterns

### Menu Item Structure

```typescript
interface Meal {
  id: string;
  name: string;
  price: number;
  description?: string;
  ingredients?: string[];
}

interface Category {
  id: string;
  name: string;
  meals: Meal[];
  description?: string;
}
```

### Mobile Navigation

- Bottom navigation bar for category quick-access
- Smooth scroll behavior for menu sections
- Responsive grid layouts with Tailwind breakpoints

## Integration Points

- NextAuth.js for authentication
- MongoDB for data persistence
- shadcn/ui for component library
- Tailwind for styling
- TypeScript for type safety

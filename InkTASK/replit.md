# InkTask - Replit Agent Guide

## Overview

InkTask is a minimalist Progressive Web App (PWA) to-do list application with a hand-drawn, doodle-style aesthetic. The app provides a calm, expressive task management experience that can be installed on desktop and mobile home screens. It operates entirely offline using localStorage for data persistence and service workers for caching.

The application allows users to:
- Add, complete, and delete tasks
- Set optional deadlines with visual indicators (due soon, overdue)
- Navigate between dates to view/manage historical and future tasks
- Install as a standalone app on any device

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend-Only Architecture
- **Technology**: Plain HTML, CSS, and Vanilla JavaScript with no frameworks or build tools
- **Rationale**: Keeps the app lightweight, fast-loading, and easy to maintain. No compilation step required.
- **Structure**: Single-page application with all logic in `app.js`, styles in `style.css`, and markup in `index.html`

### Data Persistence
- **Solution**: localStorage with key `inktasks_v2`
- **Data Format**: JSON object keyed by date strings (YYYY-MM-DD format), each containing an array of task objects
- **Rationale**: No backend needed, works offline, data stays on user's device for privacy

### PWA Implementation
- **Service Worker** (`service-worker.js`): Cache-first strategy for offline functionality
- **Manifest** (`manifest.json`): Defines app name, icons, theme colors, and display mode (standalone)
- **Icons**: Custom icons at 192x192, 512x512, and Apple Touch Icon (180x180) for cross-platform installation

### Responsive Design Strategy
- **Approach**: Mobile-first with fluid layouts using CSS `clamp()`, `min()`, and viewport units
- **Breakpoint**: 600px for mobile-specific adjustments
- **Container**: Centered card (max 920px) on desktop, full-bleed on mobile
- **Safe Areas**: Uses `env(safe-area-inset-bottom)` for iPhone notch/home indicator compatibility

### Visual Design System
- **Style**: Hand-drawn/doodle aesthetic using Comic Sans MS and similar playful fonts
- **Color Palette**: Warm paper background (#f6f1e8), ink black (#1a1a1a), accent red (#ff6b6b), warning orange (#ff9f43)
- **Effects**: Subtle rotation, hand-drawn borders, and box shadows for paper-like feel

### Date Navigation System
- **Feature**: Users can navigate to any date (past, present, future) using prev/next buttons or date picker
- **Today Button**: Quick jump back to current date
- **Per-Date Storage**: Tasks are organized by date, allowing historical review

## External Dependencies

### None Required
This application is fully self-contained with no external APIs, databases, or third-party services.

### Browser APIs Used
- **localStorage**: Client-side data persistence
- **Service Worker API**: Offline caching and PWA installation
- **Cache API**: Asset caching for offline use

### Icon Assets Required
The following icon files must exist in the `/icons` directory:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)  
- `apple-touch-icon.png` (180x180 for iOS)
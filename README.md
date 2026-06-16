# MuseBoard

MuseBoard is a modern Pinterest-inspired mood board platform that helps users collect, organize, and curate visual inspiration through customizable boards, images, notes, links, and color palettes.

The application is designed with a clean and responsive user experience, allowing users to transform scattered ideas into structured visual collections for creative projects, design references, personal inspiration, and planning.

## Features

### Board Management

* Create and manage multiple mood boards
* Edit board titles and descriptions
* Organize inspiration by category and theme
* Responsive board dashboard with visual previews

### Image Collections

* Add image-based inspiration cards
* Display images in a masonry-style layout
* Preserve original image aspect ratios
* Visual hover interactions and card management

### Notes and Typography Cards

* Create text-based inspiration cards
* Multiple typography styles
* Customizable background themes
* Suitable for quotes, reminders, and creative notes

### Link Cards

* Save external resources and references
* Link preview support
* Organized browsing of saved content

### Color Palette System

* Board-specific color palettes
* Editable color swatches
* Visual theme organization

### User Experience

* Light and dark mode support
* Responsive design across desktop, tablet, and mobile devices
* Smooth animations and micro-interactions
* Local storage persistence

## Technology Stack

### Frontend

* React
* TypeScript
* Vite

### UI and Styling

* Tailwind CSS
* Radix UI
* Framer Motion
* Lucide Icons

### Routing and State Management

* TanStack Router
* React Query

### Forms and Validation

* React Hook Form
* Zod

## Project Structure

```text
src/
├── components/
│   ├── ui/
│   └── vault/
├── hooks/
├── lib/
├── routes/
├── router.tsx
├── styles.css
└── start.ts
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/<your-username>/museboard.git
```

Navigate to the project directory:

```bash
cd museboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available locally at:

```text
http://localhost:8080
```

## Current Functionality

* Board creation and management
* Image cards
* Note cards
* Link cards
* Color palette customization
* Light and dark themes
* Responsive masonry layouts
* Local storage persistence

## Roadmap

### Authentication

* User accounts
* Login and registration
* Social authentication

### Backend Integration

* Supabase database
* Cloud storage integration
* Secure user data management

### Collaboration

* Shared boards
* Public profiles
* Community discovery features

### Platform Improvements

* Enhanced search and filtering
* Board templates
* Performance optimizations
* SEO improvements

# CarePulse - Patient Management System (Frontend Assessment)

This project is a frontend implementation of a Patient Management System admin dashboard, built as a coding assessment for a Frontend Developer position at EverTry.

The task was to recreate the **Login** and **Dashboard** screens from the provided Figma design using React.js, with the following requirements:
- Simple login form that redirects to the Dashboard on submission.
- Dashboard layout closely matching the Figma design.
- An "Add to schedule" button with a simple todo-style list allowing users to add and remove schedule items.

## Live Demo
https://care-pulse-mu-steel.vercel.app/

## GitHub Repository
https://github.com/mansardauna/care-pulse

## Tech Stack
- **React** with TypeScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - Reusable, accessible UI components built on Radix UI and Tailwind CSS

## Features Implemented
### Login Page
- Clean, responsive login form.
- Basic form validation (client-side).
- On "Login" button click, redirects to the protected Dashboard page.

### Dashboard Page
- Admin sidebar navigation.
- Patient overview cards and statistics.
- Patient appointment table with status badges.
- Patient avatars using initials (first letter of first and last name) with consistent random background colors.
- "Add to schedule" functionality:
  - Input field and button to add new schedule items.
  - List of added items with remove option.
- Responsive layout matching the Figma design as closely as possible.

## Project Structure
```
src/
├── components/     # Reusable UI components (shadcn/ui based)
├── pages/          # Login and Dashboard pages
├── App.tsx         # Main routing and layout
├── main.tsx        # Entry point
├── index.css       # Global styles and Tailwind setup
└── ...
```

## Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mansardauna/care-pulse.git
   cd care-pulse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install  # (bun.lockb file included)
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open http://localhost:5173 (or the provided Vite URL) in your browser.

## Build & Deployment
- Build for production:
  ```bash
  npm run build
  ```
- The project is deployed on Vercel for easy preview.

This project demonstrates clean React component structure, TypeScript usage, Tailwind styling, and attention to UI details from the Figma design.

Thank you for the opportunity!  
ABDULRAHMAN
# Lesson Booking App

A React + Vite application for booking lessons with Tailwind CSS styling.

## Project Structure

```
tweb/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles & Tailwind
├── index.html           # HTML entry point
├── package.json         # Dependencies & scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── .npmrc               # NPM local installation config
└── .gitignore           # Git ignore rules
```

## Quick Start

### Development Server
```bash
npm run dev
```
Opens the app at http://localhost:5173

### Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## Dependencies

- **React** (^18.2.0) - UI library
- **Vite** (^5.0.0) - Build tool (fast dev server & optimized builds)
- **Tailwind CSS** (^3.3.6) - Utility-first CSS framework

All dependencies are installed **locally** only - no global pollution.

## Features

- 📱 Mobile-first responsive design
- 🎨 Dark theme with Tailwind CSS
- 📅 Interactive calendar date picker
- 🔄 Multi-step form wizard (Registration → Booking → Date Selection)
- 🚀 Fast development with Vite HMR (Hot Module Replacement)
- ✨ Smooth fade-in animations

## Configuration Notes

- **Local Installation**: `.npmrc` ensures all packages are installed locally in `node_modules/`
- **Node Modules**: Keep in `.gitignore` - regenerate with `npm install`
- **Package Lock**: `package-lock.json` tracks exact dependency versions

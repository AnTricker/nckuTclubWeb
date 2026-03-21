# Dependencies & Configuration Guide

## 📦 Dependencies Management

### Node.js Packages (NOT Python!)
This is a **Node.js + React + Vite** project, NOT Python.

**Package Management:**
- ✅ `package.json` - Defines all Node.js dependencies
- ✅ `package-lock.json` - Locks dependency versions for consistency
- ❌ `requirement.txt` - Not needed (that's for Python projects)
- ❌ `env.yaml` - Not standard for Node.js (we use `.env` files instead)

### Installing Dependencies
```bash
# Install all dependencies from package.json
npm install

# Add a new package
npm install package-name

# Save as dev dependency
npm install --save-dev package-name
```

## 🔧 Environment Configuration

### Node.js Uses `.env` Files (Not YAML)
- `.env` - Development environment variables
- `.env.production` - Production environment variables  
- `.env.local` - Local overrides (git-ignored)

### Why Not `env.yaml`?
- Vite (our build tool) natively supports `.env` format
- `.env` format is simpler and more widely used in Node.js
- Vite automatically loads `.env*` files based on NODE_ENV

## 📝 Current Project Stack

```
Frontend:
  - React 18.2.0 (UI framework)
  - Vite 5.4.21 (Fast build tool + dev server)
  - Tailwind CSS 3.3.6 (Styling)
  - PostCSS & Autoprefixer (CSS processing)

Runtime:
  - Node.js (JavaScript runtime)
  - npm (Package manager)

Deployment:
  - Zeabur (Hosting platform)
  - Git (Version control)
  - GitHub (Code repository)
```

## 🚀 Key Scripts

In `package.json`:
```json
{
  "scripts": {
    "dev": "vite",                    // Development server
    "build": "vite build",            // Production build
    "preview": "vite preview"         // Preview production build locally
  }
}
```

Run with:
```bash
npm run dev       # Start local dev server with hot reload
npm run build     # Create optimized production bundle
npm run preview   # Test production build locally
```

## ❓ Why This Stack?

- **React** - Component-based UI framework (industry standard)
- **Vite** - Ultra-fast build tool and dev server (instant HMR)
- **Tailwind** - Utility-first CSS (quick styling without custom CSS files)
- **Node.js** - JavaScript runtime for modern web development
- **Zeabur** - Node.js-based hosting with easy GitHub integration

## ⚙️ For Future: If You Need Python

Only if you plan to add a Python backend:
1. Create separate folder: `/backend` or `/api`
2. In that folder, create:
   - `requirements.txt` (Python dependencies)
   - `.env` or `.env.yaml` (Python config)
3. Keep Node.js project as `/frontend` or `/` 

But the current project is **100% JavaScript/Node.js**, so Python files not needed.

---

See `ENV_SETUP.md` for environment variable details.

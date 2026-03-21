# Environment Configuration - Setup Summary

## ✅ What Was Done

### 1. Environment Files Created
- **`.env`** - Development defaults (safe to commit)
  - Contains default values for local development
  - N8N webhook URL set to production endpoint
  - Debug mode enabled

- **`.env.production`** - Production configuration (safe to commit)
  - Same as .env for this project
  - Debug mode disabled

- **`.env.local.example`** - Template for local overrides (git-ignored)
  - For developers to customize their local environment
  - Copy to `.env.local` for personal settings

### 2. Code Updates
- **`src/App.jsx`** - Extracted private info to environment variables
  - N8N webhook URL now read from `import.meta.env.VITE_N8N_WEBHOOK_URL`
  - Debug logging controlled by `VITE_DEBUG` flag
  - Sensitive data (phone number, webhook URL) not logged in production

### 3. Configuration Files Updated
- **`vite.config.js`** - Added environment variable support
- **`.gitignore`** - Updated to exclude `.env.local` and sensitive files
- **`ENV_SETUP.md`** - Created detailed guide (read this!)

## 🚀 Next Steps for You

### For Local Development
```bash
# Option 1: Use defaults (fastest)
npm run dev

# Option 2: Create custom config
cp .env.local.example .env.local
# Edit .env.local with your custom values
npm run dev
```

### For Zeabur Deployment
1. Push code to GitHub (includes `.env` and `.env.production`)
2. In Zeabur Dashboard:
   - Create project from GitHub repo
   - Go to **Environment Variables**
   - Add: `VITE_N8N_WEBHOOK_URL=YOUR_WEBHOOK_URL`
   - Add: `VITE_DEBUG=false`
3. Deploy with `npm run build && npm run preview`

## 📋 Environment Variables Reference

| Variable | Default | Dev | Prod | Notes |
|----------|---------|-----|------|-------|
| `VITE_N8N_WEBHOOK_URL` | Set in `.env` | ✓ | ✓ | Change in Zeabur if needed |
| `VITE_APP_NAME` | 成大Tricking社課報名 | ✓ | ✓ | Optional override |
| `VITE_DEBUG` | true | ✓ | false | Controls console logging |

## 🔐 Security Checklist

✅ N8N webhook URL moved to environment  
✅ Phone numbers NOT logged in production  
✅ `.env.local` added to `.gitignore`  
✅ Debug mode disabled in production  
✅ No hardcoded secrets in source code  

## ⚠️ Important Notes

- **`.env` and `.env.production` are committed** (safe - only defaults)
- **`.env.local` is git-ignored** (create locally for overrides)
- **Zeabur will use Environment Variables dashboard** (override .env files)
- **VITE_ prefix required** for client-side variables in Vite

---

For more details, see `ENV_SETUP.md`

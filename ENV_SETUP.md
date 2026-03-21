# Environment Variables
This project uses environment variables to manage configuration. Follow the guide below to set up for development and production.

## Files Overview

- `.env` - Default environment variables (development defaults, safe to commit)
- `.env.production` - Production environment variables (committed to repo)
- `.env.local` - **Local overrides (git-ignored, never committed)**
- `.env.local.example` - Template for creating `.env.local`

## Setting Up for Development

### Option 1: Use defaults (quickest)
1. Just run `npm run dev` - uses `.env` and `.env.local` if it exists

### Option 2: Create custom local config
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Update `.env.local` with your custom values (optional)
3. Run `npm run dev`

## Environment Variables

### VITE_N8N_WEBHOOK_URL
- **Description**: The n8n webhook endpoint for form submissions
- **Required**: Yes
- **Default**: Set in `.env` and `.env.production`
- **Format**: `https://your-domain.zeabur.app/webhook/YOUR_WEBHOOK_ID`
- **How to find it**:
  1. Log in to n8n
  2. Open your workflow
  3. Copy the webhook URL from the Webhook trigger node

### VITE_APP_NAME
- **Description**: Application title displayed on initial page
- **Required**: No
- **Default**: `成大Tricking社課報名`
- **Format**: Any string

### VITE_DEBUG
- **Description**: Enable debug logging in console
- **Required**: No
- **Default**: `true` (development), `false` (production)
- **Format**: `true` or `false`

## For Zeabur Deployment

1. Push your code to GitHub with `.env` and `.env.production` committed
2. In Zeabur dashboard:
   - Create a new project from your GitHub repo
   - Go to Environment Variables section
   - Add or update:
     ```
     VITE_N8N_WEBHOOK_URL=YOUR_PRODUCTION_WEBHOOK_URL
     VITE_DEBUG=false
     ```
3. Deploy - Zeabur will automatically use `.env.production` + dashboard variables

## Security Notes

✅ **Safe to commit**: `.env`, `.env.production` (non-sensitive defaults)
❌ **Never commit**: `.env.local` (git-ignored for your safety)
🔐 **Production secrets**: Use Zeabur's Environment Variables dashboard instead of hardcoding

## Using Variables in Code

Variables are prefixed with `VITE_` to be accessible in client-side code:

```javascript
// Access in React components
const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
const isDebug = import.meta.env.VITE_DEBUG === 'true';
```

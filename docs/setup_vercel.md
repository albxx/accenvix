# Vercel Deployment Setup Guide

This guide explains how to deploy the Accenvix website to Vercel.

## Prerequisites

- A Vercel account (free at [vercel.com](https://vercel.com))
- This repository connected to GitHub/GitLab/Bitbucket
- Node.js 16+ or Bun installed locally (for local testing)

## Project Configuration

This project is built with:
- **Framework**: Vite + React + TypeScript
- **Build Command**: `vite build`
- **Output Directory**: `dist/`
- **Development Server**: `vite` (port 8080)

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in/create an account
2. Click "New Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Select the repository containing this project

### 2. Configure Project Settings

Vercel should automatically detect the project settings. If manual configuration is needed:

- **Framework Preset**: Vite
- **Build Command**: `npm run build` or `bun run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` or `bun install`
- **Development Command**: `npm run dev` or `bun run dev`

### 3. Environment Variables

If you're using Supabase (this project includes Supabase integration), you'll need to add environment variables:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Add these in the Vercel project settings under "Environment Variables".

### 4. Deploy

1. Click "Deploy" to start the first deployment
2. Vercel will automatically:
   - Install dependencies
   - Run the build command
   - Deploy to a temporary URL for preview
   - Provide deployment logs

### 5. Production Deployment

After successful preview:
1. Vercel will provide a `.vercel.app` URL
2. Add your custom domain in Vercel project settings
3. Configure DNS records as instructed
4. Enable automatic deployments from your main branch

## Build Scripts

Available npm scripts:
```json
{
  "scripts": {
    "dev": "vite",                    // Start development server
    "build": "vite build",            // Build for production
    "build:dev": "vite build --mode development", // Development build
    "preview": "vite preview",        // Preview production build
    "test": "vitest run",            // Run tests
    "test:watch": "vitest"           // Run tests in watch mode
  }
}
```

## Custom Domain Setup

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (usually a few minutes to hours)

## Environment-Specific Configurations

### Development
- Uses port 8080
- Hot module replacement enabled
- Development-specific plugins active

### Production
- Optimized build with minification
- Static assets with hash-based filenames
- Production environment variables

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify environment variables are set

2. **Deployment Errors**
   - Check if the build output directory is correct (`dist/`)
   - Verify the build command runs locally first

3. **Runtime Issues**
   - Check browser console for errors
   - Verify environment variables are correctly set
   - Ensure Supabase configuration is correct

### Local Testing

Before deploying, test the production build locally:

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Or with Bun
bun run build
bun run preview
```

## Advanced Configuration

### Vercel-Specific Configuration

Create a `vercel.json` file in the project root for advanced configuration:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["dist/**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

### Redirects and Rewrites

Add redirects in `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page"
    }
  ]
}
```

## Monitoring and Analytics

Vercel provides built-in:
- Performance monitoring
- Deployment analytics
- Real-time logs
- Error tracking

Enable additional analytics by integrating with services like:
- Vercel Analytics (built-in)
- Google Analytics
- Sentry for error tracking

## Support

For issues with this deployment setup:
1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review deployment logs in the Vercel dashboard
3. Ensure your repository is up to date with the main branch
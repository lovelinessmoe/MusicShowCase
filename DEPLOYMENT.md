# Deployment Guide

This guide covers deploying the Music Showcase Website to various platforms.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [AWS Amplify](#aws-amplify)
- [Static Export](#static-export)
- [Docker](#docker)
- [Pre-Deployment Checklist](#pre-deployment-checklist)

## Vercel (Recommended)

Vercel is the recommended platform as it's built by the creators of Next.js and provides optimal performance.

### Quick Deploy

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configuration**
   - Build Command: `pnpm build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `pnpm install` (auto-detected)
   - Development Command: `pnpm dev`

### Custom Domain

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables

If you add backend features later:
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy for changes to take effect

## Netlify

### Deploy Steps

1. **Install Netlify CLI** (optional)
   ```bash
   npm install -g netlify-cli
   ```

2. **Create netlify.toml**
   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Deploy via Git**
   - Connect your repository on [netlify.com](https://netlify.com)
   - Configure build settings:
     - Build command: `pnpm build`
     - Publish directory: `.next`
   - Deploy

4. **Deploy via CLI**
   ```bash
   netlify deploy --prod
   ```

## AWS Amplify

### Deploy Steps

1. **Push to Git Repository**
   - AWS Amplify supports GitHub, GitLab, and Bitbucket

2. **Create Amplify App**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your repository
   - Configure build settings:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm install -g pnpm
             - pnpm install
         build:
           commands:
             - pnpm build
       artifacts:
         baseDirectory: .next
         files:
           - '**/*'
       cache:
         paths:
           - node_modules/**/*
           - .next/cache/**/*
     ```

3. **Deploy**
   - Click "Save and deploy"
   - Amplify will build and deploy your app

## Static Export

For static hosting (GitHub Pages, S3, etc.):

### Configuration

1. **Update next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true, // Required for static export
     },
   };
   ```

2. **Build**
   ```bash
   pnpm build
   ```

3. **Output**
   - Static files will be in the `out/` directory
   - Upload these files to your static host

### GitHub Pages

1. **Install gh-pages**
   ```bash
   pnpm add -D gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "next build && touch out/.nojekyll && gh-pages -d out -t true"
     }
   }
   ```

3. **Deploy**
   ```bash
   pnpm deploy
   ```

## Docker

### Dockerfile

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t music-showcase .

# Run container
docker run -p 3000:3000 music-showcase
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] **Build succeeds locally**
  ```bash
  pnpm build
  pnpm start
  ```

- [ ] **No console errors**
  - Check browser console
  - Check server logs

- [ ] **Performance optimized**
  - Run Lighthouse audit
  - Check Core Web Vitals
  - Verify image optimization

- [ ] **Responsive design tested**
  - Test on mobile devices
  - Test on tablets
  - Test on desktop

- [ ] **Audio playback works**
  - Test play/pause
  - Test seeking
  - Test volume control
  - Test on different browsers

- [ ] **Error handling works**
  - Test with invalid audio URL
  - Test with invalid image URL
  - Test network errors

- [ ] **SEO optimized**
  - Meta tags present
  - Open Graph tags configured
  - Twitter Card tags configured

- [ ] **Security headers configured**
  - Check vercel.json or platform config
  - Verify CSP headers
  - Verify CORS settings

- [ ] **Analytics setup** (optional)
  - Google Analytics
  - Vercel Analytics
  - Custom analytics

## Post-Deployment

### Monitoring

1. **Performance Monitoring**
   - Use Vercel Analytics
   - Use Google PageSpeed Insights
   - Monitor Core Web Vitals

2. **Error Tracking**
   - Consider Sentry for error tracking
   - Monitor server logs
   - Set up alerts

3. **Uptime Monitoring**
   - Use UptimeRobot or similar
   - Set up status page

### Optimization

1. **CDN Configuration**
   - Ensure assets are cached properly
   - Verify CDN is serving content

2. **Caching Strategy**
   - Review cache headers
   - Optimize cache TTL

3. **Performance Tuning**
   - Monitor bundle size
   - Optimize images further if needed
   - Review and optimize dependencies

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Clear cache: `rm -rf .next node_modules && pnpm install`
- Check for TypeScript errors: `pnpm lint`

### Images Not Loading

- Verify `next.config.js` has correct `remotePatterns`
- Check CORS settings on image host
- Verify image URLs are accessible

### Audio Not Playing

- Check audio URL is accessible
- Verify CORS headers on audio host
- Test in different browsers
- Check browser console for errors

### Performance Issues

- Enable compression in platform settings
- Verify image optimization is working
- Check bundle size: `pnpm build` and review output
- Use Lighthouse to identify bottlenecks

## Support

For deployment issues:
- Check platform documentation
- Review Next.js deployment docs: https://nextjs.org/docs/deployment
- Open an issue on GitHub

---

Last updated: 2025-11-07

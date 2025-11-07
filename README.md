# Music Showcase Website

A beautiful, performant music player built with Next.js 14+ showcasing "Nightcall" by Reverie. This project demonstrates modern web development practices with a focus on performance optimization, responsive design, and extensible architecture.

## ✨ Features

- 🎵 **Modern Music Player Interface** - Clean, intuitive UI with smooth animations
- 🖼️ **Album Cover Display** - Optimized image loading with Next.js Image component
- 🎮 **Full Playback Controls** - Play/pause, seek, volume control, and progress tracking
- 📱 **Responsive Design** - Seamless experience across mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Audio preloading, image optimization, and efficient rendering
- 🎨 **Beautiful Animations** - Smooth transitions and visual feedback
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 🔧 **Extensible Architecture** - Easy to add more tracks and features

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **UI Library:** React 18+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Audio:** HTML5 Audio API
- **Package Manager:** pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- pnpm 8.x or higher (or npm/yarn)

## 🛠️ Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd music-showcase-website
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will auto-reload when you make changes to the code.

### Building for Production

Create an optimized production build:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## 📁 Project Structure

```
music-showcase-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page with MusicPlayer
│   └── globals.css          # Global styles and animations
├── components/              # React components
│   ├── MusicPlayer.tsx      # Main player container
│   ├── AlbumCover.tsx       # Album artwork display
│   ├── TrackInfo.tsx        # Song title and artist
│   ├── ProgressBar.tsx      # Playback progress and seeking
│   ├── AudioControls.tsx    # Play/pause and volume controls
│   └── PerformanceMonitor.tsx # Performance monitoring (dev)
├── lib/                     # Core logic and utilities
│   ├── data/
│   │   └── tracks.ts        # Track data configuration
│   ├── hooks/
│   │   ├── useAudioPlayer.ts    # Audio playback logic
│   │   └── useAudioPreload.ts   # Audio preloading
│   ├── types/
│   │   └── track.ts         # TypeScript interfaces
│   └── utils/
│       └── performance.ts   # Performance utilities
├── public/                  # Static assets
│   └── placeholder-album.svg # Fallback album cover
├── .kiro/specs/            # Project specifications
│   └── music-showcase-website/
│       ├── requirements.md  # Feature requirements
│       ├── design.md        # Technical design
│       └── tasks.md         # Implementation tasks
└── next.config.js          # Next.js configuration
```

## 🎯 Key Components

### MusicPlayer
Main container component that orchestrates all child components and manages audio state.

### useAudioPlayer Hook
Custom React hook that encapsulates all audio playback logic:
- Play/pause control
- Progress tracking
- Volume management
- Error handling
- Loading states

### AlbumCover
Displays album artwork with:
- Next.js Image optimization
- Loading placeholders
- Error fallbacks
- Play state animations

### AudioControls
Provides user controls for:
- Play/pause toggle
- Volume adjustment
- Visual feedback

### ProgressBar
Interactive progress bar with:
- Current time display
- Total duration
- Seek functionality
- Drag and click support

## 🎨 Customization

### Adding New Tracks

Edit `lib/data/tracks.ts` to add more tracks:

```typescript
export const tracks: Track[] = [
  {
    id: 'nightcall-reverie',
    title: 'Nightcall',
    artist: 'Reverie',
    audioUrl: 'https://oss.ashes.vip/Nightcall%20-%20Reverie.mp3',
    coverUrl: 'https://oss.ashes.vip/Nightcall%20-%20Reverie.jpg',
  },
  // Add more tracks here
];
```

### Styling

The project uses Tailwind CSS. Customize the theme in `tailwind.config.ts` or modify component styles directly.

### Performance Tuning

Adjust performance settings in `next.config.js`:
- Image optimization formats
- Cache TTL
- Compression settings
- Package import optimization

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/music-showcase-website)

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify:** Use the Netlify CLI or connect your Git repository
- **AWS Amplify:** Connect your repository and deploy
- **Docker:** Build a Docker image using the included Dockerfile (if added)
- **Static Export:** Uncomment `output: 'export'` in `next.config.js` for static hosting

### Environment Variables

No environment variables are required for the basic setup. If you add backend features, create a `.env.local` file:

```env
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📊 Performance

The application is optimized for performance:

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.5s
- **Cumulative Layout Shift (CLS):** < 0.1

Performance optimizations include:
- Audio metadata preloading
- Next.js Image optimization (AVIF/WebP)
- Resource hints (preload)
- Code splitting and lazy loading
- Efficient re-rendering with React hooks

## 🧪 Testing

The project structure supports testing with popular frameworks:

```bash
# Install testing dependencies (example with Jest)
pnpm add -D jest @testing-library/react @testing-library/jest-dom

# Run tests
pnpm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Music: "Nightcall" by Reverie
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the project specifications in `.kiro/specs/`

---

Made with ❤️ using Next.js

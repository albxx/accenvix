# AccEnvix Solutions Website

Professional training, business consulting, and digital transformation services website built with modern web technologies.

## 🚀 Features

- **Modern Tech Stack**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with ShadCN UI components
- **Routing**: React Router for SPA navigation
- **State Management**: TanStack Query for data fetching
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Fast loading and smooth interactions

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/          # Layout components (Navbar, Footer)
│   ├── ui/             # ShadCN UI components
│   └── NavLink.tsx     # Navigation component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── About.tsx       # About page
│   ├── Services.tsx    # Services page
│   ├── Portfolio.tsx   # Portfolio page
│   ├── Contact.tsx     # Contact page
│   └── NotFound.tsx    # 404 page
├── App.tsx             # Main app component with routing
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ or Bun runtime
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone git@github.com:albxx/accenvix.git
cd accenvix

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun run dev

# Visit http://localhost:8080
```

### Building for Production

```bash
# Create production build
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

## ☁️ Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   # or
   yarn global add vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # For first deployment
   vercel
   
   # For subsequent deployments to production
   vercel --prod
   ```

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click "Deploy"

### Method 3: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to Vercel manually through the dashboard

### Vercel Configuration

The project works with Vercel's default settings:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Install Command**: `npm install`

No additional configuration file is needed for basic deployment.

## 🧪 Testing

```bash
# Run tests
npm run test
# or
bun run test

# Run tests in watch mode
npm run test:watch
# or
bun run test:watch
```

## 📝 Scripts

- `dev` - Start development server
- `build` - Create production build
- `build:dev` - Create development build
- `lint` - Run ESLint
- `preview` - Preview production build
- `test` - Run test suite
- `test:watch` - Run tests in watch mode

## 🎨 Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, ShadCN UI
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **UI Components**: Radix UI primitives
- **Testing**: Vitest, Testing Library
- **Code Quality**: ESLint, Prettier

## 🌐 Pages

- `/` - Home page
- `/about` - About us
- `/services` - Our services
- `/portfolio` - Portfolio showcase
- `/contact` - Contact form
- `/*` - 404 Not Found

## 🔧 Environment Variables

Create a `.env.local` file in the root directory for environment variables:

```bash
# Example environment variables
VITE_API_URL=https://api.example.com
VITE_APP_NAME=AccEnvix Solutions
```

## 📈 Performance

- Code splitting via dynamic imports
- Tree shaking for unused code elimination
- Image optimization strategies
- Bundle size monitoring
- Lazy loading for non-critical resources

## 🔒 Security

- XSS prevention through React's built-in escaping
- Secure dependency management
- Form validation and sanitization
- Content Security Policy compliance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by AccEnvix Solutions.

## 📞 Support

For support, contact the development team or create an issue in the repository.
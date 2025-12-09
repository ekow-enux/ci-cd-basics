# Voice Over Artist Landing Page

A modern, sleek landing page for a professional voice over artist, built with **React**, **Vite**, and **Tailwind CSS**.

## 🎨 Design Features

- **Monochrome Color Scheme**: Sophisticated black and white design
- **Online Images**: Professional images from Unsplash
- **Pure Tailwind CSS**: No custom CSS files, everything styled with Tailwind utilities
- **Responsive Design**: Works perfectly on all screen sizes
- **Modern UI**: Clean typography, geometric elements, and smooth transitions

## 🚀 Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety and better development experience

## 📱 Sections

1. **Hero Section** - Professional introduction with portrait
2. **Services** - Voice over services offered
3. **Portfolio** - Audio samples and work examples
4. **About** - Professional background and experience
5. **Contact** - Contact information and call-to-action

## 🛠️ Development

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🚀 Deployment

This project includes a complete CI/CD pipeline using GitHub Actions that automatically deploys to an EC2 server when code is pushed to the `main` branch.

### GitHub Actions Workflow

The workflow (`.github/workflows/setup-deploy.yml`) provides:

- **Automatic Deployment**: Deploys on push to `main` branch
- **Build Verification**: Ensures the app builds correctly before deployment
- **Server Setup**: Installs Node.js, PM2, Nginx, and SSL certificates
- **PM2 Process Management**: Runs the app with PM2 for reliability
- **Nginx Reverse Proxy**: Serves the app with proper routing
- **SSL Certificate**: Automatically provisions SSL with Let's Encrypt

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

| Secret | Description |
|--------|-------------|
| `EC2_HOST` | Your EC2 server hostname or IP |
| `EC2_USER` | SSH username (usually `ubuntu` or `ec2-user`) |
| `EC2_KEY` | Private SSH key for server access |
| `PM2_NAME` | Name for the PM2 process (e.g., `voiceover-app`) |
| `PM2_PORT` | Port for the app (e.g., `3000`) |
| `DOMAIN` | Your domain name for SSL |
| `EMAIL` | Email for SSL certificate registration |

### Deployment Process

1. **Code Push**: Push changes to `main` branch
2. **GitHub Actions**: Triggers the deployment workflow
3. **Build Check**: Verifies the app builds successfully
4. **Server Setup**: Connects to EC2 and installs dependencies
5. **Deploy**: Builds and serves the app with PM2
6. **Configure**: Sets up Nginx and SSL
7. **Live**: Your site is now live with HTTPS

## 📁 Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── index.css        # Tailwind CSS imports
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── .github/
│   └── workflows/
│       └── setup-deploy.yml  # CI/CD pipeline
├── package.json
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🎯 Features

- **Smooth Scrolling**: Navigation with active section highlighting
- **Interactive Elements**: Hover effects and animations
- **Professional Portfolio**: Audio sample showcase with ratings
- **Contact Integration**: Multiple contact methods
- **SEO Friendly**: Proper semantic HTML structure
- **Performance Optimized**: Vite's fast builds and optimizations

## 📞 Contact

For questions about this project or deployment setup, please reach out through the contact form on the landing page.

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

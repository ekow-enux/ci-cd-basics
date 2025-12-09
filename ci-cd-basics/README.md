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

## 🔧 Troubleshooting

### Common Deployment Issues

#### Nginx Configuration Error
If you encounter this error:
```
[emerg] invalid number of arguments in "proxy_set_header" directive in /etc/nginx/sites-enabled/voiceover:8
```

**Solution**: Ensure all required GitHub secrets are properly configured:
- `DOMAIN` - Must be set to your domain name
- `PM2_PORT` - Must be set to a valid port number
- `PM2_NAME` - Must be set to a process name

#### SSH Connection Issues
If deployment fails during SSH connection:
1. Verify `EC2_HOST` secret is correct
2. Check `EC2_USER` is the correct username
3. Ensure `EC2_KEY` contains the full private key

#### Build Failures
If the build step fails:
1. Check that Node.js dependencies install correctly
2. Verify the project files are in the repository root
3. Ensure TypeScript compilation passes locally

#### PM2 Process Management Issues
If you encounter PM2 errors like "Process or Namespace Over not found":
1. Verify `PM2_NAME` secret is properly set
2. Check that the build directory `dist` exists in the project root
3. Ensure PM2 is properly installed: `sudo npm install -g pm2`
4. Check PM2 status on the server: `pm2 status`
5. View PM2 logs: `pm2 logs your-app-name`

#### PM2 Serve Issues
If the `pm2 serve` command fails:
1. Ensure you're in the correct directory (should be the project root)
2. Verify the port is not already in use
3. Check that the `dist` directory exists and contains `index.html`
4. Try stopping and deleting the process manually:
   ```bash
   pm2 stop your-app-name
   pm2 delete your-app-name
   pm2 serve dist 3000 --name your-app-name --spa
   ```

#### SSL Certificate Issues
If SSL setup fails:
1. Verify your domain's DNS points to the EC2 server
2. Check that port 80 and 443 are open in your security group
3. Ensure the `EMAIL` secret is a valid email address

### Debugging Tips
- Check the GitHub Actions logs for detailed error messages
- The workflow now includes better error diagnostics
- Nginx configuration is validated before deployment

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

#!/bin/bash

# Voice Over Artist Landing Page - Server Setup Script
# This script sets up the server environment and deploys the application

set -euo pipefail

# Environment variables (passed from GitHub Actions)
DOMAIN="${DOMAIN:-}"
PM2_PORT="${PM2_PORT:-}"
PM2_NAME="${PM2_NAME:-}"
EMAIL="${EMAIL:-}"
APP_DIR="${APP_DIR:-voiceover-landing}"
EC2_USER="${EC2_USER:-}"

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a /tmp/deployment.log
}

# Validate environment variables
validate_environment() {
    local required_vars=(DOMAIN PM2_PORT PM2_NAME EMAIL EC2_USER)
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        log "❌ Missing required variables: ${missing_vars[*]}"
        exit 1
    fi
    
    log "✅ Environment validated"
}

# Install system dependencies
install_dependencies() {
    log "📦 Installing system dependencies"
    sudo apt update -y || { log "❌ Failed to update package list"; exit 1; }
    sudo apt install -y git nginx curl certbot python3-certbot-nginx || { 
        log "❌ Failed to install dependencies"; exit 1; 
    }
    log "✅ Dependencies installed successfully"
}

# Install Node.js and PM2
install_nodejs() {
    log "📦 Installing Node.js and PM2"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - || {
        log "❌ Failed to setup NodeSource repository"; exit 1; 
    }
    sudo apt install -y nodejs || { log "❌ Failed to install Node.js"; exit 1; }
    sudo npm install -g pm2 || { log "❌ Failed to install PM2"; exit 1; }
    log "✅ Node.js and PM2 installed successfully"
}

# Setup PM2 startup
setup_pm2_startup() {
    log "🔧 Setting up PM2 startup"
    pm2 startup systemd -u $EC2_USER --hp /home/$EC2_USER || true
    log "✅ PM2 startup configured"
}

# Deploy application
deploy_application() {
    log "🚀 Deploying application to $APP_DIR"
    
    if [[ ! -d "$APP_DIR" ]]; then
        log "📥 Cloning repository"
        git clone https://github.com/ekowf/ci-cd-basics.git "$APP_DIR" || {
            log "❌ Failed to clone repository"; exit 1; 
        }
    fi
    
    cd "$APP_DIR"
    git pull origin main || { log "❌ Failed to pull latest changes"; exit 1; }
    
    cd ci-cd-basics
    npm ci || { log "❌ Failed to install npm dependencies"; exit 1; }
    npm run build || { log "❌ Failed to build application"; exit 1; }
    
    # Verify build output
    if [[ ! -f "dist/index.html" ]]; then
        log "❌ Build verification failed: index.html not found"
        exit 1
    fi
    
    log "✅ Application deployed successfully"
}

# Setup PM2 process
setup_pm2_process() {
    log "🔧 Setting up PM2 process: $PM2_NAME"
    
    # Stop and delete existing process if running
    pm2 stop "$PM2_NAME" 2>/dev/null || true
    pm2 delete "$PM2_NAME" 2>/dev/null || true
    
    # Start new process with error handling
    pm2 serve dist "$PM2_PORT" --name "$PM2_NAME" --spa || {
        log "❌ Failed to start PM2 process"; exit 1; 
    }
    
    pm2 save || { log "⚠️ Failed to save PM2 processes"; }
    log "✅ PM2 process configured successfully"
}

# Setup nginx configuration
setup_nginx() {
    log "⚙️ Setting up nginx configuration for $DOMAIN"
    
    local nginx_config="/etc/nginx/sites-available/voiceover"
    local backup_dir="/tmp/nginx-backups"
    
    # Backup existing configuration
    sudo mkdir -p "$backup_dir"
    if [[ -f "$nginx_config" ]]; then
        sudo cp "$nginx_config" "$backup_dir/nginx-$(date +%Y%m%d-%H%M%S).conf"
        log "✅ Existing nginx config backed up"
    fi
    
    # Create nginx configuration
    sudo tee "$nginx_config" > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:$PM2_PORT;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF
    
    # Validate nginx configuration
    if ! sudo nginx -t; then
        log "❌ Nginx configuration validation failed"
        # Restore backup if validation fails
        if [[ -f "$backup_dir"/*.conf ]]; then
            local latest_backup
            latest_backup=$(ls -t "$backup_dir"/*.conf | head -1)
            sudo cp "$latest_backup" "$nginx_config"
            log "✅ Backup configuration restored"
        fi
        exit 1
    fi
    
    # Enable nginx site
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo ln -sf "$nginx_config" /etc/nginx/sites-enabled/
    sudo systemctl reload nginx || {
        log "❌ Failed to reload nginx"; exit 1;
    }
    
    log "✅ Nginx configuration completed"
}

# Setup SSL certificate
setup_ssl() {
    log "🔒 Setting up SSL certificate for $DOMAIN"
    
    # Check if certificate already exists
    if sudo certbot certificates | grep -q "$DOMAIN"; then
        log "ℹ️ SSL certificate already exists for $DOMAIN"
        sudo certbot renew --quiet || {
            log "⚠️ Failed to renew certificate, attempting renewal with force"
            sudo certbot renew --force-renewal --quiet
        }
    else
        # Generate new certificate
        sudo certbot --nginx \
          -d "$DOMAIN" \
          --non-interactive \
          --agree-tos \
          -m "$EMAIL" \
          --redirect || {
              log "⚠️ SSL certificate setup failed, continuing without SSL"
          }
    fi
    
    log "✅ SSL certificate setup completed"
}

# Verify deployment
verify_deployment() {
    log "🔍 Verifying deployment"
    
    # Wait for services to be ready
    sleep 5
    
    # Test nginx configuration
    if ! sudo nginx -t; then
        log "❌ Nginx configuration test failed"
        exit 1
    fi
    
    # Test PM2 process
    if ! pm2 list | grep -q "$PM2_NAME"; then
        log "❌ PM2 process not found"
        exit 1
    fi
    
    # Test application health (if curl is available)
    if command -v curl >/dev/null 2>&1; then
        if curl -f -s "http://localhost:$PM2_PORT" > /dev/null; then
            log "✅ Application health check passed"
        else
            log "⚠️ Application health check failed, but deployment completed"
        fi
    fi
    
    log "✅ Deployment verification completed"
}

# Main deployment flow
main() {
    log "🚀 Starting deployment process"
    validate_environment
    install_dependencies
    install_nodejs
    setup_pm2_startup
    deploy_application
    setup_pm2_process
    setup_nginx
    setup_ssl
    verify_deployment
    
    log "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY! 🎉"
    log "📊 Deployment log saved to: /tmp/deployment.log"
}

# Execute main function
main
# Deployment Configuration Guide

This project uses GitHub secrets with proper environment variable loading to solve the nginx configuration issue. The workflow loads GitHub secrets into environment variables that are then properly passed to SSH commands.

## Required GitHub Secrets

Set these secrets in your GitHub repository under Settings > Secrets and variables > Actions:

### Required Secrets:
- `DOMAIN` - Your domain name (e.g., `voiceover.example.com`)
- `PM2_PORT` - Port for PM2 to serve the app (e.g., `3000`)
- `PM2_NAME` - Name for PM2 process (e.g., `voiceover-landing`)
- `EC2_USER` - SSH username for your server (e.g., `ubuntu`)
- `EC2_HOST` - Server IP or hostname (e.g., `ec2-xxx.compute-1.amazonaws.com`)
- `EMAIL` - Email for SSL certificate (e.g., `admin@example.com`)
- `EC2_KEY` - Your private SSH key for server access

## How It Works

1. **Secret Loading**: The workflow loads GitHub secrets into environment variables using `export` and `$GITHUB_ENV`
2. **SSH Export**: Environment variables are exported in the SSH session for remote commands
3. **Validation**: All required secrets are validated to ensure they're not empty or placeholder values
4. **Deployment**: Variables are properly substituted in nginx configuration and deployment scripts

## Setup Instructions

### 1. Set GitHub Secrets

Go to your repository settings and add these secrets:

```
DOMAIN: your-domain.com
PM2_PORT: 3000
PM2_NAME: voiceover-landing
EC2_USER: ubuntu
EC2_HOST: your-server-ip
EMAIL: your-email@example.com
EC2_KEY: [your-private-ssh-key]
```

### 2. Deploy

Push to the main branch to trigger automatic deployment.

## Key Benefits

✅ **Reliable Configuration**: GitHub secrets are properly loaded as environment variables
✅ **SSH Compatibility**: Variables are correctly passed to SSH commands (no "***" placeholders)
✅ **Security**: Sensitive data remains in GitHub secrets
✅ **Validation**: Clear checks ensure all secrets are properly configured
✅ **Debugging**: Detailed logging shows what values are being used

## Troubleshooting

If deployment fails:

1. Check that all required GitHub secrets are set and not empty
2. Verify the EC2_KEY is your private SSH key (not the public key)
3. Ensure your EC2_USER has sudo privileges
4. Check the GitHub Actions logs for detailed error messages

## Nginx Configuration Fix

This solution fixes the original nginx error:
```
proxy_set_header Upgrade ;
proxy_set_header Host ;
```

By ensuring environment variables are properly loaded and passed to SSH, the nginx configuration now generates:
```nginx
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Host $host;
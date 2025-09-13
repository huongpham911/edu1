# Deployment Guide for SMA Negeri 1 Ketambe Website

## Quick Deploy with Docker

This repository includes Docker support for easy deployment to any platform that supports containerization.

### Files for Deployment
- `Dockerfile` - Container configuration
- `.dockerignore` - Files to exclude from Docker build
- `docker-compose.yml` - Local development and deployment orchestration

### Environment Variables
The application will use these environment variables:
- `PORT` - Server port (defaults to 3000)
- `NODE_ENV` - Application environment (set to 'production' for deployment)

### Deployment Platforms

#### Dokploy/Docker-based Platforms
1. The platform will automatically detect the Dockerfile
2. Build the container from the repository
3. Run on the specified port (usually 3000)

#### Manual Docker Deployment
```bash
# Build the image
docker build -t sman1ketambe .

# Run the container
docker run -p 3000:3000 -e NODE_ENV=production sman1ketambe
```

#### Docker Compose
```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down
```

### Features Available After Deployment
✅ Complete school website with all pages
✅ Image gallery slideshow on homepage
✅ Contact forms and school information
✅ Responsive design for mobile and desktop
✅ All school images and branding

### Health Check
The application includes a health check that verifies the server is running on the specified port.

### Persistent Storage
For image uploads, the deployment should mount the `/app/img` directory to ensure uploaded images persist between container restarts.

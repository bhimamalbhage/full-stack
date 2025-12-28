# Simple Full-Stack Application

A lightweight, containerized full-stack application optimized for AWS deployment.

## Features

- ✅ Node.js + Express backend
- ✅ Vanilla JavaScript frontend (no build step required)
- ✅ Docker containerized
- ✅ Health check endpoint for AWS
- ✅ Fast build times
- ✅ Production-ready

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run the application
npm start

# Visit http://localhost:3000
```

### Docker Development

```bash
# Build the Docker image
docker build -t simple-fullstack-app .

# Run the container
docker run -p 3000:3000 simple-fullstack-app

# Or use Docker Compose
docker-compose up
```

## API Endpoints

- `GET /health` - Health check endpoint (for AWS load balancers)
- `GET /api/data` - Fetch sample data
- `POST /api/data` - Send data to backend

## AWS Deployment

### Option 1: AWS ECS (Recommended)

1. Push image to ECR:
```bash
aws ecr create-repository --repository-name simple-fullstack-app
docker tag simple-fullstack-app:latest <ecr-url>
docker push <ecr-url>
```

2. Create ECS task definition with:
   - Container port: 3000
   - Health check path: /health

3. Create ECS service with Application Load Balancer

### Option 2: AWS Elastic Beanstalk

1. Create `Dockerrun.aws.json`:
```json
{
  "AWSEBDockerrunVersion": "1",
  "Image": {
    "Name": "simple-fullstack-app",
    "Update": "true"
  },
  "Ports": [
    {
      "ContainerPort": 3000
    }
  ]
}
```

2. Deploy:
```bash
eb init
eb create
eb deploy
```

### Option 3: AWS EC2

```bash
# SSH into EC2 instance
# Install Docker
# Clone repository
# Build and run
docker-compose up -d
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Project Structure

```
simple-fullstack-app/
├── server.js           # Express backend
├── package.json        # Dependencies
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── public/            # Frontend files
    ├── index.html     # Main HTML
    ├── styles.css     # Styles
    └── app.js         # Frontend JavaScript
```

## Performance Optimizations

- Alpine Linux base image (smallest size)
- Production-only npm dependencies
- Efficient layer caching
- Health check built-in
- Static file serving

## License

MIT

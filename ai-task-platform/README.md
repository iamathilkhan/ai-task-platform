# AI Task Processing Platform

## Live Demo
App runs locally via Docker Compose and Kubernetes (Docker Desktop).

## Repos
- App: https://github.com/athilkhan/ai-task-platform
- Infra: https://github.com/athilkhan/ai-task-infra

## Tech Stack
- Frontend: React + nginx
- Backend: Node.js + Express
- Worker: Python
- Database: MongoDB Atlas
- Queue: Upstash Redis
- Container: Docker
- Orchestration: Kubernetes (k3s compatible)
- GitOps: Argo CD

## Local Setup
1. Clone repo
2. Copy .env.example to .env and fill values
3. Run: docker compose up --build
4. Open: http://localhost:3000

## Kubernetes
All manifests in https://github.com/athilkhan/ai-task-infra
Applied via Argo CD with auto-sync enabled.

## GitHub Secrets Required
DOCKER_USERNAME, DOCKER_PASSWORD, INFRA_REPO_TOKEN, API_URL

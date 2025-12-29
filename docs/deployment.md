# Deployment Guide

## Prerequisites
- Docker
- Docker Compose

## Running the Application
1.  **Clone the repository** (if applicable).
2.  **Navigate to the project root**:
    ```bash
    cd hr-helpdesk
    ```
3.  **Start the services**:
    ```bash
    docker-compose up --build
    ```

## Services
- **Frontend**: Accessible at `http://localhost:3000`
- **Backend**: Accessible at `http://localhost:8000` (API docs at `/docs`)

## On-Premise Configuration
- The application is fully containerized and can be deployed to any Docker-compatible environment (AWS ECS, Kubernetes, or a single on-prem server).
- Data is persisted in the `backend/chroma_db` directory (mounted as a volume).
- To change the LLM, modify `backend/rag_service.py` to point to your local LLM endpoint (e.g., Ollama) or set the appropriate API keys.

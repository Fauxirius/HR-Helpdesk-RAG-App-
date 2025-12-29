# Running the HR Helpdesk Application Locally

This guide explains how to run the application without Docker.

## Prerequisites

-   Python 3.11 (Managed via `venv_311` in backend)
-   Node.js & npm (For frontend)

## Steps to Run

### 1. Start the Backend

The backend requires Python 3.11. A virtual environment has been found at `backend/venv_311`.

```powershell
# Open a new terminal
cd backend
.\venv_311\Scripts\python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The server will start at `http://localhost:8000`.

### 2. Start the Frontend

The frontend is a Next.js application.

```powershell
# Open a new terminal
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`.

## Application Demo

Below is a recording of the updated application flow, including Admin Console navigation and detailed policy queries.

1.  Navigation to Admin Console.
2.  Return to Home.
3.  **Query 1**: "Explain the leave policy in detail".
4.  **Query 2**: "How many casual leaves are allowed?".

![Application Demo](file:///C:/Users/DeepakYadav/.gemini/antigravity/brain/d7d0b2bc-4667-4c5c-957a-8701270d18e0/hr_app_demo_extended_1766984286390.webp)

### Final Chat Interaction
![Final Conversation State](file:///C:/Users/DeepakYadav/.gemini/antigravity/brain/d7d0b2bc-4667-4c5c-957a-8701270d18e0/final_chat_state_1766984414670.png)


## Verification Results

- [x] Admin console accessible.
- [x] Back-to-chat navigation working.
- [x] RAG Chat answering policy questions accurately.

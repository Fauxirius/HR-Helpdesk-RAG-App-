from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ingestion import process_pdf
from rag_service import rag_service

app = FastAPI(title="HR Helpdesk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    answer: str

@app.get("/")
def read_root():
    return {"message": "HR Helpdesk API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    return await process_pdf(file)

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = rag_service.query(request.query)
    return {"answer": answer}



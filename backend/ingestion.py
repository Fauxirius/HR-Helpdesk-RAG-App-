import os
from fastapi import UploadFile, File, HTTPException
from pypdf import PdfReader
from io import BytesIO
from rag_service import rag_service

async def process_pdf(file: UploadFile):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        content = await file.read()
        pdf_reader = PdfReader(BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        rag_service.add_document(text, {"source": file.filename})
        return {"filename": file.filename, "status": "processed", "pages": len(pdf_reader.pages)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

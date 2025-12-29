# User Guide

## Admin Console
1.  Navigate to `http://localhost:3000/admin`.
2.  **Upload Policy Documents**:
    - Click on the upload area or drag and drop a PDF file (e.g., "Employee Handbook.pdf").
    - The system will process the PDF, split it into chunks, and index it in the vector database.
3.  **View Stats**:
    - The dashboard shows the total number of indexed documents/chunks.

## Chat Interface
1.  Navigate to `http://localhost:3000`.
2.  **Ask a Question**:
    - Type your query in the input box (e.g., "What is the policy on remote work?").
    - The system will retrieve relevant sections from the uploaded PDFs and generate an answer.

import os
from typing import List, Optional
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self, persist_directory: str = os.environ.get("CHROMA_DB_PATH", "./chroma_db")):
        self.persist_directory = persist_directory
        self.embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vector_store = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embedding_function
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        if not os.getenv("GOOGLE_API_KEY"):
            raise RuntimeError("GOOGLE_API_KEY environment variable not set.")
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

    def add_document(self, text: str, metadata: dict):
        docs = [Document(page_content=text, metadata=metadata)]
        splits = self.text_splitter.split_documents(docs)
        self.vector_store.add_documents(splits)
        self.vector_store.persist()

    def query(self, question: str) -> str:
        try:
            docs = self.vector_store.similarity_search(question, k=3)
            context = "\n\n".join([doc.page_content for doc in docs])
            prompt = f"""You are a helpful HR Assistant. Answer the question based ONLY on the following context.
If the answer is not in the context, say "I cannot find the answer in the provided documents."

Format your response using Markdown:
- Use bullet points for lists.
- Use bold text for key terms.
- Keep the language professional and clear.
- Do not include any internal system artifacts, special characters, or JSON-like formatting unless explicitly part of the answer.

Context:
{context}

Question: {question}"""
            response = self.llm.invoke(prompt)
            return response.content
        except Exception as e:
            return f"Error querying LLM: {str(e)}. Ensure your Gemini API key is valid."

    def get_stats(self):
        return {
            "document_count": self.vector_store._collection.count()
        }

rag_service = RAGService()

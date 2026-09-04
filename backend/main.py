from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai.query_analyzer.analyzer import analyze_query
from ai.jurisdiction_manager.manager import detect_jurisdiction
from ai.ipr_classifier.classifier import classify_ipr


# =========================================
# AYURLEX FastAPI Application
# =========================================

app = FastAPI(
    title="AYURLEX API",
    description="Ayurveda IPR & Regulatory Research API",
    version="1.0.0",
)


# =========================================
# CORS Configuration
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# Root Endpoint
# =========================================

@app.get("/")
def root():
    return {
        "message": "AYURLEX API is running"
    }


# =========================================
# Health Check
# =========================================

@app.get("/health")
def health():
    return {
        "status": "ok"
    }


# =========================================
# Research Query Model
# =========================================

class ResearchQuery(BaseModel):
    question: str
    language: str = "English"
    jurisdiction: str = "India"


# =========================================
# Research Query Endpoint
# =========================================

@app.post("/query")
def research_query(query: ResearchQuery):

    # -------------------------------------
    # 1. Analyze User Query
    # -------------------------------------

    query_analysis = analyze_query(
        query.question
    )

    # -------------------------------------
    # 2. Detect Jurisdiction
    # -------------------------------------

    jurisdiction_result = detect_jurisdiction(
        query.question,
        query.jurisdiction
    )

    # -------------------------------------
    # 3. Classify IPR
    # -------------------------------------

    ipr_result = classify_ipr(
        query.question
    )

    # -------------------------------------
    # 4. Return Research Analysis
    # -------------------------------------

    return {
        "question": query.question,

        "language": query.language,

        "query_analysis": query_analysis,

        "jurisdiction": jurisdiction_result,

        "ipr_classification": ipr_result,
    }
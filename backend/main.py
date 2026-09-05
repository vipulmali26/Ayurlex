from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai.language_detector.detector import detect_language
from ai.query_analyzer.analyzer import analyze_query
from ai.jurisdiction_manager.manager import detect_jurisdiction
from ai.ipr_classifier.classifier import classify_ipr
from ai.orchestrator.agent import build_research_plan
from ai.retriever.retriever import retrieve_research_sources


# ==========================================
# AYURLEX API
# ==========================================

app = FastAPI(
    title="AYURLEX API",
    description="AI-Powered Ayurveda IPR & Regulatory Research API",
    version="0.1.0",
)


# ==========================================
# CORS
# ==========================================

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


# ==========================================
# ROOT
# ==========================================

@app.get("/")
def root():
    return {
        "message": "AYURLEX API is running"
    }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health():
    return {
        "status": "ok"
    }


# ==========================================
# RESEARCH QUERY MODEL
# ==========================================

class ResearchQuery(BaseModel):
    question: str


# ==========================================
# RESEARCH ENDPOINT
# ==========================================

@app.post("/query")
def research_query(query: ResearchQuery):

    # --------------------------------------
    # 1. LANGUAGE DETECTION
    # --------------------------------------

    detected_language = detect_language(
        query.question
    )


    # --------------------------------------
    # 2. QUERY ANALYSIS
    # --------------------------------------

    query_analysis = analyze_query(
        query.question
    )


    # --------------------------------------
    # 3. JURISDICTION DETECTION
    # --------------------------------------

    jurisdiction_result = detect_jurisdiction(
        query.question
    )

    detected_jurisdiction = (
        jurisdiction_result["jurisdiction"]
    )


    # --------------------------------------
    # 4. IPR CLASSIFICATION
    # --------------------------------------

    ipr_result = classify_ipr(
        query.question
    )

    detected_ipr_type = ipr_result["ipr_type"]


    # --------------------------------------
    # 5. AI ORCHESTRATOR
    # --------------------------------------

    research_plan = build_research_plan(
        question=query.question,
        language=detected_language,
        ipr_type=detected_ipr_type,
        jurisdiction=detected_jurisdiction,
    )


    # --------------------------------------
    # 6. RETRIEVER
    # --------------------------------------

    retrieval_result = retrieve_research_sources(
        question=query.question,
        jurisdiction=detected_jurisdiction,
        ipr_type=detected_ipr_type,
    )


    # --------------------------------------
    # 7. FINAL STRUCTURED RESPONSE
    # --------------------------------------

    return {

        "question": query.question,

        "detected_language": detected_language,

        "query_analysis": query_analysis,

        "jurisdiction": jurisdiction_result,

        "ipr_classification": ipr_result,

        "research_plan": research_plan,

        "retrieval": retrieval_result,

    }
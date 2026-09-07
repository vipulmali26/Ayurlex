# AYURLEX: Multilingual RAG-Based IP & Regulatory Assistant for Ayurveda

[![License: Proprietary / Closed Source](https://img.shields.io/badge/License-Proprietary-blue.svg)](#)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB.svg)](https://react.dev/)
[![Compliance](https://img.shields.io/badge/DPDP-Compliant-green.svg)](#)

Ayurlex answers Ayurveda-specific intellectual property (IP) and regulatory questions with source-grounded, jurisdiction-isolated, non-hallucinated citations. The system bridges the divide between AYUSH practitioners, startups, and complex legal frameworks across patents, Geographical Indications (GI), trademarks, Access and Benefit Sharing (ABS) compliance, and drug manufacturing regulations.

---

## Non-Negotiable Design Tenets

* **Deterministic Source Grounding:** Every legal and regulatory claim must be traceable to a specific statute, rule, treaty, or registry record.
* **Strict Jurisdiction Isolation:** Indian and International statutory corpora reside in separate retrieval indices and are never merged in a single response unless a side-by-side comparison is requested.
* **Safe Abstention Over Guessing:** If retrieval confidence falls below established thresholds or citation coverage is incomplete, the system abstains from answering and routes to a human facilitator.
* **No Parametric Memory Legal Claims:** The LLM generation core is constrained strictly to retrieved context chunks and cannot cite ungrounded knowledge.
* **DPDP Compliance by Design:** Complete alignment with the Digital Personal Data Protection (DPDP) Act, ensuring user consent capture, data minimization, strict audit logs, and data residency within India.

---

## System Architecture

The platform is structured into five isolated layers: User Interface, Orchestration, Parallel Reasoning Engines, Version-Tracked Corpus, and Guardrails.

---

## Core Modules & Functional Logic

### 1. Formulation Classification Decision Tree
Before retrieval, all product-related queries pass through a short classification gate ($\le 5$ questions) to determine the regulatory bucket and condition downstream RAG prompts:

| Product Bucket | Diagnostic Signal Questions | IP / ABS Regulatory Implication |
| :--- | :--- | :--- |
| **Classical / Generic Medicine** | Formulation and method described in First-Schedule Ayurveda texts? | Traditional Knowledge (TK); Section 3(p) patent bar; prior-art defense via TKDL. |
| **Patent / Proprietary Medicine** | Modified classical formulation with custom branding? | Trademark focus; limited patent scope depending on novelty thresholds. |
| **New / Non-Classical Drug** | Novel herbal combination with no classical textual precedent?[cite: 1] | Genuine patent potential; requires CDSCO safety and clinical efficacy dossier[cite: 1]. |
| **Phytopharmaceutical** | Standardized extract meeting CDSCO regulatory criteria?[cite: 1] | Patent-eligible process/composition; full regulatory dossier pathway[cite: 1]. |
| **Ayurveda-Aahar / Nutraceutical** | Food positioned with health or nutritional claims?[cite: 1] | FSSAI regime applicable; governed as food/nutraceutical, not drug IP[cite: 1]. |
| **Cosmetic** | Topical application strictly for aesthetic/cosmetic claims?[cite: 1] | Cosmetic Rules compliance; industrial design and trademark focus[cite: 1]. |

### 2. Jurisdiction Isolation & Comparison Engine
* **Single Jurisdiction Mode:** UI toggle locks the session to either India (India Code, IP India, CDSCO, NBA) or International (WIPO, TRIPS, PCT, Madrid, Nagoya Protocol)[cite: 1].
* **Comparison View:** When side-by-side analysis is explicitly requested, retrieval executes across both indices independently and outputs dual-column comparative views[cite: 1].

### 3. ABS Compliance Helper & TKDL Pointer
* **Biological Diversity Act (BDA) Assessment:** Evaluates biological resources and intended commercial applications against the BDA (2023 Amendment) and 2024 Rules to determine National Biodiversity Authority (NBA) or State Biodiversity Board (SBB) approval requirements[cite: 1].
* **TKDL Prior-Art Pointer:** Translates formulation descriptions into relevant Traditional Knowledge Digital Library (TKDL) classification codes and prior-art entry references[cite: 1].

* 

### 4. Knowledge Graph (Phase 2+)
* **Graph Schema:** Neo4j graph modeling entities including classical texts, herbs, raw ingredients, formulations, active compounds, patent applications, GI records, and rejection orders under Section 3(p)[cite: 1].
* **Multi-Hop Queries:** Supports queries such as: *"Identify all GI-tagged formulations utilizing Ingredient X that have prior rejection citations under Section 3(p) of the Patents Act."*[cite: 1]

* ---

## Tech Stack

| Layer | Technologies Selected |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, TanStack Query, Zustand, Tailwind CSS, i18next[cite: 1] |
| **Backend API** | Python 3.11+, FastAPI (Async), Pydantic v2, Celery / Redis Queue[cite: 1] |
| **LLM & Reasoning** | Anthropic Claude API (Claude 3.5 Sonnet) via strict citation system prompts[cite: 1] |
| **Embeddings** | BGE-M3 / Voyage Multilingual Embeddings[cite: 1] |
| **Vector Database** | Qdrant / pgvector[cite: 1] |
| **Sparse Lexical Search** | OpenSearch / Elasticsearch (BM25 keyword engine)[cite: 1] |
| **Knowledge Graph** | Neo4j (Cypher Query Engine)[cite: 1] |
| **Database & Cache** | PostgreSQL (Relational & DPDP Audit Logs), Redis (Session Cache)[cite: 1] |
| **Voice & Localization** | Bhashini ASR/TTS & Translation APIs (Edge Localization)[cite: 1] |

---

## Repository Structure

```text
├── backend/
│   ├── app/
│   │   ├── main.py                        # FastAPI entrypoint and middleware
│   │   ├── api/v1/                        # REST & Streaming Endpoints
│   │   │   ├── chat.py                    # POST /api/v1/chat/query (SSE streaming)
│   │   │   ├── classifier.py              # POST /api/v1/classify/formulation
│   │   │   ├── abs.py                     # POST /api/v1/abs/check & /tkdl/search
│   │   │   ├── jurisdiction.py            # POST /api/v1/jurisdiction/compare
│   │   │   ├── escalation.py              # POST /api/v1/escalate
│   │   │   └── admin.py                   # GET /api/v1/admin/corpus/status
│   │   ├── orchestration/
│   │   │   ├── planner.py                 # Agent task planner & decomposition
│   │   │   └── router.py                  # Intent and jurisdiction routing
│   │   ├── rag/
│   │   │   ├── pipeline.py                # End-to-end RAG workflow execution
│   │   │   ├── chunker.py                 # Statute/Section-aware parser
│   │   │   ├── retriever.py               # Hybrid dense (Qdrant) + sparse (BM25)
│   │   │   ├── reranker.py                # Cross-encoder reranking engine
│   │   │   ├── citation_verifier.py       # Post-generation chunk citation validator
│   │   │   └── confidence_scorer.py       # Spread and coverage confidence scoring
│   │   ├── knowledge_graph/
│   │   │   ├── schema.py                  # Node, label, and edge definitions
│   │   │   └── queries.py                 # Multi-hop Cypher queries
│   │   ├── abs_tkdl/
│   │   │   ├── abs_rules_engine.py        # BDA 2023 & 2024 Rules decision logic
│   │   │   └── tkdl_client.py             # TKDL classification lookup wrapper
│   │   ├── llm/
│   │   │   ├── claude_client.py           # Anthropic Claude API client
│   │   │   └── prompts/                   # Versioned prompt templates
│   │   ├── ingestion/
│   │   │   ├── sources/                   # Scrapers: IndiaCode, IPIndia, NBA, CDSCO
│   │   │   ├── normalizer.py              # OCR, structural parsing, metadata tagging
│   │   │   ├── versioning.py              # Checksum tracking and supersession logic
│   │   │   └── jobs.py                    # Celery scheduled ingestion tasks
│   │   ├── data/
│   │   │   ├── models/                    # SQLAlchemy schemas (User, Audit, Consent)
│   │   │   ├── repositories/              # Database access layer
│   │   │   └── migrations/                # Alembic migration environment
│   │   ├── security/
│   │   │   ├── auth.py                    # OAuth2 / JWT authentication
│   │   │   ├── consent.py                 # DPDP consent logging & verification
│   │   │   └── audit_logger.py            # Immutable write-behind audit logger
│   │   ├── config.py                      # Global configuration & environment settings
│   │   └── deps.py                        # Dependency injection registry
│   ├── tests/
│   │   ├── unit/                          # Chunker, verifier, and router unit tests
│   │   ├── integration/                   # Pipeline and database integration tests
│   │   └── eval/                          # Accuracy, citation, and abstention harness
│   ├── alembic.ini
│   ├── pyproject.toml
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/                           # App shell, routing, and provider bindings
│   │   │   ├── App.tsx
│   │   │   ├── router.tsx
│   │   │   └── providers/                 # QueryClient, Theme, Auth, i18n
│   │   ├── features/                      # Domain feature modules
│   │   │   ├── chat/                      # MessageBubble, CitationChip, useChatStream
│   │   │   ├── jurisdiction-toggle/       # India/International switch component
│   │   │   ├── formulation-classifier/    # Interactive decision tree stepper
│   │   │   ├── abs-tkdl/                  # ABS assessment wizard and TKDL cards
│   │   │   ├── escalation/                # Human IP facilitator handoff modal
│   │   │   └── voice-multilingual/        # Bhashini ASR/TTS controls (Phase 4)
│   │   └── shared/
│   │       ├── ui/                        # Buttons, modals, persistent disclaimer banner
│   │       ├── api-client/                # Axios instance with auth/DPDP interceptors
│   │       ├── i18n/                      # Localization translation bundles
│   │       └── types/                     # Shared TypeScript interfaces
│   ├── vite.config.ts
│   └── package.json
└── docker-compose.yml
```[cite: 1]

---

## API Specifications

### `POST /api/v1/chat/query`
Main retrieval and streaming inference endpoint[cite: 1].

* **Request Body:**
```json
{
  "query": "Can a classical formulation from the First Schedule be patented if extracted with a novel solvent?",
  "jurisdiction": "INDIA",
  "language": "en",
  "session_id": "8f3b2d1c-4e5a-4e2a-bb33-0d5f8a6b1234",
  "classification_bucket": "CLASSICAL_MEDICINE"
}
```[cite: 1]

* **Streaming Server-Sent Events (SSE) Output:**
```json
data: {"type": "chunk", "text": "Under Section 3(p) of the Patents Act, 1970..."}
data: {"type": "citation", "citation_id": "IND-PAT-SEC3P", "source": "The Patents Act, 1970, s. 3(p)", "url": "[https://ipindia.gov.in/](https://ipindia.gov.in/)..."}
data: {"type": "confidence", "score": 0.94, "status": "GROUNDED"}
data: {"type": "disclaimer", "text": "Information provided is for research and educational purposes only and does not constitute formal legal advice."}
```[cite: 1]

### `POST /api/v1/classify/formulation`
Initiates or advances the formulation classification decision tree[cite: 1].

* **Request Body:**
```json
{
  "step": 1,
  "answers": {
    "is_in_first_schedule": true,
    "has_modified_excipients": false
  }
}
```[cite: 1]

* **Response Body:**
```json
{
  "completed": true,
  "bucket": "CLASSICAL_GENERIC",
  "ip_posture": "Traditional Knowledge; Section 3(p) patent bar; defense via TKDL",
  "recommended_route": "TRADEMARK_ONLY"
}
```[cite: 1]

### `POST /api/v1/abs/check`
Evaluates Access and Benefit Sharing obligations under Indian biodiversity law[cite: 1].

* **Request Body:**
```json
{
  "resource_name": "Withania somnifera",
  "source_state": "Madhya Pradesh",
  "applicant_type": "INDIAN_ENTITY_WITH_FOREIGN_INVESTMENT",
  "intended_use": "COMMERCIAL_UTILIZATION"
}
```[cite: 1]

* **Response Body:**
```json
{
  "nba_approval_required": true,
  "sbb_intimation_required": true,
  "statutory_basis": "Biological Diversity Act (2023 Amendment), Section 3(2)",
  "form_required": "Form I (NBA Approval)"
}
```[cite: 1]

---

## Data Pipeline & Ingestion

---

## Evaluation Framework & Benchmarking

The system is continuously benchmarked against an expert-curated gold standard evaluation suite[cite: 1]:

* **Answer Accuracy:** Expert-reviewed against gold standard Q&A sets across classical texts, new drugs, and GI filings[cite: 1].
* **Citation Precision & Recall:** Precision and recall scoring of cited statutory sections against ground-truth legal provisions[cite: 1].
* **Safe Abstention Rate:** Automated validation measuring the frequency of correct "insufficient information" responses when subjected to out-of-scope or adversarial inputs[cite: 1].
* **Jurisdiction Isolation Integrity:** Automated validation ensuring zero cross-contamination between Indian and International statutory citations in single-jurisdiction queries[cite: 1].
* **Multilingual Translation Fidelity:** Back-translation BLEU/COMET scoring combined with native-speaker legal review to prevent statutory drift[cite: 1].

---

## Risk Mitigation Matrix

| Risk | Architecture Mitigation Strategy |
| :--- | :--- |
| **Hallucinated Statutory Citations** | Strict citation constraint: Generation is restricted solely to retrieved chunk IDs. A post-generation verification step strips any ungrounded text[cite: 1]. |
| **Jurisdiction Bleed** | Physical isolation of retrieval indices between Indian and International law (not relying on LLM prompting alone)[cite: 1]. |
| **Stale Statutory Information** | Version-tracked corpus architecture, checksum-based change detection, scheduled Celery recrawls, and mandatory "As-of" timestamps on all outputs[cite: 1]. |
| **Misinterpretation as Legal Advice** | Prominent system-level disclaimers on every interaction, combined with a one-click escalation bridge to qualified IP facilitators[cite: 1]. |

---

## Development & Installation Guide

### Prerequisites
* Python 3.11+
* Node.js 18+ and npm
* Docker Engine 24+ and Docker Compose
* PostgreSQL 15+ (with `pgvector` extension)
* OpenSearch 2.11+
* Neo4j 5+ (for Phase 2 graph features)

### 1. Repository Setup
```bash
git clone [https://github.com/your-organization/ayurlex.git](https://github.com/your-organization/ayurlex.git)
cd ayurlex
# Backend configuration
cp backend/.env.example backend/.env

# Frontend configuration
cp frontend/.env.example frontend/.env

PROJECT_NAME=Ayurlex
ENVIRONMENT=development
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/ayurlex_db
OPENSEARCH_URL=http://localhost:9200
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
ANTHROPIC_API_KEY=your-anthropic-claude-key
BHASHINI_API_KEY=your-bhashini-key
BHASHINI_USER_ID=your-bhashini-user-id
DATA_RESIDENCY_REGION=IN

docker-compose up -d --build

cd backend

# Initialize virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Run initial statutory corpus ingestion (India Code + IP India)
python scripts/bootstrap_corpus.py --source initial_statutes


# Launch FastAPI development server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

cd frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev

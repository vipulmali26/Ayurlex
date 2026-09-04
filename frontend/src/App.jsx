import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResearch = async () => {
    if (!question.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "AYURLEX backend शी connection होत नाही. FastAPI server चालू आहे का ते check करा."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleResearch();
    }
  };

  const handleNewResearch = () => {
    setQuestion("");
    setResult(null);
    setError("");
  };

  const useSuggestion = (text) => {
    setQuestion(text);
  };

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-text">
            AYURLEX
          </div>

          <div className="brand-subtitle">
            Ayurveda IPR Research
          </div>
        </div>


        <button
          className="new-research"
          onClick={handleNewResearch}
        >
          <span className="plus">+</span>
          New Research
        </button>


        <div className="nav-section">

          <div className="nav-title">
            RESEARCH
          </div>

          <button className="nav-item active">
            <span>Research</span>
          </button>

          <button className="nav-item">
            <span>Knowledge Base</span>
          </button>

          <button className="nav-item">
            <span>Legal Sources</span>
          </button>

          <button className="nav-item">
            <span>Saved Research</span>
          </button>

        </div>


        <div className="recent-section">

          <div className="nav-title">
            RECENT RESEARCH
          </div>

          <button className="recent-item">
            <span>
              Ayurvedic patent research
            </span>
          </button>

          <button className="recent-item">
            <span>
              Ayurvedic trademark
            </span>
          </button>

          <button className="recent-item">
            <span>
              Biodiversity requirements
            </span>
          </button>

          <button className="recent-item">
            <span>
              Traditional knowledge
            </span>
          </button>

        </div>


        <div className="sidebar-footer">

          <div className="sidebar-line">
            Research. Protect. Preserve.
          </div>

          <div className="sidebar-muted">
            AI for Ayurveda. Law for Tomorrow.
          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="main-content">

        {/* Top Bar */}

        <header className="topbar">

          <div className="topbar-title">
            AYURLEX Research
          </div>

          <div className="profile">
            <div className="profile-avatar">
              V
            </div>

            <span>
              User
            </span>

            <span className="profile-arrow">
              ▾
            </span>
          </div>

        </header>


        {/* ================= CHAT AREA ================= */}

        <div className="chat-area">

          {/* EMPTY STATE */}

          {!result && !loading && (

            <section className="welcome">

              <div className="welcome-line"></div>

              <h1>
                What would you like to research?
              </h1>

              <p>
                Ask AYURLEX about Ayurveda IPR, patents,
                trademarks, traditional knowledge,
                biodiversity, or regulatory requirements.
              </p>


              <div className="suggestions">

                <button
                  onClick={() =>
                    useSuggestion(
                      "Can I patent my new Ayurvedic herbal formulation in India?"
                    )
                  }
                >
                  <span className="suggestion-title">
                    Patentability
                  </span>

                  <span className="suggestion-text">
                    Can I patent my new Ayurvedic formulation?
                  </span>
                </button>


                <button
                  onClick={() =>
                    useSuggestion(
                      "माझ्या आयुर्वेदिक formulation ला भारतात patent मिळू शकतो का?"
                    )
                  }
                >
                  <span className="suggestion-title">
                    Marathi Research
                  </span>

                  <span className="suggestion-text">
                    आयुर्वेदिक formulation साठी patent
                    requirements काय आहेत?
                  </span>
                </button>


                <button
                  onClick={() =>
                    useSuggestion(
                      "What are the biodiversity requirements for using medicinal plants in India?"
                    )
                  }
                >
                  <span className="suggestion-title">
                    Biodiversity
                  </span>

                  <span className="suggestion-text">
                    Requirements for medicinal plant use.
                  </span>
                </button>

              </div>

            </section>

          )}


          {/* USER QUESTION */}

          {result && (

            <section className="conversation">

              <div className="user-message">

                <div className="message-label">
                  YOU
                </div>

                <div className="user-question">
                  {result.question}
                </div>

              </div>


              {/* AI RESPONSE */}

              <div className="ai-response">

                <div className="ai-header">

                  <div className="ai-name">
                    AYURLEX
                  </div>

                  <div className="ai-label">
                    Research Assistant
                  </div>

                </div>


                <div className="answer">

                  <p>
                    Your question has been analysed based on
                    the available research classification.
                  </p>

                  <p>
                    AYURLEX identified the relevant domain,
                    IPR category, research intent and
                    jurisdiction for further evidence-based
                    research.
                  </p>

                </div>


                {/* KEY ANALYSIS */}

                <section className="analysis">

                  <div className="section-label">
                    KEY ANALYSIS
                  </div>


                  <div className="analysis-grid">

                    <div className="analysis-card">

                      <span>
                        DOMAIN
                      </span>

                      <strong>
                        {result.query_analysis?.domain ||
                          "Not detected"}
                      </strong>

                    </div>


                    <div className="analysis-card">

                      <span>
                        IPR TYPE
                      </span>

                      <strong>
                        {result.ipr_classification?.ipr_type ||
                          result.query_analysis?.ipr_type ||
                          "Not detected"}
                      </strong>

                    </div>


                    <div className="analysis-card">

                      <span>
                        INTENT
                      </span>

                      <strong>
                        {result.query_analysis?.intent ||
                          "Not detected"}
                      </strong>

                    </div>


                    <div className="analysis-card">

                      <span>
                        JURISDICTION
                      </span>

                      <strong>
                        {result.jurisdiction?.jurisdiction ||
                          "Not detected"}
                      </strong>

                    </div>

                  </div>

                </section>


                {/* KEY EVIDENCE */}

                <section className="evidence">

                  <div className="section-label">
                    KEY EVIDENCE
                  </div>

                  <div className="evidence-list">

                    <div className="evidence-item">
                      <span className="check">
                        ✓
                      </span>

                      <span>
                        IPR category identified as{" "}
                        <strong>
                          {result.ipr_classification?.ipr_type ||
                            "research"}
                        </strong>.
                      </span>
                    </div>


                    <div className="evidence-item">
                      <span className="check">
                        ✓
                      </span>

                      <span>
                        Jurisdiction identified as{" "}
                        <strong>
                          {result.jurisdiction?.jurisdiction ||
                            "India"}
                        </strong>.
                      </span>
                    </div>


                    <div className="evidence-item">
                      <span className="check">
                        ✓
                      </span>

                      <span>
                        Research intent identified as{" "}
                        <strong>
                          {result.query_analysis?.intent ||
                            "General research"}
                        </strong>.
                      </span>
                    </div>

                  </div>

                </section>


                {/* SOURCES */}

                <section className="sources">

                  <div className="section-label">
                    RESEARCH SOURCES
                  </div>


                  <div className="source-list">

                    {result.jurisdiction?.source_scope?.map(
                      (source, index) => (

                        <div
                          className="source-row"
                          key={index}
                        >

                          <span className="source-number">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="source-name">
                            {source}
                          </span>

                          <span className="source-arrow">
                            →
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </section>


                {/* CONFIDENCE */}

                <section className="confidence">

                  <div>

                    <div className="section-label">
                      CONFIDENCE
                    </div>

                    <div className="confidence-text">
                      Based on current classification
                    </div>

                  </div>


                  <div className="confidence-badge">

                    {result.ipr_classification?.confidence ||
                      "Low"}

                  </div>

                </section>


                {/* DISCLAIMER */}

                <div className="research-disclaimer">

                  AYURLEX is a research assistance platform.
                  Final legal conclusions require verified
                  evidence and professional legal advice.

                </div>

              </div>

            </section>

          )}


          {/* LOADING */}

          {loading && (

            <div className="loading">

              <div className="loading-title">
                AYURLEX is researching
              </div>

              <div className="loading-text">
                Analysing your question and identifying
                the relevant research scope...
              </div>

              <div className="loading-bar">
                <span></span>
              </div>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div className="error-box">
              {error}
            </div>

          )}

        </div>


        {/* ================= COMPOSER ================= */}

        <div className="composer-wrapper">

          <div className="composer">

            <textarea
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask AYURLEX anything about Ayurveda IPR..."
              rows="1"
            />


            <div className="composer-footer">

              <div className="composer-hint">
                Press Enter to research
              </div>

              <button
                className="send-button"
                onClick={handleResearch}
                disabled={
                  loading ||
                  !question.trim()
                }
              >
                {loading ? "..." : "↑"}
              </button>

            </div>

          </div>


          <div className="composer-disclaimer">
            AYURLEX can make mistakes. Verify important information
            against authoritative sources.
          </div>

        </div>


        {/* FOOTER */}

        <footer className="main-footer">
          AYURLEX&nbsp;&nbsp;|&nbsp;&nbsp;
          AI for Ayurveda. Law for Tomorrow.
        </footer>

      </main>

    </div>
  );
}

export default App;
import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    "Can I patent my new Ayurvedic herbal formulation in India?",
    "माझ्या Ayurvedic formulation ला भारतात patent मिळू शकतो का?",
    "माझ्या herbal product साठी trademark registration कसे करायचे?",
    "What are the IPR rules for traditional Ayurvedic knowledge?",
  ];

  const askQuestion = async (text = question) => {
    const trimmedQuestion = text.trim();

    if (!trimmedQuestion) {
      return;
    }

    setQuestion(trimmedQuestion);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: trimmedQuestion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Backend request failed: ${response.status}`
        );
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "AYURLEX backend शी connection होत नाही. Backend port 8001 वर चालू आहे का ते check करा."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askQuestion();
    }
  };

  const newResearch = () => {
    setQuestion("");
    setResult(null);
    setError("");
  };

  return (
    <div className="app-shell">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-name">
            AYURLEX
          </div>

          <div className="brand-subtitle">
            IPR & Regulatory Research
          </div>
        </div>

        <button
          className="new-research-btn"
          onClick={newResearch}
        >
          <span className="plus-icon">
            +
          </span>

          <span>
            New Research
          </span>
        </button>

        <nav className="sidebar-nav">

          <div className="nav-section-title">
            WORKSPACE
          </div>

          <button className="nav-item active">
            Research
          </button>

          <button className="nav-item">
            Knowledge Base
          </button>

          <button className="nav-item">
            Legal Sources
          </button>

          <button className="nav-item">
            Saved Research
          </button>

        </nav>

        <div className="recent-section">

          <div className="nav-section-title">
            RECENT RESEARCH
          </div>

          <div className="recent-item">
            Ayurvedic patentability
          </div>

          <div className="recent-item">
            Traditional knowledge
          </div>

          <div className="recent-item">
            Herbal formulation IPR
          </div>

        </div>

        <div className="sidebar-footer">

          <div className="footer-line"></div>

          <div className="footer-text">
            AI-powered research assistance
          </div>

          <div className="footer-version">
            AYURLEX v0.1.0
          </div>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <main className="main-area">

        {/* TOP BAR */}

        <header className="topbar">

          <div className="topbar-title">
            Research
          </div>

          <div className="topbar-status">

            <span className="status-dot"></span>

            System Ready

          </div>

        </header>


        {/* CONTENT */}

        <section className="content-area">

          {!result && !loading && !error ? (

            <div className="welcome-screen">

              <div className="welcome-content">

                <div className="welcome-label">
                  AI RESEARCH ASSISTANT
                </div>

                <h1>
                  What would you like
                  <br />
                  to research?
                </h1>

                <p className="welcome-description">
                  Ask questions about Ayurveda,
                  intellectual property,
                  traditional knowledge,
                  biodiversity and regulatory
                  requirements.
                </p>

                <div className="suggestions">

                  {suggestions.map(
                    (suggestion, index) => (

                      <button
                        key={index}
                        className="suggestion-card"
                        onClick={() =>
                          askQuestion(suggestion)
                        }
                      >

                        <span>
                          {suggestion}
                        </span>

                        <span className="suggestion-arrow">
                          →
                        </span>

                      </button>

                    )
                  )}

                </div>

              </div>

            </div>

          ) : (

            <div className="research-result">

              {/* USER QUESTION */}

              <div className="question-block">

                <div className="message-label">
                  YOUR QUESTION
                </div>

                <div className="user-question">
                  {question}
                </div>

              </div>


              {/* LOADING */}

              {loading && (

                <div className="loading-block">

                  <div className="loading-indicator">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                  <div className="loading-text">
                    Analyzing your research question...
                  </div>

                </div>

              )}


              {/* ERROR */}

              {error && (

                <div className="error-block">

                  <div className="error-title">
                    Connection Error
                  </div>

                  <div className="error-message">
                    {error}
                  </div>

                  <button
                    className="retry-btn"
                    onClick={() => askQuestion()}
                  >
                    Try Again
                  </button>

                </div>

              )}


              {/* RESULT */}

              {result && !loading && (

                <div className="answer-section">

                  {/* ANSWER */}

                  <div className="answer-block">

                    <div className="message-label">
                      AYURLEX
                    </div>

                    <h2>
                      Research Analysis
                    </h2>

                    <p className="answer-text">
                      Your question has been analyzed
                      using AYURLEX's research pipeline.
                      The detected research parameters
                      are shown below.
                    </p>

                  </div>


                  {/* KEY ANALYSIS */}

                  <div className="section-block">

                    <div className="section-heading">
                      KEY ANALYSIS
                    </div>

                    <div className="analysis-grid">

                      {/* DOMAIN */}

                      <div className="analysis-card">

                        <span className="analysis-label">
                          DOMAIN
                        </span>

                        <strong>
                          {result.query_analysis?.domain ||
                            "Unknown"}
                        </strong>

                      </div>


                      {/* IPR TYPE */}

                      <div className="analysis-card">

                        <span className="analysis-label">
                          IPR TYPE
                        </span>

                        <strong>
                          {result.ipr_classification?.ipr_type ||
                            result.query_analysis?.ipr_type ||
                            "Unknown"}
                        </strong>

                      </div>


                      {/* INTENT */}

                      <div className="analysis-card">

                        <span className="analysis-label">
                          INTENT
                        </span>

                        <strong>
                          {result.query_analysis?.intent ||
                            "Research"}
                        </strong>

                      </div>


                      {/* JURISDICTION */}

                      <div className="analysis-card">

                        <span className="analysis-label">
                          JURISDICTION
                        </span>

                        <strong>
                          {result.jurisdiction?.jurisdiction ||
                            result.query_analysis?.jurisdiction ||
                            "Unknown"}
                        </strong>

                      </div>


                      {/* LANGUAGE */}

                      <div className="analysis-card language-card">

                        <span className="analysis-label">
                          LANGUAGE
                        </span>

                        <strong>
                          {result.detected_language ||
                            "Unknown"}
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* KEYWORDS */}

                  <div className="section-block">

                    <div className="section-heading">
                      DETECTED KEYWORDS
                    </div>

                    <div className="keyword-list">

                      {result.query_analysis?.keywords?.length > 0 ? (

                        result.query_analysis.keywords.map(
                          (keyword, index) => (

                            <span
                              className="keyword"
                              key={index}
                            >
                              {keyword}
                            </span>

                          )
                        )

                      ) : (

                        <span className="empty-value">
                          No specific keywords detected
                        </span>

                      )}

                    </div>

                  </div>


                  {/* RESEARCH SCOPE */}

                  <div className="section-block">

                    <div className="section-heading">
                      RESEARCH SCOPE
                    </div>

                    <div className="evidence-box">

                      <div className="evidence-title">
                        Source Scope
                      </div>

                      {result.jurisdiction?.source_scope?.length > 0 ? (

                        <ul className="scope-list">

                          {result.jurisdiction.source_scope.map(
                            (source, index) => (

                              <li key={index}>
                                {source}
                              </li>

                            )
                          )}

                        </ul>

                      ) : (

                        <div className="empty-value">
                          No source scope detected
                        </div>

                      )}

                    </div>

                  </div>


                  {/* RESEARCH PLAN */}

                  {result.research_plan && (

                    <div className="section-block">

                      <div className="section-heading">
                        AI RESEARCH PLAN
                      </div>

                      <div className="evidence-box">

                        <div className="evidence-title">
                          Orchestrator Plan
                        </div>

                        {result.research_plan.research_steps?.length > 0 && (

                          <ul className="scope-list">

                            {result.research_plan.research_steps.map(
                              (step, index) => (

                                <li key={index}>
                                  {step}
                                </li>

                              )
                            )}

                          </ul>

                        )}

                      </div>

                    </div>

                  )}


                  {/* SOURCE CATEGORIES */}

                  {result.research_plan?.source_categories?.length > 0 && (

                    <div className="section-block">

                      <div className="section-heading">
                        PLANNED SOURCE CATEGORIES
                      </div>

                      <div className="keyword-list">

                        {result.research_plan.source_categories.map(
                          (source, index) => (

                            <span
                              className="keyword"
                              key={index}
                            >
                              {source}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}


                  {/* CONFIDENCE */}

                  <div className="section-block">

                    <div className="section-heading">
                      CLASSIFICATION CONFIDENCE
                    </div>

                    <div className="confidence-row">

                      <span className="confidence-label">
                        IPR Classification
                      </span>

                      <span
                        className={`confidence-badge ${
                          result.ipr_classification?.confidence
                            ?.toLowerCase()
                            .replace(" ", "-") || ""
                        }`}
                      >
                        {result.ipr_classification?.confidence ||
                          "Unknown"}
                      </span>

                    </div>

                  </div>


                  {/* SOURCES */}

                  <div className="section-block">

                    <div className="section-heading">
                      RESEARCH SOURCES
                    </div>

                    <div className="sources-grid">

                      {(
                        result.jurisdiction?.source_scope ||
                        []
                      ).map((source, index) => (

                        <div
                          className="source-card"
                          key={index}
                        >

                          <div className="source-number">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </div>

                          <div className="source-name">
                            {source}
                          </div>

                        </div>

                      ))}

                    </div>

                  </div>


                  {/* DISCLAIMER */}

                  <div className="disclaimer">

                    <div className="disclaimer-title">
                      Research Assistance Notice
                    </div>

                    <div className="disclaimer-text">
                      AYURLEX provides AI-powered
                      research assistance based on
                      detected query parameters.
                      It is not a substitute for
                      professional legal advice.
                    </div>

                  </div>

                </div>

              )}

            </div>

          )}

        </section>


        {/* =========================
            COMPOSER
        ========================= */}

        <div className="composer-wrapper">

          <form
            className="composer"
            onSubmit={handleSubmit}
          >

            <textarea
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask a research question..."
              rows="1"
            />

            <button
              type="submit"
              className="send-button"
              disabled={
                loading || !question.trim()
              }
            >
              <span>
                →
              </span>
            </button>

          </form>

          <div className="composer-hint">
            Press Enter to research · Shift + Enter
            for new line
          </div>

        </div>

      </main>

    </div>
  );
}

export default App;
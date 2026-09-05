def retrieve_research_sources(
    question: str,
    jurisdiction: str | None = None,
    ipr_type: str | None = None,
):
    """
    AYURLEX Retriever

    Creates a retrieval request based on the
    user's question, IPR type and jurisdiction.

    This is the initial retrieval layer.
    Actual database/vector search will be connected later.
    """

    search_terms = []

    # Question itself
    search_terms.append(question)

    # IPR type
    if ipr_type:
        search_terms.append(ipr_type)

    # Jurisdiction
    if jurisdiction:
        search_terms.append(jurisdiction)

    # Source categories
    source_categories = []

    if jurisdiction == "India":
        source_categories = [
            "Indian statutes",
            "Indian rules",
            "IP India",
            "Traditional knowledge sources",
            "Biodiversity sources",
            "Ayurveda official sources",
        ]

    elif jurisdiction == "International":
        source_categories = [
            "WIPO",
            "TRIPS",
            "PCT",
            "CBD",
            "Nagoya Protocol",
            "Target-market sources",
        ]

    else:
        source_categories = [
            "Authoritative legal sources",
            "Official regulatory sources",
        ]

    return {
        "query": question,
        "ipr_type": ipr_type,
        "jurisdiction": jurisdiction,
        "search_terms": search_terms,
        "source_categories": source_categories,
        "retrieval_status": "ready_for_source_search",
    }
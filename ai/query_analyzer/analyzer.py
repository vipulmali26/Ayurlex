def analyze_query(question: str):
    question_lower = question.lower()

    result = {
        "domain": None,
        "ipr_type": None,
        "jurisdiction": None,
        "intent": None,
        "keywords": []
    }

    # Domain
    if "ayurvedic" in question_lower or "ayurveda" in question_lower:
        result["domain"] = "Ayurveda"

    # IPR type
    if "patent" in question_lower:
        result["ipr_type"] = "Patent"
    elif "trademark" in question_lower:
        result["ipr_type"] = "Trademark"
    elif "copyright" in question_lower:
        result["ipr_type"] = "Copyright"
    elif "design" in question_lower:
        result["ipr_type"] = "Design"
    elif "geographical indication" in question_lower:
        result["ipr_type"] = "GI"

    # Jurisdiction
    if "india" in question_lower or "indian" in question_lower:
        result["jurisdiction"] = "India"
    elif "international" in question_lower:
        result["jurisdiction"] = "International"

    # Intent
    if "patent" in question_lower or "patentable" in question_lower:
        result["intent"] = "Patentability"

    # Keywords
    possible_keywords = [
        "ayurvedic",
        "ayurveda",
        "herbal",
        "formulation",
        "patent",
        "india"
    ]

    result["keywords"] = [
        word for word in possible_keywords
        if word in question_lower
    ]

    return result
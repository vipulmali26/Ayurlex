def detect_jurisdiction(
    question: str,
    selected_jurisdiction: str = "India"
):
    question_lower = question.lower()

    # Default to user's selected jurisdiction
    jurisdiction = selected_jurisdiction

    # Detect India
    if "india" in question_lower or "indian" in question_lower:
        jurisdiction = "India"

    # Detect International
    elif "international" in question_lower:
        jurisdiction = "International"

    return {
        "jurisdiction": jurisdiction,
        "source_scope": get_source_scope(jurisdiction)
    }


def get_source_scope(jurisdiction: str):
    if jurisdiction == "India":
        return [
            "Indian statutes",
            "Indian rules",
            "IP India",
            "Ayurveda sources",
            "Biodiversity sources",
            "Traditional knowledge sources"
        ]

    elif jurisdiction == "International":
        return [
            "WIPO",
            "TRIPS",
            "CBD",
            "Nagoya",
            "PCT",
            "Target-market sources"
        ]

    return []
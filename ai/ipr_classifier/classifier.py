def classify_ipr(question: str):
    question_lower = question.lower()

    ipr_type = None
    confidence = "Low"

    # Patent
    if "patent" in question_lower:
        ipr_type = "Patent"
        confidence = "High"

    # Trademark
    elif "trademark" in question_lower:
        ipr_type = "Trademark"
        confidence = "High"

    # GI
    elif (
        "geographical indication" in question_lower
        or "gi registration" in question_lower
    ):
        ipr_type = "GI"
        confidence = "High"

    # Copyright
    elif "copyright" in question_lower:
        ipr_type = "Copyright"
        confidence = "High"

    # Design
    elif "design" in question_lower:
        ipr_type = "Design"
        confidence = "High"

    return {
        "ipr_type": ipr_type,
        "confidence": confidence
    }
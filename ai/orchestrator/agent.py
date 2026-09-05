def build_research_plan(
    question: str,
    language: str,
    ipr_type: str | None,
    jurisdiction: str | None,
):
    """
    Creates a structured research plan for AYURLEX.
    This is the first orchestration layer before RAG.
    """

    plan = {
        "question": question,
        "language": language,
        "ipr_type": ipr_type,
        "jurisdiction": jurisdiction,
        "research_steps": [],
        "source_categories": [],
        "response_language": language,
    }

    # -------------------------
    # IPR RESEARCH PLAN
    # -------------------------

    if ipr_type == "Patent":
        plan["research_steps"] = [
            "Check patentability requirements",
            "Check applicable exclusions",
            "Check novelty requirements",
            "Check inventive step requirements",
            "Check traditional knowledge implications",
            "Check biodiversity / access and benefit-sharing implications",
            "Verify evidence from authoritative sources",
        ]

        if jurisdiction == "India":
            plan["source_categories"] = [
                "Indian patent law",
                "Patent Rules",
                "IP India",
                "Traditional knowledge sources",
                "Biodiversity sources",
                "Ayurveda-related official sources",
            ]

        elif jurisdiction == "International":
            plan["source_categories"] = [
                "WIPO",
                "TRIPS",
                "PCT",
                "CBD",
                "Nagoya Protocol",
                "Target-market jurisdiction",
            ]

    elif ipr_type == "Trademark":
        plan["research_steps"] = [
            "Identify applicable trademark framework",
            "Check registrability requirements",
            "Check prohibited or restricted marks",
            "Check classification requirements",
            "Verify authoritative evidence",
        ]

        if jurisdiction == "India":
            plan["source_categories"] = [
                "Indian trademark law",
                "Trademark Rules",
                "IP India",
            ]

        elif jurisdiction == "International":
            plan["source_categories"] = [
                "WIPO",
                "Madrid System",
                "Target-market trademark authority",
            ]

    elif ipr_type == "Copyright":
        plan["research_steps"] = [
            "Identify applicable copyright framework",
            "Determine subject-matter eligibility",
            "Check ownership requirements",
            "Check relevant exceptions",
            "Verify authoritative evidence",
        ]

        if jurisdiction == "India":
            plan["source_categories"] = [
                "Indian copyright law",
                "Copyright Rules",
                "Official Indian sources",
            ]

        elif jurisdiction == "International":
            plan["source_categories"] = [
                "WIPO",
                "International copyright framework",
                "Target-market sources",
            ]

    elif ipr_type == "GI":
        plan["research_steps"] = [
            "Identify applicable GI framework",
            "Check eligibility requirements",
            "Check geographical linkage",
            "Check registration requirements",
            "Verify authoritative evidence",
        ]

        if jurisdiction == "India":
            plan["source_categories"] = [
                "Indian GI law",
                "GI Rules",
                "GI Registry",
            ]

        elif jurisdiction == "International":
            plan["source_categories"] = [
                "WIPO",
                "TRIPS",
                "Target-market GI framework",
            ]

    else:
        plan["research_steps"] = [
            "Identify the relevant legal domain",
            "Determine applicable jurisdiction",
            "Retrieve authoritative sources",
            "Verify evidence",
        ]

    # -------------------------
    # SAFETY / EVIDENCE GATE
    # -------------------------

    plan["verification_required"] = True

    plan["citation_required"] = True

    plan["abstain_if_insufficient_evidence"] = True

    return plan
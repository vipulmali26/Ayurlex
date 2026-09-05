def detect_language(question: str) -> str:
    if not question or not question.strip():
        return "Unknown"

    text = question.strip()
    text_lower = text.lower()

    # ---------------------------------
    # Devanagari Script Detection
    # ---------------------------------

    devanagari_chars = 0

    for char in text:
        if "\u0900" <= char <= "\u097F":
            devanagari_chars += 1

    # ---------------------------------
    # Hindi / Marathi - Devanagari
    # ---------------------------------

    if devanagari_chars > 0:

        marathi_words = [
            "माझ्या",
            "माझा",
            "माझी",
            "मला",
            "आहे",
            "आहे का",
            "कसे",
            "कसा",
            "कशी",
            "करावे",
            "करायचे",
            "शकतो",
            "शकते",
            "मध्ये",
            "साठी",
            "आणि",
            "पाहिजे",
            "मिळेल",
            "मिळू",
            "काय",
            "कोणते",
            "भारतात",
            "भारतामध्ये",
        ]

        hindi_words = [
            "मेरी",
            "मेरा",
            "मेरे",
            "मुझे",
            "है",
            "हैं",
            "क्या",
            "कैसे",
            "कैसी",
            "करना",
            "करें",
            "सकता",
            "सकती",
            "लिए",
            "और",
            "मिल सकता",
            "भारत में",
            "कौन",
            "किस",
        ]

        marathi_score = sum(
            1 for word in marathi_words if word in text
        )

        hindi_score = sum(
            1 for word in hindi_words if word in text
        )

        if marathi_score > hindi_score:
            return "Marathi"

        if hindi_score > marathi_score:
            return "Hindi"

        return "Hindi/Marathi"

    # ---------------------------------
    # Roman Script Detection
    # ---------------------------------

    marathi_roman_words = [
        "majha",
        "majhi",
        "majhya",
        "mala",
        "ahe",
        "aahe",
        "kase",
        "kashi",
        "karave",
        "karayche",
        "shakto",
        "shakte",
        "madhye",
        "sathi",
        "aani",
        "pahije",
        "milel",
        "milu",
        "kay",
        "bharatat",
    ]

    hindi_roman_words = [
        "mera",
        "meri",
        "mere",
        "mujhe",
        "hai",
        "hain",
        "kya",
        "kaise",
        "kaisi",
        "karna",
        "kare",
        "sakta",
        "sakti",
        "liye",
        "aur",
        "milega",
        "bharat",
        "mein",
        "kaun",
    ]

    english_words = [
        "the",
        "is",
        "are",
        "can",
        "could",
        "should",
        "what",
        "how",
        "why",
        "patent",
        "trademark",
        "copyright",
        "formulation",
        "ayurvedic",
        "ayurveda",
        "india",
        "indian",
        "registration",
        "legal",
        "law",
        "research",
    ]

    marathi_score = 0
    hindi_score = 0
    english_score = 0

    words = text_lower.split()

    for word in words:

        cleaned_word = (
            word
            .replace("?", "")
            .replace(",", "")
            .replace(".", "")
            .replace("!", "")
            .replace(";", "")
            .replace(":", "")
        )

        if cleaned_word in marathi_roman_words:
            marathi_score += 1

        if cleaned_word in hindi_roman_words:
            hindi_score += 1

        if cleaned_word in english_words:
            english_score += 1

    # ---------------------------------
    # Hinglish / Marathi-Hinglish
    # ---------------------------------

    if marathi_score > 0 and english_score > 0:
        return "Marathi / Hinglish"

    if hindi_score > 0 and english_score > 0:
        return "Hindi / Hinglish"

    # ---------------------------------
    # Pure Roman Language Detection
    # ---------------------------------

    if marathi_score > hindi_score:
        return "Marathi"

    if hindi_score > marathi_score:
        return "Hindi"

    if english_score > 0:
        return "English"

    # Default
    return "English"
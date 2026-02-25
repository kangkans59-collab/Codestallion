import re


# Phrases that are NOT allowed
FORBIDDEN_PATTERNS = [
    r"\byou have\b",
    r"\byou are suffering from\b",
    r"\byou are diagnosed with\b",
    r"\bthis means you have\b",
    r"\btake\b.*\bmedicine\b",
    r"\bstart\b.*\bmedication\b",
    r"\bshould take\b",
    r"\bstop taking\b",
    r"\bincrease dosage\b",
    r"\breduce dosage\b",
    r"\bthis will cure\b"
]


# Mandatory disclaimer
DISCLAIMER = (
    "\n\n⚠️ Disclaimer: This explanation is for general information only. "
    "It is not a medical diagnosis or treatment advice. "
    "Please consult a qualified doctor for proper medical guidance."
)


def apply_safety_filter(text: str) -> str:
    """
    Cleans AI output to ensure medical safety.
    """

    if not text:
        return default_message()

    cleaned = text

    # Remove forbidden patterns
    for pattern in FORBIDDEN_PATTERNS:
        cleaned = re.sub(
            pattern,
            "[statement removed for safety]",
            cleaned,
            flags=re.IGNORECASE
        )

    # Normalize alarming words
    cleaned = normalize_tone(cleaned)

    # Ensure disclaimer exists
    if "disclaimer" not in cleaned.lower():
        cleaned += DISCLAIMER

    return cleaned.strip()


def normalize_tone(text: str) -> str:
    """
    Replace alarming language with calm alternatives.
    """

    replacements = {
        "dangerous": "important to monitor",
        "serious": "worth discussing with your doctor",
        "critical": "needs medical attention",
        "severe": "significant",
        "fatal": "serious"
    }

    result = text

    for word, replacement in replacements.items():
        result = re.sub(
            rf"\b{word}\b",
            replacement,
            result,
            flags=re.IGNORECASE
        )

    return result


def default_message():
    return (
        "Your report could not be clearly interpreted. "
        "Please consult your doctor for proper explanation."
        + DISCLAIMER
    )
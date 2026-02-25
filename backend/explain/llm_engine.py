import os
import google.generativeai as genai


# Configure Gemini with API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


# Use best free-tier friendly model
MODEL_NAME = "models/gemini-2.5-flash"

model = genai.GenerativeModel(MODEL_NAME)


# System-level safety instructions
SYSTEM_PROMPT = """
You are a medical information explanation assistant.

STRICT RULES:
- Do NOT diagnose any disease.
- Do NOT prescribe or suggest medicines.
- Do NOT recommend treatment.
- Do NOT give medical decisions.
- Use simple, calm, non-alarming language.
- Explain only what results generally mean.
- Always advise the user to consult a qualified doctor.

Your role is only to explain, not to replace a doctor.
"""


def generate_explanation(parsed_data):
    """
    Generate safe, patient-friendly explanation
    from structured medical data.
    """

    # If nothing detected
    if not parsed_data:
        return (
            "No clear medical test values were found in the report. "
            "Please consult your doctor for proper interpretation."
        )

    # Build structured summary
    summary = ""

    for item in parsed_data:
        test = item.get("test", "Unknown Test")
        status = item.get("status", "unknown")

        summary += f"- {test}: {status}\n"

    # Final prompt
    prompt = f"""
{SYSTEM_PROMPT}

Patient test summary:
{summary}

Task:
Explain these results in simple language
for a patient with low medical knowledge.
Include a short disclaimer at the end.
"""

    try:
        # Call Gemini API
        response = model.generate_content(prompt)

        if not response or not response.text:
            return (
                "The explanation service is currently unavailable. "
                "Please try again later."
            )

        return response.text.strip()

    except Exception as e:
        print("Gemini Error:", e)
        return f"AI Error: {str(e)}"
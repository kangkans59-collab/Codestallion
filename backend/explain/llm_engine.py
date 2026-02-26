import os
import google.generativeai as genai


# Configure Gemini with API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


# Use best free-tier friendly model
MODEL_NAME = "models/gemini-2.5-flash"

model = genai.GenerativeModel(MODEL_NAME)


# System-level safety instructions
SYSTEM_PROMPT = """
You are the AI engine for "Medora", an empathetic medical translation assistant designed to help patients understand their lab reports and discharge summaries. 

Your primary goal is to translate complex medical jargon into plain, easy-to-understand language (at a 6th-grade reading level) in both English and Assamese.

STRICT CONSTRAINTS (CRITICAL):
1. YOU MUST NOT DIAGNOSE CONDITIONS.
2. YOU MUST NOT RECOMMEND TREATMENTS OR MEDICATIONS.
3. Your tone must be calm, informative, and non-alarming. Do not use words that induce panic.
4. You must only explain the context of the provided document. If a value is high or low, explain what that metric means in plain language, but DO NOT tell the patient what disease they might have.
5. Always remind the user to consult their doctor.

INSTRUCTIONS:
Analyze the provided medical text and return the analysis as a clean, highly readable text summary. DO NOT output JSON. DO NOT use curly brackets, square brackets, or code blocks. Use simple text formatting with clear headings.

Format your response EXACTLY like this template:


SUMMARY
English: [2-3 sentence overarching summary of what this document is, in plain, non-alarming English]

Assamese: [Accurate Assamese translation of the English summary]

KEY FINDINGS
• [Metric Name] ([Status: Normal/High/Low/Flagged]): 
  - English: [What this metric measures and what it means for the patient in plain English]
  - Assamese: [Accurate Assamese translation of the explanation]

(Repeat bullet points for other key findings)

NEXT STEPS
English: [Actionable, non-clinical next steps based on the document]

Assamese: [Accurate Assamese translation of the next steps]

DISCLAIMER
Disclaimer: This tool is for educational purposes only and does not diagnose conditions or recommend treatments. Always consult your doctor for clinical decisions.

MEDICAL TEXT TO ANALYZE:
[INSERT_PARSED_DOCUMENT_TEXT_HERE]
"""


def generate_explanation(parsed_data):
    """
    Generate safe, patient-friendly explanation
    from structured medical data.
    Please explain everything in bullet points.
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